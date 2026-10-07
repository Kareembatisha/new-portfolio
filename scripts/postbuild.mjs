// Runs after `ng build` (via `npm run build`):
//  1. 404.html: the client-rendered shell, so hosts serve it for unknown URLs (the app shows the 404 page).
//  2. sitemap.xml + robots.txt, generated from the prerendered pages themselves, so the canonical and
//     hreflang tags written by PageHead are the single source of truth. noindex pages are left out.
//  3. A quality gate: every prerendered page must have a title, description, canonical, hreflang pair and one <h1>.
import { copyFileSync, existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, relative } from 'node:path';

// fileURLToPath (not URL.pathname) so the path is valid on Windows too.
const dist = fileURLToPath(new URL('../dist/portfolio/browser/', import.meta.url));

if (existsSync(join(dist, 'index.csr.html'))) {
  copyFileSync(join(dist, 'index.csr.html'), join(dist, '404.html'));
}

const pages = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full);
    else if (name === 'index.html' && dir !== dist) pages.push(full);
  }
})(dist);

const attr = (html, re) => re.exec(html)?.[1];
const problems = [];
const entries = [];

for (const file of pages.sort()) {
  const html = readFileSync(file, 'utf8');
  const where = '/' + relative(dist, file).split('\\').join('/');
  const title = attr(html, /<title>([^<]+)<\/title>/);
  const description = attr(html, /<meta name="description" content="([^"]*)"/);
  const canonical = attr(html, /<link rel="canonical" href="([^"]+)"/);
  const noindex = /<meta name="robots" content="noindex/.test(html);
  const alternates = [...html.matchAll(/<link[^>]*hreflang="([^"]+)"[^>]*href="([^"]+)"|<link[^>]*href="([^"]+)"[^>]*hreflang="([^"]+)"/g)].map(
    (m) => [m[1] ?? m[4], m[2] ?? m[3]],
  );
  const h1s = (html.match(/<h1[\s>]/g) ?? []).length;

  if (!title) problems.push(`${where}: missing <title>`);
  if (!description || description.length < 40 || description.length > 175)
    problems.push(`${where}: description missing or odd length (${description?.length ?? 0})`);
  if (!canonical) problems.push(`${where}: missing canonical`);
  if (alternates.length < 3) problems.push(`${where}: expected en, ar and x-default alternates, found ${alternates.length}`);
  if (h1s !== 1) problems.push(`${where}: expected exactly one <h1>, found ${h1s}`);
  if (canonical && !noindex) entries.push({ canonical, alternates });
}

if (entries.length) {
  const origin = new URL(entries[0].canonical).origin;
  if (origin === 'https://your-domain.com') {
    console.warn(
      'postbuild: WARNING canonical URLs still use the placeholder domain. Set SITE_URL, or deploy on Netlify (URL is set automatically).',
    );
  }
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...entries.map(
      ({ canonical, alternates }) =>
        `  <url>\n    <loc>${canonical}</loc>\n${alternates
          .map(([lang, href]) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${href}" />`)
          .join('\n')}\n  </url>`,
    ),
    '</urlset>',
    '',
  ].join('\n');
  writeFileSync(join(dist, 'sitemap.xml'), xml);
  writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
}

console.log(`postbuild: ${pages.length} pages checked, ${entries.length} in sitemap, 404.html written.`);
if (problems.length) {
  console.error('postbuild: problems found:\n  ' + problems.join('\n  '));
  process.exit(1);
}
