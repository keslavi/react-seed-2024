import path from "path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";

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
  },
  plugins: [react()],
  optimizeDeps:{
    include: [
      '@emotion/react',
      '@emotion/styled',
      '@mui/material/Tooltip',
      '@mui/material/styles/createTheme',
      '@mui/material/Box',
      '@mui/icons-material',
    ]
  },
  envDir: '.',
  envPrefix: 'VITE_',
});
