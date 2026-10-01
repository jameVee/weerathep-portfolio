import type { APIRoute } from 'astro';
import { homeOgImage } from '../lib/og';

/** Social preview for the home page: /og-image.png (1200×630). */
export const GET: APIRoute = async () =>
  new Response(new Uint8Array(await homeOgImage()), { headers: { 'Content-Type': 'image/png' } });
