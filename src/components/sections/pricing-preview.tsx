'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import { FACE_MAP_CORE } from '@/lib/constants'
import { EASE_OUT } from '@/lib/motion'

export function PricingPreview() {
  const reduce = useReducedMotion()
  return (
    <section id="pricing" className="section bg-glow-bl">
      <div className="container-narrow">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="text-center mb-10"
        >
          <p className="text-[12px] text-analysis-teal uppercase tracking-[0.14em] mb-3">
            Pricing
          </p>
          <h2 className="text-[1.75rem] md:text-[2.5rem] leading-[1.12] tracking-[-0.02em] text-ink" style={{ fontWeight: 400 }}>
            Your personal Face Map{' '}
            <span className="text-ink/40">starts here.</span>
          </h2>
        </motion.div>

        {/* Core plan card */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="max-w-md mx-auto"
        >
          <div className="card-glow rounded-[24px] border border-border-soft p-6 md:p-8">
            {/* Price */}
            <div className="text-center mb-6 pb-6 border-b border-border/70">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-soft text-ink text-[11px] font-medium mb-4">
                {FACE_MAP_CORE.name}
              </div>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-[2.75rem] md:text-[3rem] text-ink tracking-tight" style={{ fontWeight: 500 }}>{FACE_MAP_CORE.priceDisplay}</span>
              </div>
              <p className="text-[13px] text-analysis-teal mt-1">One payment. No subscription.</p>
            </div>

            {/* Includes */}
            <div className="mb-6">
              <p className="text-[12px] text-analysis-teal uppercase tracking-[0.08em] mb-4">What&apos;s included</p>
              <ul className="space-y-2.5">
                {FACE_MAP_CORE.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-mist flex items-center justify-center mt-0.5">
                      <Check className="w-3.5 h-3.5 text-teal" strokeWidth={2} />
                    </div>
                    <span className="text-[14px] text-ink/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <Link href="/form" className="btn-primary group w-full">
              Start My Face Map
              <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2} />
            </Link>

            {/* Trust */}
            <div className="mt-5 flex items-center justify-center gap-4 text-[11px] text-analysis-teal">
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Secure payment
              </span>
              <span>0 surgery, ever</span>
            </div>
          </div>
        </motion.div>

        {/* Payment methods */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="mt-8 text-center"
        >
          <p className="text-[11px] text-analysis-teal/70 mb-3">Accepted payments</p>
          <div className="flex items-center justify-center gap-3">
            {['Visa', 'Mastercard', 'UPI', 'Net Banking'].map((method) => (
              <span key={method} className="h-6 px-2.5 bg-mist rounded text-[11px] text-analysis-teal flex items-center">
                {method}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
