// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

// Tailwind v4 uses @tailwindcss/postcss directly — no Astro integration needed
export default defineConfig({
  site: 'https://lp.desk.labs.zentala.agency',
  integrations: [react(), mdx()],
  server: {
    allowedHosts: ['desk.internal'],
  },
});
