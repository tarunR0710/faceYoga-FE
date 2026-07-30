'use client'

import { useMemo } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { Ruler, Droplet, SprayCan, Leaf, Target } from 'lucide-react'
import { EASE_OUT, EASE_OUT_SOFT } from '@/lib/motion'
import { Typewriter } from '@/components/ui/typewriter'

// Tags "bubble up" slowly, in a RANDOM order, one at a time: each rises +
// inflates from small with a soft spring, at its own randomised delay — so they
// surface like bubbles instead of a left-to-right sweep.
const tagContainer: Variants = { hidden: {}, show: {} }
const tagBubble: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.5 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    // Gentle, no-overshoot spring (Apple-smooth) — inflates up smoothly, no pop-bounce.
    transition: { delay, type: 'spring', stiffness: 80, damping: 26, mass: 1 },
  }),
}

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
    icon: Ruler,
    title: 'Face architecture',
    description: 'We start with the shape and proportions of your face, exactly as they are today.',
  },
  {
    icon: Droplet,
    title: 'Skin & surface',
    description: 'Texture, tone and how your skin behaves across the seasons all inform what we suggest.',
  },
  {
    icon: SprayCan,
    title: 'Routine & products',
    description: 'What you already use and how much time you have shapes what fits into your day.',
  },
  {
    icon: Leaf,
    title: 'Lifestyle & environment',
    description: 'Sleep, stress, climate and travel are part of the picture, not an afterthought.',
  },
  {
    icon: Target,
    title: 'Goals & preferences',
    description: 'We build around what you actually want, within the budget and effort you have in mind.',
  },
]

export function PersonalizationFactors() {
  const reduce = useReducedMotion()

  // A unique, randomly-ordered time slot per tag → slow, random, one-by-one.
  // 0.45s apart so ten tags surface over ~4.5s. Computed once on mount.
  const tagDelays = useMemo(() => {
    const slots = contextTags.map((_, i) => i * 0.45)
    for (let i = slots.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[slots[i], slots[j]] = [slots[j], slots[i]]
    }
    return slots
  }, [])

  return (
    <section id="human-difference" className="section bg-ivory">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_OUT_SOFT }}
          className="max-w-2xl mb-10 md:mb-14"
        >
          <p className="text-[12px] text-analysis-teal uppercase tracking-[0.15em] mb-3">
            The human difference
          </p>
          <h2
            className="text-[1.75rem] md:text-[2.25rem] lg:text-[2.5rem] leading-[1.15] tracking-[-0.02em] text-ink"
            style={{ fontWeight: 450 }}
          >
            <Typewriter text="Your face is more than measurements." speed={70} />
          </h2>
          <p className="mt-5 text-[16px] md:text-[17px] leading-relaxed text-ink/78">
            Before recommending anything, we understand the routines and realities behind what we
            see. Built from your life, not just your likeness.
          </p>
        </motion.div>

        <motion.div
          variants={reduce ? undefined : tagContainer}
          initial={reduce ? { opacity: 0 } : 'hidden'}
          whileInView={reduce ? { opacity: 1 } : 'show'}
          viewport={{ once: true, margin: '-60px' }}
          className="mb-10 md:mb-14 flex flex-wrap gap-2.5"
        >
          {contextTags.map((tag, i) => (
            <motion.span
              key={tag}
              custom={tagDelays[i]}
              variants={reduce ? undefined : tagBubble}
              whileHover={reduce ? undefined : { scale: 0.94 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              className="glass-bubble rounded-full px-3.5 py-1.5 text-[12px] will-change-transform"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {layers.map((layer, i) => {
            const Icon = layer.icon
            return (
              <motion.div
                key={layer.title}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease: EASE_OUT, delay: i * 0.06 }}
                whileHover={reduce ? undefined : { y: -6, transition: { duration: 0.2, ease: EASE_OUT } }}
                className="group card-hover-accent rounded-[22px] p-6"
              >
                <div className="icon-tile-accent w-11 h-11 rounded-2xl flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <h3 className="text-[16px] font-medium text-ink mb-2 tracking-[-0.01em]">
                  {layer.title}
                </h3>
                <p className="text-[14px] text-ink/78 leading-relaxed">{layer.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
