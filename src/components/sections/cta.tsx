'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function CTA() {
  return (
    <section className="py-24 md:py-32 bg-ink">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-[12px] text-teal uppercase tracking-[0.15em] mb-4">
            Get started today
          </p>
          <h2 className="text-[1.75rem] md:text-[2.5rem] leading-[1.15] tracking-[-0.02em] text-ivory mb-10" style={{ fontWeight: 450 }}>
            You do not need more random advice. You need to know what suits you.
          </h2>

          <Link
            href="/form"
            className="inline-flex items-center justify-center h-14 px-9 bg-ivory text-ink text-[15px] font-semibold rounded-full hover:bg-mist transition-colors duration-300 ease-smooth group"
          >
            Start My Face Map
            <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2} />
          </Link>

          <p className="mt-5 text-[13px] text-analysis-teal">
            No commitment required.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
