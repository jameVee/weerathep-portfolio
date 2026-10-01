/**
 * Build-time image generation (social preview cards and favicons) with Satori + Sharp.
 * Satori turns a small element tree into an SVG with text converted to paths,
 * and Sharp rasterises it to PNG. Runs only during `astro build` / `astro dev`.
 */
import fs from 'node:fs';
import path from 'node:path';
import satori from 'satori';
import sharp from 'sharp';

type Child = Node | string;
interface Node {
  type: string;
  props: { style?: Record<string, unknown>; children?: Child | Child[]; [k: string]: unknown };
}
const h = (type: string, style: Record<string, unknown>, ...children: Child[]): Node => ({
  type,
  props: { style: { display: 'flex', ...style }, children },
});

/* black palette from global.css */
const C = {
  bg: '#08090C',
  surface: '#11141A',
  ink: '#ECEFF4',
  muted: '#9AA4B2',
  line: '#232833',
  gold: '#F5B83D',
  goldSoft: '#2A2210',
  goldBright: '#F5B83D',
  coral: '#FF7A59',
  violet: '#A78BFA',
  teal: '#2DD4BF',
  black: '#08090C',
};

const fontFile = (pkg: string, file: string) =>
  fs.readFileSync(path.join(process.cwd(), 'node_modules', '@fontsource', pkg, 'files', file));

let fontCache: Parameters<typeof satori>[1]['fonts'] | undefined;
function fonts() {
  fontCache ??= [
    { name: 'Bricolage', data: fontFile('bricolage-grotesque', 'bricolage-grotesque-latin-800-normal.woff'), weight: 800, style: 'normal' },
    { name: 'Bricolage', data: fontFile('bricolage-grotesque', 'bricolage-grotesque-latin-500-normal.woff'), weight: 500, style: 'normal' },
    { name: 'Public Sans', data: fontFile('public-sans', 'public-sans-latin-400-normal.woff'), weight: 400, style: 'normal' },
    { name: 'JetBrains Mono', data: fontFile('jetbrains-mono', 'jetbrains-mono-latin-400-normal.woff'), weight: 400, style: 'normal' },
  ];
  return fontCache;
}

async function toPng(node: Node, width: number, height: number): Promise<Buffer> {
  const svg = await satori(node as never, { width, height, fonts: fonts() });
  return sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
}

/* The dotted Bangkok → Moscow route from the hero, as a standalone SVG. */
const routeSvg = () => {
  const dots = Array.from({ length: 14 }, (_, i) => 20 + i * 24)
    .map((x) => `<circle cx="${x}" cy="20" r="1.4" fill="${C.line}"/><circle cx="${x}" cy="200" r="1.4" fill="${C.line}"/>`)
    .join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 220" width="360" height="220">${dots}
    <path d="M290 168 C 250 60, 140 40, 64 62" fill="none" stroke="${C.gold}" stroke-width="2.5" stroke-dasharray="2 7" stroke-linecap="round"/>
    <circle cx="290" cy="168" r="9" fill="${C.goldSoft}"/><circle cx="290" cy="168" r="5" fill="${C.gold}"/>
    <circle cx="64" cy="62" r="9" fill="${C.goldSoft}"/><circle cx="64" cy="62" r="5" fill="${C.ink}"/></svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
};

const brand = () =>
  h('div', { alignItems: 'baseline', fontFamily: 'Bricolage', fontWeight: 800, fontSize: 34, color: C.ink },
    'Weerathep', h('span', { color: C.gold }, '.'));

const eyebrow = (text: string) =>
  h('div', { fontFamily: 'JetBrains Mono', fontSize: 22, letterSpacing: 2, color: C.muted, textTransform: 'uppercase' }, text);

/** src/assets/me.* as a JPEG data URI, or undefined if there is no photo. */
async function portrait(w: number, hgt: number): Promise<string | undefined> {
  const dir = path.join(process.cwd(), 'src', 'assets');
  const file = fs.existsSync(dir) ? fs.readdirSync(dir).find((n) => /^me\.(jpe?g|png|webp|avif)$/i.test(n)) : undefined;
  if (!file) return undefined;
  const buf = await sharp(path.join(dir, file)).resize(w * 2, hgt * 2, { fit: 'cover', position: 'top' }).jpeg({ quality: 82 }).toBuffer();
  return `data:image/jpeg;base64,${buf.toString('base64')}`;
}

const RAINBOW = `linear-gradient(135deg, ${C.gold}, ${C.coral} 35%, ${C.violet} 70%, ${C.teal})`;

