import { Component, inject } from '@angular/core';
import { I18n } from '../../../core/i18n/i18n.service';
import { STEPS } from '../../../data/home';
import { Reveal } from '../../../shared/reveal/reveal';
import { SectionHeader } from '../../../shared/section-header/section-header';

@Component({
  selector: 'app-how-i-work',
  imports: [SectionHeader, Reveal],
  template: `
    <section class="container section" appReveal>
      <app-section-header [title]="i18n.t('home.how.title')" />
      <ol class="steps" appReveal stagger>
        @for (step of steps; track $index) {
          <li class="step">
            <h3>{{ i18n.l(step.title) }}</h3>
            <p>{{ i18n.l(step.text) }}</p>
          </li>
        }
      </ol>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }
    .steps {
      display: grid;
      gap: var(--space-6);
      counter-reset: step;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .step {
      counter-increment: step;
      padding-block-start: var(--space-4);
      border-block-start: 2px solid var(--color-border);
    }
    .step::before {
      content: '0' counter(step);
      display: block;
      margin-bottom: var(--space-3);
      font-weight: 700;
      color: var(--color-accent);
    }
    h3 {
      font-size: var(--fs-lg);
    }
    p {
      margin-top: var(--space-2);
      color: var(--color-text-2);
    }
    @media (min-width: 56rem) {
      .steps {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  `,
})
export class HowIWork {
  protected readonly i18n = inject(I18n);
  protected readonly steps = STEPS;
}
