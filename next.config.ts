import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Playwright reaches the dev server through 127.0.0.1; without this, Next blocks the
  // client bundles for that origin and the E2E tests would run without hydration.
  allowedDevOrigins: ["127.0.0.1"],
  // The portfolio is deployed to Cloudflare Workers via @opennextjs/cloudflare.
  // The OpenNext build emits `.open-next/worker.js` (consumed by wrangler).
  // Keep this as a regular Next.js build — server actions and runtime secrets
  // would break the OpenNext adapter.
};

export default nextConfig;
