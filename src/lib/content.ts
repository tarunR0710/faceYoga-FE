// ─────────────────────────────────────────────────────────────────────────────
// Homepage copy, in one place.
//
// Every block here traces back to the approved MapMyFace Website Visual
// Blueprint. The blueprint's *structure and terminology* are non-negotiable —
// Face Mapping Session, Expert Mapping Review, Face Map, Appearance Protocol,
// Hair Map, Style & Colour Map are the approved product nouns and must not be
// paraphrased. The blueprint's *sentences* have been rewritten here for the
// Indian reader: concrete instead of corporate, specific instead of safe.
//
// Two hard rules the blueprint sets and this file keeps:
//   1. No invented technical figures (no "160+ parameters", no customer counts).
//   2. No unverified outcome claims, no fabricated testimonials or credentials.
// ─────────────────────────────────────────────────────────────────────────────

// ── Hero ─────────────────────────────────────────────────────────────────────
export const HERO = {
  /**
   * The line above the headline.
   *
   * Qoves runs social proof here ("Join 50,000+ people"). We have no customer
   * count, and inventing one is the exact thing this rebuild exists to stop —
   * so the slot does the same TWO jobs by a different route: it gives the
   * reader a reason to belong, and a reason to act now.
   *
   * We lead with the denial instead. In a market saturated with AI
   * face-scanner apps, "is this just an algorithm?" is the first thought a cold
   * visitor has, and answering it before the headline is worth more than any
   * belonging cue — it reframes the entire page as a human service before they
   * read a word of it. The claim is also repeated at the top of the journey
   * section and in the FAQ, so the page never contradicts it.
   *
   * Kept under ~30 characters: at 11px mono with 0.2em tracking, anything
   * longer wraps to two lines on a 390px phone, and a wrapped eyebrow looks
   * broken. Alternatives of the right length, if you want to swap:
   *   'Now taking founding clients'  — honest urgency, pairs with the
   *                                    Founding Client Price on the pricing card
   *   'Founding clients · India'     — leans on local relevance
   *   'Be one of the first hundred'  — only if intake is genuinely capped, and
   *                                    only wired to real order data
   */
  eyebrow: 'Expert-led. Not an algorithm.',
  title: 'Understand your face.',
  muted: 'Know exactly what suits you.',
  lede:
    'Real experts study your face, skin, routine and lifestyle — then give you one clear plan built only for you.',
  /** The four things a buyer is really paying for. Shown as a rail under the fold. */
  pillars: [
    { tag: 'Live', label: 'Face Mapping Session' },
    { tag: 'Team', label: 'Multidisciplinary expert review' },
    { tag: 'Map', label: 'Your personalised Face Map' },
    { tag: 'Help', label: 'Clarification support' },
  ],
} as const

// ── The problem ──────────────────────────────────────────────────────────────
// Warm palette, deliberately not achromatic — see the local --po-* tokens at
// the top of problem.tsx. This section is a deliberate exception to the
// site's cold-clinical rule (founder call), not an oversight.
export const PROBLEM = {
  eyebrow: 'The Problem',
  titleLines: [
    'Stop following',
    'random advice.',
  ],
  support: [
    'A reel says ten steps.',
    'The salon pushes a treatment.',
    'Family recommends home remedies.',
    'Instagram shows someone else’s glow-up.',
    'Most of this was never made for your skin, your climate, or your face.',
  ],
  softLine: 'What if you could finally see what actually works for you?',
  sources: [
    { label: 'Instagram / Reels', text: 'Viral routines that worked for somebody else’s skin.' },
    { label: 'Salon / Parlour', text: 'One treatment, recommended to every walk-in.' },
    { label: 'Family & Friends', text: 'Well-meant remedies, made for a different face.' },
    { label: 'Random Ads', text: 'Products sold to everyone, tailored to no one.' },
  ],

  // ── Interactive "Noise → Clarity" version (design handoff 1b) ──────────────
  // Tap a bubble (or the CTA) to dismiss it; the portrait un-blurs and the
  // answer card lights up once all six are cleared.
  body: 'A reel says ten steps. The salon pushes a treatment. Family recommends home remedies. None of it was made for your face.',
  // Teal palette (design handoff option 2a) — the site's own brand tokens:
  // #3D6B76 · #2C4F58 · #ADC7CE. Sand (#E9D8B4) is the one warm note kept so
  // the "family" bubble still reads as a different voice from the rest.
  bubbles: [
    { id: 'a', text: '10-step routine ✦', left: '10%', top: '12%', rotate: -6, bg: '#FFFFFF', fg: '#3D6B76' },
    { id: 'b', text: 'Get the ₹4,000 facial', left: '50%', top: '5%', rotate: 4, bg: '#3D6B76', fg: '#FFFFFF' },
    { id: 'c', text: 'Ice your face daily', left: '0%', top: '44%', rotate: 3, bg: '#2C4F58', fg: '#FFFFFF' },
    { id: 'd', text: 'Glow in 7 days · Ad', left: '60%', top: '48%', rotate: -3, bg: '#FFFFFF', fg: '#1E353B' },
    { id: 'e', text: 'Haldi + besan, beta', left: '10%', top: '84%', rotate: -2, bg: '#E9D8B4', fg: '#1E353B' },
    { id: 'f', text: 'Try this serum!!', left: '58%', top: '82%', rotate: 5, bg: '#ADC7CE', fg: '#1E353B' },
  ],
  // Marquee reuses the same four sources above.
  answer: {
    label: 'Made for your face',
    quote: 'What if you could finally see what actually works for you?',
    // Categories the plan actually considers — not a claim about any specific
    // visitor's skin, which nobody has looked at yet at this point in the page.
    grid: [
      { title: 'Your face', text: 'structure, proportions, tension — read by a person' },
      { title: 'Skin', text: 'type, sensitivity, routine' },
      { title: 'Climate', text: 'humidity, water, pollution' },
    ],
    ctaDefault: 'Clear the noise',
    ctaCleared: 'Map my face · 2 min',
  },
  // Annotation badges that appear around the portrait once cleared. Same
  // honesty rule as the grid above — categories considered, not invented
  // findings about this specific (anonymous, unphotographed-by-us) visitor.
  markers: [
    { text: 'Facial balance', sub: 'read together', left: '2%', top: '10%', delay: 0.15 },
    { text: 'Skin & routine', sub: 'your real context', left: '68%', top: '22%', delay: 0.3 },
    { text: 'Your climate', sub: 'humidity, pollution', left: '62%', top: '78%', delay: 0.45 },
    { text: 'Practical fit', sub: 'budget, upkeep', left: '4%', top: '72%', delay: 0.6 },
  ],
} as const

// ── The full picture — what actually feeds the plan, right before it ────────
export const FULL_PICTURE = {
  eyebrow: 'What we take into account',
  title: 'Your plan is shaped by',
  muted: 'the full picture.',
  lede: 'We don’t look at your face in isolation. We study the real context around it.',
  items: [
    {
      img: '/full-picture/face-features.png',
      title: 'Your face & features',
      text: 'Structure, balance, proportions, and how your features work together.',
    },
    {
      img: '/full-picture/skin-routine.png',
      title: 'Your skin & routine',
      text: 'Current products, history, sensitivities, and what has or hasn’t worked.',
    },
    {
      img: '/full-picture/lifestyle.png',
      title: 'Your lifestyle',
      text: 'Sleep, stress, diet, daily habits, and how you actually live.',
    },
    {
      img: '/full-picture/environment.png',
      title: 'Your environment',
      text: 'Climate, humidity, pollution, and the conditions your skin faces.',
    },
    {
      img: '/full-picture/goals-preferences.png',
      title: 'Your goals & preferences',
      text: 'What you want to improve, what feels realistic, and what fits your life.',
    },
  ],
} as const

// ── The plan — the calm answer right after the Problem ──────────────────────
export const PLAN = {
  eyebrow: 'The plan',
  title: 'Simply follow your plan.',
  muted: 'See the difference it makes.',
  lede:
    'One coordinated set of decisions for your face, skin, grooming and routine — prioritised in the right order, not scattered across a dozen sources.',
  subTitle: 'Built around you, not a template',
  body: 'No random steps. No overwhelming lists.',
  // Design handoff 3a — five hairline rows: an italic keyword on the left,
  // one plain line on the right. No ticks, no icons, no ornaments.
  rows: [
    { keyword: 'Analysis', text: 'Your facial features, balance and proportions' },
    { keyword: 'Skin', text: 'Routine direction based on your real context' },
    { keyword: 'Grooming', text: 'Face-yoga and grooming that suit your face' },
    { keyword: 'Order', text: 'What to do first, next and later' },
    { keyword: 'Support', text: 'Clarification whenever you need it' },
  ],
  closing: 'This is what clarity looks like when it’s made only for you.',
} as const

// ── What is MapMyFace: the six things we look at ─────────────────────────────
export const PILLARS = {
  eyebrow: 'What is MapMyFace',
  title: 'One place to understand',
  muted: 'what genuinely suits you.',
  lede:
    'MapMyFace is an expert-led facial analysis and appearance service. We understand the whole person before we write a single recommendation.',
  items: [
    {
      n: '01',
      title: 'Facial Analysis',
      text: 'Your features, proportions and balance — read together, in relation to each other, not one at a time.',
    },
    {
      n: '02',
      title: 'Skin & Routine',
      text: 'What your skin is actually doing, and what your current routine is doing to it. Including the products you have already tried.',
    },
    {
      n: '03',
      title: 'Skincare Direction',
      text: 'Which routines and product categories suit you. Written as direction you can shop from — not a brand list we are paid to push.',
    },
    {
      n: '04',
      title: 'Grooming',
      text: 'Beard shape, brows, hairline, edges. The everyday decisions that either work with your features or quietly fight them.',
    },
    {
      n: '05',
      title: 'Face Yoga',
      text: 'Only the exercises that are relevant to your face, with honest expectations about what movement can and cannot change.',
    },
    {
      n: '06',
      title: 'Lifestyle Context',
      text: 'Delhi winters, Chennai humidity, night shifts, hard water, long commutes. Context changes the advice — so we ask about it.',
    },
  ],
} as const

// ── The outcome ──────────────────────────────────────────────────────────────
export const OUTCOME = {
  eyebrow: 'The outcome',
  title: 'Not more advice.',
  muted: 'A clear plan.',
  lede:
    'These are the questions people are normally left to solve alone, usually at 1 a.m. with fourteen tabs open. Your Face Map answers them in your context.',
  questions: [
    'What genuinely suits my face?',
    'Which parts of my routine should I change?',
    'What should I start, stop or continue?',
    'Which improvements should I prioritise?',
    'Which skincare direction may suit me?',
    'Which face-yoga exercises are actually relevant?',
    'What do I do first, next and later?',
  ],
  closing: 'Your Face Map turns expert analysis into direction you can actually follow.',
  protocolTag: 'Appearance Protocol',
  protocolTitle: 'First. Next. Later.',
  protocol: [
    { n: '01', text: 'Build your foundation' },
    { n: '02', text: 'Introduce focused changes' },
    { n: '03', text: 'Review and refine' },
  ],
} as const

