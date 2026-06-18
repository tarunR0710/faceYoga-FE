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
  name: 'FaceYoga',
  description: 'Transform Your Face Naturally',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  email: 'support@faceyoga.com',
  phone: '+91 9876543210',
}

export const NAV_LINKS = [
  { href: '#how-it-works', label: 'How it works' },
  { href: '#transformations', label: 'Transformations' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
]

export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/faceyoga',
  youtube: 'https://youtube.com/faceyoga',
  twitter: 'https://twitter.com/faceyoga',
}

export const STATS = [
  { value: '50,000+', label: 'Happy Customers' },
  { value: '160+', label: 'Exercise Routines' },
  { value: '2,000+', label: 'Research Studies' },
  { value: '4.9/5', label: 'Customer Rating' },
]

export const MEDIA_LOGOS = [
  'Times of India',
  'Hindustan Times',
  'Economic Times',
  'India Today',
  'NDTV',
  'News18',
]

export const FAQ_CATEGORIES = [
  {
    title: 'General Questions',
    questions: [
      {
        q: 'What is Face Yoga?',
        a: 'Face Yoga is a natural method that involves performing specific facial exercises to tone and strengthen the muscles in your face. It can help reduce wrinkles, improve facial symmetry, and give you a more youthful appearance without any surgery or invasive procedures.',
      },
      {
        q: 'How does Face Yoga work?',
        a: 'Face Yoga works by targeting the 57 muscles in your face and neck. Through consistent practice of specific exercises, you can increase blood circulation, stimulate collagen production, and tone facial muscles, leading to firmer, more lifted skin.',
      },
      {
        q: 'Is Face Yoga safe?',
        a: 'Yes, Face Yoga is completely safe when done correctly. Our personalized routines are designed by certified experts and backed by scientific research. We provide detailed video instructions to ensure you perform each exercise properly.',
      },
    ],
  },
  {
    title: 'About The Analysis',
    questions: [
      {
        q: 'What does the facial analysis include?',
        a: 'Our comprehensive analysis examines 160+ facial parameters including facial symmetry, muscle tone, skin texture, and proportions. We use this data to create a completely personalized routine tailored to your unique facial structure and goals.',
      },
      {
        q: 'How long does the analysis take?',
        a: 'After you submit your photos, our team analyzes your facial structure within 24-48 hours. You will receive your complete personalized plan along with video tutorials and tracking tools.',
      },
      {
        q: 'What photos do I need to submit?',
        a: 'We require 3 clear photos: front-facing, left profile, and right profile. All photos should be taken in good lighting without makeup, glasses, or filters for the most accurate analysis.',
      },
    ],
  },
  {
    title: 'Pricing & Plans',
    questions: [
      {
        q: 'Can I cancel my subscription anytime?',
        a: 'Yes, you can cancel your subscription at any time with no questions asked. Your access will continue until the end of your billing period.',
      },
      {
        q: 'Is there a refund policy?',
        a: 'We offer a 7-day money-back guarantee. If you are not satisfied with your analysis and plan within the first 7 days, we will provide a full refund.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit/debit cards, UPI, net banking, and popular wallets through our secure Razorpay payment gateway.',
      },
    ],
  },
  {
    title: 'Results & Support',
    questions: [
      {
        q: 'When will I see results?',
        a: 'Most users start noticing improvements within 2-4 weeks of consistent practice. Significant results typically appear after 2-3 months of following your personalized routine.',
      },
      {
        q: 'How much time do I need to practice daily?',
        a: 'Our routines are designed to be efficient. Most exercises take only 10-15 minutes per day. Consistency is more important than duration.',
      },
      {
        q: 'How can I contact support?',
        a: 'You can reach our support team via email at support@faceyoga.com. Premium plan members also have access to priority support and direct expert consultations.',
      },
    ],
  },
]

export const OTP_CONFIG = {
  length: 6,
  expiryMinutes: 10,
  maxAttempts: 3,
  resendCooldownSeconds: 60,
}
