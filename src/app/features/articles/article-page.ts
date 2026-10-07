import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../../core/i18n/i18n.service';
import type { Article } from '../../models/content';

@Component({
  selector: 'app-article-page',
  imports: [RouterLink],
  template: `
    <article class="container page">
      <a class="back" [routerLink]="['/', i18n.lang(), 'articles']"
        ><span class="flip-rtl">←</span> {{ i18n.t('articles.back') }}</a
      >
      <time [attr.datetime]="article().date">{{ date() }}</time>
      <h1>{{ i18n.l(article().title) }}</h1>
      <div class="body">
        @for (paragraph of article().body; track $index) {
          <p>{{ i18n.l(paragraph) }}</p>
        }
      </div>
    </article>
  `,
  styles: `
    .page {
      display: grid;
      gap: var(--space-4);
      justify-items: start;
      max-width: var(--container-narrow);
      margin-inline: auto;
      padding-block: var(--space-8);
    }
    .back {
      display: inline-flex;
      align-items: center;
      min-height: var(--tap-min);
      font-weight: 600;
      color: var(--color-text-2);
      text-decoration: none;
    }
    time {
      font-size: var(--fs-sm);
      font-weight: 600;
      color: var(--color-accent);
    }
    h1 {
      font-size: var(--fs-h2);
    }
    .body {
      display: grid;
      gap: var(--space-4);
      font-size: var(--fs-lg);
    }
  `,
})
export class ArticlePage {
  protected readonly i18n = inject(I18n);
  /** Bound from the route's `article` resolver. */
  readonly article = input.required<Article>();
  protected readonly date = computed(() =>
    new Intl.DateTimeFormat(this.i18n.lang(), { dateStyle: 'long', timeZone: 'UTC' }).format(
      new Date(this.article().date),
    ),
  );
}
