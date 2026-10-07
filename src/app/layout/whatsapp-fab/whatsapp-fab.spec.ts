import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { describe, expect, it } from 'vitest';
import { I18n } from '../../core/i18n/i18n.service';
import { WhatsappFab } from './whatsapp-fab';

describe('WhatsappFab', () => {
  async function setup(url: string) {
    TestBed.configureTestingModule({
      providers: [provideRouter([{ path: '**', component: WhatsappFab }])],
    });
    TestBed.inject(I18n).setLang('en');
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl(url);
    harness.detectChanges();
    return harness.routeNativeElement as HTMLElement;
  }

  it('links to WhatsApp with a prefilled message', async () => {
    const root = await setup('/en/work');
    const link = root.querySelector('a')!;
    expect(link.getAttribute('href')).toContain('https://wa.me/');
    expect(decodeURIComponent(link.getAttribute('href')!)).toContain('would like to discuss a project');
    expect(link.getAttribute('aria-label')).toBe('Chat on WhatsApp');
  });

  it('is hidden on the contact page, which already offers WhatsApp', async () => {
    const root = await setup('/en/contact');
    expect(root.querySelector('a')).toBeNull();
  });
});
