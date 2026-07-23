'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

// Hero video assets on Cloudflare R2 (public dev URL).
// To move to a custom domain later, change only this base — the paths stay the same.
const ASSET_BASE_URL = 'https://pub-276f99bee0ca472b8c097bf6b9fc7e52.r2.dev'

export function Hero() {
  // The lightweight poster is the LCP element and renders immediately.
  // The 1080p video is deferred until after the page finishes loading so it
  // never competes with LCP / main-thread work during the initial load.
  const [showVideo, setShowVideo] = useState(false)
  const [videoReady, setVideoReady] = useState(false)

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
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#3a3632]">
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
      </div>

      {/* Content - positioned at bottom */}
      <div className="relative h-full flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-8 md:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          {/* Badge */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[13px] text-white/80 mb-3"
          >
            Join 50,000+ people
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-[2rem] md:text-[2.75rem] lg:text-[3.5rem] leading-[1.1] tracking-[-0.02em] text-white mb-4"
            style={{ fontWeight: 450 }}
          >
            Improve your looks
            <br />
            <span className="text-white/50">without surgery</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-[15px] md:text-[17px] text-white/70 leading-relaxed mb-8 max-w-md"
          >
            Get matched with a real doctor who reviews your face 1-on-1 and prescribes a plan built around your unique features.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-row gap-3"
          >
            <Link
              href="/form"
              className="h-12 sm:h-14 px-6 sm:px-10 inline-flex items-center justify-center bg-white text-[#111] text-[14px] sm:text-[15px] font-medium rounded-full hover:bg-white/90 transition-all duration-200"
            >
              Start my plan
            </Link>
            <Link
              href="#how-it-works"
              className="h-12 sm:h-14 px-6 sm:px-10 inline-flex items-center justify-center text-white text-[14px] sm:text-[15px] font-medium rounded-full border border-white/30 hover:bg-white/10 transition-all duration-200"
            >
              How it works
            </Link>
          </motion.div>
        </motion.div>      </div>
    </section>
  )
}
