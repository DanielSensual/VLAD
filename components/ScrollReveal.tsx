'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
  threshold?: number;
}

export default function ScrollReveal({
  children,
  className = '',
  stagger = false,
  threshold = 0.15,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add visible class to trigger CSS transition
            if (stagger) {
              // Reveal children one by one
              const children = entry.target.querySelectorAll('.reveal');
              children.forEach((child) => child.classList.add('visible'));
            } else {
              entry.target.classList.add('visible');
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -60px 0px' }
    );

    if (stagger) {
      observer.observe(container);
    } else {
      container.classList.add('reveal');
      observer.observe(container);
    }

    return () => observer.disconnect();
  }, [stagger, threshold]);

  return (
    <div
      ref={containerRef}
      className={`${stagger ? 'reveal-stagger' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
