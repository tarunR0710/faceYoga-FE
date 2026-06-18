'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Mail, Clock, BookOpen } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

export default function SuccessPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Clear checkout data
    sessionStorage.removeItem('checkoutData')
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-16 h-16 mx-auto rounded-full bg-emerald-50 flex items-center justify-center mb-6"
        >
          <CheckCircle className="w-8 h-8 text-emerald-500" />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <h1
            className="text-[1.75rem] md:text-[2rem] leading-[1.15] tracking-[-0.02em] text-[#111] mb-3"
            style={{ fontWeight: 450 }}
          >
            Payment Successful
          </h1>
          <p className="text-[15px] text-[#666] leading-relaxed">
            Welcome to {SITE_CONFIG.name}. Your transformation journey begins now.
          </p>
        </motion.div>

        {/* What's Next Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl border border-[#eee] p-6 mb-8"
        >
          <h2
            className="text-[15px] text-[#111] mb-5"
            style={{ fontWeight: 500 }}
          >
            What happens next?
          </h2>

          <div className="space-y-5">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#f5f5f5] flex items-center justify-center">
                <Mail className="w-4 h-4 text-[#666]" />
              </div>
              <div>
                <h3 className="text-[14px] text-[#111] mb-0.5" style={{ fontWeight: 500 }}>
                  Check your email
                </h3>
                <p className="text-[13px] text-[#888] leading-relaxed">
                  We've sent a confirmation with your order details.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#f5f5f5] flex items-center justify-center">
                <Clock className="w-4 h-4 text-[#666]" />
              </div>
              <div>
                <h3 className="text-[14px] text-[#111] mb-0.5" style={{ fontWeight: 500 }}>
                  Analysis in progress
                </h3>
                <p className="text-[13px] text-[#888] leading-relaxed">
                  Your personalized plan will be ready within 24-48 hours.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#f5f5f5] flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-[#666]" />
              </div>
              <div>
                <h3 className="text-[14px] text-[#111] mb-0.5" style={{ fontWeight: 500 }}>
                  Start your journey
                </h3>
                <p className="text-[13px] text-[#888] leading-relaxed">
                  You'll receive video tutorials and tracking tools.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center h-12 px-8 bg-[#111] text-white text-[14px] font-medium rounded-full hover:bg-[#333] transition-colors group"
          >
            Back to Homepage
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <p className="text-[13px] text-[#999] mt-6">
            Questions?{' '}
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="text-[#666] hover:text-[#111] transition-colors"
            >
              {SITE_CONFIG.email}
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
