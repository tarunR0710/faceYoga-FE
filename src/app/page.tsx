import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

import { Hero } from '@/components/sections/hero'
import { TrustBar } from '@/components/sections/trust-bar'
import { Problem } from '@/components/sections/problem'
import { Difference } from '@/components/sections/difference'
// import { FullPicture } from '@/components/sections/full-picture' // cut 2026-09-25, see below
import { Plan } from '@/components/sections/plan'
import { Proof } from '@/components/sections/proof'
import { FacialExpertise } from '@/components/sections/facial-expertise'
import { Believe } from '@/components/sections/believe'
import { WhatWeMap } from '@/components/sections/what-we-map'
import { ContextFactors } from '@/components/sections/context-factors'
import { Journey } from '@/components/sections/journey'
// import { VisualDirection } from '@/components/sections/visual-direction' // hidden 2026-09-20, see below
import { Guidance } from '@/components/sections/guidance'
// import { Experiences } from '@/components/sections/experiences' // cut 2026-09-25, see below
import { FaceMapSection } from '@/components/sections/face-map'
// import { Protocol } from '@/components/sections/protocol' // cut 2026-09-22, see below
import { ContextFit, SellOneThing } from '@/components/sections/context-fit'
import { PricingPreview } from '@/components/sections/pricing-preview'
import { Money } from '@/components/sections/money'
// import { PrivacyTrust } from '@/components/sections/privacy-trust' // cut 2026-09-24, see below
import { FAQ } from '@/components/sections/faq'
import { CTA } from '@/components/sections/cta'

/**
 * The homepage, in the buyer's own question sequence rather than the brand
 * blueprint's chapter order: does it visibly work → do I recognise myself in
 * this → why is this different → what is the plan → how do you read a face →
 * what do you assess → what do you ask me → how does it happen → what do I
 * receive → who are you → does it apply to ME → what does it cost → where
 * does the money already go → anything unresolved → permission to want this.
 *
 * Sections are cut here rather than in their own files, so a cut is one line
 * and a restore is one line. Commented-out entries below each carry the date
 * and the reason. Live count is in HOMEPAGE-AUDIT.md, which also holds the
 * claim-by-claim repetition audit and what is still open.
 *
 * Two rules the order keeps: section rhythm alternates ground (white / mist /
 * gradient), and no two adjacent sections share a layout archetype.
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
        {/* "What we take into account" is cut (2026-09-25, homepage audit).
            Built for your context absorbed it when that section became design
            43a: the same five dimensions, but each one now a scenario with a
            consequence attached rather than a flat item. Every one of its five
            items was already covered in more depth by What We Map and the 100+
            context factors; the one line it alone carried — that we do not read
            the face in isolation — now opens the 43a lede. Cutting it also puts
            The plan back where it was written to sit, directly after Problem
            and Difference. Component and FULL_PICTURE content stay in place. */}
        {/* <FullPicture /> */}
        <Plan />
        <FacialExpertise />
        {/* ── Phase 2 (t 22 blueprint) starts here. Everything above is frozen. ── */}
        <WhatWeMap />
        <ContextFactors />
        {/* The three context beats run together: what we assess about your
            face, what we ask about your life, then what changes in the plan
            because of the answers. Built for your context sat four sections
            further down until 2026-09-25; its closing promise did not move
            with it, and still lands immediately before the price. */}
        <ContextFit />
        <Journey />
        <FaceMapSection />
        {/* Visual Direction is hidden for now (founder call, 2026-09-20). The
            section and its content stay in place — re-enable by restoring the
            import above and this line. */}
        {/* <VisualDirection /> */}
        <Guidance />
        {/* Appearance Protocol is cut (2026-09-22, homepage audit). It was a
            chapter of the Face Map section directly above: chapter 13 of that
            report already shows Start / Stop / Continue and First / Next /
            Later, against real example actions rather than chip definitions.
            The component and PROTOCOL content stay in place. */}
        {/* <Protocol /> */}
        <Believe />
        {/* MapMyFace experiences is cut (2026-09-25, homepage audit). It
            rendered nothing at all: EXPERIENCES.stories is empty and the
            component returns null until a real, consented customer story
            exists. Restore this line the day there is one, and add Results
            to NAV_LINKS with it. */}
        {/* <Experiences /> */}
        <SellOneThing />
        <PricingPreview />
        <Money />
        {/* "Built around something personal" is cut (2026-09-24, homepage
            audit). Four of its five blocks were already said elsewhere: the
            access table repeated the four role cards in the experts section
            and a FAQ answer, and all four covenant lines repeated the FAQ,
            the pricing GST note or "Where we stop" in How It Works. The one
            thing it alone carried — where a photograph actually goes — is now
            the first answer under "Privacy & photos" in the FAQ directly
            below. The component and PRIVACY_PATH stay in place. */}
        {/* <PrivacyTrust /> */}
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
