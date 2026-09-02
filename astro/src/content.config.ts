/**
 * Astro Content Collections configuration.
 * Defines the public blog and versioned project-update collections.
 */
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    author: z.string().default('zentala'),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
  }),
});

const updates = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/updates' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    statusDate: z.coerce.date(),
    status: z.enum(['archived', 'current', 'in review', 'planned']),
    version: z.string(),
    supersedes: z.string().default(''),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog, updates };
