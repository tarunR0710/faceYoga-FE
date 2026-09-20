'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

const H = 'text-[18px] font-normal text-ink mt-8 mb-4'

/**
 * Written to the blueprint's six trust promises: private by default,
 * need-to-know access, separate public consent, clear boundaries, clear payment,
 * customer control. The homepage's privacy section summarises this page; the
 * two must agree.
 *
 * TODO(founder): retention period and the named grievance officer (with an
 * Indian phone number and hours, as the Consumer Protection (E-Commerce) Rules
 * require) are still to be supplied — see section 6.
 */
export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-[14px] text-[#666] hover:text-ink mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <h1 className="text-[2rem] font-light text-ink mb-8">Privacy Policy</h1>

        <div className="prose prose-gray max-w-none text-[15px] text-[#555] leading-relaxed space-y-6">
          <p>Last updated: September 2026</p>

          <h2 className={H}>1. What we collect</h2>
          <p>
            Your name, email address and phone number when you book; what you tell us during onboarding and your
            Face Mapping Session about your goals, routine, skincare history, lifestyle and environment; how your
            face presents on the live video session, and any photographs you choose to share; and payment
            confirmation from Razorpay. We never see or store your card details.
          </p>

          <h2 className={H}>2. Private by default</h2>
          <p>
            Your consultation and Face Map are personal. Everything you share is used to deliver the service to
            you, not as public content.
          </p>

          <h2 className={H}>3. Need-to-know access</h2>
          <p>
            Access is limited to the people required to deliver your MapMyFace experience: the Lead Appearance
            Expert who runs your session, and the specialists contributing to your Expert Mapping Review. Specialist
            reviewers see your material only when your plan calls for their input.
          </p>

          <h2 id="consent" className={H}>4. Consent & Image Use</h2>
          <p>
            Purchasing MapMyFace does not automatically give permission to use your images, video, report or
            feedback publicly. Any marketing use — a case study, a testimonial, a before-and-after — is a separate
            decision that requires your explicit, written consent, which you can decline or withdraw at any time
            by emailing {SITE_CONFIG.email}.
          </p>

          <h2 className={H}>5. Clear boundaries</h2>
          <p>
            We stay inside appearance guidance. We do not collect or process medical records, and dental,
            surgical or medical concerns that require diagnosis or treatment are directed to a qualified
            professional.
          </p>

          <h2 className={H}>6. How long we keep it</h2>
          <p>
            Your session material and Face Map are held for as long as your report and clarification support are
            active. The exact retention period and our named grievance contact are published here as part of our
            full data policy.
          </p>

          <h2 className={H}>7. Your control</h2>
          <p>
            You can ask us to access, correct or delete your personal information, including session recordings
            and images, at any time. Email {SITE_CONFIG.email} and we do it. Deleting your material may limit our
            ability to provide clarification support afterwards.
          </p>

          <h2 className={H}>8. Third parties</h2>
          <p>
            We use Razorpay for payments, MSG91 for phone verification, and analytics tools to understand how the
            website is used. Each has its own privacy policy. We do not sell your information.
          </p>

          <h2 className={H}>9. Cookies</h2>
          <p>We use cookies to keep the site working and to analyse usage. You can disable cookies in your browser settings.</p>

          <h2 className={H}>10. Contact</h2>
          <p>For privacy questions, data requests or deletion requests, contact us at {SITE_CONFIG.email}</p>
        </div>
      </div>
    </div>
  )
}
