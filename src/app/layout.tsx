import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { MetaPixel } from '@/components/analytics/meta-pixel'
import { LocatorUI } from '@/components/analytics/locator-ui'
import './globals.css'

// Geist (Vercel, SIL OFL 1.1) — a Swiss neo-grotesque in the same lineage as
// PP Neue Montreal, which is commercial and can't be used here. Ships as a
// single variable file spanning wght 100–900, so fractional weights like the
// 450 used across our headings render exactly rather than snapping to a cut.
// The package registers it via next/font/local, so it stays self-hosted with
// automatic preload and size-adjusted fallback metrics.

export const metadata: Metadata = {
  title: {
    default: 'MapMyFace — Understand your face. Discover what suits you.',
    template: '%s · MapMyFace',
  },
  description:
    'Expert-led personalised facial analysis for India. Meet a real expert in a Face Mapping Session, then receive one Face Map covering facial analysis, skincare direction, grooming and relevant face yoga.',
  keywords: [
    'facial analysis India',
    'personalised skincare consultation',
    'face mapping session',
    'grooming consultation India',
    'hair and style consultation',
    'face yoga plan',
  ],
  openGraph: {
    title: 'MapMyFace — Understand your face. Discover what suits you.',
    description:
      'An expert-led Face Mapping Session, a multidisciplinary review, and one personalised Face Map with a clear first / next / later plan.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'MapMyFace',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MapMyFace — Understand your face. Discover what suits you.',
    description:
      'Expert-led personalised facial analysis, skincare direction, grooming and face yoga — in one Face Map.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased">
        <LocatorUI />
        <MetaPixel />
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
