// import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

// Here we use the @cloudflare/next-on-pages next-dev module to allow us to
// use bindings during local development (when running the application with
// `next dev`). This function is only necessary during development and
// has no impact outside of that. For more information see:
// https://github.com/cloudflare/next-on-pages/blob/main/internal-packages/next-dev/README.md
// if (process.env.NODE_ENV === "development") {
//   setupDevPlatform().catch(console.error);
// }

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Image optimization configuration for Cloudflare Pages
  images: {
    // Disable Next.js built-in image optimization for static export
    unoptimized: true,

    // Use custom image loader for Cloudflare
    loader: "custom",
    loaderFile: "./lib/cloudflare-image-loader.js",

    // Supported image formats (Cloudflare supports these)
    formats: ["image/webp", "image/avif"],

    // Remove external domains for static export
    remotePatterns: [],
  },

  // Experimental features
  experimental: {
    // Enable MDX with Rust compiler for better performance
    mdxRs: true,

    // Optimize CSS for production
    optimizeCss: true,

    // Enable scroll restoration
    scrollRestoration: true,
  },

  // Compiler optimizations
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Environment variables available at build time
  env: {
    SITE_URL: process.env.SITE_URL || "https://localhost:3000",
    SITE_NAME: process.env.SITE_NAME || "Citrine.top",
  },
};

export default nextConfig;
