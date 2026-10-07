import { DOCUMENT } from '@angular/common';
import { computed, inject, Injectable, signal } from '@angular/core';
import { ar } from './ar';
import { en, type MessageKey } from './en';
import type { Localized } from '../../models/localized';
import { DEFAULT_LANG, type Lang } from './lang-url';

const MESSAGES: Record<Lang, Record<MessageKey, string>> = { en, ar };

/**
 * Language state for the whole site. The active language comes from the URL (`/en`, `/ar`),
 * so every language has its own prerendered page; switching is a client-side navigation.
 */
@Injectable({ providedIn: 'root' })
export class I18n {
  private readonly document = inject(DOCUMENT);
  private readonly current = signal<Lang>(DEFAULT_LANG);

  readonly lang = this.current.asReadonly();
  readonly dir = computed<'ltr' | 'rtl'>(() => (this.current() === 'ar' ? 'rtl' : 'ltr'));

  setLang(lang: Lang): void {
    this.current.set(lang);
    // Set synchronously so prerendered HTML always carries the right lang/dir.
    const root = this.document.documentElement;
    root.lang = lang;
    root.dir = this.dir();
  }

  t(key: MessageKey): string {
    return MESSAGES[this.current()][key];
  }

  /** Picks the active language from a content field (`{ en, ar }`). */
  l(text: Localized): string {
    return text[this.current()];
  }
}
