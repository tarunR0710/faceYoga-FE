'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Check, ArrowRight, Lock, ShieldCheck, BadgeCheck } from 'lucide-react'
import { FACE_MAP_CORE } from '@/lib/constants'

const ease = [0.22, 1, 0.36, 1] as const

const TRUST = [
  { icon: Lock, label: 'Secure payment' },
  { icon: ShieldCheck, label: 'Surgery-free, ever' },
  { icon: BadgeCheck, label: 'One-time — no subscription' },
]

const PAYMENTS = ['Visa', 'Mastercard', 'UPI', 'Net Banking']

export function PricingPreview() {
  const reduce = useReducedMotion()
  const rise = (y = 16) => ({
    initial: { opacity: 0, y: reduce ? 0 : y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
  })

  return (
    <section id="pricing" className="section bg-glow-bl">
      <div className="container-narrow">
        {/* Header */}
        <motion.div
          {...rise()}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-10 md:mb-12"
        >
          <p className="text-[12px] text-analysis-teal uppercase tracking-[0.15em] mb-3">
            Pricing
          </p>
          <h2
            className="text-[1.75rem] md:text-[2.5rem] leading-[1.12] tracking-[-0.02em] text-ink"
            style={{ fontWeight: 400 }}
          >
            One map, made for your face.{' '}
            <span className="text-ink/40">One price to match.</span>
          </h2>
        </motion.div>

        {/* Inverted dark panel — the hero moment of the page */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="pricing-panel relative overflow-hidden rounded-[28px] p-6 sm:p-8 md:p-12"
        >
          <div className="relative grid md:grid-cols-2 gap-8 md:gap-0">
            {/* Left — offer, price, CTA, trust */}
            <div className="md:pr-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal/15 border border-teal/25 text-teal text-[11px] font-medium tracking-wide mb-5">
                {FACE_MAP_CORE.label}
              </div>

              <p className="text-[14px] text-ivory/60 mb-1">{FACE_MAP_CORE.name}</p>
              <div className="flex items-baseline gap-2">
                <span
                  className="text-[3rem] md:text-[3.5rem] leading-none text-ivory tracking-tight"
                  style={{ fontWeight: 500 }}
                >
                  {FACE_MAP_CORE.priceDisplay}
                </span>
                <span className="text-[13px] text-ivory/50">one-time</span>
              </div>

              {/* Honest value anchor — no invented numbers */}
              <p className="text-[13px] text-ivory/60 leading-relaxed mt-4 max-w-xs">
                A single Face Map you keep for good — not a monthly plan you
                have to keep paying for, and never a push toward surgery.
              </p>

              {/* CTA */}
              <Link
                href="/form"
                className="group mt-7 w-full h-14 inline-flex items-center justify-center bg-ivory text-ink text-[15px] font-semibold rounded-full transition-colors duration-300 hover:bg-white"
              >
                Start My Face Map
                <ArrowRight
                  className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </Link>

              {/* Guarantee badge */}
              <div className="mt-4 flex items-center justify-center gap-2 text-[12px] text-ivory/70">
                <ShieldCheck className="w-4 h-4 text-teal" strokeWidth={1.5} />
                <span>7-day money-back guarantee</span>
              </div>
            </div>

            {/* Right — what's included */}
            <div className="md:pl-10 md:border-l border-t md:border-t-0 border-white/10 pt-8 md:pt-0">
              <p className="text-[12px] text-ivory/50 uppercase tracking-[0.12em] mb-5">
                What&apos;s included
              </p>
              <ul className="space-y-3.5">
                {FACE_MAP_CORE.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-teal/15 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-teal" strokeWidth={2} />
                    </span>
                    <span className="text-[14px] text-ivory/85 leading-snug">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer — trust signals + accepted payments */}
          <div className="relative mt-8 md:mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {TRUST.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 text-[12px] text-ivory/60"
                >
                  <Icon className="w-4 h-4 text-ivory/40" strokeWidth={1.5} />
                  {label}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-ivory/40 mr-1">Accepted</span>
              {PAYMENTS.map((method) => (
                <span
                  key={method}
                  className="h-6 px-2.5 rounded bg-white/10 text-[11px] text-ivory/70 flex items-center"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
