import type { Localized } from './localized';

export interface Service {
  readonly id: string;
  readonly title: Localized;
  readonly summary: Localized;
}

export interface Step {
  readonly title: Localized;
  readonly text: Localized;
}

export interface Strength {
  readonly title: Localized;
  readonly text: Localized;
  /** Project names that demonstrate it. */
  readonly seenIn: readonly string[];
}

export interface Experience {
  readonly period: Localized;
  readonly role: Localized;
  readonly company: string;
  readonly highlights: readonly Localized[];
}

export interface ServiceDetail {
  readonly id: string;
  readonly forWho: Localized;
  readonly included: readonly Localized[];
  readonly challenges: readonly Localized[];
  readonly stack: readonly string[];
  /** Project slugs. */
  readonly projects: readonly string[];
}

export interface SkillGroup {
  readonly title: Localized;
  readonly items: readonly string[];
}

export interface Education {
  readonly title: Localized;
  readonly institution: Localized;
  readonly period: Localized;
}

export interface Article {
  readonly slug: string;
  readonly title: Localized;
  /** ISO date (YYYY-MM-DD). */
  readonly date: string;
  readonly excerpt: Localized;
  /** One entry per paragraph. */
  readonly body: readonly Localized[];
}

export interface Stat {
  readonly value: number;
  /** Show a "+" after the number. */
  readonly plus?: boolean;
  readonly label: Localized;
  /** Where the figure comes from (project name). */
  readonly source: Localized;
}
