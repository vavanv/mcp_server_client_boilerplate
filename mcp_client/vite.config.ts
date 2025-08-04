import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      "/api/mcp": {
        target: "https://mcp.bmcom.ca",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/mcp/, "/mcp"),
        secure: true,
      },
      "/api/health": {
        target: "https://mcp.bmcom.ca",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/health/, "/health"),
        secure: true,
      },
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
