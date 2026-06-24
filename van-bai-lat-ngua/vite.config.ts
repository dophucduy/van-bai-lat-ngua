import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Set base to "./" so the build also works on GitHub Pages or any subfolder deploy.
export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    port: 5173,
    open: true
  }
});
