import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  root: resolve(__dirname, "src/questions/q3/app"),
  build: {
    outDir: resolve(__dirname, "dist-q3"),
    emptyOutDir: true,
  },
  server: {
    port: 5173
  }
});
