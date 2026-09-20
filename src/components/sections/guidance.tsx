'use client'

import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { GUIDANCE } from '@/lib/content'

/** Personalised guidance — four "Not just…" cards. Sits right before the Protocol. */
export function Guidance() {
  return (
    <section className="section bg-white">
      <div className="container-main">
        <SectionHeading eyebrow={GUIDANCE.eyebrow} title={GUIDANCE.title} muted={GUIDANCE.muted} lede={GUIDANCE.lede} />

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
          {GUIDANCE.cards.map((c, i) => (
            <Reveal key={c.label} index={i}>
              <div
                className="flex h-full flex-col gap-3 rounded-[20px] border bg-white p-6"
                style={{ borderColor: 'rgba(61,107,118,.14)', boxShadow: 'var(--shadow-card)' }}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-brand" style={{ fontWeight: 600 }}>
                  {c.label}
                </span>
                <p className="text-[1.15rem] leading-snug tracking-[-0.02em] text-ink" style={{ fontWeight: 300 }}>
                  {c.notJust}
                </p>
                <p className="text-[13.5px] leading-relaxed text-ink-muted">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
