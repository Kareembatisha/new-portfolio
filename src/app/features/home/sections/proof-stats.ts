import { Component, inject } from '@angular/core';
import { I18n } from '../../../core/i18n/i18n.service';
import { STATS } from '../../../data/home';
import { CountUp } from '../../../shared/count-up/count-up';
import { Reveal } from '../../../shared/reveal/reveal';

@Component({
  selector: 'app-proof-stats',
  imports: [CountUp, Reveal],
  template: `
    <section class="container band" [attr.aria-label]="i18n.t('home.stats.label')">
      <ul class="stats" appReveal stagger>
        @for (stat of stats; track $index) {
          <li>
            <p class="value" dir="ltr">
              <span [appCountUp]="stat.value">{{ stat.value }}</span
              >@if (stat.plus) {<span>+</span>}
            </p>
            <p class="label">{{ i18n.l(stat.label) }}</p>
            <p class="source">{{ i18n.l(stat.source) }}</p>
          </li>
        }
      </ul>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }
    .band {
      padding-block: var(--space-7);
    }
    .stats {
      display: grid;
      gap: var(--space-6);
      grid-template-columns: repeat(2, 1fr);
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .value {
      font-size: var(--fs-h2);
      font-weight: 700;
      line-height: 1;
      letter-spacing: -0.02em;
      color: var(--color-accent);
      text-align: start;
    }
    :host-context([dir='rtl']) .value {
      text-align: end;
    }
    .label {
      margin-top: var(--space-2);
      font-weight: 600;
    }
    .source {
      font-size: var(--fs-sm);
      color: var(--color-text-2);
    }
    @media (min-width: 56rem) {
      .stats {
        grid-template-columns: repeat(4, 1fr);
        gap: var(--space-7);
      }
    }
  `,
})
export class ProofStats {
  protected readonly i18n = inject(I18n);
  protected readonly stats = STATS;
}
