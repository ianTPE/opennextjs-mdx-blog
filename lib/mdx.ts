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

/**
 * Rehype plugin to fix first line spacing in code blocks
 * This runs BEFORE syntax highlighting to clean raw text
 */
const fixCodeBlockSpacingBefore: Plugin = () => {
  return (tree) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName === 'pre') {
        const codeElement = node.children?.find(
          child => 'tagName' in child && child.tagName === 'code'
        ) as Element | undefined;
        
        if (codeElement && codeElement.children && codeElement.children.length > 0) {
          // Find and clean the first text node
          let foundFirst = false;
          
          const processChildren = (children: ElementContent[]): ElementContent[] => {
            return children.map((child) => {
              if (!foundFirst && 'type' in child && child.type === 'text') {
                foundFirst = true;
                const textNode = child as Text;
                // Remove ALL leading whitespace including newlines, tabs, spaces
                const cleaned = textNode.value.replace(/^[\s\n\r\t\u00A0\u2000-\u200B\uFEFF]+/, '');
                return { ...textNode, value: cleaned };
              }
              
              // Recursively process nested elements
              if (!foundFirst && 'children' in child && child.children) {
                return { ...child, children: processChildren(child.children) };
              }
              
              return child;
            });
          };
          
          codeElement.children = processChildren(codeElement.children);
        }
      }
    });
  };
};

/**
 * Rehype plugin to fix spacing AFTER syntax highlighting
 * This handles cases where highlighting adds spans with whitespace
 */
const fixCodeBlockSpacingAfter: Plugin = () => {
  return (tree) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName === 'code' && node.children && node.children.length > 0) {
        const firstChild = node.children[0];
        
        // Case 1: Direct text node (no syntax highlighting)
        if ('type' in firstChild && firstChild.type === 'text') {
          const textNode = firstChild as Text;
          textNode.value = textNode.value.replace(/^[\s\n\r\t]+/, '');
        }
        // Case 2: Span element from syntax highlighting
        else if ('tagName' in firstChild && firstChild.tagName === 'span') {
          const span = firstChild as Element;
          if (span.children && span.children.length > 0) {
            const spanFirstChild = span.children[0];
            if ('type' in spanFirstChild && spanFirstChild.type === 'text') {
              const textNode = spanFirstChild as Text;
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
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          fixCodeBlockSpacingBefore,  // Clean before highlighting
          rehypeHighlight,             // Apply syntax highlighting
          fixCodeBlockSpacingAfter,   // Clean after highlighting
        ],
      },
    },
  });
}