// ── The method: five steps ───────────────────────────────────────────────────
export const METHOD = {
  eyebrow: 'The MapMyFace method',
  title: 'A human-led process,',
  muted: 'designed to understand the whole person.',
  lede:
    'The complicated part happens behind the scenes. What you experience is a clear, guided journey from booking to direction.',
  steps: [
    {
      n: '01',
      title: 'Choose your plan',
      text: 'Take the Complete MapMyFace Plan. Add a Hair Map or Style & Colour Map only if you want them.',
    },
    {
      n: '02',
      title: 'Face Mapping Session',
      text: 'Meet a real expert on a scheduled, private video consultation. No forms standing in for a conversation.',
    },
    {
      n: '03',
      title: 'Expert Mapping Review',
      text: 'The relevant specialists study your face, skin, routine, context and goals together, as one case.',
    },
    {
      n: '04',
      title: 'Receive your Face Map',
      text: 'Your analysis, recommendations and Appearance Protocol arrive as one organised report.',
    },
    {
      n: '05',
      title: 'Ask for clarification',
      text: 'Message the team whenever something in your Face Map is not clear. That is included, not extra.',
    },
  ],
} as const

// ── The Face Mapping Session ─────────────────────────────────────────────────
export const SESSION = {
  eyebrow: 'Face Mapping Session',
  title: 'Your analysis begins',
  muted: 'with a real conversation.',
  lede:
    'A few photographs cannot explain your situation. In your Face Mapping Session an expert speaks with you, observes your face and skin, and understands the personal reasons sitting behind your concerns.',
  quote: 'We do not analyse only your photographs. We understand the person behind them.',
  chips: ['Face & skin', 'Routine history', 'Environment', 'Lifestyle', 'Goals', 'Practical fit'],
  /** Labels for the mock consultation panel. */
  panel: {
    title: 'Face Mapping Session',
    meta: 'Private video consultation',
    you: 'You',
    expert: 'MapMyFace Expert',
    // No duration. A '38:24' call timer was rendered here, and nothing in the
    // offer states how long a Face Mapping Session runs — a specific figure on
    // a marketing page becomes an implied promise. Publish a committed length
    // once the business commits to one; until then, show none.
    prompts: [
      { tag: 'Goals', text: 'What do you want to improve?' },
      { tag: 'Routine', text: 'What have you used before?' },
      { tag: 'Context', text: 'Where and how do you live?' },
    ],
  },
} as const

// ── What the expert actually asks ────────────────────────────────────────────
export const CONTEXT_GROUPS = {
  eyebrow: 'What the expert understands',
  title: 'Personal recommendations',
  muted: 'need personal context.',
  note:
    'The session follows a structured conversation, but the expert stays free to go deeper wherever your situation needs it.',
  groups: [
    {
      title: 'Your goals',
      items: [
        'What you would actually like to improve',
        'What concerns you the most right now',
        'The result you are hoping for',
      ],
    },
    {
      title: 'Your skincare history',
      items: [
        'Everything you are using at the moment',
        'What you used over the past year',
        'Reactions, sensitivities, and what did nothing at all',
      ],
    },
    {
      title: 'Your daily routine',
      items: [
        'Your morning and night routine, honestly',
        'Work environment, sleep and stress',
        'Sun exposure and physical activity',
      ],
    },
    {
      title: 'Your lifestyle',
      items: [
        'Food habits and how much water you really drink',
        'Travel frequency and daily schedule',
        'Smoking or alcohol, where it is relevant',
      ],
    },
    {
      title: 'Your environment',
      items: [
        'Your city, its climate and humidity',
        'Pollution levels and seasonal changes',
        'Places you travel to regularly',
      ],
    },
    {
      title: 'Relevant personal context',
      items: [
        'Concerns you choose to share with us',
        'Grooming and face-yoga history',
        'Budget, and how much maintenance you actually want',
      ],
    },
  ],
  boundary:
    'MapMyFace provides appearance, routine and educational guidance. Anything that needs a diagnosis or medical treatment belongs with a qualified medical professional, and we will say so plainly.',
} as const

// ── Expert Mapping Review + the panel ────────────────────────────────────────
export const REVIEW = {
  eyebrow: 'Expert Mapping Review',
  title: 'One person. Several specialists.',
  muted: 'One coordinated plan.',
  lede:
    'After your Face Mapping Session, the relevant MapMyFace specialists review your complete case together. The point is not four separate opinions you have to reconcile yourself — it is one direction.',
  centre: 'Your complete case',
  nodes: [
    {
      title: 'Medical & skin context',
      text: 'Appropriate professional review wherever your concerns call for it.',
    },
    {
      title: 'Facial analysis & research',
      text: 'Structure, relationships, balance and evidence-informed interpretation.',
    },
    {
      title: 'Face-yoga direction',
      text: 'Exercises chosen around your needs and what you can realistically keep up.',
    },
    {
      title: 'Hair & personal style',
      text: 'Specialist review when you have added a Hair Map or Style & Colour Map.',
    },
  ],
  closing:
    'Every recommendation has to work with the others, because they all land on the same person.',
  panelEyebrow: 'The expert panel',
  panelTitle: 'Guided by experienced specialists.',
  panelNote:
    'We publish names, qualifications, experience and photographs only after they are verified and approved. No stock photos, no borrowed credentials.',
  panel: [
    {
      role: 'Medical & Skin Expert',
      text: 'Skin context, safety boundaries and appropriate review.',
      mono: 'MS',
    },
    {
      role: 'Facial Analysis & Research',
      text: 'Facial relationships, structured evaluation and methodology.',
      mono: 'FA',
    },
    {
      role: 'Face Yoga Specialist',
      text: 'Relevant movement and exercise recommendations.',
      mono: 'FY',
    },
    {
      role: 'Hair & Personal Style',
      text: 'Hair, colour and personal presentation, for the add-on reviews.',
      mono: 'HS',
    },
  ],
} as const

// ── Your Face Map (the deliverable) ──────────────────────────────────────────
export const FACE_MAP = {
  eyebrow: 'Your Face Map',
  title: 'Your complete analysis,',
  muted: 'organised into one personal report.',
  lede:
    'Your Face Map is written after the Face Mapping Session and the Expert Mapping Review. It explains what the team observed, what those observations mean, and what you should do about them.',
  bullets: [
    'Clear explanations, not unexplained scores out of ten',
    'Visual analysis with the context that makes it readable',
    'Recommendations already sorted by priority',
    'Actions you can follow without rearranging your life',
  ],
  chaptersEyebrow: 'Inside your Face Map',
  chaptersTitle: 'Twelve chapters.',
  chaptersMuted: 'One purpose: turning analysis into clarity.',
  chapters: [
    'Your Profile & Goals',
    'Facial Overview',
    'Feature-by-Feature Analysis',
    'Facial Balance & Proportions',
    'Skin & Routine Review',
    'Skincare Direction',
    'Grooming Guidance',
    'Lifestyle Observations',
    'Your Face-Yoga Plan',
    'Your Appearance Protocol',
    'First, Next & Later',
    'Recommended Follow-Through',
  ],
  chaptersMeta: [
    'Written in plain, respectful language',
    'Reviewed before it reaches you',
  ],
} as const

// ── The Appearance Protocol ──────────────────────────────────────────────────
export const PROTOCOL = {
  eyebrow: 'Your Appearance Protocol',
  title: 'A plan you can',
  muted: 'actually follow.',
  lede:
    'Every recommendation is sorted by what to start, stop or keep — and by what deserves attention now versus later. Analysis is only useful when it leads to action.',
  /** The six chips, with the one-word meaning the blueprint gives each. */
  chips: [
    { label: 'Start', meaning: 'introduce', text: 'New actions and routines recommended for you.' },
    { label: 'Stop', meaning: 'remove', text: 'Habits, products or approaches that are not supporting your goals.' },
    { label: 'Continue', meaning: 'keep', text: 'The things already working — protected, not replaced.' },
    { label: 'First', meaning: 'priority', text: 'The highest-priority changes. Foundation before anything else.' },
    { label: 'Next', meaning: 'after foundation', text: 'What to introduce once the foundation is actually holding.' },
    { label: 'Later', meaning: 'optional', text: 'Optional and lower-priority improvements, kept honestly optional.' },
  ],
  quote: 'A better plan is not the longest plan. It is the clearest one.',
} as const

// ── Face yoga, in its right place ────────────────────────────────────────────
export const FACE_YOGA = {
  eyebrow: 'Face Map · chapter 09',
  title: 'Face yoga chosen for your face,',
  muted: 'not a playlist you follow blindly.',
  lede:
    'We keep a full library across every area of the face. Your Face Map prescribes only the exercises relevant to your features — with honest expectations about what movement can and cannot change.',
  note: 'Tap any area to see what the library covers',
} as const

// ── Methodology ──────────────────────────────────────────────────────────────
export const METHODOLOGY = {
  eyebrow: 'The methodology',
  title: 'A deeper way to read',
  muted: 'personal appearance.',
  note:
    'Our method combines structured facial observation, skin and routine assessment, personal-context factors and specialist interpretation.',
  factors: [
    { title: 'Facial reference points', text: 'The location and relationship of meaningful points on your face.' },
    { title: 'Feature relationships', text: 'How your individual features work with each other, not in isolation.' },
    { title: 'Proportion evaluations', text: 'Balance, scale and the relationships that are actually visible.' },
    { title: 'Skin characteristics', text: 'Visible skin behaviour, alongside the concerns you describe.' },
    { title: 'Routine factors', text: 'Current and previous products, and the habits around them.' },
    { title: 'Lifestyle variables', text: 'Sleep, food, hydration, stress and the shape of your day.' },
    { title: 'Environmental context', text: 'City, climate, humidity, pollution and regular travel.' },
    { title: 'Personal preferences', text: 'Your goals, your taste, your comfort, the direction you want.' },
    { title: 'Practical fit', text: 'Budget, maintenance and whether you will realistically keep it up.' },
  ],
  disclaimer:
    'We will publish exact technical figures — reference points, structured evaluations, personal factors — only once our expert team completes and signs off the MapMyFace methodology audit. Until then we would rather show you no number than an invented one.',
} as const

