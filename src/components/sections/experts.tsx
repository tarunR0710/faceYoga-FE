'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Stethoscope, Activity, Scissors, Palette, Microscope } from 'lucide-react'
import { EXPERT_PANEL, PLACEHOLDER } from '@/lib/showcase'
import { EASE_OUT_SOFT } from '@/lib/motion'

// video/poster = Pexels placeholders (free, no-attribution). Swap to R2 URLs later.
const disciplines = [
  {
    icon: Stethoscope,
    name: 'Dermatology & skin',
    description: 'Reads skin health, texture and tone to ground every recommendation in clinical reality.',
    video: 'https://videos.pexels.com/video-files/5659241/5659241-sd_960_540_30fps.mp4',
    poster: 'https://images.pexels.com/videos/5659241/pexels-photo-5659241.jpeg?auto=compress&cs=tinysrgb&w=1000',
  },
  {
    icon: Activity,
    name: 'Face yoga & movement',
    description: 'Assesses muscle tone and expression to guide what movement can genuinely change.',
    video: 'https://videos.pexels.com/video-files/6933523/6933523-sd_960_540_25fps.mp4',
    poster: 'https://images.pexels.com/videos/6933523/anxiety-appartment-aromatherapy-awake-6933523.jpeg?auto=compress&cs=tinysrgb&w=1000',
  },
  {
    icon: Scissors,
    name: 'Hair & framing',
    description: 'Considers how hairline, length and shape frame and balance your features.',
    video: 'https://videos.pexels.com/video-files/7754525/7754525-sd_960_540_30fps.mp4',
    poster: 'https://images.pexels.com/videos/7754525/pexels-photo-7754525.jpeg?auto=compress&cs=tinysrgb&w=1000',
  },
  {
    icon: Palette,
    name: 'Styling & colour',
    description: 'Matches palette, contrast and styling choices to your natural colouring.',
    video: 'https://videos.pexels.com/video-files/10202811/10202811-sd_960_506_25fps.mp4',
    poster: 'https://images.pexels.com/videos/10202811/pexels-photo-10202811.jpeg?auto=compress&cs=tinysrgb&w=1000',
  },
  {
    icon: Microscope,
    name: 'Research & method',
    description: 'Keeps the analysis honest, measured and grounded in evidence rather than trend.',
    video: 'https://videos.pexels.com/video-files/8326892/8326892-sd_960_540_30fps.mp4',
    poster: 'https://images.pexels.com/videos/8326892/analysis-analyzing-assistant-bacteria-8326892.jpeg?auto=compress&cs=tinysrgb&w=1000',
  },
]

// Netflix-style card: rest = calm white card; hover = the matching clip fades in
// behind it, the icon drops out and the title shrinks to a small white label.
function DisciplineCard({
  d,
  index,
  center,
  reduce,
}: {
  d: (typeof disciplines)[number]
  index: number
  center: number
  reduce: boolean
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const Icon = d.icon
  const play = () => {
    const v = videoRef.current
    if (!v) return
    v.currentTime = 0
    v.play().catch(() => {})
  }
  const stop = () => videoRef.current?.pause()

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: EASE_OUT_SOFT, delay: Math.abs(index - center) * 0.08 }}
      onMouseEnter={reduce ? undefined : play}
      onMouseLeave={reduce ? undefined : stop}
      className="group relative overflow-hidden rounded-[22px] bg-white border border-border/30 cursor-pointer"
      style={{ boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.04)' }}
    >
      {/* Clip — hidden until hover, then autoplays behind the text (no video/poster at rest) */}
      {!reduce && (
        <>
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            poster={d.poster}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          >
            <source src={d.video} type="video/mp4" />
          </video>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </>
      )}

      {/* Content — a normal card at rest; text turns white / clears on hover */}
      <div className="relative p-5">
        <div className="icon-tile-accent mb-4 flex h-10 w-10 items-center justify-center rounded-full transition-opacity duration-300 group-hover:opacity-0">
          <Icon className="w-5 h-5" strokeWidth={1.5} />
        </div>
        <h3 className="text-[16px] font-medium tracking-[-0.01em] text-ink transition-colors duration-300 group-hover:text-white">
          {d.name}
        </h3>
        <p className="mt-2 text-[13px] leading-relaxed text-ink/65 transition-opacity duration-300 group-hover:opacity-0">
          {d.description}
        </p>
      </div>
    </motion.div>
  )
}

export function Experts() {
  const reduce = useReducedMotion()
  const CENTER = Math.floor(disciplines.length / 2)
  return (
    <section id="experts" className="py-16 md:py-24 bg-ivory">
      <div className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE_OUT_SOFT }}
          className="max-w-2xl mb-14"
        >
          <p className="text-[12px] text-analysis-teal uppercase tracking-[0.18em] mb-4">
            The MapMyFace expert panel
          </p>
          <h2
            className="text-[1.9rem] md:text-[2.5rem] leading-[1.15] tracking-[-0.02em] text-ink mb-5"
            style={{ fontWeight: 450 }}
          >
            Different specialists.{' '}
            <span className="text-analysis-teal/70">One coordinated answer.</span>
          </h2>
          <p className="text-[15px] md:text-[17px] text-ink/70 leading-relaxed">
            Your case is reviewed by the experts relevant to your needs, then brought
            together into one Face Map.
          </p>
        </motion.div>

        {/* Disciplines Grid — Netflix-style hover clips */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl">
          {disciplines.map((discipline, index) => (
            <DisciplineCard key={discipline.name} d={discipline} index={index} center={CENTER} reduce={!!reduce} />
          ))}
        </div>

        {/* Founding panel — REAL named experts go here (placeholder headshots for now) */}
        <div className="mt-16 md:mt-20">
          <div className="flex items-center gap-3 mb-6">
            <h3 className="text-[12px] uppercase tracking-[0.15em] text-analysis-teal">Founding panel</h3>
            {PLACEHOLDER && (
              <span className="inline-flex items-center h-5 px-2 rounded-full bg-accent-soft text-[8px] font-medium text-accent-foreground">
                Placeholder — real experts to be onboarded
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-5">
            {EXPERT_PANEL.map((expert, index) => (
              <motion.div
                key={index}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease: EASE_OUT_SOFT, delay: index * 0.06 }}
                whileHover={reduce ? undefined : { scale: 1.03, transition: { duration: 0.2, ease: EASE_OUT_SOFT } }}
                className="rounded-[20px] p-5 text-center cursor-pointer bg-white border border-border/40 transition-transform duration-200"
                style={{ boxShadow: 'rgba(33, 35, 38, 0.1) 0px 10px 10px -10px' }}
              >
                <div className="relative w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-mist ring-1 ring-border">
                  <Image src={expert.image} alt={expert.name} fill sizes="80px" className="object-cover" />
                </div>
                <p className="text-[14px] font-medium text-ink">{expert.name}</p>
                <p className="text-[12px] text-analysis-teal mt-0.5">{expert.credential}</p>
                <p className="text-[11px] text-ink/50 mt-1">{expert.focus}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: EASE_OUT_SOFT, delay: 0.1 }}
          className="mt-10 max-w-2xl text-[13px] md:text-[14px] text-analysis-teal leading-relaxed"
        >
          Every expert appears with their full name, qualification and written consent —
          published as we onboard our founding panel.
        </motion.p>
      </div>
    </section>
  )
}
