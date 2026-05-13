# J.VLADIMIR — Claude Code Handoff Brief v2
## Gallery-Grade Portfolio — Phase 1–3 Complete, Phase 4 Next
*Handoff updated: May 12, 2026 — from Claude Opus 4.7 session "nice-wu-49834b"*

---

## 0. Executive Summary

You're taking over a Next.js 16 portfolio site for **J.Vladimir** — an Orlando-based editorial fashion photographer and contemporary pop artist whose signature is a single horizontal red stripe painted across his subjects' eyes. **Phases 1–3 are complete and live.**

- **Production:** https://jvladimir.vercel.app
- **GitHub:** https://github.com/DanielSensual/VLAD.git
- **Local:** `/Users/danielcastillo/Projects/Websites/jvladimir/`
- **Shopify Store (existing):** https://jvladimir.store
- **Current Wix Site (being replaced):** https://jvladimir.com

The brand thesis: **"The Red Stripe is the brand, not a decoration."** Every UI decision must pass through this lens.

**Latest git log:**
```
7b0894a  Merge worktree: Gallery overhaul Phase 1–3
c0b1663  Gallery overhaul — Phase 1–3 complete
3980164  Claude Code handoff brief
651563b  Gallery Design System Overhaul
```

---

## 1. Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.2.6 |
| React | React | 19.2.4 |
| Animation | Framer Motion | 12.38.0 |
| Scroll / GSAP | GSAP + @gsap/react | ✅ installed |
| Styling | Vanilla CSS (globals.css) | — |
| Typography | Fraunces (variable serif) + Inter Tight | Google Fonts |
| Deployment | Vercel | Auto-deploy from GitHub |
| Build | Turbopack | — |
| Package Manager | npm | — |

### No Tailwind. Vanilla CSS only. Non-negotiable.

---

## 2. File Map (Current State)

```
jvladimir/
├── app/
│   ├── globals.css              ← Full design system — tokens, all component CSS
│   ├── layout.tsx               ← Root layout + metadataBase + AmbientEffects
│   ├── loading.tsx              ← ✅ Branded Red Stripe CSS progress bar (92% hold)
│   ├── page.tsx                 ← Homepage: Hero → Clients → Editorial → PrivateViewingRail → Manifesto → CTA
│   ├── collect/page.tsx         ← ✅ Vault page: tiered collector layout (Rabbits/Icons/After Hours/Commissions)
│   ├── contact/page.tsx         ← Contact form (no backend wired yet)
│   ├── portfolio/page.tsx       ← ✅ Works gallery grouped by collection with RedStripe dividers
│   ├── story/page.tsx           ← The Stripe philosophy / artist bio
│   └── works/
│       └── [slug]/page.tsx      ← ✅ 20 static detail pages — image, museum data, Acquire CTA, related works
├── components/
│   ├── AmbientEffects.tsx       ← StripeProgress bar, GrainOverlay, WetPaintFilters SVG
│   ├── ArtCard3D.tsx            ← ✅ 3D tilt cards + museum-caption overlay + viewTransitionName + touch guard
│   ├── ArtViewer.tsx            ← ✅ Full-screen lightbox: pinch-zoom, swipe, keyboard nav, scroll lock
│   ├── CollectTier.tsx          ← ✅ Editorial vault section per collection with availability dots
│   ├── EditorialSection.tsx     ← Side-by-side image + text, Ken Burns zoom
│   ├── Footer.tsx               ← ✅ Consumes navItems + siteConfig from content.ts (DRY)
│   ├── Header.tsx               ← ✅ Consumes navItems from content.ts, dynamic white→dark on scroll
│   ├── Hero.tsx                 ← Parallax hero with banner image + scroll indicator
│   ├── PortfolioGrid.tsx        ← Legacy grid (not used on any live page — can delete)
│   ├── PrivateViewingRail.tsx   ← ✅ GSAP ScrollTrigger pinned horizontal gallery (touch: scroll-snap)
│   ├── RedStripe.tsx            ← ✅ Reusable brush-stroke stripe: paint/divider/wet variants, Framer reveal
│   ├── ScrollReveal.tsx         ← Intersection Observer stagger reveal
│   ├── StripeCursor.tsx         ← Custom cursor: dot at rest → stripe on artwork hover (desktop only)
│   └── WorksGallery.tsx         ← ✅ Wraps ArtCard3D grid; intercepts touch → ArtViewer
├── lib/
│   ├── content.ts               ← ✅ Full data model: 20 works, PhotographyItems, CollectorTiers,
│   │                               navItems, clients, siteConfig, getWorkBySlug(), getRelatedWorks()
│   └── shopify.ts               ← ✅ Storefront API scaffold — INACTIVE until env token set
├── public/
│   ├── hero-banner.avif         ← ✅ Real JV editorial shoot, 2400×1603 (homepage hero)
│   ├── photography/
│   │   ├── stripe-portrait.jpg  ← ✅ Real JV editorial: blue-paint model w/ red slash across eyes
│   │   ├── ballet-red.jpg       ← ✅ Real JV: all-red ballet dancer, J.VLADIMIR branded (story hero)
│   │   ├── editorial-bw-portrait.jpg ← Nikon D810, J.VLADIMIR © — tattooed male editorial
│   │   ├── vintage-portrait.jpg ← J.VLADIMIR © warm vintage portrait
│   │   ├── calvin-klein.jpg     ← Commercial (1600×1600 Wix crop — needs re-download)
│   │   ├── emerging-artist.jpg  ← Editorial (1600×1600 Wix crop)
│   │   ├── fashion-art.jpg      ← Editorial (1600×1600 Wix crop)
│   │   ├── london-model.jpg     ← Studio (1600×1600 Wix crop)
│   │   ├── ballet-elegant.jpg   ← Ballet (1600×1600 Wix crop)
│   │   ├── studio-portrait.jpg  ← Portrait (1600×1600 Wix crop)
│   │   └── vintage-couture.jpg  ← Editorial (1600×1600 Wix crop)
│   ├── portfolio/
│   │   ├── originals/           ← ✅ 13 real JPGs from jvladimir.store (crown, ghost, blondie …)
│   │   ├── rabbits/             ← ✅ 7 real PNGs from jvladimir.store (golden-goose, panda …)
│   │   └── vlad-portrait.png    ← JV brand logo / video screenshot (NOT a portrait of JV)
│   └── [vlad-tux.jpg]          ← ⏳ MISSING — user needs to provide this (see Section 10)
├── next.config.ts               ← ✅ viewTransition enabled, AVIF/WebP formats, Shopify CDN remotePatterns
├── package.json                 ← gsap + @gsap/react added
└── tsconfig.json
```

