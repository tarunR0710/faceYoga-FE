'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { EASE_OUT } from '@/lib/motion'
import { HERO } from '@/lib/content'

// Hero video assets on Cloudflare R2 (public dev URL).
// To move to a custom domain later, change only this base — the paths stay the same.
const ASSET_BASE_URL = 'https://pub-276f99bee0ca472b8c097bf6b9fc7e52.r2.dev'

/** Reveal for the stacked hero copy — one curve, staggered by index. */
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE_OUT, delay },
})

export function Hero() {
  return (
    <>
      {/* Short by exactly the band's height on small screens, full height from
          md up — the trick from mapmyface-blueprint-homepage. It lets the trust
          band sit at the bottom edge of the first viewport instead of below the
          fold, so a phone visitor sees what the plan includes without scrolling.
          If the band's height changes, this number has to change with it. */}
      <section className="relative h-[calc(100svh-46px)] w-full overflow-hidden md:h-screen">
        {/* Background Video */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={`${ASSET_BASE_URL}/faceyoga-poster.jpg`}
            className="absolute inset-0 h-full w-full"
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
          >
            {/* Single 1080p source so it stays crisp on high-DPR phones (the 640/720
                encodes looked soft scaled to full screen). The 57 KB poster is the
                LCP; the video streams in via faststart. */}
            <source src={`${ASSET_BASE_URL}/faceyoga-1920.mp4`} type="video/mp4" />
          </video>

          {/* Readability gradient — heavier at the base than the old pass, because
              the headline now sits over two lines plus a lede. */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 35%, rgba(0,0,0,0.12) 62%, transparent 100%)',
            }}
          />
        </div>

        {/* Copy sits at the base of the frame, out of the subject's face */}
        <div className="relative flex h-full flex-col justify-end px-6 pb-8 md:px-12 lg:px-20">
          <div className="max-w-2xl">
            <motion.p
              {...rise(0.15)}
              className="mb-4 font-mono text-[10px] uppercase leading-none tracking-[0.2em] text-white/70 md:text-[11px]"
            >
              {HERO.eyebrow}
            </motion.p>

            <motion.h1
              {...rise(0.25)}
              className="mb-5 text-[34px] leading-[1.05] tracking-[-0.03em] text-white"
              style={{ fontWeight: 300 }}
            >
              {HERO.title}
              {/* Own block so `text-wrap: balance` acts on this line alone —
                  on a 430px phone it otherwise wraps to leave "you." orphaned. */}
              <span className="block text-balance text-white/65">{HERO.muted}</span>
            </motion.h1>

            <motion.p
              {...rise(0.35)}
              className="mb-7 max-w-xl text-[14px] leading-relaxed text-white/70 md:text-[16px]"
            >
              {HERO.lede}
            </motion.p>

            {/* Button pair carried over from the mapmyface-blueprint-homepage
                branch. Both are flex-1 so they split the width evenly instead
                of sizing to their labels, both take a press state. The
                secondary sits on a mostly-solid dark fill (bg-black/45) with
                only a hint of blur — a heavier glass read too washed-out over
                the busy video behind it. */}
            <motion.div {...rise(0.45)} className="flex flex-row gap-3">
              <Link
                href="/form"
                className="inline-flex h-12 flex-1 items-center justify-center whitespace-nowrap rounded-full bg-white px-4 text-[13px] font-medium text-[#111] shadow-lg shadow-black/20 transition-all duration-200 hover:bg-white/90 active:scale-[0.98] sm:h-14 sm:text-[15px]"
              >
                Start My Plan
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex h-12 flex-1 items-center justify-center whitespace-nowrap rounded-full border border-white/10 bg-black/45 px-4 text-[13px] font-medium text-white shadow-lg shadow-black/20 backdrop-blur-[2px] transition-all duration-200 hover:bg-black/55 active:scale-[0.98] sm:h-14 sm:text-[15px]"
              >
                See How It Works
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
