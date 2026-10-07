import { afterNextRender, DestroyRef, Directive, ElementRef, inject, input } from '@angular/core';

/** Ease-out curve for the count-up (0 → 1). */
export function easeOutCubic(t: number): number {
  const x = Math.min(1, Math.max(0, t));
  return 1 - Math.pow(1 - x, 3);
}

/** The whole number shown after `elapsed` ms of a `duration` ms count-up toward `target`. */
export function countAt(target: number, elapsed: number, duration: number): number {
  return Math.round(target * easeOutCubic(elapsed / duration));
}

/**
 * Counts a number up once when it scrolls into view. The element's text is rendered normally
 * (`{{ value }}`), so prerendered HTML, no-JS and reduced-motion users always see the real number.
 * Only for verified figures.
 */
@Directive({ selector: '[appCountUp]' })
export class CountUp {
  readonly appCountUp = input.required<number>();
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const textNode = this.el.firstChild;
      const reduceMotion =
        typeof matchMedia !== 'function' || matchMedia('(prefers-reduced-motion: reduce)').matches;
      const onScreen = this.el.getBoundingClientRect().top < innerHeight;
      if (!textNode || reduceMotion || onScreen || !('IntersectionObserver' in window)) return;

      const target = this.appCountUp();
      textNode.nodeValue = '0';
      let frame = 0;
      const observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const elapsed = now - start;
          textNode.nodeValue = String(countAt(target, elapsed, 1000));
          if (elapsed < 1000) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      });
      observer.observe(this.el);
      this.destroyRef.onDestroy(() => {
        observer.disconnect();
        cancelAnimationFrame(frame);
        textNode.nodeValue = String(target); // never leave a half-counted number behind
      });
    });
  }
}
