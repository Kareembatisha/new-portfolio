import { describe, expect, it } from 'vitest';
import { buildContactMessage, encodeBackupForm, fill, validateContact } from './contact-message';

const valid = { name: 'Sara', email: 'sara@example.com', details: 'I need an Angular dashboard.' };

describe('validateContact', () => {
  it('accepts valid values', () => {
    expect(validateContact(valid)).toEqual({});
  });

  it('flags every invalid field with its message key', () => {
    expect(validateContact({ name: ' ', email: 'nope', details: 'short' })).toEqual({
      name: 'contact.err.name',
      email: 'contact.err.email',
      details: 'contact.err.details',
    });
  });

  it('trims whitespace before checking', () => {
    expect(validateContact({ ...valid, details: '         x ' }).details).toBe('contact.err.details');
  });

  it('rejects emails without a domain dot or with spaces', () => {
    expect(validateContact({ ...valid, email: 'a@b' }).email).toBeDefined();
    expect(validateContact({ ...valid, email: 'a b@c.com' }).email).toBeDefined();
  });
});

describe('message building', () => {
  it('fills known placeholders and leaves unknown ones', () => {
    expect(fill('Hi {name} {x}', { name: 'Sara' })).toBe('Hi Sara {x}');
  });

  it('builds a greeting plus the project details', () => {
    expect(buildContactMessage(valid, "Hi Kareem, I'm {name} ({email}).")).toBe(
      "Hi Kareem, I'm Sara (sara@example.com).\n\nI need an Angular dashboard.",
    );
  });
});

describe('encodeBackupForm', () => {
  it('builds a Netlify form body with trimmed values', () => {
    const body = new URLSearchParams(
      encodeBackupForm({ name: ' Sara ', email: 'sara@example.com', details: ' Hello there! ' }, { channel: 'email', lang: 'ar' }),
    );
    expect(body.get('form-name')).toBe('contact');
    expect(body.get('name')).toBe('Sara');
    expect(body.get('details')).toBe('Hello there!');
    expect(body.get('channel')).toBe('email');
    expect(body.get('lang')).toBe('ar');
  });
});
