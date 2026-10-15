'use client';

import { useState } from 'react';

import ResponsiveImg from '@/components/responsive-img';

type Room = { name: string; size: string; note: string; desc: string; src: string; alt: string };

// Rooms, capacities and photos from Cibo Yorkville's OpenTable private dining profile.
const ROOMS: Room[] = [
    {
        name: 'Florence',
        size: 'Up to 16 seated',
        note: 'Private room',
        desc: 'White-washed brick, crystal pendants and one long table, fully set up for audio and video.',
        src: '/images/room-florence.jpg',
        alt: 'The Florence private room with a long table under crystal pendant lights and white brick walls'
    },
    {
        name: 'Napoli',
        size: 'Up to 32 seated',
        note: 'Private room',
        desc: 'The largest private room, under the “Life is Beautiful” wall, with its own arched doors.',
        src: '/images/room-napoli.jpg',
        alt: 'The Napoli private room with long tables, an arched wooden door and the Life is Beautiful wall'
    },
    {
        name: 'Social Table',
        size: 'Up to 18 seated',
        note: 'Semi-private',
        desc: 'One long table on the lower level, looking up to the main floor and the bright front entrance.',
        src: '/images/room-social.jpg',
        alt: 'A long social table on the lower level beneath wooden beams and the open staircase'
    },
    {
        name: 'Lower Level Section',
        size: 'Up to 34 seated',
        note: 'Semi-private',
        desc: 'A rustic corner of the lower level with arched brick walls and low, warm light.',
        src: '/images/room-semi.jpg',
        alt: 'The semi-private lower level section with arched white brick walls and candlelit tables'
    },
    {
        name: 'Full Lower Level',
        size: '150 seated · 200 standing',
        note: 'Full buyout',
        desc: 'The whole lower level and its private rooms together, for galas, launches and cocktail receptions.',
        src: '/images/room-lower.jpg',
        alt: 'The full lower level dining room with long tables, a bar and brick walls'
    }
];

// Larger screens: the rooms stand side by side as tall photo panels and the one you hover or
// focus widens to show its details. Phones: a stack of cards, the tapped one opening up.
const RoomPanels = () => {
    const [active, setActive] = useState(0);

    return (
        <>
            <div className='hidden h-[560px] gap-2 md:flex lg:h-[620px]'>
                {ROOMS.map((room, i) => {
                    const open = i === active;

                    return (
                        <button
                            key={room.name}
                            type='button'
                            aria-expanded={open}
                            onMouseEnter={() => setActive(i)}
                            onFocus={() => setActive(i)}
                            onClick={() => setActive(i)}
                            className={`group relative min-w-0 overflow-hidden text-left transition-[flex-grow] duration-700 ease-[cubic-bezier(.2,.7,.2,1)] ${
                                open ? 'grow-[5]' : 'grow'
                            } basis-0`}>
                            <ResponsiveImg
                                src={room.src}
                                alt={room.alt}
                                sizes='60vw'
                                loading='lazy'
                                className='absolute inset-0 h-full w-full object-cover'
                            />
                            <div
                                className={`absolute inset-0 transition-colors duration-700 ${
                                    open
                                        ? 'bg-gradient-to-t from-[#17181a]/90 via-[#17181a]/20 to-transparent'
                                        : 'bg-[#17181a]/55 group-hover:bg-[#17181a]/40'
                                }`}
                            />
                            {/* Closed panels: the name runs up the side */}
                            <span
                                className={`font-display absolute bottom-6 left-1/2 origin-left -translate-x-1/2 text-2xl whitespace-nowrap text-[#f7f5f1] transition-opacity duration-300 [writing-mode:vertical-rl] rotate-180 ${
                                    open ? 'opacity-0' : 'opacity-100 delay-300'
                                }`}>
                                {room.name}
                            </span>
                            {/* Open panel: name, size and a line about the room */}
                            <div
                                className={`absolute inset-x-0 bottom-0 p-8 text-[#f7f5f1] transition-all duration-500 ${
                                    open ? 'translate-y-0 opacity-100 delay-300' : 'translate-y-4 opacity-0'
                                }`}>
                                <div className='eyebrow text-[#f2c46d]'>{room.note}</div>
                                <div className='font-display mt-2 text-5xl whitespace-nowrap lg:text-6xl'>{room.name}</div>
                                <div className='mt-1 text-lg font-bold'>{room.size}</div>
                                <p className='mt-3 max-w-md text-[0.95rem] leading-relaxed text-[#f7f5f1]/80'>
                                    {room.desc}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>

            <ul className='space-y-2 md:hidden'>
                {ROOMS.map((room, i) => {
                    const open = i === active;

                    return (
                        <li key={room.name} className='relative overflow-hidden bg-[#17181a]'>
                            <button
                                type='button'
                                aria-expanded={open}
                                onClick={() => setActive(i)}
                                className='relative block w-full text-left'>
                                <div
                                    className={`relative overflow-hidden transition-[height] duration-500 ${
                                        open ? 'h-72' : 'h-24'
                                    }`}>
                                    <ResponsiveImg
                                        src={room.src}
                                        alt={room.alt}
                                        sizes='100vw'
                                        loading='lazy'
                                        className='absolute inset-0 h-full w-full object-cover'
                                    />
                                    <div
                                        className={`absolute inset-0 ${
                                            open
                                                ? 'bg-gradient-to-t from-[#17181a]/95 via-[#17181a]/30 to-transparent'
                                                : 'bg-[#17181a]/60'
                                        }`}
                                    />
                                    <div className='absolute inset-x-0 bottom-0 p-5 text-[#f7f5f1]'>
                                        <div className='font-display text-[1.7rem] leading-none whitespace-nowrap'>
                                            {room.name}
                                        </div>
                                        <div className='mt-1.5 text-sm'>
                                            <span className='font-bold'>{room.size}</span>
                                            <span className='text-[#f2c46d]'> · {room.note}</span>
                                        </div>
                                    </div>
                                </div>
                            </button>
                            <div
                                className={`grid transition-[grid-template-rows] duration-500 ${
                                    open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                                }`}>
                                <p className='overflow-hidden px-5 text-[0.95rem] leading-relaxed text-[#f7f5f1]/75'>
                                    <span className='block pb-5'>{room.desc}</span>
                                </p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default RoomPanels;
