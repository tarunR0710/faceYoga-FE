'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-[14px] text-[#666] hover:text-[#111] mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <h1 className="text-[2rem] font-medium text-[#111] mb-8">Refund Policy</h1>

        <div className="prose prose-gray max-w-none text-[15px] text-[#555] leading-relaxed space-y-6">
          <p>Last updated: June 2026</p>

          <h2 className="text-[18px] font-medium text-[#111] mt-8 mb-4">14-Day Satisfaction Guarantee</h2>
          <p>We offer a 14-day satisfaction guarantee on all purchases. If you're not happy with your plan, you can request a full refund within 14 days of purchase.</p>

          <h2 className="text-[18px] font-medium text-[#111] mt-8 mb-4">How to Request a Refund</h2>
          <p>To request a refund, email us at support@faceyoga.com with your order details. Include your registered email address and reason for the refund.</p>

          <h2 className="text-[18px] font-medium text-[#111] mt-8 mb-4">Refund Processing</h2>
          <p>Refunds are processed within 5-7 business days. The amount will be credited back to your original payment method.</p>

          <h2 className="text-[18px] font-medium text-[#111] mt-8 mb-4">Non-Refundable Cases</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Requests made after 14 days of purchase</li>
            <li>If you have accessed more than 50% of the content</li>
            <li>Duplicate purchases (we'll help you cancel instead)</li>
          </ul>

          <h2 className="text-[18px] font-medium text-[#111] mt-8 mb-4">Contact</h2>
          <p>For refund requests or questions, contact us at support@faceyoga.com</p>
        </div>
      </div>
    </div>
  )
}
