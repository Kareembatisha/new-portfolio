import {
  afterNextRender,
  booleanAttribute,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';

/**
 * Fades an element in once it scrolls into view. Elements already on screen, users who prefer
 * reduced motion, and browsers without IntersectionObserver get the content with no animation.
 * With `stagger`, the children fade in sequentially (see .reveal--stagger in styles.scss).
 */
@Directive({
  selector: '[appReveal]',
  host: {
    '[class.reveal]': 'armed()',
    '[class.reveal--stagger]': 'armed() && stagger()',
    '[class.is-visible]': 'visible()',
  },
})
export class Reveal {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly destroyRef = inject(DestroyRef);
  /** Reveal the children one after another instead of fading the element itself. */
  readonly stagger = input(false, { transform: booleanAttribute });
  readonly armed = signal(false);
  readonly visible = signal(false);

  constructor() {
    afterNextRender(() => {
      const reduceMotion =
        typeof matchMedia !== 'function' || matchMedia('(prefers-reduced-motion: reduce)').matches;
      const onScreen = this.el.getBoundingClientRect().top < innerHeight;
      if (reduceMotion || onScreen || !('IntersectionObserver' in window)) return;

      this.armed.set(true);
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          this.visible.set(true);
          observer.disconnect();
        },
        { rootMargin: '0px 0px -10% 0px' },
      );
      observer.observe(this.el);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
