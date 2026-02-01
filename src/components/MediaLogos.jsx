import { motion } from 'framer-motion'
import { Award, Star } from 'lucide-react'

const mediaQuotes = [
  {
    outlet: 'Wired',
    quote: 'The best portable power station we\'ve ever tested.',
    logo: 'WIRED',
  },
  {
    outlet: 'Gear Patrol',
    quote: 'A game-changer for off-grid adventurers.',
    logo: 'GEAR PATROL',
  },
  {
    outlet: 'Outside Magazine',
    quote: 'Our editors\' top pick for overlanding.',
    logo: 'OUTSIDE',
  },
]

const logos = [
  'Forbes', 'TechCrunch', 'The Verge', 'Wired', 'CNET', 'Engadget', 'Outside', 'Gear Patrol'
]

export default function MediaLogos() {
  return (
    <section className="section-padding bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sm font-mono text-sunset-500 tracking-wider mb-4">
            MEDIA & RECOGNITION
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">
            Trusted by <span className="text-gradient">Industry Leaders</span>
          </h2>
        </motion.div>

        {/* Featured Quotes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {mediaQuotes.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-sunset-100 transition-all text-center group"
            >
              <div className="text-xl font-display font-bold text-gray-300 mb-4 tracking-widest group-hover:text-sunset-400 transition-colors">
                {item.logo}
              </div>
              <blockquote className="text-gray-600 italic leading-relaxed">
                "{item.quote}"
              </blockquote>
            </motion.div>
          ))}
        </motion.div>

        {/* As Seen In */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-gray-400 tracking-wider mb-8 block">
            AS FEATURED IN
          </span>

          {/* Logo Carousel */}
          <div className="relative overflow-hidden py-4">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="flex gap-16 whitespace-nowrap"
            >
              {[...logos, ...logos].map((logo, index) => (
                <div
                  key={index}
                  className="text-2xl font-display font-bold text-gray-300 hover:text-sunset-500 transition-colors cursor-pointer"
                >
                  {logo}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Awards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-10 md:p-12"
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-sm font-mono text-sunset-400 tracking-wider mb-3">
              <Award size={16} />
              AWARD WINNING DESIGN
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white">
              Recognized for Excellence
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: 'Red Dot Design Award', year: '2025', color: 'from-red-500 to-red-600' },
              { name: 'CES Innovation Award', year: '2025', color: 'from-blue-500 to-blue-600' },
              { name: 'iF Design Award', year: '2024', color: 'from-amber-500 to-orange-500' },
              { name: 'Good Design Award', year: '2024', color: 'from-emerald-500 to-green-600' },
            ].map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-all group cursor-pointer"
              >
                <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br ${award.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <Star className="w-6 h-6 text-white" fill="white" />
                </div>
                <div className="font-semibold text-white text-sm mb-1">{award.name}</div>
                <div className="text-xs text-gray-400">{award.year}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
