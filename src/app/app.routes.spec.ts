import { describe, expect, it } from 'vitest';
import { ARTICLES } from './data/articles';
import { routes } from './app.routes';

describe('routes', () => {
  it('keeps the articles list noindex exactly while there are no articles', () => {
    const lang = routes.find((r) => r.path === ':lang')!;
    const articles = lang.children!.find((r) => r.path === 'articles')!;
    const list = articles.children!.find((r) => r.path === '')!;
    // Failing here means the first article was added: remove `noindex` from the articles route.
    expect(Boolean(list.data?.['noindex'])).toBe(ARTICLES.length === 0);
  });
});
