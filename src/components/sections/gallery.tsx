'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const transformations = [
  {
    before: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&h=400&fit=crop&crop=face',
    after: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=400&fit=crop&crop=face',
  },
  {
    before: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face',
    after: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop&crop=face',
  },
  {
    before: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop&crop=face',
    after: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop&crop=face',
  },
  {
    before: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop&crop=face',
    after: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=400&fit=crop&crop=face',
  },
  {
    before: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=400&fit=crop&crop=face',
    after: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&h=400&fit=crop&crop=face',
  },
]

export function Gallery() {
  return (
    <section className="py-20 bg-[#fafafa]">
      <div className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="text-[12px] text-[#999] uppercase tracking-[0.15em] mb-3">
            Real results
          </p>
          <h2 className="text-[1.75rem] md:text-[2.25rem] leading-[1.15] tracking-[-0.02em] text-[#111] mb-4" style={{ fontWeight: 450 }}>
            Client transformations
          </h2>
          <p className="text-[15px] md:text-[17px] text-[#666] leading-relaxed">
            See what's possible with consistent face yoga practice
          </p>
        </motion.div>

        {/* Gallery - Horizontal scroll on mobile */}
        <div className="overflow-x-auto pb-4 -mx-5 px-5 md:mx-0 md:px-0">
          <div className="flex md:grid md:grid-cols-5 gap-4 min-w-max md:min-w-0">
            {transformations.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="w-[140px] md:w-auto"
              >
                <div className="grid grid-cols-2 gap-1 rounded-xl overflow-hidden bg-white border border-[#eee]">
                  {/* Before */}
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={item.before}
                      alt="Before"
                      fill
                      sizes="(max-width: 768px) 70px, 100px"
                      className="object-cover"
                    />
                    <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-white/80 text-[9px] font-medium text-[#666]">
                      Before
                    </span>
                  </div>
                  {/* After */}
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={item.after}
                      alt="After"
                      fill
                      sizes="(max-width: 768px) 70px, 100px"
                      className="object-cover"
                    />
                    <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-emerald-500 text-[9px] font-medium text-white">
                      After
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
