import RedStripe from './RedStripe';
import ScrollReveal from './ScrollReveal';
import type { PortfolioItem, Availability } from '@/lib/content';

interface CollectTierProps {
  eyebrow: string;
  heading: string;
  body: string;
  priceRange: string;
  edition: string;
  items: PortfolioItem[];
}

const AVAILABILITY_LABEL: Record<Availability, string> = {
  available: 'Available',
  sold: 'Sold',
  inquire: 'Inquire',
};

/**
 * A single collector tier section — large editorial intro on the left,
 * grid of works on the right. Each card surfaces edition + availability
 * up front so the page reads as a vault index, not a portfolio.
 */
export default function CollectTier({
  eyebrow,
  heading,
  body,
  priceRange,
  edition,
  items,
}: CollectTierProps) {
  const availableCount = items.filter((i) => i.availability === 'available').length;
  const soldCount = items.filter((i) => i.availability === 'sold').length;

  return (
    <section className="section-lg collect-tier">
      <div className="container">
        <ScrollReveal stagger>
          {/* Header band */}
          <div className="collect-tier-header reveal">
            <div>
              <span className="label" style={{ color: 'var(--stripe)' }}>
                {eyebrow}
              </span>
              <h2 className="display-lg mt-xs">{heading}</h2>
              <RedStripe
                variant="paint"
                width="80px"
                delay={0.15}
                style={{ marginTop: 'var(--space-sm)' }}
              />
              <p className="body-lg mt-md" style={{ maxWidth: '520px' }}>
                {body}
              </p>
            </div>

            <dl className="collect-tier-meta">
              <dt>Price</dt>
              <dd
                style={{
                  color: 'var(--stripe)',
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.4rem',
                }}
              >
                {priceRange}
              </dd>
              <dt>Edition</dt>
              <dd>{edition}</dd>
              <dt>Available</dt>
              <dd>
                {availableCount} of {items.length}
                {soldCount > 0 && (
                  <span style={{ color: 'var(--text-muted)' }}>
                    {' '}
                    · {soldCount} sold
                  </span>
                )}
              </dd>
            </dl>
          </div>
        </ScrollReveal>

        {/* Vault grid */}
        <div className="collect-tier-grid">
          {items.map((item) => (
            <a
              key={item.slug}
              href={item.href}
              className={`collect-card collect-card-${item.availability ?? 'available'}`}
            >
              <div className="collect-card-image">
                <img src={item.imageSrc} alt={item.title} loading="lazy" />
                {item.availability === 'sold' && (
                  <div className="collect-card-sold-overlay">
                    <span>Sold</span>
                  </div>
                )}
              </div>
              <div className="collect-card-info">
                <div className="collect-card-info-row">
                  <span
                    className="collect-card-title"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {item.title}
                  </span>
                  {item.price && (
                    <span className="collect-card-price">{item.price}</span>
                  )}
                </div>
                <div className="collect-card-info-row collect-card-info-meta">
                  <span className="label">
                    {item.edition ?? '1 of 1'}
                  </span>
                  {item.availability && (
                    <span
                      className={`collect-availability ${item.availability}`}
                    >
                      {AVAILABILITY_LABEL[item.availability]}
                    </span>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
