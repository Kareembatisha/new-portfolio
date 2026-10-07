import { Component, inject } from '@angular/core';
import { I18n } from '../../../core/i18n/i18n.service';
import { STRENGTHS } from '../../../data/home';
import { Reveal } from '../../../shared/reveal/reveal';
import { SectionHeader } from '../../../shared/section-header/section-header';

@Component({
  selector: 'app-strengths',
  imports: [SectionHeader, Reveal],
  template: `
    <section class="container section" appReveal>
      <app-section-header [title]="i18n.t('home.strengths.title')" [lead]="i18n.t('home.strengths.lead')" />
      <ul class="grid" appReveal stagger>
        @for (item of strengths; track $index) {
          <li class="item surface">
            <h3>{{ i18n.l(item.title) }}</h3>
            <p>{{ i18n.l(item.text) }}</p>
            <p class="seen">
              <span>{{ i18n.t('strengths.seen') }}:</span> {{ item.seenIn.join(' · ') }}
            </p>
          </li>
        }
      </ul>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }
    .grid {
      display: grid;
      gap: var(--space-4);
    }
    .item {
      display: grid;
      gap: var(--space-3);
      align-content: start;
      padding: var(--space-6);
    }
    h3 {
      font-size: var(--fs-xl);
    }
    p {
      color: var(--color-text-2);
    }
    .seen {
      margin-top: var(--space-2);
      font-size: var(--fs-sm);
    }
    .seen span {
      font-weight: 600;
      color: var(--color-text);
    }
    @media (min-width: 56rem) {
      .grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `,
})
export class Strengths {
  protected readonly i18n = inject(I18n);
  protected readonly strengths = STRENGTHS;
}
