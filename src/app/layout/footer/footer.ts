import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../../core/i18n/i18n.service';
import { NAV_ITEMS } from '../../core/navigation';
import { SITE } from '../../core/site.config';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `
    <footer class="footer">
      <div class="container footer__inner">
        <div>
          <p class="name">{{ i18n.t('brand.name') }}</p>
          <p class="role">{{ i18n.t('brand.role') }}</p>
        </div>

        <nav [attr.aria-label]="i18n.t('footer.nav')">
          <ul class="list">
            @for (item of items; track item.path) {
              <li>
                <a [routerLink]="['/', i18n.lang(), item.path]">{{ i18n.t(item.label) }}</a>
              </li>
            }
            <li>
              <a [routerLink]="['/', i18n.lang(), 'contact']">{{ i18n.t('nav.contact') }}</a>
            </li>
          </ul>
        </nav>

        <ul class="list" [attr.aria-label]="i18n.t('footer.social')">
          @if (site.github) {
            <li><a [href]="site.github" rel="noopener" target="_blank">GitHub</a></li>
          }
          <li><a [href]="site.linkedin" rel="noopener" target="_blank">LinkedIn</a></li>
          <li><a [href]="site.whatsapp" rel="noopener" target="_blank">WhatsApp</a></li>
          <li><a [href]="'mailto:' + site.email">Email</a></li>
        </ul>
      </div>
      <p class="container copy">© {{ year }} {{ i18n.t('brand.name') }}</p>
    </footer>
  `,
  styles: `
    .footer {
      margin-top: var(--space-9);
      padding-block: var(--space-7) var(--space-5);
      border-top: 1px solid var(--color-border);
    }
    .footer__inner {
      display: grid;
      gap: var(--space-6);
    }
    .name {
      font-weight: 700;
      font-size: var(--fs-lg);
    }
    .role,
    .copy {
      color: var(--color-text-2);
      font-size: var(--fs-sm);
    }
    .list {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2) var(--space-5);
    }
    .list a {
      display: inline-flex;
      align-items: center;
      min-height: var(--tap-min);
      color: var(--color-text-2);
      text-decoration: none;
    }
    .list a:hover {
      color: var(--color-text);
      text-decoration: underline;
    }
    .copy {
      margin-top: var(--space-6);
    }
    @media (max-width: 55.99rem) {
      .footer {
        padding-block-end: calc(var(--space-5) + 4.5rem);
      }
    }
    @media (min-width: 56rem) {
      .footer__inner {
        grid-template-columns: 1fr auto auto;
        gap: var(--space-8);
        align-items: start;
      }
    }
  `,
})
export class Footer {
  protected readonly i18n = inject(I18n);
  protected readonly items = NAV_ITEMS;
  protected readonly site = SITE;
  protected readonly year = new Date().getFullYear();
}
