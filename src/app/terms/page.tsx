'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-[14px] text-analysis-teal hover:text-ink mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <h1 className="text-[2rem] font-medium text-ink mb-8">Terms of Service</h1>

        <div className="prose max-w-none text-[15px] text-ink/70 leading-relaxed space-y-6">
          <p className="text-analysis-teal">Last updated: July 2026</p>

          <h2 className="text-[18px] font-medium text-ink mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>By accessing and using {SITE_CONFIG.name}, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>

          <h2 className="text-[18px] font-medium text-ink mt-8 mb-4">2. Description of Service</h2>
          <p>{SITE_CONFIG.name} provides expert-led, personalised facial analysis. Our service includes a live Face Mapping Session with a qualified expert who reviews your face one-on-one, followed by a personalised Face Map with recommendations across skincare, grooming, styling and, where relevant, facial-training technique.</p>

          <h2 className="text-[18px] font-medium text-ink mt-8 mb-4">3. User Responsibilities</h2>
          <p>You agree to provide accurate information during registration and to use the service only for personal, non-commercial purposes. As part of the session you consent to share photographs and video of your face for the purpose of your analysis, as described in our <Link href="/privacy" className="text-accent underline">Privacy Policy</Link>. You are responsible for maintaining the confidentiality of your account.</p>

          <h2 className="text-[18px] font-medium text-ink mt-8 mb-4">4. Payment Terms</h2>
          <p>Your Face Map is a one-time purchase. All payments are processed securely through Razorpay. Prices are listed in Indian Rupees (INR) and include applicable taxes.</p>

          <h2 className="text-[18px] font-medium text-ink mt-8 mb-4">5. Intellectual Property</h2>
          <p>All content on this site, including images, graphics and text, is owned by {SITE_CONFIG.name} and protected by copyright laws. Your personalised Face Map is provided for your own personal use. You may not reproduce or distribute our content without permission.</p>

          <h2 className="text-[18px] font-medium text-ink mt-8 mb-4">6. Disclaimer</h2>
          <p>Results may vary from person to person. {SITE_CONFIG.name} provides guidance on appearance, skincare and grooming, and does not guarantee specific outcomes. Our recommendations are not medical advice, diagnosis or treatment. For any medical concern, please consult a qualified healthcare professional.</p>

          <h2 className="text-[18px] font-medium text-ink mt-8 mb-4">7. Contact</h2>
          <p>For questions about these terms, contact us at {SITE_CONFIG.email}</p>
        </div>
      </div>
    </div>
  )
}
