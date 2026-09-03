'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { REFUND_POLICY, SITE_CONFIG } from '@/lib/constants'

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-[14px] text-[#666] hover:text-[#111] mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <h1 className="text-[2rem] font-light text-[#111] mb-8">Refund Policy</h1>

        <div className="prose prose-gray max-w-none text-[15px] text-[#555] leading-relaxed space-y-6">
          <p>Last updated: August 2026</p>

          {/* One policy, in one place. This page previously promised a 14-day
              full refund while the payment page badged "7-day money-back" and
              excluded anyone who had "accessed more than 50% of the content" —
              a clause written for a video course that cannot be computed for a
              live consultation plus a bespoke report. Terms now read from
              REFUND_POLICY in lib/constants so the three surfaces cannot drift
              apart again. */}
          <h2 className="text-[18px] font-normal text-[#111] mt-8 mb-4">
            {REFUND_POLICY.headline}
          </h2>
          <p>{REFUND_POLICY.detail}</p>

          <h2 className="text-[18px] font-normal text-[#111] mt-8 mb-4">Rescheduling</h2>
          <p>{REFUND_POLICY.reschedule}</p>

          <h2 className="text-[18px] font-normal text-[#111] mt-8 mb-4">In short</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="font-medium text-[#111]">Before your Face Mapping Session:</strong>{' '}
              full refund, no questions asked.
            </li>
            <li>
              <strong className="font-medium text-[#111]">After your session:</strong> the expert
              review and your report are already underway, so the fee is not refundable — unless we
              fail to deliver your Face Map to the scope described on our homepage, in which case
              the report portion is refunded.
            </li>
            <li>
              <strong className="font-medium text-[#111]">If we cancel or miss your session:</strong>{' '}
              you choose a new slot or take a full refund.
            </li>
            <li>
              <strong className="font-medium text-[#111]">Duplicate payments:</strong> refunded in
              full — tell us and we will sort it.
            </li>
          </ul>

          <h2 className="text-[18px] font-normal text-[#111] mt-8 mb-4">How to request a refund</h2>
          <p>
            Email {SITE_CONFIG.email} from your registered email address with your order details.
            Refunds are processed within 5–7 business days to your original payment method.
          </p>

          <h2 className="text-[18px] font-normal text-[#111] mt-8 mb-4">Contact</h2>
          <p>For refund requests or questions, contact us at {SITE_CONFIG.email}</p>

        </div>
      </div>
    </div>
  )
}
