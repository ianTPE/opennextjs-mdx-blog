import { getAllPosts } from "@/lib/metadata-loader";
import AboutHero from "@/components/home/AboutHero";
import LatestPosts from "@/components/home/LatestPosts";
import Features from "@/components/home/Features";

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
