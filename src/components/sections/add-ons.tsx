'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Scissors, Palette, Check, Plus, ArrowRight } from 'lucide-react'
import { FACE_MAP_ADDONS, ADDON_BUNDLE } from '@/lib/constants'
import { EASE_OUT_SOFT, REVEAL, VIEWPORT, stagger } from '@/lib/motion'
import { SectionHeading } from '@/components/ui/section-heading'
import { MEDIA, PLACEHOLDER } from '@/lib/showcase'

// The annotations that float over each add-on's visual in the blueprint. They
// arrive one at a time, the same way the Face Mapping Session topics do, so the
// two "explained visual" moments on the page feel like one system.
const visuals = {
  hair_map: {
    icon: Scissors,
    image: MEDIA.hairMap,
    notes: [
      { tag: 'Parting', value: 'Side, low volume', pos: 'left-3 top-[8%] md:left-4' },
      { tag: 'Length', value: 'Mid, tapered', pos: 'left-3 bottom-[10%] md:left-4' },
      { tag: 'Volume', value: 'Controlled crown', pos: 'right-3 top-[44%] md:right-4' },
    ],
  },
  style_colour_map: {
    icon: Palette,
    image: MEDIA.styleMap,
    notes: [
      { tag: 'Colour direction', value: 'Muted mineral tones', pos: 'right-3 top-[8%] md:right-4' },
      { tag: 'Neckline', value: 'Open structure', pos: 'right-3 top-[44%] md:right-4' },
      { tag: 'Presentation', value: 'Professional + practical', pos: 'left-3 bottom-[10%] md:left-4' },
    ],
  },
} as const

export function AddOns() {
  const reduce = useReducedMotion()

  return (
    <section id="add-ons" className="section">
      <div className="container-main">
        <SectionHeading
          eyebrow="Optional add-ons"
          align="center"
          title="Two specialist Maps,"
          muted="when you want the complete picture."
          lede="Your Complete MapMyFace Plan covers your face, skin, routine and grooming. Add a specialist Map when you also want your hair or your personal style to work with it."
        />

        <div className="space-y-6 md:space-y-8">
          {FACE_MAP_ADDONS.map((addon, idx) => {
            const v = visuals[addon.id]
            const Icon = v.icon
            const flip = idx % 2 === 1

            return (
              <motion.article
                key={addon.id}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={REVEAL}
                className="overflow-hidden rounded-[24px] border border-border/50 bg-white"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Visual */}
                  <div
                    className={`relative aspect-[16/11] bg-mist md:aspect-[4/3] lg:aspect-auto lg:min-h-[420px] ${
                      flip ? 'lg:order-2' : ''
                    }`}
                  >
                    <Image
                      src={v.image}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10"
                    />

                    {v.notes.map((n, i) => (
                      <motion.div
                        key={n.tag}
                        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.9 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={VIEWPORT}
                        transition={{ duration: 0.55, ease: EASE_OUT_SOFT, delay: 0.35 + i * 0.4 }}
                        className={`absolute ${n.pos} max-w-[62%] rounded-[13px] border border-white/70 bg-white/90 px-3 py-2 backdrop-blur-md md:max-w-[54%]`}
                        style={{ boxShadow: 'var(--shadow-md)' }}
                      >
                        <p className="text-[8.5px] font-semibold uppercase tracking-[0.16em] text-accent/70 md:text-[9.5px]">
                          {n.tag}
                        </p>
                        <p className="mt-0.5 text-[11.5px] leading-snug text-ink md:text-[12.5px]">
                          {n.value}
                        </p>
                      </motion.div>
                    ))}

                    {PLACEHOLDER && (
                      <span className="absolute bottom-3 right-3 inline-flex h-5 items-center rounded-full bg-white/85 px-2 text-[8.5px] font-medium text-ink/60 backdrop-blur-sm">
                        Placeholder visual
                      </span>
                    )}
                  </div>

                  {/* Copy */}
                  <div className="p-6 md:p-8 lg:p-10">
                    <div className="mb-5 flex items-center gap-3">
                      <span className="icon-tile-accent flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl">
                        <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-analysis-teal">
                        Optional add-on
                      </span>
                    </div>

                    <h3
                      className="text-[1.5rem] leading-tight tracking-[-0.02em] text-ink md:text-[1.9rem]"
                      style={{ fontWeight: 450 }}
                    >
                      {addon.name}
                    </h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-ink/[0.78] md:text-[16px]">
                      {addon.tagline}
                    </p>
                    <p className="mt-4 text-[13px] leading-relaxed text-analysis-teal md:text-[14px]">
                      {addon.longDescription}
                    </p>

                    <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2.5 md:gap-x-6">
                      {addon.bullets.map((b, i) => (
                        <motion.li
                          key={b}
                          initial={reduce ? { opacity: 0 } : { opacity: 0, x: -8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={VIEWPORT}
                          transition={{ duration: 0.5, ease: EASE_OUT_SOFT, delay: stagger(i, 0.05, 0.3) }}
                          className="flex items-start gap-2.5"
                        >
                          <span className="mt-[1px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent-soft">
                            <Check className="h-2.5 w-2.5 text-accent-foreground" strokeWidth={2.5} />
                          </span>
                          <span className="text-[12px] leading-snug text-ink/[0.78] md:text-[13px]">
                            {b}
                          </span>
                        </motion.li>
                      ))}
                    </ul>

                    <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border/60 pt-5">
                      <span
                        className="text-[1.5rem] tracking-[-0.02em] text-ink md:text-[1.75rem]"
                        style={{ fontWeight: 500 }}
                      >
                        +{addon.priceDisplay}
                      </span>
                      <span className="text-[12.5px] text-analysis-teal">Add before payment</span>
                    </div>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>

        {/* Bundle — the recommended checkout combination */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ ...REVEAL, delay: 0.08 }}
          className="mt-6 flex flex-col items-start gap-4 rounded-[22px] p-5 md:mt-8 md:flex-row md:items-center md:justify-between md:p-6"
          style={{
            background:
              'radial-gradient(80% 60% at 12% 0%, rgb(var(--c-accent) / 0.16) 0%, transparent 60%), rgb(var(--c-surface))',
            border: '1px solid rgb(var(--c-accent) / 0.26)',
          }}
        >
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft">
              <Plus className="h-4 w-4 text-accent-foreground" strokeWidth={2.2} />
            </span>
            <div>
              <p className="text-[15px] tracking-[-0.01em] text-ink md:text-[16px]" style={{ fontWeight: 500 }}>
                Add both specialist Maps together for {ADDON_BUNDLE.priceDisplay}
              </p>
              <p className="mt-1 text-[12.5px] text-analysis-teal">
                {ADDON_BUNDLE.label} · Save {ADDON_BUNDLE.savingDisplay}
              </p>
            </div>
          </div>
          <Link
            href="/form"
            className="group inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-ink px-5 text-[13.5px] font-semibold text-white transition-colors duration-200 hover:bg-ink/88"
          >
            Start My Plan
            <ArrowRight
              className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
              strokeWidth={2}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
