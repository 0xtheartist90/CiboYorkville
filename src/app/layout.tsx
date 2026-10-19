import type { ReactNode } from 'react';

import type { Metadata } from 'next';
import { Forum, Poppins } from 'next/font/google';

import '@/app/globals.css';
import SmoothScroll from '@/components/smooth-scroll';

// The fonts of Cibo's new website: Forum for headings, Poppins for everything else.
const forum = Forum({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-display'
});
const poppins = Poppins({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-sans'
});

const title = 'Cibo Wine Bar Yorkville | Italian Restaurant & Wine Bar on Yorkville Ave';
const description =
    'Handmade pasta, pizza from the open kitchen and a 2,500-bottle wine room at 133 Yorkville Ave, Toronto. Half-price drinks Thursday and Friday from 2 to 6:30pm, half-price pizza Tuesdays and $15 pasta Wednesdays. Call to reserve.';

// Absolute base for the share image: Vercel's production domain when deployed, the dev server locally.
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3001';

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
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
            <body className={`${forum.variable} ${poppins.variable} cibo-body overscroll-none antialiased`}>
                <SmoothScroll />
                {children}
            </body>
        </html>
    );
};

export default Layout;
