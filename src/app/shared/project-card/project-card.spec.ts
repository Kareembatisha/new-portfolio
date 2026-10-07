import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';
import { I18n } from '../../core/i18n/i18n.service';
import { PROJECTS } from '../../data/projects';
import type { Project } from '../../models/project';
import { ProjectCard } from './project-card';

describe('ProjectCard', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [provideRouter([])] }));

  function render(
    lang: 'en' | 'ar',
    variant: 'lead' | 'default' | 'compact' = 'default',
    project: Project = PROJECTS[0],
  ) {
    TestBed.inject(I18n).setLang(lang);
    const fixture = TestBed.createComponent(ProjectCard);
    fixture.componentRef.setInput('project', project);
    fixture.componentRef.setInput('variant', variant);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('links the title to the case study in the active language', () => {
    expect(render('en').querySelector('a')?.getAttribute('href')).toBe(
      '/en/work/alsalam-international',
    );
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    expect(render('ar').querySelector('a')?.getAttribute('href')).toBe(
      '/ar/work/alsalam-international',
    );
  });

  it('shows the screenshot when there is a cover, in AVIF and WebP with widths', () => {
    const root = render('en');
    expect(root.querySelector('.placeholder')).toBeNull();
    expect(root.querySelector('source[type="image/avif"]')?.getAttribute('srcset')).toContain(
      '/images/projects/alsalam-international-640.avif 640w',
    );
    const img = root.querySelector('img')!;
    expect(img.getAttribute('srcset')).toContain('-1600.webp 1600w');
    expect(img.getAttribute('loading')).toBe('lazy');
    expect(img.getAttribute('width')).toBe('1600');
    expect(img.alt.length).toBeGreaterThan(20);
  });

  it('shows a placeholder when there is no cover, and none for the compact variant', () => {
    const withoutCover: Project = { ...PROJECTS[0], cover: undefined };
    expect(render('en', 'default', withoutCover).querySelector('.placeholder')).not.toBeNull();
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    expect(render('en', 'compact').querySelector('app-project-media')).toBeNull();
  });
});
