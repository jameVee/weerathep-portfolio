import type { APIRoute } from 'astro';
import { faviconPng } from '../lib/og';

/** iOS home-screen icon. iOS rounds the corners itself, so this one is square. */
export const GET: APIRoute = async () =>
  new Response(new Uint8Array(await faviconPng(180, false)), { headers: { 'Content-Type': 'image/png' } });
