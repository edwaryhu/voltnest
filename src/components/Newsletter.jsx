import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, ArrowRight, Check, Gift, Zap } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
    }
  }

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-sunset-600 via-sunset-500 to-copper-500" />
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.15) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {!isSubmitted ? (
            <>
              {/* Icon */}
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Gift className="w-8 h-8 text-white" />
              </div>

              {/* Headline */}
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                Get $50 Off Your First Order
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-lg mx-auto">
                Join 50,000+ adventurers. Get exclusive deals, tips, and early access to new products.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex gap-3 p-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <div className="flex-1 flex items-center gap-3 pl-4">
                    <Mail className="w-5 h-5 text-white/60" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="flex-1 bg-transparent text-white placeholder-white/50 outline-none text-sm"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-white text-sunset-600 font-semibold px-6 py-3 rounded-full hover:bg-white/90 transition-colors"
                  >
                    Subscribe
                    <ArrowRight size={18} />
                  </button>
                </div>
              </form>

              {/* Trust Note */}
              <p className="text-sm text-white/60 mt-4">
                No spam, ever. Unsubscribe anytime.
              </p>

              {/* Perks */}
              <div className="flex flex-wrap justify-center gap-6 mt-8">
                {[
                  'Exclusive Discounts',
                  'Early Access',
                  'Adventure Tips',
                  'Product Updates',
                ].map((perk, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-white/80">
                    <Check size={16} className="text-white" />
                    {perk}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/20 flex items-center justify-center">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h2 className="font-display text-3xl font-bold text-white mb-4">
                You're In!
              </h2>
              <p className="text-lg text-white/80 mb-6">
                Check your inbox for your $50 discount code.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="inline-flex items-center gap-2 bg-white/20 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/30 transition-colors"
              >
                <Zap size={18} />
                Start Shopping
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
