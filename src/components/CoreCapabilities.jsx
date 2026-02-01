import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Battery, Zap, Shield, Sun, Cpu } from 'lucide-react'

const capabilities = [
  {
    id: 1,
    icon: Battery,
    title: 'Extended Runtime',
    subtitle: 'LiFePO4 Technology',
    value: '3500+',
    unit: 'Cycle Life',
    description: 'Our advanced LiFePO4 battery cells deliver over 3,500 charge cycles at 80% capacity — that\'s 10+ years of reliable daily use.',
    color: 'from-[#0071E3] to-[#005BB6]',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80',
  },
  {
    id: 2,
    icon: Zap,
    title: 'Lightning Charge',
    subtitle: 'X-Charge Technology',
    value: '1',
    unit: 'Hour to 80%',
    description: 'Proprietary X-Charge technology enables 0-80% charging in just 1 hour. Compatible with wall outlet, car charger, and solar panels.',
    color: 'from-[#F8970C] to-[#C6790A]',
    image: 'https://images.unsplash.com/photo-1609921141835-710b7fa6e438?w=1200&q=80',
  },
  {
    id: 3,
    icon: Shield,
    title: 'Military Protection',
    subtitle: 'Safety Certified',
    value: 'IP65',
    unit: 'Rating',
    description: '12-layer safety protection system with military-grade durability. Certified by UL, FCC, and CE international standards.',
    color: 'from-[#207233] to-[#1A5B29]',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&q=80',
  },
  {
    id: 4,
    icon: Sun,
    title: 'Solar Optimized',
    subtitle: 'MPPT Controller',
    value: '99%',
    unit: 'Efficiency',
    description: 'Advanced MPPT controller maximizes solar energy harvest with 99% conversion efficiency. Real-time tracking adapts to changing conditions.',
    color: 'from-[#0071E3] to-[#004589]',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=80',
  },
  {
    id: 5,
    icon: Cpu,
    title: 'Smart BMS',
    subtitle: 'Intelligent Management',
    value: '24+',
    unit: 'Sensors',
    description: 'Our proprietary Battery Management System monitors every cell with 24+ sensors. Millisecond response time prevents overcharge and thermal issues.',
    color: 'from-[#005BB6] to-[#002E5C]',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80',
  },
]

export default function CoreCapabilities() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeCapability = capabilities[activeIndex]
  const ActiveIcon = activeCapability.icon

  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="inline-block text-xs sm:text-sm font-mono text-sunset-500 tracking-wider mb-3 sm:mb-4">
            CORE CAPABILITIES
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Engineered for <span className="text-gradient">Excellence</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-500 max-w-2xl mx-auto px-2">
            Every detail matters when you're miles from the nearest outlet.
            That's why we obsess over quality, performance, and reliability.
          </p>
        </motion.div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center"
          >
            {/* Left: Image */}
            <div className="relative">
              <div className="relative aspect-video sm:aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
                <img
                  src={activeCapability.image}
                  alt={activeCapability.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />

                {/* Floating Badge */}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${activeCapability.color} flex items-center justify-center shadow-lg`}>
                    <ActiveIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                  </div>
                </div>

                {/* Value Overlay */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                  <div className="bg-white/90 backdrop-blur-md p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl shadow-lg">
                    <div className="flex items-end justify-between gap-2">
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500 mb-0.5 sm:mb-1">{activeCapability.subtitle}</p>
                        <h3 className="font-display text-base sm:text-xl md:text-2xl font-bold text-gray-900">
                          {activeCapability.title}
                        </h3>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold bg-gradient-to-r ${activeCapability.color} bg-clip-text text-transparent`}>
                          {activeCapability.value}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500">{activeCapability.unit}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Glow Effect */}
              <div className={`absolute -inset-4 bg-gradient-to-r ${activeCapability.color} opacity-10 blur-3xl -z-10 rounded-3xl`} />
            </div>

            {/* Right: Details */}
            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              {/* Description */}
              <div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed"
                >
                  {activeCapability.description}
                </motion.p>
              </div>

              {/* All Features List */}
              <div className="space-y-2 sm:space-y-3">
                {capabilities.map((cap, index) => {
                  const Icon = cap.icon
                  const isActive = index === activeIndex
                  return (
                    <motion.button
                      key={cap.id}
                      onClick={() => setActiveIndex(index)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`w-full text-left p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'bg-sunset-50 border-2 border-sunset-200'
                          : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                          isActive
                            ? `bg-gradient-to-br ${cap.color}`
                            : 'bg-gray-200'
                        }`}>
                          <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                        </div>
                        <div className="flex-1">
                          <div className={`font-semibold transition-colors ${isActive ? 'text-gray-900' : 'text-gray-600'}`}>
                            {cap.title}
                          </div>
                        </div>
                        <div className={`text-xl font-display font-bold transition-colors ${
                          isActive ? 'text-sunset-500' : 'text-gray-400'
                        }`}>
                          {cap.value}
                        </div>

                        {/* Active Indicator */}
                        {isActive && (
                          <motion.div
                            layoutId="activeTab"
                            className={`w-1.5 h-8 rounded-full bg-gradient-to-b ${cap.color}`}
                          />
                        )}
                      </div>
                    </motion.button>
                  )
                })}
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <button className="btn-primary cursor-pointer">
                  Explore Technology
                </button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
