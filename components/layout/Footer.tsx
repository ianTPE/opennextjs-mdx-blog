"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  SparklesIcon,
  HeartIcon,
  CodeBracketIcon,
  CloudIcon,
} from "@heroicons/react/24/outline";

const footerLinks = {
  navigation: [
    { name: "首頁", href: "/" },
    { name: "文章", href: "/blog" },
    { name: "關於", href: "/about" },
  ],
  social: [
    { name: "GitHub", href: "https://github.com", external: true },
    { name: "Twitter", href: "https://twitter.com", external: true },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Image
                  src="/images/headerBrandLogo.webp"
                  alt="Citrine.top Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Citrine.top
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 -mt-1">
                  AI 協作開發的未來
                </p>
              </div>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              探索 AI 與開發者協作的無限可能，分享最新的技術洞察與實踐經驗。
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              導航
            </h4>
            <ul className="space-y-2">
              {footerLinks.navigation.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack & Credits */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              技術棧
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <CodeBracketIcon className="w-4 h-4" />
                <span>Next.js 15 + TypeScript</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <SparklesIcon className="w-4 h-4" />
                <span>Smart MDX Components</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <CloudIcon className="w-4 h-4" />
                <span>Cloudflare Pages</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <span>© {currentYear} Citrine.top</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                由 Augment Code 和 Claude 聯合搭建
                <HeartIcon className="w-4 h-4 text-red-500" />
              </span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {footerLinks.social.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