// ── Why MapMyFace is different (comparison table) ────────────────────────────
export const DIFFERENCE = {
  eyebrow: 'Why MapMyFace is different',
  title: 'More than a scan.',
  muted: 'More than a consultation.',
  lede: 'Most advice starts from a trend and works backwards to your face. This starts from your face.',
  colGeneric: 'Generic advice or a basic tool',
  colOurs: 'MapMyFace',
  rows: [
    {
      label: 'Starting point',
      generic: 'Trends, a few uploaded images or a generic form',
      ours: 'A live Face Mapping Session with a real expert',
    },
    {
      label: 'Understanding',
      generic: 'One visible concern, or one category',
      ours: 'Face, skin, routine, environment and goals together',
    },
    {
      label: 'Interpretation',
      generic: 'Automated output, or one isolated opinion',
      ours: 'Expert Mapping Review across the relevant specialists',
    },
    {
      label: 'Recommendations',
      generic: 'General suggestions that apply to everybody',
      ours: 'Personal recommendations designed to work together',
    },
    {
      label: 'Priority',
      generic: 'A long list, in no particular order',
      ours: 'Clear priority: what to do first, next and later',
    },
    {
      label: 'Support',
      generic: 'No clear follow-up once you have paid',
      ours: 'Clarification support after your Face Map arrives',
    },
    {
      label: 'Broader appearance',
      generic: 'Hair and clothing treated as separate problems',
      ours: 'Optional Hair Map and Style & Colour Map, reviewed in context',
    },
  ],
} as const

// ── Who it is for ────────────────────────────────────────────────────────────
export const AUDIENCE = {
  eyebrow: 'Who it is for',
  title: 'For anyone who wants clarity',
  muted: 'about what genuinely suits them.',
  lede:
    'MapMyFace is built for Indian men and women who want informed, personal direction for their face, skin, grooming and overall appearance.',
  items: [
    {
      title: 'You have heard too many opinions',
      text: 'Everyone has told you something different, and you still do not know which part applies to you.',
    },
    {
      title: 'You have bought products on faith',
      text: 'Half-used bottles in the drawer, picked up because someone online was confident about them.',
    },
    {
      title: 'You are unsure about your hair',
      text: 'Which cut, which length, which beard shape — and whether the one you keep asking for is working at all.',
    },
    {
      title: 'You want to look intentional',
      text: 'Not made-over. Just coordinated, deliberate and recognisably yourself.',
    },
    {
      title: 'You want a structured glow-up',
      text: 'You want to improve, but in an order that makes sense — not by changing everything randomly.',
    },
    {
      title: 'You prefer reasoning to trends',
      text: 'You would rather be told why something suits you than watch another before-and-after edit.',
    },
  ],
} as const


// ── Add-ons, explained properly ──────────────────────────────────────────────
export const ADDON_DETAIL = {
  eyebrow: 'Optional add-ons',
  title: 'Complete your Map',
  muted: 'when you want the rest of the picture.',
  lede:
    'The Complete MapMyFace Plan stands on its own. Priority Delivery, the Hair Map and the Style & Colour Map are optional, and the two specialist Maps are reviewed alongside the same case — not sold as separate services.',
  items: [
    {
      id: 'priority_delivery',
      name: 'Priority Delivery',
      price: '+₹500',
      tagline: 'Need it sooner?',
      text:
        'Move your Face Map to a 24–48 hour target after your completed Face Mapping Session and required inputs. Same Face Map, same expert review — only the queue changes.',
      includes: [
        '24–48 hour delivery target',
        'Clock starts after the session and any required inputs are complete',
        'Same Face Map and Expert Mapping Review, delivered sooner',
      ],
    },
    {
      id: 'hair_map',
      name: 'Hair Map',
      price: '+₹999',
      tagline: 'A clear hair direction built around your face.',
      text:
        'A clear haircut, length, parting, volume and facial-hair direction built around your face, hair characteristics and maintenance preferences — with Visual Direction on you.',
      includes: [
        'Haircut structure',
        'Length',
        'Parting',
        'Volume',
        'Style direction',
        'Facial hair',
        'Visual Direction on you',
      ],
    },
    {
      id: 'style_colour_map',
      name: 'Style & Colour Map',
      price: '+₹999',
      tagline: 'Colours, clothing shapes and presentation that work with you.',
      text:
        'Colours, clothing shapes and presentation direction that work with your appearance, lifestyle and goals — with selected visual examples so you can see the recommended presentation direction on you.',
      includes: [
        'Colour — direction and combinations that support your overall presentation',
        'Clothing shape — silhouettes, necklines and proportions to consider',
        'Occasion — casual, professional and event-based presentation where useful',
        'Details — accessories, styling choices and styles to consider or avoid',
        'Visual Direction — selected visual examples on you',
      ],
    },
  ],
} as const

// ── After payment ────────────────────────────────────────────────────────────
export const AFTER_PAYMENT = {
  eyebrow: 'After payment',
  title: 'From checkout',
  muted: 'to your Face Map.',
  note:
    'You should never be left wondering what happens next. Every step is explained before you pay, and repeated on the confirmation screen.',
  steps: [
    { n: '01', title: 'Complete payment', text: 'Choose the main plan and any add-ons.' },
    { n: '02', title: 'Receive confirmation', text: 'See the next steps immediately after checkout.' },
    { n: '03', title: 'Personal contact', text: 'A MapMyFace team member walks you through the process.' },
    { n: '04', title: 'Choose your slot', text: 'Book the earliest Face Mapping Session that suits you.' },
    { n: '05', title: 'Attend the session', text: 'Meet the expert on a private video consultation.' },
    { n: '06', title: 'Expert review', text: 'Your complete case is studied by the relevant team.' },
    { n: '07', title: 'Receive your Face Map', text: 'Your report and Appearance Protocol arrive together.' },
    { n: '08', title: 'Ask for clarification', text: 'Contact the team whenever something is unclear.' },
  ],
} as const

// ── Privacy & trust ──────────────────────────────────────────────────────────
export const PRIVACY = {
  eyebrow: 'Privacy & trust',
  title: 'Your face and your information',
  muted: 'stay yours.',
  lede:
    'You share photographs, routines and concerns because you trust the process. That deserves to be explained here, in plain words, and not buried inside a legal page.',
  items: [
    {
      title: 'Private by default',
      text: 'Your report and everything you submit are treated as confidential.',
    },
    {
      title: 'Purpose-limited access',
      text: 'Only the team members who need your information to deliver the service can see it.',
    },
    {
      title: 'Separate marketing consent',
      text: 'Photos, clips and testimonials are never used publicly without separate, explicit permission.',
    },
    {
      title: 'Secure payment',
      text: 'Trusted payment infrastructure, with the final amount shown clearly before you pay.',
    },
    {
      title: 'Clear professional boundaries',
      text: 'We do not promise diagnosis or treatment through appearance analysis.',
    },
    {
      title: 'You stay in control',
      text: 'Clear routes to reach us for privacy questions and data-deletion requests.',
    },
  ],
} as const

// ── FAQ ──────────────────────────────────────────────────────────────────────
export const FAQ_CONTENT = {
  eyebrow: 'FAQ',
  title: 'Everything worth knowing',
  muted: 'before you pay.',
  groups: [
    {
      category: 'The service',
      items: [
        {
          q: 'What exactly is MapMyFace?',
          a: 'MapMyFace is an expert-led personalised facial analysis and appearance-improvement service. A real expert meets you in a Face Mapping Session, the relevant specialists study your complete context, and you receive a personalised Face Map and Appearance Protocol.',
        },
        {
          q: 'Is this an AI face scanner?',
          a: 'No. Technology supports parts of the process, but the consultation, interpretation and coordinated review are done by people. You are not paying for an automated score.',
        },
        {
          q: 'Who conducts the Face Mapping Session?',
          a: 'An appropriate MapMyFace expert or trained lead specialist conducts the session and gathers everything the expert team needs for the review.',
        },
        {
          q: 'Can both men and women use MapMyFace?',
          a: 'Yes. The service is built for anyone who wants personalised clarity about what genuinely suits them.',
        },
      ],
    },
    {
      category: 'Your session & report',
      items: [
        {
          q: 'What should I prepare?',
          a: 'Join from a quiet, well-lit place. Keep your current skincare products and routine details handy. If any additional photographs are needed, we will tell you exactly what during onboarding.',
        },
        {
          q: 'How long does the Face Map take?',
          a: 'The working target is approximately two or more days after your Face Mapping Session. More complex cases and selected add-ons can take a little longer, and we will tell you if yours does.',
        },
        {
          q: 'What is included in the main plan?',
          a: 'Onboarding, the Face Mapping Session, facial analysis, skin and routine review, skincare direction, grooming guidance, relevant face yoga, the Expert Mapping Review, your Face Map, your Appearance Protocol and clarification support.',
        },
        {
          q: 'Can I ask questions after receiving my Face Map?',
          a: 'Yes. Clarification support is included for anything in your delivered Face Map that is not clear.',
        },
      ],
    },
    {
      category: 'Add-ons, money & boundaries',
      items: [
        {
          q: 'Is the Hair Map included?',
          a: 'No. Hair Map is an optional add-on covering personalised haircut, hairstyle, parting, volume and facial-hair direction where relevant.',
        },
        {
          q: 'Is the Style & Colour Map included?',
          a: 'No. Style & Colour Map is an optional add-on covering clothing colours, silhouettes, necklines, accessories and presentation guidance.',
        },
        {
          q: 'Will you recommend surgery?',
          a: 'No. MapMyFace is not a surgical-recommendation service and does not position itself as one.',
        },
        {
          q: 'Do you diagnose skin conditions?',
          a: 'No. We provide appearance, routine and educational guidance. Anything requiring diagnosis or treatment must be handled by a qualified medical professional, and we will say so rather than guess.',
        },
        {
          q: 'Can my photos be used publicly?',
          a: 'Only with separate, explicit permission. Buying the service does not give MapMyFace any right to use your images for marketing.',
        },
        {
          q: 'What if I miss my consultation?',
          a: 'The rescheduling and missed-session policy is shown before payment and repeated in your booking confirmation, so there are no surprises either way.',
        },
        {
          q: 'Can I get a refund?',
          a: 'The cancellation and refund policy is displayed clearly before payment, including how work already completed affects eligibility.',
        },
      ],
    },
  ],
} as const

// ── Closing CTA ──────────────────────────────────────────────────────────────
export const CLOSING = {
  eyebrow: 'Your plan starts with understanding',
  title: 'Stop guessing what suits you.',
  muted: 'Start with a plan built around you.',
  lede:
    'Meet real experts, understand your appearance properly, and receive clear personal direction in your own Face Map.',
  chips: ['Personal onboarding included', 'Expert-led consultation', 'Clarification support available'],
} as const

