'use client';

import { useEffect, useState } from 'react';

import { responsive } from '@/lib/responsive';

import { createPortal } from 'react-dom';

const LightboxImage = ({
    src,
    alt,
    sizes = '(max-width: 767px) 100vw, 50vw',
    loading = 'lazy',
    className = ''
}: {
    src: string;
    alt: string;
    /** How wide the thumbnail renders, so the browser can pick the right WebP variant. */
    sizes?: string;
    loading?: 'lazy' | 'eager';
    className?: string;
}) => {
    const [open, setOpen] = useState(false);
    const image = responsive(src);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
        document.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [open]);

    return (
        <>
            <img
                src={image.src}
                srcSet={image.srcSet}
                sizes={sizes}
                alt={alt}
                loading={loading}
                decoding='async'
                className={`cursor-zoom-in ${className}`}
                onClick={() => setOpen(true)}
            />
            {open &&
                createPortal(
                    <div
                        role='dialog'
                        aria-modal='true'
                        aria-label={alt}
                        className='fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black'
                        onClick={() => setOpen(false)}>
                        <img src={image.full} alt={alt} className='h-full w-full object-contain' />
                        <button
                            aria-label='Close'
                            onClick={() => setOpen(false)}
                            className='absolute top-4 right-6 text-4xl leading-none font-light text-white/70 transition-colors hover:text-white'>
                            ×
                        </button>
                    </div>,
                    document.body
                )}
        </>
    );
};

export default LightboxImage;
