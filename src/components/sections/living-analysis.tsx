'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { EASE_OUT_SOFT } from '@/lib/motion'
import { useState } from 'react'
import { ANALYSIS_FACE, PLACEHOLDER } from '@/lib/showcase'

/**
 * LivingAnalysis
 * ------------------------------------------------------------------
 * The "living" annotated-face section. A portrait sits inside a dark
 * analysis console; floating glass HUD panels are layered on top, a
 * scan ring rotates, and annotation dots pulse at anchored coordinates.
 * Hovering / tapping a dot swaps the bottom
 * readout to that region's qualitative reading — the same
 * "annotations move within the image" behaviour
 * we mapped from the reference build, rebuilt from scratch for face yoga.
 */

type Region = {
  id: string
  label: string
  // anchor position over the face, in %
  x: number
  y: number
  // qualitative reading label
  reading: string
  // short diagnostic line
  note: string
  side: 'left' | 'right'
}

const REGIONS: Region[] = [
  { id: 'brow', label: 'Frontalis (brow)', x: 50, y: 20, reading: 'Improvement potential', note: 'Responds well to training', side: 'right' },
  { id: 'undereye', label: 'Orbicularis (under-eye)', x: 33, y: 37, reading: 'Improvement potential', note: 'Good potential', side: 'left' },
  { id: 'cheek', label: 'Zygomaticus (cheek)', x: 68, y: 46, reading: 'Priority zone', note: 'A focus area to work on', side: 'right' },
  { id: 'jaw', label: 'Masseter (jawline)', x: 30, y: 66, reading: 'Strength', note: 'Strong definition baseline', side: 'left' },
  { id: 'lip', label: 'Orbicularis oris (lips)', x: 52, y: 60, reading: 'Balanced', note: 'Balanced, refine corners', side: 'right' },
]