---

## 3. Design System

### Color Tokens (`globals.css :root`)

```css
/* Surfaces */
--bg-primary:   hsl(36 12% 92%);       /* Warm cream canvas */
--bg-secondary: hsl(36 18% 86%);       /* Slightly darker cream */
--bg-elevated:  hsl(36 12% 95%);       /* Card surfaces */
--bg-ink:       hsl(0 0% 4%);          /* Near-black — manifesto / ink sections */

/* The Red Stripe */
--stripe:       hsl(358 78% 46%);      /* Primary brand red */
--stripe-hover: hsl(358 78% 40%);
--stripe-glow:  hsl(2 85% 58% / 0.25);
--stripe-deep:  hsl(355 72% 32%);
--stripe-wet:   hsl(355 80% 38%);

/* Gilt — collector pricing */
--gilt:         hsl(40 38% 58%);
--gilt-deep:    hsl(38 42% 38%);
```

### Typography
- **Display:** Fraunces variable serif, weight 280, `font-variation-settings: 'opsz' 144`
- **Body:** Inter Tight, weight 380, 1.0625rem
- **Label/Eyebrow:** Inter Tight, 0.72rem, letter-spacing 0.22em, uppercase

### Active Ambient Effects (in layout.tsx)
1. **StripeProgress** — 3px red scroll bar at viewport top
2. **StripeCursor** — dot at rest → horizontal red stripe on `[data-stripe-hover]`
3. **GrainOverlay** — SVG feTurbulence, 6% opacity, mix-blend-mode: overlay
4. **WetPaintFilters** — SVG displacement filter `#wet-paint` for deckled stripe edges

---

## 4. What Is Complete ✅

