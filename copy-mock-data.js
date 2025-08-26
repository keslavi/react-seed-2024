#!/usr/bin/env node

/**
 * Script to copy mock data files from server-koa/data to dist/mock
 * This can be run independently of the build process
 * Only copies files if source is newer than destination
 */

import { copyFileSync, mkdirSync, readdirSync, statSync } from 'fs';
import { resolve, join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceDir = resolve(__dirname, 'server-koa/data');
const targetDir = resolve(__dirname, 'public/mock');

console.log('Copying mock data files...');
console.log('Source:', sourceDir);
console.log('Target:', targetDir);

try {
  // Create target directory if it doesn't exist
  mkdirSync(targetDir, { recursive: true });

  const { existsSync } = await import('fs'); // dynamic import for compatibility
  
  let copiedCount = 0;
  let skippedCount = 0;
  
  // Copy files recursively, only if source is newer or dest doesn't exist
  const copyRecursive = (src, dest) => {
    const items = readdirSync(src);
    items.forEach(item => {
      const srcPath = join(src, item);
      const destPath = join(dest, item);
      const stat = statSync(srcPath);

      if (stat.isDirectory()) {
        mkdirSync(destPath, { recursive: true });
        copyRecursive(srcPath, destPath);
      } else {
        let shouldCopy = true;
        let reason = 'destination does not exist';
        
        if (existsSync(destPath)) {
          const destStat = statSync(destPath);
          // Only copy if source is newer
          shouldCopy = stat.mtime > destStat.mtime;
          if (!shouldCopy) {
            reason = 'destination is newer or same age';
          }
        }
        
        if (shouldCopy) {
          copyFileSync(srcPath, destPath);
          console.log(`✅ Copied: ${item}`);
          copiedCount++;
        } else {
          console.log(`⏭️  Skipped: ${item} (${reason})`);
          skippedCount++;
        }
      }
    });
  };
  
  if (statSync(sourceDir).isDirectory()) {
    copyRecursive(sourceDir, targetDir);
    console.log('\n📊 Copy Summary:');
    console.log(`   Copied: ${copiedCount} files`);
    console.log(`   Skipped: ${skippedCount} files`);
    console.log('✅ Mock data files processed successfully');
  } else {
    console.error('❌ Source directory does not exist:', sourceDir);
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Error copying files:', error.message);
  process.exit(1);
}