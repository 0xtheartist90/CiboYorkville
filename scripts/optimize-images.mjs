// Turns every raw-assets/images/*.jpg into small and large WebP variants in public/images and
// records their sizes in src/lib/image-manifest.json, which src/lib/responsive.ts reads.
import { readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

import sharp from 'sharp';

const SRC = 'raw-assets/images';
const OUT = 'public/images';
const WIDTHS = [800, 1800];

const manifest = {};
const files = (await readdir(SRC)).filter((f) => f.endsWith('.jpg')).sort();

for (const file of files) {
    const name = path.basename(file, '.jpg');
    const input = sharp(path.join(SRC, file)).rotate();
    const { width, height } = await input.metadata();
    const variants = [];
    for (const [i, target] of WIDTHS.entries()) {
        const w = Math.min(target, width);
        // Skip a large variant that would be no larger than the small one.
        if (i > 0 && w <= variants[variants.length - 1].w) continue;
        const out = `${name}-${i === 0 ? 'sm' : 'lg'}.webp`;
        await input.clone().resize({ width: w }).webp({ quality: 78 }).toFile(path.join(OUT, out));
        variants.push({ src: `/images/${out}`, w });
    }
    manifest[`/images/${name}.jpg`] = { w: width, h: height, variants };
    console.log(name, `${width}x${height}`, variants.map((v) => v.w).join(', '));
}

// Social share image
await sharp(path.join(SRC, 'wine-bar.jpg')).resize(1200, 630).jpeg({ quality: 82 }).toFile('public/og.jpg');

await writeFile('src/lib/image-manifest.json', JSON.stringify(manifest, null, 1) + '\n');
