import { notFound } from "next/navigation";
import { getPost, compileMDXWithComponents } from "@/lib/mdx";
import { loadPostComponents } from "@/lib/simple-component-loader";
import { getAllPostSlugs } from "@/lib/metadata-loader";
import BlogPostContent from "@/components/blog/BlogPostContent";

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
      title: "Post Not Found",
    };
  }

  const ogImage = post.coverImage || "/images/default-og-image.webp";

  return {
    title: `${post.title} | Citrine.top`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.date,
      authors: [post.author || "Unknown"],
      tags: post.tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  const [post, componentResult] = await Promise.all([
    getPost(slug),
    loadPostComponents(slug),
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
    <BlogPostContent
      post={post}
      mdxContent={mdxContent}
      hasCustomComponents={componentResult.hasCustomComponents}
    />
  );
}
