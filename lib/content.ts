/**
 * J.Vladimir — Site Content & Data
 *
 * Source of truth for all portfolio, photography, and navigation content.
 * Product data mirrors jvladimir.store; image assets are local copies in /public/.
 */

export const siteConfig = {
  name: 'J.Vladimir',
  tagline: 'Artist. Photographer. Design.',
  description:
    'J.Vladimir Photography and Art — editorial fashion visual photographer and artist based in Orlando, Miami, and New York. Pop art, The Red Stripe, and contemporary mixed-media works.',
  email: 'mail@jvladimir.com',
  locations: ['Orlando', 'Miami', 'NYC'],
  social: {
    instagram: 'https://www.instagram.com/j.vladimir/',
    tiktok: 'https://www.tiktok.com/@theredstripe',
    facebook: 'https://www.facebook.com/share/1CwDsMr1gE/',
  },
  storeUrl: 'https://jvladimir.store',
  clientLoginUrl: 'https://clientlogin.jvladimir.com',
};

export type Collection =
  | 'Red Stripe Rabbits'
  | 'The Icons'
  | 'After Hours'
  | 'Private Collection';

export type Availability = 'available' | 'sold' | 'inquire';

export interface PortfolioItem {
  /** URL-safe identifier — drives /works/{slug}. */
  slug: string;
  title: string;
  category: Collection;
  imageSrc: string;
  /** Internal detail page link. */
  href: string;
  /** Shopify product URL — used by the "Acquire" CTA on detail pages. */
  storeUrl: string;
  price?: string;
  medium?: string;
  year?: number;
  dimensions?: string;
  edition?: string;
  availability?: Availability;
  /** Optional longer-form description for the detail page. */
  description?: string;
}

const work = (
  data: Omit<PortfolioItem, 'href'> & { href?: string },
): PortfolioItem => ({
  ...data,
  href: data.href ?? `/works/${data.slug}`,
});

/**
 * Portfolio — all 20 works pulled from jvladimir.store.
 * Order is curated: the first 4 are the homepage "Selected Works"
 * and lead with the strongest cross-section of collections.
 */
