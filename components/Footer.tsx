export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">J.Vladimir &amp; Company</div>
            <p className="body-sm mt-sm">
              Artist. Photographer. Design.
            </p>
          </div>

          <div className="footer-links">
            <a href="/portfolio" className="footer-link">
              Portfolio
            </a>
            <a href="/story" className="footer-link">
              Story
            </a>
            <a href="/contact" className="footer-link">
              Contact
            </a>
            <a
              href="https://jvladimir.store"
              className="footer-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Shop
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">
            &copy; {new Date().getFullYear()} J.Vladimir &amp; Company. All
            Rights Reserved.
          </span>

          <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center' }}>
            <span className="footer-copy">Orlando · Miami · NYC</span>
            <a
              href="mailto:mail@jvladimir.com"
              className="footer-link"
            >
              mail@jvladimir.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
