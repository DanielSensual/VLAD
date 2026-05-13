# J.VLADIMIR — Claude Code Handoff Brief
## Gallery-Grade Portfolio Overhaul for an Editorial Photographer × Pop Artist
*Handoff prepared: May 12, 2026 — from Antigravity to Claude Code Opus Trinity*

---

## 0. Executive Summary

You're taking over a Next.js 16 portfolio site for **J.Vladimir** — an Orlando-based editorial fashion photographer and contemporary pop artist whose signature move is a single horizontal red stripe painted across his subjects' eyes. The site just completed its foundational design system overhaul (warm cream gallery palette, Fraunces typography, ambient effects) and is **deployed live** at:

- **Production:** https://jvladimir.vercel.app
- **GitHub:** https://github.com/DanielSensual/VLAD.git
- **Local:** `/Users/danielcastillo/Projects/Websites/jvladimir/`
- **Shopify Store (existing):** https://jvladimir.store
- **Current Wix Site (being replaced):** https://jvladimir.com

The brand thesis: **"The Red Stripe is the brand, not a decoration."** Every UI decision should pass through this lens.

---

## 1. Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.2.6 |
| React | React | 19.2.4 |
| Animation | Framer Motion | 12.38.0 |
| Styling | Vanilla CSS (globals.css) | — |
| Typography | Fraunces (variable serif) + Inter Tight | Google Fonts |
| Deployment | Vercel | Auto-deploy from GitHub |
| Build | Turbopack | — |
| Package Manager | npm | — |

### No Tailwind. Vanilla CSS only. This is a non-negotiable project rule.

---

## 2. File Map

```
jvladimir/
├── app/
│   ├── globals.css          ← Full design system (tokens, components, animations)
│   ├── layout.tsx           ← Root layout with ambient effects
│   ├── page.tsx             ← Homepage (hero, portfolio grid, manifesto, CTA)
│   ├── contact/page.tsx     ← Contact page
│   ├── portfolio/page.tsx   ← Full portfolio grid
│   └── story/page.tsx       ← The Stripe philosophy / about
├── components/
│   ├── AmbientEffects.tsx   ← StripeProgress, GrainOverlay, WetPaintFilters
│   ├── ArtCard3D.tsx        ← 3D tilt portfolio cards with light reflections
│   ├── CursorGlow.tsx       ← Legacy cursor (replaced by StripeCursor, can delete)
│   ├── EditorialSection.tsx ← Side-by-side image + text editorial layout
│   ├── Footer.tsx           ← Site footer
│   ├── Header.tsx           ← Dynamic header (white over hero, dark on scroll)
│   ├── Hero.tsx             ← Parallax hero with banner image
│   ├── PortfolioGrid.tsx    ← Masonry-style portfolio grid
│   ├── ScrollReveal.tsx     ← Intersection Observer reveal animations
│   └── StripeCursor.tsx     ← Custom cursor that becomes The Red Stripe on hover
├── lib/
│   └── content.ts           ← All site content, portfolio items, nav, clients
├── public/
│   ├── hero-banner.avif     ← JV hero banner (dark editorial shoot)
│   ├── hero.jpg             ← Fallback hero
│   ├── stripe-story.jpg     ← Story page image
│   └── portfolio/           ← 8 artwork images + vlad-portrait.png (JV logo)
├── next.config.ts           ← Currently minimal — needs image domains, viewTransition
├── package.json
└── tsconfig.json
```

---

## 3. Design System (Current State)

### Color Tokens (`globals.css :root`)

