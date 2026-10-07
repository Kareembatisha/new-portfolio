import { afterNextRender, Component, computed, ElementRef, input, signal, viewChild } from '@angular/core';
import type { ImageSource } from '../../models/project';

/**
 * `<picture>` with AVIF and WebP at several widths. Explicit width/height reserve the space
 * (no layout shift); `priority` is for the single above-the-fold image of a page.
 */
@Component({
  selector: 'app-responsive-image',
  template: `
    <picture>
      <source type="image/avif" [srcset]="avif()" [sizes]="sizes()" />
      <img
        #img
        [class.is-pending]="pending()"
        (load)="pending.set(false)"
        (error)="pending.set(false)"
        [src]="fallback()"
        [attr.srcset]="webp()"
        [attr.sizes]="sizes()"
        [alt]="alt()"
        [attr.width]="image().width"
        [attr.height]="image().height"
        [attr.loading]="priority() ? 'eager' : 'lazy'"
        [attr.fetchpriority]="priority() ? 'high' : null"
        decoding="async"
      />
    </picture>
  `,
  styles: `
    :host,
    picture {
      display: block;
      width: 100%;
      height: 100%;
    }
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: var(--img-position, center top);
      transition-property: opacity, object-position;
      transition-duration: 450ms, var(--img-pan, 0s);
      transition-timing-function: var(--ease), linear;
    }
    img.is-pending {
      opacity: 0;
    }
  `,
})
export class ResponsiveImage {
  readonly image = input.required<ImageSource>();
  readonly alt = input.required<string>();
  readonly sizes = input('100vw');
  readonly priority = input(false);
  /** True only while a not-yet-loaded image waits to fade in (set after hydration, so SSR shows the image). */
  protected readonly pending = signal(false);
  private readonly img = viewChild.required<ElementRef<HTMLImageElement>>('img');

  constructor() {
    afterNextRender(() => {
      if (!this.img().nativeElement.complete) this.pending.set(true);
    });
  }

  private readonly srcset = (ext: 'avif' | 'webp') =>
    this.image()
      .widths.map((w) => `${this.image().src}-${w}.${ext} ${w}w`)
      .join(', ');

  protected readonly avif = computed(() => this.srcset('avif'));
  protected readonly webp = computed(() => this.srcset('webp'));
  /** Mid-size WebP for browsers that ignore srcset. */
  protected readonly fallback = computed(() => {
    const { src, widths } = this.image();
    return `${src}-${widths[Math.floor(widths.length / 2)]}.webp`;
  });
}
