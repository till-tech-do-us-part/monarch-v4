import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Lock, Unlock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Pack {
  id: string;
  name: string;
  price: string;
  image: string;
  rarity: 'common' | 'rare' | 'legendary';
  guaranteed: string;
  limit: number;
}

const packs: Pack[] = [
  {
    id: 'starter',
    name: 'Starter Pack',
    price: 'Free',
    image: '/images/feature-2.jpg',
    rarity: 'common',
    guaranteed: '3 Common Moments',
    limit: 1,
  },
  {
    id: 'rare',
    name: 'Championship Pack',
    price: '0.5 ETH',
    image: '/images/feature-1.jpg',
    rarity: 'rare',
    guaranteed: '1 Rare + 2 Common',
    limit: 3,
  },
  {
    id: 'legendary',
    name: 'Elite Pack',
    price: '2.5 ETH',
    image: '/images/feature-3.jpg',
    rarity: 'legendary',
    guaranteed: '1 Legendary + 2 Rare',
    limit: 1,
  },
];

const rarityGradients = {
  common: 'from-gray-600/30 to-gray-800/30',
  rare: 'from-blue-600/30 to-blue-800/30',
  legendary: 'from-purple-600/30 to-purple-800/30',
};

const rarityGlows = {
  common: 'shadow-slab-common',
  rare: 'shadow-slab-rare',
  legendary: 'shadow-slab-legendary',
};

