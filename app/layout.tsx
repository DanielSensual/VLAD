import type { Metadata } from 'next';
import './globals.css';
import StripeCursor from '@/components/StripeCursor';
import { StripeProgress, GrainOverlay, WetPaintFilters } from '@/components/AmbientEffects';

export const metadata: Metadata = {
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
