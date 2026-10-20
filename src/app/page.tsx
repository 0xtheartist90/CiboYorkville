import type { CSSProperties } from 'react';

import CiboLogo from '@/components/cibo-logo';
import FoodMarquee from '@/components/food-marquee';
import HeroSlideshow from '@/components/hero-slideshow';
import LightboxImage from '@/components/lightbox-image';
import MenuTabs from '@/components/menu-tabs';
import OpenTableWidget from '@/components/opentable-widget';
import ResponsiveImg from '@/components/responsive-img';
import Reveal from '@/components/reveal';
import RoomPanels from '@/components/room-panels';
import { aspect } from '@/lib/responsive';

const PHONE_HREF = 'tel:+14169252143';
const PHONE_LABEL = '416.925.2143';
// Extension 2 reaches the private events team directly.
const EVENTS_PHONE_HREF = 'tel:+14169252143,2';
const EVENTS_FORM_HREF = 'https://libertygroup.com/book-event';
const GIFT_CARD_HREF = 'https://liberty-entertainment-group.vouchercart.com/33476/cibo-wine-bar-gift-card';
const MAPS_HREF = 'https://www.google.com/maps/search/?api=1&query=Cibo+Wine+Bar+133+Yorkville+Ave+Toronto';

// Restaurant details for search results: address, phone, hours and reservations.
const JSON_LD = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'Cibo Wine Bar Yorkville',
    image: '/og.jpg',
    telephone: '+1-416-925-2143',
    servesCuisine: ['Italian', 'Wine Bar'],
    priceRange: '$$',
    acceptsReservations: true,
    address: {
        '@type': 'PostalAddress',
        streetAddress: '133 Yorkville Ave',
        postalCode: 'M5R 1C4',
        addressLocality: 'Toronto',
        addressRegion: 'ON',
        addressCountry: 'CA'
    },
    openingHoursSpecification: [
        {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday'],
            opens: '11:30',
            closes: '24:00'
        },
        {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Thursday', 'Friday'],
            opens: '11:30',
            closes: '01:00'
        },
        { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '11:00', closes: '01:00' },
        { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '11:00', closes: '24:00' }
    ],
    sameAs: ['https://www.instagram.com/cibo_winebar/']
};

// The week at Cibo Yorkville, one offer per line.
const WEEK = [
    { when: 'Monday to Friday · 11:30am to 3pm', title: 'Lunch in Fretta', text: 'Two courses for $25.' },
    { when: 'Tuesday · All day', title: 'Half-Price Pizza', text: 'Every pizza on the menu at 50% off.' },
    { when: 'Wednesday · All day', title: '$15 Pasta', text: 'Settebello: seven signature pastas, $15 each.' },
    {
        when: 'Thursday & Friday · 2 to 6:30pm',
        title: 'Cibo Sociale',
        text: 'Every drink half price, $8 antipasti and $12 pizza.',
        highlight: true
    },
    {
        when: 'Thursday to Saturday · From 10pm',
        title: 'Late Happy Hour',
        text: 'Drink specials at the bar until 1am.'
    },
    { when: 'Saturday & Sunday · 11am to 3pm', title: 'Brunch', text: 'Weekend brunch from the open kitchen.' }
];

// Two rows of plates. Each photo grows in proportion to its width, so every row fills the line
// at one height and nothing is cropped.
const PLATE_ROWS = [
    [
        {
            src: '/images/pasta-gnocchi.jpg',
            caption: 'Gnocchi',
            alt: 'House-made gnocchi with basil beside fresh pasta'
        },
        {
            src: '/images/prosciutto-pizza.jpg',
            caption: 'Di Nicolino',
            alt: 'A slice of pizza with prosciutto di Parma and arugula lifted from the plate'
        },
        {
            src: '/images/salmon-rose.jpg',
            caption: 'Salmone Fresco',
            alt: 'Grilled Atlantic salmon with asparagus and fennel orange salad beside a glass of rosé'
        }
    ],
    [
        {
            src: '/images/pizza-yolk.jpg',
            caption: 'Pizza',
            alt: 'Blistered pizza with yellow cherry tomatoes, greens and shaved parmigiano'
        },
        {
            src: '/images/pappardelle-spread.jpg',
            caption: 'Pappardelle',
            alt: 'Pappardelle in lamb ragu with basil and pecorino, with plates to share around it'
        },
        {
            src: '/images/open-kitchen.jpg',
            caption: 'The Open Kitchen',
            alt: 'The open kitchen and pizza oven under the lit CIBO letters, with candlelit tables in front'
        }
    ]
];

