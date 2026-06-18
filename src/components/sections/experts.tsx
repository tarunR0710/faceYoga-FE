'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const experts = [
  {
    name: 'Dr. Priya Sharma',
    title: 'Facial Aesthetics',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face',
  },
  {
    name: 'Dr. Arjun Mehta',
    title: 'Dermatologist',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face',
  },
  {
    name: 'Dr. Sneha Patel',
    title: 'Cosmetic Surgeon',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop&crop=face',
  },
  {
    name: 'Dr. Vikram Singh',
    title: 'Maxillofacial Expert',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop&crop=face',
  },
  {
    name: 'Dr. Ananya Reddy',
    title: 'Anti-Aging Specialist',
    image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=200&h=200&fit=crop&crop=face',
  },
  {
    name: 'Dr. Rahul Kapoor',
    title: 'Research Director',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&h=200&fit=crop&crop=face',
  },
]

export function Experts() {
  return (
    <section className="py-20 bg-white">
      <div className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="text-[12px] text-[#999] uppercase tracking-[0.15em] mb-3">
            Expert team
          </p>
          <h2 className="text-[1.75rem] md:text-[2.25rem] leading-[1.15] tracking-[-0.02em] text-[#111] mb-4" style={{ fontWeight: 450 }}>
            Backed by leading specialists
          </h2>
          <p className="text-[15px] md:text-[17px] text-[#666] leading-relaxed">
            Our methods are developed and reviewed by qualified medical professionals
          </p>
        </motion.div>

        {/* Experts Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {experts.map((expert, index) => (
            <motion.div
              key={expert.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="text-center group"
            >
              <div className="relative w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden bg-[#f5f5f5] ring-2 ring-transparent group-hover:ring-[#eee] transition-all">
                <Image
                  src={expert.image}
                  alt={expert.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <h3 className="text-[13px] font-medium text-[#111]">{expert.name}</h3>
              <p className="text-[11px] text-[#999]">{expert.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
