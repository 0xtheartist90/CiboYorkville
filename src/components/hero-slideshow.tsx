'use client';

import { useEffect, useState } from 'react';

import ResponsiveImg from '@/components/responsive-img';

// Three views of the Yorkville room: the wine wall bar, the glass-walled dining room and the
// open kitchen under the lit CIBO letters.
const SLIDES = [
    {
        src: '/images/wine-bar.jpg',
        alt: 'The bar at Cibo Yorkville with a lit wall of wine bottles and white leather stools',
        position: 'object-[60%_50%]'
    },
    {
        src: '/images/glass-room.jpg',
        alt: 'The dining room at Cibo Yorkville with leather banquettes behind glass and steel',
        position: 'object-[50%_50%]'
    },
    {
        src: '/images/open-kitchen.jpg',
        alt: 'The open kitchen and pizza oven under the lit CIBO letters, with candlelit tables in front',
        position: 'object-[50%_40%]'
    }
];

const INTERVAL = 6000;
const ON = {
    transitionProperty: 'opacity, transform',
    transitionDuration: '1600ms, 9000ms',
    transitionTimingFunction: 'ease-in-out, cubic-bezier(.2,.6,.3,1)'
};

// The incoming photo fades in on top while the outgoing one stays fully visible underneath, so
// the dark background never shows through mid-fade. Each photo slowly pushes in while it shows.
// Stays on the first photo when the visitor prefers reduced motion.
const HeroSlideshow = () => {
    const [{ active, previous }, setSlides] = useState({ active: 0, previous: -1 });

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const timer = window.setInterval(
            () => setSlides(({ active: current }) => ({ active: (current + 1) % SLIDES.length, previous: current })),
            INTERVAL
        );

        return () => window.clearInterval(timer);
    }, []);

    // Its own stacking layer, so the photos' z-order never lifts them above the hero copy.
    return (
        <div className='absolute inset-0 isolate'>
            {SLIDES.map((slide, i) => {
                const isActive = i === active;
                const isPrevious = i === previous;

                return (
                    <ResponsiveImg
                        key={slide.src}
                        src={slide.src}
                        sizes='100vw'
                        alt={isActive ? slide.alt : ''}
                        aria-hidden={!isActive}
                        fetchPriority={i === 0 ? 'high' : 'low'}
                        className={`absolute inset-0 h-full w-full object-cover ${slide.position}`}
                        style={
                            isActive
                                ? // On top: fade in over 1.6s while easing out of the zoom for 9s
                                  { ...ON, zIndex: 2, opacity: 1, transform: 'scale(1)' }
                                : isPrevious
                                  ? // Underneath and fully visible until the new photo covers it
                                    { ...ON, zIndex: 1, opacity: 1, transform: 'scale(1)' }
                                  : // Hidden: reset to the zoomed-in start without animating
                                    { zIndex: 0, opacity: 0, transform: 'scale(1.06)', transitionProperty: 'none' }
                        }
                    />
                );
            })}
        </div>
    );
};

export default HeroSlideshow;
