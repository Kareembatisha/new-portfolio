import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { I18n } from '../../core/i18n/i18n.service';
import type { MessageKey } from '../../core/i18n/en';

/** Stand-in for pages that are built in later batches. */
@Component({
  selector: 'app-placeholder-page',
  template: `
    <section class="container page">
      <h1>{{ i18n.t(titleKey) }}</h1>
      <p>{{ i18n.t('placeholder.body') }}</p>
    </section>
  `,
  styles: `
    .page {
      display: grid;
      gap: var(--space-4);
      padding-block: var(--space-9);
    }
    p {
      color: var(--color-text-2);
    }
  `,
})
export class PlaceholderPage {
  protected readonly i18n = inject(I18n);
  protected readonly titleKey = inject(ActivatedRoute).snapshot.data['titleKey'] as MessageKey;
}
