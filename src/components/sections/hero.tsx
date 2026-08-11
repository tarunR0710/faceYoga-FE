'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { EASE_OUT, EASE_OUT_SOFT } from '@/lib/motion'

// Hero video assets on Cloudflare R2 (public dev URL).
// To move to a custom domain later, change only this base — the paths stay the same.
const ASSET_BASE_URL = 'https://pub-276f99bee0ca472b8c097bf6b9fc7e52.r2.dev'

export function Hero() {
  // The lightweight poster is the LCP element and renders immediately.
  // The 1080p video is deferred until after the page finishes loading so it
  // never competes with LCP / main-thread work during the initial load.
  const [showVideo, setShowVideo] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const reduce = useReducedMotion()

  // Cinematic exit: the copy lifts and dissolves as the hero scrolls away
  // (playbook §9 polish). Transform + opacity only, so it costs nothing.
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const exitOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])
  const exitY = useTransform(scrollYProgress, [0, 1], [0, -60])

  // Orchestrated entrance: headline lines rise from a mask, then subhead + CTAs
  // settle. One choreographed "curtain-up" on mount (not scroll) — the brand's
  // first impression. Whole sequence stays under ~1.1s so it never blocks load.
  const container = {
    hidden: {},
    show: { transition: { delayChildren: 0.15, staggerChildren: 0.14 } },
  }
  const headline = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  }
  const line = {
    hidden: { y: '115%' },
    show: { y: '0%', transition: { duration: 0.7, ease: EASE_OUT } },
  }
  const rise = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
  }

  useEffect(() => {
    const start = () => setShowVideo(true)
    if (document.readyState === 'complete') {
      start()
    } else {
      window.addEventListener('load', start, { once: true })
      return () => window.removeEventListener('load', start)
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative h-[calc(100svh-47px)] md:h-screen w-full overflow-hidden">
      {/* Background — subtle focus-pull settle on mount (scale only; no blur, keeps LCP + mobile safe) */}
      <motion.div
        className="absolute inset-0 bg-[#3a3632]"
        initial={reduce ? false : { scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: EASE_OUT_SOFT }}
      >
        {/* Poster image — LCP element, shown instantly */}
        <Image
          src={`${ASSET_BASE_URL}/faceyoga-poster.jpg`}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />

        {/* Deferred video — fades in over the poster once it can play */}
        {showVideo && (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onCanPlay={() => setVideoReady(true)}
            className="absolute inset-0 w-full h-full transition-opacity duration-700"
            style={{
              objectFit: 'cover',
              objectPosition: 'center top',
              opacity: videoReady ? 1 : 0,
            }}
          >
            <source src={`${ASSET_BASE_URL}/faceyoga-1920.mp4`} type="video/mp4" />
          </video>
        )}

        {/* Gradient overlay for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.1) 60%, transparent 100%)',
          }}
        />
      </motion.div>

      {/* Content - positioned at bottom */}
      <div className="relative h-full flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-10 md:pb-12">
        <motion.div
          variants={container}
          initial={reduce ? false : 'hidden'}
          animate="show"
          className="max-w-2xl"
          style={reduce ? undefined : { opacity: exitOpacity, y: exitY }}
        >
          {/* No section tag here. The hero is the one place the page should
              open with the promise itself, not with a label naming it. */}

          {/* Headline — line-by-line mask reveal */}
          <motion.h1
            variants={headline}
            className="text-[28px] md:text-[36px] lg:text-[3.5rem] leading-[1.1] tracking-[-0.02em] text-white mb-4"
            style={{ fontWeight: 450 }}
          >
            <span className="block overflow-hidden pb-[0.15em] -mb-[0.15em]">
              <motion.span variants={line} className="block">Understand your face.</motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.15em] -mb-[0.15em]">
              <motion.span variants={line} className="block text-white/75">Discover what suits you.</motion.span>
            </span>
          </motion.h1>

          {/* Description */}
          {/* Blueprint gives a shorter hero line for the mobile key screen —
              same promise, fewer words above the fold. */}
          <motion.p
            variants={rise}
            className="text-[14px] md:text-[17px] text-white/75 leading-relaxed mb-8 max-w-lg"
          >
            <span className="md:hidden">
              Meet real experts and receive one personalised appearance plan.
            </span>
            <span className="hidden md:inline">
              Meet real experts who study your face, skin, routine, lifestyle and goals — then create
              one personalised plan covering facial appearance, skincare direction, grooming and
              relevant face yoga.
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={rise}
            className="flex flex-row gap-3"
          >
            <Link
              href="/form"
              className="flex-1 h-12 sm:h-14 px-4 inline-flex items-center justify-center whitespace-nowrap bg-white text-[#111] text-[13px] sm:text-[15px] font-semibold rounded-full shadow-lg shadow-black/20 hover:bg-white/90 active:scale-[0.98] transition-all duration-200"
            >
              Start My Plan
            </Link>
            <Link
              href="#how-it-works"
              className="flex-1 h-12 sm:h-14 px-4 inline-flex items-center justify-center whitespace-nowrap text-white text-[13px] sm:text-[15px] font-medium rounded-full bg-white/10 backdrop-blur-md border border-white/25 shadow-lg shadow-black/10 hover:bg-white/20 active:scale-[0.98] transition-all duration-200"
            >
              See How It Works
            </Link>
          </motion.div>

          {/* Trust line */}
          <motion.p
            variants={rise}
            className="mt-6 text-[11px] md:text-[13px] text-white/55 tracking-[0.01em]"
          >
            Human-led. Research-informed. Personalised for you.
          </motion.p>
        </motion.div>      </div>
    </section>
  )
}