// ── Before / after pairs ─────────────────────────────────────────────────────
// Not in the blueprint, but the site already carries real client pairs and they
// are the strongest proof on the page. Copy stays deliberately unexcited: the
// blueprint's rule against unverified outcome claims applies here most of all.
export const TRANSFORMATIONS = {
  eyebrow: 'Coordinated change',
  title: 'Small, correct decisions.',
  muted: 'Visible difference.',
  lede:
    'No surgery, no procedures. Hair, grooming, skin and routine decisions that suit the face — made in the right order instead of all at once.',
  benefits: [
    'You stop buying products on somebody else’s advice',
    'You walk into interviews and meetings already sorted',
    'Your grooming looks deliberate, not accidental',
    'Photographs stop being something you avoid',
    'You know what to maintain, and what to ignore',
  ],
  disclaimer:
    'Non-surgical changes only — grooming, hair, skin and routine. Individual results vary with starting point, consistency and time.',
} as const

// ── Why appearance matters: VERIFIED findings only ───────────────────────────
// This replaces a set of 24 citations inherited from the previous build, which
// were lifted wholesale and did not survive checking — e.g. the sentencing claim
// was credited to "Cornell Law Review, 2019" when the actual work is Gunnell &
// Ceci (2010) in Behavioral Sciences & the Law. Publishing invented citations on
// a paid, health-adjacent Indian service is not a style problem, it is a
// liability, and the blueprint bans unverified claims outright.
//
// Three real studies beat twenty-four invented ones. Every line below was
// checked against the published record before being written here. Do not add an
// entry to this array without doing the same.
export const EVIDENCE = {
  eyebrow: 'Why it matters',
  title: 'Nobody enjoys admitting appearance counts.',
  muted: 'It has been measured for thirty years.',
  note:
    'Three findings we can actually stand behind, cited in full. They describe how appearance behaves in the world — not results MapMyFace promises you.',
  items: [
    {
      claim: 'Judged, and then treated, differently',
      detail:
        'Eleven meta-analyses found that people agree on who is considered attractive — within a culture and across cultures — and that attractive adults are not only judged more positively but treated more positively, including by people who already know them.',
      source: 'Langlois et al., Psychological Bulletin 126, 390–423 (2000)',
    },
    {
      claim: 'It shows up in pay',
      detail:
        'Holding demographics and labour-market characteristics constant, people rated below-average in appearance earned 5–10% less than average-looking people — a penalty slightly larger than the premium earned by the good-looking.',
      source: 'Hamermesh & Biddle, American Economic Review 84, 1174–1194 (1994)',
    },
    {
      claim: 'Even courtrooms are not immune',
      detail:
        'Mock-juror research at Cornell found that jurors who process a case emotionally handed unattractive defendants measurably harsher outcomes than attractive ones, while jurors reasoning analytically were far less swayed by looks.',
      source: 'Gunnell & Ceci, Behavioral Sciences & the Law (2010)',
    },
  ],
  /** The honest turn: this is why direction beats effort, not a reason to panic. */
  turn:
    'None of this is a reason to panic about your face. It is a reason to stop guessing at it — and to spend your effort on the few changes that actually apply to you.',
} as const

// ── Price anchoring ──────────────────────────────────────────────────────────
// Ranges are sourced, not invented: Indian dermatologist consultations commonly
// run ₹500–₹2,000, and ₹2,000–₹5,000 at metro corporate hospitals (aggregated
// from multiple Indian clinic fee listings, 2026). Everything else here is a
// qualitative comparison, deliberately unquantified.
export const ANCHOR = {
  eyebrow: 'Money, honestly',
  title: 'You’re already spending this.',
  muted: 'Just not once.',
  /** Design 37 (canvas export 2026-09-20 23:16): copy verbatim. */
  usual: {
    label: 'The usual way',
    totalLabel: 'Roughly a year of it',
    totalSub: 'At the lowest prices, before anything works',
    total: '≈ ₹14,000+',
  },
  rows: [
    {
      label: 'A dermatologist visit',
      value: '₹1,000 – ₹5,000 a visit',
      cadence: '2× a year',
      short: 'Skin only, and the clock is short.',
      note: 'From ₹1,000 a consultation at a clinic, more at metro hospitals. Skin only, and the clock is short.',
    },
    {
      label: 'One serum a reel told you to buy',
      value: '₹600 – ₹2,500 each',
      cadence: '12× a year',
      short: 'Bought without knowing if it suits you.',
      note: 'Bought without knowing if it suits you. Most of the drawer is this.',
    },
    {
      label: 'A haircut that does not suit your face',
      value: '₹600 – ₹2,000 each',
      cadence: '8× a year',
      short: 'The money is the small part.',
      note: 'The money is the small part.',
    },
  ],
  plan: {
    ourWay: 'Our way',
    paidOnce: 'Paid once',
    once: 'Once',
    label: 'Complete MapMyFace Plan',
    value: '₹3,499',
    gst: 'GST-inclusive · nothing added at checkout',
    includes: ['A live 45–60 min expert session', '400+ assessments, 100+ context factors', 'Your Face Map, Protocol and a clarification call'],
    note: 'A live 45–60 min expert session, 400+ facial assessments, 100+ context factors, your Face Map with Visual Direction, the Appearance Protocol and a clarification call. GST-inclusive.',
  },
  reassurance: [
    'We sell no products and take no commission',
    'One payment — no subscription, no renewals',
    'Final GST-inclusive amount shown before you pay',
  ],
} as const

// ── The proof beat ───────────────────────────────────────────────────────────
// Merges what used to be two separate sections — the before/after pairs and the
// "we have no testimonials yet" band — because both were doing the same job:
// making the claim believable. Two sections for one job is the repetition the
// client called out, and splitting them pushed the proof beat to position 12,
// long after the reader had decided.
//
// It sits early on purpose. With no testimonials to show, believability has to
// come from the photographs plus visible honesty about the stage we are at.
export const PROOF = {
  eyebrow: 'What changes',
  title: 'No surgery. No procedures.',
  muted: 'Just better decisions, in the right order.',
  lede:
    'Hair, grooming, skin and routine choices that actually suit your face — taken step by step, not all at once. Drag any photograph to compare.',
  /** Real client pairs, registered on the eye line so only grooming shifts. */
  pairs: [
    { before: '/transformations/before-1.webp', after: '/transformations/after-1.webp' },
    { before: '/transformations/before-2.webp', after: '/transformations/after-2.webp' },
    { before: '/transformations/before-3.webp', after: '/transformations/after-3.webp' },
  ],
  disclaimer:
    'Non-surgical changes only — grooming, hair, skin and routine. Individual results vary with starting point, consistency and time.',
} as const

// ═════════════════════════════════════════════════════════════════════════════
// SECTION 4 — "Why believe us yet"
// Four proof types behind four tabs. Consolidates what used to be four separate
// sections (research-stats, experts, methodology, founding) that were each
// answering the same buyer question: why should I believe you.
// ═════════════════════════════════════════════════════════════════════════════
export const BELIEVE = {
  eyebrow: 'The people behind your Map',
  title: 'Credentials you can see.',
  muted: 'Roles you can understand.',
  tabs: [
    { id: 'people', label: 'The people' },
    { id: 'philosophy', label: 'The philosophy' },
    { id: 'method', label: 'The method' },
    { id: 'evidence', label: 'The evidence' },
  ],
  people: {
    leadIn: 'Your Map brings together different kinds of expertise.',
    lede:
      'Your Face Mapping Session has a lead practitioner, with specialist input added where your plan calls for it. Every profile shows who is contributing, what they bring, and why their input matters.',
    /**
     * Design 42a: the spine is ONE word so it reads vertically at a glance;
     * the full role sits on the portrait once the card opens.
     *
     * TODO(founder): these are ROLES, not people. The photographs in
     * `public/team` are licensed Pexels stock standing in for the real
     * practitioners — swap them, and add approved names, qualifications and
     * experience, before this page is advertised.
     */
    cards: [
      {
        id: 'lead',
        spine: 'Lead',
        name: 'Lead Appearance Expert',
        photo: '/team/lead.webp',
        desc: 'Leads the session, connects the findings across every region and owns the final personal direction you receive.',
        tags: ['Session lead', 'Final direction', 'Whole-face view'],
      },
      {
        id: 'skin',
        spine: 'Skin',
        name: 'Skin & Appearance Context',
        photo: '/team/skin.webp',
        desc: 'Reviews relevant skin, routine and appearance context within MapMyFace’s professional boundaries.',
        tags: ['Skin behaviour', 'Routine review', 'Product context'],
      },
      {
        id: 'analysis',
        spine: 'Analysis',
        name: 'Facial Analysis & Research',
        photo: '/team/analysis.webp',
        desc: 'Supports structured facial assessment, feature relationships and evidence-informed interpretation.',
        tags: ['Reference points', 'Proportion', 'Evidence-informed'],
      },
      {
        id: 'specialist',
        spine: 'Movement',
        name: 'Movement / Specialist Input',
        photo: '/team/specialist.webp',
        desc: 'Contributes relevant face-yoga or specialist review when it genuinely belongs in your plan.',
        tags: ['Face yoga', 'Targeted review', 'Only when relevant'],
      },
    ],
    closing: {
      title: 'Different expertise. One Map.',
      body:
        'Every contribution has to make sense alongside the others — because every recommendation ultimately lands on the same person: you.',
    },
  },
  philosophy: {
    eyebrow: 'The MapMyFace philosophy',
    title: 'We measure to understand.',
    muted: 'Not to rank.',
    lede:
      'You are not a beauty score. A difference is not automatically a problem. And not everything we can measure needs to be changed.',
    principles: [
      ['Measure what is useful.', 'Use structure, proportions, surface and relationships to understand the face — not to manufacture flaws.'],
      ['Understand the person.', 'Context changes which recommendations are sensible, realistic and worth making.'],
      ['Recommend with priority.', 'The goal is not the longest list. It is the clearest route to the outcome you care about.'],
    ],
    mantra: ['Understand', 'Interpret', 'Prioritise', 'Visualise', 'Act'],
  },
  method: {
    leadIn: 'Nine things get assessed.',
    lede: 'Not an algorithm scoring your face — a structured read, interpreted in context.',
    /** Nine assessment factors, kept as short pairs. */
    factors: [
      ['Facial reference points', 'Where meaningful points sit, and how they relate.'],
      ['Feature relationships', 'How your features work with each other, not alone.'],
      ['Proportion', 'Balance and scale, as they are actually visible.'],
      ['Skin behaviour', 'What your skin does, alongside what you describe.'],
      ['Routine factors', 'Current and past products, and the habits around them.'],
      ['Lifestyle', 'Sleep, food, hydration, stress, the shape of your day.'],
      ['Environment', 'City, climate, humidity, pollution, regular travel.'],
      ['Preferences', 'Your goals, taste, comfort and the direction you want.'],
      ['Practical fit', 'Budget, upkeep, and whether you will realistically keep it up.'],
    ],
    closing: {
      title: 'Nine inputs. One interpretation.',
      body: 'That’s the part a scan alone cannot provide.',
    },
  },
  evidence: {
    leadIn: 'Research that informs the way we think about appearance.',
    lede:
      'Not proof of a MapMyFace outcome. These findings describe how appearance can influence perception, judgement and treatment in the world. They inform our thinking; they are not promises about what MapMyFace will achieve for you.',
    studies: [
      {
        year: 1994,
        claim: 'It shows up in pay',
        scope: 'Labour-market controls',
        detail:
          'People rated below average in appearance earned 5–10% less than average-looking people, holding demographics and labour-market characteristics constant.',
        source: 'Hamermesh & Biddle, American Economic Review 84, 1174–1194',
      },
      {
        year: 2000,
        claim: 'Judged, then treated, differently',
        scope: '11 meta-analyses',
        detail:
          'People agree on who is considered attractive, within and across cultures — and attractive adults are not only judged more positively but treated more positively, including by people who already know them.',
        source: 'Langlois et al., Psychological Bulletin 126, 390–423',
      },
      {
        year: 2010,
        claim: 'Even courtrooms are not immune',
        scope: 'Mock-juror cohort',
        detail:
          'Jurors reasoning emotionally handed unattractive defendants measurably harsher outcomes; jurors reasoning analytically were far less swayed by appearance.',
        source: 'Gunnell & Ceci, Behavioral Sciences & the Law',
      },
    ],
    turn: {
      title: 'None of this is a reason to panic about your face.',
      body: 'It is a reason to stop guessing at it, and to spend your effort on the few changes that actually apply to you.',
    },
  },
} as const

