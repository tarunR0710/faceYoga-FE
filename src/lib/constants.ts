// MapMyFace offer: ONE core plan (Founding Client Price) + two optional add-ons.
// All copy here is lifted from the Website Visual Blueprint — the approved
// terminology (Face Mapping Session, Expert Mapping Review, Face Map,
// Appearance Protocol, Hair Map, Style & Colour Map) is fixed, not paraphrased.
export const FACE_MAP_CORE = {
  id: 'complete_face_map',
  name: 'Complete MapMyFace Plan',
  price: 2699,
  priceInPaise: 269900,
  priceDisplay: '₹2,699',
  label: 'Founding Client Price',
  tagline: 'One guided experience from expert conversation to a personalised action plan.',
  summary:
    'Face Mapping Session, Expert Mapping Review, Face Map, Appearance Protocol and clarification support.',
  gstNote: 'GST-inclusive final price shown at checkout',
  delivery:
    'Your Face Map is prepared after the consultation and detailed review. Typical delivery target: approximately 2 or more days, depending on the case and selected add-ons.',
  /** Short list — order summary / checkout. */
  includes: [
    'Scheduled Face Mapping Session with a real expert',
    'Expert Mapping Review by the relevant specialists',
    'Your personalised Face Map',
    'Appearance Protocol — start, stop, continue and first, next, later',
    'Clarification support after delivery',
  ],
  /** Everything included — the blueprint's full main-offer list. */
  everything: [
    'Personal onboarding',
    'Scheduled Face Mapping Session',
    'Facial analysis',
    'Skin and routine review',
    'Skincare direction',
    'Product-category guidance',
    'Grooming recommendations',
    'Lifestyle-related observations',
    'Personalised face-yoga recommendations',
    'Expert Mapping Review',
    'Personalised Face Map',
    'Appearance Protocol',
    'Clarification support',
  ],
  /** Six-chip summary used on the pricing card. */
  highlights: [
    'Facial analysis',
    'Skin & routine review',
    'Skincare direction',
    'Grooming',
    'Face yoga',
    'Prioritised plan',
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
    longDescription:
      'Add a Hair Map to receive personalised haircut, hairstyle and facial-hair direction based on your facial structure, proportions, hair characteristics, lifestyle and maintenance preferences.',
    bullets: [
      'Suitable haircut structures',
      'Recommended hair length',
      'Hair parting, volume and shape',
      'Hairstyle references',
      'Styles to consider and avoid',
      'Facial-hair direction where relevant',
    ],
  },
  {
    id: 'style_colour_map',
    name: 'Style & Colour Map',
    price: 699,
    priceInPaise: 69900,
    priceDisplay: '₹699',
    tagline: 'Understand the colours and styles that work with you.',
    description: 'Clothing colours, silhouettes, necklines, accessories and presentation direction.',
    longDescription:
      'Add a Style & Colour Map to receive personalised clothing, colour and presentation guidance based on your appearance, lifestyle and goals.',
    bullets: [
      'Suitable colour direction',
      'Clothing silhouettes and necklines',
      'Casual and professional styling',
      'Accessories and presentation',
      'Occasion-based direction',
      'Styles to consider and avoid',
    ],
  },
] as const

/** Both specialist Maps together — the recommended checkout bundle. */
export const ADDON_BUNDLE = {
  price: 1199,
  priceDisplay: '₹1,199',
  saving: 199,
  savingDisplay: '₹199',
  label: 'Recommended checkout bundle',
} as const

export type AddOnId = (typeof FACE_MAP_ADDONS)[number]['id']

export const SITE_CONFIG = {
  name: 'MapMyFace',
  description: 'Understand your face. Discover what suits you.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  email: 'support@mapmyface.com',
  phone: '+91 9876543210',
}

// Header / footer navigation — blueprint order.
export const NAV_LINKS = [
  { href: '/#how-it-works', label: 'How It Works' },
  { href: '/#face-map', label: 'Your Face Map' },
  { href: '/#experts', label: 'Experts' },
  { href: '/#add-ons', label: 'Add-ons' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/#faq', label: 'FAQ' },
]

export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/mapmyfaceofficial',
  youtube: 'https://youtube.com/@mapmyfaceofficial',
  twitter: 'https://twitter.com/mapmyface',
}

