import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MomentSlab3D } from '@/components/slab/MomentSlab3D';
import { SlabSkeleton } from '@/components/loading/Skeleton';

// Moment data with rarity tiers and serial numbers
// In production, video URLs would follow pattern:
// assets.monarchsports.com/editions/[edition]/play_[id]_[serial]_[tier]_capture_Animated_1080_1080_Black.mp4
const trendingMoments = [
  {
    id: 1,
    image: '/images/ticker-1.jpg',
    rarity: 'legendary' as const,
    playerName: 'Victory Celebration',
    serial: '24/50',
  },
  {
    id: 2,
    image: '/images/ticker-2.jpg',
    rarity: 'epic' as const,
    playerName: 'Perfect Pass',
    serial: '12/100',
  },
  {
    id: 3,
    image: '/images/ticker-3.jpg',
    rarity: 'rare' as const,
    playerName: 'Breakaway Run',
    serial: '45/500',
  },
  {
    id: 4,
    image: '/images/ticker-4.jpg',
    rarity: 'epic' as const,
    playerName: 'Power Tackle',
    serial: '8/100',
  },
  {
    id: 5,
    image: '/images/ticker-5.jpg',
    rarity: 'common' as const,
    playerName: 'Field Goal',
    serial: '342/8000',
  },
  {
    id: 6,
    image: '/images/ticker-6.jpg',
    rarity: 'rare' as const,
    playerName: 'Diving Catch',
    serial: '67/500',
  },
  {
    id: 7,
    image: '/images/player-card-main.jpg',
    rarity: 'ultimate' as const,
    playerName: 'Marcus Green Epic',
    serial: '2/10',
  },
  {
    id: 8,
    image: '/images/related-1.jpg',
    rarity: 'legendary' as const,
    playerName: 'Game-Winning TD',
    serial: '5/35',
  },
];

export function TrendingMoments() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data loading with skeleton
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-canvas overflow-hidden">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between"
        >
          <div>
            <span className="text-gold text-xs font-semibold uppercase tracking-[0.2em]">
              Trending Now
            </span>
            <h2 className="mt-3 text-4xl lg:text-5xl font-bold text-white uppercase tracking-tight">
              Hot Moments
            </h2>
            <p className="mt-3 text-white/50 max-w-md">
              The most traded collectibles from the past 7 days. Hover to preview, hold to rotate.
            </p>
          </div>

          {/* Navigation arrows */}
          <div className="hidden lg:flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full bg-canvas-surface-2 border border-whiteAlpha-100 flex items-center justify-center text-white/60 hover:text-white hover:bg-canvas-surface-3 hover:border-whiteAlpha-200 transition-all duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full bg-canvas-surface-2 border border-whiteAlpha-100 flex items-center justify-center text-white/60 hover:text-white hover:bg-canvas-surface-3 hover:border-whiteAlpha-200 transition-all duration-200"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Carousel container with gradient masks */}
      <div className="relative">
        {/* Left gradient mask - 80px wide fade to black */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-20 lg:w-24 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, #000000 0%, #000000 40%, transparent 100%)',
          }}
        />
        
        {/* Right gradient mask - 80px wide fade to black */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-20 lg:w-24 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to left, #000000 0%, #000000 40%, transparent 100%)',
          }}
        />

        {/* Scrolling content with snap */}
        <div
          ref={scrollRef}
          className="flex gap-10 overflow-x-auto hide-scrollbar snap-x px-6 lg:px-8 pb-12"
          style={{ scrollPaddingLeft: '1.5rem' }}
        >
          {/* Spacer for left alignment */}
          <div className="flex-shrink-0 w-0 lg:w-[calc((100vw-1280px)/2)]" />
          
          {isLoading ? (
            // Skeleton loading state
            Array(4).fill(null).map((_, i) => (
              <div key={i} className="flex-shrink-0 snap-start">
                <SlabSkeleton />
              </div>
            ))
          ) : (
            trendingMoments.map((moment, index) => (
              <motion.div
                key={moment.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-shrink-0 snap-start"
              >
                <MomentSlab3D
                  image={moment.image}
                  rarity={moment.rarity}
                  playerName={moment.playerName}
                  serial={moment.serial}
                />
              </motion.div>
            ))
          )}
          
          {/* Spacer for right alignment */}
          <div className="flex-shrink-0 w-6 lg:w-[calc((100vw-1280px)/2)]" />
        </div>
      </div>

      {/* View all link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="max-w-7xl mx-auto px-6 lg:px-8 mt-4 text-center"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="text-gold text-sm font-semibold uppercase tracking-[0.15em] hover:underline underline-offset-4"
        >
          View All Trending
        </motion.button>
      </motion.div>
    </section>
  );
}

export default TrendingMoments;
