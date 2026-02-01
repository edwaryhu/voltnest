import { motion } from 'framer-motion'
import { Zap, Shield, Sun, Smartphone, RefreshCw, Leaf } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast Charging',
    description: 'Recharge from 0-80% in just 1 hour with our proprietary X-Charge technology. Wall, car, or solar — your choice.',
    gradient: 'from-sunset-400 to-sunset-600',
  },
  {
    icon: Shield,
    title: '10-Year Warranty',
    description: 'We stand behind our products. Every VoltNest comes with industry-leading protection and lifetime support.',
    gradient: 'from-blue-400 to-blue-600',
  },
  {
    icon: Sun,
    title: 'Solar Optimized',
    description: 'Advanced MPPT controllers maximize solar input efficiency up to 99%. Harness every ray of sunshine.',
    gradient: 'from-copper-400 to-copper-600',
  },
  {
    icon: Smartphone,
    title: 'Smart App Control',
    description: 'Monitor power levels, control outputs, and track energy usage in real-time from our intuitive mobile app.',
    gradient: 'from-purple-400 to-purple-600',
  },
  {
    icon: RefreshCw,
    title: '3500+ Cycle Life',
    description: 'LiFePO4 batteries deliver over 3,500 charge cycles at 80% capacity. Built to last a decade.',
    gradient: 'from-green-400 to-green-600',
  },
  {
    icon: Leaf,
    title: 'Carbon Neutral',
    description: 'Every purchase funds renewable energy projects. Go off-grid without leaving a footprint.',
    gradient: 'from-teal-400 to-teal-600',
  },
]

export default function Features() {
  return (
    <section className="section-padding bg-gradient-to-b from-night-500 via-night-400 to-night-500">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-mono text-sunset-400 tracking-wider mb-4">
            WHY VOLTNEST
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-sand-100 mb-4">
            Engineered for <span className="text-gradient">Excellence</span>
          </h2>
          <p className="text-lg text-sand-400 max-w-2xl mx-auto">
            Every detail matters when you're miles from the nearest outlet.
            That's why we obsess over quality, performance, and reliability.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group relative glass-card-light p-8 hover:bg-white/10 transition-all duration-300"
            >
              {/* Hover Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />

              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-bold text-sand-100 mb-3 group-hover:text-sunset-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-sand-400 leading-relaxed">
                {feature.description}
              </p>

              {/* Corner Accent */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${feature.gradient} opacity-5 rounded-bl-[80px]`} />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a href="#" className="btn-primary inline-flex items-center gap-2">
            Explore Technology
            <Zap size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
