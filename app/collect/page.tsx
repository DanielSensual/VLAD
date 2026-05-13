import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RedStripe from '@/components/RedStripe';
import ScrollReveal from '@/components/ScrollReveal';
import CollectTier from '@/components/CollectTier';
import {
  portfolioItems,
  type Collection,
  type PortfolioItem,
} from '@/lib/content';
import { isShopifyEnabled } from '@/lib/shopify';

export const metadata: Metadata = {
  title: 'Collect — J.VLADIMIR',
  description:
    'Acquire from the Vault. Red Stripe Rabbits, The Icons, After Hours, and Private Collection works by J. Vladimir. Edition-numbered originals, certificate of authenticity, direct from the artist.',
};

// ── Tier definitions — order matters; this drives the page narrative ──
const TIERS: Array<{
  collection: Collection;
  eyebrow: string;
  heading: string;
  body: string;
  priceRange: string;
  edition: string;
}> = [
  {
    collection: 'Red Stripe Rabbits',
    eyebrow: 'Tier I · Entry',
    heading: 'Red Stripe Rabbits',
    body: 'Hand-finished sculpture, limited to 77 pieces per edition. The entry point into the J.Vladimir vault — each rabbit individually painted and Stripe-applied so no two are identical.',
    priceRange: '$777',
    edition: 'Edition of 77',
  },
  {
    collection: 'The Icons',
    eyebrow: 'Tier II · Originals',
    heading: 'The Icons',
    body: '48" × 48" one-of-one mixed-media originals on canvas. Layered paint, resin, and the signature Red Stripe. Pop iconography stripped to its essence.',
    priceRange: '$5,000 – $6,500',
    edition: '1 of 1',
  },
  {
    collection: 'After Hours',
    eyebrow: 'Tier III · After Hours',
    heading: 'After Hours',
    body: 'The evening studio sessions. Darker, rarer, less restrained — the work that emerges after the gallery lights go down. Raw and unfiltered.',
    priceRange: '$5,000 – $7,000+',
    edition: '1 of 1',
  },
];

export default async function CollectPage() {
  // When Shopify env is wired, replace this static read with a parallel
  // Promise.all of getProductsByCollection() calls (mapping each tier's
  // collection name to a Shopify collection handle) and merge by slug.
  // The CollectTier component already accepts PortfolioItem[], so the
  // swap is data-shape-preserving.
  const usingLiveData = isShopifyEnabled();

  const byCollection: Record<Collection, PortfolioItem[]> = {
    'Red Stripe Rabbits': [],
    'The Icons': [],
    'After Hours': [],
    'Private Collection': [],
  };
  for (const item of portfolioItems) {
    byCollection[item.category].push(item);
  }

  const availableCount = portfolioItems.filter(
    (i) => i.availability === 'available',
  ).length;

  return (
    <>
      <Header />

      {/* ── Hero ── */}
      <section className="section-lg" style={{ paddingTop: '160px' }}>
        <div className="container-narrow text-center">
          <span className="label mb-md" style={{ display: 'block' }}>
            Acquire
          </span>
          <h1 className="display-xl">Enter the Vault</h1>
          <RedStripe variant="wet" width="80px" centered delay={0.2} style={{ margin: 'var(--space-md) auto' }} />
          <p className="body-lg mt-md">
            Limited-edition Red Stripe sculptures and one-of-one mixed-media
            originals. Each piece is signed, numbered where editioned, and
            shipped insured with a certificate of authenticity — direct from
            the studio.
          </p>

          {/* Live stats row */}
          <div className="collect-stats">
            <div>
              <span className="collect-stat-num">{availableCount}</span>
              <span className="label collect-stat-label">Works available</span>
            </div>
            <div>
              <span className="collect-stat-num">3</span>
              <span className="label collect-stat-label">Collector tiers</span>
            </div>
            <div>
              <span className="collect-stat-num">$777</span>
              <span className="label collect-stat-label">Entry tier</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust strip — ink room ── */}
      <section
        className="section"
        style={{ background: 'var(--bg-ink)', color: '#fff' }}
      >
        <ScrollReveal stagger>
          <div className="container collect-trust-grid">
            {[
              { eyebrow: 'I.', label: 'Signed & Numbered Editions' },
              { eyebrow: 'II.', label: 'Certificate of Authenticity' },
              { eyebrow: 'III.', label: 'Insured Worldwide Shipping' },
              { eyebrow: 'IV.', label: 'Direct from the Artist' },
            ].map((item) => (
              <div key={item.label} className="collect-trust-cell reveal">
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 320,
                    fontSize: '2rem',
                    color: 'var(--stripe)',
                    display: 'block',
                  }}
                >
                  {item.eyebrow}
                </span>
                <span
                  className="label"
                  style={{
                    color: 'hsla(0,0%,100%,0.7)',
                    marginTop: '0.5rem',
                    display: 'block',
                  }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ── Tiers ── */}
      {TIERS.map((tier) => {
        const items = byCollection[tier.collection];
        if (items.length === 0) return null;
        return (
          <CollectTier
            key={tier.collection}
            eyebrow={tier.eyebrow}
            heading={tier.heading}
            body={tier.body}
            priceRange={tier.priceRange}
            edition={tier.edition}
            items={items}
          />
        );
      })}

      {/* ── Commissions CTA — ink room ── */}
      <section
        className="section-lg"
        style={{ background: 'var(--bg-ink)', color: '#fff' }}
      >
        <div className="container-narrow text-center">
          <span
            className="label mb-md"
            style={{ display: 'block', color: 'var(--gilt)' }}
          >
            Tier IV · Private Commission
          </span>
          <h2 className="display-lg" style={{ color: '#fff' }}>
            Beyond the Vault
          </h2>
          <RedStripe variant="wet" width="60px" centered style={{ margin: 'var(--space-md) auto' }} />
          <p className="body-lg mt-md" style={{ color: 'hsla(0,0%,100%,0.75)' }}>
            For private commissions, museum-scale work, and the highest tier
            of the collection ($15,000 and above), contact the studio directly.
            These pieces are not listed publicly.
          </p>
          <div
            style={{
              marginTop: 'var(--space-lg)',
              display: 'flex',
              gap: 'var(--space-sm)',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <a href="/contact" className="btn-solid btn-magnetic">
              Initiate Inquiry
            </a>
            <a
              href="mailto:mail@jvladimir.com"
              className="btn-outline btn-magnetic"
              style={{ borderColor: 'hsla(0,0%,100%,0.2)', color: '#fff' }}
            >
              mail@jvladimir.com
            </a>
          </div>

          {/* Tiny status line — only renders once live data is wired */}
          {usingLiveData && (
            <p
              className="label"
              style={{
                marginTop: 'var(--space-lg)',
                color: 'hsla(0,0%,100%,0.3)',
                fontSize: '0.55rem',
              }}
            >
              · Live inventory · Synced with the studio ·
            </p>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
