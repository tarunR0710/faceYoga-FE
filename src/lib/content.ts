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
    { id: 'a', text: '10-step routine ✦', left: '4%', top: '6%', rotate: -6, bg: '#FFFFFF', fg: '#3D6B76' },
    { id: 'b', text: 'Get the ₹4,000 facial', left: '54%', top: '2%', rotate: 4, bg: '#3D6B76', fg: '#FFFFFF' },
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
      { title: 'Your skin', text: 'type, sensitivity, routine' },
      { title: 'Your climate', text: 'humidity, water, pollution' },
      { title: 'Your face', text: 'structure, proportions, tension' },
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
  title: 'Know exactly',
  muted: 'what to do next.',
  lede:
    'Analysis is only useful when it leads to action. Your Appearance Protocol sorts every recommendation by priority, so you are not trying to change eleven things at once and giving up by week three.',
  decide: [
    { label: 'Start', text: 'New actions and routines recommended for you.' },
    { label: 'Stop', text: 'Habits, products or approaches that are not supporting your goals.' },
    { label: 'Continue', text: 'The things already working — worth protecting, not replacing.' },
  ],
  order: [
    { label: 'First', text: 'The highest-priority changes. Foundation before anything else.' },
    { label: 'Next', text: 'What to introduce once the foundation is actually holding.' },
    { label: 'Later', text: 'Optional and lower-priority improvements, kept honestly optional.' },
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
      ours: 'Start / Stop / Continue and First / Next / Later',
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
    'The Complete MapMyFace Plan stands on its own. These two specialist Maps go further, and are reviewed alongside the same case — not sold as separate services.',
  items: [
    {
      id: 'hair_map',
      name: 'Hair Map',
      price: '+₹699',
      tagline: 'Discover the hair direction designed around your face.',
      text:
        'Personalised haircut, hairstyle and facial-hair direction, based on your facial structure, proportions, hair characteristics, lifestyle and how much maintenance you actually want.',
      includes: [
        'Suitable haircut structures',
        'Recommended hair length',
        'Parting, volume and shape',
        'Hairstyle references',
        'Styles to consider and avoid',
        'Facial-hair direction where relevant',
      ],
    },
    {
      id: 'style_colour_map',
      name: 'Style & Colour Map',
      price: '+₹699',
      tagline: 'Understand the colours and styles that work with you.',
      text:
        'Personalised clothing, colour and presentation guidance based on your appearance, your lifestyle and where you actually need to show up.',
      includes: [
        'Suitable colour direction',
        'Clothing silhouettes and necklines',
        'Casual and professional styling',
        'Accessories and presentation',
        'Occasion-based direction',
        'Styles to consider and avoid',
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
  eyebrow: 'What it costs',
  title: 'One fee. No products to buy from us.',
  muted: 'Nothing recurring.',
  // The argument is RECURRENCE, not "cheaper than the alternatives" — someone
  // who has already wasted more than ₹2,699 on a salon package has heard the
  // cheaper-than line before, from the thing that wasted it.
  recurrence: 'Everything above repeats. This does not.',
  rows: [
    {
      label: 'A dermatologist visit',
      value: '₹500 – ₹2,000',
      note: 'Per consultation, and ₹2,000–₹5,000 at metro corporate hospitals. Skin only, and the clock is short.',
      kind: 'compare',
    },
    {
      label: 'One serum a reel told you to buy',
      value: 'Again next month',
      note: 'Bought without knowing whether it suits you. Most of the drawer is this.',
      kind: 'compare',
    },
    {
      label: 'A haircut that does not suit your face',
      value: 'Six weeks of it',
      note: 'The money is the small part.',
      kind: 'compare',
    },
    {
      label: 'Complete MapMyFace Plan',
      value: '₹2,699',
      note: 'Live expert session, multidisciplinary review, your full Face Map, prioritised protocol, and clarification support afterwards. GST-inclusive, paid once.',
      kind: 'ours',
    },
  ],
  reassurance: [
    'We do not sell products, so we have nothing to push',
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
  eyebrow: 'Personalized Plan',
  title: 'Specialists study your face, skin and lifestyle —',
  muted: 'then shape every recommendation.',
  tabs: [
    { id: 'people', label: 'The people' },
    { id: 'method', label: 'The method' },
    { id: 'evidence', label: 'The evidence' },
  ],
  people: {
    // States what the panel DOES. The previous version explained why there are
    // no photographs ("the panel is still being finalised"), which told a
    // prospective buyer the team was not hired — a fact they would never have
    // inferred on their own. Not fabricating credentials is the rule; narrating
    // the gap is not required by it.
    lede:
      'Your case is not read by one person. Four areas of expertise review it together, then agree on a single direction — so what reaches you is one plan, not four opinions to reconcile yourself.',
    /** TODO(founder): replace with approved names, credentials and photographs. */
    roles: [
      { mono: 'MS', role: 'Medical & Skin', text: 'Skin context, safety boundaries and appropriate review.' },
      { mono: 'FA', role: 'Facial Analysis', text: 'Structure, relationships, balance and evidence-informed reading.' },
      { mono: 'FY', role: 'Face Yoga', text: 'Movement chosen around your features and what you can keep up.' },
      { mono: 'HS', role: 'Hair & Style', text: 'Reviewed when you have added a Hair Map or Style & Colour Map.' },
    ],
    closing:
      'Every recommendation has to work with the others, because they all land on the same person.',
  },
  method: {
    lede:
      'Nine things get assessed. Not an algorithm scoring your face out of ten — a structured read, interpreted by people.',
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
    // Was an internal note about an unfinished methodology audit. Simply not
    // quoting a figure achieves the same thing invisibly; announcing that we
    // are withholding one advertises that the method is unfinished.
    closing:
      'Nine inputs, weighed against each other by people who do this for a living. That is the part a scan cannot do.',
  },
  evidence: {
    lede:
      'Three findings, cited in full, that we checked ourselves. They describe how appearance behaves in the world — not results MapMyFace promises you.',
    /** Plotted on a 1990–2020 axis so three studies read as a body of work. */
    axis: { from: 1990, to: 2025 },
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
    turn:
      'None of this is a reason to panic about your face. It is a reason to stop guessing at it, and to spend your effort on the few changes that actually apply to you.',
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
  title: 'A real conversation,',
  muted: 'then a coordinated review.',
  denial:
    'No automated score. No app scanning your selfie. A person looks at your face and talks to you about it.',
  nodes: [
    {
      id: 'book',
      when: 'Day 0',
      title: 'Book and get contacted',
      kind: 'admin',
      text: 'Pay, see exactly what happens next, then a MapMyFace team member calls to walk you through it and help you pick a slot.',
      detail: [
        'Confirmation on screen immediately after checkout',
        'A person contacts you — you are not left with an email receipt',
        'You choose the earliest session slot that suits you',
      ],
    },
    {
      id: 'session',
      when: 'Your slot',
      title: 'Face Mapping Session',
      kind: 'human',
      text: 'A private video consultation. An expert speaks with you, observes your face and skin, and understands the reasons behind your concerns.',
      quote: 'We do not analyse only your photographs. We understand the person behind them.',
      detail: [
        'Private one-to-one video call, not a group session',
        'Structured conversation, with room to go deeper where your case needs it',
        'Keep your current products handy — we will ask what you actually use',
      ],
      /** The 18 questions, grouped. Behind a control, not printed on the page. */
      askedAbout: [
        ['Your goals', ['What you would actually like to improve', 'What concerns you most right now', 'The result you are hoping for']],
        ['Skincare history', ['Everything you use at the moment', 'What you used over the past year', 'Reactions, sensitivities, and what did nothing']],
        ['Daily routine', ['Your morning and night routine, honestly', 'Work environment, sleep and stress', 'Sun exposure and physical activity']],
        ['Lifestyle', ['Food habits and how much water you really drink', 'Travel frequency and daily schedule', 'Smoking or alcohol, where relevant']],
        ['Environment', ['Your city, its climate and humidity', 'Pollution levels and seasonal changes', 'Places you travel to regularly']],
        ['Personal context', ['Concerns you choose to share', 'Grooming and face-yoga history', 'Budget, and how much upkeep you actually want']],
      ],
    },
    {
      id: 'review',
      when: 'After',
      title: 'Expert Mapping Review',
      kind: 'human',
      text: 'The relevant specialists study your complete case together — so you get one direction, not four opinions to reconcile yourself.',
      detail: [
        'Medical and skin context where your concerns call for it',
        'Facial analysis and evidence-informed interpretation',
        'Face-yoga direction, and hair or style if you added a specialist Map',
      ],
    },
    {
      id: 'deliver',
      when: '3–5 working days',
      title: 'Your Face Map arrives',
      kind: 'human',
      text: 'Your analysis, your recommendations and your Appearance Protocol, as one organised report.',
      detail: [
        'Delivered 3–5 working days after your session',
        'Adding a specialist Map can take longer — we say so before you pay',
        'Written in plain language, reviewed before it reaches you',
      ],
    },
    {
      id: 'ask',
      when: 'Ongoing',
      title: 'Ask us anything unclear',
      kind: 'human',
      text: 'Clarification support is included. If something in your Face Map does not make sense, you message the team.',
      detail: [
        'Included in the plan — not charged separately',
        'For anything inside your delivered Face Map that is not clear',
      ],
    },
  ],
  boundary:
    'MapMyFace gives appearance, routine and educational guidance. Anything needing a diagnosis or medical treatment belongs with a qualified doctor, and we will say so plainly rather than guess.',
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
  eyebrow: 'What you receive',
  title: 'Your complete analysis,',
  muted: 'organised into one personal report.',
  lede:
    'Written after your session and the expert review. It says what the team observed, what it means, and what to do about it — in plain language, not scores out of ten.',
  chapterCount: 12,
  cta: 'Look inside a Face Map',
  sampleNotice:
    'Sample layout — illustrative structure with placeholder findings. Your Face Map is written from your own session.',
  /** Twelve chapters in four buckets. Nobody reads a flat list of twelve. */
  buckets: [
    {
      id: 'you',
      label: 'Understanding you',
      range: '01–02',
      summary: 'What you told us, and the overall read of your face before any detail.',
      chapters: ['Your Profile & Goals', 'Facial Overview'],
    },
    {
      id: 'analysis',
      label: 'The analysis',
      range: '03–05',
      summary: 'Feature by feature, then how those features relate, then your skin and current routine.',
      chapters: ['Feature-by-Feature Analysis', 'Facial Balance & Proportions', 'Skin & Routine Review'],
    },
    {
      id: 'direction',
      label: 'What to change',
      range: '06–09',
      summary: 'Skincare direction, grooming decisions, lifestyle observations, and the face yoga that is actually relevant to you.',
      chapters: ['Skincare Direction', 'Grooming Guidance', 'Lifestyle Observations', 'Your Face-Yoga Plan'],
    },
    {
      id: 'plan',
      label: 'In what order',
      range: '10–12',
      summary: 'Everything sorted by priority, so you are not trying to change eleven things at once.',
      chapters: ['Your Appearance Protocol', 'First, Next & Later', 'Recommended Follow-Through'],
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
        ['Reviewed by', 'Your expert panel'],
        ['Chapters', '12'],
      ],
    },
    {
      id: 'analysis',
      kind: 'analysis',
      label: 'Analysis spread',
      chapter: '04 · Facial Balance & Proportions',
      observations: [
        ['Midface', 'Balanced relative to lower third. No action indicated.'],
        ['Jaw definition', 'Softening along the lower border, consistent with reported sleep and hydration patterns.'],
        ['Brow position', 'Slight asymmetry, within normal range. Grooming can address the visible part.'],
        ['Under-eye', 'Pigmentation rather than volume loss. Changes the product category entirely.'],
      ],
      note:
        'Each observation is written as what was seen and what it means — never as a score, and never as a diagnosis.',
    },
    {
      id: 'protocol',
      kind: 'protocol',
      label: 'Appearance Protocol',
      chapter: '10 · Your Appearance Protocol',
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
      label: 'Clarification',
      chapter: '12 · Recommended Follow-Through',
      text:
        'If any part of this report is unclear, message the team and a specialist will explain it. Clarification support is included in your plan — there is no extra charge and no time limit inside the scope of this report.',
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
    'This is the part generic advice cannot do. A routine that works in Bengaluru fails in a Delhi winter, and the same haircut behaves differently in Chennai humidity.',
  columns: ['Delhi winter', 'Chennai humidity', 'Hard water', 'Night shifts'],
  rows: [
    {
      label: 'Skin',
      /** true where the recommendation genuinely changes. */
      cells: [true, true, true, true],
      notes: [
        'Barrier repair moves ahead of actives',
        'Gel textures; anything occlusive is counter-productive',
        'Cleanser choice changes before anything else does',
        'Timing shifts — the routine follows your sleep, not the clock',
      ],
    },
    {
      label: 'Hair',
      cells: [true, true, true, false],
      notes: [
        'Static and dryness change the cut you can maintain',
        'Volume collapses — length and layering get reconsidered',
        'Scalp buildup changes wash frequency and product',
        'No meaningful change',
      ],
    },
    {
      label: 'Routine',
      cells: [false, true, false, true],
      notes: [
        'No meaningful change',
        'Fewer steps, more often, beats more steps once',
        'No meaningful change',
        'Rebuilt around when you are actually awake',
      ],
    },
  ],
  legend: ['Recommendation changes', 'No meaningful change'],
  /** The anti-upsell promise, planted immediately before the price. */
  antiUpsell: {
    title: 'We sell one thing.',
    body:
      'The Face Map. We do not sell skincare, we do not stock products, and we take no commission from any brand we mention. If the honest answer is that your current routine is fine, that is what your report will say.',
  },
} as const

// ═════════════════════════════════════════════════════════════════════════════
// SECTION 10 — "Your face stays yours"
// Deliberately has NO disclosure mechanic. Burying a privacy covenant behind a
// click is the opposite of the point.
// ═════════════════════════════════════════════════════════════════════════════
export const PRIVACY_PATH = {
  eyebrow: 'Privacy',
  title: 'Your face and your information',
  muted: 'stay yours.',
  lede:
    'You are about to send photographs of your own face to strangers on the internet. That deserves a straight answer here, not a paragraph buried in a policy page.',
  /** Four stages of where a photograph actually goes. */
  stages: [
    { label: 'You send it', text: 'Uploaded over an encrypted connection during onboarding.' },
    { label: 'The panel opens it', text: 'Only the roles reviewing your case. Named below.' },
    { label: 'It is held', text: 'For as long as your report and clarification support are active.' },
    { label: 'You can end it', text: 'Ask us to delete it and we delete it. One email.' },
  ],
  /** Who sees a photograph — the conditional row is what proves it is a policy. */
  access: [
    { mono: 'MS', role: 'Medical & Skin', sees: 'Yes' },
    { mono: 'FA', role: 'Facial Analysis', sees: 'Yes' },
    { mono: 'FY', role: 'Face Yoga', sees: 'Yes' },
    { mono: 'HS', role: 'Hair & Style', sees: 'Only if you added a specialist Map' },
  ],
  covenant: [
    'Never used in marketing without separate, explicit written permission',
    'Buying the service gives us no right to publish your images',
    'No diagnosis or treatment is promised through appearance analysis',
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
  eyebrow: 'One last thing',
  title: 'Is it vain to want to look',
  muted: 'like the best version of yourself?',
  body:
    'We do not think so. Most people are not chasing a different face — they are tired of guessing, and tired of spending money on advice that was never about them. Knowing what genuinely suits you is not vanity. It is just information you have never been given.',
  notFor: {
    title: 'This is not for you if',
    items: [
      'You want a surgical or injectable recommendation',
      'You want a diagnosis for a medical skin condition',
      'You want one product name and nothing else',
    ],
  },
  // What the reader gets to feel, not what the product does — sits as floating
  // labels around the body copy above. Kept short; these are read in passing.
  traits: ['Confident', 'Calm', 'Radiant', 'Present', 'Enough'],
  cta: 'Start my Face Map',
  secondary: 'Look inside a Face Map',
} as const

// ═════════════════════════════════════════════════════════════════════════════
// SECTION 11 — FAQ, seven categories behind a rail.
// Expanded rather than trimmed: the FAQ is where a considering buyer resolves
// the last blocker, and it costs nothing on the page because only one category
// is mounted at a time. Refund and delivery answers now state real terms.
// ═════════════════════════════════════════════════════════════════════════════
export const FAQ_V2 = {
  eyebrow: 'Questions & Answers',
  title: 'Everything worth knowing',
  muted: 'before you pay.',
  categories: [
    {
      id: 'service',
      label: 'The service',
      items: [
        {
          q: 'What exactly is MapMyFace?',
          a: 'An expert-led personalised facial analysis service. A real expert meets you in a Face Mapping Session, the relevant specialists study your complete context together, and you receive a personalised Face Map with an Appearance Protocol telling you what to do first, next and later.',
        },
        {
          q: 'Is this an AI face scanner?',
          a: 'No. There is no algorithm scoring your face out of ten. Technology supports parts of the process, but the consultation, the interpretation and the review are done by people. If an automated score is what you want, this is not it.',
        },
        {
          q: 'Can both men and women use MapMyFace?',
          a: 'Yes. It is built for anyone who wants personalised clarity about what genuinely suits them.',
        },
        {
          q: 'Is this only for people with a problem?',
          a: 'No. Plenty of people arrive with nothing wrong and simply want to stop guessing. If the honest answer is that your routine is already fine, your report says that.',
        },
      ],
    },
    {
      id: 'session',
      label: 'Your session',
      items: [
        {
          q: 'Who conducts the Face Mapping Session?',
          a: 'An appropriate MapMyFace expert or trained lead specialist, who gathers everything the review team needs. It is a private one-to-one video call, not a group session.',
        },
        {
          q: 'Do I have to be on camera?',
          a: 'Yes — the expert needs to see your face and skin, which is the entire point of speaking rather than sending photographs. Join from somewhere quiet and well lit.',
        },
        {
          q: 'What should I prepare?',
          a: 'Keep your current skincare products within reach, along with rough details of what you have used before. If any additional photographs are needed we tell you exactly what during onboarding.',
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
          q: 'When does it arrive?',
          a: 'Within 3 to 5 working days of your Face Mapping Session. Adding a specialist Map can take longer, and we tell you that before you pay rather than after.',
        },
        {
          q: 'What is included in the main plan?',
          a: 'Onboarding, the Face Mapping Session, facial analysis, skin and routine review, skincare direction, grooming guidance, relevant face yoga, the Expert Mapping Review, your Face Map, your Appearance Protocol, and clarification support afterwards.',
        },
        {
          q: 'Can I ask questions after I receive it?',
          a: 'Yes, and it is included rather than charged separately. If something inside your delivered Face Map is not clear, you message the team and a specialist explains it.',
        },
        {
          q: 'Will it just tell me to buy things?',
          a: 'We sell no products and take no commission from any brand, so there is nothing for us to push. Recommendations are written as categories and direction you can shop for yourself.',
        },
      ],
    },
    {
      id: 'addons',
      label: 'Add-ons',
      items: [
        {
          q: 'Is the Hair Map included?',
          a: 'No, it is an optional add-on at ₹699 covering haircut structure, hairstyle, parting, volume and facial-hair direction where relevant.',
        },
        {
          q: 'Is the Style & Colour Map included?',
          a: 'No, it is an optional add-on at ₹699 covering clothing colours, silhouettes, necklines, accessories and presentation guidance.',
        },
        {
          q: 'Do I have to decide now?',
          a: 'You choose add-ons before payment. They are reviewed as part of the same case as your Face Map rather than delivered as separate services.',
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
          q: 'Is ₹2,699 the final amount?',
          a: 'Yes. GST is included and nothing is added at checkout. It is a single payment — there is no subscription and nothing renews.',
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
          q: 'Who actually sees my photographs?',
          a: 'Only the specialists reviewing your case. The hair and style specialist sees them solely if you have added a Hair Map or Style & Colour Map.',
        },
        {
          q: 'Can my photos be used publicly?',
          a: 'Only with separate, explicit written permission. Buying the service gives us no right whatsoever to use your images for marketing.',
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
          q: 'Will you recommend surgery?',
          a: 'No. MapMyFace is not a surgical-recommendation service and does not position itself as one.',
        },
        {
          q: 'Do you diagnose skin conditions?',
          a: 'No. We give appearance, routine and educational guidance. Anything needing diagnosis or treatment belongs with a qualified medical professional, and we say so plainly rather than guess.',
        },
        {
          q: 'Are results guaranteed?',
          a: 'No, and anyone promising that is selling you something else. What is guaranteed is the process: a real session, a multidisciplinary review, and a prioritised plan written for your face.',
        },
      ],
    },
  ],
} as const
