// Writes the site's public origin into src/app/core/site-url.ts so canonical URLs, hreflang, Open Graph
// tags and the sitemap use the real domain. Netlify sets `URL` automatically (custom domain if one is
// attached, otherwise the *.netlify.app address); set SITE_URL to override it.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const raw = process.env.SITE_URL || process.env.URL;
if (!raw) {
  console.warn('prebuild: SITE_URL / URL not set, keeping the placeholder domain.');
  process.exit(0);
}

let origin;
try {
  const url = new URL(raw);
  if (!/^https?:$/.test(url.protocol)) throw new Error('not http(s)');
  origin = url.origin;
} catch {
  console.error(`prebuild: invalid SITE_URL "${raw}"`);
  process.exit(1);
}

const file = fileURLToPath(new URL('../src/app/core/site-url.ts', import.meta.url));
writeFileSync(
  file,
  `// Overwritten at build time by scripts/prebuild.mjs when SITE_URL (or Netlify's URL) is set.\n` +
    `// Until a real domain exists this placeholder is used, and the build prints a warning.\n` +
    `export const SITE_URL = '${origin}';\n`,
);
console.log(`prebuild: site origin set to ${origin}`);
