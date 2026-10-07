// Turns the original images in assets-src/ into responsive AVIF + WebP files in public/images/.
//   npm run images
// To add a screenshot: drop it into assets-src/, add a line to GALLERY (or an entry to IMAGES for a cover),
// run the script. It also writes src/app/data/image-manifest.ts (sizes of every output) which the
// gallery data reads, so no dimensions are typed by hand.
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import sharp from 'sharp';

const root = fileURLToPath(new URL('..', import.meta.url));
const IMAGES = [
  // Portrait: 3:4 original cropped to the 4:5 frame used in the hero.
  { input: 'portrait.jpg', out: 'portrait', widths: [384, 768, 960], aspect: [4, 5] },
  // Screenshots: edges trimmed to remove scrollbars and browser chrome artefacts.
  { input: 'alsalam-international.webp', out: 'projects/alsalam-international', widths: [640, 1024, 1600], crop: { top: 2, right: 20, bottom: 4 } },
  { input: 'e-commerce-platform.webp', out: 'projects/e-commerce-platform', widths: [640, 1024, 1600], crop: { top: 2, right: 20, bottom: 4 } },
  { input: 'medgate.webp', out: 'projects/medgate', widths: [640, 1024, 1600], crop: { top: 2, right: 20, bottom: 4 } },
  // Login screen. A real email address was visible in the field, so that area (source pixels) is blurred.
  {
    input: 'cleantech.webp',
    out: 'projects/cleantech',
    widths: [640, 1024, 1600],
    blur: [{ left: 225, top: 1330, width: 850, height: 95 }],
  },
  // The bottom 28px held a browser status-bar tooltip.
  { input: 'ai-cloud-website.webp', out: 'projects/ai-cloud-website', widths: [640, 1024, 1600], crop: { top: 2, right: 20, bottom: 28 } },
];


// Gallery screenshots. `crop` removes scrollbars and edge lines (px per side). `blur` redacts areas of
// the SOURCE image (left, top, width, height) before anything is resized.
const edge = { top: 2, right: 0, bottom: 0, left: 0 };
const GALLERY = [
  // AlSalam International
  ['alsalam-international-shipments', { ...edge, right: 10 }],
  ['alsalam-international-shipment-details', { ...edge, right: 10 }],
  ['alsalam-international-product-details', { ...edge, right: 10 }],
  ['alsalam-international-dashboard-arabic', { ...edge, left: 12 }], // RTL: the scrollbar sits on the left
  // E-Commerce storefront
  ['e-commerce-platform-products', edge],
  ['e-commerce-platform-product-details', edge],
  ['e-commerce-platform-checkout', edge],
  ['e-commerce-platform-home-arabic', edge],
  // E-Commerce admin dashboard
  ['e-commerce-platform-admin-sales-report', { ...edge, right: 12 }],
  [
    'e-commerce-platform-admin-orders',
    { ...edge, right: 12 },
    // The customer column showed a real name and ID number.
    [{ left: 676, top: 525, width: 135, height: 345 }],
  ],
  ['e-commerce-platform-admin-products', edge],
  ['e-commerce-platform-admin-banners', edge],
  ['e-commerce-platform-admin-roles', edge],
  ['e-commerce-platform-admin-sales-charts', { ...edge, right: 12 }],
  // MedGate
  ['medgate-why-medgate', edge],
  ['medgate-home-chinese', { ...edge, right: 22 }],
  ['medgate-faqs', { ...edge, right: 22, bottom: 28 }], // bottom 28px: browser status-bar link tooltip
  ['medgate-contact', { ...edge, right: 22 }],
  // AI Cloud website
  ['ai-cloud-website-services', { ...edge, right: 14 }],
  ['ai-cloud-website-home-arabic', { ...edge, right: 14 }],
];
for (const [name, crop, blur] of GALLERY) {
  IMAGES.push({
    input: `${name}.webp`,
    out: `projects/${name}`,
    widths: [640, 1024, 1600],
    crop,
    ...(blur ? { blur } : {}),
  });
}

const manifest = {};

mkdirSync(join(root, 'public/images/projects'), { recursive: true });

for (const { input, out, widths, crop, aspect, blur } of IMAGES) {
  let base = sharp(join(root, 'assets-src', input));
  const meta = await base.metadata();
  let { width, height } = meta;

  // Redact first, at full resolution, so no readable trace survives downscaling.
  if (blur) {
    const patches = [];
    for (const region of blur) {
      const input = await base.clone().extract(region).blur(18).toBuffer();
      patches.push({ input, left: region.left, top: region.top });
    }
    base = sharp(await base.composite(patches).toBuffer());
  }

  if (crop) {
    const region = {
      left: crop.left ?? 0,
      top: crop.top,
      width: width - crop.right - (crop.left ?? 0),
      height: height - crop.top - crop.bottom,
    };
    base = sharp(await base.extract(region).toBuffer());
    ({ width, height } = region);
  } else if (aspect) {
    const targetHeight = Math.round((width * aspect[1]) / aspect[0]);
    height = Math.min(height, targetHeight);
    base = sharp(await base.extract({ left: 0, top: 0, width, height }).toBuffer());
  }

  const largest = Math.min(Math.max(...widths), width);
  const sizes = widths.map((w) => Math.min(w, width));
  for (const w of new Set(sizes)) {
    const avifFile = join(root, `public/images/${out}-${w}.avif`);
    const webpFile = join(root, `public/images/${out}-${w}.webp`);
    // Incremental: existing outputs are kept unless the source changed (run with FORCE=1 to rebuild all).
    if (!process.env.FORCE && existsSync(avifFile) && existsSync(webpFile)) continue;
    const resized = sharp(await base.clone().resize({ width: w }).toBuffer());
    await Promise.all([
      resized.clone().avif({ quality: 55, effort: 4 }).toFile(avifFile),
      resized.clone().webp({ quality: 78, effort: 5 }).toFile(webpFile),
    ]);
  }
  const h = Math.round((height / width) * largest);
  manifest[`/images/${out}`] = { widths: [...new Set(sizes)], width: largest, height: h };
  console.log(`${out}: widths [${[...new Set(sizes)].join(', ')}], intrinsic ${largest}x${h}`);
}

writeFileSync(
  join(root, 'src/app/data/image-manifest.ts'),
  `// Generated by scripts/optimize-images.mjs. Do not edit.\nexport const IMAGE_MANIFEST: Readonly<Record<string, { widths: readonly number[]; width: number; height: number }>> = ${JSON.stringify(manifest, null, 2)};\n`,
);
