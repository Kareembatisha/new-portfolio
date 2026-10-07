import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  PLATFORM_ID,
  viewChild,
  DestroyRef,
} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { I18n } from '../../core/i18n/i18n.service';
import { stripLang } from '../../core/i18n/lang-url';
import { Footer } from '../footer/footer';
import { WhatsappFab } from '../whatsapp-fab/whatsapp-fab';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, Navbar, Footer, WhatsappFab],
  template: `
    <a class="skip-link" href="#main" (click)="skipToContent($event)">{{ i18n.t('a11y.skip') }}</a>
    <app-navbar />
    <main id="main" #main tabindex="-1"><router-outlet /></main>
    <app-footer />
    <app-whatsapp-fab />
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    main {
      flex: 1;
    }
    .skip-link {
      position: absolute;
      inset-inline-start: var(--space-4);
      top: var(--space-2);
      z-index: var(--z-skip);
      padding: var(--space-2) var(--space-4);
      background: var(--color-text);
      color: var(--color-surface);
      border-radius: var(--radius-sm);
      transform: translateY(-200%);
    }
    .skip-link:focus {
      transform: none;
    }
  `,
})
export class Shell {
  protected readonly i18n = inject(I18n);
  private readonly main = viewChild.required<ElementRef<HTMLElement>>('main');

  constructor() {
    const router = inject(Router);
    if (!isPlatformBrowser(inject(PLATFORM_ID))) return;

    // Move focus to <main> after navigating to a different page (not when only the language changes).
    let previousPath = stripLang(router.url);
    const sub = router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((e) => {
      const path = stripLang(e.urlAfterRedirects);
      if (path !== previousPath) this.main().nativeElement.focus({ preventScroll: true });
      previousPath = path;
    });
    inject(DestroyRef).onDestroy(() => sub.unsubscribe());
  }

  protected skipToContent(event: Event): void {
    event.preventDefault(); // a bare #hash would resolve against <base href="/">
    this.main().nativeElement.focus();
  }
}
