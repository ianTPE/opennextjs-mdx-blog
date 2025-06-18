import fs from 'fs/promises';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import readingTime from 'reading-time';
import { Post } from '../types/post';
import { loadPostMetadata } from './metadata-loader';

const POSTS_DIRECTORY = path.join(process.cwd(), 'content/posts');

export async function getPostContent(slug: string): Promise<string> {
  const contentPath = path.join(POSTS_DIRECTORY, slug, 'content.mdx');
  return await fs.readFile(contentPath, 'utf8');
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const [metadata, content] = await Promise.all([
      loadPostMetadata(slug),
      getPostContent(slug)
    ]);
    
    if (!metadata) {
      return null;
    }
    
    // Calculate reading time
    const stats = readingTime(content);
    metadata.readingTime = stats.text;
    
    return {
      ...metadata,
      content
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
  return await compileMDX({
    source: content,
    components,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeHighlight],
      },
    },
  });
}