'use client';

import { useEffect, useState } from 'react';
import { navItems } from '@/lib/content';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
        <a
          href="/"
          className="header-logo"
          style={{ color: scrolled ? 'var(--text-primary)' : '#fff', transition: 'color 0.4s ease' }}
        >
          J.Vladimir
        </a>

        <div className="header-right">
          <a
            href="/contact"
            className="label"
            style={{
              color: 'var(--text-muted)',
              transition: 'color var(--duration-fast)',
              display: 'none',
            }}
          >
            Inquire
          </a>

          <button
            className="hamburger"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation"
            aria-expanded={menuOpen}
          >
            <span className="hamburger-line" style={{ background: scrolled ? 'var(--text-primary)' : '#fff', transition: 'background 0.4s ease' }} />
            <span className="hamburger-line" style={{ background: scrolled ? 'var(--text-primary)' : '#fff', transition: 'background 0.4s ease' }} />
          </button>
        </div>
      </header>

      {/* Full-Screen Menu */}
      <div
        className={`menu-overlay ${menuOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!menuOpen}
      >
        <button
          className="menu-close"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          Close
        </button>

        <nav className="menu-nav">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="menu-link"
              onClick={() => setMenuOpen(false)}
              {...(item.external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="menu-footer">
          <span className="label">Orlando · Miami · NYC</span>
          <a href="mailto:mail@jvladimir.com" className="label" style={{ color: 'var(--text-secondary)' }}>
            mail@jvladimir.com
          </a>
        </div>
      </div>
    </>
  );
}
