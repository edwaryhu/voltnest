import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, MessageCircle } from 'lucide-react'

const faqCategories = [
  { id: 'general', label: 'General' },
  { id: 'technical', label: 'Technical' },
  { id: 'shipping', label: 'Shipping & Returns' },
  { id: 'warranty', label: 'Warranty' },
]

const faqs = {
  general: [
    {
      q: 'What can I power with a VoltNest power station?',
      a: 'VoltNest power stations can run virtually any AC or DC device within their power rating. This includes laptops, phones, cameras, CPAP machines, mini-fridges, TVs, power tools, and even small appliances like coffee makers. Check the wattage of your devices against the output capacity of your unit.',
    },
    {
      q: 'How long does a VoltNest battery last?',
      a: 'Our LiFePO4 batteries are rated for 3,500+ charge cycles at 80% capacity. With daily use, that translates to over 10 years of reliable service. Even after 3,500 cycles, the battery retains significant capacity for lighter use.',
    },
    {
      q: 'Can I use VoltNest while it\'s charging?',
      a: 'Yes! All VoltNest units support pass-through charging, allowing you to use the unit while it charges from wall, car, or solar. The unit intelligently manages power distribution for optimal performance.',
    },
  ],
  technical: [
    {
      q: 'What\'s the difference between LiFePO4 and regular lithium-ion?',
      a: 'LiFePO4 (Lithium Iron Phosphate) batteries offer superior safety, longer lifespan (3,500+ vs 500 cycles), and better thermal stability compared to traditional lithium-ion. They\'re more environmentally friendly and don\'t contain cobalt.',
    },
    {
      q: 'How fast can I charge my VoltNest?',
      a: 'With X-Charge technology, our units charge from 0-80% in about 1 hour via AC wall outlet. Solar charging speeds depend on panel wattage and conditions — the Pro 2000 with dual 200W panels can fully charge in 4-5 hours of direct sunlight.',
    },
    {
      q: 'What is pure sine wave and why does it matter?',
      a: 'Pure sine wave inverters produce clean, grid-quality electricity identical to what comes from your wall outlet. This is essential for sensitive electronics like laptops, medical devices, and audio equipment. Cheaper modified sine wave inverters can damage these devices.',
    },
  ],
  shipping: [
    {
      q: 'How long does shipping take?',
      a: 'Orders ship within 1-2 business days. Standard shipping (free over $500) takes 5-7 business days. Express shipping (2-3 days) and Next-Day options are available at checkout. We ship from warehouses in CA, TX, and NJ for faster delivery.',
    },
    {
      q: 'Do you ship internationally?',
      a: 'Yes! We ship to 40+ countries worldwide. International shipping rates and delivery times are calculated at checkout. Note that customs duties and taxes may apply depending on your country.',
    },
    {
      q: 'What\'s your return policy?',
      a: 'We offer a 30-day no-questions-asked return policy. If you\'re not completely satisfied, return your unit in its original packaging for a full refund. We even cover return shipping costs.',
    },
  ],
  warranty: [
    {
      q: 'What does the warranty cover?',
      a: 'Our warranty covers all manufacturing defects, battery degradation below 80% capacity within the warranty period, and component failures under normal use. It does not cover physical damage, water damage, or unauthorized modifications.',
    },
    {
      q: 'How do I file a warranty claim?',
      a: 'Contact our support team via chat, email, or phone with your order number and a description of the issue. We\'ll troubleshoot remotely first, and if needed, arrange for repair or replacement. Most claims are resolved within 5 business days.',
    },
    {
      q: 'Can I extend my warranty?',
      a: 'Yes! You can purchase VoltNest Care, our extended warranty program, which adds an additional 3 years of coverage. This can be purchased within 30 days of your original order.',
    },
  ],
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('general')
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="inline-block text-xs sm:text-sm font-mono text-sunset-400 tracking-wider mb-3 sm:mb-4">
            FAQ
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-sand-100 mb-3 sm:mb-4">
            Got <span className="text-gradient">Questions?</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-sand-400 px-2">
            Find answers to common questions about VoltNest products.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-6 sm:mb-8"
        >
          {faqCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id)
                setOpenIndex(0)
              }}
              className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-sunset-500 text-white'
                  : 'bg-white/5 text-sand-300 hover:bg-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* FAQ Items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-3 sm:space-y-4"
          >
            {faqs[activeCategory].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card-light overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  className="w-full flex items-center justify-between p-4 sm:p-6 text-left"
                >
                  <span className="font-display font-semibold text-sm sm:text-base md:text-lg text-sand-100 pr-3 sm:pr-4">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    openIndex === index ? 'bg-sunset-500' : 'bg-white/10'
                  }`}>
                    {openIndex === index ? (
                      <Minus className="w-4 h-4 text-white" />
                    ) : (
                      <Plus className="w-4 h-4 text-sand-300" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-sand-400 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-sand-400 mb-4">Still have questions?</p>
          <button className="inline-flex items-center gap-2 btn-secondary">
            <MessageCircle size={18} />
            Chat with Us
          </button>
        </motion.div>
      </div>
    </section>
  )
}
