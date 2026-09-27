'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/ui/section-heading'
import { DIFFERENCE } from '@/lib/content'

/** The four comparison rows worth keeping. "Support" moved into the pricing
    includes and "Broader appearance" onto the add-on cards, where they are
    purchase facts rather than argument. */
const ROWS = DIFFERENCE.rows.filter((r) =>
  ['Starting point', 'Understanding', 'Interpretation', 'Priority'].includes(r.label)
)

/**
 * Generic advice vs MapMyFace — the peach card is the one warm accent left on
 * an otherwise achromatic page. Values are inline and scoped here on purpose —
 * do not promote them to tokens or they will spread.
 */
export function Difference() {
  return (
    <section
      // Extra bottom padding: the comparison needs room to land before The
      // plan starts, otherwise the two read as one block.
      className="section bg-white pb-24 md:pb-28 lg:pb-32"
    >
      <div className="container-main">
        <SectionHeading
          eyebrow={DIFFERENCE.eyebrow}
          title={DIFFERENCE.title}
          muted={DIFFERENCE.muted}
          lede={DIFFERENCE.lede}
          palette={{ title: '#2E3033', muted: '#8C9096', lede: '#55585D' }}
        />

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Old Way */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border-soft bg-[rgb(var(--c-panel-bg))] p-4"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-ink/5 flex items-center justify-center">
                <div className="w-3.5 h-3.5 rounded-full bg-ink/20" />
              </div>
              <h3 className="text-[1.15rem] md:text-[1.3rem] tracking-[-0.02em] text-ink" style={{ fontWeight: 300 }}>
                {DIFFERENCE.colGeneric}
              </h3>
            </div>
            <div className="space-y-4">
              {ROWS.map((row, index) => (
                <div key={row.label} className="flex items-start gap-4">
                  {/* shrink-0: items are full sentences, which squeezes the
                      rail and breaks "STEP 2" onto two lines otherwise. */}
                  <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-ink/65 mt-1 shrink-0">
                    STEP {index + 1}
                  </span>
                  <span className="text-[14px] leading-relaxed text-ink-muted">{row.generic}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* New Way - Gradient Glass Effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl p-4 relative overflow-hidden"
            style={{
              // Brushed metal: the 150deg band sweeps up to a near-white
              // highlight at the 50% line and falls back to steel on both
              // sides, and a 115deg specular streak crosses it so the plate
              // catches light rather than just grading. Streak first, plate
              // behind it.
              background:
                'linear-gradient(115deg, rgba(255,255,255,0) 25%, rgba(255,255,255,.45) 45%, rgba(255,255,255,0) 68%), ' +
                'linear-gradient(150deg, #D9E3EA 0%, #EEF2F6 45%, #F7F6FA 58%, #E6E3EF 100%)',
              // No dark hairline: an ink border cuts a sharp line across a
              // plate this light. The edge is a white top lip instead.
              border: '1px solid rgba(255,255,255,.6)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,.7)',
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <Image src="/logo-mark.png" alt="" width={38} height={38} className="h-[38px] w-[38px]" />
              </div>
              <h3 className="text-[1.15rem] md:text-[1.3rem] tracking-[-0.02em] text-ink" style={{ fontWeight: 300 }}>
                {DIFFERENCE.colOurs}
              </h3>
            </div>
            <div className="space-y-4">
              {ROWS.map((row, index) => (
                <div key={row.label} className="flex items-start gap-4">
                  <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-ink/65 mt-1 shrink-0">
                    STEP {index + 1}
                  </span>
                  <span className="text-[14px] leading-relaxed text-ink-muted">{row.ours}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