### Phase 1 — Polish
- [x] **RedStripe component** — `paint`, `divider`, `wet` variants; brush clip-path polygon; Framer Motion `whileInView` reveal; `prefers-reduced-motion` safe
- [x] **IA rename** — Nav is now: Works / The Stripe / Collect / Contact / Instagram
- [x] **Museum-card captions** — ArtCard3D hover shows title, medium, dimensions, edition, availability dot (red/grey/gilt)
- [x] **Mobile touch safety** — `matchMedia('(hover: hover) and (pointer: fine)')` guards tilt JS; `@media (hover: none)` CSS disables 3D effects; ArtViewer opens on touch tap
- [x] **CursorGlow.tsx deleted** — was dead code
- [x] **Footer DRY** — consumes `navItems` + `siteConfig` from content.ts

### Phase 2 — Premium Gallery
- [x] **View Transitions API** — `experimental: { viewTransition: true }` in next.config.ts; `viewTransitionName` on artwork images in ArtCard3D and works/[slug]
- [x] **PrivateViewingRail** — GSAP ScrollTrigger pinned horizontal gallery on homepage; touch scroll-snap fallback; tail card links to /portfolio
- [x] **ArtViewer lightbox** — full-screen modal: pinch-to-zoom (Pointer Events), swipe pagination, double-tap 1×↔2×, keyboard (←→ Esc), scroll lock
- [x] **WorksGallery** — intercepts touch taps → opens ArtViewer instead of navigating
- [x] **Works detail pages** — `/works/[slug]` — 20 routes via `generateStaticParams`; sticky museum-data panel; `storeUrl` → "Acquire" CTA; `getRelatedWorks()` section
- [x] **Branded loading state** — `app/loading.tsx` CSS-only Red Stripe progress bar

### Phase 3 — Collector Commerce
- [x] **lib/shopify.ts** — Storefront API client scaffolded: `getAllProducts()`, `getProductsByCollection()`, `isShopifyEnabled()` feature flag; **INACTIVE** — needs `SHOPIFY_STOREFRONT_API_TOKEN` in env
- [x] **/collect page** — tiered vault: Rabbits ($777) / The Icons ($5K–$6.5K) / After Hours ($5K–$7K+) / Tier IV Commissions; `isShopifyEnabled()` badge in hero; CollectTier component with availability dots
- [x] **Content model** — `lib/content.ts`: full `PortfolioItem` type (slug, storeUrl, medium, dimensions, edition, availability); `work()` helper; `getWorkBySlug()`, `getRelatedWorks()`; 20 works total

### Image Audit
- [x] **AI images purged** — `hero.jpg` (1024×1024 DALL-E) and `stripe-story.jpg` (1024×1024 AI) deleted
- [x] **Real replacements** — `stripe-portrait.jpg` (real JV editorial: blue-paint model w/ red slash across eyes) on homepage; `ballet-red.jpg` (all-red J.VLADIMIR-branded ballet photo) on story page
- [x] **20 real product images** — all pulled from jvladimir.store at native resolution
- [x] **4 new editorial photos** — downloaded from jvladimir.com Wix CDN at native resolution

---

## 5. What Needs To Be Done Next

### Immediate (Blocking)

**A. The Tux Photo** *(user needs to provide)*
JV has a brand-thesis portrait: him in a black tuxedo, Red Stripe painted across his eyes, Red Stripe Rabbit at his feet, brand strategy pages floating around him. This belongs as the Story page hero and an alternate homepage hero. Ask the user to drop it at `/public/vlad-tux.jpg`, then:
- Replace `ballet-red.jpg` in `app/story/page.tsx` with `vlad-tux.jpg`
- Consider using it in `EditorialSection` on homepage instead of `stripe-portrait.jpg`

**B. Favicon & OG Image**
No favicon or `opengraph-image` exists. Add to `app/`:
- `favicon.ico` (use the vlad-portrait logo or red stripe)
- `opengraph-image.png` — 1200×630, gallery-tone with artwork + wordmark

**C. Contact Form Backend**
`app/contact/page.tsx` has a form with no `action`. Wire it to a Resend/Formspree/Vercel serverless endpoint. JV's email is `mail@jvladimir.com`.

**D. Shopify Live Inventory**
When JV provides the token, add to Vercel env vars:
```
SHOPIFY_STOREFRONT_API_TOKEN=your_token_here
SHOPIFY_STORE_DOMAIN=jvladimir.myshopify.com
```
`isShopifyEnabled()` in `lib/shopify.ts` will automatically flip `/collect` to live data.

---

### Phase 4 — WebGL Big Swings

