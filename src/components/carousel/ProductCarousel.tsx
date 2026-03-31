import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Marcus Green',
    title: 'Championship Catch',
    image: '/images/player-card-main.jpg',
    video: '/images/hero-video-2.jpg',
    rarity: 'Epic',
    price: '1.8 ETH',
    lowestAsk: '1.5 ETH',
    supply: '2/100',
  },
  {
    id: 2,
    name: 'QB Prospect',
    title: 'Game-Winning TD',
    image: '/images/related-1.jpg',
    video: '/images/hero-video-3.jpg',
    rarity: 'Legendary',
    price: '8.5 ETH',
    lowestAsk: '7.2 ETH',
    supply: '5/35',
  },
  {
    id: 3,
    name: 'Running Back',
    title: 'Record Breaker',
    image: '/images/related-2.jpg',
    video: '/images/hero-video-4.jpg',
    rarity: 'Rare',
    price: '2.3 ETH',
    lowestAsk: '2.1 ETH',
    supply: '12/199',
  },
  {
    id: 4,
    name: 'Linebacker',
    title: 'Game-Saving Tackle',
    image: '/images/related-3.jpg',
    video: '/images/ticker-4.jpg',
    rarity: 'Epic',
    price: '1.5 ETH',
    lowestAsk: '1.3 ETH',
    supply: '8/100',
  },
  {
    id: 5,
    name: 'Kicker',
    title: '50-Yard Field Goal',
    image: '/images/related-4.jpg',
    video: '/images/ticker-5.jpg',
    rarity: 'Common',
    price: '0.3 ETH',
    lowestAsk: '0.25 ETH',
    supply: '342/8000',
  },
  {
    id: 6,
    name: 'Wide Receiver',
    title: 'One-Handed Grab',
    image: '/images/ticker-1.jpg',
    video: '/images/hero-video-2.jpg',
    rarity: 'Rare',
    price: '1.2 ETH',
    lowestAsk: '1.0 ETH',
    supply: '45/500',
  },
];

const getRarityColor = (rarity: string) => {
  switch (rarity.toLowerCase()) {
    case 'legendary':
      return 'from-yellow-500/20 to-amber-500/20 border-yellow-500/30 text-yellow-400';
    case 'epic':
      return 'from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400';
    case 'rare':
      return 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400';
    default:
      return 'from-gray-500/20 to-slate-500/20 border-gray-500/30 text-gray-400';
  }
};

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex-shrink-0 w-72 lg:w-80 snap-start"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative group cursor-pointer"
      >
        {/* Glow effect */}
        <div className={`absolute -inset-1 bg-gradient-to-br ${getRarityColor(product.rarity)} rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
        
        <div className="relative bg-dark-card rounded-2xl overflow-hidden border border-white/5 group-hover:border-white/15 transition-all duration-300">
          {/* Media area */}
          <div className="relative aspect-[3/4] overflow-hidden">
            {/* Static image */}
            <motion.img
              src={product.image}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover"
              animate={{ opacity: isHovered ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Video/hover image */}
            <motion.img
              src={product.video}
              alt={`${product.name} action`}
              className="absolute inset-0 w-full h-full object-cover"
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

            {/* Rarity badge */}
            <div className={`absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r ${getRarityColor(product.rarity)} border text-xs font-bold uppercase tracking-wider backdrop-blur-sm`}>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                {product.rarity}
              </div>
            </div>

            {/* Supply badge */}
            <div className="absolute top-4 right-4 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-xs text-white/80 font-mono">
              #{product.supply}
            </div>
          </div>

          {/* Info area */}
          <div className="p-5">
            <h3 className="text-white font-bold text-lg">{product.name}</h3>
            <p className="text-white/50 text-sm mt-0.5">{product.title}</p>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
              <div>
                <div className="text-xs text-white/40 uppercase tracking-wider">Lowest Ask</div>
                <div className="text-gold font-bold text-lg">{product.lowestAsk}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-white/40 uppercase tracking-wider">Last Sale</div>
                <div className="text-white/60 font-medium">{product.price}</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProductCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="relative py-24 lg:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gold text-xs font-semibold uppercase tracking-[0.2em]">
              Featured Drops
            </span>
            <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-white">
              Latest Collectibles
            </h2>
            <p className="mt-4 text-white/50 max-w-md">
              Discover the newest moments from rising stars. Limited editions available now.
            </p>
          </motion.div>

          {/* Navigation arrows */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:flex items-center gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 lg:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 lg:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          className="flex gap-5 lg:gap-6 overflow-x-auto hide-scrollbar snap-x px-6 lg:px-8 pb-4"
          style={{ scrollPaddingLeft: '1.5rem' }}
        >
          {/* Spacer for left alignment */}
          <div className="flex-shrink-0 w-0 lg:w-[calc((100vw-1280px)/2)]" />
          
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
          
          {/* Spacer for right alignment */}
          <div className="flex-shrink-0 w-6 lg:w-[calc((100vw-1280px)/2)]" />
        </div>
      </div>

      {/* View all button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="max-w-7xl mx-auto px-6 lg:px-8 mt-12 text-center"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 hover:border-white/20 transition-all duration-300"
        >
          View All Collectibles
        </motion.button>
      </motion.div>
    </section>
  );
}
