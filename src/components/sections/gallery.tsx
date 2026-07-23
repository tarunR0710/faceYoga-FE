'use client'

import { motion } from 'framer-motion'
import { ComparisonSlider } from '@/components/ui/comparison-slider'

const transformations = [
  {
    before: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=750&fit=crop&crop=face',
    after: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=750&fit=crop&crop=face',
    name: 'Ananya, 29',
    caption: 'Cheek lift + jawline · 10 weeks',
  },
  {
    before: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=750&fit=crop&crop=face',
    after: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=750&fit=crop&crop=face',
    name: 'Rohan, 34',
    caption: 'Under-eye + definition · 12 weeks',
  },
  {
    before: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=750&fit=crop&crop=face',
    after: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=750&fit=crop&crop=face',
    name: 'Priya, 41',
    caption: 'Firmness + symmetry · 16 weeks',
  },
  {
    before: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=750&fit=crop&crop=face',
    after: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=750&fit=crop&crop=face',
    name: 'Arjun, 27',
    caption: 'Jaw + neck taper · 8 weeks',
  },
  {
    before: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=750&fit=crop&crop=face',
    after: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&h=750&fit=crop&crop=face',
    name: 'Meera, 36',
    caption: 'Midface lift · 14 weeks',
  },
  {
    before: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=600&h=750&fit=crop&crop=face',
    after: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=750&fit=crop&crop=face',
    name: 'Kabir, 31',
    caption: 'Brow + cheek tone · 11 weeks',
  },
]

export function Gallery() {
  return (
    <section className="py-14 md:py-20 bg-[#fafafa]">
      <div className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-10 md:mb-12"
        >
          <p className="text-[12px] text-[#999] uppercase tracking-[0.15em] mb-3">
            Real results
          </p>
          <h2 className="text-[1.75rem] md:text-[2.25rem] lg:text-[2.5rem] leading-[1.15] tracking-[-0.02em] text-[#111] mb-4" style={{ fontWeight: 450 }}>
            Client transformations
          </h2>
          <p className="text-[15px] md:text-[17px] text-[#666] leading-relaxed">
            Drag the slider on any photo to compare. Real members, consistent practice.
          </p>
        </motion.div>

        {/* Responsive grid of large interactive before/after cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {transformations.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 3) * 0.08 }}
              className="group"
            >
              <div className="rounded-2xl overflow-hidden bg-white border border-[#eee] transition-all duration-200 group-hover:shadow-[0_24px_40px_-24px_rgba(0,0,0,0.25)] group-hover:-translate-y-0.5">
                <ComparisonSlider
                  beforeImage={item.before}
                  afterImage={item.after}
                  beforeLabel="Before"
                  afterLabel="After"
                  className="!rounded-none !border-0"
                />
                <div className="flex items-center justify-between px-4 py-3.5">
                  <span className="text-[14px] font-medium text-[#111]">{item.name}</span>
                  <span className="text-[12px] text-[#999]">{item.caption}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[11px] text-[#bbb] mt-8"
        >
          *Results vary by individual. Images show projected outcomes based on consistent practice.
        </motion.p>
      </div>
    </section>
  )
}
