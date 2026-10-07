import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../../core/i18n/i18n.service';
import { SITE } from '../../core/site.config';
import { Reveal } from '../reveal/reveal';

@Component({
  selector: 'app-cta-section',
  imports: [RouterLink, Reveal],
  template: `
    <section class="container section" appReveal>
      <div class="cta surface">
        <h2>{{ title() }}</h2>
        @if (lead()) {
          <p class="lead">{{ lead() }}</p>
        }
        <div class="actions">
          <a class="btn btn--primary" [routerLink]="['/', i18n.lang(), 'contact']">{{
            primaryLabel() || i18n.t('cta.primary')
          }}</a>
          <a class="btn btn--secondary" [href]="whatsapp" target="_blank" rel="noopener">{{
            i18n.t('cta.whatsapp')
          }}</a>
        </div>
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }
    .cta {
      display: grid;
      gap: var(--space-4);
      justify-items: start;
      padding: var(--space-7) var(--space-5);
      background: var(--color-accent-soft);
      border-color: transparent;
    }
    .lead {
      max-width: 36rem;
      font-size: var(--fs-lg);
      color: var(--color-text-2);
    }
    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-3);
      margin-top: var(--space-2);
    }
    @media (min-width: 56rem) {
      .cta {
        padding: var(--space-8);
      }
    }
  `,
})
export class CtaSection {
  protected readonly i18n = inject(I18n);
  readonly title = input.required<string>();
  readonly lead = input<string>();
  /** Context-specific button text; defaults to "Discuss Your Project". */
  readonly primaryLabel = input<string>();
  protected readonly whatsapp = SITE.whatsapp;
}
