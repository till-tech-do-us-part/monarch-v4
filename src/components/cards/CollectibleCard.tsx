import { motion } from 'framer-motion';
import type { RelatedCard } from '@/types';

interface CollectibleCardProps {
  card: RelatedCard;
}

export function CollectibleCard({ card }: CollectibleCardProps) {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'bg-gray-500';
      case 'rare':
        return 'bg-blue-500';
      case 'epic':
        return 'bg-purple-500';
      case 'legendary':
        return 'bg-gold';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-dark-card border border-dark-border rounded-xl overflow-hidden hover:border-dark-border-hover transition-colors cursor-pointer group"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={card.image}
          alt={card.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Rarity Badge */}
        <div className={`absolute top-3 left-3 ${getRarityColor(card.rarity)} text-black text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded`}>
          {card.rarity}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h4 className="text-white font-semibold text-sm mb-1">{card.player}</h4>
        <p className="text-muted-foreground text-xs mb-4">{card.title}</p>

        {/* Price Info */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Lowest Ask</div>
            <div className="text-white font-bold text-sm">{card.lowestAsk}</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Avg Sale</div>
            <div className="text-muted-foreground text-sm">{card.avgSale}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
