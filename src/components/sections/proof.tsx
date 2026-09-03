'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { REVEAL, VIEWPORT } from '@/lib/motion'
import { useComparisonSlider } from '@/hooks/use-comparison-slider'
import { SectionHeading } from '@/components/ui/section-heading'
import { Reveal } from '@/components/ui/reveal'
import { PROOF } from '@/lib/content'

/**
 * The believability beat, early.
 *
 * The photographs, early — before the price, before any explanation.
 *
 * This deliberately does NOT discuss the absence of testimonials. An earlier
 * version carried a panel headed "You will not find testimonials here yet",
 * which was reference material for us turned into a customer-facing banner:
 * nobody arrives counting testimonials, so announcing that there are none
 * creates a doubt the visitor did not have. Not fabricating proof is the rule.
 * Narrating the gap is not part of it.
 */
export function Proof() {
  return (
    <section id="proof" className="section bg-white">
      <div className="container-main">
        <SectionHeading
          eyebrow={PROOF.eyebrow}
          align="center"
          title={PROOF.title}
          muted={PROOF.muted}
          lede={PROOF.lede}
        />

        {/* One column, one pair per scroll beat. Each portrait is capped at
            480px rather than filling the container: at 3:4, a full-width image
            would stand 1,600px tall and the pair would never be visible at once.
            Capped and centred, each is bigger than it was three-across while the
            whole run still reads as one sequence.

            No stagger here — the pairs arrive one at a time as you scroll to
            them, so a shared delay ladder would just make the later ones late. */}
        <div className="flex flex-col items-center gap-6 md:gap-8">
          {PROOF.pairs.map((pair, i) => (
            <motion.div
              key={pair.before}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={REVEAL}
              className="w-full max-w-[480px]"
            >
              <CompareSlider before={pair.before} after={pair.after} />
            </motion.div>
          ))}
        </div>

        <Reveal
          as="p"
          delay={0.1}
          className="mt-5 text-[11.5px] leading-relaxed text-ink/40 md:text-center"
        >
          {PROOF.disclaimer}
        </Reveal>

      </div>
    </section>
  )
}

function CompareSlider({ before, after }: { before: string; after: string }) {
  const { position, containerRef, handleProps } = useComparisonSlider()

  return (
    <div
      ref={containerRef}
      className="relative aspect-[3/4] select-none overflow-hidden rounded-[18px] bg-photo-bg"
    >
      <Image
        src={after}
        alt="After"
        fill
        sizes="(max-width: 520px) 92vw, 480px"
        className="object-cover"
        draggable={false}
      />

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={before}
          alt="Before"
          fill
          sizes="(max-width: 520px) 92vw, 480px"
          className="object-cover"
          draggable={false}
        />
      </div>

      <span className="absolute left-3 top-3 font-mono text-[9px] tracking-[0.15em] text-white/85 drop-shadow">
        BEFORE
      </span>
      <span className="absolute right-3 top-3 font-mono text-[9px] tracking-[0.15em] text-white/85 drop-shadow">
        AFTER
      </span>

      {/* The handle is the ONLY draggable element, so a vertical swipe over the
          photograph still scrolls the page on a phone (the hook deliberately
          leaves the container unwired and sets touch-action:none here). */}
      <div
        className="absolute bottom-0 top-0 w-px bg-white/75 shadow-[0_0_2px_rgba(0,0,0,0.2)]"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        {/* Two nested elements on purpose. The OUTER one is the touch target at
            44x44 — the visible pill is 28px, and on the one asset that has to
            respond first try on a thumb, a 28px target is the difference
            between proof and a dead image. The INNER span carries the look.

            Deliberately not a motion component: it is centred with
            -translate-x/y-1/2, and framer-motion writes `transform` to animate,
            which silently overwrites that centring and throws the handle off
            the divider. */}
        <div
          {...handleProps}
          aria-label="Drag to compare before and after"
          className="group absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center outline-none"
        >
          <span className="flex h-7 w-7 items-center justify-center gap-[3px] rounded-full border border-white/70 bg-white/15 backdrop-blur-md transition-transform duration-200 group-hover:scale-110 group-focus-visible:ring-2 group-focus-visible:ring-white group-active:scale-95">
            <svg
              className="h-[6px] w-[4px] text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"
              fill="currentColor"
              viewBox="0 0 4 6"
              aria-hidden="true"
            >
              <path d="M4 0L0 3l4 3z" />
            </svg>
            <svg
              className="h-[6px] w-[4px] text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"
              fill="currentColor"
              viewBox="0 0 4 6"
              aria-hidden="true"
            >
              <path d="M0 0L4 3L0 6z" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  )
}
