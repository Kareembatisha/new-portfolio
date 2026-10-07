import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { provideRouter, TitleStrategy, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { routes } from '../app.routes';
import { PageHead } from './page-head.service';
import { PageTitleStrategy } from './page-title.strategy';
import { SITE } from './site.config';

describe('PageHead', () => {
  let doc: Document;
  let harness: RouterTestingHarness;

  const meta = (selector: string) => doc.head.querySelector(selector)?.getAttribute('content');
  const link = (selector: string) => doc.head.querySelector(selector)?.getAttribute('href');

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes, withComponentInputBinding()), { provide: TitleStrategy, useClass: PageTitleStrategy }],
    });
    doc = TestBed.inject(DOCUMENT);
    TestBed.inject(PageHead);
    harness = await RouterTestingHarness.create();
  });

  it('sets title, description, canonical and hreflang for a page', async () => {
    await harness.navigateByUrl('/ar/services');
    expect(doc.title).toContain('—');
    expect(meta('meta[name="description"]')?.length).toBeGreaterThan(40);
    expect(link('link[rel="canonical"]')).toBe(`${SITE.url}/ar/services/`);
    expect(link('link[hreflang="en"]')).toBe(`${SITE.url}/en/services/`);
    expect(link('link[hreflang="ar"]')).toBe(`${SITE.url}/ar/services/`);
    expect(link('link[hreflang="x-default"]')).toBe(`${SITE.url}/en/services/`);
    expect(meta('meta[property="og:locale"]')).toBe('ar_EG');
  });

  it('uses the project summary as the description of a case study', async () => {
    await harness.navigateByUrl('/en/work/cleantech');
    expect(doc.title).toBe('CleanTech — Kareem Zakaria');
    expect(meta('meta[name="description"]')).toContain('facility and cleaning management');
  });

  it('adds structured data on the home page only', async () => {
    await harness.navigateByUrl('/en');
    expect(doc.head.querySelector('script[type="application/ld+json"]')?.textContent).toContain('"Person"');
    await harness.navigateByUrl('/en/about');
    expect(doc.head.querySelector('script[type="application/ld+json"]')).toBeNull();
  });

  it('marks the 404 page noindex and clears it on normal pages', async () => {
    await harness.navigateByUrl('/en/does-not-exist');
    expect(meta('meta[name="robots"]')).toBe('noindex, follow');
    await harness.navigateByUrl('/en/contact');
    expect(doc.head.querySelector('meta[name="robots"]')).toBeNull();
  });
});
