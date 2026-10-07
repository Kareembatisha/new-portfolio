import { DOCUMENT, isPlatformServer } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Meta } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import type { MessageKey } from './i18n/en';
import { I18n } from './i18n/i18n.service';
import { LANGS, stripLang } from './i18n/lang-url';
import { absoluteUrl, truncateDescription } from './seo-utils';
import { SITE } from './site.config';

const LOCALE = { en: 'en_US', ar: 'ar_EG' } as const;

/**
 * Keeps the document head in sync with the current page: description, canonical, hreflang,
 * Open Graph / Twitter tags, robots and structured data. Page content decides its own description
 * through route data (`description` key, or the resolved case study / article).
 */
@Injectable({ providedIn: 'root' })
export class PageHead {
  private readonly router = inject(Router);
  private readonly i18n = inject(I18n);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly isServer = isPlatformServer(inject(PLATFORM_ID));

  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((event) => this.update(event.urlAfterRedirects));
  }

  private update(url: string): void {
    const lang = this.i18n.lang();
    const path = stripLang(url);
    const data = this.deepestData();
    const description = truncateDescription(this.describe(data));
    const canonical = absoluteUrl(SITE.url, lang, path);
    const image = `${SITE.url}${SITE.ogImage}`;
    const title = this.document.title;

    this.meta.updateTag({ name: 'description', content: description });
    if (data['noindex']) {
      this.meta.updateTag({ name: 'robots', content: 'noindex, follow' });
    } else {
      this.meta.removeTag("name='robots'");
    }

    const og: Record<string, string> = {
      'og:type': data['article'] ? 'article' : 'website',
      'og:site_name': this.i18n.t('brand.name'),
      'og:title': title,
      'og:description': description,
      'og:url': canonical,
      'og:locale': LOCALE[lang],
      'og:image': image,
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:alt': `${this.i18n.t('brand.name')} — ${this.i18n.t('brand.role')}`,
    };
    for (const [property, content] of Object.entries(og)) {
      this.meta.updateTag({ property, content });
    }
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    this.setLink('canonical', canonical);
    this.setAlternates(path);
    this.setStructuredData(path);
    if (this.isServer && lang === 'ar') this.preloadArabicFont();
  }

  private deepestData(): Record<string, unknown> {
    let route: ActivatedRouteSnapshot = this.router.routerState.snapshot.root;
    while (route.firstChild) route = route.firstChild;
    return route.data;
  }

  private describe(data: Record<string, unknown>): string {
    const entry = data['entry'] as { project: { summary: { en: string; ar: string } } } | undefined;
    if (entry) return this.i18n.l(entry.project.summary);
    const article = data['article'] as { excerpt: { en: string; ar: string } } | undefined;
    if (article) return this.i18n.l(article.excerpt);
    const key = data['description'] as MessageKey | undefined;
    return key ? this.i18n.t(key) : this.i18n.t('seo.home');
  }

  private setLink(rel: string, href: string, hreflang?: string): void {
    const head = this.document.head;
    let link = hreflang
      ? null
      : head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]:not([data-seo])`);
    if (!link) {
      link = this.document.createElement('link');
      link.rel = rel;
      if (hreflang) {
        link.hreflang = hreflang;
        link.setAttribute('data-seo', 'alternate');
      }
      head.appendChild(link);
    }
    link.href = href;
  }

  private setAlternates(path: string): void {
    const head = this.document.head;
    head.querySelectorAll('link[data-seo="alternate"]').forEach((el) => el.remove());
    for (const lang of LANGS) this.setLink('alternate', absoluteUrl(SITE.url, lang, path), lang);
    this.setLink('alternate', absoluteUrl(SITE.url, 'en', path), 'x-default');
  }

  /** Person + WebSite data on the home pages only. */
  private setStructuredData(path: string): void {
    const head = this.document.head;
    head.querySelector('script[data-seo="json-ld"]')?.remove();
    if (path !== '/') return;

    const lang = this.i18n.lang();
    const sameAs = [SITE.linkedin, SITE.github].filter(Boolean);
    const graph = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          '@id': `${SITE.url}/#person`,
          name: 'Kareem Zakaria Mahmoud',
          alternateName: 'كريم زكريا',
          jobTitle: 'Frontend Developer',
          url: absoluteUrl(SITE.url, lang, '/'),
          image: `${SITE.url}${SITE.portrait.src}-768.webp`,
          sameAs,
          address: { '@type': 'PostalAddress', addressCountry: 'EG' },
          knowsAbout: ['Angular', 'TypeScript', 'RxJS', 'Server-side rendering', 'RTL/LTR localization'],
        },
        {
          '@type': 'WebSite',
          '@id': `${SITE.url}/#website`,
          name: 'Kareem Zakaria',
          url: `${SITE.url}/`,
          inLanguage: [...LANGS],
          publisher: { '@id': `${SITE.url}/#person` },
        },
      ],
    };
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo', 'json-ld');
    // "<" is escaped so the data can never close the script element.
    script.textContent = JSON.stringify(graph).replace(/</g, '\\u003c');
    head.appendChild(script);
  }

  /** Arabic pages are prerendered with the Arabic font preloaded (index.html preloads Latin only). */
  private preloadArabicFont(): void {
    const head = this.document.head;
    if (head.querySelector('link[data-seo="font-ar"]')) return;
    const link = this.document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = '';
    link.href = '/fonts/cairo-arabic-wght-normal.woff2';
    link.setAttribute('data-seo', 'font-ar');
    head.appendChild(link);
  }
}
