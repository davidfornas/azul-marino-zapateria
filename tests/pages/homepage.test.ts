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

  it('provides clearly unavailable link placeholders without fake destinations', () => {
    const links = page.querySelectorAll('nav [role="link"]');
    expect(links).toHaveLength(3);
    expect(links.map((link) => link.text.trim().replace(/\s+/g, ' '))).toEqual([
      'Contacto Próximamente', 'Dónde encontrarnos Próximamente', 'Redes sociales Próximamente',
    ]);
    for (const link of links) {
      expect(link.getAttribute('aria-disabled')).toBe('true');
      expect(link.hasAttribute('href')).toBe(false);
    }
    expect(page.querySelectorAll('a[href]').map((link) => link.getAttribute('href'))).toEqual(['#main']);
  });

  it('ships no old identity, contact info, tracking, or image references', () => {
    expect(html).not.toMatch(/sandra|cabedo|604895320|sandracabedo\.es|wa\.me|ig\.me|instagram\.com|googletagmanager|google-analytics/i);
    expect(page.querySelectorAll('img, picture, script[src]')).toHaveLength(0);
    expect(readFileSync(join(dist, 'robots.txt'), 'utf8')).not.toContain('Sitemap:');
  });
});
