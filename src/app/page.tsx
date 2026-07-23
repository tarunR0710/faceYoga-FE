import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Hero } from '@/components/sections/hero'
import { SocialProof } from '@/components/sections/social-proof'
import { Transformations } from '@/components/sections/transformations'
import { ResearchStats } from '@/components/sections/research-stats'
import { OldVsNew } from '@/components/sections/old-vs-new'
import { FacialAnalysis } from '@/components/sections/facial-analysis'
import { LivingAnalysis } from '@/components/sections/living-analysis'
import { PersonalizationFactors } from '@/components/sections/personalization-factors'
import { Features } from '@/components/sections/features'
import { WhatYoullLearn } from '@/components/sections/what-youll-learn'
import { HowItWorks } from '@/components/sections/how-it-works'
import { MuscleMap } from '@/components/sections/muscle-map'
import { Gallery } from '@/components/sections/gallery'
import { ProgressTracking } from '@/components/sections/progress-tracking'
import { Science } from '@/components/sections/science'
import { Experts } from '@/components/sections/experts'
import { Community } from '@/components/sections/community'
import { Testimonials } from '@/components/sections/testimonials'
import { PricingPreview } from '@/components/sections/pricing-preview'
import { FAQ } from '@/components/sections/faq'
import { CTA } from '@/components/sections/cta'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SocialProof />
        <Transformations />
        <ResearchStats />
        <OldVsNew />
        <FacialAnalysis />
        <LivingAnalysis />
        <PersonalizationFactors />
        <Features />
        <WhatYoullLearn />
        <HowItWorks />
        <MuscleMap />
        <Gallery />
        <ProgressTracking />
        <Science />
        <Experts />
        <Community />
        <Testimonials />
        <PricingPreview />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
