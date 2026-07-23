'use client'

import { motion } from 'framer-motion'

const metrics = [
  { label: 'Cheek lift', now: 34, projected: 71 },
  { label: 'Jawline definition', now: 52, projected: 78 },
  { label: 'Skin firmness', now: 46, projected: 74 },
  { label: 'Facial symmetry', now: 68, projected: 83 },
  { label: 'Under-eye firmness', now: 41, projected: 69 },
  { label: 'Overall muscle tone', now: 39, projected: 76 },
]

// simple 12-week projection points (0-100) for the line chart
const withYoga = [39, 44, 50, 55, 60, 64, 68, 71, 73, 75, 76, 77]
const without = [39, 39, 38, 38, 37, 37, 36, 36, 35, 35, 34, 34]

function LineChart() {
  const W = 320
  const H = 150
  const pad = 8
  const toPath = (data: number[]) =>
    data
      .map((v, i) => {
        const x = pad + (i / (data.length - 1)) * (W - pad * 2)
        const y = H - pad - (v / 100) * (H - pad * 2)
        return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
      })
      .join(' ')

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" preserveAspectRatio="none" role="img" aria-label="12-week projection">
      {/* gridlines */}
      {[0.25, 0.5, 0.75].map((g) => (
        <line key={g} x1={pad} x2={W - pad} y1={pad + g * (H - pad * 2)} y2={pad + g * (H - pad * 2)} stroke="#eee" strokeWidth="1" />
      ))}
      {/* without-yoga (flat/decline) */}
      <motion.path
        d={toPath(without)}
        fill="none"
        stroke="#d4d4d4"
        strokeWidth="2"
        strokeDasharray="4 4"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />
      {/* with-yoga */}
      <motion.path
        d={toPath(withYoga)}
        fill="none"
        stroke="#16a34a"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      />
    </svg>
  )
}

export function ProgressTracking() {
  return (
    <section className="section bg-[#fafafa]">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-10 md:mb-12"
        >
          <p className="text-[12px] text-[#999] uppercase tracking-[0.15em] mb-3">Measurable results</p>
          <h2 className="text-[1.75rem] md:text-[2.25rem] lg:text-[2.5rem] leading-[1.15] tracking-[-0.02em] text-[#111] mb-4" style={{ fontWeight: 450 }}>
            Track your progress.{' '}
            <span className="text-black/30">Predict your outcome.</span>
          </h2>
          <p className="text-[15px] text-[#666] leading-relaxed max-w-lg">
            Check in with your doctor any time and watch each score move. See where you&apos;ll be in 12 weeks — with your plan versus without it.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-5 md:gap-6">
          {/* Metric bars */}
          <div className="rounded-2xl bg-white border border-[#eee] p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <p className="text-[14px] font-medium text-[#111]">Your projected gains</p>
              <div className="flex items-center gap-4 text-[11px]">
                <span className="flex items-center gap-1.5 text-[#999]"><span className="w-2.5 h-2.5 rounded-full bg-[#e5e5e5]" />Today</span>
                <span className="flex items-center gap-1.5 text-[#666]"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />12 weeks</span>
              </div>
            </div>
            <div className="space-y-5">
              {metrics.map((m, i) => (
                <div key={m.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[13px] text-[#555]">{m.label}</span>
                    <span className="text-[12px] tabular-nums text-[#111] font-medium">
                      {m.now}<span className="text-[#bbb]"> → {m.projected}</span>
                    </span>
                  </div>
                  <div className="relative h-2 rounded-full bg-[#f0f0f0] overflow-hidden">
                    {/* today */}
                    <div className="absolute inset-y-0 left-0 rounded-full bg-[#dcdcdc]" style={{ width: `${m.now}%` }} />
                    {/* projected */}
                    <motion.div
                      initial={{ width: `${m.now}%` }}
                      whileInView={{ width: `${m.projected}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.1 + i * 0.05 }}
                      className="absolute inset-y-0 left-0 rounded-full bg-emerald-500/90"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projection chart card */}
          <div className="rounded-2xl bg-white border border-[#eee] p-6 md:p-8 flex flex-col">
            <p className="text-[14px] font-medium text-[#111] mb-1">Overall muscle tone</p>
            <p className="text-[12px] text-[#999] mb-6">Projected over 12 weeks</p>
            <div className="flex-1 flex items-center">
              <LineChart />
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#f0f0f0]">
              <div>
                <p className="text-[24px] leading-none text-emerald-600" style={{ fontWeight: 450 }}>+38%</p>
                <p className="text-[11px] text-[#999] mt-1">with your plan</p>
              </div>
              <div className="text-right">
                <p className="text-[24px] leading-none text-[#bbb]" style={{ fontWeight: 450 }}>−5%</p>
                <p className="text-[11px] text-[#999] mt-1">without training</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