export const portfolioItems: PortfolioItem[] = [
  // --- HOMEPAGE FEATURED (first 4) ---
  work({
    slug: 'crown',
    title: 'Crown',
    category: 'The Icons',
    imageSrc: '/portfolio/originals/crown.jpg',
    storeUrl: 'https://jvladimir.store/products/the-crown',
    price: '$6,000',
    medium: 'Mixed media on canvas',
    dimensions: '48" × 48"',
    edition: '1 of 1',
    availability: 'available',
    description:
      'A monarch reframed by the Stripe — power and persona collapsed into a single horizontal mark.',
  }),
  work({
    slug: 'golden-goose',
    title: 'Golden Goose',
    category: 'Red Stripe Rabbits',
    imageSrc: '/portfolio/rabbits/golden-goose.png',
    storeUrl: 'https://jvladimir.store/products/the-golden-goose',
    price: '$777',
    medium: 'Hand-finished sculpture',
    edition: 'Edition of 77',
    availability: 'available',
    description:
      'Hand-finished rabbit, gold-leaf surface, the Stripe applied last so no two are identical.',
  }),
  work({
    slug: 'ghost',
    title: 'Ghost',
    category: 'After Hours',
    imageSrc: '/portfolio/originals/ghost.jpg',
    storeUrl: 'https://jvladimir.store/products/ghost',
    price: '$7,000',
    medium: 'Mixed media on canvas',
    dimensions: '48" × 48"',
    edition: '1 of 1',
    availability: 'available',
    description:
      'The flagship of After Hours — heavier resin, deeper shadow, the Stripe rendered like a slash through fog.',
  }),
  work({
    slug: 'old-sport',
    title: 'Old Sport',
    category: 'The Icons',
    imageSrc: '/portfolio/originals/old-sport.jpg',
    storeUrl: 'https://jvladimir.store/products/the-toast',
    price: '$6,500',
    medium: 'Mixed media on canvas',
    dimensions: '48" × 48"',
    edition: '1 of 1',
    availability: 'available',
  }),

  // --- THE ICONS ---
  work({
    slug: 'blondie',
    title: 'Blondie',
    category: 'The Icons',
    imageSrc: '/portfolio/originals/blondie.jpg',
    storeUrl: 'https://jvladimir.store/products/blondie',
    price: '$6,500',
    medium: 'Mixed media on canvas',
    dimensions: '48" × 48"',
    edition: '1 of 1',
    availability: 'available',
  }),
  work({
    slug: 'hypnotize',
    title: 'Hypnotize',
    category: 'The Icons',
    imageSrc: '/portfolio/originals/hypnotize.jpg',
    storeUrl: 'https://jvladimir.store/products/hypnotize',
    price: '$5,000',
    medium: 'Mixed media on canvas',
    dimensions: '48" × 48"',
    edition: '1 of 1',
    availability: 'available',
  }),
  work({
    slug: 'king',
    title: 'King',
    category: 'The Icons',
    imageSrc: '/portfolio/originals/king.jpg',
    storeUrl: 'https://jvladimir.store/products/king',
    price: '$5,000',
    medium: 'Mixed media on canvas',
    dimensions: '48" × 48"',
    edition: '1 of 1',
    availability: 'available',
  }),
  work({
    slug: 'ol-blue-eyes',
    title: "Ol' Blue Eyes",
    category: 'The Icons',
    imageSrc: '/portfolio/originals/ol-blue-eyes.jpg',
    storeUrl: 'https://jvladimir.store/products/ocean',
    price: '$5,000',
    medium: 'Mixed media on canvas',
    dimensions: '48" × 48"',
    edition: '1 of 1',
    availability: 'available',
  }),
  work({
    slug: 'heart-of-puerto-rico',
    title: 'Heart of Puerto Rico',
    category: 'The Icons',
    imageSrc: '/portfolio/originals/heart-of-puerto-rico.jpg',
    storeUrl: 'https://jvladimir.store/products/heart-of-puerto-rico',
    price: '$5,000',
    medium: 'Mixed media on canvas',
    dimensions: '48" × 48"',
    edition: '1 of 1',
    availability: 'available',
  }),
  work({
    slug: 'wolf',
    title: 'Wolf',
    category: 'The Icons',
    imageSrc: '/portfolio/originals/wolf.jpg',
    storeUrl: 'https://jvladimir.store/products/wolf',
    price: '$5,000',
    medium: 'Mixed media on canvas',
    dimensions: '48" × 48"',
    edition: '1 of 1',
    availability: 'available',
  }),

  // --- AFTER HOURS ---
  work({
    slug: 'motus',
    title: 'Motus',
    category: 'After Hours',
    imageSrc: '/portfolio/originals/motus.jpg',
    storeUrl: 'https://jvladimir.store/products/motus',
    price: '$5,000',
    medium: 'Mixed media on canvas',
    dimensions: '48" × 48"',
    edition: '1 of 1',
    availability: 'available',
  }),
  work({
    slug: 'misunderstood',
    title: 'Misunderstood',
    category: 'After Hours',
    imageSrc: '/portfolio/originals/misunderstood.jpg',
    storeUrl: 'https://jvladimir.store/products/misunderstood',
    price: '$5,000',
    medium: 'Mixed media on canvas',
    dimensions: '48" × 48"',
    edition: '1 of 1',
    availability: 'available',
  }),
  work({
    slug: 'smooth-operator',
    title: 'Smooth Operator',
    category: 'After Hours',
    imageSrc: '/portfolio/originals/smooth-operator.jpg',
    storeUrl: 'https://jvladimir.store/products/smooth-operator',
    price: '$5,000',
    medium: 'Mixed media on canvas',
    dimensions: '48" × 48"',
    edition: '1 of 1',
    availability: 'available',
  }),
  work({
    slug: 'jokes-on-you',
    title: "Joke's On You",
    category: 'After Hours',
    imageSrc: '/portfolio/originals/jokes-on-you.jpg',
    storeUrl: 'https://jvladimir.store/products/jokes-on-you',
    price: '$5,000',
    medium: 'Mixed media on canvas',
    dimensions: '48" × 48"',
    edition: '1 of 1',
    availability: 'available',
  }),

  // --- RED STRIPE RABBITS ---
  work({
    slug: 'panda',
    title: 'Panda',
    category: 'Red Stripe Rabbits',
    imageSrc: '/portfolio/rabbits/panda.png',
    storeUrl: 'https://jvladimir.store/products/panda',
    price: '$777',
    medium: 'Hand-finished sculpture',
    edition: 'Edition of 77',
    availability: 'available',
  }),
  work({
    slug: 'raven',
    title: 'Raven',
    category: 'Red Stripe Rabbits',
    imageSrc: '/portfolio/rabbits/raven.png',
    storeUrl: 'https://jvladimir.store/products/raven',
    price: '$777',
    medium: 'Hand-finished sculpture',
    edition: 'Edition of 77',
    availability: 'available',
  }),
  work({
    slug: 'red-pill',
    title: 'Red Pill',
    category: 'Red Stripe Rabbits',
    imageSrc: '/portfolio/rabbits/red-pill.png',
    storeUrl: 'https://jvladimir.store/products/the-red-pill',
    price: '$777',
    medium: 'Hand-finished sculpture',
    edition: 'Edition of 77',
    availability: 'available',
  }),
  work({
    slug: 'tiffany',
    title: 'Tiffany',
    category: 'Red Stripe Rabbits',
    imageSrc: '/portfolio/rabbits/tiffany.png',
    storeUrl: 'https://jvladimir.store/products/tiffany',
    price: '$777',
    medium: 'Hand-finished sculpture',
    edition: 'Edition of 77',
    availability: 'available',
  }),
  work({
    slug: 'victoria',
    title: 'Victoria',
    category: 'Red Stripe Rabbits',
    imageSrc: '/portfolio/rabbits/victoria.png',
    storeUrl: 'https://jvladimir.store/products/victoria',
    price: '$777',
    medium: 'Hand-finished sculpture',
    edition: 'Edition of 77',
    availability: 'available',
  }),
  work({
    slug: 'vii',
    title: 'VII',
    category: 'Red Stripe Rabbits',
    imageSrc: '/portfolio/rabbits/vii.png',
    storeUrl: 'https://jvladimir.store/products/the-unseen',
    price: '$777',
    medium: 'Hand-finished sculpture',
    edition: 'Edition of 77',
    availability: 'sold',
  }),
];

