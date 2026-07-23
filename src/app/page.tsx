import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Hero } from '@/components/sections/hero'
import { OldVsNew } from '@/components/sections/old-vs-new'
import { HowItWorks } from '@/components/sections/how-it-works'
import { PersonalizationFactors } from '@/components/sections/personalization-factors'
import { FacialAnalysis } from '@/components/sections/facial-analysis'
import { Experts } from '@/components/sections/experts'
import { AddOns } from '@/components/sections/add-ons'
import { Community } from '@/components/sections/community'
import { PricingPreview } from '@/components/sections/pricing-preview'
import { FAQ } from '@/components/sections/faq'
import { CTA } from '@/components/sections/cta'

// MapMyFace 11-section homepage rhythm (Brand Bible blueprint).
// Phase 3A: Problem / Method / Human Difference / Add-ons are rebranded.
// Face Map (05), Experts (06), Proof (08), Pricing (09), FAQ (10) still carry
// interim (honesty-clean) copy — rewritten in Phase 3B. living-analysis,
// muscle-map, what-youll-learn, features and science are folded/cut (dormant in git).
export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <OldVsNew />               {/* 02 Problem */}
        <HowItWorks />             {/* 03 Method */}
        <PersonalizationFactors /> {/* 04 Human Difference */}
        <FacialAnalysis />         {/* 05 Face Map (rewrite in 3B) */}
        <Experts />                {/* 06 Experts (rewrite in 3B) */}
        <AddOns />                 {/* 07 Add-ons */}
        <Community />              {/* 08 Proof (rewrite in 3B) */}
        <PricingPreview />         {/* 09 Pricing (rewrite in 3B) */}
        <FAQ />                    {/* 10 FAQ / Privacy (rewrite in 3B) */}
        <CTA />                    {/* 11 Final CTA */}
      </main>
      <Footer />
    </>
  )
}