**E. Three.js Red Stripe Particle Hero**
Low-particle red paint field reacting to cursor. Rules:
- Desktop only: behind `(hover: hover) and (pointer: fine)` media query
- Lazy-loaded: `const ThreeHero = dynamic(() => import('@/components/ThreeHero'), { ssr: false })`
- `prefers-reduced-motion` disables particle motion (static field only)
- Max 500 particles, instanced mesh for performance

**F. 3D Rabbit Viewer**
Interactive 3D rotation of the Red Stripe Rabbit sculpture. Biggest collector showstopper.
- Need a `.glb` model file — JV must commission a 3D scan or use Meshy.ai
- Use `<model-viewer>` web component for easy implementation (no Three.js needed)
- Wire into `/works/golden-goose` (and other rabbit detail pages) as a tab: "Image / 3D View"

**G. Shader Image Distortion**
Hover effect on 3–6 key artworks that distorts like heat/wet paint.
- Use `@react-three/fiber` with a displacement shader
- Only on crown, ghost, golden-goose, stripe-portrait
- Fallback: the existing ArtCard3D stripe-sweep is sufficient on non-WebGL browsers

---

### Phase 5 — Content Expansion

**H. Photography Route** — `/works/photography`
`lib/content.ts` has `photographyItems` but no route renders them yet. Build a masonry or editorial grid. The 7 existing images in `public/photography/` with square Wix crops need proper re-download:
- **Problem:** `calvin-klein.jpg`, `london-model.jpg`, etc. are 1600×1600 (Wix `al_c` center-crop)
- **Fix:** Re-download from `https://static.wixstatic.com/media/[hash]~mv2.jpg` (direct URL, no crop params)
- **Method confirmed working:** direct URL without resize params returns native resolution

**I. Commissions Page** — `/commissions`
Nav currently shows "Works / The Stripe / Collect / Contact". Add "Commissions" between Collect and Contact:
- Pricing tiers: editorial photography (day rate), custom pop-art canvas (starting $5K), rabbit commission
- Lead form → triggers Resend email
- Current `navItems` in `lib/content.ts` — add the item there and it propagates to Header + Footer automatically

**J. Journal / Blog** — `/journal`
Reserve the route. Can be MDX-based. Collector acquisition stories, process posts, exhibition recaps.

---

## 6. Architecture Notes

### Single Source of Truth — `lib/content.ts`
- `navItems` → consumed by Header, Footer, and all internal CTAs
- `siteConfig` → email, locations, tagline — Footer, metadata, contact page
- `portfolioItems` → all 20 works; drives /portfolio, /works/[slug], PrivateViewingRail, WorksGallery
- **Adding a new work:** add one `work({...})` entry to `portfolioItems` array — detail page auto-generates via `generateStaticParams`

### Shopify Feature Flag Pattern
```ts
// lib/shopify.ts
export const isShopifyEnabled = () =>
  Boolean(process.env.SHOPIFY_STOREFRONT_API_TOKEN);

// In collect/page.tsx:
{isShopifyEnabled() && <span className="label">Live inventory</span>}
```
When the env var is absent, `/collect` renders from static `content.ts` data. When present, it fetches live products. Zero code change needed.

### View Transitions
`viewTransitionName` is set on `<img>` in both ArtCard3D and `works/[slug]/page.tsx`. The browser handles the morph automatically when navigating thumbnail → detail. Must use `next/link` for navigation (not `<a href>`).

### Touch vs. Desktop Split
```ts
const isHoverDevice = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
```
Used in: ArtCard3D (guard tilt), WorksGallery (intercept tap → ArtViewer vs navigate), PrivateViewingRail (GSAP vs scroll-snap).

---

## 7. Brand Rules

1. **The Red Stripe is the brand.** Scroll progress, cursor, loading state, form submit, availability markers — it lives everywhere with purpose. Never decorative.
2. **White gallery silence.** Cream background breathes. Don't fill every pixel.
3. **Ink rooms for contrast.** Alternate cream with `--bg-ink` (near-black) for manifesto, collector tiers, Maison Noir energy.
4. **Collector language only.** "Inquire" not "Add to Cart." "Edition 23/77" not "In Stock." "Enter the Vault" not "Shop Now."
5. **The stripe is rough, not perfect.** Clip-path polygons, displacement filters, gradient — never a clean CSS rectangle.
6. **Performance is luxury.** Budget: ≤180KB initial JS, ≤70KB CSS, hero ≤320KB AVIF. A 4-second LCP is not premium.