```css
/* Surfaces — warm gallery palette */
--bg-primary: hsl(36 12% 92%);      /* Warm cream canvas */
--bg-secondary: hsl(36 18% 86%);    /* Slightly darker cream */
--bg-elevated: hsl(36 12% 95%);     /* Card surfaces */
--bg-overlay: hsla(36 12% 92% / 0.85);
--bg-ink: hsl(0 0% 4%);             /* Near-black for Maison Noir sections */

/* The Red Stripe — calibrated to actual paint */
--stripe: hsl(358 78% 46%);         /* Primary brand red */
--stripe-hover: hsl(358 78% 40%);
--stripe-glow: hsl(2 85% 58% / 0.25);
--stripe-deep: hsl(355 72% 32%);
--stripe-wet: hsl(355 80% 38%);

/* Gilt — for $5K+ prices */
--gilt: hsl(40 38% 58%);
--gilt-deep: hsl(38 42% 38%);
```

### Typography

- **Display:** Fraunces variable serif, weight 280, `font-variation-settings: 'opsz' 144`
- **Body:** Inter Tight, weight 380, size 1.0625rem
- **Eyebrow/Label:** Inter Tight, 0.72rem, letter-spacing 0.22em, uppercase
- **Fluid type scale:** `--display-1` through `--display-3` with clamp()

### Ambient Effects (Active in Layout)

1. **StripeProgress** — 3px red scroll progress bar, top of viewport
2. **StripeCursor** — Custom cursor: small dot at rest, horizontal stripe on artwork hover
3. **GrainOverlay** — SVG feTurbulence film grain, 6% opacity, mix-blend-mode: overlay
4. **WetPaintFilters** — SVG displacement filter (`#wet-paint`) for deckled stripe edges

---

## 4. What Has Been Completed

- [x] Next.js 16 App Router scaffold with 4 routes (/, /portfolio, /story, /contact)
- [x] Design system: warm cream + Stripe Crimson + ink sections
- [x] Fraunces + Inter Tight typography with variable font settings
- [x] Hero component with parallax, banner image, scroll indicator
- [x] Header with dynamic color switching (white over hero → dark on scroll)
- [x] ArtCard3D with mouse-responsive 3D tilt, radial light, stripe-sweep hover
- [x] ScrollReveal with staggered intersection observer animations
- [x] EditorialSection with Ken Burns zoom on images
- [x] Dark ink manifesto section with JV quote
- [x] Film grain overlay + wet-paint SVG filters
- [x] Custom StripeCursor (desktop only, touch-disabled)
- [x] Scroll progress stripe bar
- [x] Content data model in `lib/content.ts`
- [x] Footer with brand, links, locations
- [x] Reduced motion accessibility support
- [x] GitHub push + Vercel production deployment
- [x] Build passes clean (TypeScript, no errors)

---

## 5. What Needs To Be Done (Priority Order)

### Phase 1: Quick Wins — Polish What Exists

1. **Reusable RedStripe Component** — A brush-stroke stripe with rough clip-path edges, gradient paint colors, and reveal animation. Use it everywhere: hero, cards, quotes, nav active states, section dividers. See ChatGPT report Section E, Quick Win 1 for the full clip-path polygon.

2. **IA Rename** — Current nav: Portfolio / Story / Shop / Contact / Instagram. Target nav:
   ```
   Works / The Stripe / Collect / Commissions / Journal / Contact
   ```
   Update `lib/content.ts` navItems and Header.tsx.

3. **Museum-Card Captions** — Upgrade ArtCard3D hover to show gallery-style labels: title, medium, year, dimensions, edition, availability status. See `WorkCaption` component spec in ChatGPT report.

4. **Mobile Touch Safety** — Current 3D cards don't degrade on mobile. Add `@media (hover: none)` to disable tilt, add press-lift, hide cursor effects. CSS-only fix.

5. **Vlad Tux Photo Integration** — The user has a hero-quality portrait of JV in a tuxedo with Red Stripe across his eyes, rabbit sculpture at his feet, floating brand strategy pages. It needs to be saved to `/public/` and used on the Story page or as an alternate hero.

6. **Delete CursorGlow.tsx** — Replaced by StripeCursor.tsx but the file still exists.

### Phase 2: Premium Gallery System

7. **View Transitions API** — Enable `experimental: { viewTransition: true }` in next.config.ts. Use React `<ViewTransition>` for shared artwork image morphs (thumbnail → detail page hero). Progressive enhancement only.

