'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export function StripeProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 35,
    mass: 0.4,
  });

  return (
    <motion.div
      style={{
        position: 'fixed',
        inset: '0 0 auto 0',
        height: 3,
        background: 'var(--stripe)',
        transformOrigin: '0% 50%',
        scaleX,
        zIndex: 200,
        pointerEvents: 'none',
        filter: 'drop-shadow(0 0 6px hsla(358,78%,46%,0.45))',
      }}
    />
  );
}

export function GrainOverlay() {
  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9998,
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.45'/></svg>")`,
        mixBlendMode: 'overlay',
        opacity: 0.06,
      }}
    />
  );
}

export function WetPaintFilters() {
  return (
    <svg
      style={{ position: 'fixed', width: 0, height: 0 }}
      aria-hidden
    >
      <defs>
        <filter id="wet-paint" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9 0.4"
            numOctaves={2}
            seed={7}
          />
          <feDisplacementMap in="SourceGraphic" scale={3} />
        </filter>
      </defs>
    </svg>
  );
}
