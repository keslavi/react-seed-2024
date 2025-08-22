import { setupWorker } from 'msw/browser';
import { mswTask } from './mswTask';
import { mswOption } from './mswOption';
import { config } from '../../config';

// Only set up MSW when explicitly enabled in config
if (config.msw === true) {
  console.log(["all"],'[MSW] Setting up browser MSW - explicitly enabled in config');
  
  // Use existing handlers from test environment
  const browserHandlers = [...mswTask, ...mswOption];
  
  const worker = setupWorker(...browserHandlers);
  
  // Start the worker
  worker.start({
    onUnhandledRequest: 'warn', // Warn about unhandled requests in dev
    serviceWorker: {
      url: '/mockServiceWorker.js'
    }
  }).then(() => {
    console.log('[MSW] Browser MSW worker started successfully with handlers:', browserHandlers.length);
  }).catch((error) => {
    console.warn('[MSW] Failed to start browser MSW worker:', error);
  });
} else {
  console.log('[MSW] Skipping MSW setup in production mode');
} 