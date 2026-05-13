'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { CSSProperties } from 'react';

type RedStripeVariant =
  /** Solid brush-stroke stripe, deckled edges via clip-path. */
  | 'paint'
  /** Soft gradient that fades at both ends — for dividers under headings. */
  | 'divider'
  /** Bold dripping stripe with wet-paint SVG displacement filter. */
  | 'wet';

export interface RedStripeProps {
  variant?: RedStripeVariant;
  /** CSS width (e.g. "120px", "60%", "100%"). */
  width?: string;
  /** Stripe thickness in pixels. */
  thickness?: number;
  /** Animate the stripe in from scale-x 0 → 1 when mounted. */
  animate?: boolean;
  /** Reveal delay in seconds. */
  delay?: number;
  /** Center horizontally with auto margins. */
  centered?: boolean;
  className?: string;
  style?: CSSProperties;
  /** Optional descriptive label for screen readers (default: decorative). */
  ariaLabel?: string;
}

/**
 * The Red Stripe — the brand element, never decoration.
 *
 * Renders as a stylized horizontal brush stroke using clip-path for
 * rough edges + gradient fill that mimics layered paint. The "wet"
 * variant pipes through the #wet-paint SVG filter declared once at
 * the root in components/AmbientEffects.tsx.
 */
export default function RedStripe({
  variant = 'paint',
  width = '120px',
  thickness = 3,
  animate = true,
  delay = 0,
  centered = false,
  className,
  style,
  ariaLabel,
}: RedStripeProps) {
  const reduce = useReducedMotion();

  const background =
    variant === 'divider'
      ? 'linear-gradient(90deg, transparent 0%, var(--stripe) 18%, var(--stripe-deep) 50%, var(--stripe) 82%, transparent 100%)'
      : variant === 'wet'
        ? 'linear-gradient(90deg, var(--stripe-deep) 0%, var(--stripe) 50%, var(--stripe-wet) 100%)'
        : 'linear-gradient(90deg, var(--stripe-deep) 4%, var(--stripe) 50%, var(--stripe-wet) 96%)';

  const filter = variant === 'wet' ? 'url(#wet-paint)' : undefined;

  /* Rough clip-path: irregular polygon that mimics a brush stroke,
   * thinner at the ends and bristle-frayed along the long edges.
   * Paint variant gets aggressive deckles; divider stays clean. */
  const clipPath =
    variant === 'divider'
      ? undefined
      : 'polygon(0% 40%, 2% 10%, 6% 30%, 12% 5%, 20% 45%, 28% 15%, 38% 35%, 48% 5%, 58% 40%, 68% 10%, 78% 30%, 86% 5%, 94% 35%, 100% 20%, 100% 75%, 96% 95%, 90% 70%, 82% 95%, 74% 65%, 66% 95%, 56% 70%, 46% 100%, 36% 65%, 28% 95%, 20% 60%, 12% 95%, 6% 70%, 2% 95%, 0% 60%)';

  const initialScale = animate && !reduce ? 0 : 1;

  return (
    <motion.span
      role={ariaLabel ? 'img' : 'presentation'}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
      className={className}
      initial={{ scaleX: initialScale, opacity: animate && !reduce ? 0 : 1 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: reduce ? 0 : 0.9,
        delay: reduce ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        display: 'block',
        width,
        height: `${thickness}px`,
        background,
        filter,
        clipPath,
        transformOrigin: 'left center',
        margin: centered ? '0 auto' : undefined,
        ...style,
      }}
    />
  );
}
