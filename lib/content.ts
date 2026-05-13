/**
 * J.Vladimir — Site Content & Data
 *
 * All content, portfolio items, and image paths live here.
 * When real assets arrive from JV, update the image paths below.
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

/**
 * Portfolio Items
 * Using placeholder images for now — replace with JV's actual work
 * once assets are delivered. Images go in /public/portfolio/
 */
export const portfolioItems = [
  {
    title: 'Golden Goose',
    category: 'Red Stripe Rabbits',
    imageSrc: '/portfolio/golden-goose.jpg',
    href: 'https://jvladimir.store/products/the-golden-goose',
    price: '$777',
  },
  {
    title: 'The Crown',
    category: 'Red Stripe Rabbits',
    imageSrc: '/portfolio/the-crown.jpg',
    href: 'https://jvladimir.store/products/the-crown',
    price: '$777',
  },
  {
    title: 'Ghost',
    category: 'One of One',
    imageSrc: '/portfolio/ghost.jpg',
    href: 'https://jvladimir.store/products/ghost',
    price: '$5,000',
  },
  {
    title: 'Motus',
    category: 'One of One',
    imageSrc: '/portfolio/motus.jpg',
    href: 'https://jvladimir.store/products/motus',
    price: '$5,000',
  },
  {
    title: 'Misunderstood',
    category: 'The Icons',
    imageSrc: '/portfolio/misunderstood.jpg',
    href: 'https://jvladimir.store/products/misunderstood',
    price: '$6,500',
  },
  {
    title: "Joke's On You",
    category: 'After Hours',
    imageSrc: '/portfolio/jokes-on-you.jpg',
    href: 'https://jvladimir.store/products/jokes-on-you',
    price: '$5,000',
  },
  {
    title: 'Smooth Operator',
    category: 'After Hours',
    imageSrc: '/portfolio/smooth-operator.jpg',
    href: 'https://jvladimir.store/products/smooth-operator',
    price: '$7,000',
  },
  {
    title: 'The Legend',
    category: 'Private Collection',
    imageSrc: '/portfolio/the-legend.jpg',
    href: 'https://jvladimir.store/collections/all',
    price: '$15,000',
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
      '48" x 48" one-of-one mixed-media originals. Layered paint, texture, and resin.',
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

export const navItems = [
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Story', href: '/story' },
  { label: 'Shop', href: 'https://jvladimir.store', external: true },
  { label: 'Contact', href: '/contact' },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/j.vladimir/',
    external: true,
  },
];
