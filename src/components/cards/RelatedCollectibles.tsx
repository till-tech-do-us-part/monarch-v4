import { motion } from 'framer-motion';
import type { RelatedCard } from '@/types';
import { CollectibleCard } from './CollectibleCard';

interface RelatedCollectiblesProps {
  cards: RelatedCard[];
}

export function RelatedCollectibles({ cards }: RelatedCollectiblesProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-white font-bold text-xl mb-8">More Collectibles</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <CollectibleCard card={card} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
