import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Zap } from 'lucide-react'

const announcements = [
  {
    icon: '🔥',
    text: 'New: VoltNest Pro 3000 — 30% More Power, Same Size',
    link: 'Shop Now →',
  },
  {
    icon: '☀️',
    text: 'Solar Season Sale: $200 OFF Solar Panel Bundles',
    link: 'Claim Offer →',
  },
  {
    icon: '🚚',
    text: 'Free Shipping on Orders Over $500 | 30-Day Returns',
    link: 'Learn More →',
  },
]

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="relative bg-gradient-to-r from-sunset-600 via-sunset-500 to-copper-500 text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-center gap-4">
        <button
          onClick={() => setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length)}
          className="p-1 hover:bg-white/20 rounded-full transition-colors"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="flex-1 text-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center gap-2 text-sm font-medium"
            >
              <span>{announcements[currentIndex].icon}</span>
              <span>{announcements[currentIndex].text}</span>
              <a href="#" className="underline underline-offset-2 hover:no-underline font-semibold">
                {announcements[currentIndex].link}
              </a>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % announcements.length)}
          className="p-1 hover:bg-white/20 rounded-full transition-colors"
        >
          <ChevronRight size={16} />
        </button>

        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </motion.div>
  )
}
