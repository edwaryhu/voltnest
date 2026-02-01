import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, User, ShoppingBag, Menu, X, ChevronDown, Zap, ArrowRight } from 'lucide-react'

const navItems = [
  {
    label: 'Power Stations',
    href: '#',
    megaMenu: {
      title: 'Power Stations',
      description: 'Portable power for every adventure',
      products: [
        { name: 'VoltNest Pro 1000', desc: '1024Wh • Portable', price: '$899', image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/VoltNex-pp1.png?v=1769943132' },
        { name: 'VoltNest Pro 2000', desc: '2048Wh • Home & Camp', price: '$1,499', image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/VoltNex-pp2.png?v=1769943131', popular: true },
        { name: 'VoltNest Pro 3000', desc: '3072Wh • Whole Home', price: '$2,199', image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/VoltNex-pp3.png?v=1769943131' },
      ],
      links: [
        { label: 'View All Power Stations', href: '#' },
        { label: 'Compare Models', href: '#' },
        { label: 'Find Your Fit Quiz', href: '#' },
      ],
      featured: {
        title: 'New Release',
        subtitle: 'Pro 3000 Series',
        desc: '30% more power, same compact size',
        image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/VoltNex-pp1.png?v=1769943132',
      },
    },
  },
  {
    label: 'Solar Panels',
    href: '#',
    megaMenu: {
      title: 'Solar Panels',
      description: 'Harness the power of the sun',
      products: [
        { name: 'SunFold 100', desc: '100W • Foldable', price: '$249', image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/VoltNex-pp1.png?v=1769943132' },
        { name: 'SunFold 200', desc: '200W • Portable', price: '$399', image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/VoltNex-pp2.png?v=1769943131', popular: true },
        { name: 'SunFold 400', desc: '400W • High Output', price: '$699', image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/VoltNex-pp3.png?v=1769943131' },
      ],
      links: [
        { label: 'View All Panels', href: '#' },
        { label: 'Solar Calculator', href: '#' },
        { label: 'Installation Guide', href: '#' },
      ],
      featured: {
        title: 'Best Seller',
        subtitle: 'SunFold 200',
        desc: 'Perfect balance of power and portability',
        image: 'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/VoltNex-pp2.png?v=1769943131',
      },
    },
  },
  { label: 'Bundles', href: '#' },
  { label: 'Accessories', href: '#' },
  { label: 'Support', href: '#' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeMenu, setActiveMenu] = useState(null)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const currentMegaMenu = activeMenu !== null ? navItems[activeMenu]?.megaMenu : null

  return (
    <motion.header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled || activeMenu !== null
          ? 'bg-white/90 backdrop-blur-xl shadow-sm border-b border-gray-100'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseLeave={() => setActiveMenu(null)}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-[#207233] flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(32,114,51,0.4)] transition-shadow">
              <Zap className="w-5 h-5 text-white" fill="white" />
            </div>
            <span className="font-display font-bold text-xl text-gray-900">VoltNest</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => item.megaMenu ? setActiveMenu(index) : setActiveMenu(null)}
              >
                <a
                  href={item.href}
                  className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors ${
                    activeMenu === index ? 'text-sunset-500' : 'text-gray-600 hover:text-sunset-500'
                  }`}
                >
                  {item.label}
                  {item.megaMenu && (
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${activeMenu === index ? 'rotate-180' : ''}`}
                    />
                  )}
                </a>
              </div>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
              <Search size={20} className="text-gray-500" />
            </button>
            <button className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
              <User size={20} className="text-gray-500" />
            </button>
            <button className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
              <ShoppingBag size={20} className="text-gray-500" />
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-sunset-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                2
              </span>
            </button>
            <button className="hidden md:flex btn-primary text-sm py-2.5 px-5">Shop Now</button>
            <button
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileOpen(true)}
            >
              <Menu size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </nav>

      {/* Full Width Mega Menu */}
      <AnimatePresence>
        {currentMegaMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="absolute left-0 right-0 top-full bg-white/98 backdrop-blur-xl border-b border-gray-100 shadow-lg overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-6 py-8">
              <div className="grid grid-cols-12 gap-8">
                {/* Left: Title & Links */}
                <div className="col-span-3">
                  <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">
                    {currentMegaMenu.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-6">
                    {currentMegaMenu.description}
                  </p>
                  <div className="space-y-3">
                    {currentMegaMenu.links.map((link, lIndex) => (
                      <a
                        key={lIndex}
                        href={link.href}
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-sunset-500 transition-colors group"
                      >
                        <ArrowRight size={14} className="text-sunset-500 group-hover:translate-x-1 transition-transform" />
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Middle: Products Grid */}
                <div className="col-span-6">
                  <div className="grid grid-cols-3 gap-4">
                    {currentMegaMenu.products.map((product, pIndex) => (
                      <motion.a
                        key={pIndex}
                        href="#"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: pIndex * 0.05 }}
                        className="group relative p-4 rounded-2xl hover:bg-gray-50 transition-all duration-300 cursor-pointer"
                      >
                        {product.popular && (
                          <span className="absolute -top-1 -right-1 bg-sunset-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
                            POPULAR
                          </span>
                        )}
                        <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 mb-3 group-hover:shadow-lg group-hover:shadow-sunset-500/10 transition-shadow">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h4 className="font-display font-semibold text-gray-900 group-hover:text-sunset-500 transition-colors">
                          {product.name}
                        </h4>
                        <p className="text-xs text-gray-500">{product.desc}</p>
                        <p className="text-sm font-semibold text-sunset-500 mt-1">{product.price}</p>
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Right: Featured */}
                <div className="col-span-3">
                  <div className="relative h-full rounded-2xl overflow-hidden group cursor-pointer">
                    <img
                      src={currentMegaMenu.featured.image}
                      alt={currentMegaMenu.featured.subtitle}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <span className="inline-block bg-sunset-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                        {currentMegaMenu.featured.title}
                      </span>
                      <h4 className="font-display text-xl font-bold text-white mb-1">
                        {currentMegaMenu.featured.subtitle}
                      </h4>
                      <p className="text-gray-300 text-sm mb-3">
                        {currentMegaMenu.featured.desc}
                      </p>
                      <button className="flex items-center gap-2 text-sm font-semibold text-sunset-400 hover:gap-3 transition-all">
                        Learn More <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white lg:hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <a href="#" className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-[#207233] flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" fill="white" />
                  </div>
                  <span className="font-display font-bold text-xl text-gray-900">VoltNest</span>
                </a>
                <button onClick={() => setIsMobileOpen(false)} className="w-10 h-10 flex items-center justify-center text-gray-600">
                  <X size={24} />
                </button>
              </div>
              <div className="space-y-4">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="block text-2xl font-display font-semibold text-gray-900 hover:text-sunset-500 py-2"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <button className="btn-primary w-full mt-8">Shop Now</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
