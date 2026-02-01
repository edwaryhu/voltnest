import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion'
import { Zap, ChevronRight, ChevronDown, Check, Sun, Battery, Shield, Cpu, Home, Car, Mountain, Menu, X, ShoppingBag, ArrowRight, Play, Pause, Sparkles, Volume2, VolumeX } from 'lucide-react'

// ============================================
// DATA CONSTANTS
// ============================================

const NAV_ITEMS = [
  { id: 'highlights', label: 'Highlights' },
  { id: 'home-backup', label: 'Home Backup' },
  { id: 'saving-bills', label: 'Saving Bills' },
  { id: 'rv', label: 'RV' },
  { id: 'off-grid', label: 'Off-Grid' },
  { id: 'charging', label: 'Charging' },
  { id: 'tech-innovation', label: 'Tech Innovation' },
]

const FEATURE_HIGHLIGHTS = [
  {
    id: 1,
    title: '3840W Output',
    subtitle: 'Pure Sine Wave',
    image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/power-1.jpg?v=1769933667',
    description: 'Delivers clean, stable 3840W continuous power with 7680W surge capacity. Pure sine wave output protects sensitive electronics and medical equipment.',
    specs: ['3840W Continuous', '7680W Surge', 'Pure Sine Wave', '<3% THD']
  },
  {
    id: 2,
    title: '4000W Solar Input',
    subtitle: 'MPPT Technology',
    image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/a-solar-panel-in-a-farmhouse-garden-2026-01-09-08-42-13-utc.jpg?v=1769929695',
    description: 'Industry-leading solar charging with advanced MPPT controller. Achieve full charge in under 2 hours with optimal panel configuration.',
    specs: ['4000W Max Input', '99% MPPT Efficiency', '1.9hr Full Charge', 'Multi-Panel Support']
  },
  {
    id: 3,
    title: '2764Wh Capacity',
    subtitle: 'LiFePO4 Battery',
    image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/hydrogen-energy-house-have-solar-panels-and-wind-t-2026-01-09-00-41-53-utc.jpg?v=1769929695',
    description: 'High-density LiFePO4 cells provide exceptional energy storage with industry-leading 6000+ cycle lifespan and superior thermal stability.',
    specs: ['2764.8Wh', '6000+ Cycles', '10-Year Lifespan', 'BMS Protected']
  },
  {
    id: 4,
    title: 'Smart App Control',
    subtitle: 'Monitor Anywhere',
    image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/futuristic-smart-home-living-room-with-a-robotic-a-2026-01-11-11-05-21-utc.jpg?v=1769929694',
    description: 'Full control from your smartphone. Monitor energy usage, schedule charging, receive alerts, and optimize your power consumption remotely.',
    specs: ['iOS & Android', 'Real-time Stats', 'Remote Control', 'Usage Analytics']
  },
  {
    id: 5,
    title: 'EV Charging Ready',
    subtitle: 'Green Mobility',
    image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/charging-an-electric-car-in-home-sustainable-trans-2026-01-05-06-23-06-utc.jpg?v=1769929690',
    description: 'Seamlessly integrate with your electric vehicle charging. Use solar power to charge your EV during the day and reduce your carbon footprint.',
    specs: ['Level 2 Compatible', 'Solar Direct', 'Smart Scheduling', 'Cost Optimization']
  },
]

const BUNDLE_OPTIONS = [
  { id: 1, name: 'Npex 600', capacity: 2764.8, power: 3840, price: '$2,999' },
  { id: 2, name: 'Npex 600 + B300K', capacity: 5529.6, power: 3840, price: '$4,499' },
  { id: 3, name: 'Npex 600 + 2×B300K', capacity: 8294.4, power: 3840, price: '$5,999' },
  { id: 4, name: 'Npex 600 + 4×B300K', capacity: 13824, power: 3840, price: '$8,999' },
]

const CHARGING_METHODS = [
  { id: 1, title: 'Standard Solar', power: '2,400W', time: '80% in 40 min', icon: Sun },
  { id: 2, title: 'AC + Solar Dual', power: '3,840W', time: 'Full in 60 min', icon: Zap },
  { id: 3, title: 'Generator', power: '3,840W', time: 'Full in 65 min', icon: Battery },
  { id: 4, title: 'TurboBoost AC', power: '3,840W', time: '80% in 45 min', icon: Sparkles },
]

