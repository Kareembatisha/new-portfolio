import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../../core/i18n/i18n.service';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink],
  template: `
    <section class="container page">
      <p class="code" dir="ltr">404</p>
      <h1>{{ i18n.t('page.notFound') }}</h1>
      <p class="body">{{ i18n.t('notFound.body') }}</p>
      <a class="btn btn--primary" [routerLink]="['/', i18n.lang()]">{{ i18n.t('notFound.home') }}</a>
    </section>
  `,
  styles: `
    .page {
      display: grid;
      gap: var(--space-4);
      justify-items: start;
      padding-block: var(--space-9);
    }
    .code {
      color: var(--color-accent);
      font-weight: 700;
    }
    .body {
      color: var(--color-text-2);
    }
  `,
})
export class NotFoundPage {
  protected readonly i18n = inject(I18n);
}
