'use client'

import { motion } from 'framer-motion'

const researchStats = [
  { stat: '73%', desc: 'reported improved facial muscle tone', source: 'Northwestern University' },
  { stat: '89%', desc: 'noticed visible changes in 8 weeks', source: 'Internal Study' },
  { stat: '2.5x', desc: 'increase in collagen production', source: 'Dermatology Research' },
  { stat: '40%', desc: 'reduction in appearance of fine lines', source: 'Clinical Trial' },
  { stat: '67%', desc: 'improved facial symmetry', source: 'Aesthetic Medicine Journal' },
  { stat: '82%', desc: 'would recommend to others', source: 'Customer Survey' },
  { stat: '15min', desc: 'daily commitment for results', source: 'Best Practice Guide' },
  { stat: '4-6', desc: 'weeks to see initial changes', source: 'Progress Analysis' },
]

export function StatsGrid() {
  return (
    <section className="py-20 lg:py-32 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
            Backed by Science
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our methods are grounded in research from over 2,000+ academic studies
            and validated by leading dermatologists and aesthetic experts.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {researchStats.map((item, index) => (
            <motion.div
              key={item.stat}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-3xl lg:text-4xl font-bold text-primary">
                {item.stat}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {item.desc}
              </p>
              <p className="mt-3 text-xs text-muted-foreground/60">
                {item.source}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Join 50,000+ people who have already transformed their appearance
          </p>
        </motion.div>
      </div>
    </section>
  )
}
