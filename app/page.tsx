import Header from '@/components/Header';
import Hero from '@/components/Hero';
import EditorialSection from '@/components/EditorialSection';
import PrivateViewingRail from '@/components/PrivateViewingRail';
import RedStripe from '@/components/RedStripe';
import ScrollReveal from '@/components/ScrollReveal';
import Footer from '@/components/Footer';
import { portfolioItems, clients } from '@/lib/content';

export default function HomePage() {
  return (
    <>
      <Header />

      {/* Hero — Full-bleed cinematic with parallax */}
      <Hero
        imageSrc="/hero-banner.avif"
        title="J.Vladimir"
        subtitle="Artist. Photographer. Design."
      />

      {/* Client Trust Strip */}
      <section
        className="section"
        style={{ borderBottom: '1px solid var(--border-subtle)' }}
      >
        <ScrollReveal stagger>
          <div className="container text-center">
            <span className="label reveal" style={{ marginBottom: 'var(--space-md)', display: 'block' }}>
              Trusted By
            </span>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 'var(--space-lg)',
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              {clients.map((client) => (
                <span
                  key={client}
                  className="reveal"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.6rem',
                    fontWeight: 500,
                    letterSpacing: '0.35em',
                    textTransform: 'uppercase' as const,
                    color: 'var(--text-muted)',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {client}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* The Stripe — Editorial Section */}
      <EditorialSection
        imageSrc="/photography/stripe-portrait.jpg"
        imageAlt="The Red Stripe — J.Vladimir's signature motif across her eyes"
        label="The Signature"
        heading="The Red Stripe"
        body="Placed boldly across the eyes of his subjects, the stripe does not conceal identity — it invites the viewer to look beyond surface and question what they project onto the image. The stripe represents tension and power. Luxury and rebellion. Anonymity and recognition."
        quote="I don't finish my art on purpose. The final meaning doesn't belong to me. It belongs to you."
        cta={{ label: 'Read the Full Story', href: '/story' }}
      />

      {/* Selected Works — Private Viewing Rail (GSAP pinned horizontal) */}
      <PrivateViewingRail
        items={portfolioItems.slice(0, 12)}
        eyebrow="The Private Viewing"
        heading="Selected Works"
      />

      <EditorialSection
        imageSrc="/portfolio/rabbits/golden-goose.png"
        imageAlt="Red Stripe Rabbit — Golden Goose"
        label="Start Collecting"
        heading="From $777 to $15,000"
        body="Limited-edition Red Stripe sculptures and one-of-one mixed-media originals. Hand-finished contemporary pop-art works built with layered paint, resin, sculpture, and the signature Red Stripe. Available as 77-piece rabbit editions and one-of-one gallery-scale originals."
        reversed
        cta={{ label: 'Enter the Vault', href: '/collect' }}
      />

      {/* Manifesto */}
      <section className="section-lg" style={{ background: 'var(--bg-ink)', color: '#fff' }}>
        <ScrollReveal stagger>
          <div className="container-narrow text-center">
            <blockquote className="reveal" style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 3vw, 2.8rem)',
              fontWeight: 280,
              fontVariationSettings: "'opsz' 72",
              lineHeight: 1.3,
              fontStyle: 'italic',
              color: 'hsla(0,0%,100%,0.85)',
              maxWidth: '700px',
              margin: '0 auto',
            }}>
              &ldquo;When you think you recognize the subject, it&apos;s because the stripe asked you to finish the work.&rdquo;
            </blockquote>
            <RedStripe variant="wet" width="60px" centered thickness={3} style={{ margin: 'var(--space-md) auto' }} />
            <span className="label reveal" style={{ color: 'hsla(0,0%,100%,0.4)' }}>J. Vladimir</span>
          </div>
        </ScrollReveal>
      </section>

      {/* Contact CTA */}
      <section className="section-lg" style={{ background: 'var(--bg-secondary)' }}>
        <ScrollReveal stagger>
          <div className="container-narrow text-center">
            <span className="label mb-md reveal" style={{ display: 'block' }}>
              Commissions & Inquiries
            </span>
            <h2 className="display-lg reveal">Let&apos;s Create Something</h2>
            <RedStripe variant="wet" width="60px" centered thickness={3} style={{ margin: 'var(--space-md) auto' }} />
            <p className="body-lg mt-md reveal" style={{ maxWidth: '500px', margin: 'var(--space-md) auto 0' }}>
              Private acquisitions, custom commissions, editorial bookings, and
              collector inquiries.
            </p>
            <div className="reveal" style={{ marginTop: 'var(--space-lg)', display: 'flex', gap: 'var(--space-sm)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/contact" className="btn-solid btn-magnetic">
                Get in Touch
              </a>
              <a href="mailto:mail@jvladimir.com" className="btn-outline btn-magnetic">
                mail@jvladimir.com
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </>
  );
}
