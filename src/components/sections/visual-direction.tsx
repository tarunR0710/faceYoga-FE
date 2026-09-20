'use client'

import { Reveal } from '@/components/ui/reveal'
import { SectionTag } from '@/components/ui/section-tag'
import { VISUAL_DIRECTION } from '@/lib/content'

/**
 * Visual Direction. No stock face and no rendered "after" here — the blueprint
 * forbids generic AI visuals, and a fabricated before/after would be an
 * outcome claim. The two panels carry the structure of the feature (Current vs
 * Your Visual Direction, with the tag pairs the blueprint names) as typographic
 * plates; consented real examples slot into the same frame later.
 */
export function VisualDirection() {
  return (
    <section id="visual-direction" className="section bg-white">
      <div className="container-main">
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
          <Reveal index={0} className="mb-5 flex justify-center">
            <SectionTag>{VISUAL_DIRECTION.eyebrow}</SectionTag>
          </Reveal>
          <Reveal
            index={1}
            as="h2"
            className="text-[1.75rem] leading-[1.12] tracking-[-0.02em] text-ink md:text-[2.25rem]"
            style={{ fontWeight: 300 }}
          >
            {VISUAL_DIRECTION.title} <span className="text-ink/40">{VISUAL_DIRECTION.muted}</span>
          </Reveal>
          <Reveal index={2} className="mx-auto mt-5 max-w-xl text-[14px] leading-relaxed text-ink-muted md:text-[16px]">
            <p>{VISUAL_DIRECTION.lede}</p>
          </Reveal>
        </div>

        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
          {VISUAL_DIRECTION.panels.map((panel, i) => {
            const direction = i === 1
            return (
              <Reveal key={panel.label} index={3 + i}>
                <div
                  className="relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-[22px] border p-5"
                  style={{
                    borderColor: direction ? 'rgba(255,255,255,.35)' : 'rgba(61,107,118,.14)',
                    background: direction
                      ? 'linear-gradient(150deg,#067B9E 0%,#878787 100%)'
                      : 'linear-gradient(160deg, rgba(173,199,206,0.25) 0%, #ffffff 100%)',
                    boxShadow: '0 4px 14px rgba(10,25,30,.06)',
                  }}
                >
                  {/* Contour motif standing in for the portrait — the one place a
                      face silhouette is drawn rather than photographed. */}
                  <svg viewBox="0 0 200 200" className="pointer-events-none absolute -right-8 -top-6 h-48 w-48 text-ink" fill="none" aria-hidden="true" style={{ opacity: direction ? 0.22 : 0.16 }}>
                    <ellipse cx="100" cy="100" rx="70" ry="88" stroke={direction ? '#fff' : 'currentColor'} />
                    <ellipse cx="100" cy="100" rx="48" ry="62" stroke={direction ? '#fff' : 'currentColor'} strokeDasharray={direction ? '4 4' : undefined} />
                  </svg>
                  <span
                    className="relative font-mono text-[10px] uppercase tracking-[0.18em]"
                    style={{ color: direction ? '#E6C9AF' : '#3D6B76', fontWeight: 600 }}
                  >
                    {panel.label}
                  </span>
                  <div className="relative flex flex-col gap-2">
                    {panel.tags.length === 0 ? (
                      <p className="text-[13px] leading-relaxed text-ink/55">How your face presents today, as your expert saw it in the session.</p>
                    ) : (
                      panel.tags.map(([tag, text]) => (
                        <div key={tag} className="rounded-[12px] px-3.5 py-2.5" style={{ background: 'rgba(255,255,255,.14)', border: '1px solid rgba(255,255,255,.22)' }}>
                          <p className="font-mono text-[9.5px] uppercase tracking-[0.16em]" style={{ color: 'rgba(255,255,255,.75)' }}>
                            {tag}
                          </p>
                          <p className="mt-0.5 text-[13px] text-white">{text}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal index={6} className="mx-auto mt-6 max-w-3xl text-center text-[12px] leading-relaxed text-ink/45">
          <p>{VISUAL_DIRECTION.disclaimer}</p>
        </Reveal>
      </div>
    </section>
  )
}
