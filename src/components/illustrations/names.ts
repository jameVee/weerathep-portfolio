/**
 * Names you can use in a content file's `illustration:` field.
 * To add one: create the SVG component in this folder, add its name here,
 * and register it in ./index.ts.
 */
export const ILLUSTRATIONS = [
  'two-tier-validation',
  'network-outage',
  'machine-failure',
  'hallucination-span',
  'point-cloud-pruning',
  'rating-matrix',
] as const;
export type IllustrationName = (typeof ILLUSTRATIONS)[number];

/** Small icons for work sub-projects (the AIS card). */
export const ICONS = ['gauge', 'outage', 'churn', 'coverage', 'pin'] as const;
export type IconName = (typeof ICONS)[number];
