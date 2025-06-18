#!/usr/bin/env node

const { scanAllPosts } = require('./scan-components');
const { updateComponentMappings } = require('./update-component-mappings');

/**
 * 🧠 Smart Prebuild System - The Brain of Component Management
 * Automatically detects changes and updates component mappings
 */
async function smartPrebuild() {
  console.log('🧠 Smart Prebuild Starting...');
  
  try {
    // 1. Scan current component state
    console.log('🔍 Scanning current components...');
    const currentComponents = await scanAllPosts();
    const postsWithComponents = currentComponents.filter(p => p.hasComponents);
    
    // 2. Always update mappings to ensure accuracy
    console.log('🔧 Updating component mappings...');
    await updateComponentMappings();
    
    // 3. Display status
    console.log(`\n📊 Smart Prebuild Results:`);
    console.log(`├── Posts with Components: ${postsWithComponents.length}`);
    console.log(`├── Component Mappings: ✅ Updated`);
    console.log(`└── Build Ready: ✅ All systems go`);
    
    console.log('✅ Smart Prebuild completed successfully!');
    
  } catch (error) {
    console.error('❌ Smart Prebuild failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  smartPrebuild();
}

module.exports = { smartPrebuild };