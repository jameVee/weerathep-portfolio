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
        /** SVG drawing, shown when `images` is empty */
        illustration: z.enum(ILLUSTRATIONS).optional(),
        /** small caption in the picture's corner, e.g. "System diagram" */
        artLabel: z.string().default('Illustration'),
        /** screenshots / photos (paths relative to the .md file); 2+ images get arrow buttons */
        images: z
          .array(z.object({ src: image(), alt: z.string(), label: z.string().optional() }))
          .default([]),
        subProjects: z
          .array(z.object({ name: z.string(), description: z.string(), icon: z.enum(ICONS) }))
          .default([]),
      })
      .refine((d) => d.illustration || d.images.length > 0, {
        message: 'Set `images` or `illustration`',
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
        /** other links shown as buttons on the project page: paper, demo, dataset... */
        links: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
        /** one short line shown on the card, e.g. a ranking or headline result */
        highlight: z.string().optional(),
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
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** second line: where, or what the competition was */
      place: z.string(),
      /** short text inside the round medal: "2nd", "10", "48h" */
      badge: z.string().max(4),
      /** the result: "1st Runner-Up" */
      detail: z.string(),
      /** shown after the result: "2023", "Dec 2024" */
      date: z.string().optional(),
      accent: tone.default('gold'),
      order: z.number(),
      /** photos / certificates (paths relative to the .md file); 2+ images get arrow buttons */
      images: z
        .array(z.object({ src: image(), alt: z.string(), label: z.string().optional() }))
        .default([]),
      /** link to a video (e.g. YouTube); shows a "Watch" button */
      video: z.url().optional(),
      videoLabel: z.string().default('Watch the video'),
    }),
});

export const collections = { work, projects, awards };
