/** Named colour tones a card can use for --accent and --cool (defined in src/styles/global.css). */
export const TONES = ['gold', 'indigo', 'coral', 'teal', 'violet', 'sky'] as const;
export type Tone = (typeof TONES)[number];
