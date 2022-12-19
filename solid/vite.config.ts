import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [solid()],
  server: {
    proxy: {
      "/todos": "http://localhost:8080",
      "/trpc": "http://localhost:8080",
    },
  },
});
