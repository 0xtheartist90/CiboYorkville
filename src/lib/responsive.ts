import manifest from '@/lib/image-manifest.json';

type Entry = { w: number; h: number; variants: { src: string; w: number }[] };

const images = manifest as Record<string, Entry>;

// Maps an original /images/*.jpg path to its pre-generated WebP variants (see image-manifest.json),
// so the browser can pick the smallest file that is still sharp for the slot it fills.
export const responsive = (src: string) => {
    const entry = images[src];
    if (!entry) return { src, srcSet: undefined, full: src };
    const largest = entry.variants[entry.variants.length - 1].src;

    return {
        src: largest,
        srcSet: entry.variants.map((v) => `${v.src} ${v.w}w`).join(', '),
        full: largest
    };
};

// Width over height of an original, for laying photos out at their natural proportions.
export const aspect = (src: string) => {
    const entry = images[src];

    return entry ? entry.w / entry.h : 1;
};
