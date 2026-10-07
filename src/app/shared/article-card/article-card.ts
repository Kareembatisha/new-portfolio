import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../../core/i18n/i18n.service';
import type { Article } from '../../models/content';

@Component({
  selector: 'app-article-card',
  imports: [RouterLink],
  template: `
    <article class="card surface">
      <time [attr.datetime]="article().date">{{ date() }}</time>
      <h2>
        <a [routerLink]="['/', i18n.lang(), 'articles', article().slug]">{{
          i18n.l(article().title)
        }}</a>
      </h2>
      <p>{{ i18n.l(article().excerpt) }}</p>
    </article>
  `,
  styles: `
    :host {
      display: block;
    }
    .card {
      position: relative;
      display: grid;
      gap: var(--space-2);
      padding: var(--space-5);
      transition: border-color var(--t-base) var(--ease);
    }
    .card:hover {
      border-color: var(--color-text-2);
    }
    time {
      font-size: var(--fs-sm);
      font-weight: 600;
      color: var(--color-accent);
    }
    h2 {
      font-size: var(--fs-xl);
    }
    a {
      text-decoration: none;
    }
    a::after {
      content: '';
      position: absolute;
      inset: 0;
    }
    p {
      color: var(--color-text-2);
    }
  `,
})
export class ArticleCard {
  protected readonly i18n = inject(I18n);
  readonly article = input.required<Article>();
  protected readonly date = computed(() =>
    new Intl.DateTimeFormat(this.i18n.lang(), { dateStyle: 'long', timeZone: 'UTC' }).format(
      new Date(this.article().date),
    ),
  );
}
