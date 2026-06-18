'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faceYogaCategories = [
  {
    name: 'Forehead',
    gradient: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
    exercises: [
      { name: 'The Forehead Smoother', description: 'Place both hands on forehead with fingers spread. Sweep outward while raising eyebrows to release tension.' },
      { name: 'The Eyebrow Lifter', description: 'Place index fingers above eyebrows. Push skin down while raising eyebrows against resistance.' },
      { name: 'The V-Shape', description: 'Form a V with fingers around eyes. Look up and squint lower eyelids upward to smooth glabella.' },
      { name: 'The Owl', description: 'Make C shapes around eyes, pull skin upward while trying to frown for resistance training.' },
      { name: 'Brow Press', description: 'Interlace fingers over forehead, apply pressure while lifting forehead against resistance.' },
    ]
  },
  {
    name: 'Eyes',
    gradient: 'linear-gradient(135deg, #e8f4f8 0%, #d4e9ed 100%)',
    exercises: [
      { name: 'Circle the Eyes', description: 'Place fingers on outer eyebrow ends. Circle around eye sockets to improve circulation.' },
      { name: 'Flirty Eyes', description: 'Place fingers under eyes, open mouth hiding teeth, look up while fluttering eyelids.' },
      { name: 'Crow\'s Feet Release', description: 'Wink one eye for 10 seconds while gently lifting outer corner upward.' },
      { name: 'Eye Squeeze', description: 'Close eyes tightly for 5 seconds, then open wide and look up to strengthen muscles.' },
      { name: 'Temple Stretch', description: 'Place fingertips on temples, pull gently upward and backward while closing eyes.' },
    ]
  },
  {
    name: 'Cheeks',
    gradient: 'linear-gradient(135deg, #fef5f5 0%, #fce8e8 100%)',
    exercises: [
      { name: 'The Cheek Lifter', description: 'Open mouth forming O shape, smile to lift cheeks while placing fingers lightly on cheeks.' },
      { name: 'Cheek Puffer', description: 'Fill cheeks with air, hold 10-15 seconds, move air between left and right cheeks.' },
      { name: 'Fish Face', description: 'Suck cheeks inward creating fish face, try to smile while holding position.' },
      { name: 'Smile Smoother', description: 'Place fingers on mouth corners, smile wide while creating resistance with fingers.' },
      { name: 'The Puppet Face', description: 'Smile showing teeth, press fingertips into nose-lip creases, lift muscles upward.' },
    ]
  },
  {
    name: 'Jawline',
    gradient: 'linear-gradient(135deg, #f5f0fa 0%, #e8dff0 100%)',
    exercises: [
      { name: 'Jaw Release', description: 'Move jaw as if chewing with lips closed, then open wide pressing tongue against bottom teeth.' },
      { name: 'Chin Lift', description: 'Tilt head back looking at ceiling, pucker lips as if kissing the ceiling.' },
      { name: 'The Jaw Jut', description: 'Tilt head back slightly, push lower jaw forward until you feel stretch under chin.' },
      { name: 'Tongue Stretch', description: 'Stick tongue out as far as possible, try to reach toward your nose.' },
      { name: 'Namaste Jawline Lift', description: 'Place thumbs under jawbone, push up gently while moving along jawbone toward ears.' },
    ]
  },
  {
    name: 'Lips & Mouth',
    gradient: 'linear-gradient(135deg, #fff5f5 0%, #ffe8e8 100%)',
    exercises: [
      { name: 'The Lip Plumper', description: 'Close lips and blow air to puff cheeks, shift air from one cheek to other.' },
      { name: 'Lion\'s Breath', description: 'Open mouth wide, stick tongue out pointing down, exhale forcefully with "Haaah" sound.' },
      { name: 'The Pout', description: 'Push lips forward into exaggerated pout, hold for 5 seconds to tone muscles.' },
      { name: 'Lip Press', description: 'Press lips together firmly, smile without separating lips to strengthen mouth area.' },
      { name: 'The Marilyn', description: 'Blow exaggerated air kisses, pucker lips strongly then release to reduce fine lines.' },
    ]
  },
  {
    name: 'Neck',
    gradient: 'linear-gradient(135deg, #f0f5f0 0%, #e0ebe0 100%)',
    exercises: [
      { name: 'The Swan Neck', description: 'Turn head slightly to one side, lift chin at 45-degree angle, pucker lips gently.' },
      { name: 'Neck Stretch', description: 'Tilt head back pressing tongue to roof of mouth, swallow slowly while chin lifted.' },
      { name: 'The Giraffe', description: 'Place fingertips at neck bottom, stroke skin downward while tilting head back.' },
      { name: 'Neck Rotation', description: 'Slowly rotate head in full circle, clockwise then counterclockwise with relaxed shoulders.' },
      { name: 'Platysma Flex', description: 'Open mouth slightly, pull mouth corners down and back to engage neck muscles.' },
    ]
  }
]

export function Features() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const totalExercises = faceYogaCategories.reduce((sum, cat) => sum + cat.exercises.length, 0)

  return (
    <section className="section bg-white">
      <div className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-xl mx-auto mb-12"
        >
          <p className="text-[12px] text-[#999] uppercase tracking-[0.1em] mb-3">
            Comprehensive Program
          </p>
          <h2 className="text-[1.75rem] md:text-[2.25rem] leading-[1.15] tracking-[-0.02em] text-[#111] mb-4" style={{ fontWeight: 450 }}>
            {totalExercises}+ Targeted <span className="text-black/30">Exercises</span>
          </h2>
          <p className="text-[15px] md:text-base text-[#666] leading-relaxed">
            Our program covers every area of your face with science-backed exercises
          </p>
        </motion.div>

        {/* Accordion List */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto space-y-3"
        >
          {faceYogaCategories.map((category, index) => {
            const isExpanded = expandedIndex === index

            return (
              <motion.div
                key={category.name}
                layout
                className="rounded-2xl overflow-hidden transition-shadow duration-300"
                style={{
                  background: isExpanded ? category.gradient : '#fafafa',
                  boxShadow: isExpanded ? '0 8px 30px rgba(0,0,0,0.08)' : 'none',
                }}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background: isExpanded ? 'rgba(0,0,0,0.05)' : 'white',
                      }}
                    >
                      <svg className="w-5 h-5 text-[#666]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[15px] font-medium text-[#111]">
                        {category.name}
                      </p>
                      <p className="text-[12px] text-black/40">
                        {category.exercises.length} exercises
                      </p>
                    </div>
                  </div>

                  {/* Chevron */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isExpanded ? 'bg-black/5 rotate-180' : 'bg-white'
                    }`}
                  >
                    <svg className="w-4 h-4 text-[#666]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Accordion Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5">
                        <div className="pt-2 border-t border-black/5">
                          <div className="grid gap-4 mt-4">
                            {category.exercises.map((exercise, i) => (
                              <motion.div
                                key={exercise.name}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex gap-3"
                              >
                                <span className="text-[10px] font-medium text-black/30 tracking-wider mt-1 shrink-0">
                                  {String(i + 1).padStart(2, '0')}
                                </span>
                                <div>
                                  <p className="text-[13px] font-medium text-[#111] mb-0.5">
                                    {exercise.name}
                                  </p>
                                  <p className="text-[12px] text-black/50 leading-relaxed">
                                    {exercise.description}
                                  </p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[12px] text-[#999] mt-8"
        >
          Tap any category to see all exercises
        </motion.p>
      </div>
    </section>
  )
}
