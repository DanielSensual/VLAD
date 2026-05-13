import type { Metadata } from 'next';
import Header from '@/components/Header';
import PortfolioGrid from '@/components/PortfolioGrid';
import Footer from '@/components/Footer';
import { portfolioItems } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Portfolio — J.VLADIMIR',
  description:
    'Red Stripe Rabbits, One-of-One Originals, The Icons, and After Hours. Contemporary pop art sculptures and mixed-media works by J. Vladimir.',
};

export default function PortfolioPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="section-lg" style={{ paddingTop: '160px' }}>
        <div className="container text-center">
          <span className="label mb-md" style={{ display: 'block' }}>
            The Collection
          </span>
          <h1 className="display-xl">Portfolio</h1>
          <div className="stripe-divider-center mt-md mb-md" />
          <p
            className="body-lg"
            style={{ maxWidth: '600px', margin: '0 auto' }}
          >
            Limited-edition Red Stripe sculptures, one-of-one mixed-media
            originals, and contemporary pop-art works. Each piece is built with
            layered paint, resin, and the signature Red Stripe.
          </p>
        </div>
      </section>

      {/* Full Grid */}
      <section className="section">
        <PortfolioGrid items={portfolioItems} />
      </section>

      {/* Shop CTA */}
      <section
        className="section-lg"
        style={{ background: 'var(--bg-secondary)' }}
      >
        <div className="container-narrow text-center">
          <span className="label mb-md" style={{ display: 'block' }}>
            Acquire
          </span>
          <h2 className="display-md">Collector Confidence</h2>
          <div className="stripe-divider-center mt-md mb-md" />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 'var(--space-md)',
              maxWidth: '600px',
              margin: '0 auto var(--space-lg)',
            }}
          >
            {[
              'Signed / Numbered Editions',
              'Certificate of Authenticity',
              'Insured Shipping',
              'Direct from the Artist',
            ].map((item) => (
              <div
                key={item}
                style={{
                  padding: 'var(--space-sm)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '2px',
                  textAlign: 'center',
                }}
              >
                <span
                  className="label"
                  style={{ fontSize: '0.55rem', lineHeight: 1.5 }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>

          <a
            href="https://jvladimir.store"
            className="btn-solid"
            target="_blank"
            rel="noopener noreferrer"
          >
            Shop the Collection
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
