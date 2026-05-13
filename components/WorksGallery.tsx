'use client';

import { useCallback, useEffect, useState } from 'react';
import ArtCard3D from './ArtCard3D';
import ArtViewer from './ArtViewer';
import type { PortfolioItem } from '@/lib/content';

interface WorksGalleryProps {
  items: PortfolioItem[];
}

/**
 * Wraps a grid of ArtCard3Ds with touch-device lightbox behavior.
 *
 * On hover-capable devices, cards navigate directly to /works/[slug]
 * (the View Transitions API morph is the payoff there). On touch
 * devices, cards instead open the full-screen ArtViewer — pinch to
 * zoom, swipe to paginate — so the photograph itself becomes the
 * primary interaction. A "View details" link inside the viewer is
 * the escape hatch to the detail page.
 */
export default function WorksGallery({ items }: WorksGalleryProps) {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: none)');
    const update = () => setIsTouch(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const handleCardClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, index: number) => {
      // Only intercept on touch devices; let hover-capable devices follow the
      // link to /works/[slug] so the shared-element morph plays.
      if (!isTouch) return;
      e.preventDefault();
      e.stopPropagation();
      setViewerIndex(index);
    },
    [isTouch],
  );

  return (
    <>
      <div className="perspective-container">
        <div className="portfolio-grid">
          {items.map((item, i) => (
            <div
              key={item.slug}
              onClickCapture={(e) => handleCardClick(e, i)}
              style={{ display: 'contents' }}
            >
              <ArtCard3D {...item} index={i} />
            </div>
          ))}
        </div>
      </div>

      <ArtViewer
        items={items}
        openIndex={viewerIndex}
        onClose={() => setViewerIndex(null)}
        onIndexChange={setViewerIndex}
      />
    </>
  );
}
