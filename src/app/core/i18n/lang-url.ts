export const LANGS = ['en', 'ar'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'en';

export function isLang(value: string | null | undefined): value is Lang {
  return LANGS.includes(value as Lang);
}

const LANG_PREFIX = /^\/(en|ar)(?=\/|$|\?|#)([^?#]*)/;

/** Path without the language prefix, query and fragment: `/ar/work` → `/work`. */
export function stripLang(url: string): string {
  const match = LANG_PREFIX.exec(url);
  const path = match ? match[2] : url.split(/[?#]/)[0];
  return path || '/';
}

/** Same page in another language: `/en/work?x=1` → `/ar/work`. Query and fragment are dropped. */
export function swapLang(url: string, target: Lang): string {
  const rest = stripLang(url);
  return rest === '/' ? `/${target}` : `/${target}${rest}`;
}
