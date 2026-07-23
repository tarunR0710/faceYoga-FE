'use client'

import { motion } from 'framer-motion'

const addOns = [
  {
    title: 'Hair Map',
    description:
      'Haircut structure, length, parting, volume, hairstyle and facial-hair direction.',
    price: 'Add for ₹699',
  },
  {
    title: 'Style & Colour Map',
    description:
      'Colours, clothing direction, silhouettes, necklines, accessories and personal presentation.',
    price: 'Add for ₹699',
  },
]

export function AddOns() {
  return (
    <section id="add-ons" className="section bg-ivory">
      <div className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-2xl mb-10 md:mb-14"
        >
          <p className="text-[12px] text-analysis-teal uppercase tracking-[0.14em] mb-3">
            Optional Specialist Maps
          </p>
          <h2
            className="text-[1.75rem] md:text-[2.25rem] leading-[1.15] tracking-[-0.02em] text-ink mb-4"
            style={{ fontWeight: 450 }}
          >
            Go beyond the core Face Map.
          </h2>
          <p className="text-[15px] md:text-base leading-relaxed text-ink/[0.78]">
            Add specialist guidance when you want your hair or personal style to
            work with the complete picture.
          </p>
        </motion.div>

        {/* Add-on cards */}
        <div className="grid gap-4 sm:grid-cols-2 md:gap-6">
          {addOns.map((addOn, index) => (
            <motion.div
              key={addOn.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
              className="flex flex-col rounded-[22px] bg-white p-6 md:p-7 border border-[rgba(21,36,33,0.12)] shadow-[0_1px_2px_rgba(21,36,33,0.04)] transition-all duration-300 hover:border-[rgba(21,36,33,0.2)] hover:shadow-[0_4px_16px_rgba(21,36,33,0.06)]"
            >
              <h3 className="text-[18px] md:text-[20px] font-medium tracking-[-0.01em] text-ink mb-2">
                {addOn.title}
              </h3>
              <p className="text-[14px] leading-relaxed text-ink/[0.78] mb-6">
                {addOn.description}
              </p>
              <span className="mt-auto inline-flex w-fit items-center rounded-full bg-sand px-3.5 py-1.5 text-[13px] font-medium tracking-[0.01em] text-ink">
                {addOn.price}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.16, duration: 0.5, ease: 'easeOut' }}
          className="mt-6 text-[13px] text-analysis-teal"
        >
          Add either map at checkout, before payment.
        </motion.p>
      </div>
    </section>
  )
}
