import { notFound } from 'next/navigation';
import { getPost, compileMDXWithComponents } from '@/lib/mdx';
import { loadPostComponents } from '@/lib/simple-component-loader';
import { getAllPostSlugs } from '@/lib/metadata-loader';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.summary,
    authors: post.author ? [{ name: post.author }] : undefined,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  
  const [post, componentResult] = await Promise.all([
    getPost(slug),
    loadPostComponents(slug)
  ]);

  if (!post) {
    notFound();
  }

  // Compile MDX on the server side
  const { content: mdxContent } = await compileMDXWithComponents(
    post.content, 
    componentResult.components
  );

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 text-sm">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          {post.readingTime && (
            <span>{post.readingTime}</span>
          )}
          {post.author && (
            <span>by {post.author}</span>
          )}
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="prose">
        {mdxContent}
      </div>
      
      {componentResult.hasCustomComponents && (
        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg text-sm text-gray-600 dark:text-gray-400">
          🧩 This post includes custom interactive components
        </div>
      )}
    </article>
  );
}