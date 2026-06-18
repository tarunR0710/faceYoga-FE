'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full"
          style={{
            objectFit: 'cover',
            objectPosition: 'center top',
          }}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
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
            Get your personalized facial analysis and transformation plan based on your unique features.
          </motion.p>

          {/* CTA Buttons - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap justify-center md:justify-start gap-3"
          >
            <Link
              href="/form"
              className="h-14 px-10 inline-flex items-center justify-center bg-white text-[#111] text-[15px] font-medium rounded-full hover:bg-white/90 transition-all duration-200"
            >
              Start my plan
            </Link>
            <Link
              href="#how-it-works"
              className="h-14 px-10 inline-flex items-center justify-center text-white text-[15px] font-medium rounded-full border border-white/30 hover:bg-white/10 transition-all duration-200"
            >
              How it works
            </Link>
          </motion.div>
        </motion.div>      </div>
    </section>
  )
}
