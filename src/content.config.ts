import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const servicios = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/servicios' }),
  schema: z.object({
    title: z.string(),
    shortTitle: z.string(),
    order: z.number(),
    seoTitle: z.string(),
    description: z.string(),
    summary: z.string(),
    /** Ancla equivalente en el sitio WordPress, para los redirects de cliente. */
    legacyAnchor: z.string(),
    features: z.array(z.string()),
    ctaText: z.string(),
    whatsappMessage: z.string(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { servicios, blog };
