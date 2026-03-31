import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MomentSlabProps {
  image: string;
  video?: string;
  rarity: 'common' | 'fandom' | 'rare' | 'legendary' | 'ultimate' | 'epic';
  playerName: string;
  serial?: string;
  className?: string;
}

const rarityConfig: Record<string, {
  glowColor: string;
  glowIntensity: string;
  cornerGlow: boolean;
  fullEdgeGlow: boolean;
  label: string;
}> = {
  common: {
    glowColor: '#9CA3AF',
    glowIntensity: '0.3',
    cornerGlow: false,
    fullEdgeGlow: false,
    label: 'COMMON',
  },
  fandom: {
    glowColor: '#15FF00',
    glowIntensity: '0.4',
    cornerGlow: true,
    fullEdgeGlow: false,
    label: 'FANDOM',
  },
  rare: {
    glowColor: '#3B82F6',
    glowIntensity: '0.5',
    cornerGlow: true,
    fullEdgeGlow: false,
    label: 'RARE',
  },
  epic: {
    glowColor: '#A855F7',
    glowIntensity: '0.55',
    cornerGlow: true,
    fullEdgeGlow: false,
    label: 'EPIC',
  },
  legendary: {
    glowColor: '#A855F7',
    glowIntensity: '0.6',
    cornerGlow: true,
    fullEdgeGlow: true,
    label: 'LEGENDARY',
  },
  ultimate: {
    glowColor: '#F59E0B',
    glowIntensity: '0.7',
    cornerGlow: true,
    fullEdgeGlow: true,
    label: 'ULTIMATE',
  },
};

