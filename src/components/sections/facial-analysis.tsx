'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export function FacialAnalysis() {
  return (
    <section
      className="relative pt-16 md:pt-24 pb-0 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #8a8580 0%, #6b6560 50%, #5a5550 100%)',
      }}
    >
      <div className="container-main relative z-10">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-1"
        >
          {/* Label - Glass Pill */}
          <span
            className="inline-block text-[10px] md:text-[11px] font-medium tracking-[0.2em] text-white/80 uppercase mb-4 px-4 py-2 rounded-full"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
            }}
          >
            Personalized Analysis
          </span>

          {/* Headline */}
          <h2
            className="text-[1.75rem] md:text-[2.25rem] lg:text-[2.75rem] leading-[1.15] tracking-[-0.02em] text-white mb-4"
            style={{ fontWeight: 450 }}
          >
            Your Personalized <span className="text-white/50">Facial Analysis</span>
          </h2>

          {/* Description */}
          <p className="text-[14px] md:text-[15px] text-white/60 leading-relaxed max-w-lg mx-auto">
            Every face is unique. Our analysis uncovers the key features, proportions, and characteristics that shape your appearance.
          </p>
        </motion.div>

        {/* Woman Image with Gradient Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative w-full max-w-md mx-auto -mb-1"
        >
          {/* Radial gradient glow behind the image */}
          <div
            className="absolute inset-0 z-0"
            style={{
              background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255, 200, 180, 0.35) 0%, rgba(255, 180, 150, 0.2) 30%, transparent 70%)',
              filter: 'blur(40px)',
              transform: 'scale(1.3)',
            }}
          />
          <div className="relative aspect-[3/4] z-10">
            <Image
              src="/woman-analysis.png"
              alt="Facial analysis demonstration"
              fill
              className="object-contain object-bottom"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
