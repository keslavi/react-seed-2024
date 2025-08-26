export const mockLoad = async (url) => {
  // Simple and reliable Node.js detection
  const isNode = typeof process !== 'undefined' && process.versions && process.versions.node;
  
//  console.log(["all"], `[MSW] mockLoad called for ${url}, isNode: ${isNode}`);
  
  if (isNode) {
    // Running in Node.js (test environment) - read and eval IIFE files
    try {
      // Dynamic imports for Node.js modules
      const { readFileSync } = await import('fs');
      const { fileURLToPath } = await import('url');
      const { dirname, join } = await import('path');
      
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);
      
      // Path to the data directory
      const dataPath = join(__dirname, '..', '..', '..', 'server-koa', 'data', `${url}.js`);
      
      // Read the IIFE file content
      const fileContent = readFileSync(dataPath, 'utf8');
      
      // Execute the IIFE and return the result
      const data = eval(fileContent);
      
     //console.log(["all"], `[MSW] Successfully loaded mock data for ${url} from ${dataPath}`);
      return data;
      
    } catch (error) {
      console.error(["all"], `[MSW] Error loading mock data for ${url}:`, error.message);
      throw new Error(`Failed to load mock data for ${url}: ${error.message}`);
    }
  } else {
    // Running in browser - fetch and eval IIFE files
    try {
     // console.log(["all"], `[MSW] Attempting to fetch /mock/${url}.js from browser`);
      
      const response = await fetch(`/mock/${url}.js`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const fileContent = await response.text();
      //console.log(["all"], `[MSW] Successfully fetched /mock/${url}.js, content length: ${fileContent.length}`);
      
      // Execute the IIFE and return the result
      const data = eval(fileContent);
      
      // console.log(["all"], `[MSW] Successfully loaded mock data for ${url} from browser`);
      return data;
      
    } catch (error) {
      console.error(["all"], `[MSW] Error loading mock data for ${url} from browser:`, error.message);
      throw new Error(`Failed to load mock data for ${url} from browser: ${error.message}`);
    }
  }
};
