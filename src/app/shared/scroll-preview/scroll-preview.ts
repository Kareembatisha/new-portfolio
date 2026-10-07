import { Component, inject, input, signal } from '@angular/core';
import { I18n } from '../../core/i18n/i18n.service';
import type { ImageSource } from '../../models/project';
import { ResponsiveImage } from '../responsive-image/responsive-image';

/**
 * A tall page screenshot inside a browser frame that scrolls itself on hover or tap, so a visitor
 * sees a whole page without leaving the case study. With reduced motion the frame scrolls natively.
 */
@Component({
  selector: 'app-scroll-preview',
  imports: [ResponsiveImage],
  template: `
    <figure class="preview">
      <button
        type="button"
        class="frame"
        [class.is-playing]="playing()"
        [attr.aria-pressed]="playing()"
        [attr.aria-label]="i18n.t('preview.toggle')"
        (click)="playing.set(!playing())"
      >
        <span class="chrome" aria-hidden="true"><i></i><i></i><i></i></span>
        <span class="viewport">
          <app-responsive-image [image]="image()" [alt]="alt()" [sizes]="sizes()" />
        </span>
      </button>
      <figcaption>{{ caption() }}</figcaption>
    </figure>
  `,
  styles: `
    :host {
      display: block;
    }
    .preview {
      margin: 0;
    }
    .frame {
      display: block;
      width: 100%;
      padding: 0;
      font: inherit;
      color: inherit;
      text-align: start;
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      overflow: hidden;
      cursor: pointer;
    }
    .chrome {
      display: flex;
      gap: var(--space-2);
      padding: var(--space-3) var(--space-4);
      background: var(--color-bg);
      border-block-end: 1px solid var(--color-border);
    }
    .chrome i {
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 50%;
      background: var(--color-border);
    }
    .viewport {
      display: block;
      aspect-ratio: 16 / 10;
      overflow: hidden;
      --img-position: center top;
    }
    // Pan the image from its top to its bottom; long pages take longer.
    .frame:hover .viewport,
    .frame:focus-visible .viewport,
    .frame.is-playing .viewport {
      --img-position: center bottom;
      --img-pan: 7s;
    }
    figcaption {
      margin-top: var(--space-3);
      font-size: var(--fs-sm);
      color: var(--color-text-2);
    }
    @media (prefers-reduced-motion: reduce) {
      .viewport {
        overflow-y: auto;
      }
    }
  `,
})
export class ScrollPreview {
  protected readonly i18n = inject(I18n);
  readonly image = input.required<ImageSource>();
  readonly alt = input.required<string>();
  readonly caption = input.required<string>();
  readonly sizes = input('(min-width: 75rem) 1100px, 100vw');
  protected readonly playing = signal(false);
}
