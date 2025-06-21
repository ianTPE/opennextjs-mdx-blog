/**
 * Next.js configuration optimized for Cloudflare Pages static export
 * Use this configuration when deploying to Cloudflare Pages
 */

import type { NextConfig } from "next";

const cloudflareConfig: NextConfig = {
  // Enable static export for Cloudflare Pages
  output: "export",
  
  // Output directory for static files
  distDir: "out",
  
  // Add trailing slash for Cloudflare Pages compatibility
  trailingSlash: true,
  
  // React strict mode
  reactStrictMode: true,

  // Image configuration for static export
  images: {
    // Disable Next.js image optimization for static export
    unoptimized: true,
    
    // Use custom loader for Cloudflare
    loader: "custom",
    loaderFile: "./lib/cloudflare-image-loader.js",
    
    // Supported formats
    formats: ["image/webp", "image/avif"],
    
    // No external domains for static export
    remotePatterns: [],
  },

  // Experimental features
  experimental: {
    // Enable MDX with Rust compiler
    mdxRs: true,
    
    // Optimize CSS
    optimizeCss: true,
    
    // Enable scroll restoration
    scrollRestoration: true,
  },

  // Compiler optimizations
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === "production",
    
    // Enable styled-components if used
    styledComponents: true,
  },

  // Build-time environment variables
  env: {
    SITE_URL: process.env.SITE_URL || "https://citrine.top",
    SITE_NAME: process.env.SITE_NAME || "Citrine.top",
    BUILD_TIME: new Date().toISOString(),
  },

  // Webpack optimizations for memory usage
  webpack: (config, { dev, isServer }) => {
    // Memory optimization for Cloudflare Pages build limits
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: "all",
        cacheGroups: {
          default: false,
          vendors: false,
          vendor: {
            chunks: "all",
            test: /node_modules/,
            name: "vendor",
            enforce: true,
          },
        },
      };
    }

    return config;
  },

  // Redirects for SEO and compatibility
  async redirects() {
    return [
      {
        source: "/blog/:slug*",
        destination: "/blog/:slug*/",
        permanent: true,
      },
    ];
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
  },
};

export default cloudflareConfig;
