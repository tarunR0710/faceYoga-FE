'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { animate, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { EASE_OUT, SCRUB_SPRING } from '@/lib/motion'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { FULL_PICTURE } from '@/lib/content'

const GRADIENT = 'linear-gradient(120deg,#24303A 0%,#3F4F5A 55%,#8B98A3 100%)'

/**
 * What actually feeds the plan — sits right before Plan so "here's what we
 * factor in" lands immediately before "here's what you get back."
 */
export function FullPicture() {
  return (
    <section className="section bg-white">
      <div className="container-main">
        <SectionHeading
          eyebrow={FULL_PICTURE.eyebrow}
          title={FULL_PICTURE.title}
          muted={FULL_PICTURE.muted}
          lede={FULL_PICTURE.lede}
        />

        <div className="mx-auto flex max-w-xl flex-col gap-4">
          {FULL_PICTURE.items.map((item, i) => (
            <Reveal key={item.title} index={i}>
              <PictureCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function PictureCard({ item }: { item: (typeof FULL_PICTURE.items)[number] }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  // A narrow band around the viewport's vertical centre — not the card's
  // full transit through the whole viewport, which would keep several
  // neighbouring cards lit at once. Progress is clamped outside the band, so
  // only the one card currently crossing the centre is ever highlighted, and
  // it sits at a clean 0 the rest of the time — no leftover tint once the
  // reader has scrolled past.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['center 0.58', 'center 0.42'] })
  // A steep spike, not a slow ramp: the gradient is only pale near 0 opacity,
  // so a wide fade meant the card sat in that washed-out, greyish-looking
  // in-between state for most of the scroll — it read as grey first, colour
  // second. Snapping quickly to full strength shows the real gradient
  // almost immediately instead of dwelling on the pale edge of it.
  const scrollFillRaw = useTransform(scrollYProgress, [0, 0.42, 0.5, 0.58, 1], [0, 0, 1, 0, 0])
  // On a real phone, touch-scroll delivers scrollYProgress in irregular,
  // sometimes large per-frame jumps (momentum scrolling isn't sampled every
  // paint) — reading a spike this narrow straight off that raw signal meant
  // a fast flick could land ON either side of the peak in consecutive
  // frames with nothing in between, which reads as a flicker rather than a
  // rise and fall. Routing it through the same scroll-scrub spring used
  // elsewhere smooths that out into a continuous curve.
  const scrollFill = useSpring(scrollFillRaw, SCRUB_SPRING)

  // Hover and scroll both feed the same 0-1 value, so a mouse user and a
  // scrolling reader drive the exact same highlight instead of two competing
  // transitions fighting over which one wins.
  const hoverFill = useMotionValue(0)
  useEffect(() => {
    if (reduce) return
    const controls = animate(hoverFill, hovered ? 1 : 0, { duration: 0.2, ease: EASE_OUT })
    return () => controls.stop()
  }, [hovered, hoverFill, reduce])

  const fill = useTransform([scrollFill, hoverFill], ([s, h]: number[]) => Math.max(s, h))
  // Text switches over a short window well before the background reaches
  // full strength, rather than blending linearly black -> white — a linear
  // blend passes straight through literal grey for most of its range, which
  // is the other half of the "grey first" look.
  const titleColor = useTransform(fill, [0.25, 0.45], ['#0a0a0a', '#ffffff'])
  const bodyColor = useTransform(fill, [0.25, 0.45], ['#666666', 'rgba(255,255,255,.75)'])

  if (reduce) {
    // No scroll wiring under reduced motion — hover only, plain CSS.
    return (
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative flex items-center gap-5 overflow-hidden rounded-[12px] border border-border-soft bg-white p-2"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: GRADIENT }}
        />
        <CardImage item={item} />
        <div className="relative min-w-0">
          <h3
            className="text-[0.95rem] tracking-[-0.02em] text-ink transition-colors duration-300 group-hover:text-white md:text-[1.05rem]"
            style={{ fontWeight: 300 }}
          >
            {item.title}
          </h3>
          <p className="mt-0.5 text-[12px] leading-relaxed text-ink-muted transition-colors duration-300 group-hover:text-white/75">
            {item.text}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex items-center gap-5 overflow-hidden rounded-[12px] border border-border-soft bg-white p-2"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: GRADIENT, opacity: fill }}
      />
      <CardImage item={item} />
      <div className="relative min-w-0">
        <motion.h3
          className="text-[0.95rem] tracking-[-0.02em] md:text-[1.05rem]"
          style={{ fontWeight: 300, color: titleColor }}
        >
          {item.title}
        </motion.h3>
        <motion.p className="mt-0.5 text-[12px] leading-relaxed" style={{ color: bodyColor }}>
          {item.text}
        </motion.p>
      </div>
    </div>
  )
}

function CardImage({ item }: { item: (typeof FULL_PICTURE.items)[number] }) {
  return (
    <span className="relative h-[64px] w-[80px] shrink-0 overflow-hidden rounded-[8px] ring-1 ring-border-soft md:h-[72px] md:w-[92px]">
      <Image src={item.img} alt="" fill sizes="92px" className="object-cover" />
    </span>
  )
}
