import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // A static site: `npm run build` writes plain HTML/CSS/JS to /out, which any
  // static host (Vercel, Netlify, Cloudflare Pages, S3) can serve.
  output: "export",
  trailingSlash: true,
  poweredByHeader: false,
  images: { unoptimized: true },
  turbopack: { root: path.resolve(__dirname) },
  outputFileTracingRoot: path.resolve(__dirname),
  experimental: {
    // Same setting as the CarouseLabs app: Turbopack's build cache once served
    // a stale stylesheet after a large change. Build from scratch every time.
    turbopackFileSystemCacheForBuild: false,
  },
};

export default nextConfig;
