import { DOCUMENT } from '@angular/common';
import { Component, computed, ElementRef, inject, signal } from '@angular/core';
import { I18n } from '../../core/i18n/i18n.service';
import { SITE } from '../../core/site.config';
import {
  buildContactMessage,
  type ContactValues,
  encodeBackupForm,
  fill,
  validateContact,
} from './contact-message';

type Channel = 'whatsapp' | 'email';
const FIELDS = ['name', 'email', 'details'] as const;

/**
 * No backend of our own: the form composes a message and hands it to WhatsApp or the visitor's email
 * app. A copy is also posted to Netlify Forms (the hosting), so a lead isn't lost if WhatsApp or the
 * email app doesn't open. If that copy fails, the visitor still has the message on screen to copy.
 */
@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
})
export class ContactForm {
  protected readonly i18n = inject(I18n);
  private readonly document = inject(DOCUMENT);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly name = signal('');
  protected readonly email = signal('');
  protected readonly details = signal('');
  private readonly attempted = signal(false);
  /** The prepared message, shown with a copy button after a successful send attempt. */
  protected readonly prepared = signal<string | null>(null);
  protected readonly copyState = signal<'idle' | 'copied' | 'failed'>('idle');

  private readonly values = computed<ContactValues>(() => ({
    name: this.name(),
    email: this.email(),
    details: this.details(),
  }));
  // Errors appear only after the first send attempt, then update live as the visitor fixes them.
  protected readonly errors = computed(() =>
    this.attempted() ? validateContact(this.values()) : {},
  );

  protected value(event: Event): string {
    return (event.target as HTMLInputElement | HTMLTextAreaElement).value;
  }

  protected submit(event: Event): void {
    event.preventDefault();
    this.send('whatsapp');
  }

  protected send(channel: Channel): void {
    this.attempted.set(true);
    const errors = validateContact(this.values());
    const firstInvalid = FIELDS.find((field) => errors[field]);
    if (firstInvalid) {
      this.host.nativeElement.querySelector<HTMLElement>(`#contact-${firstInvalid}`)?.focus();
      return;
    }

    const message = buildContactMessage(this.values(), this.i18n.t('contact.msg.greeting'));
    const win = this.document.defaultView;
    if (!win) return;

    this.prepared.set(message);
    this.copyState.set('idle');
    void this.sendBackup(channel);

    if (channel === 'whatsapp') {
      win.open(`${SITE.whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
    } else {
      const subject = fill(this.i18n.t('contact.msg.subject'), { name: this.name().trim() });
      win.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    }
  }

  protected async copy(): Promise<void> {
    const text = this.prepared();
    if (!text) return;
    try {
      await this.document.defaultView!.navigator.clipboard.writeText(text);
      this.copyState.set('copied');
    } catch {
      this.copyState.set('failed');
    }
  }

  /** Best effort: never blocks or interrupts the visitor. */
  private async sendBackup(channel: Channel): Promise<void> {
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeBackupForm(this.values(), { channel, lang: this.i18n.lang() }),
      });
    } catch {
      /* the copy button above is the fallback */
    }
  }
}
