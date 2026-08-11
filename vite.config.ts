import { defineConfig } from "vite";

// api/ is NOT part of this build — Vercel deploys find-sources.ts separately
// as a serverless function. The static build is the two pages.
export default defineConfig({
  build: {
    target: "es2022",
    rollupOptions: {
      input: {
        main: "index.html",
        methodology: "methodology.html",
      },
    },
  },
});
