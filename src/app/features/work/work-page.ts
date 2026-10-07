import { Component, inject } from '@angular/core';
import { I18n } from '../../core/i18n/i18n.service';
import { PROJECTS } from '../../data/projects';
import { CtaSection } from '../../shared/cta-section/cta-section';
import { Reveal } from '../../shared/reveal/reveal';
import { ProjectCard } from '../../shared/project-card/project-card';

@Component({
  selector: 'app-work-page',
  imports: [ProjectCard, CtaSection, Reveal],
  template: `
    <section class="container intro">
      <h1>{{ i18n.t('page.work') }}</h1>
      <p class="lead">{{ i18n.t('work.lead') }}</p>
    </section>

    <section class="container group">
      <h2>{{ i18n.t('home.featured.title') }}</h2>
      <div class="grid" appReveal stagger>
        @for (project of featured; track project.slug) {
          <app-project-card [project]="project" />
        }
      </div>
    </section>

    <section class="container group">
      <h2>{{ i18n.t('home.more.title') }}</h2>
      <div class="grid" appReveal stagger>
        @for (project of more; track project.slug) {
          <app-project-card [project]="project" variant="compact" />
        }
      </div>
    </section>

    <app-cta-section [title]="i18n.t('cta.title')" [lead]="i18n.t('cta.lead')" />
  `,
  styles: `
    .intro {
      display: grid;
      gap: var(--space-4);
      padding-block: var(--space-8) var(--space-6);
    }
    .lead {
      max-width: 38rem;
      font-size: var(--fs-xl);
      color: var(--color-text-2);
    }
    .group {
      padding-block: var(--space-6);
    }
    h2 {
      margin-bottom: var(--space-5);
      font-size: var(--fs-xl);
    }
    .grid {
      display: grid;
      gap: var(--space-5);
    }
    @media (min-width: 56rem) {
      .grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `,
})
export class WorkPage {
  protected readonly i18n = inject(I18n);
  protected readonly featured = PROJECTS.filter((p) => p.tier === 'featured');
  protected readonly more = PROJECTS.filter((p) => p.tier === 'more');
}
