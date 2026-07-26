'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-[14px] text-analysis-teal hover:text-ink mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <h1 className="text-[2rem] font-medium text-ink mb-8">Refund Policy</h1>

        <div className="prose max-w-none text-[15px] text-ink/70 leading-relaxed space-y-6">
          <p className="text-analysis-teal">Last updated: July 2026</p>

          <h2 className="text-[18px] font-medium text-ink mt-8 mb-4">Before your session</h2>
          <p>If you change your mind before your Face Mapping Session takes place, you can request a full refund. Just reach out before your session is held and we&apos;ll process it, no questions asked.</p>

          <h2 className="text-[18px] font-medium text-ink mt-8 mb-4">After your session</h2>
          <p>Because your Face Map is a personalised service prepared specifically for you, purchases are non-refundable once your session has taken place or your Face Map has been delivered. If something went wrong with your session or your Face Map, contact us and we&apos;ll make it right.</p>

          <h2 className="text-[18px] font-medium text-ink mt-8 mb-4">How to request a refund</h2>
          <p>To request a refund, email us at {SITE_CONFIG.email} with your order details. Include your registered email address and the reason for your request.</p>

          <h2 className="text-[18px] font-medium text-ink mt-8 mb-4">Refund processing</h2>
          <p>Approved refunds are processed within 5–7 business days. The amount is credited back to your original payment method.</p>

          <h2 className="text-[18px] font-medium text-ink mt-8 mb-4">Non-refundable cases</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Requests made after your session has taken place or your Face Map has been delivered</li>
            <li>Missed appointments where no rescheduling request was made in advance</li>
            <li>Duplicate purchases (we&apos;ll help you cancel one instead)</li>
          </ul>

          <h2 className="text-[18px] font-medium text-ink mt-8 mb-4">Contact</h2>
          <p>For refund requests or questions, contact us at {SITE_CONFIG.email}</p>
        </div>
      </div>
    </div>
  )
}
