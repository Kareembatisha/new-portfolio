import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../../../core/i18n/i18n.service';
import { PROJECTS } from '../../../data/projects';
import { ProjectCard } from '../../../shared/project-card/project-card';
import { Reveal } from '../../../shared/reveal/reveal';
import { SectionHeader } from '../../../shared/section-header/section-header';

@Component({
  selector: 'app-featured-work',
  imports: [RouterLink, ProjectCard, SectionHeader, Reveal],
  template: `
    <section class="container section" appReveal>
      <app-section-header [title]="i18n.t('home.featured.title')" [lead]="i18n.t('home.featured.lead')">
        <a class="all" [routerLink]="['/', i18n.lang(), 'work']"
          >{{ i18n.t('home.work.all') }} <span class="flip-rtl">→</span></a
        >
      </app-section-header>

      <div class="grid" appReveal stagger>
        @for (project of featured; track project.slug; let first = $first) {
          <app-project-card [project]="project" [variant]="first ? 'lead' : 'default'" [class.span]="first" />
        }
      </div>

      <h3 class="more">{{ i18n.t('home.more.title') }}</h3>
      <div class="grid" appReveal stagger>
        @for (project of more; track project.slug) {
          <app-project-card [project]="project" variant="compact" />
        }
      </div>
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
      gap: var(--space-5);
    }
    .more {
      margin-block: var(--space-8) var(--space-5);
      font-size: var(--fs-xl);
    }
    @media (min-width: 56rem) {
      .grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .span {
        grid-column: 1 / -1;
      }
    }
  `,
})
export class FeaturedWork {
  protected readonly i18n = inject(I18n);
  protected readonly featured = PROJECTS.filter((p) => p.tier === 'featured');
  protected readonly more = PROJECTS.filter((p) => p.tier === 'more');
}
