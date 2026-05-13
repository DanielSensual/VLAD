import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RedStripe from '@/components/RedStripe';

export default function NotFound() {
  return (
    <>
      <Header />

      <section
        className="section-lg"
        style={{
          paddingTop: '200px',
          paddingBottom: '120px',
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="container-narrow text-center">
          <span className="label mb-md" style={{ display: 'block', color: 'var(--stripe)' }}>
            404
          </span>
          <h1 className="display-xl">Lost in the Gallery</h1>
          <RedStripe variant="wet" width="80px" centered delay={0.2} style={{ margin: 'var(--space-md) auto' }} />
          <p className="body-lg mt-md" style={{ maxWidth: '440px', margin: 'var(--space-md) auto 0' }}>
            This room doesn&apos;t exist yet — or it&apos;s been moved to a
            private viewing. Let&apos;s get you back to the work.
          </p>
          <div style={{ marginTop: 'var(--space-lg)', display: 'flex', gap: 'var(--space-sm)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/" className="btn-solid btn-magnetic">
              Return Home
            </a>
            <a href="/portfolio" className="btn-outline btn-magnetic">
              View Works
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
