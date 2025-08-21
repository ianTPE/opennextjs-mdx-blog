import fs from "fs/promises";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import readingTime from "reading-time";
import { visit } from "unist-util-visit";
import type { Plugin } from "unified";
import type { Element } from "hast";
import { Post } from "../types/post";
import { loadPostMetadata } from "./metadata-loader";

const POSTS_DIRECTORY = path.join(process.cwd(), "content/posts");

// Rehype plugin to fix first line spacing in code blocks
const fixCodeBlockSpacing: Plugin = () => {
  return (tree) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName === 'pre' && node.children?.[0] && 'tagName' in node.children[0] && node.children[0].tagName === 'code') {
        const codeNode = node.children[0] as Element;
        if (codeNode.children?.[0] && 'type' in codeNode.children[0] && codeNode.children[0].type === 'text') {
          // Remove leading whitespace and newline from the first line
          (codeNode.children[0] as any).value = (codeNode.children[0] as any).value.replace(/^\s*\n/, '');
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
