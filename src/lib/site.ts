/** Site-wide settings. Edit these instead of hunting through components. */
export const SITE = {
  name: 'Weerathep Rattanajaratkul',
  shortName: 'Weerathep',
  title: 'Weerathep Rattanajaratkul',
  description:
    'Portfolio of Weerathep Rattanajaratkul — engineer working on machine learning systems, from Bangkok to Moscow.',
  jobTitle: 'Engineer, machine learning systems',
  email: 'weeratheprattanajaratkul@gmail.com',
  linkedin: 'https://www.linkedin.com/in/weerathep-rat/',
  linkedinLabel: 'linkedin.com/in/weerathep-rat',
  /** live CV on Canva: edits there show up on the site immediately */
  resume: 'https://canva.link/56urtxu75fzcmrq',
  locale: 'en',
} as const;

/** Prefix a site path with the configured `base` (needed for GitHub Pages project sites). */
export function url(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.replace(/^\//, '');
  return `${base}/${clean}`;
}

/** Absolute URL (for canonical, Open Graph, sitemap, robots.txt). */
export function absoluteUrl(path: string, site: URL | undefined): string {
  return new URL(url(path), site ?? 'http://localhost:4321').href;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * Format a YYYY-MM range the way the design writes it:
 *   2026-06 → 2026-07  =>  "Jun – Jul 2026"
 *   2024-06 → 2025-08  =>  "Jun 2024 – Aug 2025"
 *   2026-06 → (none)   =>  "Jun 2026 – Present"
 */
export function formatRange(start: string, end?: string): string {
  const [sy, sm] = start.split('-').map(Number);
  const s = `${MONTHS[sm - 1]} ${sy}`;
  if (!end) return `${s} – Present`;
  const [ey, em] = end.split('-').map(Number);
  if (sy === ey && sm === em) return s;
  if (sy === ey) return `${MONTHS[sm - 1]} – ${MONTHS[em - 1]} ${ey}`;
  return `${s} – ${MONTHS[em - 1]} ${ey}`;
}
