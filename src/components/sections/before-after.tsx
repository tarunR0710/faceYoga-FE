'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { SectionTag } from '@/components/ui/section-tag'
import { REVEAL, VIEWPORT } from '@/lib/motion'
import { BEFORE_AFTER } from '@/lib/content'

/**
 * The plate the design draws behind every image slot — the same silver used
 * on the Difference card, so the empty state reads as a surface rather than
 * as a hole. It stays behind the photographs too, which keeps the rail even
 * while only some cases have images.
 */
const PLATE = 'linear-gradient(150deg,#D0D7DD 0%,#E7EBEE 45%,#F1F3F5 55%,#E0E5E9 100%)'

/**
 * Before / after proof — designs 54a (desktop) and 55a (mobile), which are
 * the same section at two widths: a horizontal snap rail of 4:5 cards, each
 * one combined before-after photograph with two facts under it.
 *
 * The header splits on the breakpoints exactly as the designs do — stacked
 * and left-aligned on mobile (55a), headline and qualifier side by side on
 * desktop (54a). The two qualifier lines sit at opposite ends of the section
 * rather than stacked together, so neither reads as fine print.
 *
 * Type is the site's own: the pill tag, Geist 300 headline with the muted
 * tail, Geist Mono for the durations. Layout, ratios and spacing come from
 * the design.
 *
 * Distinct from the Proof section near the top of the page: that one is a
 * drag-to-compare slider over three registered pairs, arguing "non-surgical".
 * This one is a rail of many short cases, arguing "it works across areas".
 */
export function BeforeAfter() {
  const reduce = useReducedMotion()

  return (
    <section className="section bg-white">
      <div className="container-main">
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={REVEAL}
          className="mb-8 flex flex-col gap-5 md:mb-12 md:flex-row md:items-end md:justify-between md:gap-10"
        >
          <div className="flex max-w-[620px] flex-col items-start gap-3.5">
            <SectionTag>{BEFORE_AFTER.eyebrow}</SectionTag>
            <h2
              className="text-[1.75rem] leading-[1.1] tracking-[-0.03em] text-ink md:text-[2.25rem] lg:text-[2.5rem]"
              style={{ fontWeight: 300 }}
            >
              {BEFORE_AFTER.title} <span className="muted-tail">{BEFORE_AFTER.muted}</span>
            </h2>
          </div>
          <p className="max-w-[320px] text-[14px] leading-relaxed text-ink-muted md:text-[14.5px]">
            {BEFORE_AFTER.note}
          </p>
        </motion.div>

        {/* The rail bleeds to the container edges and scroll-pads back to
            them, so a snapped card lands on the text column rather than
            arriving out of a gutter. */}
        {/* The reveal belongs to the RAIL, not to each card. whileInView
            watches the viewport, so on a horizontal rail every card that
            slides in from the right fired its own y:18 -> 0 rise — the cards
            visibly bobbed while swiping, and because `stagger` delayed each
            one differently they drifted out of line with each other even
            when the rail was still. One reveal for the row; the cards are
            static and stay on a shared baseline. */}
        <motion.ul
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={REVEAL}
          className="no-scrollbar -mx-5 flex snap-x snap-mandatory items-start gap-3 overflow-x-auto px-5 pb-1 scroll-px-5 md:-mx-8 md:gap-5 md:px-8 md:scroll-px-8"
        >
          {BEFORE_AFTER.cases.map((c) => (
            <li
              key={c.key}
              className="flex w-[212px] shrink-0 snap-start flex-col gap-3.5 md:w-[232px] md:gap-4"
            >
              <div
                className="relative aspect-[4/5] overflow-hidden rounded-[18px] md:rounded-[20px]"
                style={{ background: PLATE }}
              >
                {c.image ? (
                  <Image
                    src={c.image}
                    alt={`${c.area} — before and after, ${c.time}`}
                    fill
                    sizes="(min-width: 768px) 232px, 212px"
                    className="object-cover"
                  />
                ) : (
                  // Until the photographs land: the slot names itself rather
                  // than sitting blank, quietly enough not to read as an error.
                  <span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] uppercase tracking-[0.14em] text-ink/65">
                    Before · After
                  </span>
                )}
              </div>
              <div className="flex items-baseline justify-between px-0.5 md:px-1">
                <span className="text-[14.5px] text-slate-500 md:text-[15px]">{c.area}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-slate-500 md:text-[10.5px]">
                  {c.time}
                </span>
              </div>
            </li>
          ))}
        </motion.ul>

        <p className="mt-6 text-[12.5px] leading-relaxed text-ink-muted md:mt-8">
          {BEFORE_AFTER.footnote}
        </p>
      </div>
    </section>
  )
}
