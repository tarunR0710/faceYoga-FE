'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Stethoscope, Microscope, Activity, Scissors } from 'lucide-react'
import { MEDIA, PLACEHOLDER } from '@/lib/showcase'
import { REVEAL, VIEWPORT, stagger } from '@/lib/motion'
import { SectionHeading } from '@/components/ui/section-heading'
import { CardRail } from '@/components/ui/card-rail'

// The four panel roles from the blueprint. Names and credentials stay as
// explicit placeholders until the approved roster is signed off — the blueprint
// is emphatic that only approved names, qualifications and photographs ship.
//
// `poster` is a local file (see lib/showcase → MEDIA) so the card always renders
// even with no network. `video` is still remote: it is fetched only on hover and
// a failed fetch is silent, so it can never break the page. Swap both to R2.
const panel = [
  {
    icon: Stethoscope,
    role: 'Medical & Skin Expert',
    body: 'Skin context, safety boundaries and appropriate review.',
    video: 'https://videos.pexels.com/video-files/5659241/5659241-sd_960_540_30fps.mp4',
    poster: MEDIA.panelMedical,
  },
  {
    icon: Microscope,
    role: 'Facial Analysis & Research',
    body: 'Facial relationships, structured evaluation and methodology.',
    video: 'https://videos.pexels.com/video-files/8326892/8326892-sd_960_540_30fps.mp4',
    poster: MEDIA.panelResearch,
  },
  {
    icon: Activity,
    role: 'Face Yoga Specialist',
    body: 'Relevant movement and exercise recommendations.',
    video: 'https://videos.pexels.com/video-files/6933523/6933523-sd_960_540_25fps.mp4',
    poster: MEDIA.panelYoga,
  },
  {
    icon: Scissors,
    role: 'Hair & Personal Style',
    body: 'Hair, colour and personal presentation add-on review.',
    video: 'https://videos.pexels.com/video-files/7754525/7754525-sd_960_540_30fps.mp4',
    poster: MEDIA.panelHair,
  },
]

function PanelCard({
  member,
  index,
  reduce,
}: {
  member: (typeof panel)[number]
  index: number
  reduce: boolean
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const Icon = member.icon

  const play = () => {
    const v = videoRef.current
    if (!v) return
    v.currentTime = 0
    v.play().catch(() => {})
  }
  const stop = () => videoRef.current?.pause()

  return (
    <motion.article
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ ...REVEAL, delay: stagger(index) }}
      onMouseEnter={reduce ? undefined : play}
      onMouseLeave={reduce ? undefined : stop}
      className="group flex flex-col overflow-hidden rounded-[22px] border border-border/30 bg-white"
      style={{ boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.04)' }}
    >
      {/* Media — poster fills at rest, the clip fades in on hover */}
      <div className="relative aspect-[4/5] overflow-hidden bg-mist">
        <Image
          src={member.poster}
          alt=""
          fill
          sizes="(max-width: 768px) 78vw, 300px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        {!reduce && (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          >
            <source src={member.video} type="video/mp4" />
          </video>
        )}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/25"
        />

        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/85 px-2.5 py-1 text-[8.5px] font-semibold uppercase tracking-[0.14em] text-ink/70 backdrop-blur-sm">
          <Icon className="h-3 w-3 text-accent" strokeWidth={1.8} />
          MapMyFace Expert Panel
        </span>

        <h3
          className="absolute inset-x-3 bottom-3 text-[16px] leading-tight tracking-[-0.01em] text-white md:text-[17px]"
          style={{ fontWeight: 500 }}
        >
          {member.role}
        </h3>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 md:p-5">
        <p className="text-[13px] leading-relaxed text-ink/[0.72] md:text-[13.5px]">{member.body}</p>
        <div className="mt-4 border-t border-border/60 pt-3.5">
          <p className="text-[12.5px] text-analysis-teal">
            {PLACEHOLDER ? (
              <span className="accent-italic text-ink/45">Approved expert name + credentials</span>
            ) : (
              member.role
            )}
          </p>
        </div>
      </div>
    </motion.article>
  )
}

export function Experts() {
  const reduce = useReducedMotion()
  return (
    <section id="experts" className="section">
      <div className="container-main">
        <SectionHeading
          eyebrow="The expert panel"
          title="Guided by"
          muted="experienced specialists."
          note="Profiles show the professionals behind MapMyFace clearly and credibly. Only approved names, qualifications, experience and photographs are published."
        />

        <CardRail cols={4} label="MapMyFace expert panel">
          {panel.map((member, i) => (
            <PanelCard key={member.role} member={member} index={i} reduce={!!reduce} />
          ))}
        </CardRail>
      </div>
    </section>
  )
}
