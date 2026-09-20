// ─────────────────────────────────────────────────────────────────────────────
// MapMyFace offer: ONE plan (Complete MapMyFace Plan) + three optional add-ons.
// Source of truth: "MapMyFace - Final 8-Figure Website Blueprint" (t 22.pdf).
// The terminology here (Face Mapping Session, Expert Mapping Review, Face Map,
// Appearance Protocol, Visual Direction, Hair Map, Style & Colour Map, Priority
// Delivery) is the approved wording — don't paraphrase it.
//
// Every price and every timing the site states lives in this file. Anything that
// shows a number to a customer must read it from here.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Service timings, as the blueprint commits to them. Phrased once here so the
 * FAQ, the How-it-works accordion, the success page and the pricing card can
 * never disagree.
 */
export const TIMINGS = {
  /** First contact after payment. */
  onboarding: 'typically within 30 minutes during service hours',
  onboardingShort: 'within ~30 minutes',
  /** How soon the session is scheduled. */
  scheduling: 'normally within 7 days',
  /** Length of the Face Mapping Session. */
  session: '45–60 minutes',
  sessionShort: '45–60 min',
  /** Standard Face Map delivery after the session. */
  delivery: 'up to 7 days after your session',
  deliveryShort: 'up to 7 days',
  /** Priority Delivery target. */
  priority: '24–48 hours after your completed session and required inputs',
  priorityShort: '24–48 hour target',
} as const

export const FACE_MAP_CORE = {
  id: 'complete_face_map',
  name: 'Complete MapMyFace Plan',
  price: 3499,
  priceInPaise: 349900,
  priceDisplay: '₹3,499',
  label: 'One-time · GST-inclusive',
  tagline: 'One plan. No tiers to decode.',
  summary:
    'Face Mapping Session, Expert Mapping Review, Face Map, Appearance Protocol and clarification call.',
  // The number here is already the whole number, so say that — never promise
  // the "final" figure arrives later, which is the shape of drip pricing.
  gstNote: 'GST included. ₹3,499 is the total — nothing is added at checkout',
  delivery: `Your Face Map is built after your session. Standard delivery may take ${TIMINGS.deliveryShort}; Priority Delivery moves it to a ${TIMINGS.priorityShort}.`,
  deliveryShort: TIMINGS.delivery,
  /** Everything included — the blueprint's thirteen. Order summary / checkout. */
  includes: [
    'Personal onboarding',
    `Live ${TIMINGS.sessionShort} Face Mapping Session`,
    '400+ facial assessments',
    '100+ personal context factors',
    'Expert Mapping Review',
    'Skin & routine review',
    'Skincare / product direction where appropriate',
    'Grooming guidance',
    'Relevant face-yoga direction',
    'Lifestyle / environmental observations',
    'Visual Direction where relevant',
    'Appearance Protocol',
    'Short expert clarification call / video call',
  ],
  /** Six chips on the pricing card — the blueprint's mobile plan card. */
  highlights: [
    `Live ${TIMINGS.sessionShort} Face Mapping Session`,
    '400+ facial assessments',
    '100+ personal context factors',
    'Face Map + Visual Direction',
    'Appearance Protocol',
    'Clarification call included',
  ],
  deliverable:
    'A personalised Face Map that explains your findings, what they mean, what deserves attention, what to do First / Next / Later — and, where useful, helps you see the recommended direction.',
} as const

export const FACE_MAP_ADDONS = [
  {
    id: 'priority_delivery',
    kind: 'delivery',
    name: 'Priority Delivery',
    price: 500,
    priceInPaise: 50000,
    priceDisplay: '₹500',
    tagline: 'Need it sooner?',
    description: `Move your Face Map to a ${TIMINGS.priorityShort} after your completed Face Mapping Session and required inputs.`,
  },
  {
    id: 'hair_map',
    kind: 'map',
    name: 'Hair Map',
    price: 999,
    priceInPaise: 99900,
    priceDisplay: '₹999',
    tagline: 'A clear hair direction built around your face.',
    description:
      'Haircut, length, parting, volume and facial-hair direction built around your face, hair characteristics and maintenance preferences — with Visual Direction on you.',
  },
  {
    id: 'style_colour_map',
    kind: 'map',
    name: 'Style & Colour Map',
    price: 999,
    priceInPaise: 99900,
    priceDisplay: '₹999',
    tagline: 'Colours, clothing shapes and presentation that work with you.',
    description:
      'Colour, clothing shape, occasion and detail direction that works with your appearance, lifestyle and goals — with selected Visual Direction.',
  },
] as const

