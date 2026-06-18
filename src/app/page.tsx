import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Hero } from '@/components/sections/hero'
import { Transformations } from '@/components/sections/transformations'
import { ResearchStats } from '@/components/sections/research-stats'
import { OldVsNew } from '@/components/sections/old-vs-new'
import { FacialAnalysis } from '@/components/sections/facial-analysis'
import { Features } from '@/components/sections/features'
import { HowItWorks } from '@/components/sections/how-it-works'
import { Gallery } from '@/components/sections/gallery'
import { Experts } from '@/components/sections/experts'
import { PricingPreview } from '@/components/sections/pricing-preview'
import { FAQ } from '@/components/sections/faq'
import { CTA } from '@/components/sections/cta'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Transformations />
        <ResearchStats />
        <OldVsNew />
        <FacialAnalysis />
        <Features />
        <HowItWorks />
        <Gallery />
        <Experts />
        <PricingPreview />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
