import { describe, expect, it } from 'vitest';
import { isLang, stripLang, swapLang } from './lang-url';

describe('lang-url', () => {
  it('recognises supported languages only', () => {
    expect(isLang('en')).toBe(true);
    expect(isLang('ar')).toBe(true);
    expect(isLang('fr')).toBe(false);
    expect(isLang(null)).toBe(false);
  });

  it('strips the language prefix, query and fragment', () => {
    expect(stripLang('/en')).toBe('/');
    expect(stripLang('/ar/work')).toBe('/work');
    expect(stripLang('/en/work/alsalam?x=1#top')).toBe('/work/alsalam');
  });

  it('does not treat a longer first segment as a language', () => {
    expect(stripLang('/english/work')).toBe('/english/work');
  });

  it('swaps the language and keeps the rest of the path', () => {
    expect(swapLang('/en', 'ar')).toBe('/ar');
    expect(swapLang('/en/work', 'ar')).toBe('/ar/work');
    expect(swapLang('/ar/services?x=1', 'en')).toBe('/en/services');
  });

  it('falls back to the language root for URLs without a prefix', () => {
    expect(swapLang('/unknown', 'ar')).toBe('/ar/unknown');
    expect(swapLang('/', 'en')).toBe('/en');
  });
});
