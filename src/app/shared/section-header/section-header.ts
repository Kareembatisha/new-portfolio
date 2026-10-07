import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  template: `
    <header class="head">
      <div>
        <h2>{{ title() }}</h2>
        @if (lead()) {
          <p class="lead">{{ lead() }}</p>
        }
      </div>
      <ng-content />
    </header>
  `,
  styles: `
    :host {
      display: block;
    }
    .head {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-end;
      justify-content: space-between;
      gap: var(--space-4) var(--space-6);
      margin-bottom: var(--space-7);
    }
    .lead {
      margin-top: var(--space-3);
      max-width: 38rem;
      font-size: var(--fs-lg);
      color: var(--color-text-2);
    }
  `,
})
export class SectionHeader {
  readonly title = input.required<string>();
  readonly lead = input<string>();
}
