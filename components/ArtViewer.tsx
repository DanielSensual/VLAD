'use client';

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { PortfolioItem } from '@/lib/content';

interface ArtViewerProps {
  items: PortfolioItem[];
  /** Currently-open index, or null when closed. */
  openIndex: number | null;
  onClose: () => void;
  onIndexChange: (next: number) => void;
}

/**
 * Full-screen lightbox for browsing works.
 *
 * Pinch-zoom via two-pointer tracking, swipe-to-paginate via horizontal
 * drag, double-tap to toggle 1× ↔ 2× zoom, ESC / overlay click / chevron
 * buttons to close or paginate. Works on touch and pointer-fine alike.
 */
export default function ArtViewer({
  items,
  openIndex,
  onClose,
  onIndexChange,
}: ArtViewerProps) {
  const open = openIndex !== null;
  const current = open ? items[openIndex] : null;

  // ── Zoom + pan state ───────────────────────────────────────────────
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  // Active pointers — keyed by pointerId. We track up to two for pinch.
  const pointersRef = useRef<Map<number, { x: number; y: number }>>(new Map());
  // Snapshot of the pinch baseline (distance + midpoint + starting scale).
  const pinchRef = useRef<{
    startDist: number;
    startScale: number;
    startPan: { x: number; y: number };
    midpoint: { x: number; y: number };
  } | null>(null);
  // Snapshot of single-pointer drag (for swipe-to-paginate when zoomed out).
  const dragRef = useRef<{
    startX: number;
    startY: number;
    startPan: { x: number; y: number };
  } | null>(null);
  // For double-tap detection.
  const lastTapRef = useRef(0);

  // Reset zoom whenever we change images or close.
  const resetTransform = useCallback(() => {
    setScale(1);
    setPan({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    resetTransform();
  }, [openIndex, resetTransform]);

  // ── Keyboard ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight' && openIndex! < items.length - 1)
        onIndexChange(openIndex! + 1);
      else if (e.key === 'ArrowLeft' && openIndex! > 0)
        onIndexChange(openIndex! - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, openIndex, items.length, onClose, onIndexChange]);

  // ── Scroll lock while open ────────────────────────────────────────
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // ── Pointer / pinch handlers ──────────────────────────────────────
  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointersRef.current.size === 2) {
      // Begin pinch.
      const [a, b] = Array.from(pointersRef.current.values());
      pinchRef.current = {
        startDist: distance(a, b),
        startScale: scale,
        startPan: pan,
        midpoint: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 },
      };
      dragRef.current = null;
    } else if (pointersRef.current.size === 1) {
      // Begin drag.
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        startPan: pan,
      };

      // Double-tap detection (touch / pen only — wheel + click on desktop is enough).
      if (e.pointerType !== 'mouse') {
        const now = Date.now();
        if (now - lastTapRef.current < 280) {
          // Toggle zoom 1× ↔ 2×, centered on tap point.
          if (scale > 1.05) resetTransform();
          else setScale(2);
          lastTapRef.current = 0;
        } else {
          lastTapRef.current = now;
        }
      }
    }
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointersRef.current.has(e.pointerId)) return;
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointersRef.current.size === 2 && pinchRef.current) {
      const [a, b] = Array.from(pointersRef.current.values());
      const dist = distance(a, b);
      const nextScale = clamp(
        pinchRef.current.startScale * (dist / pinchRef.current.startDist),
        1,
        4,
      );
      setScale(nextScale);
    } else if (pointersRef.current.size === 1 && dragRef.current) {
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      if (scale > 1.05) {
        // Pan the image when zoomed.
        setPan({
          x: dragRef.current.startPan.x + dx,
          y: dragRef.current.startPan.y + dy,
        });
      } else {
        // Track the horizontal swipe so the image follows the finger.
        setPan({ x: dx, y: 0 });
      }
    }
  };

  const onPointerEnd = (e: ReactPointerEvent<HTMLDivElement>) => {
    pointersRef.current.delete(e.pointerId);

    // Pinch ended.
    if (pinchRef.current && pointersRef.current.size < 2) {
      pinchRef.current = null;
    }

    // Single-pointer release — decide paginate vs reset.
    if (pointersRef.current.size === 0 && dragRef.current) {
      if (scale <= 1.05) {
        const dx = pan.x;
        const threshold = 80;
        if (dx > threshold && openIndex! > 0) {
          onIndexChange(openIndex! - 1);
        } else if (dx < -threshold && openIndex! < items.length - 1) {
          onIndexChange(openIndex! + 1);
        }
        setPan({ x: 0, y: 0 });
      }
      dragRef.current = null;
    }
  };

  // ── Desktop wheel zoom ────────────────────────────────────────────
  const onWheel = (e: ReactWheelEvent<HTMLDivElement>) => {
    if (!e.ctrlKey && !e.metaKey) return;
    e.preventDefault();
    setScale((s) => clamp(s + (e.deltaY < 0 ? 0.15 : -0.15), 1, 4));
  };

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          className="art-viewer"
          role="dialog"
          aria-modal="true"
          aria-label={`Viewing ${current.title}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          {/* Top bar */}
          <div className="art-viewer-bar">
            <div>
              <span className="label" style={{ color: 'hsla(0,0%,100%,0.6)' }}>
                {current.category} · {openIndex! + 1} / {items.length}
              </span>
              <h2 className="art-viewer-title">{current.title}</h2>
            </div>
            <button
              className="art-viewer-close"
              onClick={onClose}
              aria-label="Close viewer"
            >
              Close
            </button>
          </div>

          {/* Stage */}
          <div
            className="art-viewer-stage"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerEnd}
            onPointerCancel={onPointerEnd}
            onWheel={onWheel}
          >
            <motion.img
              key={current.slug}
              src={current.imageSrc}
              alt={current.title}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              draggable={false}
              style={{
                transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${scale})`,
                transformOrigin: 'center center',
                transition:
                  dragRef.current || pinchRef.current
                    ? 'none'
                    : 'transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
                cursor: scale > 1.05 ? 'grab' : 'zoom-in',
                touchAction: 'none',
                userSelect: 'none',
              }}
            />

            {/* Prev / Next chevrons (hidden on touch — handled by swipe) */}
            <button
              className="art-viewer-chev art-viewer-chev-prev"
              onClick={() => onIndexChange(openIndex! - 1)}
              disabled={openIndex === 0}
              aria-label="Previous work"
            >
              ←
            </button>
            <button
              className="art-viewer-chev art-viewer-chev-next"
              onClick={() => onIndexChange(openIndex! + 1)}
              disabled={openIndex === items.length - 1}
              aria-label="Next work"
            >
              →
            </button>
          </div>

          {/* Footer — quick spec line + acquire link */}
          <div className="art-viewer-footer">
            <span className="label" style={{ color: 'hsla(0,0%,100%,0.55)' }}>
              {[current.medium, current.dimensions, current.edition]
                .filter(Boolean)
                .join(' · ')}
            </span>
            <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
              <a
                href={current.href}
                className="label"
                style={{ color: 'hsla(0,0%,100%,0.7)' }}
                onClick={onClose}
              >
                View details →
              </a>
              {current.price && (
                <span className="label" style={{ color: 'var(--stripe)' }}>
                  {current.price}
                </span>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function distance(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max);
}
