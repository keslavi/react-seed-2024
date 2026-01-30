// Converts all .json files in this directory to .js files wrapped in an IIFE

import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join, extname, basename } from 'path';

const dataDir = process.cwd(); // Run this script from server-koa/data

const files = readdirSync(dataDir);

files.forEach(file => {
  if (extname(file) === '.json') {
    const jsonPath = join(dataDir, file);
    const jsPath = join(dataDir, basename(file, '.json') + '.js');
    const jsonContent = readFileSync(jsonPath, 'utf8').trim();

    // Wrap JSON in an IIFE
    const iifeContent = `(() => ${jsonContent})()`;

    writeFileSync(jsPath, iifeContent, 'utf8');
    console.log(`Converted ${file} -> ${basename(jsPath)}`);
  }
});