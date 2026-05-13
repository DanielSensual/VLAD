import type { Metadata } from 'next';
import Header from '@/components/Header';
import WorksGallery from '@/components/WorksGallery';
import RedStripe from '@/components/RedStripe';
import ScrollReveal from '@/components/ScrollReveal';
import Footer from '@/components/Footer';
import { portfolioItems } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Works — J.VLADIMIR',
  description:
    'Red Stripe Rabbits, The Icons, and After Hours. Contemporary pop art sculptures and mixed-media originals by J. Vladimir.',
};

const COLLECTION_ORDER = [
  'The Icons',
  'After Hours',
  'Red Stripe Rabbits',
] as const;

export default function PortfolioPage() {
  // Group works by collection so each section reads like a gallery wall.
  const grouped = COLLECTION_ORDER.map((collection) => ({
    collection,
    items: portfolioItems.filter((item) => item.category === collection),
  })).filter((group) => group.items.length > 0);

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="section-lg" style={{ paddingTop: '160px' }}>
        <div className="container text-center">
          <span className="label mb-md" style={{ display: 'block' }}>
            The Collection
          </span>
          <h1 className="display-xl">Works</h1>
          <RedStripe variant="paint" width="80px" centered delay={0.2} style={{ marginTop: 'var(--space-md)' }} />
          <p
            className="body-lg mt-md"
            style={{ maxWidth: '600px', margin: 'var(--space-md) auto 0' }}
          >
            Limited-edition Red Stripe sculptures, one-of-one mixed-media
            originals, and contemporary pop-art works. Each piece is built with
            layered paint, resin, and the signature Red Stripe.
          </p>
        </div>
      </section>

      {/* Grouped collections */}
      {grouped.map(({ collection, items }) => (
        <section key={collection} className="section">
          <ScrollReveal>
            <div
              className="container"
              style={{ marginBottom: 'var(--space-lg)' }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  gap: 'var(--space-md)',
                  flexWrap: 'wrap',
                }}
              >
                <h2 className="display-md">{collection}</h2>
                <span className="label">
                  {items.length} {items.length === 1 ? 'piece' : 'pieces'}
                </span>
              </div>
              <RedStripe variant="divider" width="100%" thickness={1} style={{ marginTop: 'var(--space-sm)' }} />
            </div>
          </ScrollReveal>

          <WorksGallery items={items} />
        </section>
      ))}

      {/* Collect CTA */}
      <section
        className="section-lg"
        style={{ background: 'var(--bg-secondary)' }}
      >
        <div className="container-narrow text-center">
          <span className="label mb-md" style={{ display: 'block' }}>
            Acquire
          </span>
          <h2 className="display-md">Collector Confidence</h2>
          <RedStripe variant="wet" width="60px" centered delay={0.1} style={{ margin: 'var(--space-md) auto' }} />

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

          <a href="/collect" className="btn-solid">
            Enter the Vault
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
