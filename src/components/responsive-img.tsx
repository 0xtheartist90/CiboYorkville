import type { ImgHTMLAttributes } from 'react';

import { responsive } from '@/lib/responsive';

// Plain <img> that serves the pre-generated WebP variants of an /images/*.jpg original.
const ResponsiveImg = ({ src, sizes = '100vw', ...rest }: ImgHTMLAttributes<HTMLImageElement> & { src: string }) => {
    const image = responsive(src);

    return <img src={image.src} srcSet={image.srcSet} sizes={sizes} decoding='async' {...rest} />;
};

export default ResponsiveImg;
