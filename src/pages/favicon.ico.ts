import type { APIRoute } from 'astro';
import { faviconPng, pngsToIco } from '../lib/og';

export const GET: APIRoute = async () => {
  const sizes = [16, 32, 48];
  const images = await Promise.all(sizes.map(async (size) => ({ size, data: await faviconPng(size, false) })));
  return new Response(new Uint8Array(pngsToIco(images)), { headers: { 'Content-Type': 'image/x-icon' } });
};
