/**
 * Next's `basePath` prefixes <Link>/navigation and asset URLs, but NOT manual
 * `fetch()` calls. Use this for fetching static files (e.g. the search index)
 * so they resolve correctly under a GitHub Pages sub-path.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string): string {
  return `${basePath}${path}`;
}
