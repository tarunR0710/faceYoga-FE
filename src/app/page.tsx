import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { StickyCTA } from '@/components/layout/sticky-cta'

import { Hero } from '@/components/sections/hero'
import { TrustBar } from '@/components/sections/trust-bar'
import { Problem } from '@/components/sections/problem'
import { Difference } from '@/components/sections/difference'
import { FullPicture } from '@/components/sections/full-picture'
import { Plan } from '@/components/sections/plan'
import { Proof } from '@/components/sections/proof'
import { Believe } from '@/components/sections/believe'
import { Journey } from '@/components/sections/journey'
import { FaceMapSection } from '@/components/sections/face-map'
import { Protocol } from '@/components/sections/protocol'
import { ContextFit } from '@/components/sections/context-fit'
import { PricingPreview } from '@/components/sections/pricing-preview'
import { PrivacyTrust } from '@/components/sections/privacy-trust'
import { FAQ } from '@/components/sections/faq'
import { CTA } from '@/components/sections/cta'

/**
 * Twelve sections, where twenty-three stood.
 *
 * The order is the buyer's own question sequence, not the brand blueprint's
 * chapter order:
 *
 *   1 what is this (and what does it cost)   7 in what order
 *   2 does it visibly work            ← PROOF, moved up to lead with results
 *   3 do I recognise myself in this          8 will it apply to ME
 *   4 who are you and why believe you        9 the money
 *   5 how does it actually happen           10 can I trust you with my face
 *   6 what do I actually receive            11 anything unresolved
 *                                           12 permission to want this
 *
 * Nothing from the blueprint was deleted for being long — roughly half of it
 * now sits behind a tab, an accordion, a stepper or a modal, which is what
 * separates a reference document from a list. What WAS deleted was repetition:
 * the add-ons were sold twice, First / Next / Later was stated four times, and
 * the same six territories were re-cut across four sections.
 *
 * Section rhythm alternates ground (white / mist / ink / gradient) and no two
 * adjacent sections share a layout archetype.
 */
export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Proof />
        <Problem />
        <Difference />
        <FullPicture />
        <Plan />
        <Believe />
        <Journey />
        <FaceMapSection />
        <Protocol />
        <ContextFit />
        <PricingPreview />
        <PrivacyTrust />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <StickyCTA />
    </>
  )
}
