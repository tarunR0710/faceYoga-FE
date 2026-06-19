import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { MetaPixel } from '@/components/analytics/meta-pixel'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
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
      <body className="font-sans antialiased">
        <MetaPixel />
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
