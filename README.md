# Azul Marino Zapatería

Responsive Spanish boutique website for the physical shoe shop in Castellón. Built on the existing Astro layouts, CSS utilities, title component and contact helpers. No cart, checkout, stock or price information.

## Routes

- `/`: editorial homepage, collection previews, shop introduction and contact calls to action.
- `/colecciones/`: clearly identified example categories and provisional imagery.
- `/nuestra-tienda/`: shop introduction, contact details, address and interactive Google Maps embed.
- `/hola/`: preserved compact Instagram link hub, including “Descubre nuestra web”.

All paths include the GitHub Pages project prefix `/azul-marino-zapateria/` at runtime. Keep `astro.config.mjs` and the asset regression tests in sync when changing hosting paths. The existing manual GitHub Pages workflow is unchanged; no deployment runs automatically.

## Development and validation

Node 22 LTS (>=22.19.0, <23), npm 10. Use `nvm use` if available.

```sh
npm ci
npm run dev
npm run build
npm test
npm run check:links
npm run preview
```

Open the project-prefixed path in dev/preview. Run the validation commands sequentially: Vitest rebuilds `dist/` in global setup, so concurrent build/read operations would interfere. Tests cover all four routes, navigation, contact links, responsive asset prefixes, accessible structure, headings, map configuration and shared utilities. Color and real layout require browser verification. The third-party Maps document is outside the static accessibility test; its enclosing iframe's title and configuration are checked.

## Editing content and assets

- `src/config/site.ts`: confirmed business facts, navigation and contact/social URLs. No opening hours, inventory, product brands, founding dates or unconfirmed services are added.
- `src/config/collections.ts`: example categories, copy, local image paths and alt text. Replace with client-approved collections; update visible provisional labels only once content is confirmed.
- `src/components/Header.astro`, `Footer.astro`, `CollectionCard.astro`, `CollectionGrid.astro`, `ShopExterior.astro`: reusable full-site components.
- `src/layouts/BaseLayout.astro` and `PageLayout.astro`: existing shell and shared page composition; `SectionTitle.astro` and responsive container/grid utilities are reused.
- `src/styles/boutique.css`: shared editorial layout and buttons. Official brand colors remain in `tokens.css`; Georgia headings complement system sans body fonts without font downloads. Logo typography is always the original artwork.
- `src/images/brand/`: prepared official artwork; unchanged JPEG originals are in `assets/brand/`.
- `archive/sandra-cabedo/`: original photography-site code, excluded from active routes and TypeScript. Its deleted photographs are not restored.

### Photography still needed

The real exterior photograph is not in the repository. Add it as `src/images/shop/exterior.jpg` (or `.jpeg`, `.png`, `.webp`; one file only). The shared component automatically uses it on the homepage and Nuestra tienda, generates responsive images through Astro, and includes explicit dimensions. Until supplied, both pages show a labelled reserved space; no stock storefront is used.

Unsplash/Pexels downloads and their licence pages were blocked by the environment proxy. As permitted in the brief, locally authored, clearly labelled geometric SVG placeholders are used instead of unverified or hotlinked photographs. They are not product images. See [photography register](docs/photography.md) for attempted sources, provenance and replacement instructions. The hero also clearly identifies its missing footwear photograph.

No production domain is invented. Basic title, description and Open Graph metadata are emitted; canonical and absolute social-image URLs remain omitted until a `site` origin is configured. The existing sitemap dependency remains installed but inactive. No new dependencies were added.
