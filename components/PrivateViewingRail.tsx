'use client';

import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import RedStripe from './RedStripe';
import type { PortfolioItem } from '@/lib/content';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface PrivateViewingRailProps {
  items: PortfolioItem[];
  /** Heading and eyebrow shown above the rail. */
  eyebrow?: string;
  heading?: string;
}

/**
 * Scroll-pinned horizontal gallery — "Private Viewing Rail."
 *
 * On desktop (matchMedia "(hover: hover) and (min-width: 901px)"),
 * GSAP pins the section to the viewport and translates the rail
 * horizontally while the user continues to scroll vertically.
 *
 * On touch / narrow screens, falls back to a native horizontal
 * scroll-snap strip — no GSAP, no pinning, no math.
 *
 * Respects prefers-reduced-motion: the pin is skipped and the rail
 * collapses to a regular wrapped flex layout.
 */
export default function PrivateViewingRail({
  items,
  eyebrow = 'Private Viewing',
  heading = 'The Rail',
}: PrivateViewingRailProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(
      '(hover: hover) and (pointer: fine) and (min-width: 901px)',
    );
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useGSAP(
    () => {
      if (!isDesktop) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const rail = railRef.current;
      const section = sectionRef.current;
      if (!rail || !section) return;

      // Total horizontal travel = rail width minus viewport width.
      const getTravel = () =>
        Math.max(0, rail.scrollWidth - window.innerWidth + 64);

      const tween = gsap.to(rail, {
        x: () => -getTravel(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getTravel()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: sectionRef, dependencies: [isDesktop, items.length] },
  );

  return (
    <section
      ref={sectionRef}
      className={`viewing-rail ${isDesktop ? 'viewing-rail-pinned' : 'viewing-rail-scroll'}`}
    >
      <div className="viewing-rail-header">
        <div>
          <span className="label">{eyebrow}</span>
          <h2 className="display-lg mt-xs">{heading}</h2>
        </div>
        <RedStripe variant="paint" width="100px" delay={0.2} style={{ marginTop: 'var(--space-sm)' }} />
      </div>

      <div className="viewing-rail-track">
        <div ref={railRef} className="viewing-rail-inner">
          {items.map((item, i) => (
            <a
              key={item.slug}
              href={item.href}
              className="viewing-rail-card"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="viewing-rail-card-image">
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  loading={i < 2 ? 'eager' : 'lazy'}
                />
                <div className="viewing-rail-card-stripe" />
              </div>
              <div className="viewing-rail-card-meta">
                <span className="label">{item.category}</span>
                <h3 className="viewing-rail-card-title">{item.title}</h3>
                {item.price && (
                  <span
                    className="label"
                    style={{ color: 'var(--stripe)', marginTop: '0.35rem' }}
                  >
                    {item.price}
                  </span>
                )}
              </div>
            </a>
          ))}

          {/* Tail card — invitation to view all */}
          <a href="/portfolio" className="viewing-rail-card viewing-rail-card-tail">
            <div className="viewing-rail-card-meta" style={{ alignItems: 'center', textAlign: 'center', justifyContent: 'center', height: '100%' }}>
              <span className="label">The Vault</span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.2rem',
                  fontWeight: 320,
                  marginTop: 'var(--space-sm)',
                  letterSpacing: '-0.01em',
                }}
              >
                View all works
              </span>
              <RedStripe variant="paint" width="60px" centered style={{ marginTop: 'var(--space-md)' }} />
              <span className="label mt-md">→</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