export function PackOpening() {
  const [selectedPack, setSelectedPack] = useState<Pack | null>(null);
  const [isOpening, setIsOpening] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const handleOpenPack = () => {
    if (!selectedPack) return;
    setIsOpening(true);
    
    // Reveal all cards after animation
    setTimeout(() => {
      setShowAll(true);
      setIsOpening(false);
    }, 1500);
  };

  const resetPack = () => {
    setSelectedPack(null);
    setShowAll(false);
    setIsOpening(false);
  };

  return (
    <section className="relative py-24 lg:py-32 bg-canvas overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-xs font-semibold uppercase tracking-[0.2em]">
            Limited Drops
          </span>
          <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-white uppercase tracking-tight">
            Pack Drops
          </h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto">
            Open packs to discover rare moments. Each pack contains guaranteed collectibles based on tier.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!selectedPack ? (
            /* Pack Selection */
            <motion.div
              key="selection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-3 gap-6 lg:gap-8"
            >
              {packs.map((pack, index) => (
                <motion.div
                  key={pack.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  onClick={() => setSelectedPack(pack)}
                  className={`relative cursor-pointer group`}
                >
                  {/* Glow effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-br ${rarityGradients[pack.rarity]} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className={`relative h-full rounded-2xl overflow-hidden border border-whiteAlpha-100 bg-canvas-surface-2 ${rarityGlows[pack.rarity]} group-hover:border-whiteAlpha-200 transition-all duration-300`}>
                    {/* Pack image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={pack.image}
                        alt={pack.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-canvas-surface-2 via-transparent to-transparent" />
                      
                      {/* Rarity badge */}
                      <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        pack.rarity === 'legendary' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                        pack.rarity === 'rare' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                        'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                      }`}>
                        {pack.rarity}
                      </div>
                    </div>

                    {/* Pack info */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white">{pack.name}</h3>
                      <p className="mt-2 text-white/50 text-sm">{pack.guaranteed}</p>
                      
                      <div className="flex items-center justify-between mt-6">
                        <div>
                          <span className="text-2xl font-bold text-gold">{pack.price}</span>
                          {pack.price !== 'Free' && (
                            <span className="text-white/40 text-sm ml-1">~$1,200</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-white/40 text-xs">
                          <Lock className="w-3 h-3" />
                          <span>Limit {pack.limit}</span>
                        </div>
                      </div>

                      <Button 
                        className="w-full mt-4 btn-frosted text-white hover:bg-white/5 font-semibold uppercase tracking-wider py-5 rounded-xl"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Open Pack
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Pack Opening Animation */
            <motion.div
              key="opening"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-2xl mx-auto text-center"
            >
              {!showAll ? (
                <>
                  {/* Pack being opened */}
                  <motion.div
                    animate={isOpening ? {
                      rotate: [0, -5, 5, -5, 5, 0],
                      scale: [1, 1.05, 1],
                    } : {}}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="relative w-64 h-80 mx-auto mb-8"
                  >
                    <div className={`absolute inset-0 rounded-2xl overflow-hidden border-2 ${
                      selectedPack.rarity === 'legendary' ? 'border-purple-500/50 shadow-glow-legendary' :
                      selectedPack.rarity === 'rare' ? 'border-blue-500/50 shadow-glow-rare' :
                      'border-gray-500/50 shadow-glow-common'
                    }`}>
                      <img
                        src={selectedPack.image}
                        alt={selectedPack.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      {/* Seal */}
                      <motion.div 
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gold flex items-center justify-center"
                        animate={isOpening ? { scale: [1, 1.2, 0], opacity: [1, 1, 0] } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <Lock className="w-8 h-8 text-black" />
                      </motion.div>
                    </div>
                  </motion.div>

                  {!isOpening ? (
                    <>
                      <h3 className="text-2xl font-bold text-white mb-2">{selectedPack.name}</h3>
                      <p className="text-white/50 mb-8">Ready to reveal your moments</p>
                      <div className="flex gap-4 justify-center">
                        <Button
                          onClick={handleOpenPack}
                          className="bg-gold text-black hover:bg-gold-light font-bold uppercase tracking-wider px-8 py-6 rounded-xl"
                        >
                          <Unlock className="w-4 h-4 mr-2" />
                          Open Now
                        </Button>
                        <Button
                          onClick={resetPack}
                          variant="outline"
                          className="border-white/20 text-white hover:bg-white/5 px-6 py-6 rounded-xl"
                        >
                          Cancel
                        </Button>
                      </div>
                    </>
                  ) : (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-gold text-lg font-semibold"
                    >
                      Revealing...
                    </motion.p>
                  )}
                </>
              ) : (
                /* Revealed Cards */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-8"
                >
                  <h3 className="text-2xl font-bold text-white">Pack Opened!</h3>
                  
                  <div className="flex flex-wrap justify-center gap-6">
                    {[
                      { image: '/images/ticker-1.jpg', rarity: 'rare', name: 'Victory Dance' },
                      { image: '/images/ticker-3.jpg', rarity: 'common', name: 'Breakaway' },
                      { image: '/images/player-card-main.jpg', rarity: 'legendary', name: 'Epic Catch' },
                    ].map((card, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50, rotateY: -90 }}
                        animate={{ opacity: 1, y: 0, rotateY: 0 }}
                        transition={{ 
                          duration: 0.6, 
                          delay: index * 0.2,
                          type: 'spring',
                          stiffness: 100
                        }}
                        className="relative w-48 aspect-[3/4] rounded-xl overflow-hidden"
                        style={{
                          boxShadow: card.rarity === 'legendary' ? '0 0 40px rgba(168, 85, 247, 0.6)' :
                                    card.rarity === 'rare' ? '0 0 30px rgba(59, 130, 246, 0.5)' :
                                    '0 0 20px rgba(156, 163, 175, 0.3)'
                        }}
                      >
                        <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${
                            card.rarity === 'legendary' ? 'text-purple-400' :
                            card.rarity === 'rare' ? 'text-blue-400' :
                            'text-gray-400'
                          }`}>
                            {card.rarity}
                          </span>
                          <p className="text-white font-semibold text-sm">{card.name}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <Button
                    onClick={resetPack}
                    className="btn-frosted text-white hover:bg-white/5 px-8 py-6 rounded-xl"
                  >
                    Open Another Pack
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