export function MomentSlab({ 
  image, 
  video, 
  rarity, 
  playerName, 
  serial,
  className = '' 
}: MomentSlabProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const config = rarityConfig[rarity];
  const slabDepth = 30;

  // Handle hover with dwell delay (2 seconds before rotation starts)
  const handleMouseEnter = () => {
    setIsHovered(true);
    hoverTimeoutRef.current = setTimeout(() => {
      setIsRotating(true);
      if (video && videoRef.current) {
        videoRef.current.play();
        setIsVideoPlaying(true);
      }
    }, 2000);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsRotating(false);
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    if (videoRef.current) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      className={`perspective-1000 ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative preserve-3d cursor-pointer"
        style={{ 
          width: '240px', 
          height: '320px',
          transformStyle: 'preserve-3d',
        }}
        initial={{ rotateY: -15 }}
        animate={{ 
          rotateY: isRotating ? [ -15, 0, 90, 180, 270, 360, 345 ] : -15 
        }}
        transition={{ 
          duration: isRotating ? 10 : 0.6,
          ease: isRotating ? 'linear' : [0.25, 0.1, 0.25, 1],
          repeat: isRotating ? Infinity : 0,
        }}
      >
        {/* Front Face */}
        <div 
          className="absolute inset-0 backface-hidden rounded-xl overflow-hidden"
          style={{ 
            transform: `translateZ(${slabDepth / 2}px)`,
            boxShadow: `0 0 ${20 + parseFloat(config.glowIntensity) * 30}px ${config.glowColor}${Math.round(parseFloat(config.glowIntensity) * 255).toString(16).padStart(2, '0')}`,
          }}
        >
          {/* Neon corner glow overlay for rare+ */}
          {(config.cornerGlow || config.fullEdgeGlow) && (
            <div 
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background: config.fullEdgeGlow 
                  ? `linear-gradient(135deg, ${config.glowColor}40 0%, transparent 40%, transparent 60%, ${config.glowColor}40 100%)`
                  : `radial-gradient(circle at top left, ${config.glowColor}60 0%, transparent 30%),
                     radial-gradient(circle at top right, ${config.glowColor}60 0%, transparent 30%),
                     radial-gradient(circle at bottom left, ${config.glowColor}60 0%, transparent 30%),
                     radial-gradient(circle at bottom right, ${config.glowColor}60 0%, transparent 30%)`,
              }}
            />
          )}

          {/* Image/Video Content */}
          <div className="relative w-full h-full bg-canvas-surface-1">
            <img 
              src={image} 
              alt={playerName}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isVideoPlaying ? 'opacity-0' : 'opacity-100'}`}
            />
            {video && (
              <video
                ref={videoRef}
                src={video}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isVideoPlaying ? 'opacity-100' : 'opacity-0'}`}
                loop
                muted
                playsInline
                poster={image}
              />
            )}
            
            {/* Shine sweep effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 55%, transparent 60%)',
              }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
            />
          </div>

          {/* Rarity badge */}
          <div 
            className="absolute top-3 left-3 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider z-20"
            style={{ 
              backgroundColor: `${config.glowColor}30`,
              color: config.glowColor,
              border: `1px solid ${config.glowColor}50`,
            }}
          >
            {config.label}
          </div>

          {/* Serial number */}
          {serial && (
            <div className="absolute top-3 right-3 px-2 py-1 rounded bg-black/60 backdrop-blur-sm text-[10px] text-white/80 font-mono z-20">
              #{serial}
            </div>
          )}

          {/* Player name overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-20">
            <p className="text-white font-semibold text-sm truncate">{playerName}</p>
          </div>
        </div>

        {/* Right Face (Side) */}
        <div 
          className="absolute backface-hidden"
          style={{ 
            width: `${slabDepth}px`,
            height: '100%',
            right: `-${slabDepth / 2}px`,
            transform: `rotateY(90deg) translateZ(120px)`,
            background: `linear-gradient(180deg, #17171B 0%, ${config.glowColor}20 50%, #17171B 100%)`,
            boxShadow: `inset 0 0 15px ${config.glowColor}40`,
          }}
        />

        {/* Left Face (Side) */}
        <div 
          className="absolute backface-hidden"
          style={{ 
            width: `${slabDepth}px`,
            height: '100%',
            left: `-${slabDepth / 2}px`,
            transform: `rotateY(-90deg) translateZ(120px)`,
            background: `linear-gradient(180deg, #17171B 0%, ${config.glowColor}20 50%, #17171B 100%)`,
            boxShadow: `inset 0 0 15px ${config.glowColor}40`,
          }}
        />

        {/* Back Face */}
        <div 
          className="absolute inset-0 backface-hidden rounded-xl"
          style={{ 
            transform: `rotateY(180deg) translateZ(${slabDepth / 2}px)`,
            background: 'linear-gradient(135deg, #17171B 0%, #0D0D0F 100%)',
            boxShadow: `inset 0 0 30px ${config.glowColor}30`,
          }}
        >
          {/* Back design - could add logo or pattern here */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ 
                background: `radial-gradient(circle, ${config.glowColor}30 0%, transparent 70%)`,
              }}
            >
              <span className="text-2xl font-bold" style={{ color: config.glowColor }}>M</span>
            </div>
          </div>
        </div>

        {/* Top Face */}
        <div 
          className="absolute backface-hidden"
          style={{ 
            width: '100%',
            height: `${slabDepth}px`,
            top: `-${slabDepth / 2}px`,
            transform: `rotateX(90deg) translateZ(160px)`,
            background: '#17171B',
            boxShadow: `inset 0 0 10px ${config.glowColor}30`,
          }}
        />

        {/* Bottom Face */}
        <div 
          className="absolute backface-hidden"
          style={{ 
            width: '100%',
            height: `${slabDepth}px`,
            bottom: `-${slabDepth / 2}px`,
            transform: `rotateX(-90deg) translateZ(160px)`,
            background: '#17171B',
            boxShadow: `inset 0 0 10px ${config.glowColor}30`,
          }}
        />
      </motion.div>

      {/* Hover hint */}
      <motion.p 
        className="text-center text-white/30 text-xs mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        Hold to rotate
      </motion.p>
    </div>
  );
}
