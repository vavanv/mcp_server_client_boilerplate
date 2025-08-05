import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(() => {
  // Get the proxy target from environment variables
  const proxyTarget = process.env.VITE_PROXY_TARGET || "http://localhost:3100";

  return {
    plugins: [react()],
    server: {
      port: 3000,
      open: true,
      proxy: {
        "/api/mcp": {
          target: proxyTarget,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/mcp/, "/mcp"),
          secure: proxyTarget.startsWith("https://"),
        },
        "/api/health": {
          target: proxyTarget,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/health/, "/health"),
          secure: proxyTarget.startsWith("https://"),
        },
      },
    },
    build: {
      outDir: "dist",
      sourcemap: true,
    },
  };
});
