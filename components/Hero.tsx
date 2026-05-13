'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface HeroProps {
  imageSrc: string;
  title?: string;
  subtitle?: string;
  showScroll?: boolean;
}

export default function Hero({
  imageSrc,
  title = 'J.Vladimir',
  subtitle = 'Artist. Photographer. Design.',
  showScroll = true,
}: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Parallax on scroll
  useEffect(() => {
    const onScroll = () => {
      if (!imageRef.current || !textRef.current) return;
      const y = window.scrollY;
      imageRef.current.style.transform = `translateY(${y * 0.3}px) scale(1.1)`;
      textRef.current.style.transform = `translateY(${y * 0.15}px)`;
      textRef.current.style.opacity = `${Math.max(0, 1 - y / 600)}`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Subtle mouse parallax on title
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setMouseOffset({
        x: ((e.clientX - cx) / cx) * 8,
        y: ((e.clientY - cy) / cy) * 5,
      });
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <section className="full-bleed" id="hero" ref={heroRef}>
      <img
        ref={imageRef}
        src={imageSrc}
        alt={title}
        className="full-bleed-image"
        loading="eager"
        style={{ transform: 'scale(1.1)' }}
      />
      <div className="full-bleed-overlay" />

      {/* Ambient red glow behind title */}
      <motion.div
        className="hero-glow"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        style={{ zIndex: 1 }}
      />

      <div
        ref={textRef}
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          transform: `translate(${mouseOffset.x}px, ${mouseOffset.y}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        {/* Cinematic sequence: title fades in, then stripe sweeps, then subtitle */}
        <motion.h1
          className="display-xl"
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{ color: '#fff' }}
        >
          {title}
        </motion.h1>

        {/* The Red Stripe — animated sweep */}
        <span className="hero-stripe-line" />

        <motion.p
          className="label"
          style={{ color: 'hsla(0,0%,100%,0.7)', letterSpacing: '0.5em' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
        >
          {subtitle}
        </motion.p>
      </div>

      {showScroll && (
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <span className="label" style={{ fontSize: '0.55rem', color: 'hsla(0,0%,100%,0.5)' }}>
            Scroll
          </span>
          <div className="scroll-line" />
        </motion.div>
      )}
    </section>
  );
}
