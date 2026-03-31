import { motion } from 'framer-motion';
import type { Collector } from '@/types';

interface TopCollectorsProps {
  collectors: Collector[];
  cardName: string;
}

export function TopCollectors({ collectors, cardName }: TopCollectorsProps) {
  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-500 text-black';
      case 2:
        return 'bg-gray-400 text-black';
      case 3:
        return 'bg-amber-600 text-black';
      default:
        return 'bg-dark-elevated text-muted-foreground';
    }
  };

  const getRankSuffix = (rank: number) => {
    switch (rank) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="bg-dark-card border border-dark-border rounded-xl p-6"
    >
      <div className="mb-6">
        <h3 className="text-white font-bold text-lg">Top Collectors</h3>
        <p className="text-muted-foreground text-sm">{cardName}</p>
      </div>

      <div className="space-y-4">
        {collectors.map((collector, index) => (
          <motion.div
            key={collector.username}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${getRankStyle(collector.rank)}`}>
                {collector.rank}
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30 flex items-center justify-center">
                <span className="text-gold text-sm font-bold">
                  {collector.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <div className="text-white font-medium">{collector.username}</div>
                <div className="text-muted-foreground text-xs">
                  {collector.rank}{getRankSuffix(collector.rank)}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white font-bold">{collector.count}</div>
              <div className="text-muted-foreground text-xs">Moments</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
