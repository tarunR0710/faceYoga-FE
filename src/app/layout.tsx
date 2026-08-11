import type { Metadata } from 'next'
import { Manrope, Newsreader, Jost, IBM_Plex_Mono } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { MetaPixel } from '@/components/analytics/meta-pixel'
import './globals.css'

// MapMyFace type system (Bible): Manrope for everything functional,
// Newsreader Italic reserved for rare editorial accents (<15% of type).
const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  weight: ['400', '500', '600'],
})

// Jost — a geometric Futura-style face, reserved for the MapMyFace logotype
// (matches the thin, geometric letterforms of the brand wordmark).
const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  display: 'swap',
  weight: ['300', '400'],
})

// IBM Plex Mono — NOT a fourth text family; the brand's *system voice*. It is
// rationed to machine-ish labels: section tags, indices, the session timer,
// coordinates. Humanist skeleton so it sits beside Manrope rather than against
// it, real tabular figures, and it holds up at 10px. One weight only.
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-plex-mono',
  display: 'swap',
  weight: ['500'],
})

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
  weight: ['400'],
  style: ['italic'],
  adjustFontFallback: false,
})

export const metadata: Metadata = {
  title: 'MapMyFace — Understand your face. Know what suits you.',
  description:
    'Meet a real expert in a live Face Mapping Session. We study your facial structure, skin, routine, lifestyle and goals, then create your personalised Face Map with clear recommendations for skincare, grooming and relevant face yoga.',
  keywords: [
    'face mapping',
    'personalised appearance analysis',
    'expert-led face analysis',
    'Face Map',
    'Appearance Protocol',
    'India',
  ],
  openGraph: {
    title: 'MapMyFace — Understand your face. Know what suits you.',
    description: 'One live session. Five layers of expert analysis. One Face Map.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // data-palette selects the theme. `mineral` is the live one: two low-chroma
  // poles (warm sand --g-warm / cool mineral --g-cool) that the section bands,
  // washes and card hovers all drift BETWEEN, plus a rationed teal for actions
  // and a terracotta spark. It replaced `aurora`, which drove the ground, the
  // ink, every band and every hover off a single cyan and so could only ever
  // read as blue. Section rhythm itself lives in app/page.tsx → SECTIONS.
  // all options: mineral · aurora · clinic · verdant · meadow · grove · amber
  //              teal · emerald · coral · azure · onyx · mahogany · periwinkle
  //              deep-teal · oxblood · lagoon · aqua
  return (
    <html
      lang="en"
      data-palette="aurora"
      className={`${manrope.variable} ${newsreader.variable} ${jost.variable} ${plexMono.variable}`}
    >
      <head>
        {/* Warm up connections to the media/image hosts for a faster LCP */}
        <link rel="preconnect" href="https://pub-276f99bee0ca472b8c097bf6b9fc7e52.r2.dev" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased">
        <MetaPixel />
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
