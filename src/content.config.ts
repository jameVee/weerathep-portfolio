import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { TONES } from './lib/tones';
import { ILLUSTRATIONS, ICONS } from './components/illustrations/names';

const tone = z.enum(TONES);
const month = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Use YYYY-MM, for example 2024-06');

/** One file per job: src/content/work/*.md. The Markdown body is the "Read more" list. */
const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: ({ image }) =>
    z
      .object({
        company: z.string(),
        location: z.string(),
        role: z.string(),
        title: z.string(),
        start: month,
        /** leave out while you still work there; shows "Present" */
        end: month.optional(),
        summary: z.string(),
        resultNumber: z.string().optional(),
        resultText: z.string().optional(),
        accent: tone.default('gold'),
        cool: tone.default('indigo'),
        tags: z.array(z.string()).default([]),
        /** lower numbers come first */
        order: z.number(),
        illustration: z.enum(ILLUSTRATIONS).optional(),
        /** small caption in the picture's corner, e.g. "System diagram" */
        artLabel: z.string().default('Illustration'),
        /** a photo instead of the illustration (path relative to the .md file) */
        image: image().optional(),
        imageAlt: z.string().optional(),
        subProjects: z
          .array(z.object({ name: z.string(), description: z.string(), icon: z.enum(ICONS) }))
          .default([]),
      })
      .refine((d) => d.illustration || d.image, {
        message: 'Set either `illustration` or `image`',
      })
      .refine((d) => !d.image || d.imageAlt, {
        message: '`imageAlt` is required when `image` is set',
      }),
});

/** One file per project: src/content/projects/*.md. The file name becomes the URL: /projects/<file-name>/ */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        summary: z.string(),
        tags: z.array(z.string()).default([]),
        accent: tone.default('gold'),
        cool: tone.default('indigo'),
        order: z.number().default(100),
        illustration: z.enum(ILLUSTRATIONS).optional(),
        github: z.url().optional(),
        image: image().optional(),
        imageAlt: z.string().optional(),
        gallery: z
          .array(z.object({ src: image(), alt: z.string(), caption: z.string().optional() }))
          .default([]),
      })
      .refine((d) => d.illustration || d.image, {
        message: 'Set either `illustration` or `image`',
      })
      .refine((d) => !d.image || d.imageAlt, {
        message: '`imageAlt` is required when `image` is set',
      }),
});

/** One file per competition or hackathon: src/content/awards/*.md */
const awards = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/awards' }),
  schema: z.object({
    title: z.string(),
    /** second line: where, or what the competition was */
    place: z.string(),
    /** short text inside the round medal: "2nd", "Top 10", "48h" */
    badge: z.string().max(4),
    /** the result: "1st Runner-Up" */
    detail: z.string(),
    /** shown after the result: "2023", "Dec 2024" */
    date: z.string().optional(),
    accent: tone.default('gold'),
    order: z.number(),
  }),
});

export const collections = { work, projects, awards };
