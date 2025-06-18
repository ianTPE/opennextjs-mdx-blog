// Simple test to verify component loading
const { loadPostComponents } = require('./lib/simple-component-loader.ts');

async function testComponents() {
  console.log('Testing component loading...');
  
  try {
    // Test loading components for welcome post (no custom components)
    const welcomeResult = await loadPostComponents('welcome-to-mdx-blog');
    console.log('Welcome post components:', Object.keys(welcomeResult.components));
    console.log('Has custom components:', welcomeResult.hasCustomComponents);
    
    // Test loading components for smart system post (has custom components)
    const smartResult = await loadPostComponents('smart-component-system');
    console.log('Smart system post components:', Object.keys(smartResult.components));
    console.log('Has custom components:', smartResult.hasCustomComponents);
    
  } catch (error) {
    console.error('Error testing components:', error);
  }
}

testComponents();