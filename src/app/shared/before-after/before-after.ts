import { Component, inject, input, signal } from '@angular/core';
import { I18n } from '../../core/i18n/i18n.service';
import type { ImageSource } from '../../models/project';
import { ResponsiveImage } from '../responsive-image/responsive-image';

/** Keeps the slider position inside 0–100 (and handles junk input). */
export function clampPosition(value: number): number {
  return Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 50;
}

/**
 * Before/after comparison. The control is a native range input, so keyboard and screen-reader
 * support come for free; the images are decoration for it.
 */
@Component({
  selector: 'app-before-after',
  imports: [ResponsiveImage],
  template: `
    <figure class="compare" [style.--pos]="position() + '%'">
      <div class="stage">
        <app-responsive-image class="layer" [image]="after()" [alt]="afterAlt()" [sizes]="sizes()" />
        <app-responsive-image class="layer layer--before" [image]="before()" [alt]="beforeAlt()" [sizes]="sizes()" />
        <span class="label label--before" aria-hidden="true">{{ beforeLabel() }}</span>
        <span class="label label--after" aria-hidden="true">{{ afterLabel() }}</span>
        <span class="handle" aria-hidden="true"></span>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          [value]="position()"
          [attr.aria-label]="i18n.t('compare.label') + ': ' + beforeLabel() + ' / ' + afterLabel()"
          (input)="position.set(clamp($any($event.target).valueAsNumber))"
        />
      </div>
      <figcaption>{{ caption() }}</figcaption>
    </figure>
  `,
  styles: `
    :host {
      display: block;
    }
    .compare {
      margin: 0;
    }
    .stage {
      position: relative;
      aspect-ratio: 16 / 9;
      overflow: hidden;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      background: var(--color-surface);
      direction: ltr; // the slider is spatial, so it does not mirror in RTL
    }
    .layer {
      position: absolute;
      inset: 0;
    }
    .layer--before {
      clip-path: inset(0 calc(100% - var(--pos)) 0 0);
    }
    .handle {
      position: absolute;
      inset-block: 0;
      inset-inline-start: calc(var(--pos) - 1px);
      width: 2px;
      background: var(--color-accent);
      pointer-events: none;
    }
    .label {
      position: absolute;
      top: var(--space-3);
      padding: var(--space-1) var(--space-3);
      font-size: var(--fs-sm);
      font-weight: 600;
      color: var(--color-on-accent);
      background: var(--color-text);
      border-radius: var(--radius-pill);
      opacity: 0.85;
    }
    .label--before {
      left: var(--space-3);
    }
    .label--after {
      right: var(--space-3);
    }
    input {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      opacity: 0;
      cursor: ew-resize;
    }
    input:focus-visible ~ .handle {
      outline: 3px solid var(--color-accent);
      outline-offset: 3px;
    }
    figcaption {
      margin-top: var(--space-3);
      font-size: var(--fs-sm);
      color: var(--color-text-2);
    }
  `,
})
export class BeforeAfter {
  protected readonly i18n = inject(I18n);
  readonly before = input.required<ImageSource>();
  readonly after = input.required<ImageSource>();
  readonly beforeAlt = input.required<string>();
  readonly afterAlt = input.required<string>();
  readonly beforeLabel = input.required<string>();
  readonly afterLabel = input.required<string>();
  readonly caption = input.required<string>();
  readonly sizes = input('(min-width: 75rem) 1100px, 100vw');
  protected readonly position = signal(50);
  protected readonly clamp = clampPosition;
}
