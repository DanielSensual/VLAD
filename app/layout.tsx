import type { Metadata } from 'next';
import './globals.css';
import StripeCursor from '@/components/StripeCursor';
import { StripeProgress, GrainOverlay, WetPaintFilters } from '@/components/AmbientEffects';

export const metadata: Metadata = {
  metadataBase: new URL('https://jvladimir.com'),
  title: 'J.VLADIMIR — Artist. Photographer. Design.',
  description:
    'J. Vladimir (b. Orlando) employs the figurative tradition of Pop with a painterly intervention — a single horizontal stripe — that transforms editorial fashion photography into fine art.',
  keywords: [
    'J.Vladimir',
    'The Red Stripe',
    'contemporary pop art',
    'editorial fashion photography',
    'Red Stripe Rabbit',
    'Orlando artist',
    'Miami photographer',
    'NYC photographer',
    'luxury art',
    'mixed media',
  ],
  openGraph: {
    title: 'J.VLADIMIR — Artist. Photographer. Design.',
    description:
      'Editorial fashion photographer and contemporary pop artist. The Red Stripe.',
    type: 'website',
    url: 'https://jvladimir.com',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 1200,
        alt: 'J.Vladimir — Crown, mixed media with Red Stripe',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'J.VLADIMIR — Artist. Photographer. Design.',
    description:
      'Editorial fashion photographer and contemporary pop artist. The Red Stripe.',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <WetPaintFilters />
        <StripeProgress />
        <StripeCursor />
        <GrainOverlay />
        {children}
      </body>
    </html>
  );
}
