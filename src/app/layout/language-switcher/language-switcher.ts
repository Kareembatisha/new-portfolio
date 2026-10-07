import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';
import { I18n } from '../../core/i18n/i18n.service';
import { type Lang, swapLang } from '../../core/i18n/lang-url';

/** The label is always written in the language it switches to, with a matching `lang` attribute. */
const TARGET: Record<Lang, { lang: Lang; label: string }> = {
  en: { lang: 'ar', label: 'العربية' },
  ar: { lang: 'en', label: 'English' },
};

@Component({
  selector: 'app-language-switcher',
  imports: [RouterLink],
  template: `<a class="switch" [routerLink]="href()" [attr.lang]="target().lang" [attr.hreflang]="target().lang">{{
    target().label
  }}</a>`,
  styles: `
    .switch {
      display: inline-flex;
      align-items: center;
      min-height: var(--tap-min);
      padding-inline: var(--space-3);
      font-weight: 600;
      text-decoration: none;
      border-radius: var(--radius-pill);
      transition: background-color var(--t-fast) var(--ease);
    }
    .switch:hover {
      background: var(--color-accent-soft);
    }
  `,
})
export class LanguageSwitcher {
  private readonly router = inject(Router);
  private readonly i18n = inject(I18n);
  private readonly url = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  protected readonly target = computed(() => TARGET[this.i18n.lang()]);
  protected readonly href = computed(() => swapLang(this.url(), this.target().lang));
}
