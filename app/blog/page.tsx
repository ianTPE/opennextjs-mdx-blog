import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/metadata-loader";
import {
  CalendarIcon,
  ClockIcon,
  TagIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { generateOGMetadata } from "@/lib/og-image";

export const metadata = generateOGMetadata({
  title: "文章 - Citrine.top",
  description: "探索 AI 與開發者協作的技術文章，分享最前沿的開發技術和創新思維",
  url: "https://citrine.top/blog",
  type: "website",
  alt: "Citrine.top 文章列表 - AI 協作開發技術文章",
});

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Container with Background Image */}
          <div className="relative overflow-hidden rounded-3xl h-[500px] lg:h-[550px]">
            {/* Background Image */}
            <div className="absolute inset-0">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: "url('/images/BlogHero.webp')",
                }}
              ></div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-purple-900/50 to-pink-900/60"></div>
            </div>

            {/* Animated Elements */}
            <div className="absolute inset-0">
              <div className="absolute top-16 left-8 w-48 h-48 lg:w-72 lg:h-72 lg:top-20 lg:left-10 bg-blue-400/20 dark:bg-blue-600/20 rounded-full mix-blend-screen filter blur-xl opacity-40 animate-pulse"></div>
              <div className="absolute top-32 right-8 w-48 h-48 lg:w-72 lg:h-72 lg:top-40 lg:right-10 bg-purple-400/20 dark:bg-purple-600/20 rounded-full mix-blend-screen filter blur-xl opacity-40 animate-pulse delay-1000"></div>
              <div className="absolute bottom-16 left-1/2 w-48 h-48 lg:w-72 lg:h-72 lg:bottom-20 bg-pink-400/20 dark:bg-pink-600/20 rounded-full mix-blend-screen filter blur-xl opacity-40 animate-pulse delay-2000"></div>
            </div>

            {/* Content */}
            <div className="relative px-8 sm:px-12 lg:px-16 py-8 lg:py-12 h-full flex items-center">
              <div className="text-center w-full">
                {/* Hero Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full text-sm font-medium mb-6">
                  <SparklesIcon className="w-4 h-4" />
                  <span>技術文章</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
                  探索 AI 與開發的{" "}
                  <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                    未來
                  </span>
                </h1>

                {/* Description */}
                <p className="text-xl lg:text-2xl text-white/90 leading-relaxed mb-6 max-w-4xl mx-auto">
                  分享最前沿的 AI 工具、開發技術和創新思維，幫助開發者在 AI
                  時代中找到自己的位置
                </p>

                {/* Stats */}
                <div className="flex flex-wrap justify-center gap-8 text-sm text-white/80">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>{posts.length} 篇文章</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>持續更新</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                    <span>AI 協作</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="pt-8 lg:pt-8 pb-20 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8">
                <SparklesIcon className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                即將推出精彩內容
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                我們正在準備高質量的技術文章
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-500">
                文章將放在{" "}
                <code className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">
                  content/posts
                </code>{" "}
                目錄中
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {posts.map((post, index) => (
                <article
                  key={post.slug}
                  className="group bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-300 hover:scale-105"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <Link href={`/blog/${post.slug}`}>
                    {/* Cover Image */}
                    {post.coverImage && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6">
                      {/* Title */}
                      <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                        {post.title}
                      </h2>

                      {/* Summary */}
                      <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                        {post.summary}
                      </p>

                      {/* Meta Information */}
                      <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-500 mb-4">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="w-4 h-4" />
                          <time dateTime={post.date}>
                            {new Date(post.date).toLocaleDateString("zh-TW", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </time>
                        </div>
                        {post.readingTime && (
                          <div className="flex items-center gap-1">
                            <ClockIcon className="w-4 h-4" />
                            <span>{post.readingTime}</span>
                          </div>
                        )}
                      </div>

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex items-center gap-2 flex-wrap">
                          <TagIcon className="w-4 h-4 text-slate-400" />
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 3 && (
                            <span className="text-slate-400 text-xs">
                              +{post.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
