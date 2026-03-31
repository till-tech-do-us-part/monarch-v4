import { motion } from 'framer-motion';
import type { PlayerCard } from '@/types';
import { Breadcrumb } from '../layout/Breadcrumb';
import { StatsCard } from './StatsCard';

interface CardInfoProps {
  card: PlayerCard;
}

export function CardInfo({ card }: CardInfoProps) {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-400';
      case 'rare': return 'text-blue-400';
      case 'epic': return 'text-purple-400';
      case 'legendary': return 'text-gold';
      default: return 'text-gray-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-col gap-6"
    >
      {/* Breadcrumb */}
      <Breadcrumb card={card} />

      {/* Rarity & Serial */}
      <div className="flex items-center gap-3">
        <span className={`text-xs font-bold uppercase tracking-widest ${getRarityColor(card.rarity)}`}>
          {card.rarity}
        </span>
        <span className="text-muted-foreground">·</span>
        <span className="text-xs text-muted-foreground uppercase tracking-widest">
          #{card.serial.current}/{card.serial.total}
        </span>
      </div>

      {/* Player Name */}
      <div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {card.playerName}
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          {card.position}
        </p>
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-sm leading-relaxed max-w-lg">
        {card.description}
      </p>

      {/* Series Badge */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-dark-elevated border border-dark-border rounded-full px-4 py-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gold to-gold-hover flex items-center justify-center">
            <span className="text-black text-xs font-bold">M</span>
          </div>
          <span className="text-white text-sm font-medium">Championship Series</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <StatsCard 
          title="Game Stats" 
          stats={[
            { label: card.gameStats.team, value: card.gameStats.teamScore },
            { label: 'vs', value: '' },
            { label: card.gameStats.opponent, value: card.gameStats.opponentScore },
          ]} 
        />
        <StatsCard 
          title="Player Performance" 
          stats={[
            { label: 'REC', value: card.gameStats.playerStats.receptions },
            { label: 'YDS', value: card.gameStats.playerStats.yards },
            { label: 'TD', value: card.gameStats.playerStats.touchdowns },
          ]} 
        />
      </div>
    </motion.div>
  );
}
