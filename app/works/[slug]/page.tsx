import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RedStripe from '@/components/RedStripe';
import ArtCard3D from '@/components/ArtCard3D';
import ScrollReveal from '@/components/ScrollReveal';
import {
  getRelatedWorks,
  getWorkBySlug,
  portfolioItems,
  type Availability,
} from '@/lib/content';

interface WorkPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return portfolioItems.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) return { title: 'Work not found — J.VLADIMIR' };
  return {
    title: `${work.title} — J.VLADIMIR`,
    description:
      work.description ??
      `${work.title} — ${work.category}. ${work.medium ?? ''} by J. Vladimir.`,
    openGraph: {
      title: `${work.title} — J.VLADIMIR`,
      images: [{ url: work.imageSrc }],
    },
  };
}

const AVAILABILITY_LABEL: Record<Availability, string> = {
  available: 'Available',
  sold: 'Sold',
  inquire: 'Inquire',
};

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) notFound();

  const related = getRelatedWorks(slug);

  return (
    <>
      <Header />

      {/* ── Hero ── full-bleed image, museum data card sits beside it on desktop */}
      <section
        className="work-hero"
        style={{ paddingTop: '120px', paddingBottom: 'var(--space-2xl)' }}
      >
        <div className="container work-hero-grid">
          {/* Image — receives the shared element morph from the grid */}
          <div className="work-hero-image-wrap">
            <img
              src={work.imageSrc}
              alt={work.title}
              className="work-hero-image"
              style={{ viewTransitionName: `work-${work.slug}` } as React.CSSProperties}
            />
          </div>

          {/* Museum-card data block */}
          <div className="work-hero-meta">
            <a href="/portfolio" className="label work-back-link">
              ← Works
            </a>

            <span className="label" style={{ marginTop: 'var(--space-md)', display: 'block' }}>
              {work.category}
            </span>

            <h1 className="display-lg mt-sm">{work.title}</h1>

            <RedStripe variant="paint" width="60px" delay={0.15} style={{ marginTop: 'var(--space-sm)' }} />

            {work.description && (
              <p className="body-lg mt-md" style={{ maxWidth: '440px' }}>
                {work.description}
              </p>
            )}

            {/* Spec table */}
            <dl className="work-spec">
              {work.medium && (
                <>
                  <dt>Medium</dt>
                  <dd>{work.medium}</dd>
                </>
              )}
              {work.dimensions && (
                <>
                  <dt>Dimensions</dt>
                  <dd>{work.dimensions}</dd>
                </>
              )}
              {work.edition && (
                <>
                  <dt>Edition</dt>
                  <dd>{work.edition}</dd>
                </>
              )}
              {work.year && (
                <>
                  <dt>Year</dt>
                  <dd>{work.year}</dd>
                </>
              )}
              {work.availability && (
                <>
                  <dt>Status</dt>
                  <dd>
                    <span className={`work-availability ${work.availability}`}>
                      {AVAILABILITY_LABEL[work.availability]}
                    </span>
                  </dd>
                </>
              )}
              {work.price && (
                <>
                  <dt>Price</dt>
                  <dd
                    style={{
                      color: 'var(--stripe)',
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.4rem',
                      letterSpacing: '-0.005em',
                    }}
                  >
                    {work.price}
                  </dd>
                </>
              )}
            </dl>

            <div className="work-cta-row">
              {work.availability !== 'sold' && (
                <a
                  href={work.storeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-solid btn-magnetic"
                >
                  Acquire
                </a>
              )}
              <a href="/contact" className="btn-outline btn-magnetic">
                Inquire
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related works ── */}
      {related.length > 0 && (
        <section
          className="section-lg"
          style={{ background: 'var(--bg-secondary)' }}
        >
          <ScrollReveal>
            <div className="container" style={{ marginBottom: 'var(--space-lg)' }}>
              <span className="label mb-sm" style={{ display: 'block' }}>
                Also in {work.category}
              </span>
              <h2 className="display-md">More from this room</h2>
              <RedStripe variant="divider" width="100%" thickness={1} style={{ marginTop: 'var(--space-sm)' }} />
            </div>
          </ScrollReveal>

          <div className="perspective-container">
            <div className="portfolio-grid">
              {related.map((item, i) => (
                <ArtCard3D key={item.slug} {...item} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
