import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // This portfolio is intentionally static: no server actions, auth, API routes or SSR.
  // `next build` emits the deployable site to `out/`, which Cloudflare Pages can serve directly.
  output: "export",
  // Directory-style routes are the most portable option across static hosts.
  trailingSlash: true,
};

export default nextConfig;
