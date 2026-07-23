import type { Metadata } from 'next'
import { Manrope, Newsreader } from 'next/font/google'
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
  return (
    <html lang="en" className={`${manrope.variable} ${newsreader.variable}`}>
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
