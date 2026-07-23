'use client'

import { motion } from 'framer-motion'

const contextTags = [
  'Face',
  'Skin',
  'Routine',
  'Products',
  'Lifestyle',
  'Climate',
  'Travel',
  'Goals',
  'Budget',
  'Preferences',
]

const layers = [
  {
    title: 'Face architecture',
    description: 'We start with the shape and proportions of your face, exactly as they are today.',
  },
  {
    title: 'Skin & surface',
    description: 'Texture, tone and how your skin behaves across the seasons all inform what we suggest.',
  },
  {
    title: 'Routine & products',
    description: 'What you already use and how much time you have shapes what fits into your day.',
  },
  {
    title: 'Lifestyle & environment',
    description: 'Sleep, stress, climate and travel are part of the picture, not an afterthought.',
  },
  {
    title: 'Goals & preferences',
    description: 'We build around what you actually want, within the budget and effort you have in mind.',
  },
]

export function PersonalizationFactors() {
  return (
    <section id="human-difference" className="section bg-ivory">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-10 md:mb-14"
        >
          <p className="text-[12px] text-analysis-teal uppercase tracking-[0.15em] mb-3">
            The human difference
          </p>
          <h2
            className="text-[1.75rem] md:text-[2.25rem] lg:text-[2.5rem] leading-[1.15] tracking-[-0.02em] text-ink"
            style={{ fontWeight: 450 }}
          >
            Your face is more than measurements.
          </h2>
          <p className="mt-5 text-[16px] md:text-[17px] leading-relaxed text-ink/78">
            Before recommending anything, we understand the routines and realities behind what we
            see. Built from your life, not just your likeness.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="mb-10 md:mb-14 flex flex-wrap gap-2.5"
        >
          {contextTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-mist px-4 py-1.5 text-[13px] text-ink"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {layers.map((layer, i) => (
            <motion.div
              key={layer.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group rounded-[22px] p-6 bg-white border border-ink/10 transition-all duration-200 hover:shadow-[0_18px_30px_-24px_rgba(21,36,33,0.35)] hover:-translate-y-0.5"
            >
              <div className="w-11 h-11 rounded-2xl bg-mist flex items-center justify-center mb-5">
                <span className="block w-4 h-4 rounded-full border-[1.5px] border-analysis-teal" />
              </div>
              <h3 className="text-[16px] font-medium text-ink mb-2 tracking-[-0.01em]">
                {layer.title}
              </h3>
              <p className="text-[14px] text-ink/78 leading-relaxed">{layer.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