// ── Facial Expertise — four visual proofs that a person, not an algorithm,
// does the reading. Sits right before Believe, which makes the same claim in
// words (the four-role panel, the nine assessment factors) — these cards show
// it instead. The scrolling checklist reuses BELIEVE.method's own factor
// labels rather than inventing a second list of "what gets assessed".
//
// Section header (eyebrow/title/lede) is the site's own copy, unchanged from
// the original brief. Only the four cards below follow design handoff turn
// 18a exactly ("Mobile section — the four cards stacked at one shared
// size"): shared 260px visual / white-footer geometry, in the order
// session -> understanding -> what's looked at -> review.
// ═════════════════════════════════════════════════════════════════════════════
export const FACIAL_EXPERTISE = {
  eyebrow: 'Facial Expertise',
  title: 'How we read',
  muted: 'your face.',
  lede: 'Your plan starts with a careful study of your facial features, balance and proportions — done by real specialists, not an algorithm.',
  analysis: {
    title: 'What the expert looks at',
    text: 'Symmetry, muscle tension, skin condition and proportion — read by a person, not a scanner.',
    items: BELIEVE.method.factors.map(([label]) => label),
  },
  orbit: {
    title: 'Feature-level understanding',
    text: 'Eyes, brows, nose, lips, jawline and skin are reviewed in context, not in isolation.',
    items: ['Eyes', 'Brows', 'Nose', 'Lips', 'Jawline', 'Skin'],
  },
  reviewed: {
    title: 'Reviewed by a person',
    text: 'Every Face Map is read and signed off by an expert before it reaches you — for clarity, consistency and honesty.',
    tiles: [
      ['Tension', 'Left side'],
      ['Chewing side', 'Right'],
      ['Clench pattern', 'Night'],
      ['Muscle tone', 'Uneven'],
    ],
    rangeValue: 'Slightly tight',
    rangeFrom: 'Relaxed',
    rangeTo: 'Tight',
    forehead: {
      tiles: [
        ['Rest tension', 'Raised brows'],
        ['Line pattern', 'Horizontal'],
        ['Priority', 'Start here'],
      ],
    },
    signoff: 'Signed off by a specialist',
  },
  live: {
    title: 'Live expert session',
    text: 'A specialist spends focused time with you to understand your face and real-life context.',
    tag: 'Live · 1:1',
  },
} as const

// ═════════════════════════════════════════════════════════════════════════════
// SECTION 5 — "How a Face Map gets made"
// One timeline replacing four sections: the 5-step method, the session, the 18
// context questions, and the 8 post-payment steps — which were the same process
// drawn three times in three shapes.
// ═════════════════════════════════════════════════════════════════════════════
export const JOURNEY = {
  eyebrow: 'How it works',
  title: 'From booking',
  muted: 'to your Face Map.',
  denial:
    'No automated score. A real expert, a real conversation of 45–60 minutes, and a Face Map built after it — not generated during it.',
  nodes: [
    {
      id: 'book',
      timing: 'Today',
      who: 'You',
      meta: 'Choose the plan, add any add-ons, pay once.',
      when: 'Step 01',
      title: 'Book',
      kind: 'admin',
      text: 'Choose the Complete MapMyFace Plan and any add-ons. The GST-inclusive total is shown before you pay.',
      detail: [
        'Priority Delivery, Hair Map and Style & Colour Map are offered on the next step',
        'Confirmation on screen immediately after checkout',
      ],
    },
    {
      id: 'onboarding',
      timing: '+30 min',
      who: 'Our team',
      meta: 'A person calls to walk you through it and set your slot.',
      when: 'Within ~30 minutes',
      title: 'Onboarding',
      kind: 'admin',
      text: 'Typically within 30 minutes during service hours, a MapMyFace team member explains the process, the consultation platform, preparation and next steps.',
      detail: [
        'A person contacts you — you are not left with an email receipt',
        'Keep your current products handy for the session — we will ask what you actually use',
      ],
    },
    {
      id: 'session',
      timing: '≤ 7 days',
      who: 'Your expert',
      meta: 'A private 45–60 minute video conversation.',
      when: 'Normally within 7 days',
      title: 'Meet your expert',
      kind: 'human',
      text: 'A private live video session of 45–60 minutes. Your expert sees how your face presents, hears what you have tried, and asks the questions a form cannot.',
      quote: 'A structured conversation, with room to go deeper.',
      detail: [
        'Scheduled according to availability, normally within 7 days',
        'Your expert follows the areas that matter to your situation rather than forcing every customer through the same script',
        'Goals, routine, history, environment, products, lifestyle, preferences and maintenance',
      ],
      link: { label: 'See the 100+ context factors', href: '#context-factors' },
    },
    {
      id: 'review',
      timing: 'After the call',
      who: 'Your expert',
      meta: 'Findings connected, weighed against your context, prioritised.',
      when: 'After the call',
      title: 'Expert Mapping Review',
      kind: 'human',
      text: 'The call ends. The analysis doesn’t. Findings are connected, weighed against your context, and turned into priorities that work together.',
      detail: [
        'Facial architecture and feature relationships',
        'Skin & routine, read with your personal context',
        'Grooming and face yoga — hair and style when added',
        'Not everything we can measure needs to be changed. The job is to decide what matters, what does not, and what deserves priority.',
      ],
    },
    {
      id: 'deliver',
      timing: '≤ 7 days',
      who: 'Our team',
      meta: 'Within 7 days. Priority Delivery: 24–48 hours.',
      when: 'Up to 7 days',
      title: 'Receive your Face Map',
      kind: 'human',
      text: 'Standard delivery may take up to 7 days after your session. Priority Delivery moves it to a 24–48 hour target.',
      detail: [
        'Thirteen sections, region by region, in plain language',
        'Visual Direction where a visual makes a recommendation easier to understand',
        'Your Appearance Protocol: Start / Stop / Continue and First / Next / Later',
      ],
    },
    {
      id: 'ask',
      timing: 'Included',
      who: 'Your expert',
      meta: 'A short call if anything needs explaining. Included.',
      when: 'Included',
      title: 'Clarify anything',
      kind: 'human',
      text: 'Use the included short clarification call — or video call — if anything in your Face Map needs explaining.',
      detail: [
        'Included in the plan — not charged separately',
        'For anything inside your delivered Face Map that is not clear',
      ],
    },
  ],
  boundary:
    'MapMyFace stays inside appearance guidance. Dental, surgical or medical concerns that require diagnosis or treatment are directed to the appropriate qualified professional.',
} as const

