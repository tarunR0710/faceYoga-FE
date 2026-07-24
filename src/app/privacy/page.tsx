'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-ivory font-sans">
      <Header />

      <main className="container-narrow pt-32 pb-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[14px] text-analysis-teal hover:text-ink transition-colors duration-150 mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <h1 className="text-heading-1 font-medium text-ink mb-3">Privacy Policy</h1>
        <p className="text-[14px] text-analysis-teal mb-12">Last updated: 2026</p>

        <div className="max-w-none text-[16px] text-ink/80 leading-relaxed space-y-6">
          <p>
            MapMyFace exists to help you understand your own appearance and build a plan around it.
            To do that well, we work with genuinely personal things: photos of your face, a live Face
            Mapping Session, and honest answers about your routine and lifestyle. We take that
            seriously. This page explains, in plain terms, what we collect, why, who can see it, and
            the control you keep over it. No fine-print games.
          </p>

          {/* 1 */}
          <section className="pt-6">
            <h2 className="text-heading-3 font-medium text-ink mb-3">What we collect</h2>
            <p className="mb-4">
              We only collect what we actually need to build your Face Map. That includes:
            </p>
            <ul className="space-y-3 pl-0 list-none">
              <li className="flex gap-3">
                <span className="text-teal mt-1 shrink-0">&mdash;</span>
                <span>
                  <span className="text-ink font-medium">Photos of your face.</span> The images you
                  upload so our experts can see what you see.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-teal mt-1 shrink-0">&mdash;</span>
                <span>
                  <span className="text-ink font-medium">Your Face Mapping Session.</span> The live
                  video consultation, along with any recording and the notes our panel takes during it.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-teal mt-1 shrink-0">&mdash;</span>
                <span>
                  <span className="text-ink font-medium">Lifestyle and routine information.</span> The
                  answers you give us about your skincare, grooming, habits, goals and history.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-teal mt-1 shrink-0">&mdash;</span>
                <span>
                  <span className="text-ink font-medium">Contact and account details.</span> Your name,
                  email and phone number, so we can reach you and manage your case.
                </span>
              </li>
            </ul>
          </section>

          {/* 2 */}
          <section className="pt-6">
            <h2 className="text-heading-3 font-medium text-ink mb-3">Why we collect it</h2>
            <p>
              There is one reason: to create your Face Map. Your photos, session and answers are used
              to analyse your appearance and put together a plan that is specific to you. We do not
              sell your data. We do not use it to train anything unrelated to your case. It is there to
              do the job you came to us for, and nothing else.
            </p>
          </section>

          {/* 3 */}
          <section className="pt-6">
            <h2 className="text-heading-3 font-medium text-ink mb-3">Consent, kept separate</h2>
            <p className="mb-4">
              We treat two things as completely separate, and we never blur them:
            </p>
            <ul className="space-y-3 pl-0 list-none">
              <li className="flex gap-3">
                <span className="text-teal mt-1 shrink-0">&mdash;</span>
                <span>
                  <span className="text-ink font-medium">Service consent.</span> When you sign up, you
                  agree that our experts can use your photos, session and answers to build your Face
                  Map. That is the only thing this consent covers.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-teal mt-1 shrink-0">&mdash;</span>
                <span>
                  <span className="text-ink font-medium">Marketing consent.</span> Using your face
                  images or your Face Map in anything public &mdash; a website, a case study, social
                  media, an advert &mdash; is a different question, and it is entirely optional.
                </span>
              </li>
            </ul>
            <p className="mt-4">
              To be absolutely clear: we will <span className="text-ink font-medium">never</span> use
              your face images or your Face Map in any marketing without your explicit written
              permission. Saying yes to the service does not mean saying yes to being featured. Declining
              marketing changes nothing about the service you receive.
            </p>
          </section>

          {/* 4 */}
          <section className="pt-6">
            <h2 className="text-heading-3 font-medium text-ink mb-3">Storage and who can see your case</h2>
            <p className="mb-4">
              Access to your case is controlled and limited. Only the relevant experts and panel members
              working on your Face Map can see your photos, session and answers &mdash; not the wider team,
              and not anyone outside MapMyFace.
            </p>
            <p className="mb-4">
              Your data is held in secure, access-controlled storage. We keep it only for as long as we
              need it to deliver and support your Face Map, plus a defined retention period after that.
              Once that period is over, or once you ask us to remove it, it is deleted.
            </p>
            <p>
              We do use trusted third parties for narrow, practical jobs &mdash; secure hosting, payments
              through Razorpay, and OTP verification. They handle only what their task requires and are
              bound to keep it confidential.
            </p>
          </section>

          {/* 5 */}
          <section className="pt-6">
            <h2 className="text-heading-3 font-medium text-ink mb-3">Your rights</h2>
            <p>
              It is your data, and you stay in control of it. You can ask us to delete your photos,
              session and personal information at any time, and we will. You can ask what we hold, correct
              anything that is wrong, or withdraw a consent you gave earlier &mdash; including marketing
              permission. If anything here is unclear, just ask. Email{' '}
              <a href="mailto:support@mapmyface.com" className="text-teal hover:underline">
                support@mapmyface.com
              </a>{' '}
              and a real person will help.
            </p>
          </section>

          {/* 6 */}
          <section className="pt-6">
            <h2 className="text-heading-3 font-medium text-ink mb-3">What MapMyFace is &mdash; and isn&rsquo;t</h2>
            <p>
              MapMyFace offers non-surgical appearance guidance. We help you understand your features and
              give you a plan you can act on. We do not provide medical diagnosis or treatment, and we do
              not recommend or perform surgery &mdash; zero surgery, ever. If something you tell us points
              to a medical concern, we will suggest you see a qualified clinician. Our guidance is a
              starting point for looking after yourself, not a substitute for professional medical advice.
            </p>
          </section>

          {/* 7 */}
          <section className="pt-6">
            <h2 className="text-heading-3 font-medium text-ink mb-3">Contact</h2>
            <p>
              Questions about your privacy, your data, or anything on this page? Email us at{' '}
              <a href="mailto:support@mapmyface.com" className="text-teal hover:underline">
                support@mapmyface.com
              </a>
              . We would rather you ask than wonder.
            </p>
          </section>

          <p className="pt-8 border-t border-ink/10 text-[14px] text-analysis-teal">
            Last updated: 2026. If we make meaningful changes to how we handle your data, we will update
            this page and, where it matters, let you know directly.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
