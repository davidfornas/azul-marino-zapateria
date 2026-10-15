# Official Azul Marino artwork

Original files from the user-supplied `assets1.zip` are preserved unchanged in `assets/brand/logo.jpeg` (`MARCA_PRINCIPAL.jpeg`) and `assets/brand/symbol.jpeg` (`SIMBOLO_1.jpeg`).

The PNGs are derived from those files without tracing, redrawing, changing typography, or recoloring the blue artwork:

- Remove the light neutral JPEG background (pixels with all RGB channels >200 and channel spread <20 become transparent).
- Crop to the remaining artwork bounds. Preserve the original pixel dimensions and proportions, and add 24px padding.
- Center the shoe symbol on a square transparent canvas.
- Produce `public/favicon.png` at 64×64 with Lanczos downsampling, and `public/favicon.ico` with 16, 32, 48 and 64px sizes.

`logo.png` is imported through Astro assets for the homepage. `symbol.png` is the full-resolution transparent source for the favicon. Original JPEGs are retained for future asset preparation; no generated artwork is used.