// ═════════════════════════════════════════════════════════════════════════════
// SECTION 6 — "The Face Map"
// The 12 chapters, grouped into 4 buckets, plus a SAMPLE preview.
//
// IMPORTANT — the sample below is illustrative structure, NOT a real client's
// report. Founder asked for a sample to be built now with correct details added
// later. Every surface that renders it must carry the `sampleNotice` verbatim:
// a fabricated report presented as a real one is the same class of object as a
// fabricated testimonial, and the whole page's credibility rests on not doing
// that. See HANDOFF.md.
// ═════════════════════════════════════════════════════════════════════════════
export const FACE_MAP_REPORT = {
  eyebrow: 'Your Face Map',
  title: 'Your analysis,',
  muted: 'turned into direction.',
  lede:
    'Each important finding answers five questions. The fifth appears only when a visual makes the recommendation easier to understand. The report goes into detail where your case needs it; the structure stays consistent so you always know what you are looking at and why it matters.',
  chapterCount: 13,
  cta: 'Look inside a Face Map',
  sampleNotice:
    'Sample layout — illustrative structure with placeholder findings. Your Face Map is written from your own session.',
  /** The five questions every important finding answers. */
  questions: [
    { n: '01', title: 'What we mapped', text: 'Observation / measurement / relationship' },
    { n: '02', title: 'What it means', text: 'How it works with the rest of your appearance' },
    { n: '03', title: 'What matters', text: 'Expert significance for you' },
    { n: '04', title: 'Your direction', text: 'Keep / change / stop / introduce / leave alone' },
    { n: '05', title: 'Visual Direction', text: 'Where useful, see the recommended direction on you' },
  ],
  /** Thirteen sections in four buckets. Nobody reads a flat list of thirteen. */
  buckets: [
    {
      id: 'you',
      label: 'Understanding you',
      range: '01–02',
      summary: 'Your starting point, priorities and what you want — then how the complete face presents before we go region by region.',
      chapters: ['Profile & Goals', 'Facial Overview'],
    },
    {
      id: 'regions',
      label: 'Region by region',
      range: '03–09',
      summary: 'Upper face, eyes and brows, nose and midface, cheeks, lips and smile, jaw and profile, then skin and surface — each read in context.',
      chapters: [
        'Upper Face & Forehead',
        'Eyes, Brows & Under-Eyes',
        'Nose & Midface',
        'Cheeks & Facial Volume',
        'Lips & Smile',
        'Jaw, Chin & Profile',
        'Skin & Surface',
      ],
    },
    {
      id: 'direction',
      label: 'What to do',
      range: '10–11',
      summary: 'The practical routine and presentation decisions that follow, and only the face-yoga movements your expert considers relevant, with instructions and frequency.',
      chapters: ['Skincare, Grooming & Lifestyle', 'Face Yoga'],
    },
    {
      id: 'plan',
      label: 'See it, then act',
      range: '12–13',
      summary: 'Visual Direction where useful, then your Appearance Protocol: Start / Stop / Continue, First / Next / Later, your order of action.',
      chapters: ['Visual Direction', 'Appearance Protocol'],
    },
  ],
  /** Sample spreads for the preview. Placeholder findings, real structure. */
  spreads: [
    {
      id: 'cover',
      kind: 'cover',
      label: 'Cover',
      title: 'Your Face Map',
      subtitle: 'Made around one person: you.',
      fields: [
        ['Prepared for', 'Your name'],
        ['Session date', 'Your session date'],
        ['Led by', 'Your Lead Appearance Expert'],
        ['Sections', '13'],
      ],
    },
    {
      id: 'analysis',
      kind: 'analysis',
      label: 'Nose & Midface',
      chapter: '05 · Nose & Midface',
      observations: [
        ['What we mapped', 'Bridge, projection, tip rotation and the nose-to-lip and nose-to-chin relationships, from the front and in profile.'],
        ['What it means', 'The nose reads in proportion to the midface; the lower third, not the nose, is what shortens the profile.'],
        ['What matters', 'Nothing about the nose itself deserves attention. The lower-third balance does.'],
        ['Your direction', 'Leave alone. Address balance through the beard line and lower face — see chapter 08.'],
      ],
      note:
        'Each finding is written as what was seen, what it means, what matters and what to do — never as a score, and never as a diagnosis.',
    },
    {
      id: 'visual',
      kind: 'visual',
      label: 'Visual Direction',
      chapter: '12 · Visual Direction',
      panels: [
        { label: 'Current', tags: [] },
        {
          label: 'Your Visual Direction',
          tags: [
            ['Hair / frame', 'Recommended visual direction'],
            ['Skin / grooming', 'Selected target changes'],
          ],
        },
      ],
      note:
        'Visual Direction is an illustrative direction to help you understand a recommendation before you act on it — not a guarantee of future appearance or results.',
    },
    {
      id: 'protocol',
      kind: 'protocol',
      label: 'Appearance Protocol',
      chapter: '13 · Appearance Protocol',
      actions: [
        { action: 'Add a dedicated sunscreen, reapplied at lunch', state: 'start', phase: 'First' },
        { action: 'Stop the third exfoliant — it is the reason your barrier is reacting', state: 'stop', phase: 'First' },
        { action: 'Keep your current cleanser. It suits you.', state: 'continue', phase: 'First' },
        { action: 'Introduce a retinoid, twice weekly to begin', state: 'start', phase: 'Next' },
        { action: 'Grow the beard line 4mm lower to lengthen the lower third', state: 'start', phase: 'Next' },
        { action: 'Review whether a salon treatment is worth it at all', state: 'start', phase: 'Later' },
      ],
    },
    {
      id: 'clarify',
      kind: 'clarify',
      label: 'Clarification call',
      chapter: 'Included with your plan',
      text:
        'If any part of this report needs explaining, use the included short clarification call or video call and your expert will walk you through it. There is no extra charge inside the scope of this report.',
      bullets: [
        'What to do if a product causes a reaction',
        'How to tell whether something is working',
        'When to come back for a re-read',
      ],
    },
  ],
} as const

// ═════════════════════════════════════════════════════════════════════════════
// SECTION 8 — "Built for your context"
// The relevance objection: will this advice apply to an Indian face, in my city,
// at my budget? A matrix showing WHICH advice is context-dependent carries that
// argument in a way prose cannot.
// ═════════════════════════════════════════════════════════════════════════════
export const CONTEXT = {
  eyebrow: 'Built for your context',
  title: 'The same face,',
  muted: 'in a different city, needs a different plan.',
  lede:
    'This is the part generic advice cannot do. A routine that works in Bengaluru can fail in a Delhi winter, and the same products can feel completely different in Chennai humidity.',
  /**
   * Design 36a — one weather card per context, copy verbatim from the canvas
   * export (turn 36, 2026-09-20). `weather` picks the sky and the animation:
   * wind streaks / rain lines through haze / drops falling into ripples.
   * `feel` is the card's mono line, already joined the way the design joins it.
   */
  cards: [
    {
      id: 'delhi',
      weather: 'wind',
      city: 'Delhi',
      when: 'Winter',
      feel: 'Cold · Dry · Higher pollution',
      changes: ['Barrier repair moves ahead of actives', 'Richer moisturisation matters more', 'Comfort before aggressive treatments'],
    },
    {
      id: 'chennai',
      weather: 'rain',
      city: 'Chennai',
      when: 'Humidity',
      feel: 'Warm · Sticky · High humidity',
      changes: ['Lighter textures are preferred', 'Oil control and breathability matter more', 'Heavy products can feel uncomfortable'],
    },
    {
      id: 'water',
      weather: 'drip',
      city: 'Hard-water city',
      when: 'Any season',
      feel: 'Mineral-heavy water',
      changes: ['Cleansing and barrier support need more care', 'Product performance can shift', 'Rinse-off products become more relevant'],
    },
  ],
  /** The anti-upsell promise, planted immediately before the price. */
  antiUpsell: {
    title: 'We sell one thing.',
    accent: 'The Face Map.',
    lines: ['We do not sell skincare.', 'We do not stock products.', 'We take no commission from any brand we mention.'],
    body: 'If the honest answer is that your current routine is fine, that is exactly what your report will say.',
  },
} as const

// ═════════════════════════════════════════════════════════════════════════════
// SECTION 10 — "Your face stays yours"
// Deliberately has NO disclosure mechanic. Burying a privacy covenant behind a
// click is the opposite of the point.
// ═════════════════════════════════════════════════════════════════════════════
export const PRIVACY_PATH = {
  eyebrow: 'Built around something personal',
  title: 'Your face. Your information.',
  muted: 'Your control.',
  lede:
    'Trust is not a badge at checkout. It is how the service is designed, from the first call to the way your report and images are handled.',
  /** Four stages of where a photograph or recording actually goes. */
  stages: [
    { label: 'You share it', text: 'On the live session and during onboarding, over an encrypted connection.' },
    { label: 'The team opens it', text: 'Only the people required to deliver your MapMyFace experience. Named below.' },
    { label: 'It is held', text: 'For as long as your report and clarification support are active.' },
    { label: 'You can end it', text: 'Ask us to delete it and we delete it. One email.' },
  ],
  /** Who sees your material — the conditional row is what proves it is a policy. */
  access: [
    { mono: 'LE', role: 'Lead Appearance Expert', sees: 'Yes' },
    { mono: 'SC', role: 'Skin & Appearance Context', sees: 'Yes' },
    { mono: 'FA', role: 'Facial Analysis & Research', sees: 'Yes' },
    { mono: 'MS', role: 'Movement / Specialist Input', sees: 'Only when your plan calls for it' },
  ],
  covenant: [
    'Purchasing MapMyFace does not give permission to use your images, video, report or feedback publicly — marketing use is a separate decision',
    'Dental, surgical or medical concerns that require diagnosis or treatment are directed to the appropriate qualified professional',
    'The GST-inclusive total and any selected add-ons are shown before payment is completed',
    'You can contact MapMyFace for service questions, privacy requests and data-deletion requests',
  ],
  /** TODO(founder): confirm the actual retention window and name a grievance officer. */
  pending:
    'Exact retention period and the named grievance contact are published with our full data policy.',
} as const

// ═════════════════════════════════════════════════════════════════════════════
// SECTION 12 — the close. Permission, not logistics.
// The price is deliberately absent from the question: re-raising cost in the
// last sentence before the button reintroduces the anxiety you just resolved.
// ═════════════════════════════════════════════════════════════════════════════
export const CLOSE = {
  eyebrow: 'Your face deserves more than guesswork',
  // The full line is 38 mono characters at 0.16em tracking — wider than the
  // panel's content area on a phone, so the pill wraps or clips. Below `md`
  // the tag shows this shorter cut instead.
  eyebrowMobile: 'More than guesswork',
  title: 'Understand what matters. Know what suits you.',
  muted: 'Leave with a plan.',
  body:
    'Expert-led facial analysis and appearance guidance built around the person, not a generic ideal. One live session, one coordinated review, one Face Map that shows what matters, what suits you and what to do next.',
  notFor: {
    title: 'This is not for you if',
    items: [
      'You want a dental, surgical or injectable recommendation',
      'You want a diagnosis or treatment for a medical skin condition',
      'You want a beauty score rather than a plan',
    ],
  },
  traits: ['Confident', 'Calm', 'Radiant', 'Present', 'Enough'],
  cta: 'Start My Plan',
  secondary: 'Look inside a Face Map',
} as const

