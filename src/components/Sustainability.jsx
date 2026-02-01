import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Leaf, Recycle, TreePine, Droplet, Factory, Award } from 'lucide-react'

const commitments = [
  {
    icon: TreePine,
    value: '1M+',
    label: 'Trees Planted',
    desc: 'Through our partnership with One Tree Planted',
  },
  {
    icon: Factory,
    value: '100%',
    label: 'Renewable Factory',
    desc: 'Our facility runs entirely on solar power',
  },
  {
    icon: Recycle,
    value: '95%',
    label: 'Recyclable Materials',
    desc: 'Including battery recycling program',
  },
  {
    icon: Droplet,
    value: '0',
    label: 'Single-Use Plastic',
    desc: 'All packaging is plastic-free',
  },
]

export default function Sustainability() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="section-padding bg-gradient-to-b from-green-50 via-emerald-50/50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-green-600 tracking-wider mb-3 sm:mb-4">
            <Leaf size={14} className="sm:w-4 sm:h-4" />
            OUR COMMITMENT
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Power That <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">Protects</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-500 max-w-2xl mx-auto px-2">
            We believe clean energy shouldn't just power your devices — it should power a cleaner planet.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-10 sm:mb-16">
          {commitments.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 h-full border border-green-100 shadow-sm hover:shadow-md hover:border-green-200 transition-all text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mx-auto mb-3 sm:mb-4 md:mb-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-gray-900 mb-1 sm:mb-2">
                  {item.value}
                </div>
                <div className="font-semibold text-green-600 mb-1 sm:mb-2 text-sm sm:text-base">{item.label}</div>
                <div className="text-xs sm:text-sm text-gray-500">{item.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Carbon Neutral Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200"
              alt="Forest"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/80 to-gray-900/70" />
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 p-6 sm:p-8 md:p-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-10 h-10 text-green-400" />
                <span className="text-sm font-mono text-green-400 tracking-wider">
                  CERTIFIED CARBON NEUTRAL
                </span>
              </div>
              <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                Every Purchase Plants a Tree
              </h3>
              <p className="text-lg text-gray-300 mb-6">
                For every VoltNest product sold, we plant a tree in partnership with One Tree Planted.
                So far, our community has helped plant over 1 million trees worldwide.
              </p>
              <button className="px-6 py-3 rounded-full border-2 border-green-500/50 text-green-400 font-semibold hover:bg-green-500/10 hover:border-green-400 transition-all cursor-pointer">
                Learn About Our Impact
              </button>
            </div>

            <div className="flex justify-center">
              <motion.div
                animate={isInView ? { rotate: 360 } : {}}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="relative w-64 h-64"
              >
                {/* Circular Stats */}
                <svg className="w-full h-full" viewBox="0 0 200 200">
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="rgba(74, 222, 128, 0.1)"
                    strokeWidth="8"
                  />
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="url(#greenGradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray="565.48"
                    initial={{ strokeDashoffset: 565.48 }}
                    animate={isInView ? { strokeDashoffset: 0 } : {}}
                    transition={{ duration: 2, ease: 'easeOut' }}
                    transform="rotate(-90 100 100)"
                  />
                  <defs>
                    <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#4ade80" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <TreePine className="w-12 h-12 text-green-400 mb-2" />
                  <span className="text-4xl font-display font-bold text-white">1M+</span>
                  <span className="text-sm text-gray-400">Trees Planted</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
