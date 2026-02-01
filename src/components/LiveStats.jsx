import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Zap, Sun, Leaf, Users } from 'lucide-react'

const stats = [
  {
    icon: Zap,
    value: 2847562,
    suffix: 'kWh',
    label: 'Clean Energy Delivered',
    color: 'from-sunset-400 to-sunset-600',
  },
  {
    icon: Sun,
    value: 158934,
    suffix: '',
    label: 'Solar Panels Deployed',
    color: 'from-copper-400 to-copper-600',
  },
  {
    icon: Leaf,
    value: 1247,
    suffix: 'tons',
    label: 'CO₂ Offset This Year',
    color: 'from-green-400 to-green-600',
  },
  {
    icon: Users,
    value: 52000,
    suffix: '+',
    label: 'Happy Customers',
    color: 'from-blue-400 to-blue-600',
  },
]

function AnimatedCounter({ value, suffix, inView }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return

    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value, inView])

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export default function LiveStats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-16 overflow-hidden">
      {/* Background Line */}
      <div className="absolute inset-0 flex items-center">
        <div className="w-full glow-line" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="glass-card p-8 md:p-12">
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-2 mb-4"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm font-mono text-green-400">LIVE IMPACT TRACKER</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-2xl md:text-3xl font-bold text-sand-100"
            >
              Powering a Cleaner Future, Together
            </motion.h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <div className="font-display text-3xl md:text-4xl font-bold text-sand-100 mb-1">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={isInView} />
                </div>
                <div className="text-sm text-sand-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
