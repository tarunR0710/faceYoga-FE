import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Hero } from '@/components/sections/hero'
import { OldVsNew } from '@/components/sections/old-vs-new'
import { FacialAnalysis } from '@/components/sections/facial-analysis'
import { LivingAnalysis } from '@/components/sections/living-analysis'
import { PersonalizationFactors } from '@/components/sections/personalization-factors'
import { Features } from '@/components/sections/features'
import { WhatYoullLearn } from '@/components/sections/what-youll-learn'
import { HowItWorks } from '@/components/sections/how-it-works'
import { MuscleMap } from '@/components/sections/muscle-map'
import { Science } from '@/components/sections/science'
import { Experts } from '@/components/sections/experts'
import { Community } from '@/components/sections/community'
import { PricingPreview } from '@/components/sections/pricing-preview'
import { FAQ } from '@/components/sections/faq'
import { CTA } from '@/components/sections/cta'

// Phase 1 (honesty purge): SocialProof, Transformations, ResearchStats, Gallery,
// ProgressTracking and Testimonials are removed from the homepage — they were built
// on fabricated proof / attractiveness framing. The component files remain in the
// repo and git history; the full MapMyFace 11-section IA is rebuilt in Phase 3.
export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <OldVsNew />
        <FacialAnalysis />
        <LivingAnalysis />
        <PersonalizationFactors />
        <Features />
        <WhatYoullLearn />
        <HowItWorks />
        <MuscleMap />
        <Science />
        <Experts />
        <Community />
        <PricingPreview />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
