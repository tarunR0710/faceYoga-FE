'use client'

import { motion } from 'framer-motion'

const oldWay = [
  'Fixate on one feature',
  'Visit a clinic',
  'No assessment',
  'Unnecessary procedures',
  'Poor results',
]

const newWay = [
  'Consider your face holistically',
  'Personalized face yoga analysis',
  'See your future self',
  'Personalized protocol',
  'Real results',
]

export function OldVsNew() {
  return (
    <section className="pt-6 md:pt-10 pb-12 md:pb-16 bg-white">
      <div className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <p className="text-[14px] md:text-[15px] text-black/40 leading-relaxed mb-10">
            The beauty industry is broken, with companies and influencers giving "one size fits all" advice, and many people undergoing unnecessary procedures they don't need.
          </p>
          <h2 className="text-[1.75rem] md:text-[2.25rem] leading-[1.15] tracking-[-0.02em] text-[#111]" style={{ fontWeight: 450 }}>
            A Natural Way to <span className="text-black/30">Glow Up</span>
          </h2>
        </motion.div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Old Way */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl p-6 md:p-8 bg-[#fafafa] border border-[#f0f0f0]"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-black/20" />
              </div>
              <h3 className="text-[15px] font-medium text-[#111]">The old way</h3>
            </div>
            <div className="space-y-4">
              {oldWay.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <span className="text-[10px] font-medium text-black/30 tracking-wider mt-1">
                    STEP {index + 1}
                  </span>
                  <span className="text-[14px] text-black/50">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* New Way - Gradient Glass Effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl p-6 md:p-8 relative overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, rgba(255, 220, 200, 0.4) 0%, rgba(255, 255, 255, 0.9) 40%, #ffffff 100%)',
              border: '1px solid rgba(255, 200, 180, 0.3)',
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-100 to-pink-100 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-gradient-to-br from-orange-300 to-pink-300" />
              </div>
              <h3 className="text-[15px] font-medium text-[#111]">The new way</h3>
            </div>
            <div className="space-y-4">
              {newWay.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <span className="text-[10px] font-medium text-black/30 tracking-wider mt-1">
                    STEP {index + 1}
                  </span>
                  <span className="text-[14px] text-black/60">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
