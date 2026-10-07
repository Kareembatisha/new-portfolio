import { Component, inject } from '@angular/core';
import { I18n } from '../../core/i18n/i18n.service';
import { ARTICLES } from '../../data/articles';
import { ArticleCard } from '../../shared/article-card/article-card';

@Component({
  selector: 'app-articles-page',
  imports: [ArticleCard],
  template: `
    <section class="container page">
      <h1>{{ i18n.t('page.articles') }}</h1>
      <p class="lead">{{ i18n.t('articles.lead') }}</p>

      @if (articles.length) {
        <div class="list">
          @for (article of articles; track article.slug) {
            <app-article-card [article]="article" />
          }
        </div>
      } @else {
        <p class="empty surface">{{ i18n.t('articles.empty') }}</p>
      }
    </section>
  `,
  styles: `
    .page {
      display: grid;
      gap: var(--space-5);
      padding-block: var(--space-8);
    }
    .lead {
      max-width: 38rem;
      font-size: var(--fs-xl);
      color: var(--color-text-2);
    }
    .list {
      display: grid;
      gap: var(--space-4);
      margin-top: var(--space-4);
    }
    .empty {
      margin-top: var(--space-4);
      padding: var(--space-6);
      color: var(--color-text-2);
    }
  `,
})
export class ArticlesPage {
  protected readonly i18n = inject(I18n);
  protected readonly articles = [...ARTICLES].sort((a, b) => b.date.localeCompare(a.date));
}
