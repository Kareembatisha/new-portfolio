import { Component, inject } from '@angular/core';
import { I18n } from '../../core/i18n/i18n.service';
import { SITE } from '../../core/site.config';
import { ContactForm } from './contact-form';

@Component({
  selector: 'app-contact-page',
  imports: [ContactForm],
  template: `
    <section class="container page">
      <div class="intro">
        <h1>{{ i18n.t('page.contact') }}</h1>
        <p class="lead">{{ i18n.t('contact.lead') }}</p>

        <h2>{{ i18n.t('contact.direct') }}</h2>
        <ul class="channels">
          <li>
            <a class="btn btn--primary" [href]="site.whatsapp" target="_blank" rel="noopener"
              >WhatsApp</a
            >
          </li>
          <li>
            <a class="channel" [href]="'mailto:' + site.email" dir="ltr">{{ site.email }}</a>
          </li>
          <li><a class="channel" [href]="site.linkedin" target="_blank" rel="noopener">LinkedIn</a></li>
          @if (site.github) {
            <li><a class="channel" [href]="site.github" target="_blank" rel="noopener">GitHub</a></li>
          }
        </ul>
      </div>

      <div class="form surface">
        <h2>{{ i18n.t('contact.or') }}</h2>
        <app-contact-form />
      </div>
    </section>
  `,
  styles: `
    .page {
      display: grid;
      gap: var(--space-7);
      padding-block: var(--space-8);
    }
    .intro {
      display: grid;
      gap: var(--space-4);
      align-content: start;
      justify-items: start;
    }
    .lead {
      max-width: 34rem;
      font-size: var(--fs-xl);
      color: var(--color-text-2);
    }
    h2 {
      margin-top: var(--space-4);
      font-size: var(--fs-lg);
    }
    .channels {
      display: grid;
      gap: var(--space-2);
      justify-items: start;
    }
    .channel {
      display: inline-flex;
      align-items: center;
      min-height: var(--tap-min);
      font-weight: 600;
      color: var(--color-accent);
      text-decoration: none;
    }
    .channel:hover {
      text-decoration: underline;
    }
    .form {
      display: grid;
      gap: var(--space-5);
      padding: var(--space-6);
    }
    .form h2 {
      margin: 0;
    }
    @media (min-width: 56rem) {
      .page {
        grid-template-columns: 1fr 1fr;
        gap: var(--space-8);
        align-items: start;
      }
    }
  `,
})
export class ContactPage {
  protected readonly i18n = inject(I18n);
  protected readonly site = SITE;
}
