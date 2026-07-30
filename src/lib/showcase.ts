/**
 * ────────────────────────────────────────────────────────────────────────────
 * PLACEHOLDER SHOWCASE CONTENT  ·  swap for real assets before launch
 * ────────────────────────────────────────────────────────────────────────────
 * Everything here is a STAND-IN. All `image` values are stock/remote photos of
 * random people — NOT real clients, testimonials, or experts. The copy is
 * generic placeholder text with no invented medical claims.
 *
 * TO GO LIVE:
 *   1. Search this file for `REPLACE` — every field that needs your real content
 *      is marked.
 *   2. Drop real files in /public (e.g. /public/proof/ananya-after.jpg) and use
 *      "/proof/ananya-after.jpg", or paste a hosted URL.
 *   3. Set PLACEHOLDER = false once all real content + consent is in. Sections
 *      read this flag to show/hide the "sample content" ribbon.
 *
 * Do NOT deploy this as-is: fake testimonials / before-afters presented as real
 * are deceptive. It is scaffolding only.
 * ────────────────────────────────────────────────────────────────────────────
 */

/** Flip to false when every field below holds real, consented content. */
export const PLACEHOLDER = true

/* Curated stock portraits used as stand-ins (remote images are wildcarded in
   next.config.js). Replace per-entry below — these are just so layouts fill. */
const F = (id: string, w = 600, h = 800) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&crop=faces`

/* ── 1 · Before / after transformations ──────────────────────────────────────
   REPLACE each before/after with a real client's photos (same angle + lighting)
   and their real first name, city, focus area and timeframe. Get written consent. */
export interface Transformation {
  id: string
  name: string
  city: string
  focus: string
  weeks: number
  before: string
  after: string
}

export const TRANSFORMATIONS: Transformation[] = [
  { id: 't1', name: 'Ananya', city: 'Pune',      focus: 'Jawline & cheek definition', weeks: 10, before: F('photo-1531746020798-e6953c6e8e04'), after: F('photo-1494790108377-be9c29b29330') },
  { id: 't2', name: 'Rhea',   city: 'Mumbai',    focus: 'Under-eye & mid-face',       weeks: 12, before: F('photo-1507003211169-0a1dd7228f2d'), after: F('photo-1472099645785-5658abf4ff4e') },
  { id: 't3', name: 'Kabir',  city: 'Delhi',     focus: 'Jaw & neckline',             weeks: 14, before: F('photo-1500648767791-00dcc994a43e'), after: F('photo-1506794778202-cad84cf45f1d') },
  { id: 't4', name: 'Meera',  city: 'Bengaluru', focus: 'Cheek lift & symmetry',      weeks:  8, before: F('photo-1544005313-94ddf0286df2'), after: F('photo-1531123897727-8f129e1688ce') },
]

/* ── 2 · Testimonials ────────────────────────────────────────────────────────
   REPLACE with real customer words + real first name + city + how long in.
   Keep them specific and honest — no invented claims. Aim for realistic 4.7–4.9,
   not a suspicious perfect 5.0. */
export interface Testimonial {
  quote: string
  name: string
  city: string
  timeframe: string
  image: string
}

export const TESTIMONIALS: Testimonial[] = [
  { quote: 'The plan was clear and the daily routine only takes a few minutes. I could actually track what was changing month to month instead of guessing.', name: 'Ananya K.', city: 'Bengaluru', timeframe: '8 weeks in', image: F('photo-1494790108377-be9c29b29330', 160, 160) },
  { quote: 'It pointed me to the exact area to focus on, and that is where I saw the fastest change. For the price it was genuinely worth it.',              name: 'Rohan M.',  city: 'Mumbai',    timeframe: '3 months in', image: F('photo-1506794778202-cad84cf45f1d', 160, 160) },
  { quote: 'Simple, specific and honest — no pressure to buy more. I finally understood what actually suits my face instead of following random advice.',   name: 'Priya S.',  city: 'Delhi',     timeframe: '5 months in', image: F('photo-1534528741775-53994a69daeb', 160, 160) },
]

/** REPLACE with your real, verifiable rating + count. Do NOT ship a fake count. */
export const RATING = {
  score: '4.9',
  // REPLACE — real number of reviews once you have them; left blank so no fake count ships.
  count: '',
  note: 'Based on member reviews',
}

/* ── 3 · Expert panel ────────────────────────────────────────────────────────
   REPLACE with real, named experts: real photo, real qualification + institution,
   and written consent to appear. Bracketed values below are obvious placeholders. */
export interface Expert {
  name: string
  credential: string
  focus: string
  image: string
}

export const EXPERT_PANEL: Expert[] = [
  { name: '[Expert name]', credential: '[MBBS, MD — Dermatology]',       focus: 'Skin & surface',        image: F('photo-1559839734-2b71ea197ec2', 320, 320) },
  { name: '[Expert name]', credential: '[Certified facial-yoga coach]',   focus: 'Facial movement',       image: F('photo-1594824476967-48c8b964273f', 320, 320) },
  { name: '[Expert name]', credential: '[Cosmetologist / stylist]',       focus: 'Framing & styling',     image: F('photo-1573497019940-1c28c88b4f3e', 320, 320) },
  { name: '[Expert name]', credential: '[Research & method lead]',        focus: 'Evidence & method',     image: F('photo-1612349317150-e413f6a5b16d', 320, 320) },
]

/* ── 4 · Analysis face ───────────────────────────────────────────────────────
   The single portrait shown in the animated analysis console. REPLACE with a
   clear, front-facing face photo you own the rights to (ideally neutral bg,
   even lighting) — the annotation dots are positioned as % so any portrait works. */
export const ANALYSIS_FACE = F('photo-1544005313-94ddf0286df2', 700, 875)
