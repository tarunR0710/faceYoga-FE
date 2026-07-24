'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Check,
  ArrowRight,
  PhoneCall,
  Video,
  Users,
  FileText,
  MessageCircle,
} from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

const STEPS = [
  {
    icon: PhoneCall,
    title: 'We call to welcome you',
    body: 'A real person rings to say hello and help you book your Face Mapping Session at a time that suits you.',
  },
  {
    icon: Video,
    title: 'You meet an expert, live',
    body: 'A one-to-one session with a real specialist, 45 to 60 minutes, on video. No forms, no bots.',
  },
  {
    icon: Users,
    title: 'Our expert panel reviews your case',
    body: 'Your session is looked over carefully by our panel so nothing important is missed.',
  },
  {
    icon: FileText,
    title: 'Your Face Map arrives',
    body: 'You receive your Face Map and Appearance Protocol in 2 to 4 working days, written just for you.',
  },
  {
    icon: MessageCircle,
    title: 'Ask a real person, anytime',
    body: "Whenever something feels unclear, message us. You'll always reach a human, not a chatbot.",
  },
]

export default function SuccessPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Clear checkout data
    sessionStorage.removeItem('checkoutData')
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl w-full"
      >
        {/* Confirmation badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-16 h-16 mx-auto rounded-full bg-teal flex items-center justify-center mb-6 shadow-sm"
        >
          <Check className="w-8 h-8 text-white" strokeWidth={2.5} />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-3"
        >
          <p className="text-body-sm font-medium tracking-wide uppercase text-teal mb-3">
            Payment received
          </p>
          <h1
            className="text-heading-2 md:text-heading-1 text-ink mb-4"
            style={{ fontWeight: 550 }}
          >
            You&rsquo;re in &mdash; welcome to {SITE_CONFIG.name}
          </h1>
          <p className="text-body text-analysis-teal leading-relaxed max-w-md mx-auto">
            Thank you. Your place is confirmed and there&rsquo;s nothing more you
            need to do right now &mdash; we&rsquo;ll take it from here.
          </p>
        </motion.div>

        {/* Check email / WhatsApp note */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-accent-soft rounded-lg px-5 py-4 mt-6 mb-10 text-center"
        >
          <p className="text-body-sm text-ink leading-relaxed">
            Please check your email and WhatsApp &mdash; a confirmation is on its
            way, and we&rsquo;ll use those to reach you next.
          </p>
        </motion.div>

        {/* What happens next */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl border border-ink/10 p-6 md:p-8 shadow-sm mb-10"
        >
          <h2 className="text-heading-3 text-ink mb-6" style={{ fontWeight: 550 }}>
            What happens next
          </h2>

          <ol className="space-y-6">
            {STEPS.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.li
                  key={step.title}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55 + i * 0.08 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-accent-soft flex items-center justify-center">
                      <Icon className="w-[18px] h-[18px] text-teal" strokeWidth={2} />
                    </div>
                    {i < STEPS.length - 1 && (
                      <span className="w-px flex-1 bg-ink/10 mt-2" aria-hidden />
                    )}
                  </div>
                  <div className="pb-1">
                    <h3
                      className="text-body text-ink mb-1"
                      style={{ fontWeight: 550 }}
                    >
                      <span className="text-teal mr-1.5">{i + 1}.</span>
                      {step.title}
                    </h3>
                    <p className="text-body-sm text-analysis-teal leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                </motion.li>
              )
            })}
          </ol>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center h-12 px-8 bg-teal text-white text-body-sm font-medium rounded-full shadow-sm hover:shadow-md transition-shadow group"
          >
            Back to home
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <p className="text-body-sm text-analysis-teal mt-6">
            Something on your mind?{' '}
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="text-ink hover:text-teal transition-colors underline underline-offset-2"
            >
              {SITE_CONFIG.email}
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
