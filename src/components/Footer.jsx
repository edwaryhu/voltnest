import { motion } from 'framer-motion'
import { Zap, Instagram, Youtube, Twitter, Facebook, Phone, Mail } from 'lucide-react'

const footerLinks = {
  Products: [
    { label: 'Power Stations', href: '#' },
    { label: 'Solar Panels', href: '#' },
    { label: 'Bundles', href: '#' },
    { label: 'Accessories', href: '#' },
  ],
  Support: [
    { label: 'FAQ', href: '#' },
    { label: 'Contact Us', href: '#' },
    { label: 'Shipping', href: '#' },
    { label: 'Warranty', href: '#' },
  ],
  Company: [
    { label: 'About Us', href: '#' },
    { label: 'Sustainability', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
  ],
}

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Facebook, href: '#', label: 'Facebook' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Grid - 5 Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sunset-400 to-sunset-600 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" fill="white" />
              </div>
              <span className="font-display font-bold text-lg text-gray-900">VoltNest</span>
            </a>
            <p className="text-gray-500 text-sm mb-5 max-w-xs">
              Portable power stations engineered for explorers. Clean energy that goes wherever you go.
            </p>

            {/* Contact Row */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-5">
              <a href="mailto:hello@voltnest.com" className="flex items-center gap-1.5 hover:text-sunset-500 transition-colors">
                <Mail size={14} />
                hello@voltnest.com
              </a>
              <a href="tel:+1-800-VOLTNEST" className="flex items-center gap-1.5 hover:text-sunset-500 transition-colors">
                <Phone size={14} />
                1-800-VOLTNEST
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-2">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-gray-200 hover:bg-sunset-500 flex items-center justify-center transition-colors group cursor-pointer"
                >
                  <social.icon className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-display font-semibold text-gray-900 text-sm mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link, i) => (
                  <li key={i}>
                    <a href={link.href} className="text-sm text-gray-500 hover:text-sunset-500 transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-6" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>© 2026 VoltNest Inc. All rights reserved.</p>

          <div className="flex items-center gap-4">
            {['Privacy', 'Terms', 'Cookies'].map((link, i) => (
              <a key={i} href="#" className="hover:text-sunset-500 transition-colors">
                {link}
              </a>
            ))}
          </div>

          <div className="flex gap-2">
            {['Visa', 'Mastercard', 'PayPal', 'Apple Pay'].map((method, i) => (
              <div key={i} className="px-2 py-1 bg-gray-200 rounded text-xs text-gray-500">
                {method}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-sunset-500 shadow-lg shadow-sunset-500/30 flex items-center justify-center hover:bg-sunset-400 transition-colors z-50 cursor-pointer"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
      >
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </footer>
  )
}
