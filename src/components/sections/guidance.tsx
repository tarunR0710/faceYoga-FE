'use client'

import { Reveal } from '@/components/ui/reveal'
import { SectionTag } from '@/components/ui/section-tag'
import { GUIDANCE } from '@/lib/content'

/**
 * Personalised guidance — the "not just…" argument, as four rows.
 *
 * This was four cards and a lede, a full screen for one idea: that the advice
 * names the actual thing rather than the category. The idea survives; the
 * furniture does not. Each row now carries the label, the generic version it
 * refuses, and the specific version, on one hairline.
 *
 * It sits between the Face Map and the experts section, so it has to read as
 * a coda to the report rather than a section competing with it.
 */
export function Guidance() {
  return (
    <section className="section bg-white">
      <div className="container-main">
        <Reveal index={0} className="flex max-w-[640px] flex-col items-start gap-4">
          <SectionTag>{GUIDANCE.eyebrow}</SectionTag>
          <h2 className="text-[1.75rem] leading-[1.12] tracking-[-0.02em] text-ink md:text-[2.25rem]" style={{ fontWeight: 300 }}>
            {GUIDANCE.title} <span className="text-ink/40">{GUIDANCE.muted}</span>
          </h2>
        </Reveal>

        <dl className="mt-8 flex max-w-[860px] flex-col">
          {GUIDANCE.rows.map((r, i) => (
            <Reveal
              key={r.label}
              index={Math.min(i + 1, 5)}
              className="grid grid-cols-1 gap-x-8 gap-y-1 border-t border-border-soft py-4 md:grid-cols-[168px_minmax(0,1fr)]"
            >
              <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/55 md:pt-[3px]">{r.label}</dt>
              <dd className="text-[14px] leading-relaxed">
                <span className="text-ink/40">{r.notJust}</span>{' '}
                <span className="text-ink-muted">{r.text}</span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
