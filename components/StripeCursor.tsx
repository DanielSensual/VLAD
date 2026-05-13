'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

const SPRING = { damping: 28, stiffness: 380, mass: 0.4 };

export default function StripeCursor() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, SPRING);
  const sy = useSpring(my, SPRING);
  const w = useSpring(8, { damping: 22, stiffness: 260 });
  const h = useSpring(8, { damping: 22, stiffness: 260 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    setVisible(true);
    document.body.style.cursor = 'none';

    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (
        target?.closest?.('[data-stripe-target]') ||
        target?.closest?.('.art-card-3d') ||
        target?.closest?.('.portfolio-item')
      ) {
        // Become the stripe
        w.set(96);
        h.set(5);
      } else if (
        target?.closest?.('a') ||
        target?.closest?.('button')
      ) {
        // Enlarge on interactive
        w.set(14);
        h.set(14);
      } else {
        w.set(8);
        h.set(8);
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });

    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
    };
  }, [mx, my, w, h]);

  if (!visible) return null;

  return (
    <motion.div
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        x: sx,
        y: sy,
        translateX: '-50%',
        translateY: '-50%',
        width: w,
        height: h,
        background: 'var(--stripe)',
        borderRadius: 1,
        mixBlendMode: 'difference',
        pointerEvents: 'none',
        zIndex: 99999,
        boxShadow: '0 0 14px hsla(358,78%,46%,0.4)',
      }}
    />
  );
}
