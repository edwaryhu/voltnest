import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Jake Morrison',
    role: 'Adventure Photographer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    rating: 5,
    text: 'The Pro 2000 kept my camera gear and laptop running in Patagonia. Absolute game-changer.',
    product: 'Pro 2000',
  },
  {
    id: 2,
    name: 'Sarah Chen',
    role: 'Van Life Creator',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    rating: 5,
    text: 'Living full-time in my van, reliable power is everything. VoltNest delivers every single day.',
    product: 'Pro 3000',
  },
  {
    id: 3,
    name: 'Marcus Williams',
    role: 'Emergency Prep Specialist',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
    rating: 5,
    text: 'After Hurricane Ian, our VoltNest kept the fridge running for 3 days. Essential equipment.',
    product: 'Pro 2000',
  },
  {
    id: 4,
    name: 'Emily Parker',
    role: 'Event Planner',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
    rating: 5,
    text: 'Powering DJ equipment at remote venues is now effortless. Silent, reliable, professional.',
    product: 'Pro 3000',
  },
]

const stats = [
  { value: '4.9/5', label: 'Rating' },
  { value: '50K+', label: 'Customers' },
  { value: '98%', label: 'Recommend' },
]

export default function Testimonials() {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header + Stats Row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6 mb-8 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-xs sm:text-sm font-mono text-sunset-500 tracking-wider mb-2">
              TESTIMONIALS
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              Stories from the <span className="text-gradient">Field</span>
            </h2>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex gap-6 sm:gap-8"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-lg sm:text-xl font-display font-bold text-sunset-500">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-4 sm:p-5 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 flex flex-col"
            >
              {/* Quote */}
              <Quote className="w-6 h-6 text-sunset-300 mb-3" />

              {/* Rating */}
              <div className="flex gap-0.5 mb-3">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-sunset-400 fill-sunset-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4">
                "{item.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 text-sm truncate">{item.name}</div>
                  <div className="text-xs text-gray-500 truncate">{item.role}</div>
                </div>
                <div className="text-xs text-sunset-500 font-medium">{item.product}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
