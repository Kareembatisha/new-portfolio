import { describe, expect, it } from 'vitest';
import { countAt, easeOutCubic } from './count-up';

describe('count-up maths', () => {
  it('starts at 0 and ends exactly on the target', () => {
    expect(countAt(20, 0, 1000)).toBe(0);
    expect(countAt(20, 1000, 1000)).toBe(20);
    expect(countAt(20, 5000, 1000)).toBe(20);
  });

  it('eases out: more than half way after half the time, never decreasing', () => {
    expect(easeOutCubic(0.5)).toBeGreaterThan(0.5);
    let previous = -1;
    for (let t = 0; t <= 1000; t += 50) {
      const value = countAt(50, t, 1000);
      expect(value).toBeGreaterThanOrEqual(previous);
      previous = value;
    }
  });

  it('clamps out-of-range input', () => {
    expect(easeOutCubic(-1)).toBe(0);
    expect(easeOutCubic(2)).toBe(1);
  });
});
