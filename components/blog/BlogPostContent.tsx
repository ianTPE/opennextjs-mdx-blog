"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/types/post";
import { Prose } from "@/components/ui/prose";
import ReadingProgress from "./ReadingProgress";
import BackToTop from "./BackToTop";
import {
  UserIcon,
  ArrowLeftIcon,
  ShareIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";

interface BlogPostContentProps {
  post: Post;
  mdxContent: React.ReactElement;
  hasCustomComponents: boolean;
}

export default function BlogPostContent({
  post,
  mdxContent,
  hasCustomComponents,
}: BlogPostContentProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.summary,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      {/* Reading Progress */}
      <ReadingProgress />

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/blog"
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Blog</span>
            </Link>

            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Share this post"
              >
                <ShareIcon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </button>
              <button
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Bookmark this post"
              >
                <BookmarkIcon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          <div className="relative">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 sm:p-12">
              {/* Article Header */}
              <header className="mb-8">
                {/* Title */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-slate-100 leading-tight mb-6">
                  {post.title}
                </h1>

                {/* Cover Image */}
                {post.coverImage && (
                  <div className="mb-8 -mx-8 sm:-mx-12">
                    <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden rounded-xl">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                )}

                {/* Author and Date */}
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-6">
                  {post.author && (
                    <>
                      {(() => {
                        const getAuthorAvatar = (author: string) => {
                          switch (author) {
                            case "Ian Chou":
                              return "/images/authors/ian.webp";
                            case "Arkiiz":
                            case "庭宇":
                              return "/images/authors/Arkiiz.webp";
                            default:
                              return null;
                          }
                        };

                        const avatarSrc = getAuthorAvatar(post.author);

                        return avatarSrc ? (
                          <div className="w-5 h-5 relative rounded-full overflow-hidden">
                            <Image
                              src={avatarSrc}
                              alt={post.author}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <UserIcon className="w-4 h-4" />
                        );
                      })()}
                      <span>{post.author}</span>
                      <span>•</span>
                    </>
                  )}
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </div>

                {/* Summary */}
                {post.summary && (
                  <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                    {post.summary}
                  </p>
                )}

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 border border-blue-200 dark:border-blue-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </header>

              {/* Article Content */}
              <div className="relative">
                {/* Table of Contents - could be enhanced later */}
                <div className="lg:flex lg:gap-12">
                  <div className="lg:flex-1">
                    <Prose
                      variant="blog"
                      size="lg"
                      className="max-w-none prose-headings:text-slate-900 dark:prose-headings:text-slate-100 prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-strong:text-slate-900 dark:prose-strong:text-slate-100 prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-pre:bg-slate-900 dark:prose-pre:bg-slate-800"
                    >
                      {mdxContent}
                    </Prose>
                  </div>

                  {/* Sidebar removed for cleaner layout */}
                </div>
              </div>

              {/* Custom Components Indicator */}
              {hasCustomComponents && (
                <div className="mt-12 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 rounded-xl border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-400 text-lg">
                        🧩
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                        Interactive Components
                      </p>
                      <p className="text-xs text-blue-700 dark:text-blue-300">
                        This post includes custom interactive components for
                        enhanced experience
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
              Thanks for reading!
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Found this article helpful? Share it with others or explore more
              content.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                More Articles
              </Link>
              <button
                onClick={handleShare}
                className="inline-flex items-center justify-center px-6 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg font-medium transition-colors"
              >
                Share Article
              </button>
            </div>

            {/* Post metadata footer */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
              <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                <span>Published {formatDate(post.date)}</span>
                {post.readingTime && (
                  <>
                    <span>•</span>
                    <span>{post.readingTime}</span>
                  </>
                )}
                {post.tags && post.tags.length > 0 && (
                  <>
                    <span>•</span>
                    <span>
                      {post.tags.length} tag{post.tags.length !== 1 ? "s" : ""}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
}
