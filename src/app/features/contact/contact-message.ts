import type { MessageKey } from '../../core/i18n/en';

export interface ContactValues {
  readonly name: string;
  readonly email: string;
  readonly details: string;
}

export type ContactErrors = Partial<Record<keyof ContactValues, MessageKey>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(values: ContactValues): ContactErrors {
  const errors: { -readonly [K in keyof ContactErrors]: ContactErrors[K] } = {};
  if (values.name.trim().length < 2) errors.name = 'contact.err.name';
  if (!EMAIL.test(values.email.trim())) errors.email = 'contact.err.email';
  if (values.details.trim().length < 10) errors.details = 'contact.err.details';
  return errors;
}

/** Replaces `{key}` placeholders; unknown keys are left as they are. */
export function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
}

export function buildContactMessage(values: ContactValues, greetingTemplate: string): string {
  const greeting = fill(greetingTemplate, {
    name: values.name.trim(),
    email: values.email.trim(),
  });
  return `${greeting}\n\n${values.details.trim()}`;
}

/** `application/x-www-form-urlencoded` body for the Netlify Forms backup copy of a message. */
export function encodeBackupForm(
  values: ContactValues,
  extra: { channel: 'whatsapp' | 'email'; lang: string },
): string {
  return new URLSearchParams({
    'form-name': 'contact',
    name: values.name.trim(),
    email: values.email.trim(),
    details: values.details.trim(),
    channel: extra.channel,
    lang: extra.lang,
  }).toString();
}
