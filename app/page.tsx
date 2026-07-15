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
      {/* Packages — Client Proposal */}
      <section id="packages" className="section-lg" style={{ background: 'var(--bg-ink)', color: '#fff' }}>
        <ScrollReveal stagger>
          <div className="container text-center">
            <span className="label reveal" style={{ display: 'block', marginBottom: 'var(--space-sm)', color: 'var(--stripe)' }}>
              Website Packages
            </span>
            <h2 className="display-lg reveal" style={{ color: '#fff' }}>Choose Your Tier</h2>
            <RedStripe variant="wet" width="60px" centered thickness={3} style={{ margin: 'var(--space-md) auto' }} />
            <p className="body-lg reveal" style={{ maxWidth: '520px', margin: '0 auto var(--space-xl)', color: 'hsla(0,0%,100%,0.6)' }}>
              Select the package that fits your vision. Every tier includes the gallery-grade site you see here.
            </p>

            <div className="packages-grid reveal">
              {/* Tier 1 — Foundation */}
              <div className="package-card">
                <span className="label" style={{ color: 'var(--text-muted)' }}>Foundation</span>
                <div className="package-price">
                  <span className="package-amount">$1,500</span>
                  <span className="package-term">one-time</span>
                </div>
                <p className="package-tagline">Everything you see — delivered and live.</p>
                <RedStripe variant="divider" width="40px" centered thickness={2} style={{ margin: 'var(--space-sm) auto' }} />
                <ul className="package-features">
                  <li>Full portfolio site as built</li>
                  <li>20 artwork detail pages</li>
                  <li>Mobile-optimized gallery</li>
                  <li>3D tilt cards + lightbox viewer</li>
                  <li>GSAP horizontal gallery rail</li>
                  <li>Vercel deployment + domain handoff</li>
                  <li>SEO + Open Graph optimization</li>
                </ul>
                <div className="package-maintenance">
                  <span className="package-maintenance-price">+ $150<span style={{ fontSize: '0.7em', opacity: 0.6 }}>/mo</span></span>
                  <span style={{ fontSize: '0.7rem', color: 'hsla(0,0%,100%,0.4)' }}>Ongoing updates &amp; management</span>
                </div>
                <a href="https://buy.stripe.com/cNibJ1ffg8jD7OH7vWes00w" target="_blank" rel="noopener noreferrer" className="btn-outline btn-magnetic" style={{ width: '100%', marginTop: 'var(--space-md)' }}>
                  Select Foundation
                </a>
              </div>

              {/* Tier 2 — Commerce */}
              <div className="package-card package-card--featured">
                <span className="package-badge">Recommended</span>
                <span className="label" style={{ color: 'var(--stripe)' }}>Commerce</span>
                <div className="package-price">
                  <span className="package-amount">$3,500</span>
                  <span className="package-term">one-time</span>
                </div>
                <p className="package-tagline">Sell directly to collectors from your site.</p>
                <RedStripe variant="wet" width="40px" centered thickness={2} style={{ margin: 'var(--space-sm) auto' }} />
                <ul className="package-features">
                  <li>Everything in Foundation</li>
                  <li>Stripe payment integration</li>
                  <li>Shopify Storefront API — live inventory</li>
                  <li>Collector checkout flow</li>
                  <li>Client portal — order history &amp; inquiries</li>
                  <li>Contact form backend (Resend)</li>
                  <li>Analytics dashboard (GA4 + Vercel)</li>
                </ul>
                <div className="package-maintenance">
                  <span className="package-maintenance-price">+ $250<span style={{ fontSize: '0.7em', opacity: 0.6 }}>/mo</span></span>
                  <span style={{ fontSize: '0.7rem', color: 'hsla(0,0%,100%,0.4)' }}>Ongoing updates, inventory &amp; management</span>
                </div>
                <a href="https://buy.stripe.com/00w9AT7MO6bv0mf3fGes00x" target="_blank" rel="noopener noreferrer" className="btn-solid btn-magnetic" style={{ width: '100%', marginTop: 'var(--space-md)' }}>
                  Select Commerce
                </a>
              </div>

              {/* Tier 3 — Enterprise */}
              <div className="package-card">
                <span className="label" style={{ color: 'var(--gilt)' }}>Enterprise</span>
                <div className="package-price">
                  <span className="package-amount">$6,500</span>
                  <span className="package-term">one-time</span>
                </div>
                <p className="package-tagline">Your brand as a native mobile experience.</p>
                <RedStripe variant="divider" width="40px" centered thickness={2} style={{ margin: 'var(--space-sm) auto' }} />
                <ul className="package-features">
                  <li>Everything in Commerce</li>
                  <li>Native iOS app — Apple App Store</li>
                  <li>Push notifications for new drops</li>
                  <li>Offline gallery viewing</li>
                  <li>Exclusive in-app collector access</li>
                  <li>WebGL 3D artwork viewer</li>
                  <li>App Store submission &amp; approval</li>
                  <li>Priority support &amp; feature requests</li>
                </ul>
                <div className="package-maintenance">
                  <span className="package-maintenance-price">+ $500<span style={{ fontSize: '0.7em', opacity: 0.6 }}>/mo</span></span>
                  <span style={{ fontSize: '0.7rem', color: 'hsla(0,0%,100%,0.4)' }}>App updates, App Store fees &amp; management</span>
                </div>
                <a href="https://buy.stripe.com/eVq6oHd78dDXd91bMces00y" target="_blank" rel="noopener noreferrer" className="btn-outline btn-magnetic" style={{ width: '100%', marginTop: 'var(--space-md)', borderColor: 'var(--gilt)', color: 'var(--gilt)' }}>
                  Select Enterprise
                </a>
              </div>
            </div>

            <p className="reveal" style={{ marginTop: 'var(--space-xl)', fontSize: '0.75rem', color: 'hsla(0,0%,100%,0.35)', maxWidth: '560px', margin: 'var(--space-xl) auto 0' }}>
              All packages include source code ownership and Vercel hosting setup. Maintenance is optional but recommended for ongoing content updates, security patches, and performance monitoring. Additional developer hours available at <strong style={{ color: 'hsla(0,0%,100%,0.55)' }}>$200/hr</strong>.
            </p>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </>
  );
}
