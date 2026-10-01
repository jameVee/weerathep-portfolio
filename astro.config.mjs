// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * Where the site lives. Resolution order:
 *  1. SITE_URL / BASE_PATH env vars (set by the GitHub Pages workflow, or by you for a custom domain)
 *  2. Vercel's production domain, which Vercel exposes automatically during builds
 *  3. A local fallback for `npm run dev`
 */
const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const site =
  process.env.SITE_URL ||
  (vercelHost ? `https://${vercelHost}` : 'https://weerathep.vercel.app');
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  output: 'static',
  integrations: [sitemap()],
});
