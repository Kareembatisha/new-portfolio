import { describe, expect, it } from 'vitest';
import { absoluteUrl, truncateDescription } from './seo-utils';

describe('truncateDescription', () => {
  it('leaves short text alone and collapses whitespace', () => {
    expect(truncateDescription('  Hello \n  world ')).toBe('Hello world');
  });

  it('cuts at a word boundary and adds an ellipsis', () => {
    const text = 'word '.repeat(60);
    const result = truncateDescription(text, 50);
    expect(result.length).toBeLessThanOrEqual(50);
    expect(result.endsWith('…')).toBe(true);
    expect(result.slice(0, -1).endsWith(' ')).toBe(false);
  });
});

describe('absoluteUrl', () => {
  it('builds trailing-slash URLs per language', () => {
    expect(absoluteUrl('https://x.dev', 'en', '/')).toBe('https://x.dev/en/');
    expect(absoluteUrl('https://x.dev/', 'ar', '/work/cleantech')).toBe('https://x.dev/ar/work/cleantech/');
  });
});
