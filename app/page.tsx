import { getAllPosts } from "@/lib/metadata-loader";
import AboutHero from "@/components/home/AboutHero";
import LatestPosts from "@/components/home/LatestPosts";
import Features from "@/components/home/Features";
import { generateOGMetadata } from "@/lib/og-image";

export const metadata = generateOGMetadata({
  title: "Citrine.top - AI 協作開發的未來",
  description: "探索 AI 與開發者協作的無限可能，分享最前沿的開發技術和創新思維",
  url: "https://citrine.top",
  type: "website",
  alt: "Citrine.top 首頁 - AI 協作開發的未來",
});

export default async function Home() {
  const posts = await getAllPosts();
  const latestPosts = posts.slice(0, 4); // Get the 4 most recent posts

  return (
    <div>
      <AboutHero />
      <LatestPosts posts={latestPosts} />
      <Features />
    </div>
  );
}
