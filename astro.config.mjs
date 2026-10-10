// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// TODO(domain): replace with the production domain before launch.
const SITE = process.env.PUBLIC_SITE_URL ?? 'https://example.com';

export default defineConfig({
  site: SITE,
  // GitHub Pages project site serves under /farpak; other hosts keep '/'.
  base: process.env.PAGES_BASE || '/',
  output: 'static',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'fa',
    locales: ['fa', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    react(),
    sitemap({
      i18n: {
        defaultLocale: 'fa',
        locales: { fa: 'fa-IR', en: 'en-US' },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    server: {
      // Allow the sandbox live-preview host (dev only).
      allowedHosts: ['.e2b.app'],
      // Form API (form-server/). Browser calls /api/*; only the dev server reaches the Node service.
      proxy: { '/api': { target: `http://127.0.0.1:${process.env.FORM_PORT ?? 8787}`, changeOrigin: false } },
    },
  },
});