/**
 * The refund terms, in ONE place. Founder decision: session-contingent.
 * Anything that shows refund terms to a customer must read them from here.
 */
export const REFUND_POLICY = {
  headline: 'Full refund any time before your session begins.',
  short: 'Full refund before your session — no questions asked',
  detail:
    'Cancel at any point before your Face Mapping Session starts and you get the whole amount back, no questions asked. Once the session has happened, the expert review and your report are already being written, so the fee is no longer refundable — except where we fail to deliver your Face Map to the scope described here, in which case the report portion is refunded.',
  reschedule:
    'Rescheduling is free. If we ever cancel or miss a booked session, you choose a new slot or take a full refund.',
} as const

/** Payment methods actually offered, for the trust row beside the price. */
export const PAYMENT_METHODS = ['UPI', 'Cards', 'Net banking', 'Wallets'] as const

export type AddOnId = (typeof FACE_MAP_ADDONS)[number]['id']

const ADDON_IDS = FACE_MAP_ADDONS.map((a) => a.id) as readonly AddOnId[]

/**
 * Parse an `?addons=a,b` query value into known ids, deduped and in canonical
 * order. Anything unrecognised is dropped — a hand-edited URL must never be
 * able to inject a line item or reorder the summary.
 */
export function parseAddonIds(raw: string | null | undefined): AddOnId[] {
  if (!raw) return []
  const wanted = new Set(raw.split(',').map((s) => s.trim()))
  return ADDON_IDS.filter((id) => wanted.has(id))
}

/** The ONE place add-on money is computed. No bundle pricing in this blueprint. */
export function priceAddons(ids: readonly AddOnId[]) {
  const chosen = FACE_MAP_ADDONS.filter((a) => ids.includes(a.id))
  const net = chosen.reduce((sum, a) => sum + a.price, 0)
  return { chosen, net }
}

/**
 * Quote for the whole order. Used by the pricing card AND the payment page.
 * The backend prices the same ids itself; the payment page aborts if the two
 * figures disagree, so the API must carry these exact prices.
 */
export function computeOrderTotal(ids: readonly AddOnId[]) {
  const addons = priceAddons(ids)
  const total = FACE_MAP_CORE.price + addons.net
  return { addons, total, totalInPaise: total * 100 }
}

export const SITE_CONFIG = {
  name: 'MapMyFace',
  tagline: 'Personal Appearance Intelligence',
  description:
    'Expert-led facial analysis and appearance guidance built around the person, not a generic ideal.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  // TODO(founder): confirm the live support address before launch.
  email: 'support@mapmyface.in',
  phone: '+91 9876543210',
}

/**
 * In-page waypoints. Every href here MUST match an `id` rendered on the
 * homepage. The blueprint's nav also carries "Results"; it is added by
 * `experiences.tsx` only once a real customer story is published, so the site
 * never ships a nav item that points at an empty section.
 */
export const NAV_LINKS = [
  { href: '/#how-it-works', label: 'How It Works' },
  { href: '/#what-we-map', label: 'What We Map' },
  { href: '/#face-map', label: 'Your Face Map' },
  { href: '/#experts', label: 'Experts' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/#faq', label: 'FAQ' },
]

// Handles are the ones named in the approved blueprint.
export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/mapmyfaceofficial',
  youtube: 'https://youtube.com/@MapMyFaceOfficial',
}

export const OTP_CONFIG = {
  length: 6,
  expiryMinutes: 10,
  maxAttempts: 3,
  resendCooldownSeconds: 60,
}
