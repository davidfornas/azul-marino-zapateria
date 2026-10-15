# Azul Marino Zapatería

Minimal Spanish landing page built with the existing Astro architecture. The only public content route is `/`, adapted from the original `/hola/` page. The official colors, slogan, address, Instagram, WhatsApp, telephone and Maps links are configured in `src/config/site.ts`. No catalog or commerce features are included.

## Development

Use Node.js 22 LTS (>=22.19.0, <23) and npm 10. With nvm, run `nvm use`.

```sh
npm ci
npm run dev
```

## Validation

```sh
npm run build
npm test
npm run check:links
npm run preview
```

Tests build the site before execution. The suite checks the single route, contact links, brand metadata, absence of old branding and missing assets, accessibility structure, headings, shared styles and utilities. Accessibility color/layout checks still require a real browser.

## Structure and future changes

- `src/pages/index.astro`: the only public page, preserving `/hola/`'s centered layout and link rows.
- `src/layouts/BaseLayout.astro`, `src/components/Seo.astro`: shared shell and metadata. Canonical URLs are omitted until a real `site` domain is configured.
- `src/config/site.ts`: brand configuration, with the supplied contact and social details.
- `src/styles/`: existing shared tokens and styles; official brand colors and system fonts.
- `archive/sandra-cabedo/`: original pages, public branding files, configuration and obsolete page tests, excluded from the active build. Missing photographs are intentional; do not restore them.

Reusable components remain available in `src/components`. Legacy photography components/content are not imported by the landing page. Do not import them into active routes without adapting their assets and content.

Official logo and shoe-symbol PNGs are derived from the supplied JPEGs, with their proportions and blue artwork preserved. Original JPEGs are kept in `assets/brand/`; preparation details are in `src/images/brand/README.md`. PNG and multi-size ICO favicons are served from `public/`.

The sitemap integration remains installed but is inactive until a domain is supplied. Dependency versions are unchanged. The GitHub Pages workflow is manual-only; automatic deployment is disabled. Nothing has been deployed as part of this migration.
