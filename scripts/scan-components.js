#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

const POSTS_DIR = path.join(process.cwd(), 'content/posts');

/**
 * 🔍 Intelligent Component Scanner
 * Detects all component export formats automatically
 */
async function scanAllPosts() {
  try {
    const entries = await fs.readdir(POSTS_DIR, { withFileTypes: true });
    const postDirs = entries.filter(entry => entry.isDirectory());
    
    const results = [];
    
    for (const postDir of postDirs) {
      const slug = postDir.name;
      const componentsDir = path.join(POSTS_DIR, slug, 'components');
      const indexFile = path.join(componentsDir, 'index.ts');
      
      try {
        await fs.access(indexFile);
        const content = await fs.readFile(indexFile, 'utf8');
        const exports = parseExports(content);
        
        if (exports.length > 0) {
          results.push({
            slug,
            hasComponents: true,
            exports,
            indexPath: indexFile
          });
        }
      } catch (error) {
        // No components directory or index file - skip
        continue;
      }
    }
    
    return results;
  } catch (error) {
    console.error('Error scanning posts:', error);
    return [];
  }
}

/**
 * Parse all supported export formats
 */
function parseExports(content) {
  const exports = [];
  
  // Match different export patterns
  const patterns = [
    /export\s*{\s*([^}]+)\s*}/g,                     // export { ComponentA, ComponentB }
    /export\s*\*\s*from\s*['"][^'"]*['"];?/g,        // export * from './Component'
    /export\s+const\s+(\w+)/g,                       // export const Component = 
    /export\s+default\s+(\w+)/g,                     // export default Component
    /export\s*{\s*default\s+as\s+(\w+)\s*}/g        // export { default as Component }
  ];
  
  patterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      if (match[1]) {
        // Handle comma-separated exports
        if (match[1].includes(',')) {
          const names = match[1].split(',').map(name => 
            name.trim().replace(/\s+as\s+\w+/, '').replace(/default\s+as\s+/, '')
          );
          exports.push(...names.filter(name => name && name !== 'default'));
        } else {
          const name = match[1].trim();
          if (name && name !== 'default') {
            exports.push(name);
          }
        }
      }
    }
  });
  
  return [...new Set(exports)]; // Remove duplicates
}

async function main() {
  console.log('🔍 Scanning components across all posts...');
  
  const results = await scanAllPosts();
  const postsWithComponents = results.filter(r => r.hasComponents);
  
  console.log(`\n📊 Scan Results:`);
  console.log(`├── Total Posts Scanned: ${results.length + (await getPostCount() - results.length)}`);
  console.log(`├── Posts with Components: ${postsWithComponents.length}`);
  console.log(`└── Posts without Components: ${(await getPostCount()) - postsWithComponents.length}`);
  
  if (postsWithComponents.length > 0) {
    console.log(`\n🧩 Component Details:`);
    postsWithComponents.forEach(post => {
      console.log(`├── ${post.slug}: ${post.exports.join(', ')}`);
    });
  }
  
  return results;
}

async function getPostCount() {
  try {
    const entries = await fs.readdir(POSTS_DIR, { withFileTypes: true });
    return entries.filter(entry => entry.isDirectory()).length;
  } catch {
    return 0;
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { scanAllPosts, parseExports };