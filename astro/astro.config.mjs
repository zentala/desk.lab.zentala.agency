// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// Tailwind v4 uses @tailwindcss/postcss directly — no Astro integration needed
export default defineConfig({
  site: 'https://desk.zentala.io',
  integrations: [react()],
});
