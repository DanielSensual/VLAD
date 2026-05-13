import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'The Story — J.VLADIMIR',
  description:
    'Over two decades of work. From the streets of New York to international exhibitions. The camera was the beginning. The Stripe is the statement.',
};

export default function StoryPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section
        className="full-bleed"
        style={{ minHeight: '60vh' }}
      >
        <img
          src="/photography/ballet-red.jpg"
          alt="J.Vladimir — Movement and the Red Stripe"
          className="full-bleed-image"
          loading="eager"
        />
        <div className="full-bleed-overlay" />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <span className="label" style={{ display: 'block', marginBottom: 'var(--space-sm)' }}>
            About
          </span>
          <h1 className="display-xl">The Story</h1>
        </div>
      </section>

      {/* Artist Statement */}
      <section className="section-lg">
        <div className="container-narrow">
          <span className="label mb-md" style={{ display: 'block' }}>
            Photographer & Artist
          </span>
          <h2 className="display-lg">I am J. Vladimir</h2>
          <div className="stripe-divider mt-md mb-md" />

          <p className="body-lg">
            An innovative artist seamlessly blending the world of editorial
            fashion photography with the vibrant allure of modern pop art. With
            a relentless passion for both crafts, I&apos;ve embarked on an
            exhilarating journey to fuse splatter drip paint and photos,
            ushering forth a breathtaking realm of creativity that ignites the
            senses of deconstructive conversation art.
          </p>
        </div>
      </section>

      {/* The Journey */}
      <section
        className="section-lg"
        style={{ background: 'var(--bg-secondary)' }}
      >
        <div className="container-narrow">
          <span className="label mb-md" style={{ display: 'block' }}>
            Our Story
          </span>
          <h2 className="display-md">Two Decades of Vision</h2>
          <div className="stripe-divider mt-md mb-md" />

          <p className="body-lg">
            For over two decades, J. Vladimir has pursued a singular mission: to
            create work that does more than capture a moment. His journey began
            in New York City, one of the most competitive creative landscapes in
            the world. Initially arriving with aspirations of becoming a
            supermodel, he quickly discovered that his true calling was not in
            front of the camera, but behind it.
          </p>

          <p className="body-lg mt-md">
            Armed with a modest Nikon camera and an unshakable belief in his own
            potential, he immersed himself in the city&apos;s rhythm, studying
            light, movement, and the psychology of image. Working backstage
            within the modeling industry, he developed a refined understanding of
            authenticity. He learned that while anyone can take a photograph, not
            everyone can give it presence.
          </p>
        </div>
      </section>

      {/* The Red Stripe */}
      <section className="section-lg">
        <div className="container-narrow">
          <span className="label mb-md" style={{ display: 'block' }}>
            The Evolution
          </span>
          <h2 className="display-lg">The Red Stripe</h2>
          <div className="stripe-divider mt-md mb-md" />

          <p className="body-lg">
            The introduction of the Red Stripe marked a defining transformation
            in his work. What began as a visual disruption became a signature
            philosophy. Placed boldly across the eyes of his subjects, the
            stripe does not conceal identity.
          </p>

          <blockquote
            className="mt-lg text-italic"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              borderLeft: '1px solid var(--stripe)',
              paddingLeft: 'var(--space-md)',
            }}
          >
            &ldquo;In a culture consumed with visibility and validation, it
            invites the viewer to look beyond surface and question what they
            project onto the image. The stripe represents tension and power.
            Luxury and rebellion. Anonymity and recognition. It is both
            interruption and elevation.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* A Fusion of Mediums */}
      <section
        className="section-lg"
        style={{ background: 'var(--bg-secondary)' }}
      >
        <div className="container-narrow">
          <span className="label mb-md" style={{ display: 'block' }}>
            The Work
          </span>
          <h2 className="display-md">A Fusion of Mediums</h2>
          <div className="stripe-divider mt-md mb-md" />

          <p className="body-lg">
            J. Vladimir&apos;s work now exists at the intersection of
            photography and contemporary pop-art expression. Through layered
            textures, vibrant paint splashes, resin finishes, and dimensional
            elements, each piece transcends traditional portraiture.
          </p>

          <p className="body-lg mt-md">
            His art has opened doors to curated pop-up exhibitions, museum
            showcases, and exclusive celebrity commissions. Collectors are drawn
            not only to the aesthetic, but to the philosophy embedded within
            each piece. Every work is intentional. Every detail is deliberate.
            Every stripe carries meaning.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-lg">
        <div className="container-narrow text-center">
          <span className="label mb-md" style={{ display: 'block' }}>
            Philosophy
          </span>
          <h2 className="display-md">
            Art should not exist quietly.
          </h2>
          <div className="stripe-divider-center mt-md mb-md" />
          <p className="body-lg" style={{ maxWidth: '600px', margin: '0 auto' }}>
            It should provoke conversation. It should challenge comfort. It
            should hold cultural relevance while remaining timeless. Through his
            fusion of photography and contemporary art, he has created a body of
            work that is both visually striking and intellectually remarkable.
          </p>

          <p
            className="mt-lg"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
              color: 'var(--text-secondary)',
              fontStyle: 'italic',
            }}
          >
            The camera was the beginning. The Stripe is the statement.
            <br />
            The movement is just beginning.
          </p>

          <div style={{ marginTop: 'var(--space-lg)' }}>
            <a href="/contact" className="btn-outline">
              Work With J. Vladimir
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
