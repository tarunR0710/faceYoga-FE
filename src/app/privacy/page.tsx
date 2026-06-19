'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-[14px] text-[#666] hover:text-[#111] mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <h1 className="text-[2rem] font-medium text-[#111] mb-8">Privacy Policy</h1>

        <div className="prose prose-gray max-w-none text-[15px] text-[#555] leading-relaxed space-y-6">
          <p>Last updated: June 2026</p>

          <h2 className="text-[18px] font-medium text-[#111] mt-8 mb-4">1. Information We Collect</h2>
          <p>We collect information you provide directly, including name, email, phone number, and payment information when you purchase our services.</p>

          <h2 className="text-[18px] font-medium text-[#111] mt-8 mb-4">2. How We Use Your Information</h2>
          <p>We use your information to provide and improve our services, process payments, send important updates, and personalize your experience.</p>

          <h2 className="text-[18px] font-medium text-[#111] mt-8 mb-4">3. Data Security</h2>
          <p>We implement industry-standard security measures to protect your data. Payment information is processed securely through Razorpay and is never stored on our servers.</p>

          <h2 className="text-[18px] font-medium text-[#111] mt-8 mb-4">4. Third-Party Services</h2>
          <p>We use third-party services including Razorpay for payments, MSG91 for OTP verification, and analytics tools. These services have their own privacy policies.</p>

          <h2 className="text-[18px] font-medium text-[#111] mt-8 mb-4">5. Cookies</h2>
          <p>We use cookies to improve your experience and analyze site usage. You can disable cookies in your browser settings.</p>

          <h2 className="text-[18px] font-medium text-[#111] mt-8 mb-4">6. Your Rights</h2>
          <p>You have the right to access, update, or delete your personal information. Contact us to exercise these rights.</p>

          <h2 className="text-[18px] font-medium text-[#111] mt-8 mb-4">7. Contact</h2>
          <p>For privacy-related questions, contact us at support@faceyoga.com</p>
        </div>
      </div>
    </div>
  )
}
