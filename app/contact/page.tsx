import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RedStripe from '@/components/RedStripe';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Contact — J.VLADIMIR',
  description:
    'Commissions, private acquisitions, editorial bookings, press inquiries, and collector assistance. Direct from the artist studio.',
};

export default function ContactPage() {
  return (
    <>
      <Header />

      <section className="section-lg" style={{ paddingTop: '160px' }}>
        <ScrollReveal stagger>
          <div className="container-narrow">
            <div className="text-center">
              <span className="label mb-md reveal" style={{ display: 'block' }}>
                Inquiries
              </span>
              <h1 className="display-xl reveal">Contact</h1>
              <RedStripe variant="wet" width="60px" centered delay={0.2} style={{ margin: 'var(--space-md) auto' }} />
              <p className="body-lg reveal" style={{ maxWidth: '500px', margin: 'var(--space-md) auto 0' }}>
                Private acquisitions, custom commissions, editorial bookings,
                press inquiries, and collector assistance.
              </p>
            </div>

            <form
              className="reveal"
              style={{
                marginTop: 'var(--space-xl)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-md)',
              }}
              action="mailto:mail@jvladimir.com"
              method="POST"
              encType="text/plain"
            >
              {/* Inquiry Type */}
              <div>
                <label
                  className="label"
                  htmlFor="inquiry-type"
                  style={{ display: 'block', marginBottom: 'var(--space-xs)' }}
                >
                  Inquiry Type
                </label>
                <select
                  id="inquiry-type"
                  name="inquiry-type"
                  className="form-input"
                >
                  <option value="">Select...</option>
                  <option value="commission">Commission</option>
                  <option value="acquisition">Private Acquisition</option>
                  <option value="editorial">Editorial Booking</option>
                  <option value="press">Press / Media</option>
                  <option value="collector">Collector Assistance</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Name + Email row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-md)' }}>
                <div>
                  <label
                    className="label"
                    htmlFor="name"
                    style={{ display: 'block', marginBottom: 'var(--space-xs)' }}
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="form-input"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label
                    className="label"
                    htmlFor="email"
                    style={{ display: 'block', marginBottom: 'var(--space-xs)' }}
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-input"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label
                  className="label"
                  htmlFor="phone"
                  style={{ display: 'block', marginBottom: 'var(--space-xs)' }}
                >
                  Phone (optional)
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="form-input"
                  placeholder="+1 (000) 000-0000"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  className="label"
                  htmlFor="message"
                  style={{ display: 'block', marginBottom: 'var(--space-xs)' }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="form-input"
                  rows={5}
                  placeholder="Tell us about your project or inquiry..."
                  required
                />
              </div>

              <button type="submit" className="btn-solid btn-magnetic" style={{ alignSelf: 'flex-start' }}>
                Send Inquiry
              </button>
            </form>

            {/* Direct Contact */}
            <div
              className="reveal"
              style={{
                marginTop: 'var(--space-xl)',
                paddingTop: 'var(--space-lg)',
                borderTop: '1px solid var(--border-subtle)',
              }}
            >
              <span className="label mb-md" style={{ display: 'block' }}>
                Direct
              </span>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: 'var(--space-md)',
                }}
              >
                <div>
                  <p className="label" style={{ marginBottom: 'var(--space-xs)' }}>
                    Email
                  </p>
                  <a
                    href="mailto:mail@jvladimir.com"
                    style={{ color: 'var(--text-primary)', fontSize: '0.85rem' }}
                  >
                    mail@jvladimir.com
                  </a>
                </div>
                <div>
                  <p className="label" style={{ marginBottom: 'var(--space-xs)' }}>
                    Instagram
                  </p>
                  <a
                    href="https://www.instagram.com/j.vladimir/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--text-primary)', fontSize: '0.85rem' }}
                  >
                    @j.vladimir
                  </a>
                </div>
                <div>
                  <p className="label" style={{ marginBottom: 'var(--space-xs)' }}>
                    TikTok
                  </p>
                  <a
                    href="https://www.tiktok.com/@theredstripe"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--text-primary)', fontSize: '0.85rem' }}
                  >
                    @theredstripe
                  </a>
                </div>
                <div>
                  <p className="label" style={{ marginBottom: 'var(--space-xs)' }}>
                    Locations
                  </p>
                  <span style={{ color: 'var(--text-primary)', fontSize: '0.85rem' }}>
                    Orlando · Miami · NYC
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </>
  );
}