/** The site-wide 1200×630 card: name, role and your photo (or the route card if there is no photo). */
export async function homeOgImage(): Promise<Buffer> {
  const photo = await portrait(340, 380);
  const side = photo
    ? h('div', { padding: 4, borderRadius: 26, backgroundImage: RAINBOW },
        { type: 'img', props: { src: photo, width: 340, height: 380, style: { borderRadius: 22 } } })
    : h('div', { flexDirection: 'column', background: C.surface, border: `2px solid ${C.line}`, borderRadius: 22, padding: 26, width: 400 },
        { type: 'img', props: { src: routeSvg(), width: 348, height: 213 } },
        h('div', { justifyContent: 'space-between', marginTop: 10, fontFamily: 'Bricolage', fontWeight: 800, fontSize: 24, color: C.ink },
          h('span', {}, 'Bangkok'), h('span', {}, 'Moscow')));
  const node = h('div', { width: 1200, height: 630, background: C.bg, padding: '56px 72px', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'Public Sans' },
    h('div', { flexDirection: 'column', justifyContent: 'space-between', height: 518, width: 680 },
      brand(),
      h('div', { flexDirection: 'column' },
        eyebrow('Engineer · Machine learning systems'),
        h('div', { fontFamily: 'Bricolage', fontWeight: 800, fontSize: 88, lineHeight: 1, letterSpacing: -3, color: C.ink, marginTop: 22 }, 'Weerathep'),
        h('div', { fontFamily: 'Bricolage', fontWeight: 500, fontSize: 88, lineHeight: 1.05, letterSpacing: -3, backgroundImage: `linear-gradient(90deg, ${C.gold}, ${C.coral} 45%, ${C.violet})`, backgroundClip: 'text', color: 'transparent' }, 'Rattanajaratkul'),
        h('div', { fontSize: 26, lineHeight: 1.45, color: C.muted, marginTop: 24 }, 'Machine learning systems that leave the notebook and run in production.'),
      ),
      h('div', { height: 6, width: 160, backgroundImage: RAINBOW, borderRadius: 3 }),
    ),
    side,
  );
  return toPng(node, 1200, 630);
}

/** Per-project 1200×630 card: title, summary and tags. */
export function projectOgImage(p: { title: string; summary: string; tags: string[] }): Promise<Buffer> {
  const summary = p.summary.length > 170 ? `${p.summary.slice(0, 167).replace(/\s+\S*$/, '')}…` : p.summary;
  const node = h('div', { width: 1200, height: 630, background: C.bg, padding: '56px 72px', flexDirection: 'column', justifyContent: 'space-between', fontFamily: 'Public Sans' },
    h('div', { justifyContent: 'space-between', alignItems: 'baseline' }, brand(), eyebrow('Project')),
    h('div', { flexDirection: 'column' },
      h('div', { fontFamily: 'Bricolage', fontWeight: 800, fontSize: 68, lineHeight: 1.05, letterSpacing: -2, color: C.ink, maxWidth: 1000 }, p.title),
      h('div', { fontSize: 27, lineHeight: 1.45, color: C.muted, marginTop: 24, maxWidth: 980 }, summary),
    ),
    h('div', { alignItems: 'center', justifyContent: 'space-between' },
      h('div', { gap: 10 },
        ...p.tags.slice(0, 4).map((t) =>
          h('div', { fontFamily: 'JetBrains Mono', fontSize: 20, color: C.muted, background: C.surface, border: `2px solid ${C.line}`, borderRadius: 8, padding: '6px 14px' }, t)),
      ),
      h('div', { height: 6, width: 160, backgroundImage: `linear-gradient(90deg, ${C.gold}, ${C.coral}, ${C.violet}, ${C.teal})`, borderRadius: 3 }),
    ),
  );
  return toPng(node, 1200, 630);
}

/** "W." in gold on black, as an SVG (text already converted to paths). */
export function faviconSvg(size = 64): Promise<string> {
  const node = h('div', { width: size, height: size, background: C.black, borderRadius: size * 0.22, alignItems: 'center', justifyContent: 'center', fontFamily: 'Bricolage', fontWeight: 800, fontSize: size * 0.62, color: C.goldBright, letterSpacing: -size * 0.02, paddingBottom: size * 0.04 },
    'W.');
  return satori(node as never, { width: size, height: size, fonts: fonts() });
}

/** Square PNG favicon (for apple-touch-icon and favicon.ico). */
export async function faviconPng(size: number, rounded = true): Promise<Buffer> {
  const node = h('div', { width: size, height: size, background: C.black, borderRadius: rounded ? size * 0.22 : 0, alignItems: 'center', justifyContent: 'center', fontFamily: 'Bricolage', fontWeight: 800, fontSize: size * 0.62, color: C.goldBright, letterSpacing: -size * 0.02, paddingBottom: size * 0.04 },
    'W.');
  return toPng(node, size, size);
}

/** Wrap PNGs into a .ico container (PNG-compressed entries are valid in ICO). */
export function pngsToIco(images: { size: number; data: Buffer }[]): Buffer {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  const dir = Buffer.alloc(16 * images.length);
  let offset = 6 + dir.length;
  images.forEach((img, i) => {
    const o = i * 16;
    dir.writeUInt8(img.size >= 256 ? 0 : img.size, o);
    dir.writeUInt8(img.size >= 256 ? 0 : img.size, o + 1);
    dir.writeUInt8(0, o + 2);
    dir.writeUInt8(0, o + 3);
    dir.writeUInt16LE(1, o + 4);
    dir.writeUInt16LE(32, o + 6);
    dir.writeUInt32LE(img.data.length, o + 8);
    dir.writeUInt32LE(offset, o + 12);
    offset += img.data.length;
  });
  return Buffer.concat([header, dir, ...images.map((i) => i.data)]);
}