const GLASSES = [
    { name: 'Prosecco, Villa Sandi', price: '12' },
    { name: 'Gavi, Bersano', price: '14' },
    { name: 'Super Tuscan, Villa Pillo', price: '14' },
    { name: 'Chianti Classico', price: '15' },
    { name: 'Amarone della Valpolicella', price: '18' },
    { name: 'Barolo, Tenuta di Martucino', price: '22' }
];

// The new site's ornament: a hairline between two small rings
const Ornament = ({ className = '' }: { className?: string }) => (
    <div className={`flex items-center ${className}`} aria-hidden='true'>
        <span className='h-[7px] w-[7px] shrink-0 rounded-full border border-current' />
        <span className='h-px min-w-6 flex-1 bg-current' />
        <span className='h-[7px] w-[7px] shrink-0 rounded-full border border-current' />
    </div>
);

const CallButton = ({
    label = 'Call to Reserve',
    variant = 'red',
    className = ''
}: {
    label?: string;
    variant?: 'red' | 'light';
    className?: string;
}) => (
    <a href={PHONE_HREF} className={`${variant === 'light' ? 'btn-cibo-light' : 'btn-cibo'} px-8 py-4 ${className}`}>
        {label}
    </a>
);

const Page = () => {
    return (
        <main>
            <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />

            {/* ── Navigation, after the new site: Book a Table left, the red wordmark centred with YORKVILLE
                 beneath it, Call to Reserve right, joined by ring-and-hairline ornaments. Phones keep the
                 wordmark left and the call right. ── */}
            <nav className='fixed top-0 z-50 w-full border-b border-[#3e1c1c]/10 bg-[#f6efef]/95 backdrop-blur'>
                <div className='grid h-16 grid-cols-[auto_1fr_auto] items-center gap-4 px-5 md:h-[72px] md:grid-cols-[1fr_auto_1fr] md:gap-6 md:px-8'>
                    <div className='hidden items-center gap-5 md:flex'>
                        <a
                            href='#reserve'
                            className='shrink-0 text-xs font-semibold tracking-[0.2em] text-[#3e1c1c] uppercase transition-colors hover:text-[#cf2327]'>
                            Book a Table
                        </a>
                        <Ornament className='flex-1 text-[#3e1c1c]/25' />
                    </div>
                    <a
                        href='#top'
                        className='flex flex-col items-center justify-self-start md:justify-self-center'
                        aria-label='Cibo Wine Bar Yorkville, back to top'>
                        <CiboLogo title='' className='h-8 w-auto text-[#cf2327] md:h-9' />
                        <span className='mt-1 pl-[0.45em] text-[0.55rem] font-medium tracking-[0.45em] text-[#3e1c1c]/70 uppercase'>
                            Yorkville
                        </span>
                    </a>
                    <div className='flex items-center justify-end gap-5'>
                        <Ornament className='hidden flex-1 text-[#3e1c1c]/25 md:flex' />
                        <a href={PHONE_HREF} className='btn-cibo shrink-0 px-5 py-3 md:px-6'>
                            Call to Reserve
                        </a>
                    </div>
                </div>
            </nav>

            {/* ── Hero: three views of the room crossfading full-bleed under a warm brown wash, the wordmark
                 and one line low on the left, and a rounded booking bar floating over the bottom edge.
                 Phones get the bar below the photos. ── */}
            <section id='top' className='relative z-20 mt-16 md:mt-[72px] lg:h-[calc(100svh-72px)] lg:min-h-[700px]'>
                <div className='relative h-[64svh] min-h-[440px] overflow-hidden bg-[#2a1212] lg:absolute lg:inset-0 lg:h-auto'>
                    <HeroSlideshow />
                    <div className='absolute inset-0 bg-gradient-to-t from-[#2a1212]/90 via-[#2a1212]/45 to-[#2a1212]/10 lg:bg-gradient-to-r lg:from-[#2a1212]/80 lg:via-[#2a1212]/30 lg:to-transparent' />
                    <div className='absolute inset-x-0 bottom-0 hidden h-64 bg-gradient-to-t from-[#2a1212]/70 to-transparent lg:block' />

                    <div className='hero-in absolute inset-x-0 bottom-0 px-6 pb-10 text-[#f6efef] lg:bottom-48 lg:px-20'>
                        <h1>
                            <span className='sr-only'>
                                Cibo Wine Bar Yorkville: Italian restaurant and wine bar in Toronto
                            </span>
                            {/* The wordmark is already in the nav on phones, so it only shows here on larger screens */}
                            <CiboLogo title='' className='hidden w-40 text-[#f6efef] md:block' />
                        </h1>
                        <p className='font-display text-[3.6rem] leading-[0.9] md:mt-6 md:text-[6.5rem]'>
                            Big, bold
                            <br />
                            Italian
                        </p>
                        <Ornament className='mt-7 w-40 opacity-40' />
                        <div className='mt-7 flex flex-wrap items-center gap-x-6 gap-y-4'>
                            <CallButton />
                            <span className='eyebrow text-[#f6efef]/85'>133 Yorkville Ave</span>
                        </div>
                    </div>
                </div>

                {/* The booking bar: OpenTable's wide, horizontal widget on large screens. The hero sits above the next
                     section so the widget's date and time dropdowns open over it instead of under it. */}
                <div className='hero-in-late relative z-10 border-b border-[#3e1c1c]/10 bg-[#ece8e8] px-6 py-7 lg:absolute lg:bottom-12 lg:left-20 lg:w-fit lg:rounded-[17px] xl:flex xl:items-center xl:gap-10 lg:border-0 lg:bg-[#f6efef] lg:px-10 lg:py-6 lg:shadow-[0_30px_80px_-30px_rgba(42,18,18,0.7)]'>
                    <div className='flex items-baseline justify-between gap-6 xl:block xl:shrink-0 xl:border-r xl:border-[#3e1c1c]/15 xl:pr-10'>
                        <div className='font-display text-2xl leading-none whitespace-nowrap text-[#3e1c1c] md:text-3xl'>
                            Book a Table
                        </div>
                        <div className='eyebrow whitespace-nowrap text-[#cf2327] xl:mt-2'>Open 7 days</div>
                    </div>
                    <OpenTableWidget className='mt-5 flex w-full justify-center lg:justify-start xl:mt-0' />
                </div>
            </section>

            {/* ── Every week: the week's offers as one clean list, heading and a rounded photo alongside ── */}
            <section id='week' className='glow-top px-6 pt-24 pb-20 md:px-12 md:pt-36 md:pb-28'>
                <div className='mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16'>
                    <Reveal className='md:sticky md:top-28 md:self-start'>
                        <h2 className='font-display text-5xl leading-[0.95] text-[#cf2327] md:text-7xl'>
                            Every week
                            <br />
                            at Cibo
                        </h2>
                        <div className='mt-8 aspect-[4/5] overflow-hidden rounded-[17px]'>
                            <LightboxImage
                                src='/images/table-toast.jpg'
                                sizes='(max-width: 767px) 100vw, 40vw'
                                alt='Glasses raised over a table of pizza, pasta and plates to share'
                                className='h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]'
                            />
                        </div>
                        <CallButton className='mt-8 hidden md:inline-flex' />
                    </Reveal>

                    <Reveal>
                        <ul className='border-t border-[#3e1c1c]/20'>
                            {WEEK.map((item) => (
                                <li
                                    key={item.title}
                                    className='grid gap-1 border-b border-[#3e1c1c]/20 py-6 md:grid-cols-[1fr_auto] md:items-baseline md:gap-8'>
                                    <div>
                                        <h3
                                            className={`font-display text-3xl leading-none md:text-4xl ${
                                                item.highlight ? 'text-[#cf2327]' : ''
                                            }`}>
                                            {item.title}
                                        </h3>
                                        <p className='mt-2 text-[#3e1c1c]/70'>{item.text}</p>
                                    </div>
                                    <div className='eyebrow order-first text-[0.65rem] text-[#3e1c1c]/55 md:order-none md:text-right'>
                                        {item.when}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                </div>
            </section>

            {/* ── The wine room: deep brown, the 2,500 set large, the wall beside it in a rounded frame ── */}
            <section id='wine' className='overflow-hidden bg-[#2a1212] text-[#f6efef]'>
                <div className='grid md:grid-cols-2'>
                    <div className='relative min-h-[380px] md:order-2 md:min-h-[720px] md:p-4 md:pl-0'>
                        <div className='absolute inset-0 overflow-hidden md:inset-4 md:left-0 md:rounded-[17px]'>
                            <LightboxImage
                                src='/images/wine-dispensers.jpg'
                                sizes='(max-width: 767px) 100vw, 50vw'
                                alt='The wine room at Cibo Yorkville: floor-to-ceiling bottles above a row of wine dispensers and the bar'
                                className='h-full w-full object-cover'
                            />
                        </div>
                    </div>
                    <Reveal className='px-6 py-16 md:order-1 md:px-14 md:py-24 lg:px-20'>
                        <div className='font-display text-[7.5rem] leading-[0.85] text-[#f3c2b4] md:text-[11rem]'>
                            2,500
                        </div>
                        <div className='font-display mt-5 text-3xl md:mt-7 md:text-4xl'>Bottles on the wall</div>
                        <Ornament className='mt-7 w-40 opacity-30' />
                        <p className='mt-7 max-w-md leading-relaxed text-[#f6efef]/75 md:text-lg'>
                            A soaring glass wine room runs the length of the bar, stocked from the Alps to Sicily.
                            Twenty-four wines are poured by the glass, all half price at Cibo Sociale on Thursday and
                            Friday afternoons.
                        </p>
                        <ul className='mt-10 max-w-md border-t border-[#f6efef]/15'>
                            {GLASSES.map((glass) => (
                                <li
                                    key={glass.name}
                                    className='flex items-baseline justify-between gap-4 border-b border-[#f6efef]/15 py-3'>
                                    <span className='text-[#f6efef]/85'>{glass.name}</span>
                                    <span className='font-display text-2xl text-[#f3c2b4]'>{glass.price}</span>
                                </li>
                            ))}
                        </ul>
                        <p className='mt-3 text-xs tracking-wide text-[#f6efef]/45'>Per 5oz glass.</p>
                    </Reveal>
                </div>
            </section>

            {/* ── The open kitchen: copy, then rounded plates in justified rows at their own proportions ── */}
            <section id='food' className='px-4 py-20 md:px-8 md:py-28'>
                <Reveal className='mx-auto grid max-w-6xl gap-6 px-2 md:grid-cols-2 md:items-end md:px-4'>
                    <h2 className='font-display text-5xl leading-[0.95] text-[#cf2327] md:text-7xl'>
                        Made in front
                        <br />
                        of you
                    </h2>
                    <p className='leading-relaxed text-[#3e1c1c]/75 md:text-lg'>
                        Southern Italian cooking from an open kitchen counter: pasta fresca rolled in house, pizza from
                        the oven and plates made to pass around the table.
                    </p>
                </Reveal>

                {/* Phones: one swipeable strip at a fixed height. Larger screens: two rows. */}
                <Reveal className='mx-auto mt-12 max-w-7xl'>
                    <div className='-mx-4 flex snap-x scroll-px-4 gap-3 overflow-x-auto px-4 [scrollbar-width:none] md:mx-0 md:block md:space-y-3 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden'>
                        {PLATE_ROWS.map((row, r) => (
                            <div key={r} className='contents md:flex md:gap-3'>
                                {row.map((plate) => (
                                    <figure
                                        key={plate.src}
                                        className='relative h-[62vw] w-[calc(62vw*var(--r))] shrink-0 snap-start overflow-hidden rounded-[17px] md:h-auto md:w-auto md:min-w-0 md:shrink md:basis-0'
                                        style={
                                            {
                                                '--r': aspect(plate.src),
                                                aspectRatio: aspect(plate.src),
                                                flexGrow: aspect(plate.src)
                                            } as CSSProperties
                                        }>
                                        <LightboxImage
                                            src={plate.src}
                                            alt={plate.alt}
                                            sizes='(max-width: 767px) 70vw, 40vw'
                                            className='h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]'
                                        />
                                        <figcaption className='eyebrow pointer-events-none absolute bottom-3 left-3 rounded-full bg-[#f6efef] px-3.5 py-1.5 text-[0.6rem] whitespace-nowrap text-[#3e1c1c]'>
                                            {plate.caption}
                                        </figcaption>
                                    </figure>
                                ))}
                            </div>
                        ))}
                    </div>
                </Reveal>
            </section>

            {/* ── Il Menu: on the second background tone, tabs across the top and the dishes on a rounded card,
                 then a slow strip of dishes ── */}
            <section id='menu' className='bg-[#ece8e8] px-6 pt-20 pb-14 md:px-12 md:pt-28 md:pb-16'>
                <div className='mx-auto max-w-6xl'>
                    <Reveal className='flex flex-col gap-4 border-b border-[#3e1c1c]/25 pb-8 md:flex-row md:items-end md:justify-between'>
                        <h2 className='font-display text-7xl leading-none text-[#cf2327] md:text-[120px]'>Il Menu</h2>
                        <p className='max-w-sm text-sm text-[#3e1c1c]/65 md:pb-4 md:text-right'>
                            GF marks dishes made with gluten-free ingredients. Gluten-free and whole wheat pasta
                            available.
                        </p>
                    </Reveal>
                    <Reveal className='mt-10'>
                        <MenuTabs />
                    </Reveal>
                    <Reveal className='mt-10 flex flex-wrap items-center gap-x-8 gap-y-4'>
                        <CallButton />
                        <a
                            href={PHONE_HREF}
                            className='text-xl font-semibold tracking-wide transition-colors hover:text-[#cf2327]'>
                            {PHONE_LABEL}
                        </a>
                    </Reveal>
                </div>
            </section>

            <section aria-label='From the kitchen' className='bg-[#ece8e8] pb-20 md:pb-28'>
                <FoodMarquee />
            </section>

            {/* ── Life is Beautiful: the stencilled wall from the Napoli room under a warm brown wash ── */}
            <section className='relative overflow-hidden bg-[#2a1212]'>
                <ResponsiveImg
                    src='/images/life-is-beautiful.jpg'
                    sizes='100vw'
                    alt=''
                    loading='lazy'
                    className='absolute inset-0 h-full w-full object-cover object-[70%_40%]'
                />
                <div className='absolute inset-0 bg-[#2a1212]/70' />
                <div className='relative mx-auto flex min-h-[600px] max-w-6xl flex-col justify-center px-6 py-24 text-[#f6efef] md:min-h-[78vh] md:px-12'>
                    <Reveal>
                        <h2 className='font-display text-6xl leading-[0.9] md:text-[8.5rem]'>
                            Life is
                            <br />
                            beautiful
                        </h2>
                        <Ornament className='mt-8 w-48 opacity-40' />
                        <p className='mt-8 max-w-md leading-relaxed text-[#f6efef]/85 md:text-lg'>
                            Old world rustic meets industrial chic: a vibrant bar, a patio on Yorkville Avenue and a
                            room made for a long night out. Open until 1am, Thursday to Saturday.
                        </p>
                        <CallButton label='Book Your Night' className='mt-10' />
                    </Reveal>
                </div>
            </section>

            {/* ── Private dining: the rooms as rounded photo panels ── */}
            <section id='events' className='px-6 py-20 md:px-12 md:py-28'>
                <div className='mx-auto max-w-7xl'>
                    <Reveal className='grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-end'>
                        <h2 className='font-display text-5xl leading-[0.95] text-[#cf2327] md:text-7xl'>
                            Rooms for 14
                            <br />
                            to 200
                        </h2>
                        <div>
                            <p className='leading-relaxed text-[#3e1c1c]/75 md:text-lg'>
                                From a rustic cellar with arched brick walls to sleek glass and raw metal. Every room
                                has audio and video, and the whole lower level can be yours for a party of 200.
                            </p>
                            <div className='mt-7 flex flex-wrap gap-3'>
                                <a href={EVENTS_PHONE_HREF} className='btn-cibo px-7 py-4'>
                                    Call the Events Team
                                </a>
                                <a
                                    href={EVENTS_FORM_HREF}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='btn-cibo-outline px-7 py-[14px]'>
                                    Plan an Event Online
                                </a>
                            </div>
                        </div>
                    </Reveal>
                    <Reveal className='mt-12'>
                        <RoomPanels />
                    </Reveal>
                </div>
            </section>

            {/* ── Prenota: the open kitchen full-bleed behind a flat brown wash, heading and call side by side,
                 the rounded horizontal booking bar below ── */}
            <section id='reserve' className='relative z-10 bg-[#2a1212] text-[#f6efef]'>
                <ResponsiveImg
                    src='/images/marquee-kitchen.jpg'
                    sizes='100vw'
                    alt=''
                    loading='lazy'
                    className='absolute inset-0 h-full w-full object-cover object-[50%_30%]'
                />
                <div className='absolute inset-0 bg-[#2a1212]/75' />
                <div className='relative mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32'>
                    <Reveal className='grid gap-8 md:grid-cols-[1fr_auto] md:items-end'>
                        <div>
                            <h2 className='font-display text-6xl leading-[0.92] md:text-8xl'>Save your seat</h2>
                            <p className='mt-5 max-w-lg leading-relaxed text-[#f6efef]/85 md:text-lg'>
                                133 Yorkville Ave at Avenue Road. Open every day from 11:30am, and from 11am on
                                weekends.
                            </p>
                        </div>
                        <CallButton label={`Call ${PHONE_LABEL}`} className='justify-self-start' />
                    </Reveal>
                    <Reveal
                        delay={150}
                        className='mt-12 rounded-[17px] bg-[#f6efef] px-6 py-7 text-[#3e1c1c] lg:w-fit lg:px-8 lg:py-6 xl:flex xl:items-center xl:gap-8'>
                        <div className='font-display shrink-0 text-3xl leading-none xl:border-r xl:border-[#3e1c1c]/15 xl:pr-8'>
                            Book Online
                        </div>
                        <OpenTableWidget className='mt-5 flex w-full justify-center lg:justify-start xl:mt-0' />
                    </Reveal>
                </div>
            </section>

            {/* ── Footer, after the new site: the address in a red rounded card, the essentials between
                 ring-and-hairline rules, the red cibo logo to close, then the sub-footer bar ── */}
            <footer className='glow-bottom overflow-hidden text-[#3e1c1c]'>
                <div className='mx-auto max-w-6xl px-6 pt-20 md:px-12 md:pt-28'>
                    <Reveal className='flex flex-col gap-10 rounded-[24px] bg-[#cf2327] px-8 py-12 text-[#f6efef] md:flex-row md:items-end md:justify-between md:px-14 md:py-16'>
                        <div>
                            <a
                                href={MAPS_HREF}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='font-display block text-[2.6rem] leading-[0.92] transition-opacity hover:opacity-80 sm:text-5xl md:text-7xl'>
                                133 Yorkville
                                <br />
                                Avenue
                            </a>
                            <p className='mt-4 text-[#f6efef]/80'>Toronto, ON M5R 1C4 · At Avenue Road</p>
                        </div>
                        <div className='flex flex-col items-start gap-4 md:items-end'>
                            <CallButton variant='light' />
                            <a
                                href={PHONE_HREF}
                                className='text-xl font-semibold tracking-wide transition-opacity hover:opacity-75'>
                                {PHONE_LABEL}
                            </a>
                        </div>
                    </Reveal>

                    <div className='grid grid-cols-2 gap-x-6 gap-y-12 py-16 text-center md:grid-cols-[1fr_auto_1.2fr_auto_1fr] md:gap-x-10 md:text-left'>
                        <div>
                            <h3 className='font-display text-2xl'>Visit</h3>
                            <p className='mt-4 text-sm leading-relaxed'>
                                133 Yorkville Ave
                                <br />
                                Toronto, ON M5R 1C4
                            </p>
                            <p className='mt-3 text-sm leading-relaxed text-[#3e1c1c]/60'>
                                At Avenue Road, with paid public lots right beside us.
                            </p>
                            <a
                                href={MAPS_HREF}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='mt-4 inline-block text-xs font-semibold tracking-[0.2em] text-[#cf2327] uppercase underline-offset-4 hover:underline'>
                                Get Directions
                            </a>
                        </div>

                        {/* Vertical ring-and-hairline rules between the columns on larger screens */}
                        <div
                            className='hidden flex-col items-center text-[#3e1c1c]/25 md:order-2 md:flex'
                            aria-hidden='true'>
                            <span className='h-[7px] w-[7px] rounded-full border border-current' />
                            <span className='w-px flex-1 bg-current' />
                            <span className='h-[13px] w-[13px] rounded-full border border-current' />
                            <span className='h-[7px] w-[7px] rounded-full border border-current' />
                        </div>

                        <div className='md:order-5'>
                            <h3 className='font-display text-2xl'>Follow & Gift</h3>
                            <div className='mt-4 space-y-2.5 text-xs font-semibold tracking-[0.2em] uppercase'>
                                <a
                                    href='https://www.instagram.com/cibo_winebar/'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='block transition-colors hover:text-[#cf2327]'>
                                    Instagram
                                </a>
                                <a
                                    href='https://www.facebook.com/CiboYorkville/'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='block transition-colors hover:text-[#cf2327]'>
                                    Facebook
                                </a>
                                <a
                                    href={GIFT_CARD_HREF}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='block transition-colors hover:text-[#cf2327]'>
                                    Gift Cards
                                </a>
                            </div>
                        </div>

                        <div
                            className='hidden flex-col items-center text-[#3e1c1c]/25 md:order-4 md:flex'
                            aria-hidden='true'>
                            <span className='h-[7px] w-[7px] rounded-full border border-current' />
                            <span className='h-[13px] w-[13px] rounded-full border border-current' />
                            <span className='w-px flex-1 bg-current' />
                            <span className='h-[7px] w-[7px] rounded-full border border-current' />
                        </div>

                        <div className='col-span-2 md:order-3 md:col-span-1'>
                            <h3 className='font-display text-2xl'>Hours</h3>
                            <dl className='mx-auto mt-4 max-w-xs space-y-2 text-sm md:mx-0'>
                                {[
                                    { day: 'Mon to Wed', time: '11:30am to 12am' },
                                    { day: 'Thu & Fri', time: '11:30am to 1am' },
                                    { day: 'Saturday', time: '11am to 1am' },
                                    { day: 'Sunday', time: '11am to 12am' },
                                    { day: 'Cibo Sociale', time: 'Thu & Fri, 2 to 6:30pm' },
                                    { day: 'Late happy hour', time: 'Thu to Sat, 10pm' }
                                ].map((row) => (
                                    <div key={row.day} className='flex items-baseline justify-between gap-4'>
                                        <dt className='text-[#3e1c1c]/60'>{row.day}</dt>
                                        <dd className='text-right'>{row.time}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>

                {/* The red cibo script logo set large to close the page */}
                <div
                    aria-hidden='true'
                    className='pointer-events-none mx-auto flex max-w-6xl flex-col items-center px-6 pt-4 pb-14 select-none md:pb-20'>
                    <CiboLogo title='' className='w-[58vw] max-w-[420px] text-[#cf2327]' />
                    <div className='mt-6 text-xs font-medium tracking-[0.6em] text-[#3e1c1c]/70 uppercase'>
                        Wine Bar · Yorkville
                    </div>
                </div>

                <div className='bg-[#ece8e8]'>
                    <div className='mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 py-5 text-center text-[0.7rem] font-medium tracking-[0.15em] text-[#3e1c1c]/70 uppercase md:flex-row md:justify-between md:px-12 md:text-left'>
                        <span>© {new Date().getFullYear()} Cibo Wine Bar Yorkville</span>
                        <span>Ospitalità Italiana · Seal of Authenticity</span>
                        <span>A Liberty Entertainment Group restaurant</span>
                    </div>
                </div>
            </footer>
        </main>
    );
};

export default Page;
