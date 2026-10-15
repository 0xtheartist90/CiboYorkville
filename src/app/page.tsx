import type { CSSProperties } from 'react';

import CiboLogo from '@/components/cibo-logo';
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

const Arrow = () => (
    <svg width='18' height='10' viewBox='0 0 18 10' fill='none' aria-hidden='true'>
        <path d='M0 5h16M12 1l4 4-4 4' stroke='currentColor' strokeWidth='1.5' />
    </svg>
);

const CallButton = ({
    label = 'Call to Reserve',
    variant = 'ink',
    className = ''
}: {
    label?: string;
    variant?: 'ink' | 'light';
    className?: string;
}) => (
    <a href={PHONE_HREF} className={`${variant === 'ink' ? 'btn-ink' : 'btn-light'} px-7 py-4 ${className}`}>
        {label}
        <Arrow />
    </a>
);

const Page = () => {
    return (
        <main>
            <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />

            {/* ── Navigation: limestone bar, the wordmark and Yorkville left, the call right ── */}
            <nav className='fixed top-0 z-50 w-full border-b border-[#17181a]/10 bg-[#efebe4]/90 backdrop-blur-md'>
                <div className='flex h-16 items-center justify-between px-5 md:px-10'>
                    {/* One lockup, like "WINE BAR" under the script in Cibo's original logo */}
                    <a
                        href='#top'
                        className='flex flex-col items-center'
                        aria-label='Cibo Wine Bar Yorkville, back to top'>
                        <CiboLogo title='' className='h-8 w-auto text-[#17181a]' />
                        <span className='mt-0.5 pl-[0.45em] text-[0.5rem] font-bold tracking-[0.45em] text-[#17181a] uppercase'>
                            Yorkville
                        </span>
                    </a>
                    <a href={PHONE_HREF} className='btn-ink px-4 py-3 text-[0.7rem] md:px-6'>
                        Call to Reserve
                    </a>
                </div>
            </nav>

            {/* ── Hero: the bar and its wine wall full-bleed, the wordmark and one line low on the left,
                 and a horizontal booking bar floating over the bottom edge. Phones get the bar below. ── */}
            <section id='top' className='relative mt-16 lg:h-[calc(100svh-4rem)] lg:min-h-[700px]'>
                <div className='relative h-[64svh] min-h-[440px] overflow-hidden bg-[#17181a] lg:absolute lg:inset-0 lg:h-auto'>
                    <ResponsiveImg
                        src='/images/wine-bar.jpg'
                        sizes='100vw'
                        alt='The bar at Cibo Yorkville with a lit wall of wine bottles and white leather stools'
                        fetchPriority='high'
                        className='hero-zoom absolute inset-0 h-full w-full object-cover object-[60%_50%]'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-[#17181a]/90 via-[#17181a]/40 to-[#17181a]/10 lg:bg-gradient-to-r lg:from-[#17181a]/80 lg:via-[#17181a]/25 lg:to-transparent' />
                    <div className='absolute inset-x-0 bottom-0 hidden h-64 bg-gradient-to-t from-[#17181a]/70 to-transparent lg:block' />

                    <div className='hero-in absolute inset-x-0 bottom-0 px-6 pb-10 text-[#f7f5f1] lg:bottom-48 lg:px-20'>
                        <h1>
                            <span className='sr-only'>
                                Cibo Wine Bar Yorkville: Italian restaurant and wine bar in Toronto
                            </span>
                            <CiboLogo title='' className='w-28 text-[#f7f5f1] md:w-40' />
                        </h1>
                        <p className='font-display mt-6 text-[3.6rem] leading-[0.86] md:text-[7.5rem]'>
                            Big, bold
                            <br />
                            Italian
                        </p>
                        <div className='mt-8 flex flex-wrap items-center gap-x-6 gap-y-4'>
                            <CallButton variant='light' />
                            <span className='eyebrow text-[#f7f5f1]/85'>133 Yorkville Ave</span>
                        </div>
                    </div>
                </div>

                {/* The booking bar: OpenTable's wide, horizontal widget on large screens */}
                <div className='hero-in-late border-b border-[#17181a]/10 bg-[#f7f5f1] px-6 py-7 lg:absolute lg:bottom-12 lg:left-20 lg:flex lg:w-fit lg:items-center lg:gap-10 lg:border-0 lg:px-10 lg:py-6 lg:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]'>
                    <div className='flex items-baseline justify-between gap-6 lg:block lg:shrink-0 lg:border-r lg:border-[#17181a]/15 lg:pr-10'>
                        <div className='font-display text-3xl leading-none text-[#17181a]'>Book a Table</div>
                        <div className='eyebrow text-[#7a1f2b] lg:mt-2'>Open 7 days</div>
                    </div>
                    <OpenTableWidget className='mt-5 flex w-full justify-center lg:mt-0 lg:justify-start' />
                </div>
            </section>

            {/* ── Ogni settimana: the week's offers as one clean list, heading alongside ── */}
            <section id='week' className='px-6 py-20 md:px-12 md:py-28'>
                <div className='mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16'>
                    <Reveal className='md:sticky md:top-28 md:self-start'>
                        <div className='eyebrow text-[#7a1f2b]'>Ogni settimana</div>
                        <h2 className='font-display mt-4 text-5xl leading-[0.92] md:text-7xl'>
                            Every week
                            <br />
                            at Cibo
                        </h2>
                        <div className='mt-8 aspect-[4/3] overflow-hidden'>
                            <LightboxImage
                                src='/images/dining-marquee.jpg'
                                sizes='(max-width: 767px) 100vw, 40vw'
                                alt='The dining room at Cibo Yorkville with long wooden tables beneath the lit CIBO letters'
                                className='h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]'
                            />
                        </div>
                        <CallButton className='mt-8 hidden md:inline-flex' />
                    </Reveal>

                    <Reveal>
                        <ul className='border-t border-[#17181a]/15'>
                            {WEEK.map((item) => (
                                <li
                                    key={item.title}
                                    className='grid gap-1 border-b border-[#17181a]/15 py-6 md:grid-cols-[1fr_auto] md:items-baseline md:gap-8'>
                                    <div>
                                        <h3
                                            className={`font-display text-3xl leading-none md:text-4xl ${
                                                item.highlight ? 'text-[#7a1f2b]' : ''
                                            }`}>
                                            {item.title}
                                        </h3>
                                        <p className='mt-2 text-[#17181a]/70'>{item.text}</p>
                                    </div>
                                    <div className='eyebrow order-first text-[0.65rem] text-[#17181a]/55 md:order-none md:text-right'>
                                        {item.when}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                </div>
            </section>

            {/* ── The wine room: graphite, the 2,500 set large in gold, the wall beside it ── */}
            <section id='wine' className='overflow-hidden bg-[#17181a] text-[#f7f5f1]'>
                <div className='grid md:grid-cols-2'>
                    <div className='relative min-h-[380px] md:order-2 md:min-h-[720px]'>
                        <LightboxImage
                            src='/images/wine-dispensers.jpg'
                            sizes='(max-width: 767px) 100vw, 50vw'
                            alt='The wine room at Cibo Yorkville: floor-to-ceiling bottles above a row of wine dispensers and the bar'
                            className='absolute inset-0 h-full w-full object-cover'
                        />
                    </div>
                    <Reveal className='px-6 py-16 md:order-1 md:px-14 md:py-24 lg:px-20'>
                        <div className='eyebrow text-[#f2c46d]'>The Wine Room</div>
                        <div className='font-display mt-6 text-[7.5rem] leading-[0.85] font-black text-[#f2c46d] md:text-[11rem]'>
                            2,500
                        </div>
                        <div className='font-display mt-5 text-3xl md:mt-7 md:text-4xl'>Bottles on the wall</div>
                        <p className='mt-6 max-w-md text-lg leading-relaxed text-[#f7f5f1]/75'>
                            A soaring glass wine room runs the length of the bar, stocked from the Alps to Sicily.
                            Twenty-four wines are poured by the glass, all half price at Cibo Sociale on Thursday and
                            Friday afternoons.
                        </p>
                        <ul className='mt-10 max-w-md border-t border-[#f7f5f1]/15'>
                            {GLASSES.map((glass) => (
                                <li
                                    key={glass.name}
                                    className='flex items-baseline justify-between gap-4 border-b border-[#f7f5f1]/15 py-3'>
                                    <span className='text-[#f7f5f1]/85'>{glass.name}</span>
                                    <span className='font-display text-xl text-[#f2c46d]'>{glass.price}</span>
                                </li>
                            ))}
                        </ul>
                        <p className='mt-3 text-xs tracking-wide text-[#f7f5f1]/45'>Per 5oz glass.</p>
                    </Reveal>
                </div>
            </section>

            {/* ── The open kitchen: copy, then plates in justified rows at their own proportions ── */}
            <section id='food' className='px-4 py-20 md:px-8 md:py-28'>
                <Reveal className='mx-auto grid max-w-6xl gap-6 px-2 md:grid-cols-2 md:items-end md:px-4'>
                    <div>
                        <div className='eyebrow text-[#7a1f2b]'>Al Banco</div>
                        <h2 className='font-display mt-4 text-5xl leading-[0.92] md:text-7xl'>
                            Made in front
                            <br />
                            of you
                        </h2>
                    </div>
                    <p className='text-lg leading-relaxed text-[#17181a]/75'>
                        Southern Italian cooking from an open kitchen counter: pasta fresca rolled in house, pizza from
                        the oven and plates made to pass around the table.
                    </p>
                </Reveal>

                {/* Phones: one swipeable strip at a fixed height. Larger screens: two rows. */}
                <Reveal className='mx-auto mt-12 max-w-7xl'>
                    <div className='-mx-4 flex snap-x scroll-px-4 gap-2 overflow-x-auto px-4 [scrollbar-width:none] md:mx-0 md:block md:space-y-2 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden'>
                        {PLATE_ROWS.map((row, r) => (
                            <div key={r} className='contents md:flex md:gap-2'>
                                {row.map((plate) => (
                                    <figure
                                        key={plate.src}
                                        className='relative h-[62vw] w-[calc(62vw*var(--r))] shrink-0 snap-start md:h-auto md:w-auto md:min-w-0 md:shrink md:basis-0'
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
                                            className='h-full w-full object-cover'
                                        />
                                        <figcaption className='eyebrow pointer-events-none absolute bottom-0 left-0 bg-[#f7f5f1] px-3 py-2 text-[0.62rem] text-[#17181a]'>
                                            {plate.caption}
                                        </figcaption>
                                    </figure>
                                ))}
                            </div>
                        ))}
                    </div>
                </Reveal>
            </section>

            {/* ── Il Menu: tabs across the top, the dishes on a white card ── */}
            <section id='menu' className='px-6 pb-20 md:px-12 md:pb-28'>
                <div className='mx-auto max-w-6xl'>
                    <Reveal className='flex flex-col gap-4 border-t border-[#17181a] pt-10 md:flex-row md:items-end md:justify-between'>
                        <h2 className='font-stencil text-6xl leading-none md:text-8xl'>Il Menu</h2>
                        <p className='max-w-sm text-sm text-[#17181a]/65 md:text-right'>
                            GF marks dishes made with gluten-free ingredients. Gluten-free and whole wheat pasta
                            available.
                        </p>
                    </Reveal>
                    <Reveal className='mt-10'>
                        <MenuTabs />
                    </Reveal>
                    <Reveal className='mt-10 flex flex-wrap items-center gap-x-8 gap-y-4'>
                        <CallButton />
                        <a href={PHONE_HREF} className='font-display text-2xl hover:text-[#7a1f2b]'>
                            {PHONE_LABEL}
                        </a>
                    </Reveal>
                </div>
            </section>

            {/* ── Life is Beautiful: the stencilled wall from the Napoli room ── */}
            <section className='relative overflow-hidden bg-[#17181a]'>
                <ResponsiveImg
                    src='/images/life-is-beautiful.jpg'
                    sizes='100vw'
                    alt=''
                    loading='lazy'
                    className='absolute inset-0 h-full w-full object-cover object-[70%_40%]'
                />
                <div className='absolute inset-0 bg-[#17181a]/70' />
                <div className='relative mx-auto flex min-h-[600px] max-w-6xl flex-col justify-center px-6 py-24 text-[#f7f5f1] md:min-h-[78vh] md:px-12'>
                    <Reveal>
                        <div className='eyebrow text-[#f2c46d]'>Thursday to Saturday · Until 1am</div>
                        <h2 className='font-stencil mt-6 text-6xl leading-[0.9] md:text-[9.5rem]'>
                            Life is
                            <br />
                            beautiful
                        </h2>
                        <p className='mt-8 max-w-md text-lg leading-relaxed text-[#f7f5f1]/80'>
                            Old world rustic meets industrial chic: a vibrant bar, a patio on Yorkville Avenue and a
                            room made for a long night out.
                        </p>
                        <CallButton variant='light' label='Book Your Night' className='mt-10' />
                    </Reveal>
                </div>
            </section>

            {/* ── Private dining: the rooms as photo panels ── */}
            <section id='events' className='px-6 py-20 md:px-12 md:py-28'>
                <div className='mx-auto max-w-7xl'>
                    <Reveal className='grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-end'>
                        <div>
                            <div className='eyebrow text-[#7a1f2b]'>Private Dining & Events</div>
                            <h2 className='font-display mt-4 text-5xl leading-[0.92] md:text-7xl'>
                                Rooms for 14
                                <br />
                                to 200
                            </h2>
                        </div>
                        <div>
                            <p className='text-lg leading-relaxed text-[#17181a]/75'>
                                From a rustic cellar with arched brick walls to sleek glass and raw metal. Every room
                                has audio and video, and the whole lower level can be yours for a party of 200.
                            </p>
                            <div className='mt-7 flex flex-wrap gap-3'>
                                <a href={EVENTS_PHONE_HREF} className='btn-ink px-6 py-4'>
                                    Call the Events Team
                                    <Arrow />
                                </a>
                                <a
                                    href={EVENTS_FORM_HREF}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='btn-line px-6 py-4 text-[#17181a]'>
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

            {/* ── Prenota: the open kitchen full-bleed behind a dark wash, heading and call side by side,
                 the horizontal booking bar below ── */}
            <section id='reserve' className='relative overflow-hidden bg-[#17181a] text-[#f7f5f1]'>
                <ResponsiveImg
                    src='/images/marquee-kitchen.jpg'
                    sizes='100vw'
                    alt=''
                    loading='lazy'
                    className='absolute inset-0 h-full w-full object-cover object-[50%_30%]'
                />
                <div className='absolute inset-0 bg-[#17181a]/75' />
                <div className='relative mx-auto max-w-6xl px-6 py-24 md:px-12 md:py-32'>
                    <Reveal className='grid gap-8 md:grid-cols-[1fr_auto] md:items-end'>
                        <div>
                            <div className='eyebrow text-[#f7f5f1]/70'>Prenota</div>
                            <h2 className='font-display mt-4 text-6xl leading-[0.9] md:text-8xl'>Save your seat</h2>
                            <p className='mt-5 max-w-lg text-lg text-[#f7f5f1]/80'>
                                133 Yorkville Ave at Avenue Road. Open every day from 11:30am, and from 11am on
                                weekends.
                            </p>
                        </div>
                        <CallButton variant='light' label={`Call ${PHONE_LABEL}`} className='justify-self-start' />
                    </Reveal>
                    <Reveal
                        delay={150}
                        className='mt-12 bg-[#f7f5f1] px-6 py-7 text-[#17181a] lg:flex lg:w-fit lg:items-center lg:gap-10 lg:px-10 lg:py-6'>
                        <div className='font-display shrink-0 text-3xl leading-none lg:border-r lg:border-[#17181a]/15 lg:pr-10'>
                            Book Online
                        </div>
                        <OpenTableWidget className='mt-5 flex w-full justify-center lg:mt-0 lg:justify-start' />
                    </Reveal>
                </div>
            </section>

            {/* ── Footer: graphite, the address set large, the essentials, and the cibo logo set large ── */}
            <footer className='overflow-hidden bg-[#17181a] text-[#f7f5f1]'>
                <div className='mx-auto max-w-6xl px-6 pt-20 md:px-12 md:pt-24'>
                    <div className='grid gap-12 md:grid-cols-[1.3fr_1fr]'>
                        <div className='text-center md:text-left'>
                            <div className='eyebrow text-[#f2c46d]'>Ci vediamo a Yorkville</div>
                            <a
                                href={MAPS_HREF}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='font-display mt-4 block text-5xl leading-[0.92] transition-colors hover:text-[#f2c46d] md:text-7xl'>
                                133 Yorkville
                                <br />
                                Avenue
                            </a>
                            <p className='mt-4 text-[#f7f5f1]/60'>
                                Toronto, ON M5R 1C4 · At Avenue Road
                                <br />
                                Paid public lots right beside us.
                            </p>
                            <a
                                href={PHONE_HREF}
                                className='font-display mt-6 inline-block text-3xl transition-colors hover:text-[#f2c46d]'>
                                {PHONE_LABEL}
                            </a>
                        </div>

                        <div className='grid grid-cols-2 gap-8 text-center md:text-left'>
                            <div className='col-span-2'>
                                <h3 className='eyebrow text-[#f7f5f1]/50'>Hours</h3>
                                <dl className='mt-4 space-y-2 text-[0.95rem]'>
                                    {[
                                        { day: 'Mon to Wed', time: '11:30am to 12am' },
                                        { day: 'Thu & Fri', time: '11:30am to 1am' },
                                        { day: 'Saturday', time: '11am to 1am' },
                                        { day: 'Sunday', time: '11am to 12am' },
                                        { day: 'Cibo Sociale', time: 'Thu & Fri, 2 to 6:30pm' },
                                        { day: 'Late happy hour', time: 'Thu to Sat, 10pm' }
                                    ].map((row) => (
                                        <div
                                            key={row.day}
                                            className='flex items-baseline justify-between gap-4 border-b border-[#f7f5f1]/10 pb-2'>
                                            <dt className='text-[#f7f5f1]/55'>{row.day}</dt>
                                            <dd>{row.time}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                            <div>
                                <h3 className='eyebrow text-[#f7f5f1]/50'>Follow</h3>
                                <a
                                    href='https://www.instagram.com/cibo_winebar/'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='mt-3 block transition-colors hover:text-[#f2c46d]'>
                                    @cibo_winebar
                                </a>
                            </div>
                            <div>
                                <h3 className='eyebrow text-[#f7f5f1]/50'>Gift</h3>
                                <a
                                    href={GIFT_CARD_HREF}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='mt-3 block transition-colors hover:text-[#f2c46d]'>
                                    Gift cards
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* The cibo script logo set large to close the page */}
                <div
                    aria-hidden='true'
                    className='pointer-events-none mx-auto mt-16 flex max-w-6xl flex-col items-center px-6 pb-14 select-none md:mt-24 md:pb-20'>
                    <CiboLogo title='' className='w-[58vw] max-w-[460px] text-[#f7f5f1]/90' />
                    <div className='eyebrow mt-6 text-[#f7f5f1]/50'>Wine Bar · Yorkville</div>
                </div>

                <div className='border-t border-[#f7f5f1]/10'>
                    <div className='mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 py-5 text-center text-xs tracking-wide text-[#f7f5f1]/45 md:flex-row md:justify-between md:px-12'>
                        <span>© {new Date().getFullYear()} Cibo Wine Bar Yorkville</span>
                        <span>Ospitalità Italiana · Italian Government Seal of Authenticity</span>
                        <span>A Liberty Entertainment Group restaurant</span>
                    </div>
                </div>
            </footer>
        </main>
    );
};

export default Page;
