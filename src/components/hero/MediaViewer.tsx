import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Share2, Maximize2 } from 'lucide-react';

interface MediaViewerProps {
  images: string[];
}

export function MediaViewer({ images }: MediaViewerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="flex gap-4">
      {/* Thumbnail Strip */}
      <div className="flex flex-col gap-3">
        {images.map((image, index) => (
          <motion.button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
              activeIndex === index 
                ? 'border-gold ring-2 ring-gold/20' 
                : 'border-dark-border hover:border-dark-border-hover'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 relative">
        <motion.div
          className="relative aspect-[3/4] rounded-xl overflow-hidden bg-dark-card border border-dark-border"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={activeIndex}
              src={images[activeIndex]}
              alt="Player Card"
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>

          {/* Overlay Actions */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsLiked(!isLiked)}
              className={`w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center transition-colors ${
                isLiked ? 'text-red-500' : 'text-white/80 hover:text-white'
              }`}
            >
              <Heart className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white transition-colors"
            >
              <Maximize2 className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
