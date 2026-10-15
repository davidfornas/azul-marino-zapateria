import { defineConfig } from 'astro/config';

// GitHub Pages project sites are served below the repository path.
// Add site and sitemap integration once a production domain is supplied.
export default defineConfig({
  base: '/azul-marino-zapateria/',
  output: 'static',
  trailingSlash: 'always',
});
