import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../../../core/i18n/i18n.service';
import { SITE } from '../../../core/site.config';
import { EXPERIENCE } from '../../../data/experience';
import { Reveal } from '../../../shared/reveal/reveal';
import { SectionHeader } from '../../../shared/section-header/section-header';
import { Timeline } from '../../../shared/timeline/timeline';

@Component({
  selector: 'app-about-preview',
  imports: [RouterLink, SectionHeader, Reveal, Timeline],
  template: `
    <section class="container section" appReveal>
      <app-section-header [title]="i18n.t('home.about.title')" />
      <div class="layout">
        <div class="text">
          <p>{{ i18n.t('home.about.body') }}</p>
          <div class="actions">
            <a class="btn btn--secondary" [routerLink]="['/', i18n.lang(), 'about']">{{
              i18n.t('home.about.more')
            }}</a>
            <a class="btn btn--secondary" [href]="cv" download>{{ i18n.t('nav.cv') }}</a>
          </div>
        </div>

        <app-timeline [items]="experience" />
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }
    .layout {
      display: grid;
      gap: var(--space-7);
      align-items: start;
    }
    .text {
      display: grid;
      gap: var(--space-5);
      justify-items: start;
      font-size: var(--fs-lg);
      color: var(--color-text-2);
    }
    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-3);
    }
    @media (min-width: 56rem) {
      .layout {
        grid-template-columns: 1fr 1fr;
        gap: var(--space-8);
      }
    }
  `,
})
export class AboutPreview {
  protected readonly i18n = inject(I18n);
  protected readonly experience = EXPERIENCE;
  protected readonly cv = SITE.cv;
}
