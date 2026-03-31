import { motion } from 'framer-motion';
import type { PlayerCard } from '@/types';

interface SupplyMetricsProps {
  availability: PlayerCard['availability'];
}

export function SupplyMetrics({ availability }: SupplyMetricsProps) {
  const metrics = [
    { label: 'Existing Supply', value: availability.totalSupply },
    { label: 'Unlisted (owned)', value: availability.unlisted },
    { label: 'For Sale', value: availability.forSale },
    { label: 'Locked', value: availability.locked },
    { label: 'Burned', value: availability.burned },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="bg-dark-card border border-dark-border rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white font-bold text-lg">Supply</h3>
        <a href="#" className="text-gold text-sm hover:underline">
          See all in Edition
        </a>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="text-center"
          >
            <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider leading-tight">
              {metric.label}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <span className="text-xs text-muted-foreground">Updates every 2 minutes</span>
      </div>
    </motion.div>
  );
}
