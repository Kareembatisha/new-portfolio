import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { I18n } from '../../core/i18n/i18n.service';
import { BeforeAfter, clampPosition } from './before-after';

const image = { src: '/images/x', widths: [640], width: 640, height: 360 };

describe('clampPosition', () => {
  it('keeps values within 0–100 and falls back to the middle for junk', () => {
    expect(clampPosition(-10)).toBe(0);
    expect(clampPosition(140)).toBe(100);
    expect(clampPosition(37)).toBe(37);
    expect(clampPosition(Number.NaN)).toBe(50);
  });
});

describe('BeforeAfter', () => {
  it('exposes a labelled range input and moves the divider with it', () => {
    TestBed.inject(I18n).setLang('en');
    const fixture = TestBed.createComponent(BeforeAfter);
    const ref = fixture.componentRef;
    ref.setInput('before', image);
    ref.setInput('after', image);
    ref.setInput('beforeAlt', 'Before');
    ref.setInput('afterAlt', 'After');
    ref.setInput('beforeLabel', 'Next.js');
    ref.setInput('afterLabel', 'Angular');
    ref.setInput('caption', 'Same page, two stacks');
    fixture.detectChanges();

    const root = fixture.nativeElement as HTMLElement;
    const input = root.querySelector<HTMLInputElement>('input[type="range"]')!;
    expect(input.getAttribute('aria-label')).toContain('Next.js');
    input.value = '80';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(root.querySelector<HTMLElement>('figure')!.style.getPropertyValue('--pos')).toBe('80%');
  });
});
