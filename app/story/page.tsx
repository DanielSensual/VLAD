import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RedStripe from '@/components/RedStripe';
import EditorialSection from '@/components/EditorialSection';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'The Stripe — J.VLADIMIR',
  description:
    'Over two decades of work. From the streets of New York to international exhibitions. The camera was the beginning. The Stripe is the statement.',
};

export default function StoryPage() {
  return (
    <>
      <Header />

      {/* Hero — Full-bleed with stripe portrait */}
      <section
        className="full-bleed"
        style={{ minHeight: '65vh' }}
      >
        <img
          src="/photography/stripe-portrait.jpg"
          alt="J.Vladimir — The Red Stripe across her eyes, editorial blue light"
          className="full-bleed-image"
          loading="eager"
        />
        <div className="full-bleed-overlay" />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <span className="label" style={{ display: 'block', marginBottom: 'var(--space-sm)', color: 'hsla(0,0%,100%,0.6)' }}>
            The Philosophy
          </span>
          <h1 className="display-xl" style={{ color: '#fff' }}>The Stripe</h1>
          <RedStripe variant="paint" width="80px" centered delay={0.4} style={{ marginTop: 'var(--space-md)' }} />
        </div>
      </section>

      {/* Artist Statement */}
      <section className="section-lg">
        <ScrollReveal stagger>
          <div className="container-narrow">
            <span className="label mb-md reveal" style={{ display: 'block' }}>
              Photographer & Artist
            </span>
            <h2 className="display-lg reveal">I am J. Vladimir</h2>
            <RedStripe variant="divider" width="100%" thickness={1} style={{ margin: 'var(--space-md) 0' }} />

            <p className="body-lg reveal">
              An innovative artist seamlessly blending the world of editorial
              fashion photography with the vibrant allure of modern pop art. With
              a relentless passion for both crafts, I&apos;ve embarked on an
              exhilarating journey to fuse splatter drip paint and photos,
              ushering forth a breathtaking realm of creativity that ignites the
              senses of deconstructive conversation art.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* The Journey — JV himself, the Red Stripe across his eyes */}
      <EditorialSection
        imageSrc="/vlad-portrait-tux.avif"
        imageAlt="J.Vladimir — the artist, with the Red Stripe across his eyes"
        label="Our Story"
        heading="Two Decades of Vision"
        body="For over two decades, J. Vladimir has pursued a singular mission: to create work that does more than capture a moment. His journey began in New York City, one of the most competitive creative landscapes in the world. Initially arriving with aspirations of becoming a supermodel, he quickly discovered that his true calling was not in front of the camera, but behind it."
        quote="Armed with a modest Nikon camera and an unshakable belief in his own potential, he immersed himself in the city's rhythm, studying light, movement, and the psychology of image."
      />

      {/* The Red Stripe — Manifesto in ink */}
      <section className="section-lg" style={{ background: 'var(--bg-ink)', color: '#fff' }}>
        <ScrollReveal stagger>
          <div className="container-narrow">
            <span className="label mb-md reveal" style={{ display: 'block', color: 'var(--stripe)' }}>
              The Evolution
            </span>
            <h2 className="display-lg reveal" style={{ color: '#fff' }}>The Red Stripe</h2>
            <RedStripe variant="wet" width="80px" delay={0.2} style={{ margin: 'var(--space-md) 0' }} />

            <p className="body-lg reveal" style={{ color: 'hsla(0,0%,100%,0.8)' }}>
              The introduction of the Red Stripe marked a defining transformation
              in his work. What began as a visual disruption became a signature
              philosophy. Placed boldly across the eyes of his subjects, the
              stripe does not conceal identity.
            </p>

            <blockquote
              className="reveal"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
                color: 'hsla(0,0%,100%,0.85)',
                lineHeight: 1.5,
                borderLeft: '3px solid var(--stripe)',
                paddingLeft: 'var(--space-md)',
                marginTop: 'var(--space-lg)',
                fontStyle: 'italic',
                fontWeight: 280,
                fontVariationSettings: "'opsz' 72",
              }}
            >
              &ldquo;In a culture consumed with visibility and validation, it
              invites the viewer to look beyond surface and question what they
              project onto the image. The stripe represents tension and power.
              Luxury and rebellion. Anonymity and recognition. It is both
              interruption and elevation.&rdquo;
            </blockquote>
          </div>
        </ScrollReveal>
      </section>

      {/* A Fusion of Mediums — Editorial with ballet */}
      <EditorialSection
        imageSrc="/photography/ballet-elegant.jpg"
        imageAlt="Elegant ballet portrait by J.Vladimir"
        label="The Work"
        heading="A Fusion of Mediums"
        body="J. Vladimir's work now exists at the intersection of photography and contemporary pop-art expression. Through layered textures, vibrant paint splashes, resin finishes, and dimensional elements, each piece transcends traditional portraiture. His art has opened doors to curated pop-up exhibitions, museum showcases, and exclusive celebrity commissions."
        reversed
      />

      {/* Commercial Work — Calvin Klein */}
      <EditorialSection
        imageSrc="/photography/calvin-klein.jpg"
        imageAlt="Calvin Klein commercial photography by J.Vladimir"
        label="Commercial"
        heading="Nike. Disney. Calvin Klein."
        body="Trusted by some of the world's most recognized brands, J. Vladimir brings his editorial eye and painterly instinct to commercial campaigns. From luxury fashion to cultural partnerships, his lens transforms brand storytelling into art."
      />

      {/* Philosophy — centered closer */}
      <section className="section-lg">
        <ScrollReveal stagger>
          <div className="container-narrow text-center">
            <span className="label mb-md reveal" style={{ display: 'block' }}>
              Philosophy
            </span>
            <h2 className="display-md reveal">
              Art should not exist quietly.
            </h2>
            <RedStripe variant="wet" width="60px" centered delay={0.1} style={{ margin: 'var(--space-md) auto' }} />
            <p className="body-lg reveal" style={{ maxWidth: '600px', margin: 'var(--space-md) auto 0' }}>
              It should provoke conversation. It should challenge comfort. It
              should hold cultural relevance while remaining timeless. Through his
              fusion of photography and contemporary art, he has created a body of
              work that is both visually striking and intellectually remarkable.
            </p>

            <p
              className="reveal"
              style={{
                marginTop: 'var(--space-lg)',
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
                color: 'var(--text-secondary)',
                fontStyle: 'italic',
                fontWeight: 280,
                fontVariationSettings: "'opsz' 72",
              }}
            >
              The camera was the beginning. The Stripe is the statement.
              <br />
              The movement is just beginning.
            </p>

            <div className="reveal" style={{ marginTop: 'var(--space-lg)' }}>
              <a href="/contact" className="btn-solid btn-magnetic">
                Work With J. Vladimir
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </>
  );
}