export function LivingAnalysis() {
  const reduce = useReducedMotion()
  const [activeId, setActiveId] = useState<string>('cheek')
  const active = REGIONS.find((r) => r.id === activeId) ?? REGIONS[0]

  return (
    <section
      className="relative overflow-hidden py-16 md:py-24"
      style={{ background: 'linear-gradient(180deg, color-mix(in srgb, rgb(var(--c-accent-2)) 40%, #08130f 60%) 0%, color-mix(in srgb, rgb(var(--c-accent-2)) 22%, #08130f 78%) 100%)' }}
    >
      <div className="container-main relative z-10">
        {/* Header */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_OUT_SOFT }}
          className="max-w-2xl mb-10 md:mb-14"
        >
          <span
            className="inline-block text-[10px] md:text-[11px] font-medium tracking-[0.2em] text-white/80 uppercase mb-4 px-4 py-2 rounded-full"
            style={{
              backgroundColor: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            Muscle-by-muscle
          </span>
          <h2 className="text-[1.75rem] md:text-[2.25rem] lg:text-[2.75rem] leading-[1.12] tracking-[-0.02em] text-white mb-4" style={{ fontWeight: 450 }}>
            See what every muscle is doing{' '}
            <span className="text-white/40">— zone by zone.</span>
          </h2>
          <p className="text-[14px] md:text-[15px] text-white/55 leading-relaxed max-w-lg">
            Walk through each facial muscle group, zone by zone. Hover a point to inspect it.
            {PLACEHOLDER && (
              <span className="ml-2 inline-flex items-center h-5 px-2 rounded-full bg-white/10 border border-white/15 text-[10px] font-medium text-white/70 align-middle">
                Sample face — replace before launch
              </span>
            )}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12 items-center">
          {/* ---------- The living console ---------- */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_OUT_SOFT }}
            className="relative w-full max-w-[520px] mx-auto"
          >
            <div
              className="relative aspect-[4/5] rounded-2xl overflow-hidden"
              style={{ background: '#aec2c9', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              {/* Face image — swap via ANALYSIS_FACE in src/lib/showcase.ts */}
              <Image
                src={ANALYSIS_FACE}
                alt="Facial muscle analysis"
                fill
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-cover"
                style={{ pointerEvents: 'none' }}
              />

              {/* Dark vignette so glass panels read clearly */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, transparent 30%, transparent 55%, rgba(0,0,0,0.55) 100%)' }} />

              {/* Rotating scan ring */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[78%] aspect-square pointer-events-none">
                <div
                  className="animate-scan-spin w-full h-full rounded-full"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.0) 250deg, rgba(160,220,200,0.55) 340deg, transparent 360deg)',
                    maskImage: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))',
                    WebkitMaskImage: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))',
                  }}
                />
              </div>

              {/* Annotation dots */}
              {REGIONS.map((r) => {
                const isActive = r.id === activeId
                return (
                  <button
                    key={r.id}
                    type="button"
                    onMouseEnter={() => setActiveId(r.id)}
                    onFocus={() => setActiveId(r.id)}
                    onClick={() => setActiveId(r.id)}
                    aria-label={r.label}
                    className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group/dot"
                    style={{ left: `${r.x}%`, top: `${r.y}%` }}
                  >
                    <span className="relative flex items-center justify-center">
                      {/* pulse ring */}
                      <span
                        className="absolute w-4 h-4 rounded-full animate-pulse-ring"
                        style={{ background: isActive ? 'rgba(160,220,200,0.5)' : 'rgba(255,255,255,0.35)' }}
                      />
                      {/* core dot */}
                      <span
                        className="relative w-2.5 h-2.5 rounded-full transition-all duration-300"
                        style={{
                          background: isActive ? '#a7e8cf' : '#ffffff',
                          boxShadow: isActive ? '0 0 0 4px rgba(160,220,200,0.25)' : '0 0 0 3px rgba(255,255,255,0.15)',
                          transform: isActive ? 'scale(1.3)' : 'scale(1)',
                        }}
                      />
                    </span>
                    {/* tiny floating label on active */}
                    <span
                      className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] font-medium text-white px-2 py-1 rounded-md transition-all duration-300"
                      style={{
                        left: r.side === 'right' ? 'calc(100% + 8px)' : 'auto',
                        right: r.side === 'left' ? 'calc(100% + 8px)' : 'auto',
                        background: 'rgba(0,0,0,0.55)',
                        border: '0.5px solid rgba(255,255,255,0.12)',
                        opacity: isActive ? 1 : 0,
                        transform: `translateY(-50%) translateX(${isActive ? '0' : r.side === 'right' ? '-6px' : '6px'})`,
                      }}
                    >
                      {r.label}
                    </span>
                  </button>
                )
              })}

              {/* Top-left glass score card */}
              <div
                className="absolute top-4 left-4 z-10 w-[150px] rounded-xl p-3 flex flex-col gap-2"
                style={{ background: 'rgba(0,0,0,0.35)', border: '0.7px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(6px)' }}
              >
                {[
                  { k: 'Symmetry', v: 'Reviewed' },
                  { k: 'Muscle tone', v: 'Reviewed' },
                ].map((s) => (
                  <div key={s.k}>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-white/60">{s.k}</span>
                      <span className="text-[10px] text-white font-medium">{s.v}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom glass chart card — the gliding indicator */}
              <div
                className="absolute bottom-4 left-4 right-4 z-10 rounded-xl p-3.5"
                style={{ background: 'rgba(0,0,0,0.4)', border: '0.7px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}
              >
                <div className="flex items-start justify-between mb-2.5">
                  <div>
                    <p className="text-[10px] text-white/50 uppercase tracking-[0.12em]">Selected zone</p>
                    <p className="text-[14px] text-white font-medium leading-tight">{active.label}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[15px] leading-tight text-white" style={{ fontWeight: 400 }}>{active.reading}</p>
                  </div>
                </div>
                {/* qualitative zone indicator */}
                <div className="relative h-1.5 rounded-full overflow-hidden" style={{ background: 'linear-gradient(90deg, rgba(167,232,207,0.25), rgba(167,232,207,0.8))' }} />
                <p className="text-[11px] text-white/55 mt-2.5 leading-snug">{active.note}</p>
              </div>
            </div>

            {/* zone chips under the console */}
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {REGIONS.map((r) => (
                <button
                  key={r.id}
                  onMouseEnter={() => setActiveId(r.id)}
                  onClick={() => setActiveId(r.id)}
                  className="text-[11px] px-3 py-1.5 rounded-full transition-all duration-200"
                  style={{
                    background: r.id === activeId ? '#a7e8cf' : 'rgba(255,255,255,0.08)',
                    color: r.id === activeId ? '#14110f' : 'rgba(255,255,255,0.6)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {r.label.split(' ')[0]}
                </button>
              ))}
            </div>
          </motion.div>

          {/* ---------- Discover cards ---------- */}
          <div className="space-y-4">
            {[
              {
                n: '1',
                title: 'Your most expressive feature',
                body: 'Your doctor points out the one zone that shapes your look the most — so you know where a small change makes the biggest difference.',
                stat: { label: 'Cheek lift', value: 'Improvement potential' },
              },
              {
                n: '2',
                title: 'How each zone works together',
                body: 'Muscles do not act alone. Your doctor shows how your brow, cheek and jawline balance one another, and which link to train first.',
                stat: { label: 'Brow → cheek link', value: 'Strength' },
              },
              {
                n: '3',
                title: 'Where to focus first',
                body: 'A view of which zones to prioritise per zone — no surgery, just consistent targeted training.',
                stat: { label: 'Jawline', value: 'Priority zone' },
              },
            ].map((c, i) => (
              <motion.div
                key={c.n}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: EASE_OUT_SOFT }}
                className="rounded-2xl p-5 md:p-6"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-medium" style={{ background: 'rgba(167,232,207,0.15)', color: '#a7e8cf' }}>
                    {c.n}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[16px] md:text-[17px] text-white font-medium mb-1.5">{c.title}</h3>
                    <p className="text-[13px] text-white/55 leading-relaxed mb-4">{c.body}</p>
                    <div className="rounded-lg p-3" style={{ background: 'rgba(0,0,0,0.25)', border: '0.5px solid rgba(255,255,255,0.08)' }}>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-white/50">{c.stat.label}</span>
                        <span className="text-[11px] text-white font-medium">{c.stat.value}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
