import { Component, inject, input } from '@angular/core';
import { I18n } from '../../../core/i18n/i18n.service';
import type { Architecture } from '../../../models/project';
import { Reveal } from '../../../shared/reveal/reveal';

/** Layered architecture as an ordered list (top → bottom), so it reads correctly without CSS. */
@Component({
  selector: 'app-architecture-diagram',
  imports: [Reveal],
  template: `
    <p class="intro">{{ i18n.l(architecture().intro) }}</p>

    <ol class="layers" appReveal stagger style="--stagger: 160ms">
      @for (layer of architecture().layers; track $index) {
        <li class="layer">
          <strong>{{ i18n.l(layer.name) }}</strong>
          <span>{{ i18n.l(layer.note) }}</span>
        </li>
      }
    </ol>

    <h3>{{ i18n.t('cs.arch.why') }}</h3>
    <ul class="reasons">
      @for (reason of architecture().reasons; track $index) {
        <li>{{ i18n.l(reason) }}</li>
      }
    </ul>
  `,
  styles: `
    :host {
      display: grid;
      gap: var(--space-5);
    }
    .intro {
      color: var(--color-text-2);
    }
    .layers {
      display: grid;
      gap: var(--space-5);
      max-width: 30rem;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .layer {
      position: relative;
      display: grid;
      gap: var(--space-1);
      padding: var(--space-4) var(--space-5);
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
    }
    .layer span {
      font-size: var(--fs-sm);
      color: var(--color-text-2);
    }
    .layer:not(:last-child)::after {
      content: '↓';
      position: absolute;
      inset-inline-start: 50%;
      top: calc(100% + var(--space-1));
      color: var(--color-accent);
      font-weight: 700;
    }
    h3 {
      font-size: var(--fs-lg);
    }
    .reasons {
      display: grid;
      gap: var(--space-2);
      padding-inline-start: var(--space-5);
      color: var(--color-text-2);
      list-style: disc;
    }
  `,
})
export class ArchitectureDiagram {
  protected readonly i18n = inject(I18n);
  readonly architecture = input.required<Architecture>();
}
