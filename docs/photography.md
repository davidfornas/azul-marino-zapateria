# Photography and placeholder register

## Official assets

The logo and shoe symbol are client-supplied artwork; their originals and preparation are documented in `src/images/brand/README.md`. They are not collection images.

## Shop exterior — required client asset

No exterior photograph was found in the repository. Both the homepage and Nuestra tienda render the shared `ShopExterior.astro` component, with an explicit Spanish missing-photo notice. No alternative storefront is shown.

Add the real client image as `src/images/shop/exterior.jpg` (or `.jpeg`, `.png`, `.webp`; one file only). It will automatically appear on both pages and be resized through Astro assets. Preserve the original composition; verify the alt text if the view changes.

## Provisional collection images

On 2026-10-18 downloads from the following sources and their licence pages failed with HTTP 403 from the environment network proxy:

- Unsplash: https://images.unsplash.com/photo-1543163521-1bf539c55dd2 and https://unsplash.com/license
- Pexels: https://images.pexels.com/photos/267301/pexels-photo-267301.jpeg and https://www.pexels.com/license/

No third-party photographs were downloaded or redistributed, and no unverified licensing claim is made. The fallback explicitly allowed in the brief is used.

`public/images/placeholders/calzado-cotidiano.svg`, `calzado-ocasiones.svg`, and `calzado-esenciales.svg` are locally authored geometric editorial placeholders, not photographs, products, or representations of stock. They are original project assets with no third-party licence requirement. They contain only vector shapes, have explicit dimensions and require no remote requests. All appearances are visibly labelled in Spanish. The hero also states that footwear photography is pending.

Replace these with approved local footwear photos, using descriptive filenames and recording photographer, source page, applicable licence, and download date here. Update `src/config/collections.ts` (image, alt, title, description). For responsive delivery provide 480/800/1200px WebP versions, or move real photos to `src/images/` and use the existing Astro Image/ImageFrame pipeline. No prices, product brands or availability claims should be added without client confirmation.
