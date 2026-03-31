import { motion } from 'framer-motion';
import { Twitter, Instagram, MessageCircle, Youtube, Send } from 'lucide-react';

const footerLinks = {
  platform: [
    { label: 'Marketplace', href: '#' },
    { label: 'Drops', href: '#' },
    { label: 'Collections', href: '#' },
    { label: 'Leaderboard', href: '#' },
  ],
  company: [
    { label: 'About', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
    { label: 'Blog', href: '#' },
  ],
  support: [
    { label: 'Help Center', href: '#' },
    { label: 'Contact Us', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Privacy Policy', href: '#' },
  ],
};

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: MessageCircle, href: '#', label: 'Discord' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/5">
      {/* Newsletter section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl lg:text-3xl font-bold text-white">
              Never Miss a Drop
            </h3>
            <p className="mt-3 text-white/50">
              Subscribe to get notified about new releases, exclusive offers, and platform updates.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex gap-3"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50 transition-colors"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-4 rounded-xl bg-gold text-black font-semibold hover:bg-gold-light transition-colors"
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Main footer */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
            {/* Brand */}
            <div className="col-span-2 md:col-span-4 lg:col-span-2">
              <motion.a 
                href="#" 
                className="flex items-center gap-3"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-black" fill="currentColor">
                    <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5M19 19A1 1 0 0120 20H4A1 1 0 013 19V18H19V19Z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-gold font-bold text-xl tracking-tight">MONARCH</span>
                  <span className="text-white/40 text-[10px] tracking-[0.2em] uppercase">Sports Digital</span>
                </div>
              </motion.a>
              
              <p className="mt-6 text-white/50 max-w-sm leading-relaxed">
                The world&apos;s first decentralized platform for high school sports collectibles. 
                Own the moments that matter.
              </p>

              {/* Social links */}
              <div className="flex items-center gap-3 mt-8">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-gold hover:border-gold/30 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Platform links */}
            <div>
              <h4 className="text-white font-semibold mb-5">Platform</h4>
              <ul className="space-y-3">
                {footerLinks.platform.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      className="text-white/50 hover:text-gold transition-colors text-sm"
                      whileHover={{ x: 2 }}
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company links */}
            <div>
              <h4 className="text-white font-semibold mb-5">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      className="text-white/50 hover:text-gold transition-colors text-sm"
                      whileHover={{ x: 2 }}
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support links */}
            <div>
              <h4 className="text-white font-semibold mb-5">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      className="text-white/50 hover:text-gold transition-colors text-sm"
                      whileHover={{ x: 2 }}
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              © 2026 Monarch Sports Digital. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">
                Terms
              </a>
              <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">
                Privacy
              </a>
              <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
