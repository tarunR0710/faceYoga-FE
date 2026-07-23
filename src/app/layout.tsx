import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { MetaPixel } from '@/components/analytics/meta-pixel'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'FaceYoga - Transform Your Face Naturally',
  description: 'Discover personalized face yoga routines backed by science. Get your custom facial analysis and transformation plan today.',
  keywords: ['face yoga', 'facial exercises', 'natural beauty', 'facial transformation', 'anti-aging'],
  openGraph: {
    title: 'FaceYoga - Transform Your Face Naturally',
    description: 'Discover personalized face yoga routines backed by science.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
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
