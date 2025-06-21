#!/usr/bin/env node

/**
 * Test script for the Cloudflare image loader
 * Validates that the image loader works correctly with different image sources
 */

const path = require('path');

// Import the image loader
const cloudflareImageLoader = require('../lib/cloudflare-image-loader.js').default;

function log(message) {
  console.log(`[Image Loader Test] ${message}`);
}

function testImageLoader() {
  log('Testing Cloudflare image loader...\n');

  const testCases = [
    {
      name: 'Static image (relative path)',
      input: { src: '/images/hero.webp', width: 800, quality: 85 },
      expected: '/images/hero.webp'
    },
    {
      name: 'Static image (no optimization params)',
      input: { src: '/images/logo.png' },
      expected: '/images/logo.png'
    },
    {
      name: 'External image with width',
      input: { src: 'https://example.com/image.jpg', width: 400 },
      expected: 'https://example.com/image.jpg?width=400'
    },
    {
      name: 'External image with width and quality',
      input: { src: 'https://example.com/image.jpg', width: 600, quality: 90 },
      expected: 'https://example.com/image.jpg?width=600&quality=90'
    },
    {
      name: 'External image (no params)',
      input: { src: 'https://example.com/image.jpg' },
      expected: 'https://example.com/image.jpg'
    }
  ];

  let passed = 0;
  let failed = 0;

  testCases.forEach((testCase, index) => {
    try {
      const result = cloudflareImageLoader(testCase.input);
      
      if (result === testCase.expected) {
        log(`✅ Test ${index + 1}: ${testCase.name} - PASSED`);
        log(`   Input: ${JSON.stringify(testCase.input)}`);
        log(`   Output: ${result}\n`);
        passed++;
      } else {
        log(`❌ Test ${index + 1}: ${testCase.name} - FAILED`);
        log(`   Input: ${JSON.stringify(testCase.input)}`);
        log(`   Expected: ${testCase.expected}`);
        log(`   Got: ${result}\n`);
        failed++;
      }
    } catch (error) {
      log(`💥 Test ${index + 1}: ${testCase.name} - ERROR`);
      log(`   Error: ${error.message}\n`);
      failed++;
    }
  });

  log(`\n📊 Test Results:`);
  log(`   Passed: ${passed}`);
  log(`   Failed: ${failed}`);
  log(`   Total: ${testCases.length}`);

  if (failed === 0) {
    log(`\n🎉 All tests passed! Image loader is working correctly.`);
    return true;
  } else {
    log(`\n⚠️  Some tests failed. Please check the image loader implementation.`);
    return false;
  }
}

// Additional validation
function validateImageLoaderFile() {
  const loaderPath = path.join(__dirname, '../lib/cloudflare-image-loader.js');
  const fs = require('fs');
  
  if (!fs.existsSync(loaderPath)) {
    log(`❌ Image loader file not found at: ${loaderPath}`);
    return false;
  }

  try {
    const loader = require(loaderPath);
    if (typeof loader.default !== 'function') {
      log(`❌ Image loader does not export a default function`);
      return false;
    }
    log(`✅ Image loader file exists and exports a function`);
    return true;
  } catch (error) {
    log(`❌ Error loading image loader: ${error.message}`);
    return false;
  }
}

// Run tests
function runTests() {
  log('Starting image loader validation...\n');
  
  const fileValid = validateImageLoaderFile();
  if (!fileValid) {
    process.exit(1);
  }

  const testsPass = testImageLoader();
  
  if (testsPass) {
    log('\n✅ Image loader validation completed successfully!');
    process.exit(0);
  } else {
    log('\n❌ Image loader validation failed!');
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  runTests();
}

module.exports = { testImageLoader, validateImageLoaderFile };
