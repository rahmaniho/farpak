/**
 * Deployment base path ('' for root hosting, '/farpak' for GitHub Pages project sites).
 * Set via PAGES_BASE at build time (see astro.config.mjs). Safe to import under plain node (tests).
 */
const RAW: string = (import.meta as { env?: { BASE_URL?: string } }).env?.BASE_URL ?? '/';
export const BASE = RAW.replace(/\/$/, '');

/** Prefix an absolute site path ("/images/x.jpg") with the deployment base. */
export function withBase(path: string): string {
  return `${BASE}${path.startsWith('/') ? path : `/${path}`}`;
}
