import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Tent, Home, Car, Briefcase, Camera, Music } from 'lucide-react'

const scenarios = [
  {
    id: 'camping',
    icon: Tent,
    title: 'Camping & Outdoors',
    description: 'Power your campsite essentials — lights, coolers, phones, and even portable stoves. Stay connected in the wilderness.',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800',
    devices: ['Phone', 'Laptop', 'Cooler', 'Lights', 'Drone'],
    runtime: '48+ hours',
  },
  {
    id: 'home',
    icon: Home,
    title: 'Home Backup',
    description: 'Keep your essentials running during outages — refrigerator, medical devices, WiFi, and more. Peace of mind, always.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    devices: ['Fridge', 'WiFi', 'Lights', 'TV', 'CPAP'],
    runtime: '24+ hours',
  },
  {
    id: 'vanlife',
    icon: Car,
    title: 'Van Life & RV',
    description: 'Take your home on wheels. Power everything from coffee makers to AC units while living life on the road.',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
    devices: ['Coffee Maker', 'Mini Fridge', 'Fan', 'Devices', 'Lights'],
    runtime: '36+ hours',
  },
  {
    id: 'work',
    icon: Briefcase,
    title: 'Remote Work',
    description: 'Set up your office anywhere. Reliable power for laptops, monitors, and all your productivity tools.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
    devices: ['MacBook', 'Monitor', 'WiFi Hotspot', 'Phone', 'Tablet'],
    runtime: '16+ hours',
  },
  {
    id: 'photo',
    icon: Camera,
    title: 'Photography & Film',
    description: 'Keep cameras, drones, and lighting gear charged on location. Never miss the perfect shot.',
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800',
    devices: ['Camera', 'Drone', 'LED Panels', 'Laptop', 'Hard Drives'],
    runtime: '20+ hours',
  },
  {
    id: 'events',
    icon: Music,
    title: 'Events & Parties',
    description: 'Power speakers, projectors, and decorations for off-grid celebrations. The party goes on.',
    image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800',
    devices: ['Speakers', 'Projector', 'String Lights', 'Blender', 'Fog Machine'],
    runtime: '12+ hours',
  },
]

export default function Scenarios() {
  const [activeScenario, setActiveScenario] = useState(scenarios[0])

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sm font-mono text-sunset-500 tracking-wider mb-4">
            USE CASES
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Power Every <span className="text-gradient">Adventure</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            From weekend getaways to emergency preparedness, VoltNest adapts to your lifestyle.
          </p>
        </motion.div>

        {/* Scenario Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => setActiveScenario(scenario)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                activeScenario.id === scenario.id
                  ? 'bg-sunset-500 text-white shadow-lg shadow-sunset-500/25'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <scenario.icon size={18} />
              {scenario.title}
            </button>
          ))}
        </motion.div>

        {/* Scenario Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScenario.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-2 gap-8 items-center"
          >
            {/* Image */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
              <img
                src={activeScenario.image}
                alt={activeScenario.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />

              {/* Runtime Badge */}
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md rounded-2xl px-4 py-3 shadow-lg">
                <div className="text-xs text-gray-500 mb-1">Estimated Runtime</div>
                <div className="text-2xl font-display font-bold text-sunset-500">{activeScenario.runtime}</div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sunset-400 to-sunset-600 flex items-center justify-center">
                    <activeScenario.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-display text-3xl font-bold text-gray-900">
                    {activeScenario.title}
                  </h3>
                </div>
                <p className="text-lg text-gray-500 leading-relaxed">
                  {activeScenario.description}
                </p>
              </div>

              {/* Devices Grid */}
              <div>
                <h4 className="text-sm font-mono text-sunset-500 mb-4">POWER THESE DEVICES</h4>
                <div className="flex flex-wrap gap-3">
                  {activeScenario.devices.map((device, i) => (
                    <motion.span
                      key={device}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="px-4 py-2 bg-gray-100 border border-gray-200 rounded-full text-sm text-gray-700"
                    >
                      {device}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex gap-4">
                <button className="btn-primary cursor-pointer">Find Your Fit</button>
                <button className="btn-secondary cursor-pointer">See Runtime Calculator</button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