8. **GSAP Pinned Horizontal Gallery** — "Private Viewing Rail" — scroll-pinned horizontal gallery for Selected Works. Install `gsap` + `@gsap/react`. See ChatGPT report Medium 2 for full implementation.

9. **Works Detail Pages** — Build `/works/[slug]/page.tsx` with full artwork detail: large image, title, year, medium, dimensions, edition info, price, inquiry CTA, related works.

10. **Mobile Art Viewer** — Horizontal scroll-snap strip with full-screen modal viewer, pinch-to-zoom. See ChatGPT report Medium 3.

11. **Red Stripe Loading State** — `app/loading.tsx` with RedStripe component that pauses at 92% then completes. Branded route transitions.

### Phase 3: Collector Commerce

12. **Shopify Storefront API Integration** — JV already has a Shopify store at jvladimir.store. Pull product data into the Next.js frontend. Split: Rabbits ($777) vs One-of-Ones ($5K+). Replace "Regular price / Sale price" with collector language.

13. **Collect Page** — `/collect` with collector-tier layout, edition badges, availability states (available = red stripe accent, sold = grey strike, inquire = gilt).

### Phase 4: Big Swings (WebGL)

14. **Three.js Red Stripe Particle Hero** — Low-particle red paint field that reacts to cursor. Desktop only, lazy-loaded, behind `(hover: hover)` and `prefers-reduced-motion` checks.

15. **3D Rabbit Viewer** — Interactive 3D rotation of the Red Stripe Rabbit sculpture using Three.js or `<model-viewer>`. Biggest commercial showstopper — let buyers inspect it like a luxury watch.

16. **Shader Image Distortion** — Hover effect that distorts artwork like heat/wet paint. On 3-6 key images only, not the whole grid.

---

## 6. Two Research Reports Are Available

Two independent deep-research reports were commissioned. They agree on ~80% of recommendations and diverge on font choice and exact red values:

### Claude 4.7 Report (commissioned May 10)
- Recommended **Fraunces** serif (currently implemented)
- Red: `hsl(358 78% 46%)` (currently implemented)
- Warm cream: `hsl(36 12% 92%)` (currently implemented)
- Emphasized View Transitions API + scroll-driven animations
- Called for "Stripe Society" membership concept

### ChatGPT Pro Report (commissioned May 12)
- Recommended keeping **Cormorant Garamond** (used sparingly) — we went with Fraunces instead
- Red system: `--stripe: hsl(359 95% 43%)`, `--stripe-paint: hsl(4 72% 46%)`, `--stripe-hot: hsl(342 75% 45%)`
- Off-white: `hsl(34 30% 97%)` (lighter than current)
- Has the most detailed `RedStripe` component with brush clip-path
- Has the best GSAP horizontal gallery spec
- Includes champagne/gold accent: `hsl(40 32% 59%)` (we implemented as `--gilt`)
- Excellent mobile art viewer and touch interaction specs

### Where They Agree
- The Red Stripe must be a living brand element, not decoration
- White/cream gallery + near-black ink rooms for section contrast
- Film grain overlay at very low opacity
- GSAP for horizontal pinned gallery
- View Transitions for artwork morphs
- Gallery-style captions (title, medium, dimensions, edition, price)
- Mobile touch-safe degradation of 3D effects
- Lazy-load WebGL, desktop only
- Performance budget: LCP ≤ 1.8s mobile, INP ≤ 120ms

### Key Decision (Already Made)
We went with **Fraunces** over Cormorant Garamond because its variable axes allow animated weight transitions and the optical sizing gives better control at display sizes. If JV prefers the more delicate literary feel of Cormorant, it's a one-line CSS change.

---

## 7. Brand Rules

1. **The Red Stripe is the brand.** It should appear as scroll progress, cursor behavior, loading states, form submit animations, page transitions, and availability markers. NOT as random decoration.

