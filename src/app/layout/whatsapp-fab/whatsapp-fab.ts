import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { I18n } from '../../core/i18n/i18n.service';
import { stripLang } from '../../core/i18n/lang-url';
import { SITE } from '../../core/site.config';

/** Floating WhatsApp shortcut, mobile only. Not shown on the Contact page, which already has it. */
@Component({
  selector: 'app-whatsapp-fab',
  template: `
    @if (visible()) {
      <aside [attr.aria-label]="i18n.t('fab.region')">
        <a
          class="fab"
          [href]="href()"
          target="_blank"
          rel="noopener"
          [attr.aria-label]="i18n.t('fab.label')"
        >
          <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" focusable="false">
            <path
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.7-5.4A8.5 8.5 0 1 1 21 11.5Z"
            />
            <path
              fill="currentColor"
              d="M9 8.3c.2-.4.5-.4.8-.4l.5 1.3c.1.2 0 .4-.2.6l-.4.5c.7 1.3 1.6 2.1 3 2.8l.6-.6c.2-.2.4-.2.6-.1l1.3.6c.1.2.1.7-.3 1.1-.5.6-1.3.8-2.1.5-2.6-1-4.2-2.8-4.7-4.9-.1-.6.1-1.1.9-1.8Z"
            />
          </svg>
        </a>
      </aside>
    }
  `,
  styles: `
    @keyframes fab-in {
      from {
        opacity: 0;
        transform: translateY(1rem) scale(0.9);
      }
    }
    .fab {
      position: fixed;
      inset-inline-end: var(--space-4);
      inset-block-end: calc(var(--space-4) + env(safe-area-inset-bottom, 0px));
      z-index: 90;
      display: grid;
      place-items: center;
      width: 3.5rem;
      height: 3.5rem;
      color: #fff;
      background: #0b7a60;
      border-radius: 50%;
      box-shadow: var(--shadow-md);
      animation: fab-in 500ms var(--ease) 1.2s both;
      transition: transform var(--t-fast) var(--ease);
    }
    .fab:hover {
      transform: scale(1.06);
    }
    @media (min-width: 56rem) {
      .fab {
        display: none;
      }
    }
  `,
})
export class WhatsappFab {
  protected readonly i18n = inject(I18n);
  private readonly router = inject(Router);
  private readonly path = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e) => stripLang(e.urlAfterRedirects)),
    ),
    { initialValue: stripLang(this.router.url) },
  );

  protected readonly visible = computed(() => this.path() !== '/contact');
  protected readonly href = computed(
    () => `${SITE.whatsapp}?text=${encodeURIComponent(this.i18n.t('fab.message'))}`,
  );
}
