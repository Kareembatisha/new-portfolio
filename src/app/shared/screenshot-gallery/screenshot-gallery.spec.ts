import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { I18n } from '../../core/i18n/i18n.service';
import { GALLERIES } from '../../data/gallery';
import { ScreenshotGallery, stepIndex } from './screenshot-gallery';

describe('stepIndex', () => {
  it('wraps around in both directions', () => {
    expect(stepIndex(0, -1, 4)).toBe(3);
    expect(stepIndex(3, 1, 4)).toBe(0);
    expect(stepIndex(1, 1, 4)).toBe(2);
    expect(stepIndex(0, 1, 0)).toBe(0);
  });
});

describe('ScreenshotGallery', () => {
  function setup(lang: 'en' | 'ar') {
    TestBed.inject(I18n).setLang(lang);
    const fixture = TestBed.createComponent(ScreenshotGallery);
    fixture.componentRef.setInput('items', GALLERIES['medgate']);
    fixture.detectChanges();
    return { fixture, root: fixture.nativeElement as HTMLElement };
  }

  it('renders a labelled thumbnail with alt text for every item', () => {
    const { root } = setup('en');
    const thumbs = root.querySelectorAll<HTMLButtonElement>('.thumb');
    expect(thumbs).toHaveLength(GALLERIES['medgate'].length);
    thumbs.forEach((thumb) => {
      expect(thumb.getAttribute('aria-label')).toContain('Open image');
      expect(thumb.querySelector('img')!.alt.length).toBeGreaterThan(20);
    });
  });

  it('opens on click, shows the position and moves with the buttons', () => {
    const { fixture, root } = setup('en');
    root.querySelectorAll<HTMLButtonElement>('.thumb')[1].click();
    fixture.detectChanges();
    expect(root.querySelector('.count')?.textContent).toBe(`2 / ${GALLERIES['medgate'].length}`);
    root.querySelector<HTMLButtonElement>('button[aria-label="Next image"]')!.click();
    fixture.detectChanges();
    expect(root.querySelector('.count')?.textContent).toBe(`3 / ${GALLERIES['medgate'].length}`);
  });

  it('uses the arrow keys the way the language reads (reversed in RTL)', () => {
    const { fixture, root } = setup('ar');
    root.querySelectorAll<HTMLButtonElement>('.thumb')[1].click();
    fixture.detectChanges();
    const dialog = root.querySelector('dialog')!;
    dialog.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    fixture.detectChanges();
    expect(root.querySelector('.count')?.textContent).toBe(`3 / ${GALLERIES['medgate'].length}`);
    dialog.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    fixture.detectChanges();
    expect(root.querySelector('.count')?.textContent).toBe(`2 / ${GALLERIES['medgate'].length}`);
  });
});
