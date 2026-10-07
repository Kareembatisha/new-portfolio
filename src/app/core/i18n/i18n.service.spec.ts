import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { beforeEach, describe, expect, it } from 'vitest';
import { ar } from './ar';
import { en } from './en';
import { I18n } from './i18n.service';

describe('I18n', () => {
  let i18n: I18n;
  let doc: Document;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    i18n = TestBed.inject(I18n);
    doc = TestBed.inject(DOCUMENT);
  });

  it('defaults to English, LTR', () => {
    expect(i18n.lang()).toBe('en');
    expect(i18n.dir()).toBe('ltr');
    expect(i18n.t('nav.work')).toBe('Work');
  });

  it('switches to Arabic: messages, direction and <html> attributes', () => {
    i18n.setLang('ar');
    expect(i18n.dir()).toBe('rtl');
    expect(i18n.t('nav.work')).toBe(ar['nav.work']);
    expect(doc.documentElement.lang).toBe('ar');
    expect(doc.documentElement.dir).toBe('rtl');
  });

  it('has the same keys in both languages and no empty strings', () => {
    expect(Object.keys(ar).sort()).toEqual(Object.keys(en).sort());
    for (const value of [...Object.values(en), ...Object.values(ar)]) {
      expect(value.trim().length).toBeGreaterThan(0);
    }
  });
});
