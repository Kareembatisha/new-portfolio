import { describe, expect, it } from 'vitest';
import { nextHeaderHidden } from './scroll-direction';

describe('nextHeaderHidden', () => {
  it('never hides near the top of the page', () => {
    expect(nextHeaderHidden(true, 200, 50, false)).toBe(false);
  });

  it('hides when scrolling down past the threshold and shows when scrolling up', () => {
    expect(nextHeaderHidden(false, 200, 260, false)).toBe(true);
    expect(nextHeaderHidden(true, 260, 240, false)).toBe(false);
  });

  it('ignores tiny movements to avoid flicker', () => {
    expect(nextHeaderHidden(true, 300, 303, false)).toBe(true);
    expect(nextHeaderHidden(false, 300, 297, false)).toBe(false);
  });

  it('stays visible while the mobile menu is open', () => {
    expect(nextHeaderHidden(false, 200, 400, true)).toBe(false);
  });
});
