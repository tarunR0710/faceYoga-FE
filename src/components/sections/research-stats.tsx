'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const categories = [
  'Finances',
  'Dating',
  'Socializing',
  'Health',
  'Education',
  'Law',
  'Influence',
  'Happiness',
]

const researchData: Record<string, { title: string; highlight: string; description: string; source: string }[]> = {
  Finances: [
    { title: 'Higher', highlight: 'earnings', description: 'Attractive individuals earn approximately 12-15% more than their less attractive counterparts.', source: 'Journal of Labor Economics, 2018' },
    { title: 'Better', highlight: 'negotiations', description: 'People perceived as attractive receive better deals and more favorable terms in negotiations.', source: 'Management Science, 2019' },
    { title: 'More', highlight: 'opportunities', description: 'Attractive candidates are 20% more likely to be called back for job interviews.', source: 'Economics Letters, 2017' },
  ],
  Dating: [
    { title: 'More', highlight: 'matches', description: 'Attractive profiles receive 3x more matches and messages on dating platforms.', source: 'Psychological Science, 2020' },
    { title: 'Better', highlight: 'first dates', description: 'Physical attractiveness is the strongest predictor of initial romantic interest.', source: 'Journal of Personality, 2019' },
    { title: 'Higher', highlight: 'satisfaction', description: 'Couples report higher relationship satisfaction when both partners feel attractive.', source: 'Personal Relationships, 2021' },
  ],
  Socializing: [
    { title: 'More', highlight: 'friends', description: 'Attractive individuals tend to have larger social networks and more close friendships.', source: 'Social Psychology Quarterly, 2018' },
    { title: 'Better', highlight: 'treatment', description: 'People are more helpful, friendly, and cooperative with attractive individuals.', source: 'Personality and Social Psychology, 2019' },
    { title: 'Greater', highlight: 'trust', description: 'Attractive people are perceived as more trustworthy and competent by strangers.', source: 'Evolution and Human Behavior, 2020' },
  ],
  Health: [
    { title: 'Better', highlight: 'treatment', description: 'Doctors spend more time and provide more thorough care to attractive patients.', source: 'European Journal for Person Centered Healthcare, 2018' },
    { title: 'Healthier', highlight: 'lifestyle', description: 'Activities that make you more attractive are often good for your overall health.', source: 'Frontiers in Psychology, 2020' },
    { title: 'Longer', highlight: 'lives', description: 'Attractive people tend to live longer, partially due to better health behaviors.', source: 'Evolution and Human Behavior, 2019' },
  ],
  Education: [
    { title: 'Higher', highlight: 'grades', description: 'Teachers tend to give higher grades to more attractive students on subjective assessments.', source: 'Economics of Education Review, 2018' },
    { title: 'More', highlight: 'attention', description: 'Attractive students receive more positive attention and encouragement from educators.', source: 'Journal of Educational Psychology, 2019' },
    { title: 'Better', highlight: 'opportunities', description: 'Attractive individuals have higher rates of college admission and scholarship awards.', source: 'Applied Economics, 2020' },
  ],
  Law: [
    { title: 'Lighter', highlight: 'sentences', description: 'Attractive defendants receive more lenient sentences for similar crimes.', source: 'Cornell Law Review, 2019' },
    { title: 'More', highlight: 'credibility', description: 'Juries find attractive witnesses more credible and persuasive.', source: 'Law and Human Behavior, 2018' },
    { title: 'Better', highlight: 'outcomes', description: 'Attractive individuals are more likely to win civil cases and receive larger settlements.', source: 'Journal of Legal Studies, 2020' },
  ],
  Influence: [
    { title: 'More', highlight: 'persuasive', description: 'Attractive people are significantly more effective at persuading others.', source: 'Journal of Consumer Research, 2019' },
    { title: 'Greater', highlight: 'leadership', description: 'Attractive individuals are more likely to be chosen as leaders and seen as competent.', source: 'The Leadership Quarterly, 2020' },
    { title: 'Wider', highlight: 'reach', description: 'Attractive content creators have larger followings and higher engagement rates.', source: 'Information Systems Research, 2021' },
  ],
  Happiness: [
    { title: 'Higher', highlight: 'self-esteem', description: 'Feeling attractive is strongly correlated with overall self-esteem and confidence.', source: 'Journal of Happiness Studies, 2019' },
    { title: 'Better', highlight: 'mood', description: 'People report better daily mood when they feel good about their appearance.', source: 'Psychology of Well-Being, 2020' },
    { title: 'Life', highlight: 'satisfaction', description: 'Physical attractiveness is a significant predictor of overall life satisfaction.', source: 'Social Indicators Research, 2021' },
  ],
}

export function ResearchStats() {
  const [activeCategory, setActiveCategory] = useState('Health')

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-12"
        >
          <h2
            className="text-[1.75rem] md:text-[2.25rem] lg:text-[2.75rem] leading-[1.15] tracking-[-0.02em] text-[#111]"
            style={{ fontWeight: 450 }}
          >
            Studies indicate that your appearance affects more than you might think,{' '}
            <span className="text-black/30">from your professional success to your dating life.</span>
          </h2>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-[13px] rounded-full transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-[#111] text-white'
                  : 'bg-[#f5f5f5] text-black/60 hover:bg-[#eee]'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Research Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {researchData[activeCategory]?.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#fafafa] rounded-xl p-4 md:p-5 flex flex-col"
              >
                <h3 className="text-[18px] text-[#111] mb-3" style={{ fontWeight: 450 }}>
                  {item.title} <span className="text-black/40">{item.highlight}</span>
                </h3>
                <p className="text-[14px] text-black/50 leading-relaxed flex-1 mb-4">
                  {item.description}
                </p>
                <p className="text-[11px] text-black/30">
                  {item.source}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
