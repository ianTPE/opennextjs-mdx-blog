#!/usr/bin/env node

/**
 * Sync dependencies and update package-lock.json
 * This script ensures package.json and package-lock.json are in sync
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function log(message) {
  console.log(`[Dependency Sync] ${message}`);
}

function error(message) {
  console.error(`[Dependency Sync Error] ${message}`);
}

function syncDependencies() {
  try {
    log('Starting dependency synchronization...');

    // Check if package.json exists
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
      error('package.json not found!');
      process.exit(1);
    }

    // Check if package-lock.json exists
    const lockFilePath = path.join(process.cwd(), 'package-lock.json');
    const hasLockFile = fs.existsSync(lockFilePath);

    if (hasLockFile) {
      log('Found existing package-lock.json');
      
      // Try to detect if they're out of sync
      try {
        execSync('npm ci --dry-run', { stdio: 'pipe' });
        log('✅ Dependencies are already in sync');
        return true;
      } catch (err) {
        log('⚠️  Dependencies are out of sync, fixing...');
      }
    } else {
      log('No package-lock.json found, will create one');
    }

    // Remove node_modules and package-lock.json to start fresh
    log('Cleaning up old dependencies...');
    
    if (fs.existsSync('node_modules')) {
      log('Removing node_modules directory...');
      execSync('rm -rf node_modules', { stdio: 'inherit' });
    }

    if (hasLockFile) {
      log('Removing old package-lock.json...');
      fs.unlinkSync(lockFilePath);
    }

    // Install dependencies fresh
    log('Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });

    // Verify the installation
    log('Verifying installation...');
    execSync('npm ci --dry-run', { stdio: 'pipe' });

    log('✅ Dependencies synchronized successfully!');
    
    // Show some stats
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const depCount = Object.keys(packageJson.dependencies || {}).length;
    const devDepCount = Object.keys(packageJson.devDependencies || {}).length;
    
    log(`📊 Dependency summary:`);
    log(`   Dependencies: ${depCount}`);
    log(`   Dev Dependencies: ${devDepCount}`);
    log(`   Total: ${depCount + devDepCount}`);

    return true;

  } catch (err) {
    error(`Failed to sync dependencies: ${err.message}`);
    return false;
  }
}

function checkGitStatus() {
  try {
    // Check if we're in a git repository
    execSync('git status', { stdio: 'pipe' });
    
    // Check if package-lock.json has changes
    const status = execSync('git status --porcelain package-lock.json', { encoding: 'utf8' });
    
    if (status.trim()) {
      log('📝 package-lock.json has been updated');
      log('💡 Remember to commit the changes:');
      log('   git add package-lock.json');
      log('   git commit -m "Update package-lock.json"');
      log('   git push');
    } else {
      log('📝 No changes to package-lock.json');
    }
    
  } catch (err) {
    log('Not in a git repository or git not available');
  }
}

// Main execution
function main() {
  log('🔄 Starting dependency synchronization process...\n');
  
  const success = syncDependencies();
  
  if (success) {
    log('\n🎉 Dependency synchronization completed successfully!');
    checkGitStatus();
  } else {
    log('\n❌ Dependency synchronization failed!');
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { syncDependencies, checkGitStatus };
