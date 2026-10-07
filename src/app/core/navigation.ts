import { ARTICLES } from '../data/articles';
import type { MessageKey } from './i18n/en';

const ALL_NAV_ITEMS: readonly { path: string; label: MessageKey }[] = [
  { path: 'work', label: 'nav.work' },
  { path: 'services', label: 'nav.services' },
  { path: 'about', label: 'nav.about' },
  { path: 'articles', label: 'nav.articles' },
];

/** Articles are linked only once there is something to read. */
export const NAV_ITEMS = ALL_NAV_ITEMS.filter((item) => item.path !== 'articles' || ARTICLES.length > 0);

/** Routes (under /:lang) that are prerendered, in addition to the home page. */
export const PAGE_PATHS = ['work', 'services', 'about', 'articles', 'contact'] as const;
