import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { I18n } from '../../core/i18n/i18n.service';
import { ContactForm } from './contact-form';

describe('ContactForm', () => {
  let root: HTMLElement;
  let open: ReturnType<typeof vi.fn>;
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    open = vi.fn();
    vi.stubGlobal('open', open);
    fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', fetchMock);
    TestBed.inject(I18n).setLang('en');
    const fixture = TestBed.createComponent(ContactForm);
    fixture.detectChanges();
    root = fixture.nativeElement;
  });
  afterEach(() => vi.unstubAllGlobals());

  const fill = (selector: string, value: string) => {
    const el = root.querySelector<HTMLInputElement>(selector)!;
    el.value = value;
    el.dispatchEvent(new Event('input'));
  };
  const submit = () => {
    root.querySelector('form')!.dispatchEvent(new Event('submit', { cancelable: true }));
    TestBed.tick();
  };

  it('shows errors, marks fields invalid and does not open WhatsApp when empty', () => {
    submit();
    expect(root.querySelectorAll('.error')).toHaveLength(3);
    expect(root.querySelector('#contact-name')?.getAttribute('aria-invalid')).toBe('true');
    expect(open).not.toHaveBeenCalled();
  });

  it('opens WhatsApp with the message when valid', () => {
    fill('#contact-name', 'Sara');
    fill('#contact-email', 'sara@example.com');
    fill('#contact-details', 'I need an Angular dashboard.');
    submit();
    expect(root.querySelectorAll('.error')).toHaveLength(0);
    expect(open).toHaveBeenCalledOnce();
    const url = open.mock.calls[0][0] as string;
    expect(url).toContain('https://wa.me/');
    expect(decodeURIComponent(url)).toContain('I need an Angular dashboard.');
  });

  it('posts a backup copy to Netlify Forms and shows the prepared message', () => {
    fill('#contact-name', 'Sara');
    fill('#contact-email', 'sara@example.com');
    fill('#contact-details', 'I need an Angular dashboard.');
    submit();
    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('/');
    expect(String(init.body)).toContain('form-name=contact');
    expect(String(init.body)).toContain('channel=whatsapp');
    expect(root.querySelector('.ready__message')?.textContent).toContain('I need an Angular dashboard.');
  });

  it('does not send anything while the form is invalid', () => {
    submit();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(root.querySelector('.ready')).toBeNull();
  });

  it('keeps working when the backup request fails', () => {
    fetchMock.mockRejectedValue(new Error('offline'));
    fill('#contact-name', 'Sara');
    fill('#contact-email', 'sara@example.com');
    fill('#contact-details', 'I need an Angular dashboard.');
    submit();
    expect(open).toHaveBeenCalledOnce();
    expect(root.querySelector('.ready')).not.toBeNull();
  });

  it('copies the message to the clipboard and confirms', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { clipboard: { writeText } });
    fill('#contact-name', 'Sara');
    fill('#contact-email', 'sara@example.com');
    fill('#contact-details', 'I need an Angular dashboard.');
    submit();
    root.querySelector<HTMLButtonElement>('.ready button')!.click();
    await Promise.resolve();
    await Promise.resolve();
    TestBed.tick();
    expect(writeText).toHaveBeenCalledWith(expect.stringContaining('I need an Angular dashboard.'));
    expect(root.querySelector('.ready button')?.textContent).toContain('Copied');
  });
});
