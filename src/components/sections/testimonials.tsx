'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    quote:
      'Having an actual doctor look at my face and answer my questions changed everything. The cheek and jaw exercises made a visible difference in about six weeks.',
    name: 'Ananya K.',
    detail: 'Bengaluru · 8 weeks in',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face',
  },
  {
    quote:
      'My doctor pinpointed my under-eye area as my biggest opportunity and gave me exercises specific to it — that is exactly where I saw the fastest change.',
    name: 'Rohan M.',
    detail: 'Mumbai · 3 months in',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&crop=face',
  },
  {
    quote:
      'For the price this is genuinely worth it. Clear plan, short daily routine, and I can actually see my progress scores going up each month.',
    name: 'Priya S.',
    detail: 'Delhi · 5 months in',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=face',
  },
]

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
      ))}
    </div>
  )
}

export function Testimonials() {
  return (
    <section className="section bg-white">
      <div className="container-main">
        {/* rating summary band */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-12"
        >
          <div className="max-w-xl">
            <p className="text-[12px] text-[#999] uppercase tracking-[0.15em] mb-3">Loved by members</p>
            <h2 className="text-[1.75rem] md:text-[2.25rem] lg:text-[2.5rem] leading-[1.15] tracking-[-0.02em] text-[#111]" style={{ fontWeight: 450 }}>
              People who stopped guessing
            </h2>
          </div>
          <div className="flex items-center gap-5">
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end mb-1">
                <span className="text-[28px] leading-none text-[#111]" style={{ fontWeight: 450 }}>4.9</span>
                <Stars />
              </div>
              <p className="text-[12px] text-[#999]">from 12,000+ reviews</p>
            </div>
          </div>
        </motion.div>

        {/* large quote cards */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col rounded-2xl bg-[#fafafa] border border-[#f0f0f0] p-6 md:p-7"
            >
              <Stars />
              <blockquote className="text-[15px] md:text-[16px] text-[#333] leading-relaxed mt-4 mb-6 flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="flex items-center gap-3 pt-5 border-t border-[#ececec]">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#eee] flex-shrink-0">
                  <Image src={t.image} alt={t.name} fill sizes="40px" className="object-cover" />
                </div>
                <div>
                  <p className="text-[14px] font-medium text-[#111]">{t.name}</p>
                  <p className="text-[12px] text-[#999]">{t.detail}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
