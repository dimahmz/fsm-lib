import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    proxy: {
      "/serverip": {
        target: "http://127.0.0.1:8000/api/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/serverip/, ""),
      },
    },
  },
});
