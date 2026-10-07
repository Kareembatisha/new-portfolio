import { RenderMode, ServerRoute } from '@angular/ssr';
import { LANGS } from './core/i18n/lang-url';
import { PAGE_PATHS } from './core/navigation';
import { ARTICLES } from './data/articles';
import { PROJECTS } from './data/projects';

const langParams = async () => LANGS.map((lang) => ({ lang }));

export const serverRoutes: ServerRoute[] = [
  { path: ':lang', renderMode: RenderMode.Prerender, getPrerenderParams: langParams },
  ...PAGE_PATHS.map(
    (page): ServerRoute => ({
      path: `:lang/${page}`,
      renderMode: RenderMode.Prerender,
      getPrerenderParams: langParams,
    }),
  ),
  {
    path: ':lang/work/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () =>
      LANGS.flatMap((lang) => PROJECTS.map((project) => ({ lang, slug: project.slug }))),
  },
  {
    path: ':lang/articles/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () =>
      LANGS.flatMap((lang) => ARTICLES.map((article) => ({ lang, slug: article.slug }))),
  },
  // Anything else (unknown URLs, the 404 page) is rendered on the client.
  { path: '**', renderMode: RenderMode.Client },
];
