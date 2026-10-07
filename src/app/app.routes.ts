import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, ResolveFn, Router, Routes } from '@angular/router';
import { DEFAULT_LANG, isLang } from './core/i18n/lang-url';
import { I18n } from './core/i18n/i18n.service';
import type { MessageKey } from './core/i18n/en';
import { articleResolver } from './features/articles/article.resolver';
import { caseStudyResolver } from './features/work/case-study.resolver';

/** Validates the `:lang` segment and applies it before anything renders. */
const langGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const lang = route.paramMap.get('lang');
  if (!isLang(lang)) {
    return inject(Router).createUrlTree(['/', DEFAULT_LANG, '404']);
  }
  inject(I18n).setLang(lang);
  return true;
};

const pageTitle =
  (key: MessageKey): ResolveFn<string> =>
  () =>
    inject(I18n).t(key);

// 'always' so the title is re-resolved when only the language changes.
const titled = (key: MessageKey, description: MessageKey, data: Record<string, unknown> = {}) => ({
  title: pageTitle(key),
  runGuardsAndResolvers: 'always' as const,
  data: { description, ...data },
});

export const routes: Routes = [
  { path: '', redirectTo: DEFAULT_LANG, pathMatch: 'full' },
  {
    path: ':lang',
    canActivate: [langGuard],
    loadComponent: () => import('./layout/shell/shell').then((m) => m.Shell),
    children: [
      {
        path: '',
        ...titled('page.home', 'seo.home'),
        loadComponent: () => import('./features/home/home-page').then((m) => m.HomePage),
      },
      {
        path: 'work',
        children: [
          {
            path: '',
            ...titled('page.work', 'seo.work'),
            loadComponent: () => import('./features/work/work-page').then((m) => m.WorkPage),
          },
          {
            path: ':slug',
            title: (async (route) => {
              const { PROJECTS } = await import('./data/projects');
              return PROJECTS.find((p) => p.slug === route.paramMap.get('slug'))?.title ?? '';
            }) satisfies ResolveFn<string>,
            runGuardsAndResolvers: 'always',
            resolve: { entry: caseStudyResolver },
            loadComponent: () =>
              import('./features/work/case-study/case-study-page').then((m) => m.CaseStudyPage),
          },
        ],
      },
      {
        path: 'services',
        ...titled('page.services', 'seo.services'),
        loadComponent: () =>
          import('./features/services/services-page').then((m) => m.ServicesPage),
      },
      {
        path: 'about',
        ...titled('page.about', 'seo.about'),
        loadComponent: () => import('./features/about/about-page').then((m) => m.AboutPage),
      },
      {
        path: 'contact',
        ...titled('page.contact', 'seo.contact'),
        loadComponent: () =>
          import('./features/contact/contact-page').then((m) => m.ContactPage),
      },
      {
        path: 'articles',
        children: [
          {
            path: '',
            // noindex while there are no articles (guarded by a test); remove it with the first article.
            ...titled('page.articles', 'seo.articles', { noindex: true }),
            loadComponent: () =>
              import('./features/articles/articles-page').then((m) => m.ArticlesPage),
          },
          {
            path: ':slug',
            title: (async (route) => {
              const i18n = inject(I18n); // must run before the first await
              const { ARTICLES } = await import('./data/articles');
              const article = ARTICLES.find((a) => a.slug === route.paramMap.get('slug'));
              return article ? i18n.l(article.title) : '';
            }) satisfies ResolveFn<string>,
            runGuardsAndResolvers: 'always',
            resolve: { article: articleResolver },
            loadComponent: () =>
              import('./features/articles/article-page').then((m) => m.ArticlePage),
          },
        ],
      },
      {
        path: '**',
        ...titled('page.notFound', 'seo.notFound', { noindex: true }),
        loadComponent: () =>
          import('./features/not-found/not-found-page').then((m) => m.NotFoundPage),
      },
    ],
  },
];
