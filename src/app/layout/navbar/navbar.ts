import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { I18n } from '../../core/i18n/i18n.service';
import { nextHeaderHidden } from '../../core/scroll-direction';
import { NAV_ITEMS } from '../../core/navigation';
import { SITE } from '../../core/site.config';
import { LanguageSwitcher } from '../language-switcher/language-switcher';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, LanguageSwitcher],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  protected readonly i18n = inject(I18n);
  protected readonly items = NAV_ITEMS;
  protected readonly cv = SITE.cv;
  protected readonly open = signal(false);
  /** Hide-on-scroll-down / show-on-scroll-up. */
  protected readonly hidden = signal(false);
  private readonly menuButton = viewChild.required<ElementRef<HTMLButtonElement>>('menuButton');

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      let lastY = scrollY;
      let ticking = false;
      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          this.hidden.set(nextHeaderHidden(this.hidden(), lastY, scrollY, this.open()));
          lastY = scrollY;
          ticking = false;
        });
      };
      addEventListener('scroll', onScroll, { passive: true });
      destroyRef.onDestroy(() => removeEventListener('scroll', onScroll));
    });

    // Close the mobile panel after any navigation.
    inject(Router)
      .events.pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.open.set(false));
  }

  protected toggle(): void {
    this.open.update((v) => !v);
  }

  @HostListener('keydown.escape')
  protected onEscape(): void {
    if (this.open()) {
      this.open.set(false);
      this.menuButton().nativeElement.focus();
    }
  }
}
