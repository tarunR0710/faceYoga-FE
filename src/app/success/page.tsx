'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { SITE_CONFIG, TIMINGS } from '@/lib/constants'

/**
 * The confirmation screen. The blueprint's rule: the customer should never
 * wonder what happens next — every step is explained before payment and
 * repeated here. Timings come from TIMINGS so this page and the FAQ agree.
 */
const STEPS = [
  {
    title: 'Onboarding',
    when: TIMINGS.onboardingShort,
    text: `A MapMyFace team member contacts you, ${TIMINGS.onboarding}, to explain the process, the consultation platform, preparation and next steps.`,
  },
  {
    title: 'Your Face Mapping Session',
    when: TIMINGS.scheduling,
    text: `A private live video session of ${TIMINGS.session}, scheduled according to availability. Keep your current products within reach.`,
  },
  {
    title: 'Expert Mapping Review',
    when: 'after the call',
    text: 'Your expert connects the findings, weighs them against your context and builds your Face Map.',
  },
  {
    title: 'Your Face Map arrives',
    when: TIMINGS.deliveryShort,
    text: `Standard delivery may take ${TIMINGS.deliveryShort} after your session. With Priority Delivery, the target is ${TIMINGS.priorityShort.replace(' target', '')} after your completed session and required inputs.`,
  },
  {
    title: 'Clarification call',
    when: 'included',
    text: 'If anything in your Face Map needs explaining, use the included short clarification call or video call.',
  },
]

export default function SuccessPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
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
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-16 h-16 mx-auto rounded-full bg-emerald-50 flex items-center justify-center mb-6"
        >
          <CheckCircle className="w-8 h-8 text-emerald-500" />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-center mb-8">
          <h1
            className="text-[1.75rem] md:text-[2rem] leading-[1.15] tracking-[-0.02em] text-[#111] mb-3"
            style={{ fontWeight: 300 }}
          >
            You’re booked in.
          </h1>
          <p className="text-[15px] text-[#666] leading-relaxed">
            Your Complete MapMyFace Plan is confirmed and a receipt is on its way to your email. Here is exactly what happens next.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl border border-[#eee] p-6 mb-8"
        >
          <h2 className="text-[15px] text-[#111] mb-5" style={{ fontWeight: 500 }}>
            From here to your Face Map
          </h2>
          <ol className="space-y-5">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[#f5f5f5] flex items-center justify-center font-mono text-[11px] text-[#666]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-[14px] text-[#111] mb-0.5" style={{ fontWeight: 500 }}>
                    {s.title} <span className="text-[12px] font-normal text-[#999]">· {s.when}</span>
                  </h3>
                  <p className="text-[13px] text-[#888] leading-relaxed">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center h-12 px-8 bg-[#111] text-white text-[14px] font-medium rounded-full hover:bg-[#333] transition-colors group"
          >
            Back to homepage
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <p className="text-[13px] text-[#999] mt-6">
            Need to reschedule or ask anything?{' '}
            <a href={`mailto:${SITE_CONFIG.email}`} className="text-[#666] hover:text-[#111] transition-colors">
              {SITE_CONFIG.email}
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
