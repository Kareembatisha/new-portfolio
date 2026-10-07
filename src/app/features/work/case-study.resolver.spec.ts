import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, convertToParamMap, RedirectCommand } from '@angular/router';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';
import type { CaseStudyEntry } from '../../models/project';
import { caseStudyResolver } from './case-study.resolver';

function route(slug: string, lang = 'en'): ActivatedRouteSnapshot {
  return {
    paramMap: convertToParamMap({ slug }),
    parent: { paramMap: convertToParamMap({ lang }) },
  } as unknown as ActivatedRouteSnapshot;
}

describe('caseStudyResolver', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [provideRouter([])] }));

  it('returns the project and its case study for a known slug', async () => {
    const result = (await TestBed.runInInjectionContext(() =>
      caseStudyResolver(route('cleantech'), {} as never),
    )) as CaseStudyEntry;
    expect(result.project.title).toBe('CleanTech');
    expect(result.study.features.length).toBeGreaterThan(0);
  });

  it('redirects an unknown slug to the 404 page in the same language', async () => {
    const result = await TestBed.runInInjectionContext(() =>
      caseStudyResolver(route('nope', 'ar'), {} as never),
    );
    expect(result).toBeInstanceOf(RedirectCommand);
    expect((result as RedirectCommand).redirectTo.toString()).toBe('/ar/404');
  });
});
