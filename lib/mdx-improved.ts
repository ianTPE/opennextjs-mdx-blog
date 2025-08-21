import fs from "fs/promises";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import readingTime from "reading-time";
import { visit } from "unist-util-visit";
import type { Plugin } from "unified";
import type { Element, Text, ElementContent } from "hast";
import { Post } from "../types/post";
import { loadPostMetadata } from "./metadata-loader";

const POSTS_DIRECTORY = path.join(process.cwd(), "content/posts");

// Alternative approach: Clean code blocks at the remark level (before HTML generation)
const remarkCleanCodeBlocks: Plugin = () => {
  return (tree: any) => {
    visit(tree, 'code', (node: any) => {
      if (node.value && typeof node.value === 'string') {
        // Clean up the raw code value before it gets converted to HTML
        node.value = node.value.replace(/^\s*\n/, '').replace(/^\s+/, '');
      }
    });
  };
};

// Enhanced rehype plugin to fix first line spacing in code blocks
const fixCodeBlockSpacing: Plugin = () => {
  return (tree) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName === 'pre') {
        // Find code element
        const codeElement = node.children?.find(child => 
          'tagName' in child && child.tagName === 'code'
        ) as Element | undefined;
        
        if (codeElement && codeElement.children && codeElement.children.length > 0) {
          let foundFirstText = false;
          
          // Process all children recursively to find and fix the first text node
          const processNode = (nodes: ElementContent[]): ElementContent[] => {
            return nodes.map((child) => {
              if (!foundFirstText && 'type' in child && child.type === 'text') {
                const textNode = child as Text;
                foundFirstText = true;
                
                // Aggressively remove ALL leading whitespace from the first text node
                let cleanedValue = textNode.value;
                
                // Remove all possible whitespace patterns
                cleanedValue = cleanedValue.replace(/^[\s\n\r\t\u00A0\u2000-\u200B\uFEFF]+/, '');
                
                // If the entire value was whitespace, return empty string
                if (cleanedValue === '') {
                  return { ...textNode, value: '' };
                }
                
                return { ...textNode, value: cleanedValue };
              } else if ('children' in child && child.children && !foundFirstText) {
                // Recursively process children of elements
                return { ...child, children: processNode(child.children) };
              }
              return child;
            });
          };
          
          // Process and filter out empty text nodes
          codeElement.children = processNode(codeElement.children).filter(child => {
            if ('type' in child && child.type === 'text') {
              const textNode = child as Text;
              // Keep the node only if it has content after the first text node
              return foundFirstText ? true : textNode.value.trim() !== '';
            }
            return true;
          });
        }
      }
    });
  };
};

// Additional plugin to clean up syntax highlighting spans
const cleanSyntaxHighlighting: Plugin = () => {
  return (tree) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName === 'code' && node.children) {
        // Check if first child is a span with only whitespace
        const firstChild = node.children[0];
        if (firstChild && 'tagName' in firstChild && firstChild.tagName === 'span') {
          const firstSpan = firstChild as Element;
          if (firstSpan.children && firstSpan.children.length > 0) {
            const firstText = firstSpan.children[0];
            if ('type' in firstText && firstText.type === 'text') {
              const textNode = firstText as Text;
              textNode.value = textNode.value.replace(/^[\s\n\r\t]+/, '');
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
        remarkPlugins: [
          remarkGfm,
          remarkCleanCodeBlocks, // Clean at remark level first
        ],
        rehypePlugins: [
          fixCodeBlockSpacing,    // Clean at rehype level before highlighting
          rehypeHighlight,         // Apply syntax highlighting
          cleanSyntaxHighlighting, // Clean up after highlighting
        ],
      },
    },
  });
}