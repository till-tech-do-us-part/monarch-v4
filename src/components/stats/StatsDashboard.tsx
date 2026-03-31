import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, Users, DollarSign, Package } from 'lucide-react';

const timeFilters = ['24h', '7d', '30d', 'All Time'];

const statsData = {
  '24h': [
    { icon: DollarSign, value: 485000, prefix: '$', suffix: '', label: 'Trading Volume', change: '+12.5%' },
    { icon: Package, value: 2847, prefix: '', suffix: '', label: 'Moments Sold', change: '+8.3%' },
    { icon: Users, value: 15234, prefix: '', suffix: '', label: 'Active Collectors', change: '+5.1%' },
    { icon: TrendingUp, value: 2.4, prefix: '$', suffix: 'M', label: 'Market Cap', change: '+15.2%' },
  ],
  '7d': [
    { icon: DollarSign, value: 3200000, prefix: '$', suffix: '', label: 'Trading Volume', change: '+18.7%' },
    { icon: Package, value: 18472, prefix: '', suffix: '', label: 'Moments Sold', change: '+14.2%' },
    { icon: Users, value: 45231, prefix: '', suffix: '', label: 'Active Collectors', change: '+9.8%' },
    { icon: TrendingUp, value: 12.8, prefix: '$', suffix: 'M', label: 'Market Cap', change: '+22.4%' },
  ],
  '30d': [
    { icon: DollarSign, value: 12800000, prefix: '$', suffix: '', label: 'Trading Volume', change: '+25.3%' },
    { icon: Package, value: 72491, prefix: '', suffix: '', label: 'Moments Sold', change: '+19.6%' },
    { icon: Users, value: 128456, prefix: '', suffix: '', label: 'Active Collectors', change: '+15.2%' },
    { icon: TrendingUp, value: 48.5, prefix: '$', suffix: 'M', label: 'Market Cap', change: '+31.8%' },
  ],
  'All Time': [
    { icon: DollarSign, value: 156000000, prefix: '$', suffix: '', label: 'Trading Volume', change: '+∞' },
    { icon: Package, value: 892456, prefix: '', suffix: '', label: 'Moments Sold', change: '+∞' },
    { icon: Users, value: 524891, prefix: '', suffix: '', label: 'Active Collectors', change: '+∞' },
    { icon: TrendingUp, value: 485, prefix: '$', suffix: 'M', label: 'Market Cap', change: '+∞' },
  ],
};

function AnimatedNumber({ value, prefix, suffix, isInView }: { 
  value: number; 
  prefix: string; 
  suffix: string;
  isInView: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 1500;
    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (value - startValue) * easeOut;
      
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, isInView]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + 'K';
    }
    return num.toFixed(num % 1 === 0 ? 0 : 1);
  };

  return (
    <span>
      {prefix}{formatNumber(displayValue)}{suffix}
    </span>
  );
}

export function StatsDashboard() {
  const [activeFilter, setActiveFilter] = useState('24h');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-20%' });

  const currentStats = statsData[activeFilter as keyof typeof statsData];

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-black">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-gold text-xs font-semibold uppercase tracking-[0.2em]">
            Platform Stats
          </span>
          <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-white">
            By The Numbers
          </h2>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center gap-2 mb-12"
        >
          {timeFilters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-gold text-black'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {currentStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="relative group"
              >
                <div className="relative p-6 lg:p-8 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm overflow-hidden transition-all duration-300 group-hover:bg-white/[0.04] group-hover:border-white/10">
                  {/* Glow effect */}
                  <div className="absolute -inset-px bg-gradient-to-br from-gold/10 via-transparent to-neon-blue/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-gold" />
                      </div>
                      <span className="text-gold text-xs font-semibold bg-gold/10 px-2 py-1 rounded-full">
                        {stat.change}
                      </span>
                    </div>

                    <div className="text-3xl lg:text-4xl font-bold text-white">
                      <AnimatedNumber 
                        value={stat.value} 
                        prefix={stat.prefix} 
                        suffix={stat.suffix}
                        isInView={isInView}
                      />
                    </div>

                    <div className="text-sm text-white/50 mt-2">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
