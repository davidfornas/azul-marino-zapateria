import type { ImageMetadata } from 'astro';

// Local official assets only. No substitute artwork or remote downloads.
const logos = import.meta.glob<{ default: ImageMetadata }>(
  '../images/brand/logo.{png,jpg,jpeg,webp,svg}', { eager: true },
);
const symbols = import.meta.glob<{ default: ImageMetadata }>(
  '../images/brand/symbol.{png,jpg,jpeg,webp,svg}', { eager: true },
);
export const logo = Object.values(logos)[0]?.default;
export const symbol = Object.values(symbols)[0]?.default;
