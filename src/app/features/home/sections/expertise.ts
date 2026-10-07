import { Component, inject } from '@angular/core';
import { I18n } from '../../../core/i18n/i18n.service';
import { EXPERTISE } from '../../../data/home';

@Component({
  selector: 'app-expertise',
  template: `
    <section class="container band" [attr.aria-label]="i18n.t('home.expertise.label')">
      <ul class="chips">
        @for (item of items; track item) {
          <li>{{ item }}</li>
        }
      </ul>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }
    .band {
      padding-block: var(--space-5);
      border-block: 1px solid var(--color-border);
    }
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2) var(--space-5);
    }
    li {
      direction: ltr;
      unicode-bidi: isolate;
      font-weight: 600;
      color: var(--color-text-2);
    }
  `,
})
export class Expertise {
  protected readonly i18n = inject(I18n);
  protected readonly items = EXPERTISE;
}
