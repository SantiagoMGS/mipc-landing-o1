// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://mipc.com.co',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap({ i18n: undefined })],
  vite: { plugins: [tailwindcss()] },
  image: {
    // Las ilustraciones heredadas se sirven optimizadas a WebP/AVIF desde src/assets.
    responsiveStyles: true,
    layout: 'constrained',
  },
});
