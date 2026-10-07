import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { DEFAULT_LANG } from '../../core/i18n/lang-url';
import type { Article } from '../../models/content';

/** Finds the article for `:slug`; unknown slugs go to the 404 page. Data is imported lazily. */
export const articleResolver: ResolveFn<Article> = async (route) => {
  const router = inject(Router); // must run before the first await
  const { ARTICLES } = await import('../../data/articles');
  const article = ARTICLES.find((a) => a.slug === route.paramMap.get('slug'));
  if (article) return article;

  const lang = route.parent?.paramMap.get('lang') ?? DEFAULT_LANG;
  return new RedirectCommand(router.parseUrl(`/${lang}/404`));
};
