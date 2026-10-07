import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { DEFAULT_LANG } from '../../core/i18n/lang-url';
import type { CaseStudyEntry } from '../../models/project';

/**
 * Finds the project for `:slug`; unknown slugs go to the 404 page in the current language.
 * The content files are imported lazily so they stay out of the initial bundle.
 */
export const caseStudyResolver: ResolveFn<CaseStudyEntry> = async (route) => {
  const router = inject(Router); // must run before the first await
  const slug = route.paramMap.get('slug');
  const [{ PROJECTS }, { CASE_STUDIES }] = await Promise.all([
    import('../../data/projects'),
    import('../../data/case-studies'),
  ]);

  const project = PROJECTS.find((p) => p.slug === slug);
  const study = project && CASE_STUDIES[project.slug];
  if (project && study) return { project, study };

  const lang = route.parent?.paramMap.get('lang') ?? DEFAULT_LANG;
  return new RedirectCommand(router.parseUrl(`/${lang}/404`));
};
