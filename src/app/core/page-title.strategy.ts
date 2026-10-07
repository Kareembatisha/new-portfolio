import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { I18n } from './i18n/i18n.service';

/** "Services — Kareem Zakaria". The home page already carries the full title. */
@Injectable({ providedIn: 'root' })
export class PageTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly i18n = inject(I18n);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const page = this.buildTitle(snapshot);
    const brand = this.i18n.t('brand.name');
    const isHome = page === this.i18n.t('page.home');
    this.title.setTitle(!page ? brand : isHome ? page : `${page} — ${brand}`);
  }
}
