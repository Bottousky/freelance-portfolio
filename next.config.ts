import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The portfolio is deployed to Cloudflare Workers via @opennextjs/cloudflare.
  // The OpenNext build emits `.open-next/worker.js` (consumed by wrangler).
  // Keep this as a regular Next.js build — server actions and runtime secrets
  // would break the OpenNext adapter.
};

export default nextConfig;
