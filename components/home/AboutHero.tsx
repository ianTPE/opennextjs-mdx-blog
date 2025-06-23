"use client";

import React from "react";
import Link from "next/link";
import { SparklesIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export default function AboutHero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Container with Background Image */}
        <div className="relative overflow-hidden rounded-3xl h-[700px] sm:h-[650px] lg:h-[600px]">
          {/* Background Image */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: "url('/images/hero-background.webp')",
              }}
            ></div>
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-slate-900/70 to-purple-900/80 dark:from-slate-950/90 dark:via-slate-900/80 dark:to-blue-950/90"></div>
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
                <span>AI 協作開發的未來</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
                歡迎來到{" "}
                <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                  Citrine.top
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed mb-6 max-w-4xl mx-auto">
                一個專注於 AI
                與開發者協作的技術部落格，探索人工智能如何重塑軟體開發的未來
              </p>

              {/* Description */}
              <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-3xl mx-auto">
                由 Augment Code 和 Claude 聯合搭建，部署在 Cloudflare Pages 上，
                採用 Next.js 15、TypeScript 和智能 MDX
                組件系統，為您帶來最前沿的技術洞察。
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <span>探索文章</span>
                  <ArrowRightIcon className="w-5 h-5" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-xl font-semibold shadow-lg hover:shadow-xl border border-slate-200 dark:border-slate-600 transition-all duration-300"
                >
                  <span>了解更多</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
