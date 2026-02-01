import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Zap, ChevronRight, ChevronDown, ChevronUp, ChevronLeft, Check, Sun, Battery, Shield,
  Cpu, Home, Car, Mountain, Menu, X, ShoppingBag, ShoppingCart, Search, User, Globe,
  Star, Truck, Package, RotateCcw, Play, Pause, Expand, Minus, Plus, Heart,
  Download, FileText, HelpCircle, ArrowRight, Quote, Camera, Image, Box, Clock,
  DollarSign, Award, Headphones
} from 'lucide-react'
import Navbar from '../components/Navbar'
import AnnouncementBarShared from '../components/AnnouncementBar'

// ============================================
// DATA CONSTANTS
// ============================================

const PRODUCT_IMAGES = [
  { id: 1, src: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/VoltNex-pp1.png?v=1769943132', alt: 'Npex 600 Front View' },
  { id: 2, src: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/VoltNex-pp2.png?v=1769943131', alt: 'Npex 600 With Solar Panels' },
  { id: 3, src: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/VoltNex-pp3.png?v=1769943131', alt: 'Npex 600 In Use' },
  { id: 4, src: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/VoltNex-pp1.png?v=1769943132', alt: 'Npex 600 Home Setup' },
  { id: 5, src: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/VoltNex-pp2.png?v=1769943131', alt: 'Npex 600 Outdoor' },
  { id: 6, src: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/VoltNex-pp3.png?v=1769943131', alt: 'Npex 600 Installation' },
]

const VARIANTS = [
  { id: 1, name: 'Npex 600 Versatile Power Station', shortName: 'Npex 600', capacity: '2,764.8Wh', power: '3,840W', price: 1499, comparePrice: 2199, savings: 700, inStock: true, image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/VoltNex-pp1.png?v=1769943132', specs: '3,840W | 2,764.8Wh | LiFePO4 | 120V/240V' },
  { id: 2, name: 'Npex 600 + Charger 2 + DC Hub', shortName: 'Npex 600 + Accessories', capacity: '2,764.8Wh', power: '3,840W', price: 1899, comparePrice: 3148, savings: 1249, inStock: true, image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/VoltNex-pp2.png?v=1769943131', specs: '3,840W | 2,764.8Wh | LiFePO4 | 120V/240V' },
  { id: 3, name: 'Npex 600 + B300K', shortName: 'Npex 600 + B300K', capacity: '5,528.8Wh', power: '3,840W', price: 2399, comparePrice: 3799, savings: 1400, inStock: true, image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/VoltNex-pp3.png?v=1769943131', specs: '3,840W | 5,528.8Wh | LiFePO4 | 120V/240V | 50.43kWh' },
  { id: 4, name: 'Npex 600 + B300K + Charger 2 + DC Hub', shortName: 'Full Bundle', capacity: '5,528.8Wh', power: '3,840W', price: 2850, comparePrice: 4748, savings: 1898, inStock: true, image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/VoltNex-pp1.png?v=1769943132', specs: '3,840W | 5,528.8Wh | LiFePO4 | 120V/240V | 50.43kWh' },
]

const TRUST_BADGES = [
  { icon: Truck, label: 'Free Shipping', desc: 'On orders over $99' },
  { icon: Shield, label: '10-Year Warranty', desc: 'Industry-leading coverage' },
  { icon: RotateCcw, label: '30-Day Returns', desc: 'Hassle-free refunds' },
  { icon: Zap, label: 'Fast Charging', desc: '0-80% in 45 mins' },
  { icon: Battery, label: '6000+ Cycles', desc: 'LiFePO4 longevity' },
  { icon: Sun, label: 'Solar Ready', desc: 'Up to 4000W input' },
]

const ECOSYSTEM_CARDS = [
  {
    id: 1,
    title: 'Custom Home Backup, Scaled to Your Needs',
    image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/residential-house-with-rooftop-covered-with-solar-2026-01-07-00-14-25-utc.jpg?v=1769933513',
    size: 'large'
  },
  {
    id: 2,
    title: 'RV Power, Designed for Life on the Road',
    image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/power-3.jpg?v=1769933667',
    size: 'small'
  },
  {
    id: 3,
    title: 'Off-Grid Power, Just Like Home',
    image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/a-solar-panel-in-a-farmhouse-garden-2026-01-09-08-42-13-utc.jpg?v=1769929695',
    size: 'small'
  },
]

const FEATURES = [
  {
    id: 1,
    title: 'Super-Fast Solar Charging',
    subtitle: 'SolarX 4K Technology',
    description: 'With VoltNest\'s self-developed SolarX 4K—the world\'s first 4,000W PV voltage regulator, achieve 4kW-30kW solar input. Full charge in just 1.9 hours with optimal panel configuration.',
    bullets: ['4,000W Max PV Input', '99% MPPT Efficiency', 'Multi-Panel Support', 'AC Coupling Compatible'],
    image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/inverter-solar-panel-in-electrical-room-2026-01-09-06-47-14-utc.jpg?v=1769933513',
    stat: { value: '1.9', unit: 'hrs', label: 'Full Charge' }
  },
  {
    id: 2,
    title: 'Whole-Home Backup Power',
    subtitle: '120V/240V Dual Output',
    description: 'Industry-first 12kW bypass for EV charging. Instantly switches to backup mode during outages to keep essentials running—from your fridge and router to medical equipment.',
    bullets: ['3,840W Continuous Output', '7,680W Surge Capacity', 'Seamless Auto-Switchover', 'All Circuit Coverage'],
    image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/hydrogen-energy-house-have-solar-panels-and-wind-t-2026-01-09-00-41-53-utc.jpg?v=1769929695',
    stat: { value: '3840', unit: 'W', label: 'Output Power' }
  },
  {
    id: 3,
    title: 'Ultracell LiFePO4 Battery',
    subtitle: '17-Year Lifespan',
    description: '6,000+ cycles at 80% capacity—that\'s 2X longer than standard lithium batteries. Advanced BMS with 24+ sensors monitors every cell for ultimate safety and longevity.',
    bullets: ['6,000+ Cycle Life', '24+ Safety Sensors', 'Thermal Runaway Prevention', '12-Layer Protection'],
    image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/man-electrician-wiring-inverter-and-electric-box-i-2026-01-07-01-00-58-utc.jpg?v=1769933516',
    stat: { value: '17', unit: 'yrs', label: 'Lifespan' }
  },
  {
    id: 4,
    title: 'Smart App Control',
    subtitle: 'Monitor From Anywhere',
    description: 'Full control from your smartphone. Monitor energy usage, schedule charging times, receive alerts, and optimize power consumption—all from the VoltNest app.',
    bullets: ['iOS & Android Apps', 'Real-time Monitoring', 'Remote Control', 'Usage Analytics'],
    image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/futuristic-smart-home-living-room-with-a-robotic-a-2026-01-11-11-05-21-utc.jpg?v=1769929694',
    stat: { value: '24/7', unit: '', label: 'Connected' }
  },
]

const CHARGING_METHODS = {
  large: [
    {
      id: 1,
      title: '120V/240V',
      subtitle: 'Generator Charging',
      specs: '2,400W Max.\nCharge to 80% in just 40 minutes,\nand 100% in 80 minutes',
      image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/power-1.jpg?v=1769933667',
    },
    {
      id: 2,
      title: 'TurboBoost',
      subtitle: 'AC Charging',
      specs: 'Charge to 80% in\njust 45 minutes,\nand 100% in 65 minutes',
      image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/power-2.jpg?v=1769933667',
    },
  ],
  small: [
    {
      id: 3,
      title: 'Super-Fast Solar Charging',
      specs: 'Supports up to\n30,000W solar input*\nwith SolarX 4K.',
      image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/a-solar-panel-in-a-farmhouse-garden-2026-01-09-08-42-13-utc.jpg?v=1769929695',
    },
    {
      id: 4,
      title: 'Standard Solar Charging',
      specs: '2,400W Max.\nCharge to 80% in just 40\nminutes, and 100%\nin 80 minutes',
      image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/residential-house-with-rooftop-covered-with-solar-2026-01-07-00-14-25-utc.jpg?v=1769933513',
    },
    {
      id: 5,
      title: 'AC + Solar',
      subtitle: 'Dual Charging',
      specs: '3,840W Max.\nFull charge in 65 minutes',
      image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/inverter-solar-panel-in-electrical-room-2026-01-09-06-47-14-utc.jpg?v=1769933513',
    },
  ],
}

const SPECS = {
  general: [
    { label: 'Model', value: 'Npex 600' },
    { label: 'Capacity', value: '2,764.8Wh (51.2V, 54Ah)' },
    { label: 'Battery Type', value: 'LiFePO4 (Lithium Iron Phosphate)' },
    { label: 'Cycle Life', value: '6,000+ cycles to 80% capacity' },
    { label: 'Weight', value: '66.1 lbs (30 kg)' },
    { label: 'Dimensions', value: '20.5 × 12.6 × 14.1 in' },
  ],
  output: [
    { label: 'AC Output', value: '3,840W (7,680W Surge)' },
    { label: 'AC Voltage', value: '120V/240V Split Phase' },
    { label: 'USB-C Output', value: '100W × 2' },
    { label: 'USB-A Output', value: '18W × 2' },
    { label: '12V DC Output', value: '12V/10A (Car Port)' },
    { label: 'Wireless Charging', value: '15W × 2' },
  ],
  input: [
    { label: 'Max Solar Input', value: '4,000W' },
    { label: 'Solar Voltage Range', value: '12-150V' },
    { label: 'AC Charging', value: '3,840W Max' },
    { label: 'Car Charging', value: '12V/24V' },
    { label: 'Dual Charging', value: 'AC + Solar Simultaneous' },
    { label: 'Full Charge Time', value: '1.9 hrs (Solar) / 1.5 hrs (AC+Solar)' },
  ],
}

const IN_THE_BOX = [
  'Npex 600 Power Station',
  'AC Charging Cable (10ft)',
  'Solar Charging Cable (MC4)',
  'Car Charging Cable',
  'User Manual',
  'Quick Start Guide',
  'Warranty Card',
]

const DOWNLOADS = [
  { name: 'User Manual', size: '4.2 MB', type: 'PDF' },
  { name: 'Spec Sheet', size: '1.8 MB', type: 'PDF' },
  { name: 'Installation Guide', size: '2.1 MB', type: 'PDF' },
  { name: 'App Guide', size: '890 KB', type: 'PDF' },
]

const COMPARISON = [
  {
    model: 'Npex 600',
    capacity: '2,764.8Wh',
    output: '3,840W',
    solar: '4,000W',
    cycles: '6,000+',
    weight: '66.1 lbs',
    price: '$2,999',
    highlight: true
  },
  {
    model: 'Apex 200',
    capacity: '2,048Wh',
    output: '2,400W',
    solar: '2,400W',
    cycles: '3,500+',
    weight: '52.9 lbs',
    price: '$1,999',
    highlight: false
  },
  {
    model: 'Apex 100',
    capacity: '1,024Wh',
    output: '1,200W',
    solar: '1,200W',
    cycles: '3,500+',
    weight: '28.6 lbs',
    price: '$899',
    highlight: false
  },
]

const REVIEWS = [
  {
    id: 1,
    author: 'Michael R.',
    rating: 5,
    date: 'January 15, 2026',
    title: 'Best investment for home backup',
    content: 'After the power outages last winter, I decided to invest in a proper backup system. The Npex 600 has been incredible—powers our entire home including the HVAC. Setup was surprisingly easy.',
    verified: true,
    helpful: 124,
    images: ['https://cdn.shopify.com/s/files/1/0577/1939/0270/files/power-4.jpg?v=1769933667']
  },
  {
    id: 2,
    author: 'Sarah L.',
    rating: 5,
    date: 'January 10, 2026',
    title: 'Perfect for our RV lifestyle',
    content: 'We live full-time in our RV and this has been a game-changer. Solar charging is incredibly fast, and we can run the AC all day without worry. Customer service was also excellent.',
    verified: true,
    helpful: 89,
    images: []
  },
  {
    id: 3,
    author: 'David K.',
    rating: 4,
    date: 'January 5, 2026',
    title: 'Great product, wish it was lighter',
    content: 'The power output and capacity are fantastic. My only complaint is the weight—it\'s heavy to move around. But for a stationary home backup solution, it\'s perfect.',
    verified: true,
    helpful: 56,
    images: ['https://cdn.shopify.com/s/files/1/0577/1939/0270/files/power-5.jpg?v=1769933667']
  },
]

const FAQS = [
  {
    id: 1,
    question: 'How long will the Npex 600 power my home during an outage?',
    answer: 'Runtime depends on your power consumption. For essential loads (refrigerator, lights, router, phone charging), the base Npex 600 can last 24-48 hours. For whole-home backup including HVAC, we recommend adding B300K expansion batteries. Use our online calculator for personalized estimates.'
  },
  {
    id: 2,
    question: 'Can I install the Npex 600 myself?',
    answer: 'The Npex 600 is designed for plug-and-play use—just charge and connect your devices. For hardwired home backup installations, we recommend professional installation. VoltNest offers installation services in most areas.'
  },
  {
    id: 3,
    question: 'What solar panels are compatible?',
    answer: 'Any solar panel with MC4 connectors and voltage between 12-150V is compatible. We recommend our SunFold series for optimal performance with the built-in MPPT controller. You can connect up to 4,000W of solar input.'
  },
  {
    id: 4,
    question: 'How long does the battery last?',
    answer: 'The LiFePO4 battery is rated for 6,000+ cycles at 80% capacity, which translates to approximately 17 years of daily use. This is 2-3x longer than standard lithium-ion batteries.'
  },
  {
    id: 5,
    question: 'What\'s covered under warranty?',
    answer: 'VoltNest offers a comprehensive 10-year warranty covering manufacturing defects, battery capacity degradation below 60%, and component failures. Normal wear and physical damage are not covered.'
  },
  {
    id: 6,
    question: 'Can I expand the system later?',
    answer: 'Yes! The Npex 600 supports up to 4 B300K expansion batteries for a total of 13,824Wh. You can add batteries at any time—they hot-swap without interrupting power flow.'
  },
]

const ACCESSORIES = [
  { id: 1, name: 'B300K Expansion Battery', capacity: '2,764.8Wh', price: 1599, image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/VoltNex-pp1.png?v=1769943132', tag: 'Best Seller' },
  { id: 2, name: 'SunFold 400 Solar Panel', capacity: '400W', price: 699, image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/VoltNex-pp2.png?v=1769943131', tag: 'Recommended' },
  { id: 3, name: 'SolarX 4K Voltage Regulator', capacity: '4,000W', price: 499, image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/VoltNex-pp3.png?v=1769943131', tag: null },
  { id: 4, name: 'Hub D1 DC Adapter', capacity: '12V/24V', price: 129, image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/VoltNex-pp1.png?v=1769943132', tag: null },
  { id: 5, name: 'Heavy Duty Carrying Case', capacity: 'Fits Npex 600', price: 199, image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/VoltNex-pp2.png?v=1769943131', tag: 'New' },
]

// ============================================
// COMPONENTS
// ============================================

// Announcement Bar
const AnnouncementBar = ({ onDismiss }) => (
  <div className="bg-[#0071E3] text-white py-2.5 px-4 text-center text-sm relative">
    <span className="font-medium">🔥 Limited Time: Save $500 on Npex 600 Bundles </span>
    <span className="hidden sm:inline">| Use code <span className="font-bold">POWER500</span> at checkout</span>
    <button
      onClick={onDismiss}
      className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded transition-colors cursor-pointer"
      aria-label="Dismiss"
    >
      <X size={16} />
    </button>
  </div>
)

// Header
const Header = ({ cartCount = 2 }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#F8970C] to-[#C6790A] flex items-center justify-center group-hover:shadow-lg group-hover:shadow-[#F8970C]/30 transition-shadow">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-gray-900">VoltNest</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {['Power Stations', 'Solar Panels', 'Bundles', 'Accessories', 'Support'].map((item) => (
              <a key={item} href="#" className="text-sm font-medium text-gray-600 hover:text-[#0071E3] transition-colors">
                {item}
              </a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
              <Search size={20} className="text-gray-500" />
            </button>
            <button className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
              <User size={20} className="text-gray-500" />
            </button>
            <button className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
              <ShoppingBag size={20} className="text-gray-500" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#F8970C] text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="hidden sm:flex items-center gap-1 px-3 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">
              <Globe size={16} />
              <span>EN</span>
            </button>
            <button
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white lg:hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <a href="/" className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#F8970C] to-[#C6790A] flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-display font-bold text-xl text-gray-900">VoltNest</span>
                </a>
                <button onClick={() => setMobileMenuOpen(false)} className="w-10 h-10 flex items-center justify-center cursor-pointer">
                  <X size={24} className="text-gray-600" />
                </button>
              </div>
              <div className="space-y-4">
                {['Power Stations', 'Solar Panels', 'Bundles', 'Accessories', 'Support'].map((item) => (
                  <a key={item} href="#" className="block text-xl font-semibold text-gray-900 hover:text-[#0071E3] py-2">
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

// Breadcrumb
const Breadcrumb = () => (
  <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
    <ol className="flex items-center gap-2 text-sm text-gray-500">
      <li><a href="/" className="hover:text-[#0071E3] transition-colors">Home</a></li>
      <ChevronRight size={14} />
      <li><a href="#" className="hover:text-[#0071E3] transition-colors">Power Stations</a></li>
      <ChevronRight size={14} />
      <li className="text-gray-900 font-medium">Npex 600</li>
    </ol>
  </nav>
)

// Image Gallery - BLUETTI Style
const ImageGallery = ({ images, onExpand }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeTab, setActiveTab] = useState('photos')

  const mediaTabs = [
    { id: 'photos', icon: Camera, label: 'Photos' },
    { id: 'scene', icon: Image, label: 'Scene' },
    { id: '3d', icon: Box, label: '3D' },
  ]

  const galleryBadges = [
    { icon: DollarSign, label: 'Price Guarantee' },
    { icon: Truck, label: 'Swift Delivery' },
    { icon: Award, label: 'Global Warranty' },
    { icon: Headphones, label: 'Lifetime Support' },
  ]

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative bg-gray-50 rounded-2xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="aspect-square"
          >
            <img
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              className="w-full h-full object-contain p-4"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={() => setActiveIndex(prev => prev > 0 ? prev - 1 : images.length - 1)}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors cursor-pointer"
        >
          <ChevronLeft size={20} className="text-gray-700" />
        </button>
        <button
          onClick={() => setActiveIndex(prev => prev < images.length - 1 ? prev + 1 : 0)}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors cursor-pointer"
        >
          <ChevronRight size={20} className="text-gray-700" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-1.5">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
              index === activeIndex ? 'bg-gray-800 w-4' : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Media Type Tabs */}
      <div className="flex justify-center gap-2">
        {mediaTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

    </div>
  )
}

// Lightbox Modal
const Lightbox = ({ images, startIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex)

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
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer z-10"
      >
        <X size={24} className="text-white" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); setCurrentIndex(prev => prev > 0 ? prev - 1 : images.length - 1) }}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
      >
        <ChevronLeft size={28} className="text-white" />
      </button>

      <motion.img
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        src={images[currentIndex].src}
        alt={images[currentIndex].alt}
        className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
        onClick={(e) => e.stopPropagation()}
      />

      <button
        onClick={(e) => { e.stopPropagation(); setCurrentIndex(prev => prev < images.length - 1 ? prev + 1 : 0) }}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
      >
        <ChevronRight size={28} className="text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={(e) => { e.stopPropagation(); setCurrentIndex(index) }}
            className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
              index === currentIndex ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </motion.div>
  )
}

// Purchase Panel - BLUETTI Style
const PurchasePanel = ({ variants, selectedVariant, onVariantChange, quantity, onQuantityChange }) => {
  const variant = variants.find(v => v.id === selectedVariant)
  const [showMoreFeatures, setShowMoreFeatures] = useState(false)
  const [optionTab, setOptionTab] = useState('basic')

  // Countdown timer state
  const [countdown, setCountdown] = useState({ days: 0, hours: 22, minutes: 22, seconds: 42 })

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        let { days, hours, minutes, seconds } = prev
        seconds--
        if (seconds < 0) { seconds = 59; minutes-- }
        if (minutes < 0) { minutes = 59; hours-- }
        if (hours < 0) { hours = 23; days-- }
        if (days < 0) { days = 0; hours = 0; minutes = 0; seconds = 0 }
        return { days, hours, minutes, seconds }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="space-y-5">
      {/* New Badge */}
      <span className="inline-block px-3 py-1 bg-[#0071E3] text-white text-xs font-bold rounded-full">
        New
      </span>

      {/* Title */}
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
          {variant.shortName}
        </h1>
        <p className="text-gray-500 text-sm">
          Reliable power for longer outages when you need it most.
        </p>
      </div>

      {/* Rating */}
      <a href="#reviews" className="flex items-center gap-2 group">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} size={14} className="text-[#F8970C] fill-[#F8970C]" />
          ))}
        </div>
        <span className="text-sm text-[#0071E3] underline group-hover:no-underline">
          4,909 reviews
        </span>
      </a>

      {/* Price */}
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-gray-900">
          US${variant.price.toLocaleString()}.00
        </span>
        <span className="text-sm text-gray-400 line-through">
          US${variant.comparePrice.toLocaleString()}.00
        </span>
      </div>

      {/* Shipping Note */}
      <p className="text-xs text-[#0071E3] flex items-center gap-1">
        <Truck size={12} />
        Each unit will be delivered separately.
      </p>

      {/* Promo Banner */}
      <div className="bg-[#1a365d] rounded-xl p-4 relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-block px-3 py-1 bg-[#F8970C] text-white text-xs font-bold rounded-full mb-2">
            Winter Backup Sale – Save Up to 54%
          </div>
          <p className="text-white text-sm mb-1">
            Keep your home warm, safe, and powered—no matter the storm.
          </p>
          <a href="#" className="text-[#F8970C] text-sm font-semibold flex items-center gap-1 hover:underline">
            → Shop More
          </a>
          <div className="flex items-center gap-2 mt-3">
            <Clock size={14} className="text-white/70" />
            <span className="text-white text-sm font-mono">
              Ends in {String(countdown.days).padStart(2, '0')}D : {String(countdown.hours).padStart(2, '0')}H : {String(countdown.minutes).padStart(2, '0')}M : {String(countdown.seconds).padStart(2, '0')}S
            </span>
          </div>
        </div>
        {/* Background house image effect */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#2d4a6f]/50 to-transparent" />
      </div>

      {/* Unlock Perks Link */}
      <a href="#" className="text-sm text-gray-500 hover:text-[#0071E3] flex items-center gap-1">
        <Zap size={14} className="text-[#F8970C]" />
        Get VoltNest Bucks to unlock more perks
      </a>

      {/* Key Features */}
      <div className="space-y-3">
        <div className="flex items-start gap-2">
          <span className="text-gray-900 font-semibold text-sm">•</span>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Smartest 120V/240V Portable Power:</span>{' '}
            Off-grid energy for home backup or outdoor use.
          </p>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-gray-900 font-semibold text-sm">•</span>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Grows With You:</span>{' '}
            From 2.7kWh to 58kWh and 3.8kW to 11.5kW, from{' '}
            <a href="#" className="text-[#0071E3] underline">Apex to Whole Home Backup.</a>
          </p>
        </div>

        <AnimatePresence>
          {showMoreFeatures && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="space-y-3 overflow-hidden"
            >
              <div className="flex items-start gap-2">
                <span className="text-gray-900 font-semibold text-sm">•</span>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Ultra-Fast Charging:</span>{' '}
                  4,000W solar input for rapid recharging.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-900 font-semibold text-sm">•</span>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">17-Year Lifespan:</span>{' '}
                  6,000+ cycles with LiFePO4 technology.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setShowMoreFeatures(!showMoreFeatures)}
          className="text-sm text-gray-500 hover:text-[#0071E3] flex items-center gap-1 cursor-pointer"
        >
          {showMoreFeatures ? 'Less' : 'More'}
          <ChevronDown size={14} className={`transition-transform ${showMoreFeatures ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Select Options Tabs */}
      <div>
        <p className="text-sm font-semibold text-gray-900 mb-3">Select Options</p>
        <div className="flex gap-2">
          {['basic', 'advanced'].map((tab) => (
            <button
              key={tab}
              onClick={() => setOptionTab(tab)}
              className={`flex-1 py-3 px-4 rounded-lg border text-sm font-medium transition-all cursor-pointer capitalize ${
                optionTab === tab
                  ? 'border-gray-900 bg-white'
                  : 'border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Product Model Selection - Premium Design */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-semibold text-gray-900">Product Model</p>
          <span className="text-xs text-gray-400">{variants.length} options</span>
        </div>
        <div className="space-y-3">
          {variants.map((v, index) => {
            const isSelected = selectedVariant === v.id
            return (
              <motion.button
                key={v.id}
                onClick={() => onVariantChange(v.id)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.99 }}
                className={`w-full text-left cursor-pointer relative group overflow-hidden rounded-2xl transition-all duration-300 ${
                  isSelected
                    ? 'ring-2 ring-[#0071E3] ring-offset-2 shadow-lg shadow-[#0071E3]/10'
                    : 'ring-1 ring-gray-200 hover:ring-gray-300 hover:shadow-md'
                }`}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 transition-opacity duration-300 ${
                  isSelected
                    ? 'opacity-100'
                    : 'opacity-0 group-hover:opacity-50'
                }`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0071E3]/5 via-transparent to-[#F8970C]/5" />
                </div>

                {/* Card Content */}
                <div className="relative p-4">
                  {/* Top Row: Badge & Selection Indicator */}
                  <div className="flex items-start justify-between mb-3">
                    {/* Savings Badge - Premium Style */}
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-[#F8970C] to-[#E8860B] rounded-full shadow-sm"
                    >
                      <span className="text-[10px] font-bold text-white tracking-wide">SAVE</span>
                      <span className="text-xs font-bold text-white">${v.savings.toLocaleString()}</span>
                    </motion.div>

                    {/* Selection Indicator */}
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      isSelected
                        ? 'border-[#0071E3] bg-[#0071E3]'
                        : 'border-gray-300 group-hover:border-gray-400'
                    }`}>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        >
                          <Check size={12} className="text-white" strokeWidth={3} />
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Main Content Row */}
                  <div className="flex items-center gap-4">
                    {/* Product Thumbnail - Enhanced */}
                    <div className={`relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 transition-all duration-300 ${
                      isSelected
                        ? 'shadow-lg ring-1 ring-[#0071E3]/20'
                        : 'shadow-sm group-hover:shadow-md'
                    }`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100" />
                      <img
                        src={v.image}
                        alt={v.name}
                        className={`relative w-full h-full object-cover transition-transform duration-500 ${
                          isSelected ? 'scale-105' : 'group-hover:scale-105'
                        }`}
                      />
                      {/* Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold leading-tight transition-colors duration-300 ${
                        isSelected ? 'text-[#0071E3]' : 'text-gray-900'
                      }`}>
                        {v.name}
                      </p>

                      {/* Price Row */}
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-lg font-bold text-gray-900">
                          ${v.price.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                          ${v.comparePrice.toLocaleString()}
                        </span>
                      </div>

                      {/* Capacity Indicator */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1">
                          <Battery size={12} className="text-[#0071E3]" />
                          <span className="text-xs text-gray-500">{v.capacity}</span>
                        </div>
                        <span className="text-gray-300">•</span>
                        <div className="flex items-center gap-1">
                          <Zap size={12} className="text-[#F8970C]" />
                          <span className="text-xs text-gray-500">{v.power}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Specs - Animated */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="flex flex-wrap gap-2">
                            {v.specs.split(' | ').map((spec, i) => (
                              <span
                                key={i}
                                className="px-2.5 py-1 bg-gray-100 rounded-full text-xs text-gray-600 font-medium"
                              >
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom Accent Line */}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0071E3] to-[#F8970C] transition-transform duration-300 origin-left ${
                  isSelected ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Quantity & Add to Cart - Premium Design */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-4">
          {/* Quantity Selector - Enhanced */}
          <div className="flex items-center bg-gray-50 rounded-xl p-1">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm transition-all cursor-pointer"
            >
              <Minus size={16} className="text-gray-600" />
            </motion.button>
            <span className="w-12 text-center font-bold text-gray-900">{quantity}</span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onQuantityChange(quantity + 1)}
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm transition-all cursor-pointer"
            >
              <Plus size={16} className="text-gray-600" />
            </motion.button>
          </div>

          {/* Add to Cart Button - Premium */}
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 10px 40px -10px rgba(248, 151, 12, 0.5)' }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 relative overflow-hidden group py-4 bg-gradient-to-r from-[#F8970C] to-[#E8860B] text-white font-bold rounded-xl cursor-pointer shadow-lg shadow-[#F8970C]/25"
          >
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative flex items-center justify-center gap-2">
              <ShoppingCart size={18} />
              Add to Cart
            </span>
          </motion.button>
        </div>

        {/* Buy Now Button */}
        <motion.button
          whileHover={{ scale: 1.01, backgroundColor: '#0071E3', color: '#ffffff' }}
          whileTap={{ scale: 0.99 }}
          className="w-full py-3.5 border-2 border-[#0071E3] text-[#0071E3] font-semibold rounded-xl transition-all duration-300 cursor-pointer"
        >
          Buy Now — ${(variant.price * quantity).toLocaleString()}
        </motion.button>
      </div>

    </div>
  )
}

// Mobile Sticky ATC Bar
const MobileStickyBar = ({ price, onAddToCart }) => (
  <motion.div
    initial={{ y: 100 }}
    animate={{ y: 0 }}
    className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 lg:hidden z-40"
  >
    <div className="flex items-center gap-4">
      <div className="flex-1">
        <p className="text-2xl font-bold text-gray-900">${price.toLocaleString()}</p>
        <p className="text-xs text-gray-500">Free shipping</p>
      </div>
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={onAddToCart}
        className="flex-1 py-4 bg-[#F8970C] text-white font-bold rounded-xl cursor-pointer"
      >
        Add to Cart
      </motion.button>
    </div>
  </motion.div>
)

// Trust Strip
const TrustStrip = () => (
  <section className="py-12 border-y border-gray-100 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {TRUST_BADGES.map((badge, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="text-center"
          >
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-[#0071E3]/10 flex items-center justify-center">
              <badge.icon className="w-6 h-6 text-[#0071E3]" />
            </div>
            <p className="font-bold text-gray-900 text-sm">{badge.label}</p>
            <p className="text-xs text-gray-500">{badge.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

// Ecosystem Section
const EcosystemSection = () => (
  <section id="ecosystem" className="py-20 lg:py-28 bg-[#0a1628]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="text-xs font-mono text-[#0071E3] tracking-[0.2em] uppercase">Smart Energy Ecosystem</span>
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-4">
          Npex 600 Smart Energy Ecosystem
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-white/60">
          Affordable Start <span className="text-[#0071E3]">|</span> Customizable Setup <span className="text-[#0071E3]">|</span> Effortless Upgrades
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
        {/* Large Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group relative rounded-3xl overflow-hidden cursor-pointer lg:row-span-2 aspect-video sm:aspect-[4/3] lg:aspect-auto min-h-[280px] sm:min-h-[350px] lg:min-h-[400px]"
        >
          <img
            src={ECOSYSTEM_CARDS[0].image}
            alt={ECOSYSTEM_CARDS[0].title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
            <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight">
              {ECOSYSTEM_CARDS[0].title}
            </h3>
          </div>
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0071E3] flex items-center justify-center group-hover:scale-110 transition-transform">
            <Plus className="w-5 h-5 text-white" />
          </div>
        </motion.div>

        {/* Small Cards */}
        {ECOSYSTEM_CARDS.slice(1).map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (index + 1) * 0.1 }}
            className="group relative rounded-3xl overflow-hidden cursor-pointer aspect-[16/9]"
          >
            <img
              src={card.image}
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="font-display text-xl lg:text-2xl font-bold text-white leading-tight">
                {card.title}
              </h3>
            </div>
            <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-[#0071E3] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus className="w-5 h-5 text-white" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

// Feature Section
const FeatureSection = ({ feature, index, id }) => {
  const isReversed = index % 2 === 1

  return (
    <section id={id} className={`py-20 lg:py-28 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: isReversed ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`relative ${isReversed ? 'lg:order-2' : ''}`}
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <img src={feature.image} alt={feature.title} className="w-full h-full object-cover" />
            </div>
            {/* Stat Badge */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 shadow-xl border border-gray-100">
              <div className="text-4xl font-display font-bold text-[#0071E3]">
                {feature.stat.value}<span className="text-lg">{feature.stat.unit}</span>
              </div>
              <div className="text-sm text-gray-500">{feature.stat.label}</div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: isReversed ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={isReversed ? 'lg:order-1' : ''}
          >
            <span className="text-xs font-mono text-[#F8970C] tracking-[0.2em] uppercase">{feature.subtitle}</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-6">
              {feature.title}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {feature.description}
            </p>
            <ul className="space-y-3 mb-8">
              {feature.bullets.map((bullet, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#0071E3]/10 flex items-center justify-center flex-shrink-0">
                    <Check size={14} className="text-[#0071E3]" />
                  </div>
                  <span className="text-gray-700">{bullet}</span>
                </li>
              ))}
            </ul>
            <button className="text-[#0071E3] font-semibold flex items-center gap-2 hover:gap-3 transition-all cursor-pointer">
              Learn More <ArrowRight size={18} />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Charging Methods Section
const ChargingMethodsSection = () => (
  <section className="py-20 lg:py-28 bg-[#f5f5f7]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-12"
      >
        Multiple Ways to Recharge, All Fast
      </motion.h2>

      {/* Large Cards - Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5">
        {CHARGING_METHODS.large.map((method, index) => (
          <motion.div
            key={method.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative rounded-2xl overflow-hidden aspect-[16/10] group cursor-pointer"
          >
            <img
              src={method.image}
              alt={method.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
            <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-center">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-tight">
                {method.title}
              </h3>
              {method.subtitle && (
                <p className="text-lg md:text-xl font-semibold text-white/90 mt-1">
                  {method.subtitle}
                </p>
              )}
              <p className="text-xs sm:text-sm md:text-base text-white/70 mt-2 sm:mt-3 whitespace-pre-line leading-relaxed">
                {method.specs}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Small Cards - Bottom Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
        {CHARGING_METHODS.small.map((method, index) => (
          <motion.div
            key={method.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (index + 2) * 0.1 }}
            className="relative rounded-2xl overflow-hidden aspect-[4/3] group cursor-pointer"
          >
            <img
              src={method.image}
              alt={method.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <h4 className="text-base font-bold text-white leading-tight">
                    {method.title}
                  </h4>
                  {method.subtitle && (
                    <p className="text-sm font-semibold text-white/90">
                      {method.subtitle}
                    </p>
                  )}
                </div>
                <p className="text-xs text-white/60 whitespace-pre-line text-right leading-relaxed">
                  {method.specs}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footnote */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="text-center text-sm text-gray-500 mt-8"
      >
        Note: Data tested by VoltNest Labs. Actual charging times may vary.
      </motion.p>
    </div>
  </section>
)

// Solar Charging Section with Tabs
const SolarChargingSection = () => {
  const [activeTab, setActiveTab] = useState('4kw')

  const tabs = [
    { id: '4kw', label: '4kW Quick Power' },
    { id: '8kw', label: '8kW Off-Grid Power' },
    { id: '30kw', label: '30kW Whole-Home Backup' },
  ]

  const tabContent = {
    '4kw': {
      title: 'Npex 600 + B300K + SolarX 4K:',
      description: 'Fully charges in just 1.9 hours with 4 kW solar from SolarX 4K alone, providing fast energy for lights, small appliances, and daily electronics.',
      image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/hydrogen-energy-house-have-solar-panels-and-wind-t-2026-01-09-00-41-53-utc.jpg?v=1769929695',
    },
    '8kw': {
      title: 'Npex 600 + 2×B300K + SolarX 4K:',
      description: 'Harness 8kW of solar power for complete off-grid independence. Power your RV, cabin, or remote worksite with sustainable energy that lasts all day.',
      image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/a-solar-panel-in-a-farmhouse-garden-2026-01-09-08-42-13-utc.jpg?v=1769929695',
    },
    '30kw': {
      title: 'Npex 600 + 4×B300K + SolarX 4K Array:',
      description: 'Ultimate whole-home backup with 30kW solar input capacity. Run your entire home including HVAC, EV charging, and heavy appliances purely on solar.',
      image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/residential-house-with-rooftop-covered-with-solar-2026-01-07-00-14-25-utc.jpg?v=1769933513',
    },
  }

  const current = tabContent[activeTab]

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            Super-Fast Solar Charging
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-gray-600 max-w-3xl mx-auto mb-2 leading-relaxed"
        >
          With VoltNest's SolarX 4K—the world's first 4,000W solar charge controller, you can harness 3.8kW–19.2kW
          of solar input. Easily integrate it with existing rooftop solar systems via AC coupling, making it perfect for DIY
          enthusiasts who want flexible, high-power charging.
        </motion.p>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-sm text-gray-400 mb-10"
        >
          Note: Data tested by VoltNest Labs. Actual charging times may vary.
        </motion.p>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden mb-8"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={current.image}
              alt="Solar Charging Setup"
              className="w-full aspect-[16/9] object-cover"
            />
          </AnimatePresence>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 py-3 text-sm font-medium transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'text-gray-900'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="solarTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.p
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="text-center text-gray-600 max-w-3xl mx-auto"
          >
            <span className="font-semibold text-gray-900">{current.title}</span>{' '}
            {current.description}
          </motion.p>
        </AnimatePresence>
      </div>
    </section>
  )
}

// Specs Section
const SpecsSection = () => {
  const [activeTab, setActiveTab] = useState('specs')

  const tabs = [
    { id: 'specs', label: 'Specifications' },
    { id: 'inbox', label: 'In the Box' },
    { id: 'downloads', label: 'Downloads' },
  ]

  return (
    <section id="specs" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">
            Technical Specifications
          </h2>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#0071E3] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'specs' && (
            <motion.div
              key="specs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
            >
              {Object.entries(SPECS).map(([category, specs], catIndex) => (
                <div key={category} className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="font-display font-bold text-gray-900 mb-4 capitalize">
                    {category === 'general' ? 'General' : category === 'output' ? 'Output' : 'Input'}
                  </h3>
                  <div className="space-y-3">
                    {specs.map((spec, index) => (
                      <div
                        key={index}
                        className={`flex justify-between py-2 ${index < specs.length - 1 ? 'border-b border-gray-200' : ''}`}
                      >
                        <span className="text-gray-500 text-sm">{spec.label}</span>
                        <span className="text-gray-900 font-medium text-sm text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'inbox' && (
            <motion.div
              key="inbox"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-gray-50 rounded-2xl p-8">
                <div className="grid sm:grid-cols-2 gap-4">
                  {IN_THE_BOX.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#0071E3]/10 flex items-center justify-center">
                        <Package size={16} className="text-[#0071E3]" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'downloads' && (
            <motion.div
              key="downloads"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="space-y-3">
                {DOWNLOADS.map((file, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center justify-between p-5 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#0071E3]/10 flex items-center justify-center group-hover:bg-[#0071E3] transition-colors">
                        <FileText className="w-6 h-6 text-[#0071E3] group-hover:text-white transition-colors" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-900">{file.name}</p>
                        <p className="text-sm text-gray-500">{file.type} • {file.size}</p>
                      </div>
                    </div>
                    <Download className="w-5 h-5 text-gray-400 group-hover:text-[#0071E3] transition-colors" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

// Comparison Section
const ComparisonSection = () => (
  <section id="compare" className="py-20 lg:py-28 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">
          Compare Models
        </h2>
        <p className="text-gray-500 mt-4">Find the perfect power solution for your needs</p>
      </motion.div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[540px]">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 px-4 font-semibold text-gray-900">Model</th>
              <th className="text-center py-4 px-4 font-semibold text-gray-900">Capacity</th>
              <th className="text-center py-4 px-4 font-semibold text-gray-900">Output</th>
              <th className="text-center py-4 px-4 font-semibold text-gray-900">Solar Input</th>
              <th className="text-center py-4 px-4 font-semibold text-gray-900">Cycle Life</th>
              <th className="text-center py-4 px-4 font-semibold text-gray-900">Weight</th>
              <th className="text-right py-4 px-4 font-semibold text-gray-900">Price</th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON.map((row, index) => (
              <motion.tr
                key={row.model}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`border-b border-gray-100 ${row.highlight ? 'bg-[#0071E3]/5' : ''}`}
              >
                <td className="py-5 px-4">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">{row.model}</span>
                    {row.highlight && (
                      <span className="px-2 py-0.5 bg-[#0071E3] text-white text-xs font-bold rounded-full">
                        Best Value
                      </span>
                    )}
                  </div>
                </td>
                <td className="text-center py-5 px-4 text-gray-600">{row.capacity}</td>
                <td className="text-center py-5 px-4 text-gray-600">{row.output}</td>
                <td className="text-center py-5 px-4 text-gray-600">{row.solar}</td>
                <td className="text-center py-5 px-4 text-gray-600">{row.cycles}</td>
                <td className="text-center py-5 px-4 text-gray-600">{row.weight}</td>
                <td className="text-right py-5 px-4 font-bold text-[#0071E3]">{row.price}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
)

// Reviews Section
const ReviewsSection = () => {
  const avgRating = 4.9
  const totalReviews = 2847
  const distribution = [
    { stars: 5, percent: 89 },
    { stars: 4, percent: 8 },
    { stars: 3, percent: 2 },
    { stars: 2, percent: 1 },
    { stars: 1, percent: 0 },
  ]

  return (
    <section id="reviews" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">
            Customer Reviews
          </h2>
        </motion.div>

        {/* Summary */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Rating */}
          <div className="text-center md:text-left">
            <div className="flex items-baseline justify-center md:justify-start gap-2 mb-2">
              <span className="text-6xl font-display font-bold text-gray-900">{avgRating}</span>
              <span className="text-2xl text-gray-400">/5</span>
            </div>
            <div className="flex justify-center md:justify-start gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={20} className="text-[#F8970C] fill-[#F8970C]" />
              ))}
            </div>
            <p className="text-gray-500">{totalReviews.toLocaleString()} reviews</p>
          </div>

          {/* Distribution */}
          <div className="space-y-2">
            {distribution.map((item) => (
              <div key={item.stars} className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-8">{item.stars}★</span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#F8970C] rounded-full"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
                <span className="text-sm text-gray-500 w-10">{item.percent}%</span>
              </div>
            ))}
          </div>

          {/* Write Review */}
          <div className="flex items-center justify-center md:justify-end">
            <button className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors cursor-pointer">
              Write a Review
            </button>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {REVIEWS.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 rounded-2xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900">{review.author}</span>
                    {review.verified && (
                      <span className="text-xs text-[#0071E3] font-medium flex items-center gap-1">
                        <Check size={12} /> Verified Purchase
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={14}
                          className={star <= review.rating ? 'text-[#F8970C] fill-[#F8970C]' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                </div>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
              <p className="text-gray-600 leading-relaxed mb-4">{review.content}</p>
              {review.images.length > 0 && (
                <div className="flex gap-2 mb-4">
                  {review.images.map((img, i) => (
                    <img key={i} src={img} alt="" className="w-20 h-20 rounded-lg object-cover" />
                  ))}
                </div>
              )}
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <button className="hover:text-[#0071E3] transition-colors cursor-pointer">
                  Helpful ({review.helpful})
                </button>
                <button className="hover:text-[#0071E3] transition-colors cursor-pointer">
                  Report
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="px-6 py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
            Load More Reviews
          </button>
        </div>
      </div>
    </section>
  )
}

// FAQ Section
const FAQSection = () => {
  const [openId, setOpenId] = useState(null)

  return (
    <section id="faq" className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown size={20} className="text-gray-400" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="px-5 pb-5 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-500 mb-4">Still have questions?</p>
          <button className="px-6 py-3 bg-[#0071E3] text-white font-semibold rounded-xl hover:bg-[#005BB6] transition-colors cursor-pointer">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  )
}

// Accessories Carousel
const AccessoriesSection = () => {
  const scrollRef = useRef(null)

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section id="accessories" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">
              Recommended Accessories
            </h2>
            <p className="text-gray-500 mt-2">Complete your power setup</p>
          </motion.div>
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <ChevronRight size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {ACCESSORIES.map((accessory, index) => (
            <motion.div
              key={accessory.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex-shrink-0 w-[280px] snap-start"
            >
              <div className="group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all cursor-pointer">
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={accessory.image}
                    alt={accessory.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {accessory.tag && (
                    <span className={`absolute top-3 left-3 px-2.5 py-1 text-xs font-bold rounded-full ${
                      accessory.tag === 'Best Seller' ? 'bg-[#F8970C] text-white' :
                      accessory.tag === 'New' ? 'bg-[#0071E3] text-white' :
                      'bg-gray-900 text-white'
                    }`}>
                      {accessory.tag}
                    </span>
                  )}
                  <button className="absolute bottom-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-[#F8970C] hover:text-white">
                    <ShoppingCart size={18} />
                  </button>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-1">{accessory.name}</h4>
                  <p className="text-sm text-gray-500 mb-2">{accessory.capacity}</p>
                  <p className="text-lg font-bold text-[#0071E3]">${accessory.price.toLocaleString()}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Footer
const Footer = () => (
  <footer className="bg-[#0a1628] py-16 border-t border-white/10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        {/* Logo & Socials */}
        <div className="col-span-2 md:col-span-1">
          <a href="/" className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F8970C] to-[#C6790A] flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-white text-xl">VoltNest</span>
          </a>
          <p className="text-white/50 text-sm mb-6">
            Powering your adventures with clean, reliable energy solutions.
          </p>
        </div>

        {/* Links */}
        {[
          { title: 'Products', links: ['Power Stations', 'Solar Panels', 'Accessories', 'Bundles'] },
          { title: 'Support', links: ['Contact Us', 'FAQ', 'Warranty', 'Shipping'] },
          { title: 'Company', links: ['About', 'Careers', 'Press', 'Blog'] },
        ].map((column) => (
          <div key={column.title}>
            <h4 className="font-semibold text-white mb-4">{column.title}</h4>
            <ul className="space-y-2">
              {column.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10">
        <p className="text-white/40 text-sm">
          © 2026 VoltNest Inc. All rights reserved.
        </p>
        <div className="flex gap-6">
          {['Privacy', 'Terms', 'Cookies'].map((link) => (
            <a key={link} href="#" className="text-white/40 text-sm hover:text-white transition-colors">
              {link}
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
)

// Section Navigation
const SECTION_NAV = [
  { id: 'ecosystem', label: 'Ecosystem', dark: true },
  { id: 'features', label: 'Features', dark: false },
  { id: 'specs', label: 'Tech Specs', dark: false },
  { id: 'compare', label: 'Compare', dark: false },
  { id: 'reviews', label: 'Reviews', dark: false },
  { id: 'faq', label: 'FAQ', dark: false },
  { id: 'accessories', label: 'Accessories', dark: false },
]

const SectionNav = ({ activeSection, sectionProgress, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false)

  // Determine if current section has dark background
  const currentSectionData = SECTION_NAV.find(s => s.id === activeSection)
  const isDark = currentSectionData?.dark || false

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  // SVG circle properties
  const circleSize = 14
  const strokeWidth = 2
  const radius = (circleSize - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  // Colors based on dark/light mode
  const colors = {
    bgCircle: isDark ? 'rgba(255,255,255,0.3)' : '#D1D5DB',
    bgCircleActive: isDark ? 'rgba(255,255,255,0.5)' : '#E5E7EB',
    progressCircle: '#0071E3',
    dot: isDark ? 'bg-white/40' : 'bg-gray-300',
    dotActive: 'bg-[#0071E3]',
    labelActive: isDark ? 'text-white' : 'text-gray-900',
    labelInactive: isDark ? 'text-white/50' : 'text-gray-400',
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-start gap-2"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {SECTION_NAV.map((section) => {
            const isActive = activeSection === section.id
            const progress = isActive ? sectionProgress : 0
            const strokeDashoffset = circumference - (progress / 100) * circumference

            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="flex items-center gap-2.5 cursor-pointer py-0.5"
              >
                {/* Circle with progress indicator */}
                <div className="relative w-[14px] h-[14px] flex items-center justify-center">
                  {/* Background circle */}
                  <svg width={circleSize} height={circleSize} className="absolute inset-0">
                    <circle
                      cx={circleSize / 2}
                      cy={circleSize / 2}
                      r={radius}
                      fill="none"
                      stroke={isActive ? colors.bgCircleActive : colors.bgCircle}
                      strokeWidth={strokeWidth}
                      className="transition-colors duration-300"
                    />
                  </svg>
                  {/* Progress circle */}
                  {isActive && (
                    <svg width={circleSize} height={circleSize} className="absolute inset-0 -rotate-90">
                      <circle
                        cx={circleSize / 2}
                        cy={circleSize / 2}
                        r={radius}
                        fill="none"
                        stroke={colors.progressCircle}
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-[stroke-dashoffset] duration-100"
                      />
                    </svg>
                  )}
                  {/* Center dot */}
                  <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    isActive ? colors.dotActive : colors.dot
                  }`} />
                </div>
                {/* Label - shows for active or when list is hovered */}
                <span className={`text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? `opacity-100 ${colors.labelActive}`
                    : isHovered
                      ? `opacity-100 ${colors.labelInactive}`
                      : 'opacity-0 w-0'
                }`}>
                  {section.label}
                </span>
              </button>
            )
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function Apex300Product() {
  const [showAnnouncement, setShowAnnouncement] = useState(true)
  const [selectedVariant, setSelectedVariant] = useState(3) // Default to Npex 600 + B300K
  const [quantity, setQuantity] = useState(1)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [activeSection, setActiveSection] = useState('')
  const [sectionProgress, setSectionProgress] = useState(0)
  const [showSectionNav, setShowSectionNav] = useState(false)

  const variant = VARIANTS.find(v => v.id === selectedVariant)

  const openLightbox = (index) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  // Intersection Observer for section tracking
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    }

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
          setShowSectionNav(true)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    SECTION_NAV.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  // Hide nav when scrolled above first section
  useEffect(() => {
    const handleScroll = () => {
      const firstSection = document.getElementById(SECTION_NAV[0].id)
      if (firstSection) {
        const rect = firstSection.getBoundingClientRect()
        // Hide when the first section is below the viewport
        if (rect.top > window.innerHeight * 0.5) {
          setShowSectionNav(false)
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      if (!activeSection) return

      const element = document.getElementById(activeSection)
      if (!element) return

      const rect = element.getBoundingClientRect()
      const elementTop = rect.top
      const elementHeight = rect.height
      const viewportHeight = window.innerHeight

      // Calculate how much of the section has been scrolled through
      const scrolledPast = viewportHeight * 0.2 - elementTop
      const progress = Math.min(100, Math.max(0, (scrolledPast / elementHeight) * 100))

      setSectionProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeSection])

  return (
    <div className="min-h-screen bg-white">
      {/* Section Navigation */}
      <SectionNav activeSection={activeSection} sectionProgress={sectionProgress} isVisible={showSectionNav} />

      {/* Announcement Bar */}
      <AnnouncementBarShared />

      {/* Header */}
      <Navbar />

      {/* Breadcrumb */}
      <Breadcrumb />

      {/* PDP Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          {/* Gallery - Left Side, Sticky */}
          <div className="w-full lg:w-1/2 flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <ImageGallery images={PRODUCT_IMAGES} onExpand={openLightbox} />
            </div>
          </div>

          {/* Purchase Panel - Right Side, Scrollable */}
          <div className="w-full lg:w-1/2">
            <PurchasePanel
              variants={VARIANTS}
              selectedVariant={selectedVariant}
              onVariantChange={setSelectedVariant}
              quantity={quantity}
              onQuantityChange={setQuantity}
            />
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <TrustStrip />

      {/* Ecosystem Section */}
      <EcosystemSection />

      {/* Feature Sections - First Two */}
      {FEATURES.slice(0, 2).map((feature, index) => (
        <FeatureSection key={feature.id} feature={feature} index={index} id={index === 0 ? 'features' : undefined} />
      ))}

      {/* Charging Methods Section */}
      <ChargingMethodsSection />

      {/* Feature Sections - Remaining */}
      {FEATURES.slice(2).map((feature, index) => (
        <FeatureSection key={feature.id} feature={feature} index={index + 2} />
      ))}

      {/* Solar Charging Section */}
      <SolarChargingSection />

      {/* Specs */}
      <SpecsSection />

      {/* Comparison */}
      <ComparisonSection />

      {/* Reviews */}
      <ReviewsSection />

      {/* FAQ */}
      <FAQSection />

      {/* Accessories */}
      <AccessoriesSection />

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky ATC Bar */}
      <MobileStickyBar price={variant.price * quantity} onAddToCart={() => {}} />

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={PRODUCT_IMAGES}
            startIndex={lightboxIndex}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