// ═════════════════════════════════════════════════════════════════════════════
// SECTION 11 — FAQ, seven categories behind a rail.
// Expanded rather than trimmed: the FAQ is where a considering buyer resolves
// the last blocker, and it costs nothing on the page because only one category
// is mounted at a time. Refund and delivery answers now state real terms.
// ═════════════════════════════════════════════════════════════════════════════
export const FAQ_V2 = {
  eyebrow: 'Questions, answered clearly',
  title: 'The practical questions',
  muted: 'that remove uncertainty.',
  categories: [
    {
      id: 'service',
      label: 'The service',
      items: [
        {
          q: 'What exactly is MapMyFace?',
          a: 'An expert-led appearance-analysis service. We combine 400+ facial assessments, 100+ personal context factors and a live Face Mapping Session to create one personalised Face Map showing what matters, what suits you and what to do next.',
        },
        {
          q: 'Is this an AI face scanner?',
          a: 'No. There is no algorithm scoring your face out of ten. Technology supports parts of the process, but the session, the interpretation and the review are done by people. If an automated score is what you want, this is not it.',
        },
        {
          q: 'What do the 400+ facial assessments cover?',
          a: 'The framework covers facial structure, proportions, individual features, soft tissue, visible skin and surface characteristics, symmetry, profile, expression and feature-to-feature relationships.',
        },
        {
          q: 'What are the 100+ personal context factors?',
          a: 'The relevant information a photograph cannot explain: environment, routine, skincare history, products, reactions, lifestyle, sleep, stress, travel, grooming, maintenance preferences, budget, goals and other context relevant to your situation.',
        },
        {
          q: 'Can both men and women use MapMyFace?',
          a: 'Yes. It is built for anyone who wants personalised clarity about what genuinely suits them.',
        },
      ],
    },
    {
      id: 'session',
      label: 'Your session',
      items: [
        {
          q: 'What happens after payment?',
          a: 'A MapMyFace team member typically contacts you within approximately 30 minutes during service hours to explain the process, the consultation platform, preparation and next steps.',
        },
        {
          q: 'When will I speak with my expert?',
          a: 'Your Face Mapping Session is scheduled according to availability, normally within 7 days.',
        },
        {
          q: 'How long does the Face Mapping Session take?',
          a: 'Most sessions are planned for approximately 45–60 minutes, on a private live video call.',
        },
        {
          q: 'Does everyone receive the same questions?',
          a: 'No. The session follows a structured framework, but it is a real conversation. Your expert goes deeper wherever your individual situation requires it.',
        },
        {
          q: 'Do I have to be on camera?',
          a: 'Yes — the expert needs to see how your face presents, which is the entire point of speaking rather than sending photographs. Join from somewhere quiet and well lit, with your current products within reach.',
        },
        {
          q: 'What if I need to reschedule?',
          a: 'Rescheduling is free. If we ever cancel or miss a booked session, you choose a new slot or take a full refund.',
        },
      ],
    },
    {
      id: 'report',
      label: 'Your Face Map',
      items: [
        {
          q: 'How long does the Face Map take?',
          a: 'After your session, the expert may take up to 7 days to review the findings and prepare your personalised Face Map. Priority Delivery moves it to a 24–48 hour target after your completed session and required inputs.',
        },
        {
          q: 'What is included in the main plan?',
          a: 'Personal onboarding, the live 45–60 minute Face Mapping Session, 400+ facial assessments, 100+ personal context factors, the Expert Mapping Review, skin and routine review, skincare and product direction where appropriate, grooming guidance, relevant face-yoga direction, lifestyle and environmental observations, Visual Direction where relevant, your Appearance Protocol and a short expert clarification call.',
        },
        {
          q: 'Will you recommend specific skincare products?',
          a: 'Where appropriate, yes. Your expert may recommend specific products or brands, or give formulation, ingredient, strength, texture or SPF direction based on your skin, environment and complete routine. We sell nothing and take no commission, so a named product is a recommendation, not a sale.',
        },
        {
          q: 'What is Visual Direction?',
          a: 'Where useful, Visual Direction shows a personalised visual representation of selected recommendations so you can understand the intended direction before you act. It is illustrative, not a guarantee of future appearance or results.',
        },
        {
          q: 'Can I clarify something after receiving my Face Map?',
          a: 'Yes. Use the included short expert clarification call or video call if anything in your Face Map needs explaining. It is part of the plan, not charged separately.',
        },
      ],
    },
    {
      id: 'addons',
      label: 'Add-ons',
      items: [
        {
          q: 'Are Hair Map and Style & Colour Map included?',
          a: 'They are optional specialist add-ons at ₹999 each. You can choose them on the next step after selecting the Complete MapMyFace Plan, and they are reviewed as part of the same case as your Face Map.',
        },
        {
          q: 'What is Priority Delivery?',
          a: 'An optional ₹500 add-on that moves your Face Map to a 24–48 hour target after your completed Face Mapping Session and required inputs. Same Face Map, same review — only the queue changes.',
        },
        {
          q: 'Do I have to decide now?',
          a: 'No. Add-ons are offered on the step after you select the plan, and you can continue without any of them.',
        },
      ],
    },
    {
      id: 'money',
      label: 'Money & refunds',
      items: [
        {
          q: 'Can I get a refund?',
          a: 'Yes — cancel any time before your Face Mapping Session begins and you get the whole amount back, no questions asked. Once the session has happened, the expert review and your report are already being written, so the fee is no longer refundable. The exception is if we fail to deliver your Face Map to the scope described on this page, in which case the report portion is refunded.',
        },
        {
          q: 'Is ₹3,499 the final amount?',
          a: 'Yes. GST is included and nothing is added at checkout. Any add-ons you choose are shown in the order summary before you pay. It is a single payment — there is no subscription and nothing renews.',
        },
        {
          q: 'How can I pay?',
          a: 'UPI, credit and debit cards, net banking and wallets, through Razorpay. We never see or store your card details.',
        },
      ],
    },
    {
      id: 'privacy',
      label: 'Privacy & photos',
      items: [
        {
          q: 'Who actually sees my session and photographs?',
          a: 'Only the people required to deliver your MapMyFace experience: your Lead Appearance Expert and the specialists reviewing your case. Access is need-to-know.',
        },
        {
          q: 'Can my images be used publicly?',
          a: 'Only with separate, explicit permission. Purchasing MapMyFace does not automatically give permission to use your images, video, report or feedback publicly.',
        },
        {
          q: 'Can I have my data deleted?',
          a: 'Yes. Email us and we delete it. Our full data policy sets out the retention period and the contact for privacy requests.',
        },
      ],
    },
    {
      id: 'boundaries',
      label: 'Boundaries',
      items: [
        {
          q: 'What if I have a dental, surgical or medical concern?',
          a: 'MapMyFace stays within appearance guidance and directs concerns that require diagnosis or treatment to the appropriate qualified professional.',
        },
        {
          q: 'Will you recommend surgery?',
          a: 'No. MapMyFace is not a surgical-recommendation service and does not position itself as one.',
        },
        {
          q: 'Are results guaranteed?',
          a: 'No, and anyone promising that is selling you something else. Visual Direction is illustrative, not a guarantee. What is guaranteed is the process: a real session, a coordinated expert review, and a prioritised plan written for your face.',
        },
      ],
    },
  ],
} as const

// ═════════════════════════════════════════════════════════════════════════════
// PHASE 2 — "Final 8-Figure Website Blueprint" (t 22.pdf). Everything below is
// new to that blueprint. The two headline figures (400+ / 100+) are its own
// published claims, so they may appear here; the earlier no-figures rule applied
// to numbers the blueprint had NOT approved.
// ═════════════════════════════════════════════════════════════════════════════

/** One card per facial region: summary line, intro, and the assessment list. */
export const WHAT_WE_MAP = {
  eyebrow: '400+ facial assessments',
  title: 'One face.',
  muted: 'Hundreds of things to understand.',
  lede:
    'We assess each region on its own — then read it in relation to the whole. That is how a single face naturally becomes hundreds of meaningful observations and measurements.',
  figure: '400+',
  figureLabel: 'Facial assessments',
  figureNote: 'Structure / features / proportions / soft tissue / skin / symmetry / profile / expression / relationships',
  hint: 'Tap a region to see what sits underneath the label.',
  regions: [
    {
      id: 'upper',
      title: 'Upper Face',
      summary: 'Forehead, temples, hairline, upper-face balance',
      intro: 'The upper face sets the frame for everything below it.',
      items: [
        'Forehead height, width and overall shape',
        'Hairline position and relationship to the forehead',
        'Temple contour and visible fullness',
        'Upper-face proportions and facial thirds',
        'Brow position relative to forehead and eyes',
        'Frontal and three-quarter contour',
        'Visible skin and surface characteristics',
        'Relationship with eyes, brows and midface',
      ],
    },
    {
      id: 'eyes',
      title: 'Eyes & Brows',
      summary: 'Shape, spacing, position, brow-eye relationship',
      intro: 'We read the eyes and brows as one connected upper-face system.',
      items: [
        'Eye shape, opening and visible size',
        'Inter-eye spacing and position',
        'Canthal tilt and horizontal relationship',
        'Visible eyelid and crease characteristics',
        'Eye depth / projection and surrounding support',
        'Under-eye volume, shadow and surface appearance',
        'Visible left-right symmetry',
        'Brow height, thickness, shape, arch and tail',
        'Brow-to-eye relationship',
        'Relationship with cheeks and midface',
      ],
    },
    {
      id: 'nose',
      title: 'Nose',
      summary: 'Structure, surface, frontal and profile relationships',
      intro: 'The nose is assessed as a structure, a surface and a relationship — not one measurement.',
      items: [
        'Overall structure and shape',
        'Nasal length and width',
        'Radix / root position',
        'Bridge height, width and contour',
        'Dorsal line / profile contour',
        'Projection',
        'Tip definition and shape',
        'Tip rotation',
        'Alar width and flare',
        'Nostril shape, show and symmetry',
        'Columella appearance',
        'Frontal symmetry',
        'Visible soft-tissue thickness / fullness',
        'Skin texture, pores or redness where relevant',
        'Forehead-to-nose relationship',
        'Eye / cheek / midface relationship',
        'Nose-to-lip relationship',
        'Nose-to-chin and profile balance',
      ],
    },
    {
      id: 'cheeks',
      title: 'Cheeks & Midface',
      summary: 'Projection, volume, contours and transitions',
      intro: 'Midface analysis looks at shape, support, volume and the transitions between regions.',
      items: [
        'Cheekbone position and projection',
        'Visible malar width',
        'Midface height and proportions',
        'Soft-tissue volume and fullness',
        'Distribution of facial volume',
        'Under-eye-to-cheek transition',
        'Nasolabial area and surrounding contours',
        'Frontal and three-quarter contour',
        'Visible symmetry',
        'Relationship with eyes and under-eyes',
        'Relationship with nose and lips',
        'Relationship with jaw and lower face',
      ],
    },
    {
      id: 'lips',
      title: 'Lips & Smile',
      summary: 'Shape, fullness, expression and surrounding balance',
      intro: 'The mouth is understood at rest and, where useful, in expression.',
      items: [
        'Lip width and overall shape',
        'Upper-to-lower lip relationship',
        'Visible fullness and vermilion show',
        'Cupid’s bow and lip definition',
        'Lip projection',
        'Philtrum length and visible relationship',
        'Mouth-corner position',
        'Visible left-right symmetry',
        'Smile width and presentation',
        'How expression changes the lower face',
        'Relationship with the nose',
        'Relationship with chin and jaw',
      ],
    },
    {
      id: 'jaw',
      title: 'Jaw & Chin',
      summary: 'Width, projection, contour and lower-face balance',
      intro: 'The lower face is read from the front, three-quarter view and profile.',
      items: [
        'Jaw width and overall shape',
        'Mandibular contour and angle appearance',
        'Visible jaw definition',
        'Chin width and height',
        'Chin projection',
        'Lower facial-third proportions',
        'Soft-tissue fullness around lower face',
        'Jaw-to-neck transition',
        'Visible left-right symmetry',
        'Labiomental relationship',
        'Relationship with lips',
        'Relationship with cheeks and midface',
        'Relationship with nose and complete profile',
      ],
    },
    {
      id: 'skin',
      title: 'Skin & Surface',
      summary: 'Texture, tone, pores, marks and visible behaviour',
      intro: 'Surface analysis is visual — then interpreted alongside your routine, history and environment.',
      items: [
        'Visible texture and smoothness',
        'Tone and visible evenness',
        'Pore appearance',
        'Oiliness / dryness appearance',
        'Redness where visible',
        'Pigmentation and uneven colour',
        'Marks and post-blemish appearance',
        'Visible acne-related presentation',
        'Visible scarring',
        'Fine lines and surface creasing',
        'Under-eye surface appearance',
        'Lip surface condition',
        'Visible sun-related appearance where relevant',
        'How surface findings fit with the rest of the face',
      ],
    },
    {
      id: 'profile',
      title: 'Profile & Balance',
      summary: 'How the complete face works together',
      intro: 'This is where separate findings become one face.',
      items: [
        'Facial thirds and overall vertical balance',
        'Horizontal relationships and facial width',
        'Front / three-quarter / profile consistency',
        'Visible symmetry and asymmetry',
        'Forehead, nose, lips and chin relationship',
        'Midface and lower-face projection',
        'Feature prominence relative to the whole',
        'Jaw, chin and neck balance',
        'How expression changes overall presentation',
        'How features support or compete with one another',
        'Overall facial harmony and distinctive characteristics',
        'Which findings actually deserve attention',
      ],
    },
  ],
} as const

