import fs from "fs/promises";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import readingTime from "reading-time";
import { visit } from "unist-util-visit";
import type { Element, Text, ElementContent } from "hast";
import { Post } from "../types/post";
import { loadPostMetadata } from "./metadata-loader";

const POSTS_DIRECTORY = path.join(process.cwd(), "content/posts");

/**
 * Ultra-aggressive rehype plugin to fix first line spacing in code blocks
 * This runs at multiple stages to ensure no spaces slip through
 */
const ultraFixCodeBlockSpacing = () => {
  return (tree: any) => {
    // First pass: Clean all code elements directly
    visit(tree, 'element', (node: Element) => {
      if (node.tagName === 'code' || node.tagName === 'pre') {
        cleanNodeRecursively(node);
      }
    });
    
    // Second pass: Specifically target pre > code structure
    visit(tree, 'element', (node: Element) => {
      if (node.tagName === 'pre') {
        const codeElement = findCodeElement(node);
        if (codeElement) {
          // Remove all empty text nodes at the beginning
          while (codeElement.children.length > 0) {
            const firstChild = codeElement.children[0];
            if (isEmptyTextNode(firstChild)) {
              codeElement.children.shift();
            } else {
              break;
            }
          }
          
          // Clean the first meaningful node
          if (codeElement.children.length > 0) {
            cleanFirstTextNode(codeElement.children[0]);
          }
        }
      }
    });
  };
  
  function findCodeElement(node: Element): Element | undefined {
    for (const child of node.children) {
      if ('tagName' in child && child.tagName === 'code') {
        return child as Element;
      }
    }
    return undefined;
  }
  
  function isEmptyTextNode(node: ElementContent): boolean {
    return 'type' in node && 
           node.type === 'text' && 
           (node.value === '' || /^[\s\n\r\t]+$/.test(node.value));
  }
  
  function cleanFirstTextNode(node: ElementContent): void {
    if ('type' in node && node.type === 'text') {
      const textNode = node as Text;
      // Remove ALL leading whitespace characters
      textNode.value = textNode.value.replace(/^[\s\n\r\t\u00A0\u2000-\u200B\uFEFF]+/, '');
    } else if ('children' in node && node.children && node.children.length > 0) {
      // If it's an element (like a span), clean its first child
      cleanFirstTextNode(node.children[0]);
    }
  }
  
  function cleanNodeRecursively(node: Element): void {
    let foundFirst = false;
    
    const processChildren = (children: ElementContent[]): ElementContent[] => {
      return children.map((child, index) => {
        if (!foundFirst) {
          if ('type' in child && child.type === 'text') {
            const textNode = child as Text;
            if (textNode.value.trim() !== '') {
              foundFirst = true;
              textNode.value = textNode.value.replace(/^[\s\n\r\t\u00A0\u2000-\u200B\uFEFF]+/, '');
            } else if (index === 0) {
              // If first child is only whitespace, remove it completely
              textNode.value = '';
            }
          } else if ('children' in child && child.children) {
            const element = child as Element;
            element.children = processChildren(element.children);
          }
        }
        return child;
      });
    };
    
    if (node.children) {
      node.children = processChildren(node.children).filter(child => {
        // Remove empty text nodes from the beginning
        if ('type' in child && child.type === 'text') {
          return (child as Text).value !== '';
        }
        return true;
      });
    }
  }
};

/**
 * Post-highlighting cleanup
 */
const postHighlightCleanup = () => {
  return (tree: any) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName === 'code') {
        // After syntax highlighting, clean up any introduced spaces
        if (node.children && node.children.length > 0) {
          let cleaned = false;
          
          for (let i = 0; i < node.children.length && !cleaned; i++) {
            const child = node.children[i];
            
            if ('type' in child && child.type === 'text') {
              const textNode = child as Text;
              if (textNode.value.trim() !== '') {
                textNode.value = textNode.value.replace(/^[\s\n\r\t]+/, '');
                cleaned = true;
              }
            } else if ('tagName' in child && child.tagName === 'span') {
              const span = child as Element;
              if (span.children && span.children.length > 0) {
                const firstSpanChild = span.children[0];
                if ('type' in firstSpanChild && firstSpanChild.type === 'text') {
                  const textNode = firstSpanChild as Text;
                  if (textNode.value.trim() !== '') {
                    textNode.value = textNode.value.replace(/^[\s\n\r\t]+/, '');
                    cleaned = true;
                  }
                }
              }
            }
          }
        }
      }
    });
  };
};

export async function getPostContent(slug: string): Promise<string> {
  const contentPath = path.join(POSTS_DIRECTORY, slug, "content.mdx");
  return await fs.readFile(contentPath, "utf8");
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const [metadata, content] = await Promise.all([
      loadPostMetadata(slug),
      getPostContent(slug),
    ]);

    if (!metadata) {
      return null;
    }

    // Calculate reading time
    const stats = readingTime(content);
    metadata.readingTime = stats.text;

    return {
      ...metadata,
      content,
    };
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    return null;
  }
}

export async function compileMDXWithComponents(
  content: string,
  components: Record<string, React.ComponentType<any>>
) {
  // Import global components
  const { globalComponents } = await import(
    "@/components/mdx/global-components"
  );

  // Merge global components with post-specific components
  const allComponents = {
    ...globalComponents,
    ...components,
  };

  return await compileMDX({
    source: content,
    components: allComponents,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          ultraFixCodeBlockSpacing,   // Ultra-aggressive cleaning before highlighting
          rehypeHighlight,             // Apply syntax highlighting
          postHighlightCleanup,        // Clean up after highlighting
        ],
      },
    },
  });
}