// Browser-compatible mock data loading for MSW
// This is a drop-in replacement for mockLoad that works in the browser environment
// It mimics the same API as mockLoad but uses fetch instead of Node.js fs

export const mockLoadBrowser = async (url) => {
  try {
    //console.log(`[MSW] Attempting to fetch mock data for ${url} from /mock/${url}.json`);
    const response = await fetch(`/mock/${url}.json`);
    
    if (response.ok) {
      const data = await response.json();
      //console.log(`[MSW] Successfully loaded mock data for ${url}:`, data);
      return data;
    } else {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error(`[MSW] Failed to fetch mock data for ${url}:`, error.message);
    throw error;
  }
};

// Export as mockLoad for compatibility with existing handlers
export const mockLoad = mockLoadBrowser; 