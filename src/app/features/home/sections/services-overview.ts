import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../../../core/i18n/i18n.service';
import { SERVICES } from '../../../data/services';
import { Reveal } from '../../../shared/reveal/reveal';
import { SectionHeader } from '../../../shared/section-header/section-header';

@Component({
  selector: 'app-services-overview',
  imports: [RouterLink, SectionHeader, Reveal],
  template: `
    <section class="container section" appReveal>
      <app-section-header [title]="i18n.t('home.services.title')" [lead]="i18n.t('home.services.lead')">
        <a class="all" [routerLink]="['/', i18n.lang(), 'services']"
          >{{ i18n.t('home.services.all') }} <span class="flip-rtl">→</span></a
        >
      </app-section-header>

      <ul class="grid" appReveal stagger>
        @for (service of services; track service.id) {
          <li class="item surface">
            <h3>{{ i18n.l(service.title) }}</h3>
            <p>{{ i18n.l(service.summary) }}</p>
          </li>
        }
      </ul>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }
    .all {
      font-weight: 600;
      color: var(--color-accent);
      text-decoration: none;
    }
    .all:hover {
      text-decoration: underline;
    }
    .grid {
      display: grid;
      gap: var(--space-4);
    }
    .item {
      display: grid;
      gap: var(--space-2);
      align-content: start;
      padding: var(--space-5);
    }
    h3 {
      font-size: var(--fs-lg);
    }
    p {
      color: var(--color-text-2);
    }
    @media (min-width: 40rem) {
      .grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    @media (min-width: 75rem) {
      .grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  `,
})
export class ServicesOverview {
  protected readonly i18n = inject(I18n);
  protected readonly services = SERVICES;
}
