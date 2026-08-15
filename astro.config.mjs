// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://mipc.com.co',
  trailingSlash: 'always',
  build: { format: 'directory' },
  // Las paginas noindex no deben anunciarse en el sitemap: es una senal contradictoria.
  integrations: [
    sitemap({
      filter: (page) => !['/gracias/', '/resena/'].some((p) => page.endsWith(p)),
    }),
  ],
  vite: { plugins: [tailwindcss()] },
  image: {
    // Las ilustraciones heredadas se sirven optimizadas a WebP/AVIF desde src/assets.
    responsiveStyles: true,
    layout: 'constrained',
  },
});
