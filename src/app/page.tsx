import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Tone, type ToneName } from '@/components/layout/tone'
import { Hero } from '@/components/sections/hero'
import { TrustBar } from '@/components/sections/trust-bar'
import { Problem } from '@/components/sections/problem'
import { WhatIsMapMyFace } from '@/components/sections/what-is-mapmyface'
import { Outcome } from '@/components/sections/outcome'
import { HowItWorks } from '@/components/sections/how-it-works'
import { FaceMappingSession } from '@/components/sections/face-mapping-session'
import { ExpertUnderstands } from '@/components/sections/expert-understands'
import { Experts } from '@/components/sections/experts'
import { FacialAnalysis } from '@/components/sections/facial-analysis'
import { InsideFaceMap } from '@/components/sections/inside-face-map'
import { AppearanceProtocol } from '@/components/sections/appearance-protocol'
import { MainOffer } from '@/components/sections/main-offer'
import { AddOns } from '@/components/sections/add-ons'
import { Methodology } from '@/components/sections/methodology'
import { WhyDifferent } from '@/components/sections/why-different'
import { WhoItsFor } from '@/components/sections/who-its-for'
import { BetaExperiences } from '@/components/sections/beta-experiences'
import { PricingPreview } from '@/components/sections/pricing-preview'
import { AfterPayment } from '@/components/sections/after-payment'
import { PrivacyTrust } from '@/components/sections/privacy-trust'
import { FAQ } from '@/components/sections/faq'
import { CTA } from '@/components/sections/cta'

/**
 * Homepage — section order is the MapMyFace Website Visual Blueprint's page
 * order, one section per blueprint spread. Belief is built in this sequence:
 * problem → what it is → outcome → method → the people → the report → the offer
 * → proof → price → what happens next → privacy → questions → ask.
 *
 * SECTION TONES live here and nowhere else. Sections set no background of their
 * own; `<Tone>` paints it. To re-tune the page rhythm — or drop it entirely —
 * edit this one array.
 *
 *   base — plain ground
 *   wash — the pricing-card gradient at 10–13%, the quiet alternator
 *   glow — the same gradient at 28–36%, saved for two attention moments
 *   deep — the gradient inverted; the anchors
 *
 * Rules: never two tinted bands back to back (`base` between them), and only
 * ever two `glow` and three `deep` on the page (05 / 10 / 16) — scarcity is what
 * makes them land, and they need spacing: 10 and 16 works, 10 and 12 would not.
 *
 * Dormant (kept in git, not rendered): `living-analysis`, `transformations`,
 * `testimonials`, `community`, `old-vs-new`, `comparison`, `muscle-map`,
 * `features`, `science`, `what-youll-learn`, `progress-tracking`,
 * `research-stats`, `stats-grid`, `gallery`, `social-proof`, `expert-review` — none
 * appear in the
 * blueprint's section order.
 */
const SECTIONS: { tone: ToneName; node: React.ReactNode; note: string }[] = [
  { tone: 'wash', node: <Problem key="problem" />, note: '02 The problem' },
  { tone: 'base', node: <WhatIsMapMyFace key="what-is" />, note: '03 What is MapMyFace?' },
  { tone: 'glow', node: <Outcome key="outcome" />, note: '04 The outcome — first hook' },
  { tone: 'deep', node: <HowItWorks key="method" />, note: '05 The method — anchor 1' },
  { tone: 'base', node: <FaceMappingSession key="session" />, note: '06 Face Mapping Session' },
  { tone: 'wash', node: <ExpertUnderstands key="understands" />, note: '07 What the expert understands' },
  { tone: 'base', node: <Experts key="experts" />, note: '08 The expert panel + Expert Mapping Review' },
  { tone: 'deep', node: <FacialAnalysis key="face-map" />, note: '09 Your Face Map — anchor 2' },
  { tone: 'wash', node: <InsideFaceMap key="inside" />, note: '10 Inside your Face Map' },
  { tone: 'base', node: <AppearanceProtocol key="protocol" />, note: '11 Appearance Protocol' },
  { tone: 'glow', node: <MainOffer key="offer" />, note: '12 The main offer — second hook' },
  { tone: 'base', node: <AddOns key="add-ons" />, note: '13 Hair Map + Style & Colour Map' },
  { tone: 'wash', node: <Methodology key="methodology" />, note: '14 The methodology' },
  { tone: 'deep', node: <WhyDifferent key="different" />, note: '15 Why MapMyFace is different — anchor 3' },
  { tone: 'wash', node: <WhoItsFor key="who" />, note: '16 Who it is for' },
  { tone: 'base', node: <BetaExperiences key="beta" />, note: '17 Beta client experiences' },
  { tone: 'base', node: <PricingPreview key="pricing" />, note: '18 Pricing — the card owns the gradient here' },
  { tone: 'wash', node: <AfterPayment key="after" />, note: '19 After payment' },
  { tone: 'base', node: <PrivacyTrust key="privacy" />, note: '20 Privacy & trust' },
  { tone: 'wash', node: <FAQ key="faq" />, note: '21 FAQ' },
]

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />      {/* 01  Hero — its own video ground */}
        <TrustBar />  {/* 01b Live / Team / Map / Help */}

        {SECTIONS.map((s, i) => (
          <Tone key={i} tone={s.tone}>
            {s.node}
          </Tone>
        ))}

        <CTA />       {/* 23  Final CTA — owns its own deep gradient */}
      </main>
      <Footer />
    </>
  )
}
