#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const { scanAllPosts } = require('./scan-components');

const COMPONENT_LOADER_PATH = path.join(process.cwd(), 'lib/simple-component-loader.ts');

/**
 * 🤖 Auto-update Component Mappings
 * Updates the component loader with current post components
 */
async function updateComponentMappings() {
  console.log('🤖 Updating component mappings...');
  
  const posts = await scanAllPosts();
  const postsWithComponents = posts.filter(p => p.hasComponents);
  
  // Generate mapping entries
  const mappings = postsWithComponents.map(post => {
    return `  '${post.slug}': () => import('../content/posts/${post.slug}/components/index'),`;
  }).join('\n');
  
  // Read current loader file
  const currentContent = await fs.readFile(COMPONENT_LOADER_PATH, 'utf8');
  
  // Replace the mappings section
  const updatedContent = currentContent.replace(
    /(const componentMappings: Record<string, \(\) => Promise<any>> = {)([\s\S]*?)(};)/,
    `$1\n${mappings}\n$3`
  );
  
  // Write updated file
  await fs.writeFile(COMPONENT_LOADER_PATH, updatedContent, 'utf8');
  
  console.log(`✅ Updated component mappings for ${postsWithComponents.length} posts`);
  
  return postsWithComponents.length;
}

async function main() {
  try {
    const count = await updateComponentMappings();
    console.log(`🚀 Component mappings updated successfully (${count} posts)`);
  } catch (error) {
    console.error('❌ Error updating component mappings:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { updateComponentMappings };