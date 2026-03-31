import { motion } from 'framer-motion';

const tickerImages = [
  { src: '/images/ticker-1.jpg', name: 'Victory Celebration', rarity: 'Legendary' },
  { src: '/images/ticker-2.jpg', name: 'Perfect Pass', rarity: 'Epic' },
  { src: '/images/ticker-3.jpg', name: 'Breakaway Run', rarity: 'Rare' },
  { src: '/images/ticker-4.jpg', name: 'Power Tackle', rarity: 'Epic' },
  { src: '/images/ticker-5.jpg', name: 'Field Goal', rarity: 'Common' },
  { src: '/images/ticker-6.jpg', name: 'Diving Catch', rarity: 'Rare' },
];

// Duplicate for seamless loop
const allImages = [...tickerImages, ...tickerImages, ...tickerImages];

const getRarityColor = (rarity: string) => {
  switch (rarity.toLowerCase()) {
    case 'legendary':
      return 'text-gold';
    case 'epic':
      return 'text-purple-400';
    case 'rare':
      return 'text-blue-400';
    default:
      return 'text-gray-400';
  }
};

export function ImageTicker() {
  return (
    <section className="relative py-16 lg:py-24 bg-black overflow-hidden">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between"
        >
          <div>
            <span className="text-gold text-xs font-semibold uppercase tracking-[0.2em]">
              Trending Moments
            </span>
            <h2 className="mt-2 text-2xl lg:text-3xl font-bold text-white">
              Hot Right Now
            </h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="text-sm text-white/60 hover:text-gold transition-colors"
          >
            View All
          </motion.button>
        </motion.div>
      </div>

      {/* Ticker container with fade masks */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 lg:w-64 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-32 lg:w-64 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        {/* Scrolling content */}
        <div className="ticker-container overflow-hidden">
          <motion.div
            className="ticker-content flex gap-4 lg:gap-6"
            animate={{ x: [0, -33.33 + '%'] }}
            transition={{
              x: {
                duration: 40,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
          >
            {allImages.map((image, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0 relative group cursor-pointer"
              >
                <div className="relative w-48 lg:w-64 aspect-[2/3] rounded-xl overflow-hidden">
                  {/* Glow on hover */}
                  <div className="absolute -inset-1 bg-gradient-to-br from-gold/20 to-neon-purple/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/5 group-hover:border-gold/30 transition-colors duration-300">
                    <img
                      src={image.src}
                      alt={image.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className={`text-xs font-bold uppercase tracking-wider ${getRarityColor(image.rarity)}`}>
                        {image.rarity}
                      </div>
                      <div className="text-white font-semibold mt-1 truncate">
                        {image.name}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
