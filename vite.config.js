import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5001",
        changeOrigin: true,
        //rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "config": path.resolve(__dirname, "./config/config.js"),
      "components": path.resolve(__dirname, "./src/components"),
      "helpers": path.resolve(__dirname, "./src/helpers"),
      "pages": path.resolve(__dirname, "./src/pages"),
      //"assets": path.resolve(__dirname, "./src/assets"),
      
    },
  },
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      }
    })
  ],
  optimizeDeps:{
    include: [
      '@emotion/react',
      '@emotion/styled',
      '@mui/material/Tooltip',
      '@mui/material/styles/createTheme',
      '@mui/material/Box',
      '@mui/icons-material',
    ]
  }
});
