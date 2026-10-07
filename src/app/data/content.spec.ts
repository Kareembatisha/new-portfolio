import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { SITE } from '../core/site.config';
import type { Localized } from '../models/localized';
import { CASE_STUDIES } from './case-studies';
import { EXPERIENCE } from './experience';
import { GALLERIES } from './gallery';
import { STATS, STEPS, STRENGTHS } from './home';
import { PROJECTS } from './projects';
import { SERVICES } from './services';

const filled = (text: Localized) => text.en.trim().length > 0 && text.ar.trim().length > 0;

describe('content data', () => {
  it('projects have unique slugs and both languages filled', () => {
    const slugs = PROJECTS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const p of PROJECTS) {
      expect(filled(p.category)).toBe(true);
      expect(filled(p.summary)).toBe(true);
      expect(p.stack.length).toBeGreaterThan(0);
    }
  });

  it('keeps AlSalam, E-Commerce and CleanTech as the featured trio, in that order', () => {
    const featured = PROJECTS.filter((p) => p.tier === 'featured').map((p) => p.slug);
    expect(featured).toEqual(['alsalam-international', 'e-commerce-platform', 'cleantech']);
  });

  it('every strength points to a real project title', () => {
    const titles = new Set(PROJECTS.map((p) => p.title.replace(' Corporate Website', ' Website')));
    for (const s of STRENGTHS) {
      for (const name of s.seenIn) expect(titles.has(name)).toBe(true);
    }
  });

  it('services, steps and experience are fully bilingual', () => {
    expect(SERVICES).toHaveLength(5);
    for (const s of SERVICES) expect(filled(s.title) && filled(s.summary)).toBe(true);
    for (const s of STEPS) expect(filled(s.title) && filled(s.text)).toBe(true);
    for (const e of EXPERIENCE) {
      expect(filled(e.period) && filled(e.role)).toBe(true);
      expect(e.highlights.every(filled)).toBe(true);
    }
  });

  it('every project has a fully bilingual case study, and every case study has a project', () => {
    const slugs = PROJECTS.map((p) => p.slug).sort();
    expect(Object.keys(CASE_STUDIES).sort()).toEqual(slugs);

    for (const study of Object.values(CASE_STUDIES)) {
      expect(filled(study.overview) && filled(study.role)).toBe(true);
      expect(study.features.length).toBeGreaterThan(0);
      expect(study.features.every(filled)).toBe(true);
      for (const item of [...(study.deepDive ?? []), ...(study.challenges ?? [])]) {
        expect(filled(item.title) && filled(item.text)).toBe(true);
      }
      for (const layer of study.architecture?.layers ?? []) {
        expect(filled(layer.name) && filled(layer.note)).toBe(true);
      }
    }
  });

  it('every image variant referenced by the site exists in public/', () => {
    const images = [
      SITE.portrait,
      ...PROJECTS.flatMap((p) => (p.cover ? [p.cover] : [])),
      ...Object.values(GALLERIES).flat(),
    ];
    for (const image of images) {
      expect([...image.widths]).toEqual([...image.widths].sort((a, b) => a - b));
      expect(image.width).toBe(Math.max(...image.widths));
      for (const w of image.widths) {
        for (const ext of ['avif', 'webp']) {
          const file = join(process.cwd(), 'public', `${image.src}-${w}.${ext}`);
          expect(existsSync(file), file).toBe(true);
        }
      }
    }
    for (const p of PROJECTS) {
      if (p.cover) expect(filled(p.cover.alt)).toBe(true);
    }
  });

  it('headline numbers stay tied to the real data', () => {
    // "5 projects" must match the portfolio's own list; update STATS if a project is added.
    const projects = STATS.find((s) => s.label.en === 'Projects delivered')!;
    expect(projects.value).toBe(PROJECTS.length);
    for (const stat of STATS) {
      expect(stat.value).toBeGreaterThan(0);
      expect(filled(stat.label) && filled(stat.source)).toBe(true);
    }
  });

  it('galleries belong to real projects and every item is described in both languages', () => {
    const slugs = new Set(PROJECTS.map((p) => p.slug));
    for (const [slug, items] of Object.entries(GALLERIES)) {
      expect(slugs.has(slug), slug).toBe(true);
      expect(new Set(items.map((i) => i.src)).size).toBe(items.length);
      for (const item of items) {
        expect(filled(item.alt) && filled(item.caption)).toBe(true);
        expect(item.alt.en.length).toBeGreaterThan(20);
      }
    }
    // Each case study attaches its own gallery.
    for (const slug of Object.keys(GALLERIES)) expect(CASE_STUDIES[slug].gallery).toBe(GALLERIES[slug]);
  });
});
