#!/usr/bin/env node

/**
 * Script to copy mock data files from server-koa/data to dist/mock
 * This can be run independently of the build process
 */

import { copyFileSync, mkdirSync, readdirSync, statSync } from 'fs';
import { resolve, join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceDir = resolve(__dirname, 'server-koa/data');
const targetDir = resolve(__dirname, 'public/mock');

console.log(["all"],'Copying mock data files...');
console.log(["all"],'Source:', sourceDir);
console.log(["all"],'Target:', targetDir);

try {
  // Create target directory if it doesn't exist
  mkdirSync(targetDir, { recursive: true });
  
  // Copy files recursively
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
        copyFileSync(srcPath, destPath);
        console.log(["all"],`Copied: ${item}`);
      }
    });
  };
  
  if (statSync(sourceDir).isDirectory()) {
    copyRecursive(sourceDir, targetDir);
    console.log(["all"],'✅ Mock data files copied successfully to public/mock/');
  } else {
    console.error('❌ Source directory does not exist:', sourceDir);
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Error copying files:', error.message);
  process.exit(1);
} 