---

## 8. Asset Inventory

| Asset | Path | Status |
|-------|------|--------|
| Hero banner (editorial shoot) | `/public/hero-banner.avif` | ✅ Real, 2400×1603 |
| Stripe editorial (blue paint / red slash) | `/public/photography/stripe-portrait.jpg` | ✅ Real JV, 652KB |
| Story hero (ballet dancer, red) | `/public/photography/ballet-red.jpg` | ✅ Real JV, 244KB |
| 13 originals from jvladimir.store | `/public/portfolio/originals/` | ✅ All real |
| 7 rabbit sculptures from jvladimir.store | `/public/portfolio/rabbits/` | ✅ All real |
| JV brand logo/watermark | `/public/portfolio/vlad-portrait.png` | ✅ (note: not a JV portrait) |
| **Tux portrait** (Red Stripe eyes, rabbit) | `/public/vlad-tux.jpg` | ⏳ **USER MUST PROVIDE** |
| Photography grid images | `/public/photography/*.jpg` | ⚠️ 7 are 1600×1600 square crop |
| 3D Rabbit model | — | ❌ Doesn't exist yet |
| Favicon | — | ❌ Missing |
| OG image | — | ❌ Missing |

---

## 9. Commands

```bash
# Dev server (use a free port — 3000-3003 often occupied)
cd /Users/danielcastillo/Projects/Websites/jvladimir
npm run dev          # → localhost:3000 (or -p 3005 if busy)

# Build check before pushing
npm run build

# Deploy (auto on git push, or force manual)
vercel --prod --yes

# Git remote
git remote -v        # origin → https://github.com/DanielSensual/VLAD.git
```

---

## 10. The Tux Photo (Top Priority Asset)

The user described a portrait that is the entire brand thesis in one frame:
- JV seated in a **black tuxedo with bow tie**
- **Red Stripe painted across his eyes** — rough, brush-like
- **Red Stripe Rabbit sculpture at his feet**
- Brand strategy / campaign pages floating around him
- White studio background, watch, pocket square — luxury editorial energy

**Where it goes:**
1. `/public/vlad-tux.jpg` (or `.png`)
2. `app/story/page.tsx` — replace `ballet-red.jpg` in the full-bleed hero
3. `app/page.tsx` — consider as the `EditorialSection` imageSrc for "The Stripe" section (replacing `stripe-portrait.jpg`)

**How to ask:** *"Drop the tux portrait anywhere — Desktop, Downloads — and tell me the path. I'll resize, optimize, and wire it in."*

---

## 11. Style Rules for Code

- All CSS in `app/globals.css` — no CSS modules, no Tailwind, no `style` objects unless unavoidable
- Use `var(--token)` for every color, spacing, transition value
- Framer Motion for component-level animations (already installed)
- GSAP + `@gsap/react` for scroll-triggered work (already installed — see PrivateViewingRail)
- Three.js / `@react-three/fiber` only if implementing WebGL (Phase 4 — not yet installed)
- TypeScript strict — all files are `.tsx` / `.ts`
- Path alias `@/` maps to repo root (configured in tsconfig.json)
- `'use client'` only when required (GSAP refs, Framer Motion, event listeners, browser APIs)

---

## 12. Known Remaining Issues

| # | Issue | Severity |
|---|-------|----------|
| 1 | `public/photography/` images (7 of 11) are 1600×1600 Wix center-crop square | Low — not on any live route yet |
| 2 | `components/PortfolioGrid.tsx` is unused (replaced by WorksGallery) | Low — can delete |
| 3 | Contact form has no backend action | Medium — sends nowhere |
| 4 | No favicon or OG image | Medium — affects SEO + social |
| 5 | Tux portrait missing | High — Story page uses ballet placeholder |
| 6 | Shopify token not set — /collect is static only | Low until JV ready to sell |
| 7 | `vintage-portrait.jpg` is 1.9MB (missed the sips resize pass) | Low — run: `sips -Z 2400 --setProperty formatOptions 85 public/photography/vintage-portrait.jpg` |

---

*The site should feel like you walked into a private gallery and got quietly judged by the lighting.* 🩸