const RV_TABS = [
  { id: 1, title: 'Plug-and-Play Power', desc: 'With 6 AC outputs and Hub D1 mount, power all your DC devices seamlessly. Perfect for weekend getaways or extended road trips.', image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/power-3.jpg?v=1769933667' },
  { id: 2, title: 'Mobile Shore Power', desc: 'Features NEMA TT-30R shore power port for direct RV connection. No complicated setup required.', image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/power-4.jpg?v=1769933667' },
  { id: 3, title: 'Comfortable Living', desc: 'Power your air conditioner, microwave, washing machines, and ovens. Live comfortably anywhere.', image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/power-5.jpg?v=1769933667' },
]

const TECH_INNOVATIONS = [
  { id: 1, number: '01', badge: 'Ultracell Technology', title: '17-Year Lifespan', desc: '6,000+ cycles at 80% capacity. That\'s 2X longer than standard lithium batteries.', image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/hydrogen-energy-house-have-solar-panels-and-wind-t-2026-01-09-00-41-53-utc.jpg?v=1769929695' },
  { id: 2, number: '02', badge: 'Ultra Efficiency', title: '1/5 Self-Consumption', desc: 'Advanced power management reduces idle consumption to industry-leading levels.', image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/a-solar-panel-in-a-farmhouse-garden-2026-01-09-08-42-13-utc.jpg?v=1769929695' },
  { id: 3, number: '03', badge: 'PowerSense', title: 'Smart Adaptability', desc: 'Intelligent load detection and seamless power distribution across all connected devices.', image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/futuristic-smart-home-living-room-with-a-robotic-a-2026-01-11-11-05-21-utc.jpg?v=1769929694' },
  { id: 4, number: '04', badge: 'PowerArmor', title: 'Military-Grade Safety', desc: '12-layer circuit protection with thermal runaway prevention and auto-shutoff.', image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/charging-an-electric-car-in-home-sustainable-trans-2026-01-05-06-23-06-utc.jpg?v=1769929690' },
  { id: 5, number: '05', badge: 'BLUELIFE Ecosystem', title: 'Space-Efficient Design', desc: 'Compact modular design with stackable battery units and minimal footprint.', image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/residential-house-with-rooftop-covered-with-solar-2026-01-07-00-14-25-utc.jpg?v=1769933513' },
  { id: 6, number: '06', badge: 'Hot-Swap V2.0', title: 'Zero Downtime', desc: 'Swap batteries without interrupting power flow. Seamless expansion anytime.', image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/inverter-solar-panel-in-electrical-room-2026-01-09-06-47-14-utc.jpg?v=1769933513' },
  { id: 7, number: '07', badge: 'Dual Inverter', title: '120V & 240V Simultaneous', desc: 'Power standard household devices and high-power appliances all at once.', image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/man-electrician-wiring-inverter-and-electric-box-i-2026-01-07-01-00-58-utc.jpg?v=1769933516' },
]

const USER_FEATURES = [
  { title: 'AI-Powered OTA', icon: Cpu, desc: 'Smart updates' },
  { title: 'Enhanced EMC', icon: Shield, desc: 'Anti-interference' },
  { title: 'Ergonomic Build', icon: Home, desc: 'User-first design' },
  { title: 'Dust Filter', icon: Sun, desc: 'Detachable & clean' },
  { title: 'Flex Stacking', icon: Battery, desc: 'Modular setup' },
]

// ============================================
// ANIMATED COMPONENTS
// ============================================

// Animated Text Reveal
const AnimatedText = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Floating Orbs Background
const FloatingOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      animate={{
        x: [0, 100, 0],
        y: [0, -50, 0],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      className="absolute top-1/4 left-1/4 w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] lg:w-[600px] lg:h-[600px] rounded-full bg-gradient-to-br from-[#0071E3]/20 to-transparent blur-[60px] sm:blur-[90px] lg:blur-[120px]"
    />
    <motion.div
      animate={{
        x: [0, -80, 0],
        y: [0, 80, 0],
      }}
      transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      className="absolute bottom-1/4 right-1/4 w-[150px] h-[150px] sm:w-[300px] sm:h-[300px] lg:w-[500px] lg:h-[500px] rounded-full bg-gradient-to-br from-[#F8970C]/15 to-transparent blur-[50px] sm:blur-[75px] lg:blur-[100px]"
    />
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
      }}
      transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] sm:w-[500px] sm:h-[500px] lg:w-[800px] lg:h-[800px] rounded-full bg-gradient-to-br from-[#F8970C]/10 to-transparent blur-[75px] sm:blur-[100px] lg:blur-[150px]"
    />
  </div>
)

// Magnetic Button
const MagneticButton = ({ children, className = '', onClick }) => {
  const ref = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e) => {
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const x = (clientX - left - width / 2) * 0.15
    const y = (clientY - top - height / 2) * 0.15
    setPosition({ x, y })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      className={className}
    >
      {children}
    </motion.button>
  )
}

// Sticky SubNav
const StickyNav = ({ activeSection, isVisible }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-4 mt-4 bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 shadow-lg shadow-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F8970C] to-[#C6790A] flex items-center justify-center shadow-lg shadow-[#F8970C]/20 group-hover:shadow-[#F8970C]/40 transition-shadow">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className="font-display font-bold text-gray-900">Npex 600</span>
                <span className="text-xs text-gray-400 block -mt-0.5">by VoltNest</span>
              </div>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all cursor-pointer ${
                    activeSection === item.id
                      ? 'text-[#0071E3]'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute inset-0 bg-[#0071E3]/10 rounded-xl"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <button
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <Link to="/npex-600/product">
                <MagneticButton className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#F8970C] to-[#C6790A] text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-[#F8970C]/30 transition-all cursor-pointer">
                  <ShoppingBag size={16} />
                  Buy Now
                </MagneticButton>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-gray-100 overflow-hidden"
            >
              <div className="p-4 grid grid-cols-2 gap-2">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-4 py-3 text-sm font-medium rounded-xl transition-colors cursor-pointer ${
                      activeSection === item.id
                        ? 'bg-[#0071E3] text-white'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

// Parallax Section Wrapper
const ParallaxSection = ({ id, className = '', children, dark = false }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section
      id={id}
      ref={ref}
      className={`relative scroll-mt-24 overflow-hidden ${dark ? 'bg-[#0a1628]' : 'bg-white'} ${className}`}
    >
      {children}
    </section>
  )
}

// Feature Card with Image
const FeatureCard = ({ feature, index, onClick }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      onClick={onClick}
      className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-[#0071E3]/20 transition-all"
    >
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={feature.image}
          alt={feature.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <span className="text-xs font-mono text-[#F8970C] tracking-wider uppercase">{feature.subtitle}</span>
        <h4 className="font-display font-bold text-xl text-white mt-1 group-hover:text-[#F8970C] transition-colors">{feature.title}</h4>
      </div>

      {/* Hover indicator */}
      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowRight className="w-5 h-5 text-white" />
      </div>
    </motion.div>
  )
}

// Feature Modal
const FeatureModal = ({ feature, onClose }) => {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'auto'
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/40 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="aspect-square md:aspect-auto">
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <span className="text-xs font-mono text-[#0071E3] tracking-wider uppercase mb-2">{feature.subtitle}</span>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">{feature.title}</h3>
            <p className="text-gray-600 leading-relaxed mb-8">{feature.description}</p>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-3">
              {feature.specs.map((spec, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#F8970C]" />
                  <span className="text-sm font-medium text-gray-700">{spec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Flexible Charging Section with Tabs
const CHARGING_TABS = [
  {
    id: 1,
    title: 'Standard Solar Charging',
    power: '2,400W Max.',
    description: 'Charge to 80% in just 40 minutes, and 100% in 80 minutes.',
    image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/power-1.jpg?v=1769933667',
  },
  {
    id: 2,
    title: 'AC + Solar Dual Charging',
    power: '3,840W Max.',
    description: 'Combine AC and solar power for the fastest charging speed. Full charge in just 60 minutes.',
    image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/man-electrician-wiring-inverter-and-electric-box-i-2026-01-07-01-00-58-utc.jpg?v=1769933516',
  },
  {
    id: 3,
    title: '120V/240V Generator Charging',
    power: '3,840W Max.',
    description: 'Compatible with both 120V and 240V generators. Full charge in 65 minutes.',
    image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/inverter-solar-panel-in-electrical-room-2026-01-09-06-47-14-utc.jpg?v=1769933513',
  },
  {
    id: 4,
    title: 'TurboBoost AC Charging',
    power: '3,840W Max.',
    description: 'Ultra-fast wall charging with TurboBoost technology. 80% in 45 minutes, 100% in 65 minutes.',
    image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/power-2.jpg?v=1769933667',
  },
]

const FlexibleChargingSection = () => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section className="py-16 sm:py-20 lg:py-32 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 sm:mb-8 lg:mb-10">
              Flexible to Charge
              <br />
              Efficient to Power
            </h2>

            {/* Charging Methods List */}
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {CHARGING_TABS.map((tab, index) => (
                <div
                  key={tab.id}
                  onClick={() => setActiveTab(index)}
                  className={`border-l-4 pl-3 sm:pl-5 py-2 cursor-pointer transition-all duration-300 ${
                    activeTab === index
                      ? 'border-[#0071E3]'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <p className={`font-semibold text-base sm:text-lg transition-colors ${
                    activeTab === index ? 'text-white' : 'text-white/50 hover:text-white/70'
                  }`}>
                    {index + 1}. {tab.title}
                  </p>

                  <AnimatePresence>
                    {activeTab === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-[#0071E3] font-semibold mt-2">{tab.power}</p>
                        <p className="text-white/60 text-sm mt-1">{tab.description}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Note */}
            <p className="text-[#0071E3]/60 text-xs">
              Note: Data tested by VoltNest Labs, actual charging times may vary.
            </p>
          </motion.div>

          {/* Right - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="aspect-[4/3] rounded-2xl overflow-hidden"
              >
                <img
                  src={CHARGING_TABS[activeTab].image}
                  alt={CHARGING_TABS[activeTab].title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Scroll Video Section - Sticky scroll with 3 panels
const SCROLL_PANELS = [
  {
    id: 1,
    label: 'Partial Home Backup',
    title: 'Scalable Power Solution\nCovering All Needs',
    subtitle: 'Industry-First 12kW Bypass for EV Charging',
    description: 'Reduce electricity costs while ensuring seamless power. It instantly switches to backup mode during outages to keep essentials like your fridge, router, and CPAP running smoothly.',
  },
  {
    id: 2,
    label: 'Whole Home Backup',
    title: 'Complete Home\nEnergy Independence',
    subtitle: 'Power Your Entire Home with Confidence',
    description: 'Expand your system to cover every circuit in your home. From HVAC to kitchen appliances, enjoy uninterrupted power during any outage with automatic switchover.',
  },
  {
    id: 3,
    label: 'Off-Grid Living',
    title: 'Freedom Beyond\nThe Grid',
    subtitle: 'Sustainable Energy Anywhere You Go',
    description: 'Whether it\'s a remote cabin or extended camping trip, combine solar panels with your Npex 600 for true energy independence. Live comfortably off-grid without compromise.',
  },
]

const ScrollVideoSection = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  const [activePanel, setActivePanel] = useState(0)

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (value) => {
      const panelIndex = Math.min(Math.floor(value * 3), 2)
      setActivePanel(panelIndex)
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            src="https://cdn.shopify.com/videos/c/o/v/9d312d5112614398827a5f7b68ad5937.mp4"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/90 via-[#0a1628]/70 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex items-center">
          <div className="max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePanel}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {/* Label */}
                <span className="inline-block text-[#F8970C] font-display font-semibold text-lg mb-4">
                  {SCROLL_PANELS[activePanel].label}
                </span>

                {/* Title */}
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 whitespace-pre-line leading-tight">
                  {SCROLL_PANELS[activePanel].title}
                </h2>

                {/* Subtitle */}
                <p className="text-white font-semibold text-lg mb-4">
                  {SCROLL_PANELS[activePanel].subtitle}
                </p>

                {/* Description */}
                <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-lg">
                  {SCROLL_PANELS[activePanel].description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Progress Indicators */}
            <div className="flex gap-3 mt-10">
              {SCROLL_PANELS.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    index === activePanel
                      ? 'w-12 bg-[#0071E3]'
                      : 'w-6 bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        >
          <span className="text-xs text-white/40 uppercase tracking-[0.2em]">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-5 h-5 text-white/40" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function Apex300Landing() {
  const [activeSection, setActiveSection] = useState('')
  const [navVisible, setNavVisible] = useState(false)
  const [selectedBundle, setSelectedBundle] = useState(1)
  const [activeRvTab, setActiveRvTab] = useState(1)
  const [activeTechIndex, setActiveTechIndex] = useState(0)
  const [differential, setDifferential] = useState('')
  const [savings, setSavings] = useState(0)
  const [email, setEmail] = useState('')
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const [isVideoMuted, setIsVideoMuted] = useState(true)
  const [selectedFeature, setSelectedFeature] = useState(null)
  const heroRef = useRef(null)
  const videoRef = useRef(null)

  // Video controls
  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsVideoPlaying(!isVideoPlaying)
    }
  }

  const toggleVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted
      setIsVideoMuted(!isVideoMuted)
    }
  }

  // Scrollspy
  useEffect(() => {
    const observers = []
    const options = { rootMargin: '-30% 0px -70% 0px', threshold: 0 }

    NAV_ITEMS.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveSection(id)
          })
        }, options)
        observer.observe(element)
        observers.push(observer)
      }
    })

    return () => observers.forEach((obs) => obs.disconnect())
  }, [])

  // Sticky nav visibility
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom
        setNavVisible(heroBottom < 80)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate savings
  const calculateSavings = () => {
    const bundle = BUNDLE_OPTIONS.find((b) => b.id === selectedBundle)
    if (!bundle || !differential) return setSavings(0)
    const capacityKwh = bundle.capacity / 1000
    const annual = capacityKwh * 0.85 * (parseFloat(differential) / 100) * 365
    setSavings(Math.max(0, Math.round(annual)))
  }

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <StickyNav activeSection={activeSection} isVisible={navVisible} />

      {/* ========== HERO ========== */}
      <header ref={heroRef} className="relative h-screen overflow-hidden">
        {/* Background Video - Full visible */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="https://cdn.shopify.com/videos/c/o/v/dc3c158ff613436c82a7a407ac1fba78.mov"
        />

        {/* Subtle gradient for text readability - only on left */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-xl">
            {/* Badge */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[#0071E3] text-sm font-semibold tracking-widest uppercase mb-4"
            >
              Npex 600 Series
            </motion.p>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.05] mb-4 sm:mb-6"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
            >
              Start Simple,
              <br />
              Scale Smart
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg text-white/80 leading-relaxed mb-6 sm:mb-8"
              style={{ textShadow: '0 1px 10px rgba(0,0,0,0.3)' }}
            >
              The ultimate modular power solution for home backup, RV adventures, and off-grid living.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-10"
            >
              <Link to="/npex-600/product">
                <button className="px-6 sm:px-8 py-3 sm:py-4 bg-[#F8970C] hover:bg-[#C6790A] text-white font-semibold rounded-full transition-all cursor-pointer text-sm sm:text-base">
                  Buy Now — $2,999
                </button>
              </Link>
              <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold rounded-full transition-all cursor-pointer text-sm sm:text-base">
                Learn More
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex gap-4 sm:gap-6 md:gap-8"
            >
              {[
                { value: '3840W', label: 'Output' },
                { value: '2764Wh', label: 'Capacity' },
                { value: '17yr', label: 'Lifespan' },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="font-display text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white" style={{ textShadow: '0 1px 10px rgba(0,0,0,0.3)' }}>{stat.value}</div>
                  <div className="text-xs sm:text-sm text-white/60">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-8 left-0 right-0 z-20 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Scroll hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="flex items-center gap-3"
            >
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-5 h-8 border-2 border-white/40 rounded-full flex justify-center pt-1.5"
              >
                <div className="w-1 h-1.5 bg-white/60 rounded-full" />
              </motion.div>
              <span className="text-xs text-white/50 uppercase tracking-wider hidden sm:block">Scroll</span>
            </motion.div>

            {/* Video controls */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center gap-2"
            >
              <button
                onClick={toggleVideoPlay}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all cursor-pointer"
                aria-label={isVideoPlaying ? 'Pause' : 'Play'}
              >
                {isVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={toggleVideoMute}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all cursor-pointer"
                aria-label={isVideoMuted ? 'Unmute' : 'Mute'}
              >
                {isVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </motion.div>
          </div>
        </div>
      </header>

      {/* ========== HIGHLIGHTS / ECOSYSTEM ========== */}
      <ParallaxSection id="highlights" className="py-24 lg:py-32 bg-[#F8F8F8]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <span className="inline-block text-xs font-mono text-[#0071E3] tracking-[0.2em] uppercase mb-4">Smart Energy Ecosystem</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              One System.<br />
              <span className="text-gradient">Infinite Possibilities.</span>
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto mt-6">
              Affordable Start • Customizable Setup • Unlimited Expandability
            </p>
          </AnimatedText>

          {/* Ecosystem Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[16/9] max-w-5xl mx-auto rounded-[2rem] border border-gray-200 mb-20 overflow-hidden shadow-2xl shadow-black/10"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              src="https://cdn.shopify.com/videos/c/o/v/3934f84c770545598eafc05f29124623.mp4"
            />
            {/* Subtle overlay for polish */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
          </motion.div>

          {/* Feature Grid - Single Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {FEATURE_HIGHLIGHTS.map((feature, index) => (
              <FeatureCard
                key={feature.id}
                feature={feature}
                index={index}
                onClick={() => setSelectedFeature(feature)}
              />
            ))}
          </div>
        </div>

        {/* Feature Modal */}
        <AnimatePresence>
          {selectedFeature && (
            <FeatureModal
              feature={selectedFeature}
              onClose={() => setSelectedFeature(null)}
            />
          )}
        </AnimatePresence>
      </ParallaxSection>

      {/* ========== HOME BACKUP ========== */}
      <ParallaxSection id="home-backup" className="py-24 lg:py-32" dark>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <span className="inline-block text-xs font-mono text-[#0071E3] tracking-[0.2em] uppercase mb-4">Home Backup</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Npex 600 Smart<br />
              <span className="text-gradient">Energy Ecosystem</span>
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto mt-6">
              Affordable Start | Customizable Setup | Effortless Upgrades
            </p>
          </AnimatedText>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
            {/* Large Card - Left */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer lg:row-span-2 aspect-video sm:aspect-[4/3] lg:aspect-auto min-h-[250px] sm:min-h-[300px] lg:min-h-0"
            >
              <img
                src="https://cdn.shopify.com/s/files/1/0577/1939/0270/files/residential-house-with-rooftop-covered-with-solar-2026-01-07-00-14-25-utc.jpg?v=1769933513"
                alt="Custom Home Backup"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
                <h3 className="font-display text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight">
                  Custom Home Backup, Scaled<br />to Your Needs
                </h3>
              </div>
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0071E3] flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-white text-xl sm:text-2xl font-light">+</span>
              </div>
            </motion.div>

            {/* Top Right Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer aspect-video sm:aspect-[16/9]"
            >
              <img
                src="https://cdn.shopify.com/s/files/1/0577/1939/0270/files/power-2.jpg?v=1769933667"
                alt="RV Power"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-display text-xl lg:text-2xl font-bold text-white leading-tight">
                  RV Power, Designed for Life on<br />the Road
                </h3>
              </div>
              <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-[#0071E3] flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-white text-2xl font-light">+</span>
              </div>
            </motion.div>

            {/* Bottom Right Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer aspect-video sm:aspect-[16/9]"
            >
              <img
                src="https://cdn.shopify.com/s/files/1/0577/1939/0270/files/a-solar-panel-in-a-farmhouse-garden-2026-01-09-08-42-13-utc.jpg?v=1769929695"
                alt="Off-Grid Power"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <h3 className="font-display text-lg sm:text-xl lg:text-2xl font-bold text-white leading-tight">
                  Off-Grid Power, Just Like Home
                </h3>
              </div>
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0071E3] flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-white text-xl sm:text-2xl font-light">+</span>
              </div>
            </motion.div>
          </div>
        </div>
      </ParallaxSection>

      {/* ========== SCALABLE POWER SOLUTION - Scroll Section ========== */}
      <ScrollVideoSection />

      {/* ========== SUPER-FAST SOLAR CHARGING ========== */}
      <section className="py-16 sm:py-20 lg:py-32 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
            {/* Left - Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src="https://cdn.shopify.com/s/files/1/0577/1939/0270/files/inverter-solar-panel-in-electrical-room-2026-01-09-06-47-14-utc.jpg?v=1769933513"
                  alt="Solar Charging Setup"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                Super-Fast Solar
                <br />
                Charging
              </h2>

              <p className="text-white/70 text-lg leading-relaxed mb-8">
                With VoltNest's self-developed <span className="text-[#0071E3] font-semibold">SolarX 4K</span>—the world's first 4,000W PV voltage regulator, you can achieve <span className="text-[#F8970C] font-bold">4kW-30kW</span> solar input. Integrate this system with existing roof solar setups via AC coupling, ideal for DIY enthusiasts looking for multiple charging solutions.
              </p>

              {/* Configuration Options */}
              <div className="grid grid-cols-3 gap-4 mb-10">
                <div className="border-b-2 border-white/30 pb-4">
                  <p className="text-white text-sm font-semibold">Npex 600+B300K</p>
                  <p className="text-white/50 text-sm">+SolarX 4K</p>
                </div>
                <div className="border-b-2 border-white/30 pb-4">
                  <p className="text-white text-sm font-semibold">2× Npex 600+4×B300K</p>
                  <p className="text-white/50 text-sm">+2×SolarX 4K</p>
                </div>
                <div className="border-b-2 border-white/30 pb-4">
                  <p className="text-white text-sm font-semibold">3×Npex 600+6×B300K</p>
                  <p className="text-white/50 text-sm">+3×SolarX 4K + Hub A1</p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-12 mb-6">
                <div>
                  <p className="font-display text-5xl md:text-6xl font-bold text-white">4,000W</p>
                  <p className="text-white/60 text-sm mt-1">PV Input</p>
                </div>
                <div>
                  <p className="font-display text-5xl md:text-6xl font-bold text-[#0071E3]">1.9 hours</p>
                  <p className="text-white/60 text-sm mt-1">Full charge in</p>
                </div>
              </div>

              {/* Note */}
              <p className="text-white/40 text-xs">
                Note: Data tested by VoltNest Labs, actual charging times may vary.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== FLEXIBLE CHARGING ========== */}
      <FlexibleChargingSection />

      {/* ========== SAVING BILLS ========== */}
      <ParallaxSection id="saving-bills" className="py-24 lg:py-32 bg-[#F8F8F8]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <span className="inline-block text-xs font-mono text-[#F8970C] tracking-[0.2em] uppercase mb-4">Smart Investment</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Pays for Itself in<br />
              <span className="text-[#F8970C]">2 Years</span>
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto mt-6">
              With up to 4,000W solar input, your system pays for itself through peak-load shifting.
            </p>
          </AnimatedText>

          {/* Calculator */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[2rem] p-8 lg:p-12 shadow-xl shadow-black/5 border border-gray-100"
          >
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Left: Bundle Selection */}
              <div className="flex-1">
                <h3 className="font-display text-xl font-bold text-gray-900 mb-6">Select Your Bundle</h3>
                <div className="space-y-3">
                  {BUNDLE_OPTIONS.map((bundle) => (
                    <button
                      key={bundle.id}
                      onClick={() => setSelectedBundle(bundle.id)}
                      className={`w-full p-5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                        selectedBundle === bundle.id
                          ? 'border-[#0071E3] bg-[#0071E3]/5'
                          : 'border-gray-100 hover:border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                            selectedBundle === bundle.id ? 'border-[#0071E3] bg-[#0071E3]' : 'border-gray-300'
                          }`}>
                            {selectedBundle === bundle.id && <Check className="w-4 h-4 text-white" />}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{bundle.name}</p>
                            <p className="text-sm text-gray-500">{bundle.capacity.toLocaleString()} Wh • {bundle.power.toLocaleString()} W</p>
                          </div>
                        </div>
                        <span className="font-display font-bold text-[#F8970C]">{bundle.price}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right: Calculator */}
              <div className="flex-1 lg:pl-12 lg:border-l border-gray-100">
                <h3 className="font-display text-xl font-bold text-gray-900 mb-6">Calculate Your Savings</h3>

                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time-of-Use Differential (¢/kWh)
                  </label>
                  <input
                    type="number"
                    value={differential}
                    onChange={(e) => setDifferential(e.target.value)}
                    placeholder="Enter differential rate (e.g., 20)"
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0071E3] focus:border-transparent outline-none transition-all"
                  />
                </div>

                <button
                  onClick={calculateSavings}
                  className="w-full py-4 bg-[#0071E3] text-white font-semibold rounded-xl hover:bg-[#005BB6] transition-colors cursor-pointer mb-6"
                >
                  Calculate Savings
                </button>

                <div className="p-6 bg-gradient-to-r from-[#F8970C]/10 to-[#F8970C]/5 rounded-2xl border border-[#F8970C]/20">
                  <p className="text-sm text-gray-600 mb-2">Estimated Annual Savings</p>
                  <p className="font-display text-4xl font-bold text-[#F8970C]">
                    ${savings.toLocaleString()}
                    <span className="text-lg font-normal text-gray-500 ml-2">/ year</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </ParallaxSection>

      {/* ========== CHARGING ========== */}
      <ParallaxSection id="charging" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <span className="inline-block text-xs font-mono text-[#F8970C] tracking-[0.2em] uppercase mb-4">Fast Charging</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Super-Fast<br />
              <span className="text-gradient-warm">Solar Charging</span>
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto mt-6">
              World's first 4,000W PV voltage regulator. Achieve 4kW–30kW solar input with AC coupling.
            </p>
          </AnimatedText>

          {/* Solar Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { input: '4,000W', time: '1.9 hrs' },
              { input: '8,000W', time: '2.0 hrs' },
              { input: '12,000W', time: '3.5 hrs' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative group text-center p-8 bg-gradient-to-br from-[#F8970C]/5 to-white rounded-[2rem] border border-[#F8970C]/20 hover:border-[#F8970C]/40 transition-all"
              >
                <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-[#F8970C]/10 flex items-center justify-center">
                  <Sun className="w-5 h-5 text-[#F8970C]" />
                </div>
                <p className="font-display text-4xl font-bold text-[#F8970C] mb-2">{stat.input}</p>
                <p className="text-gray-500">PV Input</p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-2xl font-display font-bold text-gray-900">{stat.time}</p>
                  <p className="text-sm text-gray-500">Full charge</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Charging Methods */}
          <h3 className="font-display text-2xl font-bold text-gray-900 text-center mb-8">Flexible Charging Options</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {CHARGING_METHODS.map((method, index) => (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="group bg-gray-50 rounded-2xl p-6 hover:bg-white hover:shadow-xl hover:shadow-black/5 border border-transparent hover:border-gray-100 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0071E3]/10 flex items-center justify-center group-hover:bg-[#0071E3] transition-colors">
                    <method.icon className="w-6 h-6 text-[#0071E3] group-hover:text-white transition-colors" />
                  </div>
                  <span className="font-display text-sm font-bold text-gray-400">0{index + 1}</span>
                </div>
                <h4 className="font-display font-bold text-gray-900 mb-2">{method.title}</h4>
                <p className="text-[#0071E3] font-semibold text-lg mb-1">{method.power}</p>
                <p className="text-sm text-gray-500">{method.time}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* ========== RV ========== */}
      <ParallaxSection id="rv" className="py-24 lg:py-32 bg-[#F8F8F8]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <span className="inline-block text-xs font-mono text-[#0071E3] tracking-[0.2em] uppercase mb-4">RV Power</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              All-in-One Power<br />
              <span className="text-gradient">For Your RV</span>
            </h2>
          </AnimatedText>

          {/* RV Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[2rem] p-8 lg:p-12 shadow-xl shadow-black/5 border border-gray-100"
          >
            <div className="flex flex-wrap gap-2 mb-10">
              {RV_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveRvTab(tab.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                    activeRvTab === tab.id
                      ? 'bg-[#0071E3] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tab.title}
                </button>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRvTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="aspect-video rounded-2xl overflow-hidden"
                >
                  <img
                    src={RV_TABS.find((t) => t.id === activeRvTab)?.image}
                    alt={RV_TABS.find((t) => t.id === activeRvTab)?.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div>
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-4">
                  {RV_TABS.find((t) => t.id === activeRvTab)?.title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {RV_TABS.find((t) => t.id === activeRvTab)?.desc}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </ParallaxSection>

      {/* ========== OFF-GRID ========== */}
      <ParallaxSection id="off-grid" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-xs font-mono text-[#F8970C] tracking-[0.2em] uppercase mb-4">Off-Grid Living</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Energy Freedom<br />
                <span className="text-[#F8970C]">Anywhere</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                With 3,840W output and 7,680W surge capacity, power all your essential tools and appliances with confidence.
              </p>
              <div className="space-y-4">
                {['Power tools', 'Well pumps', 'Refrigerators', 'Air conditioners'].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#F8970C]/10 flex items-center justify-center">
                      <Check className="w-5 h-5 text-[#F8970C]" />
                    </div>
                    <span className="text-lg text-gray-700">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl">
                <img
                  src="https://cdn.shopify.com/s/files/1/0577/1939/0270/files/hydrogen-energy-house-have-solar-panels-and-wind-t-2026-01-09-00-41-53-utc.jpg?v=1769929695"
                  alt="Off-Grid Living Setup"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </ParallaxSection>

      {/* ========== TECH INNOVATION ========== */}
      <ParallaxSection id="tech-innovation" className="py-24 lg:py-32 bg-[#0a1628]" dark>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedText className="text-center mb-16">
            <span className="inline-block text-xs font-mono text-[#0071E3] tracking-[0.2em] uppercase mb-4">Tech Innovation 3.0</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Seven Groundbreaking<br />
              <span className="text-gradient">Technologies</span>
            </h2>
          </AnimatedText>

          {/* Innovation Stepper */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
            {TECH_INNOVATIONS.map((tech, i) => (
              <button
                key={i}
                onClick={() => setActiveTechIndex(i)}
                className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl font-display font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                  activeTechIndex === i
                    ? 'bg-gradient-to-br from-[#0071E3] to-[#005BB6] text-white shadow-lg shadow-[#0071E3]/30'
                    : 'bg-white/5 text-white/50 hover:bg-white/10 border border-white/10'
                }`}
              >
                {tech.number}
              </button>
            ))}
          </div>

          {/* Active Innovation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTechIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-[2rem] p-4 sm:p-6 md:p-8 lg:p-12 border border-white/10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-center">
                <div className="aspect-video rounded-xl sm:rounded-2xl overflow-hidden">
                  <img
                    src={TECH_INNOVATIONS[activeTechIndex].image}
                    alt={TECH_INNOVATIONS[activeTechIndex].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-[#0071E3]/20 text-[#3397E7] text-xs sm:text-sm font-medium rounded-full mb-3 sm:mb-4">
                    {TECH_INNOVATIONS[activeTechIndex].badge}
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
                    {TECH_INNOVATIONS[activeTechIndex].title}
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-white/60 leading-relaxed">
                    {TECH_INNOVATIONS[activeTechIndex].desc}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </ParallaxSection>

      {/* ========== USER FEATURES ========== */}
      <section className="py-16 sm:py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedText className="text-center mb-10 sm:mb-16">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              User-Friendly Design
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-500">Built for an all-new power experience</p>
          </AnimatedText>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {USER_FEATURES.map((feature, i) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="group bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center hover:bg-white hover:shadow-xl hover:shadow-black/5 border border-transparent hover:border-gray-100 transition-all cursor-pointer"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl bg-[#0071E3]/10 flex items-center justify-center group-hover:bg-[#0071E3] transition-colors">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#0071E3] group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="font-display font-bold text-gray-900 mb-1 text-sm sm:text-base">{feature.title}</h4>
                  <p className="text-sm text-gray-500">{feature.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ========== NEWSLETTER ========== */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-[#0a1628] via-[#0d1e36] to-[#0a1628] relative overflow-hidden">
        <FloatingOrbs />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Stay in the Loop
            </h2>
            <p className="text-white/60 text-lg mb-10">
              Get exclusive offers, product updates, and energy-saving tips.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); if (email) alert('Thank you for subscribing!'); setEmail(''); }} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#0071E3] transition-colors"
              />
              <MagneticButton
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-[#F8970C] to-[#C6790A] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#F8970C]/30 transition-all cursor-pointer"
              >
                Subscribe
              </MagneticButton>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="bg-[#0a1628] py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <a href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F8970C] to-[#C6790A] flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-white text-xl">VoltNest</span>
            </a>
            <p className="text-white/40 text-sm">
              © 2026 VoltNest Inc. All rights reserved.
            </p>
            <div className="flex gap-8">
              {['Privacy', 'Terms', 'Contact'].map((link) => (
                <a key={link} href="#" className="text-white/40 text-sm hover:text-white transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
