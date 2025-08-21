import fs from "fs/promises";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import readingTime from "reading-time";
import { visit } from "unist-util-visit";
import type { Plugin } from "unified";
import type { Element, Text } from "hast";
import { Post } from "../types/post";
import { loadPostMetadata } from "./metadata-loader";

const POSTS_DIRECTORY = path.join(process.cwd(), "content/posts");

// Rehype plugin to fix first line spacing in code blocks
const fixCodeBlockSpacing: Plugin = () => {
  return (tree) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName === 'pre') {
        // Find code element
        const codeElement = node.children?.find(child => 
          'tagName' in child && child.tagName === 'code'
        ) as Element | undefined;
        
        if (codeElement && codeElement.children) {
          // Process text nodes
          codeElement.children.forEach((child) => {
            if ('type' in child && child.type === 'text') {
              const textNode = child as Text;
              const originalValue = textNode.value;
              
              // Remove leading whitespace, newlines, and any initial space
              const newValue = originalValue
                .replace(/^\s*\n/, '') // Remove leading whitespace + newline
                .replace(/^\s+/, '')   // Remove any remaining leading whitespace
                .replace(/^\n/, '');   // Remove any remaining leading newline
              
              // Update if changed
              if (newValue !== originalValue) {
                textNode.value = newValue;
              }
            }
          });
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
        rehypePlugins: [fixCodeBlockSpacing, rehypeHighlight],
      },
    },
  });
}
