import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HeroSkeleton } from '@/components/loading/Skeleton';

const heroImages = [
  '/images/hero-video-1.jpg',
  '/images/hero-video-2.jpg',
  '/images/hero-video-3.jpg',
  '/images/hero-video-4.jpg',
];

const captions = [
  { context: 'Experience the action', player: 'Live Games' },
  { context: 'Own the highlights', player: 'Epic Moments' },
  { context: 'Collect the best', player: 'Star Players' },
  { context: 'Be part of history', player: 'Game Changers' },
];

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const heroRef = useRef<HTMLElement>(null);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // GSAP entrance animation
  useEffect(() => {
    if (isLoading) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      
      tl.fromTo('.hero-label', 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
      )
      .fromTo('.hero-headline', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo('.hero-subhead',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo('.hero-cta',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      )
      .fromTo('.hero-media',
        { y: 80, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo('.hero-stats',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.5'
      );
    }, heroRef);

    return () => ctx.revert();
  }, [isLoading]);

  // Auto-rotate images
  useEffect(() => {
    if (isLoading) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isLoading]);

  if (isLoading) {
    return <HeroSkeleton />;
  }

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-canvas pt-20"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial opacity-40" />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-8 text-center">
        {/* Label */}
        <motion.div
          className="hero-label inline-flex items-center gap-2 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-red-500 text-sm font-semibold uppercase tracking-[0.2em]">
            Now Live
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="hero-headline text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-[0.9] tracking-tight uppercase">
          Own The
          <span className="block text-gradient mt-2">Moment</span>
        </h1>

        {/* Subhead */}
        <p className="hero-subhead mt-8 text-lg lg:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
          The world&apos;s first decentralized platform for high school sports collectibles. 
          Buy, sell, and trade iconic moments from tomorrow&apos;s stars.
        </p>

        {/* CTA Buttons */}
        <div className="hero-cta flex flex-wrap items-center justify-center gap-4 mt-10">
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button 
              size="lg"
              className="btn-frosted text-white hover:bg-white/5 font-bold uppercase tracking-[0.15em] px-8 py-6 rounded-xl text-sm transition-all duration-200 group"
            >
              Explore Marketplace
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button 
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/5 hover:border-white/40 font-semibold uppercase tracking-[0.15em] px-8 py-6 rounded-xl text-sm transition-all duration-200 group bg-transparent"
            >
              <Play className="mr-2 w-4 h-4" />
              Watch Demo
            </Button>
          </motion.div>
        </div>

        {/* Hero Media - with negative margin to overlap next section */}
        <div className="hero-media relative mt-16 section-overlap">
          <div className="relative aspect-[16/9] max-w-4xl mx-auto rounded-2xl overflow-hidden">
            {/* Glow effect behind */}
            <div className="absolute -inset-4 bg-gradient-to-r from-gold/10 via-neon-purple/10 to-neon-blue/10 rounded-3xl blur-3xl opacity-50" />
            
            {/* Main image container */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-whiteAlpha-100">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={heroImages[currentIndex]}
                  alt="Hero showcase"
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }}
                />
              </AnimatePresence>

              {/* Overlay caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="text-gold text-xs font-semibold uppercase tracking-[0.2em] mb-1">
                      {captions[currentIndex].context}
                    </div>
                    <div className="text-white text-xl font-bold">
                      {captions[currentIndex].player}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Play button overlay */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gold/90 backdrop-blur-sm rounded-full flex items-center justify-center group hover:bg-gold transition-colors"
              >
                <Play className="w-6 h-6 text-black ml-1" fill="currentColor" />
              </motion.button>
            </div>

            {/* Image indicators */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'w-8 bg-gold' 
                      : 'w-1.5 bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Stats preview */}
        <div className="hero-stats flex items-center justify-center gap-12 mt-24 pt-8 border-t border-whiteAlpha-100">
          {[
            { value: '50K+', label: 'Collectors' },
            { value: '2M+', label: 'Moments' },
            { value: '$10M+', label: 'Volume' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-3xl lg:text-4xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-white/40 uppercase tracking-wider mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
