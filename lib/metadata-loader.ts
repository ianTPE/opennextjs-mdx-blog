import fs from 'fs/promises';
import path from 'path';
import { PostMeta } from '../types/post';

const POSTS_DIRECTORY = path.join(process.cwd(), 'content/posts');

export async function loadPostMetadata(slug: string): Promise<PostMeta | null> {
  try {
    const metadataPath = path.join(POSTS_DIRECTORY, slug, 'metadata.ts');
    const fileContent = await fs.readFile(metadataPath, 'utf8');
    
    // Clean and execute TypeScript content
    const cleanedContent = fileContent
      .replace(/import\s+.*?from\s+['"][^'"]*['"];?\s*/g, '')
      .replace(/:\s*PostMeta/g, '')
      .replace(/export\s+default\s+/, 'return ');
    
    const evalFunction = new Function(cleanedContent);
    const metadata = evalFunction();
    
    return validateMetadata(metadata, slug);
  } catch (error) {
    console.error(`Error loading metadata for ${slug}:`, error);
    return null;
  }
}

function validateMetadata(metadata: unknown, slug: string): PostMeta {
  if (!metadata || typeof metadata !== 'object') {
    throw new Error(`Invalid metadata object in ${slug}/metadata.ts`);
  }

  const meta = metadata as Record<string, unknown>;
  const required = ['title', 'date', 'summary', 'tags'];
  
  for (const field of required) {
    if (!meta[field]) {
      throw new Error(`Missing required field '${field}' in ${slug}/metadata.ts`);
    }
  }
  
  // Ensure slug matches
  if (!meta.slug) {
    meta.slug = slug;
  }
  
  // Set defaults
  if (meta.published === undefined) {
    meta.published = true;
  }
  
  return meta as unknown as PostMeta;
}

export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const entries = await fs.readdir(POSTS_DIRECTORY, { withFileTypes: true });
    return entries
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name);
  } catch (error) {
    console.error('Error reading posts directory:', error);
    return [];
  }
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const slugs = await getAllPostSlugs();
  const posts = await Promise.all(
    slugs.map(slug => loadPostMetadata(slug))
  );
  
  return posts
    .filter((post): post is PostMeta => post !== null && post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}