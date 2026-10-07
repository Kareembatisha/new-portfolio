import { Component, inject, input } from '@angular/core';
import { I18n } from '../../core/i18n/i18n.service';
import type { Experience } from '../../models/content';

@Component({
  selector: 'app-timeline',
  template: `
    <ol class="timeline">
      @for (job of items(); track job.company + job.period.en) {
        <li class="job surface">
          <p class="period">{{ i18n.l(job.period) }}</p>
          <h3>{{ i18n.l(job.role) }} · {{ job.company }}</h3>
          <ul class="points">
            @for (point of job.highlights; track $index) {
              <li>{{ i18n.l(point) }}</li>
            }
          </ul>
        </li>
      }
    </ol>
  `,
  styles: `
    :host {
      display: block;
    }
    .timeline {
      display: grid;
      gap: var(--space-4);
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .job {
      padding: var(--space-6);
    }
    .period {
      font-size: var(--fs-sm);
      font-weight: 600;
      color: var(--color-accent);
    }
    h3 {
      margin-block: var(--space-2) var(--space-4);
      font-size: var(--fs-xl);
    }
    .points {
      display: grid;
      gap: var(--space-3);
      margin: 0;
      padding: 0;
      color: var(--color-text-2);
      list-style: none;
    }
    .points li {
      position: relative;
      padding-inline-start: var(--space-5);
    }
    .points li::before {
      content: '';
      position: absolute;
      inset-inline-start: 0;
      top: 0.7em;
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      background: var(--color-accent);
    }
  `,
})
export class Timeline {
  protected readonly i18n = inject(I18n);
  readonly items = input.required<readonly Experience[]>();
}
