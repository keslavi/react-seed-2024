import path from "path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";

// Plugin to fix prop-types import issues
const propTypesFixPlugin = () => {
  return {
    name: 'prop-types-fix',
    resolveId(id) {
      if (id === 'prop-types') {
        return 'prop-types';
      }
      return null;
    },
    load(id) {
      if (id === 'prop-types') {
        return `
          import * as PropTypes from 'prop-types';
          export default PropTypes;
          export * from 'prop-types';
        `;
      }
      return null;
    }
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    host: true,
    proxy: {
      //mock server should have the same endpoint as the eventual live endpoint
      //that way we can just remove "mock/" and switch to live endpoint.
      "/api": {   
        target: "http://localhost:5000",
        changeOrigin: true,
        //rewrite: (path)=> path.replace(/^\/api\/mock/,"api"),
      },

      "/api/mock": {   
        target: "http://localhost:5000",
        changeOrigin: true,
        rewrite: (path)=> path.replace(/^\/api\/mock/,"api"),
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1000, // Increase warning limit to 1000kb
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-mui': ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
          'vendor-utils': ['lodash', 'moment', 'axios', 'yup', 'zustand'],
        },
        // Ensure chunks are named consistently
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "config": path.resolve(__dirname, "./config/config.js"),
      "components": path.resolve(__dirname, "./src/components"),
      "helpers": path.resolve(__dirname, "./src/helpers"),
      "pages": path.resolve(__dirname, "./src/pages"),
      "store": path.resolve(__dirname, "./src/store"),
      //"assets": path.resolve(__dirname, "./src/assets"),
    },
    dedupe: ['react', 'react-dom', 'react-is', 'prop-types'],
  },
  plugins: [react(), propTypesFixPlugin()],
  optimizeDeps:{
    include: [
      '@emotion/react',
      '@emotion/styled',
      '@mui/material/Tooltip',
      '@mui/material/Box',
      'react-is',
      '@mui/utils',
      '@mui/system',
      '@mui/private-theming',
      'prop-types',
    ],
    exclude: [
      '@mui/icons-material'
    ],
    esbuildOptions: {
      // Ensure React 19 compatibility
      jsx: 'automatic',
      jsxImportSource: 'react',
    }
  },
  envDir: '.',
  envPrefix: 'VITE_',
});
