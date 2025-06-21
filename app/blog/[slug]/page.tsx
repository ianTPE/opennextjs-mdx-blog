import { notFound } from "next/navigation";
import { getPost, compileMDXWithComponents } from "@/lib/mdx";
import { loadPostComponents } from "@/lib/simple-component-loader";
import { getAllPostSlugs } from "@/lib/metadata-loader";
import BlogPostContent from "@/components/blog/BlogPostContent";
import { generateOGMetadata, getPostOGImage } from "@/lib/og-image";

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

  const ogImage = getPostOGImage(post.coverImage);

  return generateOGMetadata({
    title: post.title,
    description: post.summary,
    url: `https://citrine.top/blog/${slug}`,
    type: "article",
    image: ogImage,
    alt: post.title,
    publishedTime: post.date,
    authors: [post.author || "Ian Chou"],
    tags: post.tags,
  });
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
