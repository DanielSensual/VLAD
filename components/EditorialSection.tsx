'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface EditorialSectionProps {
  imageSrc: string;
  imageAlt: string;
  label?: string;
  heading: string;
  body: string;
  quote?: string;
  reversed?: boolean;
  cta?: { label: string; href: string };
}

const staggerChildren = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export default function EditorialSection({
  imageSrc,
  imageAlt,
  label,
  heading,
  body,
  quote,
  reversed = false,
  cta,
}: EditorialSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Ken Burns: subtle zoom + vertical shift on scroll
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <section
      ref={sectionRef}
      className={`editorial ${reversed ? 'editorial-reversed' : ''}`}
    >
      <div className="editorial-image" style={{ overflow: 'hidden' }}>
        <motion.img
          src={imageSrc}
          alt={imageAlt}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            scale: imageScale,
            y: imageY,
          }}
        />
      </div>

      <motion.div
        className="editorial-content"
        variants={staggerChildren}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {label && (
          <motion.span className="label mb-md" variants={fadeUp}>
            {label}
          </motion.span>
        )}
        <motion.h2 className="display-lg" variants={fadeUp}>
          {heading}
        </motion.h2>
        <motion.div
          className="stripe-divider mt-md mb-md"
          variants={{
            hidden: { scaleX: 0, opacity: 0 },
            visible: {
              scaleX: 1,
              opacity: 1,
              transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
            },
          }}
          style={{ transformOrigin: 'left' }}
        />
        <motion.p className="body-lg" variants={fadeUp}>
          {body}
        </motion.p>

        {quote && (
          <motion.blockquote
            className="mt-md text-italic stripe-border-glow"
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              paddingLeft: 'var(--space-md)',
            }}
          >
            &ldquo;{quote}&rdquo;
          </motion.blockquote>
        )}

        {cta && (
          <motion.a
            href={cta.href}
            className="btn-outline btn-magnetic mt-lg"
            variants={fadeUp}
          >
            {cta.label}
          </motion.a>
        )}
      </motion.div>
    </section>
  );
}
