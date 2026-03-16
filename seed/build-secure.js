#!/usr/bin/env node

/**
 * Build script for security-controlled environments
 * This script ensures proper JSX runtime compatibility
 */

import { build } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

async function buildSecure() {
  try {
    console.log(["all"],'Building for security-controlled environment...');
    
    await build({
      configFile: resolve(__dirname, 'vite.config.js'),
      mode: 'production',
      build: {
        outDir: 'dist-secure',
        rollupOptions: {
          external: [],
          output: {
            // Ensure JSX runtime is bundled
            manualChunks: {
              'jsx-runtime': ['react/jsx-runtime'],
              'vendor-react': ['react', 'react-dom'],
            },
            // Inline JSX runtime for compatibility
            inlineDynamicImports: true,
          }
        }
      },
      define: {
        // Ensure JSX runtime is available
        'process.env.NODE_ENV': '"production"',
        '__DEV__': false,
      }
    });
    
    console.log(["all"],'✅ Build completed successfully for secure environment');
    console.log(["all"],'📁 Output directory: dist-secure/');
    
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

buildSecure(); 