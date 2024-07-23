import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const targetUri = "http://localhost:3000"


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: targetUri,
        changeOrigin: true,
        secure: false,
      },
      "/graphql": {
        target: targetUri,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