/**
 * The blueprint's fifteen approved FAQ answers, verbatim. `group` drives the
 * filter chips on the FAQ section so fifteen questions stay browsable on a
 * phone. Answers are deliberately direct and free of technical language.
 */
export const FAQS = [
  {
    group: 'The basics',
    q: 'What exactly is MapMyFace?',
    a: 'MapMyFace is an expert-led personalised facial analysis and appearance-improvement platform. A real expert meets you through a Face Mapping Session, the relevant team studies your complete context, and you receive a personalised Face Map and Appearance Protocol.',
  },
  {
    group: 'The basics',
    q: 'Is MapMyFace an AI face scanner?',
    a: 'No. Technology may support parts of the process, but real expert consultation, interpretation and coordinated review are central to the MapMyFace experience.',
  },
  {
    group: 'The basics',
    q: 'Who conducts the Face Mapping Session?',
    a: 'An appropriate MapMyFace expert or trained lead specialist conducts the session and gathers the information required for the expert team.',
  },
  {
    group: 'The basics',
    q: 'Can men and women use MapMyFace?',
    a: 'Yes. The service is designed for people who want personalised clarity about what genuinely suits them.',
  },
  {
    group: 'Before your session',
    q: 'What should I prepare?',
    a: 'Join from a well-lit, quiet place. Keep your current skincare products and routine details available. Additional photo instructions will be shared during onboarding when required.',
  },
  {
    group: 'Before your session',
    q: 'What happens if I miss my consultation?',
    a: 'The final rescheduling and missed-session policy will be shown before payment and repeated in the booking confirmation.',
  },
  {
    group: 'What you receive',
    q: 'How long does the Face Map take?',
    a: 'The working delivery target is approximately two or more days after the Face Mapping Session. More complex cases or selected add-ons may require additional time.',
  },
  {
    group: 'What you receive',
    q: 'What is included in the main plan?',
    a: 'The main plan includes onboarding, the Face Mapping Session, facial analysis, skin and routine review, skincare direction, grooming guidance, relevant face yoga, expert review, your Face Map, Appearance Protocol and clarification support.',
  },
  {
    group: 'What you receive',
    q: 'Is Hair Map included?',
    a: 'No. Hair Map is an optional add-on for personalised haircut, hairstyle, parting, volume and facial-hair direction where relevant.',
  },
  {
    group: 'What you receive',
    q: 'Is Style & Colour Map included?',
    a: 'No. Style & Colour Map is an optional add-on for clothing colours, silhouettes, necklines, accessories and presentation guidance.',
  },
  {
    group: 'What you receive',
    q: 'Can I ask questions after receiving my Face Map?',
    a: 'Yes. Clarification support is available when something inside the delivered Face Map is unclear.',
  },
  {
    group: 'Boundaries',
    q: 'Will you recommend surgery?',
    a: 'No. MapMyFace is not positioned as a surgical-recommendation service.',
  },
  {
    group: 'Boundaries',
    q: 'Do you diagnose skin conditions?',
    a: 'MapMyFace provides appropriate appearance, routine and educational guidance. Medical concerns requiring diagnosis or treatment must be handled by a qualified medical professional.',
  },
  {
    group: 'Privacy & payment',
    q: 'Can my photos be used publicly?',
    a: 'Only with separate, explicit permission. Purchasing the service does not give MapMyFace permission to use your images for marketing.',
  },
  {
    group: 'Privacy & payment',
    q: 'Can I receive a refund?',
    a: 'The final cancellation and refund policy will be displayed clearly before payment. It should explain how service work already completed affects eligibility.',
  },
] as const

export const FAQ_GROUPS = [
  'All',
  'The basics',
  'Before your session',
  'What you receive',
  'Boundaries',
  'Privacy & payment',
] as const

export const OTP_CONFIG = {
  length: 6,
  expiryMinutes: 10,
  maxAttempts: 3,
  resendCooldownSeconds: 60,
}
