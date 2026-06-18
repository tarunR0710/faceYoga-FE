'use client'

import { motion } from 'framer-motion'

const publications = [
  'USA Today',
  'The Guardian',
  'Daily Mail',
  'Business Insider',
  'Cosmopolitan',
  'GQ',
  'Wired',
  'New York Post',
]

export function SocialProof() {
  return (
    <section className="py-12 bg-white border-t border-[#f0f0f0]">
      <div className="container-main">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[12px] text-[#999] uppercase tracking-[0.15em] mb-8"
        >
          As featured in
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {publications.map((pub, index) => (
            <motion.span
              key={pub}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="text-[14px] md:text-[15px] font-semibold text-[#ccc] hover:text-[#999] transition-colors duration-200 cursor-default"
            >
              {pub}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}
