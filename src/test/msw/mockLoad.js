import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

export const mockLoad = async (url) => {
  // Always use Node.js file reading in test environment
  // Check if we're in a test environment by looking for vitest or test-related globals
  const isTestEnvironment = process.env.NODE_ENV === 'test' || 
                           process.env.VITEST || 
                           typeof global !== 'undefined' && global.vitest;
  
  if (isTestEnvironment || typeof window === 'undefined') {
    // Running in Node.js (test environment) - read directly from server-koa/data
    try {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);
      
      // Try multiple possible paths for the data files
      const possiblePaths = [
        join(__dirname, '..', '..', '..', 'server-koa', 'data', `${url}.json`),
        join(process.cwd(), 'server-koa', 'data', `${url}.json`),
        join(__dirname, '..', '..', '..', '..', 'server-koa', 'data', `${url}.json`)
      ];
      
      let data = null;
      let usedPath = null;
      
      for (const dataPath of possiblePaths) {
        try {
          //console.log(["all","msw"]`[MSW] Attempting to load mock data from: ${dataPath}`);
          data = readFileSync(dataPath, 'utf8');
          usedPath = dataPath;
          break;
        } catch (pathError) {
          console.log(["all","msw"]`[MSW] Path ${dataPath} not accessible: ${pathError.message}`);
        }
      }
      
      if (data) {
        const parsedData = JSON.parse(data);
        //console.log(["all","msw"]`[MSW] Successfully loaded mock data for ${url} from ${usedPath}:`, parsedData);
        return parsedData;
      } else {
        throw new Error('No accessible data file found');
      }
      
    } catch (error) {
      throw error;
    }
  } else {
    // Running in browser - fetch from mock endpoint
    return fetch(`/mock/${url}.json`).then(res => res.json());
  }
};
