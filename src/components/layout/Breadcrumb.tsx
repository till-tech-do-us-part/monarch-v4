import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import type { PlayerCard } from '@/types';

interface BreadcrumbProps {
  card: PlayerCard;
}

export function Breadcrumb({ card }: BreadcrumbProps) {
  const items = [
    { label: card.rarity.toUpperCase(), badge: true, color: `rarity-${card.rarity}` },
    { label: card.team },
    { label: card.playerName.split(' - ')[0] },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500';
      case 'rare': return 'bg-blue-500';
      case 'epic': return 'bg-purple-500';
      case 'legendary': return 'bg-gold';
      default: return 'bg-gray-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className="flex items-center gap-2 flex-wrap"
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
          {item.badge ? (
            <span className={`${getRarityColor(card.rarity)} text-black text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded`}>
              {item.label}
            </span>
          ) : (
            <span className="bg-dark-elevated border border-dark-border text-white text-xs font-medium px-4 py-1.5 rounded-full">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </motion.div>
  );
}
