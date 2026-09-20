'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { FACE_MAP_CORE, SITE_CONFIG, TIMINGS } from '@/lib/constants'

const H = 'text-[18px] font-normal text-[#111] mt-8 mb-4'

/**
 * Terms for the service as actually sold: a live Face Mapping Session, an
 * Expert Mapping Review, a Face Map with an Appearance Protocol and, where
 * useful, Visual Direction, plus optional add-ons. Prices and timings read from
 * lib/constants so this page cannot drift from the homepage.
 *
 * TODO(founder): the missed-session (no-show) policy is not yet decided and is
 * deliberately not stated here. Add it under "Scheduling" once it is.
 */
export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-[14px] text-[#666] hover:text-[#111] mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <h1 className="text-[2rem] font-light text-[#111] mb-8">Terms of Service</h1>

        <div className="prose prose-gray max-w-none text-[15px] text-[#555] leading-relaxed space-y-6">
          <p>Last updated: September 2026</p>

          <h2 className={H}>1. Acceptance of terms</h2>
          <p>
            By purchasing or using MapMyFace you agree to these Terms of Service, our Privacy Policy and our
            Refund Policy. If you do not agree, please do not use the service.
          </p>

          <h2 className={H}>2. What the service is</h2>
          <p>
            MapMyFace is an expert-led appearance-analysis service. The {FACE_MAP_CORE.name} ({FACE_MAP_CORE.priceDisplay},
            one-time, GST-inclusive) includes personal onboarding, a live {TIMINGS.session} Face Mapping Session on
            video, an Expert Mapping Review, and a personalised Face Map containing your Appearance Protocol
            (Start / Stop / Continue and First / Next / Later), Visual Direction where relevant, and a short expert
            clarification call. Optional add-ons — Priority Delivery, Hair Map and Style & Colour Map — are offered
            before payment and priced separately.
          </p>

          <h2 className={H}>3. What the service is not</h2>
          <p>
            MapMyFace provides appearance, routine and educational guidance. It does not diagnose, treat or
            recommend surgery. Dental, surgical or medical concerns that require diagnosis or treatment are
            directed to an appropriately qualified professional. Visual Direction is an illustrative direction to
            help you understand a recommendation; it is not a prediction or guarantee of future appearance or
            results. No outcome is guaranteed.
          </p>

          <h2 className={H}>4. Scheduling, rescheduling and delivery</h2>
          <p>
            After payment we contact you {TIMINGS.onboarding}. Your session is scheduled according to
            availability, {TIMINGS.scheduling}. Rescheduling is free; please tell us before your session if you
            cannot attend. If we cancel or miss a booked session, you choose a new slot or take a full refund.
            Standard Face Map delivery may take {TIMINGS.deliveryShort} after your session; Priority Delivery
            targets {TIMINGS.priority}. Delivery targets are targets, not guarantees, and depend on you providing
            any required inputs.
          </p>

          <h2 className={H}>5. Your responsibilities</h2>
          <p>
            You agree to provide accurate information, to attend the session yourself, on camera, from a quiet
            and well-lit place, and to use the service for personal, non-commercial purposes. Recommendations are
            made on the information you share; please tell us about sensitivities, reactions and any relevant
            conditions.
          </p>

          <h2 className={H}>6. Payment</h2>
          <p>
            Payments are processed securely through Razorpay. Prices are in Indian Rupees and include GST. The
            full amount, including any selected add-ons, is shown before payment is completed. We do not sell
            products and take no commission from any brand or product recommended in your Face Map.
          </p>

          <h2 className={H}>7. Refunds</h2>
          <p>
            Refunds are governed by our <Link href="/refund" className="underline">Refund Policy</Link>: a full
            refund at any time before your session begins, and a report-portion refund if we fail to deliver your
            Face Map to the described scope.
          </p>

          <h2 className={H}>8. Your images, session and report</h2>
          <p>
            Your session, images, report and feedback are used to deliver the service to you. Purchasing MapMyFace
            does not give us permission to use any of them publicly. Marketing use requires your separate, explicit
            consent, which you may decline or withdraw. See our{' '}
            <Link href="/privacy#consent" className="underline">Consent & Image Use</Link> section.
          </p>

          <h2 className={H}>9. Intellectual property</h2>
          <p>
            Your Face Map is prepared for you personally. The MapMyFace framework, report structure, website
            content and materials remain the property of MapMyFace and may not be reproduced or resold.
          </p>

          <h2 className={H}>10. Contact</h2>
          <p>For questions about these terms, contact us at {SITE_CONFIG.email}</p>
        </div>
      </div>
    </div>
  )
}
