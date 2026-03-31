import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { announcementItems } from '@/data/cardData';

export function AnnouncementBar() {
  const duplicatedItems = [...announcementItems, ...announcementItems, ...announcementItems];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.4 }}
      className="fixed top-[72px] left-0 right-0 z-40 bg-gold overflow-hidden ticker-container"
    >
      <div className="ticker-content flex items-center animate-ticker whitespace-nowrap py-2.5">
        {duplicatedItems.map((item, index) => (
          <div key={index} className="flex items-center gap-3 px-6">
            <Zap className="w-4 h-4 text-black" fill="currentColor" />
            <span className="text-black text-xs font-semibold uppercase tracking-wider">
              {item}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
