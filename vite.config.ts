import { defineConfig } from "vite";

// api/ is NOT part of this build — Vercel deploys find-sources.ts separately
// as a serverless function. The static build is only the page.
export default defineConfig({
  build: {
    target: "es2022",
  },
});
