import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Battery, Cpu, Shield, Thermometer, Waves, Gauge } from 'lucide-react'

const techFeatures = [
  {
    id: 'battery',
    icon: Battery,
    title: 'LiFePO4 Battery',
    subtitle: 'Next-Gen Chemistry',
    description: 'Our Lithium Iron Phosphate cells deliver 3,500+ cycles at 80% capacity — that\'s 10+ years of daily use. Safer, more stable, and longer-lasting than traditional lithium-ion.',
    stats: [
      { label: 'Cycle Life', value: '3,500+' },
      { label: 'Energy Density', value: '160Wh/kg' },
      { label: 'Self-Discharge', value: '<3%/month' },
    ],
    image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=600',
  },
  {
    id: 'inverter',
    icon: Waves,
    title: 'Pure Sine Wave',
    subtitle: 'Hospital-Grade Power',
    description: 'Our inverter outputs clean, pure sine wave electricity identical to grid power. Safe for sensitive electronics, medical devices, and precision equipment.',
    stats: [
      { label: 'THD', value: '<3%' },
      { label: 'Frequency', value: '50/60Hz' },
      { label: 'Efficiency', value: '>95%' },
    ],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
  },
  {
    id: 'bms',
    icon: Cpu,
    title: 'Smart BMS',
    subtitle: 'Intelligent Protection',
    description: 'Our proprietary Battery Management System monitors every cell in real-time, optimizing performance and preventing overcharge, over-discharge, and thermal runaway.',
    stats: [
      { label: 'Sensors', value: '24+' },
      { label: 'Response', value: '<1ms' },
      { label: 'Accuracy', value: '±0.1%' },
    ],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600',
  },
  {
    id: 'thermal',
    icon: Thermometer,
    title: 'Thermal Control',
    subtitle: 'All-Climate Ready',
    description: 'Dual fans with intelligent thermal management keep your unit operating efficiently from -4°F to 113°F. Go from desert heat to mountain cold.',
    stats: [
      { label: 'Operating Temp', value: '-20°C to 45°C' },
      { label: 'Noise Level', value: '<45dB' },
      { label: 'Airflow', value: 'Adaptive' },
    ],
    image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=600',
  },
  {
    id: 'mppt',
    icon: Gauge,
    title: 'MPPT Controller',
    subtitle: 'Maximum Solar Harvest',
    description: 'Our Maximum Power Point Tracking technology extracts up to 99% of available solar energy. Smart algorithms adapt to changing light conditions in real-time.',
    stats: [
      { label: 'Efficiency', value: '99%' },
      { label: 'Tracking Speed', value: '<1s' },
      { label: 'Voltage Range', value: '12-60V' },
    ],
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600',
  },
  {
    id: 'safety',
    icon: Shield,
    title: 'Safety Certified',
    subtitle: 'Tested & Trusted',
    description: 'Every VoltNest passes rigorous testing and carries UL, FCC, and CE certifications. Drop-tested, waterproof-rated, and built to military durability standards.',
    stats: [
      { label: 'Certifications', value: 'UL, FCC, CE' },
      { label: 'IP Rating', value: 'IP65' },
      { label: 'Drop Tested', value: '1 meter' },
    ],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600',
  },
]

export default function TechSpecs() {
  const [activeTech, setActiveTech] = useState(techFeatures[0])

  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-mono text-sunset-400 tracking-wider mb-4">
            TECHNOLOGY
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-sand-100 mb-4">
            The Science of <span className="text-gradient">Reliable Power</span>
          </h2>
          <p className="text-lg text-sand-400 max-w-2xl mx-auto">
            Dive deep into the engineering that makes VoltNest the most trusted name in portable power.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[300px,1fr] gap-8">
          {/* Tech Nav */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            {techFeatures.map((tech) => (
              <button
                key={tech.id}
                onClick={() => setActiveTech(tech)}
                className={`w-full text-left p-4 rounded-2xl transition-all flex items-center gap-4 ${
                  activeTech.id === tech.id
                    ? 'bg-sunset-500/20 border border-sunset-500/30'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  activeTech.id === tech.id
                    ? 'bg-gradient-to-br from-sunset-400 to-sunset-600'
                    : 'bg-white/10'
                }`}>
                  <tech.icon className={`w-6 h-6 ${activeTech.id === tech.id ? 'text-white' : 'text-sand-400'}`} />
                </div>
                <div>
                  <div className={`font-semibold ${activeTech.id === tech.id ? 'text-sand-100' : 'text-sand-300'}`}>
                    {tech.title}
                  </div>
                  <div className="text-sm text-sand-400">{tech.subtitle}</div>
                </div>
              </button>
            ))}
          </motion.div>

          {/* Tech Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTech.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="glass-card overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-64 md:h-80">
                <img
                  src={activeTech.image}
                  alt={activeTech.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night-400 via-night-400/50 to-transparent" />

                {/* Title Overlay */}
                <div className="absolute bottom-6 left-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sunset-400 to-sunset-600 flex items-center justify-center">
                      <activeTech.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-bold text-sand-100">{activeTech.title}</h3>
                      <p className="text-sm text-sunset-400">{activeTech.subtitle}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <p className="text-lg text-sand-300 leading-relaxed mb-8">
                  {activeTech.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6">
                  {activeTech.stats.map((stat, i) => (
                    <div key={i} className="text-center p-4 bg-white/5 rounded-xl">
                      <div className="text-2xl font-display font-bold text-sunset-400 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-sand-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