2. **White gallery silence.** The warm cream background should breathe. Don't fill every pixel. Let the work speak.

3. **Ink rooms for contrast.** Alternate cream sections with near-black (`--bg-ink`) sections for manifesto quotes, collector tiers, Maison Noir energy.

4. **Collector language, not e-commerce language.** Say "Inquire" not "Add to Cart." Say "Edition 23/77" not "In Stock." Say "Enter the Vault" not "Shop Now."

5. **The stripe is rough, not perfect.** Clip-path polygons, displacement filters, gradient paint colors — never a clean CSS rectangle.

6. **Performance is luxury.** A 4-second LCP is not premium, it's poverty. Budget: ≤180KB initial JS, ≤70KB CSS, hero image ≤320KB AVIF.

---

## 8. JV's Actual Brand Assets

| Asset | Location | Status |
|-------|----------|--------|
| Hero banner (editorial shoot) | `/public/hero-banner.avif` | ✅ Live |
| JV portrait logo | `/public/portfolio/vlad-portrait.png` | ✅ In repo |
| Tux portrait (Red Stripe across eyes, rabbit at feet) | User has it — needs to save to Downloads | ⏳ Pending |
| Portfolio artworks (8 pieces) | `/public/portfolio/*.jpg` | ✅ Live |
| Red Stripe story image | `/public/stripe-story.jpg` | ✅ Live |
| 3D Rabbit model (.glb) | Does not exist yet | ❌ Needed for 3D viewer |

### Client Roster (for trust bar)
Nike, Disney, Calvin Klein, Target, Mercedes-Benz, Ford Models, Wilhelmina

### Store Inventory
- **Red Stripe Rabbits** — $777 each, editions of 77
- **One-of-One Originals** — $5,000–$7,000
- **Private Collection** — $15,000

---

## 9. Commands

```bash
# Dev server
cd /Users/danielcastillo/Projects/Websites/jvladimir
npm run dev          # → localhost:3000

# Build (verify before push)
npm run build

# Deploy (auto on push, or manual)
vercel --prod --yes

# Git
git remote -v        # origin → https://github.com/DanielSensual/VLAD.git
```

---

## 10. Known Issues / Cleanup

1. `components/CursorGlow.tsx` is dead code — replaced by StripeCursor. Delete it.
2. `next.config.ts` is essentially empty — needs `images.formats`, `images.remotePatterns` (for Shopify CDN), and `experimental.viewTransition`.
3. The hero `<Image>` component uses a local `.avif` file — should add blur placeholder.
4. ArtCard3D doesn't degrade for touch devices — needs `@media (hover: none)` CSS.
5. No `app/loading.tsx` exists yet — needs branded Red Stripe loading state.
6. No favicon or OG image — needs JV brand assets.

---

## 11. The Tux Photo (Critical Asset)

The user showed a portrait of JV that ChatGPT Pro's report describes as the entire brand thesis in one image:
- JV seated in a black tuxedo with bow tie
- Red Stripe painted across his eyes (rough, brush-like)
- Red Stripe Rabbit sculpture at his feet
- Brand strategy / campaign pages floating in the air around him
- White studio background
- Watch on wrist, pocket square — luxury editorial energy

This image should be the **Story page hero** or an **alternate homepage hero**. The user needs to save it to the project — ask them to place it at `/public/vlad-tux.jpg` or similar.

---

## 12. Style Notes for Code

- All CSS in `app/globals.css` — no CSS modules, no Tailwind
- Use `var(--token)` for all colors, spacing, transitions
- Framer Motion for client-side animations (already installed)
- GSAP only if installing for the horizontal gallery (not yet installed)
- Three.js only if implementing WebGL hero or 3D rabbit (not yet installed)
- TypeScript strict mode — all components are `.tsx`
- Imports use `@/` path alias (configured in tsconfig.json)

---

*The site should feel like you walked into a private gallery and got quietly judged by the lighting.* 🩸
