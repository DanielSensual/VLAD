'use client';

import { motion } from 'framer-motion';

interface PortfolioItem {
  title: string;
  category: string;
  imageSrc: string;
  href: string;
  price?: string;
}

interface PortfolioGridProps {
  items: PortfolioItem[];
}

export default function PortfolioGrid({ items }: PortfolioGridProps) {
  return (
    <div className="portfolio-grid">
      {items.map((item, i) => (
        <motion.a
          key={item.href + item.title}
          href={item.href}
          className="portfolio-item"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: i * 0.1 }}
        >
          <img src={item.imageSrc} alt={item.title} loading="lazy" />
          <div className="portfolio-item-overlay">
            <span className="label">{item.category}</span>
            <span
              className="display-md mt-xs"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {item.title}
            </span>
            {item.price && (
              <span
                className="label mt-xs"
                style={{ color: 'var(--text-secondary)' }}
              >
                {item.price}
              </span>
            )}
          </div>
        </motion.a>
      ))}
    </div>
  );
}
