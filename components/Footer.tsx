import { navItems, siteConfig } from '@/lib/content';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">J.Vladimir &amp; Company</div>
            <p className="body-sm mt-sm">{siteConfig.tagline}</p>
          </div>

          <div className="footer-links">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="footer-link"
                {...(item.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">
            &copy; {new Date().getFullYear()} J.Vladimir &amp; Company. All
            Rights Reserved.
          </span>

          <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center' }}>
            <span className="footer-copy">
              {siteConfig.locations.join(' · ')}
            </span>
            <a href={`mailto:${siteConfig.email}`} className="footer-link">
              {siteConfig.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
