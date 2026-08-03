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

        {/* Core plan card - new layout */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="max-w-md mx-auto"
        >
          <div className="rounded-[24px] bg-white border border-border-soft shadow-lg shadow-[rgba(105,180,255,0.08)]">
            {/* Top section - gradient with price & CTA - inset with own rounded corners */}
            <div className="p-3 md:p-4">
              <div
                className="relative rounded-[18px] p-6 md:p-8 overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(107,233,255,0.22) 0%, rgba(105,180,255,0.28) 50%, rgba(140,236,255,0.22) 100%)'
                }}
              >
                {/* Decorative circles - positioned absolutely */}
                <div className="absolute top-0 right-0 w-28 h-28 -translate-y-1/3 translate-x-1/3 pointer-events-none">
                  <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                    <circle cx="50" cy="50" r="45" stroke="#69B4FF" strokeWidth="1" opacity="0.3" />
                    <circle cx="50" cy="50" r="28" stroke="#6BE9FF" strokeWidth="1" opacity="0.35" />
                  </svg>
                </div>
                <div className="absolute bottom-0 left-0 w-20 h-20 translate-y-1/3 -translate-x-1/3 pointer-events-none">
                  <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                    <circle cx="50" cy="50" r="40" stroke="#69B4FF" strokeWidth="1" opacity="0.25" />
                  </svg>
                </div>
                <div className="absolute top-5 left-5 w-2 h-2 rounded-full bg-[#69B4FF]/35 pointer-events-none" />
                <div className="absolute bottom-6 right-10 w-1.5 h-1.5 rounded-full bg-[#8CECFF]/45 pointer-events-none" />

                <div className="relative z-10 text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-soft text-ink text-[11px] font-medium mb-4">
                  {FACE_MAP_CORE.name}
                </div>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-[2.75rem] md:text-[3rem] text-ink tracking-tight" style={{ fontWeight: 500 }}>{FACE_MAP_CORE.priceDisplay}</span>
                </div>
                <p className="text-[13px] text-analysis-teal mt-1 mb-6">One payment. No subscription.</p>

                {/* CTA */}
                <Link href="/form" className="btn-primary group w-full">
                  Start My Face Map
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2} />
                </Link>
              </div>
              </div>
            </div>

            {/* Bottom section - clean white with features */}
            <div className="px-6 md:px-8 pb-6 md:pb-8">
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

              {/* Trust */}
              <div className="mt-5 pt-5 border-t border-ink/7 flex items-center justify-center gap-4 text-[11px] text-analysis-teal">
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Secure payment
                </span>
                <span>0 surgery, ever</span>
              </div>
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
