import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <section className="relative h-[80vh] sm:h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://cdn.shopify.com/videos/c/o/v/3934f84c770545598eafc05f29124623.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto px-4 sm:px-6"
        >
          {/* Subtitle */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-block text-xs sm:text-sm font-mono text-[#F8970C] tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-3 sm:mb-4"
          >
            Experience The Power
          </motion.span>

          {/* Main Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight"
          >
            Energy Freedom,
            <br />
            <span className="text-[#F8970C]">Anywhere You Go</span>
          </motion.h2>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed px-2"
          >
            From remote wilderness adventures to unexpected power outages,
            VoltNest delivers reliable, clean energy that keeps your world running.
            Embrace the freedom of portable power.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 sm:mt-8 px-6 sm:px-8 py-3 sm:py-4 bg-[#F8970C] text-white font-bold rounded-full hover:bg-[#E8860B] transition-colors cursor-pointer text-sm sm:text-base"
          >
            Explore Our Products
          </motion.button>
        </motion.div>
      </div>

      {/* Video Controls */}
      <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 flex items-center gap-2 sm:gap-3">
        <button
          onClick={togglePlay}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          ) : (
            <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white ml-0.5" />
          )}
        </button>
        <button
          onClick={toggleMute}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          ) : (
            <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          )}
        </button>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hidden sm:flex"
      >
        <span className="text-xs text-white/50 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center pt-1"
        >
          <div className="w-1 h-2 bg-[#F8970C] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
