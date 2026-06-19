'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-[14px] text-[#666] hover:text-[#111] mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <h1 className="text-[2rem] font-medium text-[#111] mb-8">Terms of Service</h1>

        <div className="prose prose-gray max-w-none text-[15px] text-[#555] leading-relaxed space-y-6">
          <p>Last updated: June 2026</p>

          <h2 className="text-[18px] font-medium text-[#111] mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>By accessing and using FaceYoga, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>

          <h2 className="text-[18px] font-medium text-[#111] mt-8 mb-4">2. Description of Service</h2>
          <p>FaceYoga provides personalized facial analysis and face yoga exercise programs. Our service includes video tutorials, progress tracking, and personalized recommendations.</p>

          <h2 className="text-[18px] font-medium text-[#111] mt-8 mb-4">3. User Responsibilities</h2>
          <p>You agree to provide accurate information during registration and to use the service only for personal, non-commercial purposes. You are responsible for maintaining the confidentiality of your account.</p>

          <h2 className="text-[18px] font-medium text-[#111] mt-8 mb-4">4. Payment Terms</h2>
          <p>All payments are processed securely through Razorpay. Prices are listed in Indian Rupees (INR) and include applicable taxes.</p>

          <h2 className="text-[18px] font-medium text-[#111] mt-8 mb-4">5. Intellectual Property</h2>
          <p>All content, including videos, images, and text, is owned by FaceYoga and protected by copyright laws. You may not reproduce or distribute any content without permission.</p>

          <h2 className="text-[18px] font-medium text-[#111] mt-8 mb-4">6. Disclaimer</h2>
          <p>Results may vary. FaceYoga does not guarantee specific outcomes. Our exercises are not a substitute for medical advice or treatment.</p>

          <h2 className="text-[18px] font-medium text-[#111] mt-8 mb-4">7. Contact</h2>
          <p>For questions about these terms, contact us at support@faceyoga.com</p>
        </div>
      </div>
    </div>
  )
}
