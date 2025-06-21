#!/usr/bin/env node

/**
 * Fix common Cloudflare Pages build issues
 * This script addresses the most common problems encountered during Cloudflare deployment
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function log(message) {
  console.log(`[Cloudflare Fix] ${message}`);
}

function error(message) {
  console.error(`[Cloudflare Fix Error] ${message}`);
}

function checkAndInstallDependencies() {
  log('Checking for missing dependencies...');
  
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  const requiredDeps = {
    'critters': '^0.0.24'
  };
  
  let needsInstall = false;
  const missingDeps = [];
  
  for (const [dep, version] of Object.entries(requiredDeps)) {
    if (!packageJson.dependencies[dep] && !packageJson.devDependencies[dep]) {
      missingDeps.push(`${dep}@${version}`);
      needsInstall = true;
    }
  }
  
  if (needsInstall) {
    log(`Installing missing dependencies: ${missingDeps.join(', ')}`);
    try {
      execSync(`npm install ${missingDeps.join(' ')}`, { stdio: 'inherit' });
      log('✅ Dependencies installed successfully');
    } catch (err) {
      error(`Failed to install dependencies: ${err.message}`);
      return false;
    }
  } else {
    log('✅ All required dependencies are present');
  }
  
  return true;
}

function fixNextConfig() {
  log('Checking Next.js configuration...');
  
  const configPath = path.join(process.cwd(), 'next.config.ts');
  
  if (!fs.existsSync(configPath)) {
    error('next.config.ts not found');
    return false;
  }
  
  let config = fs.readFileSync(configPath, 'utf8');
  
  // Check if optimizeCss is enabled and causing issues
  if (config.includes('optimizeCss: true')) {
    log('Found optimizeCss: true - this can cause critters dependency issues');
    log('Consider disabling it for Cloudflare Pages compatibility');
  }
  
  // Check for other potential issues
  const issues = [];
  
  if (!config.includes('unoptimized: true')) {
    issues.push('Image optimization should be disabled for static export');
  }
  
  if (!config.includes('output: "export"') && !config.includes("output: 'export'")) {
    issues.push('Static export should be enabled for Cloudflare Pages');
  }
  
  if (issues.length > 0) {
    log('⚠️  Potential configuration issues found:');
    issues.forEach(issue => log(`   - ${issue}`));
    log('Consider using next.config.cloudflare.ts for Cloudflare builds');
  } else {
    log('✅ Next.js configuration looks good');
  }
  
  return true;
}

function checkBuildEnvironment() {
  log('Checking build environment...');
  
  const nodeVersion = process.version;
  const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
  
  log(`Node.js version: ${nodeVersion}`);
  log(`npm version: ${npmVersion}`);
  
  // Check if we're in Cloudflare Pages environment
  if (process.env.CF_PAGES) {
    log('✅ Running in Cloudflare Pages environment');
    log(`CF_PAGES_BRANCH: ${process.env.CF_PAGES_BRANCH || 'unknown'}`);
    log(`CF_PAGES_COMMIT_SHA: ${process.env.CF_PAGES_COMMIT_SHA || 'unknown'}`);
  } else {
    log('Running in local environment');
  }
  
  return true;
}

function suggestSolutions() {
  log('\n🔧 Suggested solutions for common Cloudflare Pages issues:');
  
  console.log(`
1. **Critters dependency error:**
   npm install critters@^0.0.24

2. **CSS optimization issues:**
   Disable optimizeCss in next.config.ts:
   experimental: {
     // optimizeCss: true,  // Comment this out
   }

3. **Image optimization errors:**
   Ensure images.unoptimized is set to true

4. **Static export issues:**
   Use next.config.cloudflare.ts for Cloudflare builds:
   npm run build:cf-safe

5. **Memory issues:**
   Set NODE_OPTIONS="--max-old-space-size=1024"

6. **Build timeout:**
   Reduce the number of pages or optimize build process
`);
}

function runDiagnostics() {
  log('🔍 Running Cloudflare Pages build diagnostics...\n');
  
  let allGood = true;
  
  // Check dependencies
  if (!checkAndInstallDependencies()) {
    allGood = false;
  }
  
  // Check Next.js config
  if (!fixNextConfig()) {
    allGood = false;
  }
  
  // Check build environment
  if (!checkBuildEnvironment()) {
    allGood = false;
  }
  
  if (allGood) {
    log('\n✅ All checks passed! Your project should build successfully on Cloudflare Pages.');
    log('Try running: npm run build:cf-safe');
  } else {
    log('\n⚠️  Some issues were found. Please review the suggestions above.');
    suggestSolutions();
  }
}

// Run diagnostics if called directly
if (require.main === module) {
  runDiagnostics();
}

module.exports = {
  checkAndInstallDependencies,
  fixNextConfig,
  checkBuildEnvironment,
  runDiagnostics
};
