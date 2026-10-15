'use client';

import { type ReactNode, useEffect, useRef } from 'react';

const Reveal = ({
    children,
    className = '',
    delay = 0
}: {
    children: ReactNode;
    className?: string;
    delay?: number;
}) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        // Already in (or above) the viewport — show right away rather than waiting for the observer.
        if (el.getBoundingClientRect().top < window.innerHeight) {
            el.classList.add('is-visible');

            return;
        }
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('is-visible');
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );
        observer.observe(el);

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
            {children}
        </div>
    );
};

export default Reveal;
