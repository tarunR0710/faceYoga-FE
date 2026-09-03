// ─────────────────────────────────────────────────────────────────────────────
// MapMyFace offer: ONE core plan (Founding Client Price) + two optional add-ons.
// Ported from the mapmyface-blueprint-homepage branch. The terminology here
// (Face Mapping Session, Expert Mapping Review, Face Map, Appearance Protocol,
// Hair Map, Style & Colour Map) is the approved wording — don't paraphrase it.
// ─────────────────────────────────────────────────────────────────────────────
export const FACE_MAP_CORE = {
  id: 'complete_face_map',
  name: 'Complete MapMyFace Plan',
  price: 2699,
  priceInPaise: 269900,
  priceDisplay: '₹2,699',
  // Regular price once the founding-client window closes. Shown struck
  // through next to the founding price so the discount is a fact on the
  // page, not just implied by the "Founding Client Price" label.
  originalPrice: 4999,
  originalPriceDisplay: '₹4,999',
  label: 'Founding Client Price',
  tagline: 'One guided experience from expert conversation to a personalised action plan.',
  summary:
    'Face Mapping Session, Expert Mapping Review, Face Map, Appearance Protocol and clarification support.',
  // Was 'GST-inclusive final price shown at checkout', which grammatically
  // promises the real number arrives LATER — the exact shape of drip pricing.
  // The number here is already the whole number, so say that.
  gstNote: 'GST included. ₹2,699 is the total — nothing is added at checkout',
  // Bounded on purpose. This read "approximately 2 or more days" — an open
  // ended figure is a disclaimer, not a promise, and it undercuts the argument
  // that a visible price means a fixed-scope product.
  delivery:
    'Your Face Map arrives 3–5 working days after your Face Mapping Session. Adding a specialist Map can take longer, and we tell you before you pay.',
  deliveryShort: '3–5 working days after your session',
  /** Short list — order summary / checkout. */
  includes: [
    'Scheduled Face Mapping Session with a real expert',
    'Expert Mapping Review by the relevant specialists',
    'Your personalised Face Map',
    'Appearance Protocol — start, stop, continue and first, next, later',
    'Clarification support after delivery',
  ],
  /**
   * Six chips on the pricing card. These used to be the same six territories as
   * the pillars grid, word for word — a third restatement of "what we look at",
   * sitting in the one place a buyer needs PURCHASE facts instead. They are now
   * the things you are actually paying for, and they absorb two facts that were
   * previously stranded in the comparison table ("Support" and "Broader
   * appearance"), where they were argument rather than fact.
   */
  highlights: [
    'Live session with a real expert',
    'Reviewed by the relevant specialists',
    '12-chapter personalised Face Map',
    'Prioritised Appearance Protocol',
    'Clarification support included',
    'Delivered in 3–5 working days',
  ],
} as const

export const FACE_MAP_ADDONS = [
  {
    id: 'hair_map',
    name: 'Hair Map',
    price: 699,
    priceInPaise: 69900,
    priceDisplay: '₹699',
    tagline: 'Discover the hair direction designed around your face.',
    description: 'Haircut, hairstyle, parting, volume and facial-hair direction where relevant.',
  },
  {
    id: 'style_colour_map',
    name: 'Style & Colour Map',
    price: 699,
    priceInPaise: 69900,
    priceDisplay: '₹699',
    tagline: 'Understand the colours and styles that work with you.',
    description: 'Clothing colours, silhouettes, necklines, accessories and presentation direction.',
  },
] as const

/**
 * The refund terms, in ONE place.
 *
 * The site previously stated three different policies at once: /refund promised
 * a 14-day full refund, /payment badged "7-day money-back guarantee", and
 * /refund excluded anyone who had "accessed more than 50% of the content" — a
 * clause written for a video course that cannot be computed for a live session
 * plus a bespoke report. Founder decision: session-contingent.
 *
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

/** Both specialist Maps together — the recommended checkout bundle. */
export const ADDON_BUNDLE = {
  price: 1199,
  priceDisplay: '₹1,199',
  saving: 199,
  savingDisplay: '₹199',
  label: 'Recommended checkout bundle',
} as const

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

/**
 * The ONE place add-on money is computed. Taking both Maps swaps the sum for
 * the bundle price rather than applying a percentage, so the saving shown and
 * the saving charged are the same number by construction.
 */
export function priceAddons(ids: readonly AddOnId[]) {
  const chosen = FACE_MAP_ADDONS.filter((a) => ids.includes(a.id))
  const gross = chosen.reduce((sum, a) => sum + a.price, 0)
  const bundled = chosen.length === FACE_MAP_ADDONS.length
  return { chosen, gross, net: bundled ? ADDON_BUNDLE.price : gross, saving: bundled ? ADDON_BUNDLE.saving : 0, bundled }
}

/** Quote for the whole order. Used by the pricing card AND the payment page. */
export function computeOrderTotal(ids: readonly AddOnId[]) {
  const addons = priceAddons(ids)
  const total = FACE_MAP_CORE.price + addons.net
  return { addons, total, totalInPaise: total * 100 }
}

export const PRICING_PLANS = {
  one_time: {
    id: 'one_time',
    name: 'One-Time Analysis',
    price: 1999,
    priceInPaise: 199900,
    priceDisplay: '₹1,999',
    period: '',
    description: 'Single comprehensive facial analysis',
    features: [
      'Complete facial structure analysis',
      'Personalized face yoga routine',
      '30-day exercise plan',
      'Video tutorials access',
      'Progress tracking guide',
    ],
    popular: false,
  },
  monthly: {
    id: 'monthly',
    name: 'Monthly Plan',
    price: 499,
    priceInPaise: 49900,
    priceDisplay: '₹499',
    period: '/month',
    description: 'Ongoing support and monthly updates',
    features: [
      'Everything in One-Time',
      'Monthly progress tracking',
      'Updated routines each month',
      'Priority email support',
      'Access to community',
    ],
    popular: false,
  },
  yearly: {
    id: 'yearly',
    name: 'Yearly Plan',
    price: 2999,
    priceInPaise: 299900,
    priceDisplay: '₹2,999',
    period: '/year',
    originalPrice: 5988,
    originalPriceDisplay: '₹5,988',
    savings: '50% OFF',
    description: 'Best value for committed transformation',
    features: [
      'Everything in Monthly',
      'Annual facial re-analysis',
      'Exclusive masterclass content',
      'Direct expert consultation',
      '1-on-1 video call (quarterly)',
      'Cancel anytime',
    ],
    popular: true,
  },
} as const

export type PlanId = keyof typeof PRICING_PLANS

export const SITE_CONFIG = {
  name: 'MapMyFace',
  tagline: 'Understand your face. Discover what suits you.',
  description:
    'Expert-led personalised facial analysis and appearance improvement, built for India.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  // TODO(founder): confirm the live support address before launch.
  email: 'support@mapmyface.in',
  phone: '+91 9876543210',
}

/**
 * In-page waypoints. Every href here MUST match an `id` rendered on the
 * homepage — `/#add-ons` used to sit in this list and pointed at nothing once
 * the duplicate add-ons section was folded into pricing, which is a silently
 * dead nav item. Four ranked waypoints, not six unranked ones.
 */
export const NAV_LINKS = [
  { href: '/#how-it-works', label: 'How It Works' },
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
