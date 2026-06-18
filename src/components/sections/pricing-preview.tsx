'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'

const features = [
  'Comprehensive facial analysis',
  'Personalized face yoga routine',
  '160+ exercise video tutorials',
  'Progress tracking tools',
  'Before-and-after visualizations',
  'Direct access to support team',
  'Annual updates and re-analysis',
]

export function PricingPreview() {
  return (
    <section id="pricing" className="section bg-white">
      <div className="container-narrow">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-[12px] text-[#999] uppercase tracking-[0.1em] mb-3">
            Pricing
          </p>
          <h2 className="text-[1.75rem] md:text-[2.25rem] leading-[1.15] tracking-[-0.02em] text-[#111] mb-4" style={{ fontWeight: 450 }}>
            Start your transformation
          </h2>
          <p className="text-[15px] md:text-base text-[#666] leading-relaxed">
            What could cost thousands at a clinic is available for a fraction of the price
          </p>
        </motion.div>

        {/* Pricing Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto"
        >
          <div className="bg-white rounded-xl border border-[#eee] p-6 md:p-8">
            {/* Price */}
            <div className="text-center mb-6 pb-6 border-b border-[#eee]">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-medium mb-4">
                Best Value
              </div>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-[2.5rem] md:text-[3rem] font-medium text-[#111] tracking-tight">₹1,999</span>
                <span className="text-[14px] text-[#999]">/ year</span>
              </div>
              <p className="text-[13px] text-[#888] mt-2">
                One-time payment, lifetime access
              </p>
            </div>

            {/* Features */}
            <div className="mb-6">
              <p className="text-[12px] text-[#999] uppercase tracking-[0.05em] mb-4">What's included</p>
              <ul className="space-y-2.5">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-emerald-600" strokeWidth={2} />
                    </div>
                    <span className="text-[14px] text-[#555]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <Link
              href="/form"
              className="w-full h-12 inline-flex items-center justify-center bg-[#111] text-white text-[14px] font-medium rounded-lg hover:bg-[#222] transition-colors duration-150 group"
            >
              Get Access
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
            </Link>

            {/* Trust */}
            <div className="mt-5 flex items-center justify-center gap-4 text-[11px] text-[#999]">
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Secure payment
              </span>
              <span>14-day guarantee</span>
            </div>
          </div>
        </motion.div>

        {/* Payment methods */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-[11px] text-[#bbb] mb-3">Accepted payments</p>
          <div className="flex items-center justify-center gap-3">
            {['Visa', 'Mastercard', 'UPI', 'Net Banking'].map((method) => (
              <span key={method} className="h-6 px-2.5 bg-[#f5f5f5] rounded text-[11px] text-[#888] flex items-center">
                {method}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
