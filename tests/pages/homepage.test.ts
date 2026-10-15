import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { parse } from 'node-html-parser';

const dist = resolve('dist');
const html = readFileSync(join(dist, 'index.html'), 'utf8');
const page = parse(html);
function htmlFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? htmlFiles(path) : entry.name.endsWith('.html') ? [path] : [];
  });
}

describe('Azul Marino landing page', () => {
  it('generates only the homepage and no old public branding artifacts', () => {
    expect(htmlFiles(dist)).toEqual([join(dist, 'index.html')]);
    expect(readdirSync(dist)).not.toContain('CNAME');
    expect(readdirSync(dist)).not.toContain('icons');
  });

  it('renders the new brand and complete metadata without guessing a domain', () => {
    expect(page.querySelector('h1')?.text).toBe('Azul Marino Zapatería');
    expect(page.querySelector('title')?.text).toBe('Azul Marino Zapatería');
    const description = page.querySelector('meta[name="description"]')?.getAttribute('content');
    expect(description).toContain('Azul Marino Zapatería');
    expect(page.querySelector('meta[property="og:title"]')?.getAttribute('content')).toBe('Azul Marino Zapatería');
    expect(page.querySelector('meta[property="og:description"]')?.getAttribute('content')).toBe(description);
    expect(page.querySelector('link[rel="canonical"]')).toBeNull();
    expect(page.querySelector('meta[property="og:url"]')).toBeNull();
    expect(page.querySelector('script[type="application/ld+json"]')).toBeNull();
  });

  it('renders the official slogan, address and supplied contact links', () => {
    expect(page.text).toContain('Más de 30 años de calidad, confianza y estilo.');
    expect(page.querySelector('address')?.text).toContain('Calle Maestro Ripollés, 16');
    expect(page.querySelector('address')?.text).toContain('12003 Castellón de la Plana, Spain');
    const hrefs = page.querySelectorAll('nav a').map((link) => link.getAttribute('href'));
    expect(hrefs).toEqual([
      'https://wa.me/34641606210?text=' + encodeURIComponent('Hola, he visto vuestra página web y me gustaría recibir información sobre vuestro calzado.'),
      'https://www.instagram.com/azulmarinozapateria/',
      'https://maps.app.goo.gl/QNKenuSytVNHQoxv5?g_st=aw',
      'tel:+34964039447',
    ]);
    expect(page.querySelector('.hola__reel')?.getAttribute('href')).toBe('https://www.instagram.com/p/DR4ISenigcE/?mdxt=OWo2bG91b3FrZ2Ez');
    for (const link of page.querySelectorAll('a[target="_blank"]')) {
      expect(link.getAttribute('rel')).toContain('noopener');
      expect(link.text).toContain('se abre en otra pestaña');
    }
    expect(page.querySelectorAll('[aria-disabled="true"]')).toHaveLength(0);
  });

  it('ships no old identity, contact info or tracking', () => {
    expect(html).not.toMatch(/sandra|cabedo|604895320|sandracabedo\.es|googletagmanager|google-analytics/i);
    expect(page.querySelectorAll('script[src], iframe')).toHaveLength(0);
    expect(readFileSync(join(dist, 'robots.txt'), 'utf8')).not.toContain('Sitemap:');
  });
});
