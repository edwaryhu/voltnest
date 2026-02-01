import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Battery, Zap, Sun, Weight, Clock } from 'lucide-react'

const categories = [
  { id: 'power-stations', label: 'Power Stations' },
  { id: 'solar-panels', label: 'Solar Panels' },
  { id: 'bundles', label: 'Bundles' },
]

const products = {
  'power-stations': [
    {
      id: 1,
      name: 'VoltNest Pro 1000',
      tagline: 'Compact Powerhouse',
      price: '$899',
      originalPrice: '$999',
      image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/vt-1.jpg?v=1769946476',
      specs: [
        { icon: Battery, label: '1024Wh', desc: 'Capacity' },
        { icon: Zap, label: '1200W', desc: 'Output' },
        { icon: Weight, label: '12kg', desc: 'Weight' },
      ],
      badge: null,
    },
    {
      id: 2,
      name: 'VoltNest Pro 2000',
      tagline: 'Best Seller',
      price: '$1,499',
      originalPrice: '$1,699',
      image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/vt-2.jpg?v=1769946614',
      specs: [
        { icon: Battery, label: '2048Wh', desc: 'Capacity' },
        { icon: Zap, label: '2200W', desc: 'Output' },
        { icon: Weight, label: '21kg', desc: 'Weight' },
      ],
      badge: 'BEST SELLER',
    },
    {
      id: 3,
      name: 'VoltNest Pro 3000',
      tagline: 'Ultimate Power',
      price: '$2,199',
      originalPrice: '$2,499',
      image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/vt-3.jpg?v=1769946614',
      specs: [
        { icon: Battery, label: '3072Wh', desc: 'Capacity' },
        { icon: Zap, label: '3000W', desc: 'Output' },
        { icon: Weight, label: '32kg', desc: 'Weight' },
      ],
      badge: 'NEW',
    },
  ],
  'solar-panels': [
    {
      id: 4,
      name: 'SunFold 100',
      tagline: 'Ultra Portable',
      price: '$249',
      originalPrice: '$299',
      image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/VoltNex-pp1.png?v=1769943132',
      specs: [
        { icon: Sun, label: '100W', desc: 'Power' },
        { icon: Weight, label: '3.5kg', desc: 'Weight' },
        { icon: Clock, label: '23%', desc: 'Efficiency' },
      ],
      badge: null,
    },
    {
      id: 5,
      name: 'SunFold 200',
      tagline: 'Perfect Balance',
      price: '$399',
      originalPrice: '$449',
      image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/VoltNex-pp2.png?v=1769943131',
      specs: [
        { icon: Sun, label: '200W', desc: 'Power' },
        { icon: Weight, label: '6.8kg', desc: 'Weight' },
        { icon: Clock, label: '23.5%', desc: 'Efficiency' },
      ],
      badge: 'BEST SELLER',
    },
    {
      id: 6,
      name: 'SunFold 400',
      tagline: 'Maximum Output',
      price: '$699',
      originalPrice: '$799',
      image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/VoltNex-pp3.png?v=1769943131',
      specs: [
        { icon: Sun, label: '400W', desc: 'Power' },
        { icon: Weight, label: '13kg', desc: 'Weight' },
        { icon: Clock, label: '24%', desc: 'Efficiency' },
      ],
      badge: null,
    },
  ],
  bundles: [
    {
      id: 7,
      name: 'Explorer Bundle',
      tagline: 'Pro 1000 + SunFold 100',
      price: '$1,049',
      originalPrice: '$1,298',
      image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/VoltNex-pp1.png?v=1769943132',
      specs: [
        { icon: Battery, label: '1024Wh', desc: 'Capacity' },
        { icon: Sun, label: '100W', desc: 'Solar' },
        { icon: Zap, label: 'Save $249', desc: 'Bundle' },
      ],
      badge: 'SAVE 19%',
    },
    {
      id: 8,
      name: 'Adventure Bundle',
      tagline: 'Pro 2000 + SunFold 200',
      price: '$1,749',
      originalPrice: '$2,148',
      image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/VoltNex-pp2.png?v=1769943131',
      specs: [
        { icon: Battery, label: '2048Wh', desc: 'Capacity' },
        { icon: Sun, label: '200W', desc: 'Solar' },
        { icon: Zap, label: 'Save $399', desc: 'Bundle' },
      ],
      badge: 'BEST VALUE',
    },
    {
      id: 9,
      name: 'Ultimate Bundle',
      tagline: 'Pro 3000 + SunFold 400',
      price: '$2,649',
      originalPrice: '$3,298',
      image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/VoltNex-pp3.png?v=1769943131',
      specs: [
        { icon: Battery, label: '3072Wh', desc: 'Capacity' },
        { icon: Sun, label: '400W', desc: 'Solar' },
        { icon: Zap, label: 'Save $649', desc: 'Bundle' },
      ],
      badge: 'SAVE 20%',
    },
  ],
}

export default function ProductShowcase() {
  const [activeCategory, setActiveCategory] = useState('power-stations')

  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="inline-block text-xs sm:text-sm font-mono text-sunset-400 tracking-wider mb-3 sm:mb-4">
            OUR PRODUCTS
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-sand-100 mb-3 sm:mb-4">
            Built for the <span className="text-gradient">Untamed</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-sand-400 max-w-2xl mx-auto px-2">
            Whether you're camping under the stars or preparing for emergencies,
            our gear delivers reliable power when you need it most.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-sunset-500 text-white'
                  : 'bg-white/5 text-sand-300 hover:bg-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
          >
            {products[activeCategory].map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative glass-card overflow-hidden"
              >
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-4 left-4 z-10 bg-sunset-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {product.badge}
                  </div>
                )}

                {/* Image */}
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night-400 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="text-xs text-sunset-400 font-medium">{product.tagline}</span>
                  <h3 className="font-display text-xl font-bold text-sand-100 mt-1 mb-4">{product.name}</h3>

                  {/* Specs */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {product.specs.map((spec, i) => (
                      <div key={i} className="text-center">
                        <spec.icon className="w-5 h-5 mx-auto text-sunset-400 mb-1" />
                        <div className="text-sm font-semibold text-sand-100">{spec.label}</div>
                        <div className="text-xs text-sand-400">{spec.desc}</div>
                      </div>
                    ))}
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-display font-bold text-sand-100">{product.price}</span>
                      <span className="ml-2 text-sm text-sand-400 line-through">{product.originalPrice}</span>
                    </div>
                    <button className="w-12 h-12 rounded-full bg-sunset-500 flex items-center justify-center hover:bg-sunset-400 transition-colors group-hover:scale-110">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a href="#" className="inline-flex items-center gap-2 text-sunset-400 font-semibold hover:gap-4 transition-all">
            View All Products <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
