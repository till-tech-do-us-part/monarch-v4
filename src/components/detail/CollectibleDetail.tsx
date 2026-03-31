import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Heart, Share2, ChevronDown, Info, TrendingUp, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const supplyData = [
  { label: 'Total Supply', value: 100, color: 'bg-gold' },
  { label: 'Unlisted', value: 45, color: 'bg-blue-500' },
  { label: 'For Sale', value: 12, color: 'bg-green-500' },
  { label: 'Locked', value: 28, color: 'bg-purple-500' },
  { label: 'Burned', value: 15, color: 'bg-red-500' },
];

const salesHistory = [
  { buyer: 'CryptoKing', price: '5.2 ETH', serial: '#1', date: 'Feb 20, 2026', avatar: 'C' },
  { buyer: 'NFTCollector', price: '3.8 ETH', serial: '#2', date: 'Feb 18, 2026', avatar: 'N' },
  { buyer: 'SportsFan', price: '2.9 ETH', serial: '#5', date: 'Feb 15, 2026', avatar: 'S' },
  { buyer: 'CardHunter', price: '1.8 ETH', serial: '#23', date: 'Feb 23, 2026', avatar: 'H' },
  { buyer: 'ETHWhale', price: '1.75 ETH', serial: '#31', date: 'Feb 22, 2026', avatar: 'E' },
];

export function CollectibleDetail() {
  const [isLiked, setIsLiked] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>('details');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-20%' });

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-xs font-semibold uppercase tracking-[0.2em]">
            Featured Moment
          </span>
          <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-white">
            Marcus Green - Epic
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: 3D Card Display */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
          >
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0">
              {/* Holographic glow */}
              <div className="absolute -inset-8 bg-gradient-to-br from-neon-blue/20 via-neon-purple/20 to-gold/20 rounded-3xl blur-3xl opacity-60 animate-pulse" />
              
              {/* Wireframe decoration */}
              <div className="absolute -inset-4 border border-neon-blue/20 rounded-2xl transform rotate-3" />
              <div className="absolute -inset-4 border border-neon-purple/20 rounded-2xl transform -rotate-3" />

              {/* Main card */}
              <motion.div
                animate={{ 
                  rotateY: [0, 5, 0, -5, 0],
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: 'easeInOut' 
                }}
                className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10"
                style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
              >
                <img
                  src="/images/player-card-main.jpg"
                  alt="Marcus Green Card"
                  className="w-full h-full object-cover"
                />
                
                {/* Holographic overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 via-transparent to-neon-purple/10 mix-blend-overlay" />
                
                {/* Shine effect */}
                <motion.div
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                />
              </motion.div>

              {/* Action buttons */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsLiked(!isLiked)}
                  className={`w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-colors ${
                    isLiked ? 'bg-red-500/80 text-white' : 'bg-black/60 text-white/60 hover:text-white'
                  }`}
                >
                  <Heart className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white/60 hover:text-white transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Right: Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col"
          >
            {/* Badges */}
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-wider">
                Epic
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-medium">
                #2 / 100
              </span>
              <span className="px-3 py-1 rounded-full bg-gold/20 border border-gold/30 text-gold text-xs font-medium">
                Championship Series
              </span>
            </div>

            {/* Title */}
            <h3 className="text-3xl lg:text-4xl font-bold text-white">
              Marcus Green - Rare
            </h3>
            <p className="text-white/50 text-lg mt-1">Wide Receiver</p>

            {/* Description */}
            <p className="text-white/60 mt-6 leading-relaxed">
              Marcus Green is a standout wide receiver from Alabama, known for his exceptional 
              route running and game-breaking speed. This EPIC collectible captures his 
              record-breaking performance with 3 touchdowns and 180 receiving yards in the 
              state championship game.
            </p>

            {/* Price */}
            <div className="mt-8 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-white/40 uppercase tracking-wider">Current Price</div>
                  <div className="text-3xl font-bold text-white mt-1">1.8 ETH</div>
                  <div className="text-sm text-white/40 mt-1">~$4,320 USD</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-white/40 uppercase tracking-wider">Last Sale</div>
                  <div className="text-lg font-semibold text-white/60 mt-1">1.5 ETH</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-3 mt-6">
                <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button className="w-full bg-gold text-black hover:bg-gold-light font-bold uppercase tracking-wider py-6 rounded-xl transition-all duration-300 hover:shadow-glow">
                    Buy Now
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    variant="outline" 
                    className="border-white/20 text-white hover:bg-white/5 hover:border-white/40 font-semibold uppercase tracking-wider py-6 px-6 rounded-xl"
                  >
                    Make Offer
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Supply Visualization */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-white/60">Supply Distribution</span>
                <span className="text-xs text-white/40">Updates every 2 min</span>
              </div>
              <div className="flex h-3 rounded-full overflow-hidden">
                {supplyData.map((item) => (
                  <div
                    key={item.label}
                    className={`${item.color} transition-all duration-500`}
                    style={{ width: `${item.value}%` }}
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-4 mt-4">
                {supplyData.map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${item.color}`} />
                    <span className="text-xs text-white/50">{item.label}</span>
                    <span className="text-xs text-white font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Accordions */}
            <div className="mt-8 space-y-3">
              {[
                { id: 'details', label: 'Details', icon: Info },
                { id: 'history', label: 'Sales History', icon: TrendingUp },
                { id: 'activity', label: 'Recent Activity', icon: Clock },
              ].map(({ id, label, icon: Icon }) => (
                <div key={id} className="rounded-xl bg-white/[0.02] border border-white/5 overflow-hidden">
                  <button
                    onClick={() => toggleAccordion(id)}
                    className="w-full flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-white/40" />
                      <span className="text-white font-medium">{label}</span>
                    </div>
                    <motion.div
                      animate={{ rotate: activeAccordion === id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5 text-white/40" />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {activeAccordion === id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 pt-0 border-t border-white/5">
                          {id === 'details' && (
                            <div className="space-y-3 text-sm text-white/60">
                              <div className="flex justify-between">
                                <span>Player</span>
                                <span className="text-white">Marcus Green</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Position</span>
                                <span className="text-white">Wide Receiver</span>
                              </div>
                              <div className="flex justify-between">
                                <span>School</span>
                                <span className="text-white">Thompson High</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Game Date</span>
                                <span className="text-white">Dec 15, 2025</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Minted</span>
                                <span className="text-white">Jan 10, 2026</span>
                              </div>
                            </div>
                          )}
                          
                          {id === 'history' && (
                            <div className="space-y-3">
                              {salesHistory.map((sale, index) => (
                                <div key={index} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold text-sm font-bold">
                                      {sale.avatar}
                                    </div>
                                    <div>
                                      <div className="text-white text-sm">{sale.buyer}</div>
                                      <div className="text-white/40 text-xs">{sale.date}</div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-gold font-semibold">{sale.price}</div>
                                    <div className="text-white/40 text-xs">{sale.serial}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {id === 'activity' && (
                            <div className="text-sm text-white/60">
                              <p>No recent activity in the last 24 hours.</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
