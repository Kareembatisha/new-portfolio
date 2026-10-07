import { Component, inject, input } from '@angular/core';
import { I18n } from '../../core/i18n/i18n.service';
import type { Project } from '../../models/project';
import { ResponsiveImage } from '../responsive-image/responsive-image';

/** A project's cover image, or a neutral placeholder until a real screenshot is supplied. */
@Component({
  selector: 'app-project-media',
  imports: [ResponsiveImage],
  host: { '[style.view-transition-name]': 'transitionName()' },
  template: `
    @if (project().cover; as cover) {
      <app-responsive-image
        [image]="cover"
        [alt]="i18n.l(cover.alt)"
        [sizes]="sizes()"
        [priority]="priority()"
      />
    } @else {
      <div class="placeholder" aria-hidden="true">
        <span class="bar"></span><span class="bar bar--short"></span>
        <span class="block"></span>
      </div>
      <span class="label">{{ i18n.t('card.placeholder') }}</span>
    }
  `,
  styles: `
    :host {
      display: block;
      position: relative;
      aspect-ratio: 2 / 1;
      overflow: hidden;
      background: var(--color-accent-soft);
      border-block-end: 1px solid var(--color-border);
    }
    app-responsive-image {
      transition: transform 500ms var(--ease);
    }
    :host-context(.card:hover) app-responsive-image {
      transform: scale(1.03);
    }
    .placeholder {
      position: absolute;
      inset: var(--space-5) var(--space-5) 0;
      display: grid;
      grid-template-rows: auto auto 1fr;
      gap: var(--space-2);
      padding: var(--space-4);
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-block-end: 0;
      border-radius: var(--radius-md) var(--radius-md) 0 0;
    }
    .bar {
      height: 0.5rem;
      border-radius: var(--radius-pill);
      background: var(--color-border);
    }
    .bar--short {
      width: 40%;
    }
    .block {
      border-radius: var(--radius-sm);
      background: var(--color-accent-soft);
    }
    .label {
      position: absolute;
      inset-block-end: var(--space-3);
      inset-inline: 0;
      text-align: center;
      font-size: var(--fs-sm);
      color: var(--color-text-2);
    }
  `,
})
export class ProjectMedia {
  protected readonly i18n = inject(I18n);
  readonly project = input.required<Project>();
  /** Rendered width hint for the browser; the default fits the project cards. */
  readonly sizes = input('(min-width: 56rem) 560px, 100vw');
  /** True for the one image that is visible without scrolling. */
  readonly priority = input(false);
  /** Set on the card and on the case-study hero so the cover morphs between the two pages. */
  readonly transitionName = input<string>();
}