/** Lookup helper for /works/[slug] dynamic routes. */
export const getWorkBySlug = (slug: string): PortfolioItem | undefined =>
  portfolioItems.find((item) => item.slug === slug);

/** Up to 3 related works in the same collection, excluding the given slug. */
export const getRelatedWorks = (slug: string, limit = 3): PortfolioItem[] => {
  const current = getWorkBySlug(slug);
  if (!current) return [];
  return portfolioItems
    .filter((item) => item.category === current.category && item.slug !== slug)
    .slice(0, limit);
};

/**
 * Editorial Photography — selected from jvladimir.com.
 * Not wired into a route yet — reserved for a future /works/photography page.
 */
export interface PhotographyItem {
  title: string;
  imageSrc: string;
  caption?: string;
  category: string;
}

export const photographyItems: PhotographyItem[] = [
  {
    title: 'The Stripe',
    imageSrc: '/photography/stripe-portrait.jpg',
    category: 'Editorial',
    caption: 'The Red Stripe — identity, power, and silence',
  },
  {
    title: 'Red in Motion',
    imageSrc: '/photography/ballet-red.jpg',
    category: 'Ballet',
    caption: 'Movement captured in the brand red',
  },
  {
    title: 'Studio Portrait',
    imageSrc: '/photography/editorial-bw-portrait.jpg',
    category: 'Portrait',
    caption: 'Editorial studio portrait — high contrast B&W',
  },
  {
    title: 'Vintage Portrait',
    imageSrc: '/photography/vintage-portrait.jpg',
    category: 'Editorial',
    caption: 'Warm-toned editorial portrait',
  },
  {
    title: 'Calvin Klein',
    imageSrc: '/photography/calvin-klein.jpg',
    category: 'Commercial',
    caption: 'Brand collaboration',
  },
  {
    title: 'Vintage Couture',
    imageSrc: '/photography/vintage-couture.jpg',
    category: 'Editorial',
    caption: 'Vintage couture fashion editorial',
  },
  {
    title: 'Emerging Artist',
    imageSrc: '/photography/emerging-artist.jpg',
    category: 'Editorial',
    caption: 'Couture portrait series',
  },
  {
    title: 'Fashion Art',
    imageSrc: '/photography/fashion-art.jpg',
    category: 'Editorial',
    caption: 'Creative fashion art',
  },
  {
    title: 'London Model',
    imageSrc: '/photography/london-model.jpg',
    category: 'Studio',
    caption: 'Editorial in-studio session',
  },
  {
    title: 'Ballet Elegant',
    imageSrc: '/photography/ballet-elegant.jpg',
    category: 'Ballet',
    caption: 'Elegant exquisite portrait',
  },
  {
    title: 'Studio Portrait',
    imageSrc: '/photography/studio-portrait.jpg',
    category: 'Portrait',
    caption: 'Orlando studio portrait',
  },
];

export const collectorTiers = [
  {
    tier: 'Red Stripe Rabbits',
    audience: 'First-time collectors',
    description:
      'Hand-finished sculpture, limited to 77 pieces per edition. Each uniquely finished.',
    price: '$777',
  },
  {
    tier: 'The Icons',
    audience: 'Serious collectors',
    description:
      '48" × 48" one-of-one mixed-media originals. Layered paint, texture, and resin.',
    price: '$5,000 – $6,500',
  },
  {
    tier: 'After Hours',
    audience: 'Private collectors',
    description:
      'Darker, rarer originals from the evening studio sessions. Raw and unfiltered.',
    price: '$5,000 – $7,000+',
  },
  {
    tier: 'Legends / Private',
    audience: 'Trophy acquisitions',
    description:
      'The highest-tier originals. Museum-scale. Singular. Irreplaceable.',
    price: '$15,000',
  },
];

export const clients = [
  'Nike',
  'Disney',
  'Calvin Klein',
  'Target',
  'Mercedes-Benz',
  'Ford Models',
  'Wilhelmina',
];

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

/**
 * Site navigation — collector-language IA.
 * "Works" replaces "Portfolio"; "The Stripe" replaces "Story";
 * "Collect" replaces "Shop". Commissions + Journal will join when
 * their routes exist (Phase 2/3).
 */
export const navItems: NavItem[] = [
  { label: 'Works', href: '/portfolio' },
  { label: 'The Stripe', href: '/story' },
  { label: 'Collect', href: '/collect' },
  { label: 'Contact', href: '/contact' },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/j.vladimir/',
    external: true,
  },
];
