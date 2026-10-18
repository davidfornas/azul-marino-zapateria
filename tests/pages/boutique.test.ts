import { describe, expect, it } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { parse } from 'node-html-parser';
import astroConfig from '../../astro.config.mjs';

const dist = resolve('dist');
const base = astroConfig.base;
const routes = ['/', '/colecciones/', '/nuestra-tienda/', '/hola/'];
const pages = routes.map((route) => ({
  route,
  html: readFileSync(join(dist, route, 'index.html'), 'utf8'),
}));

describe('Boutique site contracts', () => {
  it('all pages have Spanish metadata, brand assets and base-safe local resources', () => {
    for (const { html, route } of pages) {
      const page = parse(html);
      expect(page.querySelector('html')?.getAttribute('lang')).toBe('es');
      expect(page.querySelector('title')?.text).toContain('Azul Marino');
      expect(
        page.querySelector('meta[name="description"]')?.getAttribute('content')
          ?.length,
      ).toBeGreaterThan(40);
      expect(
        page
          .querySelector('meta[property="og:title"]')
          ?.getAttribute('content'),
      ).toBe(page.querySelector('title')?.text);
      expect(page.querySelectorAll('h1'), route).toHaveLength(1);
      expect(page.querySelector('a.skip-link[href="#main"]')).not.toBeNull();
      expect(page.querySelector('link[rel="stylesheet"]')).not.toBeNull();
      expect(html).not.toMatch(
        /sandracabedo|604895320|googletagmanager|google-analytics/i,
      );
      for (const element of page.querySelectorAll('[src], [href]')) {
        const url =
          element.getAttribute('src') ?? element.getAttribute('href') ?? '';
        if (!url.startsWith('/')) continue;
        expect(url.startsWith(base), `${route}: ${url}`).toBe(true);
        const path = url.slice(base.length).split(/[?#]/)[0];
        const target =
          path.endsWith('/') || path === '' ? `${path}index.html` : path;
        expect(
          existsSync(join(dist, target)),
          `${route}: missing ${target}`,
        ).toBe(true);
      }
      for (const image of page.querySelectorAll('img')) {
        expect(image.getAttribute('alt')?.length).toBeGreaterThan(0);
        expect(Number(image.getAttribute('width'))).toBeGreaterThan(0);
        expect(Number(image.getAttribute('height'))).toBeGreaterThan(0);
      }
    }
  });

  it('full website has the configured navigation and active page while the hub stays compact', () => {
    for (const { route, html } of pages) {
      const page = parse(html);
      if (route === '/hola/') {
        expect(page.querySelector('.site-header')).toBeNull();
        expect(page.querySelector('nav a')?.text).toContain(
          'Descubre nuestra web',
        );
        expect(page.querySelector('nav a')?.getAttribute('href')).toBe(base);
        continue;
      }
      const links = page.querySelectorAll('[data-nav-menu] a');
      expect(links.map((a) => a.text.replace(/\s+/g, ' ').trim())).toEqual([
        'Inicio',
        'Colecciones',
        'Nuestra tienda',
      ]);
      expect(
        links.filter((a) => a.getAttribute('aria-current') === 'page'),
      ).toHaveLength(1);
      expect(
        links
          .find((a) => a.getAttribute('aria-current') === 'page')
          ?.getAttribute('href'),
      ).toBe(`${base}${route.slice(1)}`);
      expect(page.querySelector('footer address')?.text).toContain(
        'Maestro Ripollés, 16',
      );
    }
  });

  it('labels all mock collection imagery and the missing exterior without stock claims', () => {
    for (const { route, html } of pages.filter(
      (p) => p.route === '/' || p.route === '/colecciones/',
    )) {
      const page = parse(html);
      expect(page.querySelectorAll('.collection-card')).toHaveLength(3);
      expect(
        page
          .querySelectorAll('.collection-card__badge')
          .every((badge) => badge.text.includes('Ejemplo')),
      ).toBe(true);
      expect(page.text).toMatch(
        /no (indican productos disponibles|representan productos)/i,
      );
      expect(html).not.toMatch(/add-to-cart|checkout|itemprop="price"/i);
    }
    for (const { html } of pages.filter(
      (p) => p.route === '/' || p.route === '/nuestra-tienda/',
    )) {
      expect(parse(html).querySelector('[data-shop-exterior]')?.text).toContain(
        'Fotografía real del exterior pendiente',
      );
    }
  });

  it('embeds the real address in a lazy map and preserves actual directions/contact links', () => {
    const page = parse(pages.find((p) => p.route === '/nuestra-tienda/')!.html);
    const map = page.querySelector('iframe')!;
    expect(map.getAttribute('title')).toContain('Maestro Ripollés, 16');
    expect(map.getAttribute('loading')).toBe('lazy');
    const url = new URL(map.getAttribute('src')!);
    expect(url.hostname).toBe('www.google.com');
    expect(url.pathname).toBe('/maps');
    expect(url.searchParams.get('q')).toContain('Maestro Ripollés, 16');
    expect(url.searchParams.get('q')).toContain('Castellón de la Plana');
    expect(url.searchParams.get('output')).toBe('embed');
    expect(page.querySelector('a[href="tel:+34964039447"]')).not.toBeNull();
    expect(
      page.querySelector(
        'a[href="https://maps.app.goo.gl/QNKenuSytVNHQoxv5?g_st=aw"]',
      ),
    ).not.toBeNull();
  });
});
