import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnnouncementBar from './components/AnnouncementBar'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductShowcase from './components/ProductShowcase'
import ProductComparison from './components/ProductComparison'
import Scenarios from './components/Scenarios'
import Testimonials from './components/Testimonials'
import MediaLogos from './components/MediaLogos'
import FAQ from './components/FAQ'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import LiveStats from './components/LiveStats'
import Sustainability from './components/Sustainability'
import CoreCapabilities from './components/CoreCapabilities'
import VideoSection from './components/VideoSection'

function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Clean Background - BLUETTI Style */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[#F8F8F8]" />

      <AnimatePresence>
        {isLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <AnnouncementBar />
            <Navbar />
            <main>
              <Hero />
              <ProductShowcase />
              <VideoSection />
              <LiveStats />
              <CoreCapabilities />
              <Sustainability />
              <Scenarios />
              <ProductComparison />
              <Testimonials />
              <MediaLogos />
              <FAQ />
              <Newsletter />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
