'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function CTA() {
  return (
    <section className="py-20 bg-white">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-[12px] text-[#999] uppercase tracking-[0.15em] mb-3">
            Get started today
          </p>
          <h2 className="text-[1.75rem] md:text-[2.25rem] leading-[1.15] tracking-[-0.02em] text-[#111] mb-4" style={{ fontWeight: 450 }}>
            Ready to transform your face?
          </h2>
          <p className="text-[15px] md:text-[17px] text-[#666] leading-relaxed mb-8">
            Join 50,000+ people who have discovered the power of personalized face yoga.
          </p>

          <Link
            href="/form"
            className="inline-flex items-center justify-center h-12 px-8 bg-[#111] text-white text-[15px] font-medium rounded-full hover:bg-[#222] transition-all duration-200 group"
          >
            Start my plan
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
          </Link>

          <p className="mt-4 text-[13px] text-[#999]">
            No commitment required. 14-day money-back guarantee.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
