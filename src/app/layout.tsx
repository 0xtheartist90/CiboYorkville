import type { ReactNode } from 'react';

import type { Metadata } from 'next';
import { Big_Shoulders, Manrope, Stardos_Stencil } from 'next/font/google';

import '@/app/globals.css';
import SmoothScroll from '@/components/smooth-scroll';

// A condensed industrial face for Yorkville's steel-and-glass room, Cibo's menu stencil for
// the menu card and the "Life is Beautiful" wall, and a clean grotesque for reading.
const display = Big_Shoulders({
    subsets: ['latin'],
    weight: ['600', '700', '800', '900'],
    variable: '--font-display'
});
const stencil = Stardos_Stencil({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-stencil'
});
const manrope = Manrope({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
    variable: '--font-manrope'
});

const title = 'Cibo Wine Bar Yorkville | Italian Restaurant & Wine Bar on Yorkville Ave';
const description =
    'Handmade pasta, pizza from the open kitchen and a 2,500-bottle wine room at 133 Yorkville Ave, Toronto. Half-price drinks Thursday and Friday from 2 to 6:30pm, half-price pizza Tuesdays and $15 pasta Wednesdays. Call to reserve.';

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
        images: ['/og.jpg'],
        type: 'website',
        locale: 'en_CA'
    }
};

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <html lang='en'>
            <body
                className={`${display.variable} ${stencil.variable} ${manrope.variable} cibo-body overscroll-none antialiased`}>
                <SmoothScroll />
                {children}
            </body>
        </html>
    );
};

export default Layout;
