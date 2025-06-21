/**
 * Cloudflare-optimized image loader for Next.js
 * Handles both static assets and external images
 */

export default function cloudflareImageLoader({ src, width, quality }) {
  // For static assets (starting with /), return as-is
  // These are served directly from Cloudflare Pages
  if (src.startsWith("/")) {
    return src;
  }

  // For external images, we can use Cloudflare Images or other CDN
  // This is a basic implementation - you can enhance it based on your needs
  const params = new URLSearchParams();
  
  if (width) {
    params.set("width", width.toString());
  }
  
  if (quality) {
    params.set("quality", quality.toString());
  }

  // If you're using Cloudflare Images service, you can modify this
  // to use your Cloudflare Images account
  const queryString = params.toString();
  return queryString ? `${src}?${queryString}` : src;
}

/**
 * Alternative implementation for Cloudflare Images service
 * Uncomment and modify if you're using Cloudflare Images
 */
/*
export function cloudflareImagesLoader({ src, width, quality }) {
  // Replace 'your-account-hash' with your actual Cloudflare Images account hash
  const accountHash = process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_HASH;
  
  if (!accountHash) {
    console.warn('Cloudflare Images account hash not configured');
    return src;
  }

  // For Cloudflare Images URLs
  if (src.includes('imagedelivery.net')) {
    return src;
  }

  // For local images, construct Cloudflare Images URL
  const params = new URLSearchParams();
  if (width) params.set('width', width.toString());
  if (quality) params.set('quality', quality.toString());
  
  const baseUrl = `https://imagedelivery.net/${accountHash}`;
  const queryString = params.toString();
  
  return `${baseUrl}/${src}${queryString ? `?${queryString}` : ''}`;
}
*/
