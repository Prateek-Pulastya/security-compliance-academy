import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages.
 *
 * On a GitHub *project* page the site is served from a sub-path
 * (https://<user>.github.io/<repo>/), so `basePath` must match the repo name.
 * It is provided via NEXT_PUBLIC_BASE_PATH in CI and left empty for local dev.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  images: { unoptimized: true },
};

export default nextConfig;
