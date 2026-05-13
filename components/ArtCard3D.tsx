'use client';

import { useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

interface ArtCard3DProps {
  title: string;
  category: string;
  imageSrc: string;
  href: string;
  price?: string;
  index?: number;
}

export default function ArtCard3D({
  title,
  category,
  imageSrc,
  href,
  price,
  index = 0,
}: ArtCard3DProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-80px' });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const card = cardRef.current;
    const shine = shineRef.current;
    if (!card || !shine) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Tilt: max 8 degrees
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

    // Light reflection position
    const shineX = (x / rect.width) * 100;
    const shineY = (y / rect.height) * 100;
    shine.style.setProperty('--shine-x', `${shineX}%`);
    shine.style.setProperty('--shine-y', `${shineY}%`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  }, []);

  return (
    <motion.a
      ref={cardRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
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
      <img src={imageSrc} alt={title} loading="lazy" />

      {/* Light reflection layer */}
      <div ref={shineRef} className="art-card-3d-shine" />

      {/* Red Stripe across the piece */}
      <div className="art-card-3d-stripe" />

      {/* Hover overlay with info */}
      <div className="art-card-3d-overlay">
        <span className="label">{category}</span>
        <span
          className="display-md mt-xs"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {title}
        </span>
        {price && (
          <span
            className="label mt-xs"
            style={{ color: 'var(--stripe)' }}
          >
            {price}
          </span>
        )}
      </div>
    </motion.a>
  );
}
