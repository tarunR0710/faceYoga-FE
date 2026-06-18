'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Shield, Clock, CheckCircle } from 'lucide-react'
import { LeadForm } from '@/components/forms/lead-form'
import { SITE_CONFIG } from '@/lib/constants'

export default function FormPage() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <header className="border-b border-[#eee] bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-[#888] hover:text-[#111] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-[13px]">Back</span>
            </Link>
            <Link
              href="/"
              className="text-[17px] text-[#111]"
              style={{ fontWeight: 500 }}
            >
              {SITE_CONFIG.name}
            </Link>
            <div className="w-16" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          {/* Card */}
          <div
            className="rounded-2xl p-8 lg:p-10"
            style={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(250,250,250,0.95) 100%)',
              border: '1px solid #eee',
              backdropFilter: 'blur(10px)',
            }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-[1.5rem] md:text-[1.75rem] leading-[1.15] tracking-[-0.02em] text-[#111] mb-2"
                style={{ fontWeight: 450 }}
              >
                Start Your Journey
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-[14px] text-[#666]"
              >
                Enter your details to get your personalized plan
              </motion.p>
            </div>

            {/* Form */}
            <LeadForm />
          </div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-5 text-[12px] text-[#999]"
          >
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-500" />
              <span>Takes 2 minutes</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>No spam, ever</span>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}
