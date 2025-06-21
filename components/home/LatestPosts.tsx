"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PostMeta } from "@/types/post";
import {
  CalendarIcon,
  ClockIcon,
  ArrowRightIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

interface LatestPostsProps {
  posts: PostMeta[];
}

export default function LatestPosts({ posts }: LatestPostsProps) {
  const featuredPost = posts[0];
  const otherPosts = posts.slice(1, 4); // Show 3 more posts

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("zh-TW", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!posts.length) {
    return null;
  }

  return (
    <section className="pt-8 lg:pt-12 pb-12 lg:pb-16 bg-white dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            最新文章
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            探索 AI 與開發技術的最新趨勢，分享實用的開發經驗與洞察
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Post */}
          <div className="lg:col-span-2">
            <article className="group relative bg-white dark:bg-slate-900 rounded-2xl shadow-xl hover:shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-300 hover:scale-[1.02]">
              <Link href={`/blog/${featuredPost.slug}`}>
                {/* Cover Image */}
                {featuredPost.coverImage && (
                  <div className="relative h-64 lg:h-80 overflow-hidden">
                    <Image
                      src={featuredPost.coverImage}
                      alt={featuredPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                )}

                {/* Content */}
                <div className="p-8">
                  {/* Tags */}
                  {featuredPost.tags && featuredPost.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {featuredPost.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                        >
                          <TagIcon className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {featuredPost.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 line-clamp-3">
                    {featuredPost.summary}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="w-4 h-4" />
                      <time dateTime={featuredPost.date}>
                        {formatDate(featuredPost.date)}
                      </time>
                    </div>
                    {featuredPost.readingTime && (
                      <div className="flex items-center gap-1">
                        <ClockIcon className="w-4 h-4" />
                        <span>{featuredPost.readingTime}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </article>
          </div>

          {/* Other Posts */}
          <div className="space-y-6">
            {otherPosts.map((post, index) => (
              <article
                key={post.slug}
                className="group bg-white dark:bg-slate-900 rounded-xl shadow-lg hover:shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="flex gap-4 p-6">
                    {/* Cover Image */}
                    {post.coverImage && (
                      <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex gap-1 mb-2">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Title */}
                      <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {post.title}
                      </h4>

                      {/* Meta */}
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <time dateTime={post.date}>
                          {formatDate(post.date)}
                        </time>
                        {post.readingTime && (
                          <>
                            <span>•</span>
                            <span>{post.readingTime}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}

            {/* View All Posts Button */}
            <Link
              href="/blog"
              className="group flex items-center justify-center gap-2 w-full p-4 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium transition-all duration-300 border border-slate-200 dark:border-slate-600"
            >
              <span>查看所有文章</span>
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
