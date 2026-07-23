'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'

type Region = {
  id: string
  name: string
  count: number
  markers: string[]
}

const REGIONS: Region[] = [
  {
    id: 'forehead',
    name: 'Forehead & Brow',
    count: 12,
    markers: ['Brow lift', 'Brow symmetry', 'Frontalis tone', 'Horizontal lines', 'Brow position', 'Glabella tension', 'Brow tilt', 'Temple hollowing', 'Frown depth', 'Hairline balance', 'Brow-to-eye gap', 'Expression rest state'],
  },
  {
    id: 'eyes',
    name: 'Eyes & Under-eye',
    count: 18,
    markers: ['Eye openness', 'Upper-lid hood', 'Under-eye puffiness', 'Under-eye hollowing', 'Dark circles', 'Orbicularis tone', 'Crow\'s feet', 'Eye symmetry', 'Canthal tilt', 'Lid crease', 'Brow-eye distance', 'Squint lines', 'Tear-trough depth', 'Lash line', 'Inner-corner shape', 'Outer-corner lift', 'Eye rest tension', 'Blink strength'],
  },
  {
    id: 'cheeks',
    name: 'Cheeks & Midface',
    count: 14,
    markers: ['Cheek lift', 'Cheekbone projection', 'Mid-cheek fullness', 'Under-cheek hollowing', 'Zygomatic tone', 'Nasolabial fold', 'Cheek symmetry', 'Apple position', 'Volume balance', 'Cheek-to-jaw balance', 'Smile lift', 'Midface length', 'Buccal fullness', 'Cheek rest state'],
  },
  {
    id: 'jaw',
    name: 'Jaw & Neck',
    count: 13,
    markers: ['Jawline definition', 'Masseter tone', 'Jaw symmetry', 'Submental fullness', 'Neck posture', 'Platysma tone', 'Chin projection', 'Jaw-to-neck angle', 'Double-chin index', 'Neck firmness', 'Jowl formation', 'Jaw width', 'Neck taper'],
  },
  {
    id: 'lips',
    name: 'Lips & Mouth',
    count: 11,
    markers: ['Lip fullness', 'Upper-lower ratio', 'Cupid\'s bow', 'Corner lift', 'Lip symmetry', 'Perioral lines', 'Smile width', 'Philtrum shape', 'Vermilion border', 'Mouth rest state', 'Lip hydration'],
  },
  {
    id: 'skin',
    name: 'Skin & Surface',
    count: 15,
    markers: ['Skin firmness', 'Evenness', 'Texture', 'Pore visibility', 'Fine lines', 'Redness', 'Hydration', 'Glow', 'Blemishes', 'Hyperpigmentation', 'Elasticity', 'Puffiness', 'Undertone', 'Sun damage', 'Overall clarity'],
  },
]

export function MuscleMap() {
  const [open, setOpen] = useState<string | null>('cheeks')

  return (
    <section className="section bg-white">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-10 md:mb-12"
        >
          <p className="text-[12px] text-[#999] uppercase tracking-[0.15em] mb-3">Complete assessment</p>
          <h2 className="text-[1.75rem] md:text-[2.25rem] lg:text-[2.5rem] leading-[1.15] tracking-[-0.02em] text-[#111] mb-4" style={{ fontWeight: 450 }}>
            80+ facial markers, mapped across 6 zones
          </h2>
          <p className="text-[15px] text-[#666] leading-relaxed">
            Your doctor assesses every region of your face so nothing is missed — then builds a routine you can actually follow.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3">
          {REGIONS.map((r, i) => {
            const isOpen = open === r.id
            return (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-[#eee] overflow-hidden bg-white"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : r.id)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-[#fafafa]"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[13px] tabular-nums text-[#bbb] w-6">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-[16px] md:text-[17px] font-medium text-[#111]">{r.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[12px] text-[#999] whitespace-nowrap">{r.count} markers</span>
                    <span
                      className="flex-shrink-0 w-7 h-7 rounded-full bg-[#f5f5f5] flex items-center justify-center transition-transform duration-300"
                      style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                    >
                      <Plus className="w-4 h-4 text-[#666]" />
                    </span>
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 flex flex-wrap gap-2">
                        {r.markers.map((m) => (
                          <span key={m} className="text-[12px] px-3 py-1.5 rounded-full bg-[#f5f5f5] text-[#555]">
                            {m}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
