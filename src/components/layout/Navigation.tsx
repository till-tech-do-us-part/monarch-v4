import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { label: 'Explore', href: '#' },
  { label: 'Drops', href: '#' },
  { label: 'Market', href: '#' },
  { label: 'Play', href: '#' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
          isScrolled 
            ? 'bg-black/80 backdrop-blur-[20px] border-b border-whiteAlpha-200' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* Logo */}
            <motion.a 
              href="#" 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative w-9 h-9">
                <div className="absolute inset-0 bg-gold rounded-lg animate-pulse-glow opacity-60" />
                <div className="relative w-full h-full bg-gold rounded-lg flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-black" fill="currentColor">
                    <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5M19 19A1 1 0 0120 20H4A1 1 0 013 19V18H19V19Z" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-gold font-bold text-lg tracking-tight">MONARCH</span>
                <span className="text-white/40 text-[9px] tracking-[0.2em] uppercase">Sports Digital</span>
              </div>
              <span className="ml-2 px-1.5 py-0.5 bg-gold/20 text-gold text-[9px] font-bold uppercase tracking-wider rounded">
                Beta
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
                  className="relative text-sm font-medium text-white/70 hover:text-white uppercase tracking-[0.12em] transition-colors duration-200 group"
                >
                  {item.label}
                  {/* Underline animation */}
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-neon-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                </motion.a>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              <motion.button 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.95 }}
                className="p-2.5 text-white/50 hover:text-white transition-colors duration-200"
              >
                <Search className="w-5 h-5" />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.95 }}
                className="hidden sm:flex p-2.5 text-white/50 hover:text-white transition-colors duration-200"
              >
                <Heart className="w-5 h-5" />
              </motion.button>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  className="hidden sm:flex btn-frosted text-white hover:bg-white/5 font-semibold uppercase tracking-[0.15em] px-6 py-5 rounded-xl transition-all duration-200"
                >
                  Sign In
                </Button>
              </motion.div>
              
              {/* Mobile Menu Button */}
              <button 
                className="lg:hidden p-2 text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[999] lg:hidden"
          >
            <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setMobileMenuOpen(false)} />
            <motion.nav 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-canvas-surface-2 border-l border-whiteAlpha-100 p-8 pt-24"
            >
              <div className="flex flex-col gap-6">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    className="text-2xl font-bold text-white/80 hover:text-gold uppercase tracking-wide transition-colors"
                  >
                    {item.label}
                  </motion.a>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8"
                >
                  <Button className="w-full btn-frosted text-white hover:bg-white/5 font-bold uppercase tracking-wider py-6 rounded-xl">
                    Sign In / Join
                  </Button>
                </motion.div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
