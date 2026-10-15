import { defineConfig } from 'astro/config';

// Add site and sitemap integration once a real domain is supplied.
export default defineConfig({
  base: '/',
  output: 'static',
  trailingSlash: 'always',
});