/** The 100+ personal context factors, in the blueprint's ten groups. */
export const CONTEXT_FACTORS = {
  eyebrow: '100+ personal context factors',
  title: 'Your face tells us what we see.',
  muted: 'You tell us the rest.',
  lede:
    'The same face can need a different plan in a different climate, routine, budget or lifestyle. Your session gives the analysis the context a photograph cannot.',
  figure: '100+',
  figureLabel: 'Context factors considered',
  figureNote: 'The framework is broad. The conversation follows what actually matters to you.',
  hint: 'Tap a group to see what we ask about.',
  regions: [
    {
      id: 'live',
      title: 'Where you live',
      summary: 'Climate, humidity, pollution, seasons',
      intro: 'Your environment changes what your skin and routine are exposed to.',
      items: [
        'City / region and regular locations',
        'Temperature patterns',
        'Humidity and dryness',
        'Seasonal changes',
        'Pollution exposure',
        'UV / sun intensity',
        'Indoor air-conditioning or heating',
        'Coastal / dry / high-humidity conditions',
        'Regular travel environments',
        'How quickly your environment changes',
      ],
    },
    {
      id: 'history',
      title: 'Skincare history',
      summary: 'What you use, used and how your skin responded',
      intro: 'We look at the routine you have actually lived with — not only what is on your shelf today.',
      items: [
        'Current products and brands',
        'Past products and product categories',
        'Active ingredients already in use',
        'How often each product is used',
        'How long products were used',
        'Reactions and sensitivities',
        'What clearly helped',
        'What clearly did not',
        'Products stopped and why',
        'Morning vs evening use',
        'Consistency and adherence',
        'Treatments / procedures voluntarily disclosed where relevant',
      ],
    },
    {
      id: 'routine',
      title: 'Daily routine',
      summary: 'Work, exposure, exercise and everyday habits',
      intro: 'Recommendations have to fit the life you actually lead.',
      items: [
        'Morning and evening schedule',
        'Work hours and work environment',
        'Indoor vs outdoor time',
        'Commute and travel time',
        'Cleansing / washing habits',
        'Exercise and sweating',
        'Shaving or facial-hair routine',
        'Screen / late-night schedule where relevant',
        'Time available for skincare',
        'Weekend vs weekday differences',
      ],
    },
    {
      id: 'sleep',
      title: 'Sleep & stress',
      summary: 'Patterns that change what is realistic or relevant',
      intro: 'The aim is not to diagnose. It is to understand context that can influence appearance or follow-through.',
      items: [
        'Average sleep duration',
        'Sleep schedule and consistency',
        'Late nights / shift work',
        'Perceived stress level',
        'High-stress periods',
        'Travel-related sleep disruption',
        'How stress changes routine adherence',
        'Whether the plan needs to stay very simple',
      ],
    },
    {
      id: 'food',
      title: 'Food & hydration',
      summary: 'Relevant habits, not generic wellness advice',
      intro: 'We only use lifestyle information when it is relevant to your goals and plan.',
      items: [
        'General eating pattern',
        'Meal regularity',
        'Hydration habits',
        'High-salt / high-sugar patterns where relevant',
        'Frequent eating out',
        'Diet restrictions voluntarily disclosed',
        'Caffeine habits where relevant',
        'Whether lifestyle recommendations are realistic',
        'Changes you are willing to make',
      ],
    },
    {
      id: 'travel',
      title: 'Travel & change',
      summary: 'How often your environment changes',
      intro: 'A routine that works at home may need adjustment when the environment changes.',
      items: [
        'Travel frequency',
        'Common destinations',
        'Climate differences',
        'Flight / long-journey frequency',
        'Hotel / temporary routine changes',
        'Sun exposure during travel',
        'Product portability and convenience',
        'How much the routine can realistically change',
      ],
    },
    {
      id: 'sun',
      title: 'Sun & exposure',
      summary: 'Outdoor time, UV habits and protection',
      intro: 'Sun behaviour is understood as part of the full routine, not as one isolated question.',
      items: [
        'Time spent outdoors',
        'Typical exposure hours',
        'Commute exposure',
        'Current sunscreen use',
        'Application habits',
        'Reapplication habits',
        'Hats / shade / physical protection',
        'Outdoor sports or exercise',
        'Seasonal changes in exposure',
        'Travel-related sun exposure',
      ],
    },
    {
      id: 'grooming',
      title: 'Grooming & maintenance',
      summary: 'Shaving, facial hair, face yoga, upkeep',
      intro: 'What suits you also has to be something you will actually maintain.',
      items: [
        'Shaving frequency',
        'Beard / moustache habits',
        'Preferred facial-hair length',
        'Eyebrow grooming',
        'Current haircut maintenance',
        'Face-yoga history',
        'Daily time available',
        'Tolerance for frequent upkeep',
        'Preferred level of grooming effort',
        'What you do not want to change',
      ],
    },
    {
      id: 'budget',
      title: 'Budget & access',
      summary: 'What you can realistically buy and maintain',
      intro: 'The best recommendation is useless if you cannot reasonably buy or maintain it.',
      items: [
        'Comfortable monthly product spend',
        'Preference for pharmacy / premium / mass products',
        'Availability in your location',
        'Willingness to order online',
        'Number of products you want to manage',
        'Maintenance cost tolerance',
        'Preference for simple vs advanced routines',
        'Replacement frequency and practicality',
      ],
    },
    {
      id: 'goals',
      title: 'Goals & preferences',
      summary: 'What you want to improve and how far you want to go',
      intro: 'The Map is built around the outcome you actually want — not an assumed ideal.',
      items: [
        'Primary appearance goal',
        'Main concern',
        'What you want to keep',
        'What you do not want to change',
        'Desired level of improvement',
        'Preference for subtle vs noticeable change',
        'Upcoming events or timelines where relevant',
        'Professional / social presentation goals',
        'Comfort and personal style',
        'How much effort you are willing to invest',
        'What “looking better” means to you personally',
      ],
    },
  ],
} as const

/** Visual Direction — the blueprint's new product feature. */
export const VISUAL_DIRECTION = {
  eyebrow: 'Visual Direction',
  title: 'Do not just read the recommendation.',
  muted: 'See what your expert means.',
  lede:
    'For selected recommendations, your Face Map includes personalised visual direction to help you understand how a suggested change could alter your overall presentation before you act on it.',
  panels: [
    { label: 'Current', tags: [] },
    {
      label: 'Your Visual Direction',
      tags: [
        ['Hair / frame', 'Recommended visual direction'],
        ['Skin / grooming', 'Selected target changes'],
      ],
    },
  ],
  disclaimer:
    'Visual Direction is designed to explain selected recommendations and how they may work together. It is an illustrative direction, not a guarantee of future appearance or results.',
} as const

/** Personalised guidance — the four "Not just…" cards. */
export const GUIDANCE = {
  eyebrow: 'Personalised guidance',
  title: 'Personalised should',
  muted: 'feel specific.',
  lede:
    'The Map does not stop at “use sunscreen” or “try a different beard.” It explains what kind of change fits your plan, why, and when to introduce it.',
  cards: [
    {
      label: 'Skincare',
      notJust: 'Not just: “Wear sunscreen.”',
      text: 'Your Map can specify SPF direction, texture, formulation, timing, reapplication and suitable options — coordinated with the rest of your routine.',
    },
    {
      label: 'Products',
      notJust: 'Not just: “Add an active.”',
      text: 'Where useful, your expert can name specific products or give ingredient, strength and formulation guidance that fits what you already use.',
    },
    {
      label: 'Grooming',
      notJust: 'Not just: “Change your beard.”',
      text: 'Direction can cover length, shape, maintenance and presentation based on lower-face structure and the look you want to maintain.',
    },
    {
      label: 'Face yoga + lifestyle',
      notJust: 'Not generic wellness advice.',
      text: 'Only relevant movements and lifestyle-related actions are included, with clear frequency or timing where it helps you follow the plan.',
    },
  ],
} as const

/**
 * MapMyFace experiences — the blueprint's case-study format ("Results" in the
 * nav). The section renders NOTHING until `stories` holds a real, consented
 * customer story: a fabricated case study is the same class of object as a
 * fabricated testimonial. Fill one entry with the customer's real words and the
 * section, and its nav item, appear on their own.
 */
export type ExperienceStory = {
  id: string
  /** First name or initials, and city — only with consent. */
  who: string
  /** Primary goal in the customer's own words. */
  goal: string
  /** What they were confused about, what they had tried, what they wanted help deciding. */
  before: string
  /** 3–5 meaningful findings that show the reasoning without publishing the full report. */
  found: readonly string[]
  /** The highest-impact actions from First / Next / Later. */
  first: readonly string[]
  /** The genuine changes the customer chose to follow. */
  implemented: readonly string[]
  /** Verbatim, approved. */
  quote: string
  /** Optional consented images. */
  images?: { before: string; direction: string }
}

export const EXPERIENCES = {
  eyebrow: 'MapMyFace experiences',
  title: 'See how',
  muted: 'MapMyFace thinks.',
  lede:
    'A useful customer story shows more than a result. It shows what the expert noticed, what was prioritised, what was visualised and what the customer actually changed.',
  labels: {
    before: 'Before MapMyFace',
    found: 'What the Map found',
    first: 'What came first',
    implemented: 'What they implemented',
    quote: 'In their words',
    imageBefore: 'Before',
    imageDirection: 'Visual Direction',
  },
  stories: [] as readonly ExperienceStory[],
} as const
