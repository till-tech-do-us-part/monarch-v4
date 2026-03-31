import { motion } from 'framer-motion';
import { ExternalLink, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { PlayerCard } from '@/types';

interface PurchasePanelProps {
  card: PlayerCard;
}

export function PurchasePanel({ card }: PurchasePanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-dark-card border border-dark-border rounded-xl p-6"
    >
      {/* Price Display */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Lowest ask</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-white">{card.price.current}</span>
          <span className="text-lg text-muted-foreground">{card.price.currency}</span>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-3">
        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
          <Button className="w-full bg-gold text-black hover:bg-gold-hover font-bold uppercase tracking-wider py-6 text-sm">
            Buy Now
          </Button>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
          <Button 
            variant="outline" 
            className="w-full border-dark-border-hover text-white hover:bg-dark-elevated hover:border-muted-foreground font-semibold uppercase tracking-wider py-6 text-sm"
          >
            Make an Offer
          </Button>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
          <Button 
            className="w-full bg-white text-black hover:bg-gray-200 font-semibold uppercase tracking-wider py-6 text-sm"
          >
            Analytics
          </Button>
        </motion.div>
      </div>

      {/* Availability Info */}
      <div className="mt-6 pt-4 border-t border-dark-border flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">{card.availability.forSale} for Sale</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-muted-foreground flex items-center gap-1">
            Avg Sale: {card.price.avgSale} {card.price.currency}
            <Info className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* External Link */}
      <div className="mt-4 flex items-center justify-center gap-2 text-muted-foreground text-sm">
        <span>Available on</span>
        <a 
          href="#" 
          className="text-white hover:text-gold flex items-center gap-1 transition-colors"
        >
          OpenSea
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.div>
  );
}
