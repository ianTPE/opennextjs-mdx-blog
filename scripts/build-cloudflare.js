#!/usr/bin/env node

/**
 * Safe Cloudflare build script
 * Temporarily switches to Cloudflare config, builds, then restores original config
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CONFIG_FILE = 'next.config.ts';
const CLOUDFLARE_CONFIG = 'next.config.cloudflare.ts';
const BACKUP_CONFIG = 'next.config.ts.backup';

function log(message) {
  console.log(`[Cloudflare Build] ${message}`);
}

function error(message) {
  console.error(`[Cloudflare Build Error] ${message}`);
}

async function buildForCloudflare() {
  try {
    log('Starting Cloudflare-optimized build...');

    // Step 1: Backup current config
    if (fs.existsSync(CONFIG_FILE)) {
      log('Backing up current next.config.ts...');
      fs.copyFileSync(CONFIG_FILE, BACKUP_CONFIG);
    }

    // Step 2: Copy Cloudflare config
    if (!fs.existsSync(CLOUDFLARE_CONFIG)) {
      error(`Cloudflare config file ${CLOUDFLARE_CONFIG} not found!`);
      process.exit(1);
    }

    log('Switching to Cloudflare configuration...');
    fs.copyFileSync(CLOUDFLARE_CONFIG, CONFIG_FILE);

    // Step 3: Run prebuild tasks
    log('Running prebuild tasks...');
    try {
      execSync('npm run prebuild', { stdio: 'inherit' });
    } catch (err) {
      log('Prebuild tasks not found or failed, continuing...');
    }

    // Step 4: Build with Next.js
    log('Building with Next.js...');
    execSync('next build', { 
      stdio: 'inherit',
      env: {
        ...process.env,
        NODE_ENV: 'production',
        NODE_OPTIONS: '--max-old-space-size=1024'
      }
    });

    log('✅ Cloudflare build completed successfully!');

    // Step 5: Show build info
    if (fs.existsSync('out')) {
      const stats = fs.statSync('out');
      log(`Build output directory: out/`);
      log(`Build completed at: ${stats.mtime}`);
      
      // Count files
      const countFiles = (dir) => {
        let count = 0;
        const files = fs.readdirSync(dir);
        for (const file of files) {
          const filePath = path.join(dir, file);
          if (fs.statSync(filePath).isDirectory()) {
            count += countFiles(filePath);
          } else {
            count++;
          }
        }
        return count;
      };
      
      const fileCount = countFiles('out');
      log(`Total files generated: ${fileCount}`);
    }

  } catch (err) {
    error(`Build failed: ${err.message}`);
    process.exit(1);
  } finally {
    // Step 6: Restore original config
    if (fs.existsSync(BACKUP_CONFIG)) {
      log('Restoring original configuration...');
      fs.copyFileSync(BACKUP_CONFIG, CONFIG_FILE);
      fs.unlinkSync(BACKUP_CONFIG);
    }
  }
}

// Handle process termination
process.on('SIGINT', () => {
  log('Build interrupted, cleaning up...');
  if (fs.existsSync(BACKUP_CONFIG)) {
    fs.copyFileSync(BACKUP_CONFIG, CONFIG_FILE);
    fs.unlinkSync(BACKUP_CONFIG);
  }
  process.exit(1);
});

process.on('SIGTERM', () => {
  log('Build terminated, cleaning up...');
  if (fs.existsSync(BACKUP_CONFIG)) {
    fs.copyFileSync(BACKUP_CONFIG, CONFIG_FILE);
    fs.unlinkSync(BACKUP_CONFIG);
  }
  process.exit(1);
});

// Run the build
buildForCloudflare();
