/**
 * Open Graph Image utilities for Citrine.top
 * Provides consistent OG image handling across the site
 */

export interface OGImageConfig {
  title: string;
  description: string;
  url?: string;
  type?: 'website' | 'article';
  image?: string;
  alt?: string;
  publishedTime?: string;
  authors?: string[];
  tags?: string[];
  twitterCreator?: string;
}

const DEFAULT_OG_IMAGE = "/images/default-og-image.webp";
const SITE_NAME = "Citrine.top";
const BASE_URL = "https://citrine.top";

/**
 * Generate Open Graph metadata for pages
 */
export function generateOGMetadata(config: OGImageConfig) {
  const {
    title,
    description,
    url = BASE_URL,
    type = 'website',
    image = DEFAULT_OG_IMAGE,
    alt = title,
    publishedTime,
    authors = ["Ian Chou"],
    tags = [],
    twitterCreator = "@citrine_top"
  } = config;

  const metadata: any = {
    title,
    description,
    openGraph: {
      title,
      description,
      type,
      url,
      siteName: SITE_NAME,
      locale: "zh_TW",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: twitterCreator,
      images: [image],
    },
  };

  // Add article-specific metadata
  if (type === 'article') {
    if (publishedTime) {
      metadata.openGraph.publishedTime = publishedTime;
    }
    if (authors.length > 0) {
      metadata.openGraph.authors = authors;
      metadata.authors = authors.map(name => ({ name }));
    }
    if (tags.length > 0) {
      metadata.openGraph.tags = tags;
      metadata.keywords = tags;
    }
  }

  return metadata;
}

/**
 * Get the appropriate OG image for a post
 * Falls back to default if no cover image is provided
 */
export function getPostOGImage(coverImage?: string): string {
  return coverImage || DEFAULT_OG_IMAGE;
}

/**
 * Validate OG image URL format
 */
export function validateOGImageUrl(url: string): boolean {
  // Check if it's a relative path starting with /
  if (url.startsWith('/')) {
    return true;
  }
  
  // Check if it's a valid absolute URL
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Generate structured data for articles (JSON-LD)
 */
export function generateArticleStructuredData(config: {
  title: string;
  description: string;
  url: string;
  image: string;
  publishedTime: string;
  author: string;
  tags: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": config.title,
    "description": config.description,
    "url": config.url,
    "image": config.image.startsWith('/') ? `${BASE_URL}${config.image}` : config.image,
    "datePublished": config.publishedTime,
    "author": {
      "@type": "Person",
      "name": config.author
    },
    "publisher": {
      "@type": "Organization",
      "name": SITE_NAME,
      "url": BASE_URL
    },
    "keywords": config.tags.join(", ")
  };
}
