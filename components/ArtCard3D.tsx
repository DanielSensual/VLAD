'use client';

import { useRef, useCallback, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Availability, Collection } from '@/lib/content';

export interface ArtCard3DProps {
  title: string;
  category: Collection | string;
  imageSrc: string;
  href: string;
  /** Slug — drives the shared-element view-transition-name. */
  slug?: string;
  price?: string;
  medium?: string;
  year?: number;
  dimensions?: string;
  edition?: string;
  availability?: Availability;
  index?: number;
}

const AVAILABILITY_LABEL: Record<Availability, string> = {
  available: 'Available',
  sold: 'Sold',
  inquire: 'Inquire',
};

export default function ArtCard3D({
  title,
  category,
  imageSrc,
  href,
  slug,
  price,
  medium,
  year,
  dimensions,
  edition,
  availability,
  index = 0,
}: ArtCard3DProps) {
  // External links (Shopify etc.) open in a new tab; internal /works/...
  // navigate in-page so the View Transition shared-element morph can run.
  const isExternal = /^https?:/.test(href);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-80px' });

  // Skip the tilt + shine wiring on touch devices — onMouseMove fires
  // once on tap and never resets, leaving the card stuck mid-tilt.
  const [hasHover, setHasHover] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setHasHover(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!hasHover) return;
    const card = cardRef.current;
    const shine = shineRef.current;
    if (!card || !shine) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

    const shineX = (x / rect.width) * 100;
    const shineY = (y / rect.height) * 100;
    shine.style.setProperty('--shine-x', `${shineX}%`);
    shine.style.setProperty('--shine-y', `${shineY}%`);
  }, [hasHover]);

  const handleMouseLeave = useCallback(() => {
    if (!hasHover) return;
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  }, [hasHover]);

  // Build the "medium · dimensions · year" metadata line, omitting empties.
  const metaLine = [medium, dimensions, year ? String(year) : null]
    .filter(Boolean)
    .join(' · ');

  return (
    <motion.a
      ref={cardRef}
      href={href}
      {...(isExternal
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {})}
      className="art-card-3d"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.9,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        transition: 'transform 0.15s ease-out, box-shadow 0.4s ease',
      }}
    >
      <img
        src={imageSrc}
        alt={title}
        loading="lazy"
        style={
          slug
            ? ({ viewTransitionName: `work-${slug}` } as React.CSSProperties)
            : undefined
        }
      />

      <div ref={shineRef} className="art-card-3d-shine" />
      <div className="art-card-3d-stripe" />

      <div className="art-card-3d-overlay">
        <div className="art-card-caption">
          <div className="art-card-caption-row">
            <span>{category}</span>
            {edition && <span>{edition}</span>}
          </div>

          <span className="art-card-caption-title">{title}</span>

          {metaLine && <span className="art-card-caption-meta">{metaLine}</span>}

          <div className="art-card-caption-rule" />

          <div
            className="art-card-caption-row"
            style={{ color: 'hsla(0, 0%, 100%, 0.85)' }}
          >
            {availability && (
              <span className={`art-card-caption-availability ${availability}`}>
                {AVAILABILITY_LABEL[availability]}
              </span>
            )}
            {price && (
              <span style={{ color: 'var(--stripe)' }}>{price}</span>
            )}
          </div>
        </div>
      </div>
    </motion.a>
  );
}
