/**
 * @file  next.config.mjs
 * @spec  design.md § 11 (P-01 performance budget)
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // `experimental.optimizePackageImports: ["motion"]` was dropped: measured at 145 kB with and
  // without it, so it earns nothing once LazyMotion is doing the tree-shaking. Removed rather
  // than carrying an experimental flag for no benefit.
};

export default nextConfig;
