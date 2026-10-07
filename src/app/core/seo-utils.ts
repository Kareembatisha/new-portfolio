import type { Lang } from './i18n/lang-url';

/** Cuts text to `max` characters at a word boundary, adding an ellipsis when shortened. */
export function truncateDescription(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

/**
 * Absolute, trailing-slash URL of a page in a language. `path` is language-less (`/work/x`, or `/`).
 * Pages are prerendered as folders (`/en/work/index.html`), so the slash form is the canonical one.
 */
export function absoluteUrl(origin: string, lang: Lang, path: string): string {
  const rest = path === '/' ? '' : path.replace(/\/+$/, '');
  return `${origin.replace(/\/+$/, '')}/${lang}${rest}/`;
}
