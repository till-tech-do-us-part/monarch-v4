import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Pre-rendered video URLs for 3D slab rotation animation
// In production, these would be served from CDN with pattern:
// assets.monarchsports.com/editions/[edition_type]/play_[play_id]_[serial]_[edition]_capture_Animated_1080_1080_Black.mp4
const PRE_RENDERED_VIDEOS: Record<string, string> = {
  // Sample videos from public CDN for development
  legendary: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  epic: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  rare: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  common: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  fandom: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  ultimate: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
};

interface MomentSlab3DProps {
  image: string;
  rarity: 'common' | 'fandom' | 'rare' | 'epic' | 'legendary' | 'ultimate';
  playerName: string;
  serial?: string;
  videoUrl?: string; // Optional custom video URL
  className?: string;
}

// Rarity configuration with neon glow colors and intensities
const rarityConfig: Record<string, {
  glowColor: string;
  glowIntensity: number;
  cornerGlow: boolean;
  fullEdgeGlow: boolean;
  prismatic: boolean;
  label: string;
}> = {
  common: {
    glowColor: '#9CA3AF',
    glowIntensity: 0.3,
    cornerGlow: false,
    fullEdgeGlow: false,
    prismatic: false,
    label: 'COMMON',
  },
  fandom: {
    glowColor: '#15FF00',
    glowIntensity: 0.4,
    cornerGlow: true,
    fullEdgeGlow: false,
    prismatic: false,
    label: 'FANDOM',
  },
  rare: {
    glowColor: '#3B82F6',
    glowIntensity: 0.5,
    cornerGlow: true,
    fullEdgeGlow: false,
    prismatic: false,
    label: 'RARE',
  },
  epic: {
    glowColor: '#A855F7',
    glowIntensity: 0.55,
    cornerGlow: true,
    fullEdgeGlow: false,
    prismatic: false,
    label: 'EPIC',
  },
  legendary: {
    glowColor: '#A855F7',
    glowIntensity: 0.65,
    cornerGlow: true,
    fullEdgeGlow: true,
    prismatic: false,
    label: 'LEGENDARY',
  },
  ultimate: {
    glowColor: '#F59E0B',
    glowIntensity: 0.75,
    cornerGlow: true,
    fullEdgeGlow: true,
    prismatic: true,
    label: 'ULTIMATE',
  },
};

// CSS Custom Properties for slab configuration (documented for reference)
// --slab-depth: 40px
// --slab-rotation-idle: rotateY(-15deg)
// --slab-rotation-speed: 10s
// --slab-dwell-delay: 2000ms
// --slab-return-duration: 800ms
// --slab-return-easing: cubic-bezier(0.25, 0.1, 0.25, 1)

export function MomentSlab3D({ 
  image, 
  rarity, 
  playerName, 
  serial,
  videoUrl,
  className = '' 
}: MomentSlab3DProps) {
  // State for interaction phases
  const [phase, setPhase] = useState<'idle' | 'hover' | 'dwell' | 'exit'>('idle');
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  // Refs for timing and video element
  const dwellTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const config = rarityConfig[rarity];
  const slabDepth = 40; // pixels
  const slabWidth = 260;
  const slabHeight = 340;
  
  // Get video URL - use custom if provided, otherwise use pre-rendered based on rarity
  const effectiveVideoUrl = videoUrl || PRE_RENDERED_VIDEOS[rarity] || PRE_RENDERED_VIDEOS.common;

  // Phase 1: Idle State - slight 3D angle, static thumbnail
  // Phase 2: Hover Entry - subtle glow increase
  // Phase 3: Dwell Trigger (2-3 seconds) - start rotation and video playback
  // Phase 4: Hover Exit - smooth deceleration and return to idle

  const handleMouseEnter = useCallback(() => {
    if (phase === 'dwell') return;
    setPhase('hover');
    
    // Start dwell timer (2 seconds)
    dwellTimeoutRef.current = setTimeout(() => {
      setPhase('dwell');
      // Start video playback when dwell triggers
      if (videoRef.current && isVideoLoaded) {
        videoRef.current.play().catch(() => {
          // Video play failed, continue with rotation only
        });
      }
    }, 2000);
  }, [phase, isVideoLoaded]);

  const handleMouseLeave = useCallback(() => {
    // Clear dwell timeout if still in hover phase
    if (dwellTimeoutRef.current) {
      clearTimeout(dwellTimeoutRef.current);
      dwellTimeoutRef.current = null;
    }
    
    // Pause video on exit
    if (videoRef.current) {
      videoRef.current.pause();
    }
    
    setPhase('exit');
    
    // Return to idle after exit animation completes
    setTimeout(() => {
      setPhase('idle');
    }, 800); // Match returnDuration
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (dwellTimeoutRef.current) {
        clearTimeout(dwellTimeoutRef.current);
      }
    };
  }, []);

  // Determine rotation based on phase
  const getRotation = () => {
    switch (phase) {
      case 'idle':
        return { rotateY: -15, rotateX: 0 };
      case 'hover':
        return { rotateY: -10, rotateX: 0 };
      case 'dwell':
        return { rotateY: -15, rotateX: 0 }; // Animation handles continuous rotation
      case 'exit':
        return { rotateY: -15, rotateX: 0 };
      default:
        return { rotateY: -15, rotateX: 0 };
    }
  };

  const rotation = getRotation();

  // Generate edge glow color with opacity
  const getGlowColor = (intensity: number) => {
    const hex = config.glowColor.replace('#', '');
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${intensity})`;
  };

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
      style={{ 
        perspective: '1000px',
        width: slabWidth,
        height: slabHeight + 40, // Extra space for hover hint
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Slab Container */}
      <motion.div
        className="relative"
        style={{
          width: slabWidth,
          height: slabHeight,
          transformStyle: 'preserve-3d',
        }}
        initial={{ rotateY: -15 }}
        animate={{
          rotateY: phase === 'dwell' 
            ? [-15, 0, 90, 180, 270, 360, 345] // Full 360 rotation
            : rotation.rotateY,
        }}
        transition={{
          rotateY: phase === 'dwell' 
            ? { 
                duration: 10, // 10 seconds for full rotation
                ease: 'linear',
                repeat: Infinity,
              }
            : { 
                duration: 0.8, // 0.8s return to idle
                ease: [0.25, 0.1, 0.25, 1],
              },
        }}
      >
        {/* Front Face - Contains video/image content */}
        <div 
          className="absolute inset-0 rounded-xl overflow-hidden"
          style={{ 
            transform: `translateZ(${slabDepth / 2}px)`,
            backfaceVisibility: 'hidden',
            boxShadow: `0 0 ${20 + config.glowIntensity * 40}px ${getGlowColor(config.glowIntensity * 0.8)}`,
          }}
        >
          {/* Neon corner/edge glow overlay */}
          {(config.cornerGlow || config.fullEdgeGlow) && (
            <div 
              className="absolute inset-0 pointer-events-none z-20"
              style={{
                background: config.fullEdgeGlow 
                  ? `linear-gradient(135deg, ${getGlowColor(0.5)} 0%, transparent 35%, transparent 65%, ${getGlowColor(0.5)} 100%)`
                  : `radial-gradient(circle at 0 0, ${getGlowColor(0.6)} 0%, transparent 25%),
                     radial-gradient(circle at 100% 0, ${getGlowColor(0.6)} 0%, transparent 25%),
                     radial-gradient(circle at 0 100%, ${getGlowColor(0.6)} 0%, transparent 25%),
                     radial-gradient(circle at 100% 100%, ${getGlowColor(0.6)} 0%, transparent 25%)`,
              }}
            />
          )}

          {/* Video/Image Content */}
          <div className="relative w-full h-full bg-[#0A0A0A]">
            {/* Static poster image (always visible as fallback) */}
            <img 
              src={image} 
              alt={playerName}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                phase === 'dwell' && isVideoLoaded ? 'opacity-0' : 'opacity-100'
              }`}
            />
            
            {/* Pre-rendered 3D rotation video */}
            <video
              ref={videoRef}
              src={effectiveVideoUrl}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                phase === 'dwell' && isVideoLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              loop
              muted
              playsInline
              preload="metadata"
              poster={image}
              onLoadedData={() => setIsVideoLoaded(true)}
              onError={() => setHasError(true)}
            />
            
            {/* Shine sweep effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.08) 55%, transparent 60%)',
              }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                repeatDelay: 5, 
                ease: 'easeInOut' 
              }}
            />
          </div>

          {/* Rarity badge */}
          <div 
            className="absolute top-3 left-3 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider z-30"
            style={{ 
              backgroundColor: `${config.glowColor}25`,
              color: config.glowColor,
              border: `1px solid ${config.glowColor}50`,
              textShadow: `0 0 10px ${config.glowColor}80`,
            }}
          >
            {config.label}
          </div>

          {/* Serial number */}
          {serial && (
            <div className="absolute top-3 right-3 px-2 py-1 rounded bg-black/60 backdrop-blur-sm text-[10px] text-white/80 font-mono z-30">
              #{serial}
            </div>
          )}

          {/* Player name overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/95 via-black/60 to-transparent z-30">
            <p className="text-white font-bold text-base truncate">{playerName}</p>
          </div>
        </div>

        {/* Right Face (Side Edge) */}
        <div 
          className="absolute"
          style={{ 
            width: `${slabDepth}px`,
            height: '100%',
            right: `-${slabDepth / 2}px`,
            transform: `rotateY(90deg) translateZ(${slabWidth / 2}px)`,
            backfaceVisibility: 'hidden',
            background: `linear-gradient(180deg, #17171B 0%, ${getGlowColor(0.15)} 50%, #17171B 100%)`,
            boxShadow: `inset 0 0 20px ${getGlowColor(0.3)}`,
          }}
        />

        {/* Left Face (Side Edge) */}
        <div 
          className="absolute"
          style={{ 
            width: `${slabDepth}px`,
            height: '100%',
            left: `-${slabDepth / 2}px`,
            transform: `rotateY(-90deg) translateZ(${slabWidth / 2}px)`,
            backfaceVisibility: 'hidden',
            background: `linear-gradient(180deg, #17171B 0%, ${getGlowColor(0.15)} 50%, #17171B 100%)`,
            boxShadow: `inset 0 0 20px ${getGlowColor(0.3)}`,
          }}
        />

        {/* Back Face */}
        <div 
          className="absolute inset-0 rounded-xl"
          style={{ 
            transform: `rotateY(180deg) translateZ(${slabDepth / 2}px)`,
            backfaceVisibility: 'hidden',
            background: 'linear-gradient(135deg, #17171B 0%, #0D0D0F 100%)',
            boxShadow: `inset 0 0 40px ${getGlowColor(0.25)}`,
          }}
        >
          {/* Back design - Monarch logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ 
                background: `radial-gradient(circle, ${getGlowColor(0.3)} 0%, transparent 70%)`,
                boxShadow: `0 0 30px ${getGlowColor(0.2)}`,
              }}
            >
              <span 
                className="text-3xl font-black"
                style={{ 
                  color: config.glowColor,
                  textShadow: `0 0 20px ${config.glowColor}`,
                }}
              >
                M
              </span>
            </div>
          </div>
        </div>

        {/* Top Face */}
        <div 
          className="absolute"
          style={{ 
            width: '100%',
            height: `${slabDepth}px`,
            top: `-${slabDepth / 2}px`,
            transform: `rotateX(90deg) translateZ(${slabHeight / 2}px)`,
            backfaceVisibility: 'hidden',
            background: '#17171B',
            boxShadow: `inset 0 0 15px ${getGlowColor(0.25)}`,
          }}
        />

        {/* Bottom Face */}
        <div 
          className="absolute"
          style={{ 
            width: '100%',
            height: `${slabDepth}px`,
            bottom: `-${slabDepth / 2}px`,
            transform: `rotateX(-90deg) translateZ(${slabHeight / 2}px)`,
            backfaceVisibility: 'hidden',
            background: '#17171B',
            boxShadow: `inset 0 0 15px ${getGlowColor(0.25)}`,
          }}
        />
      </motion.div>

      {/* Phase indicator / Hover hint */}
      <AnimatePresence mode="wait">
        <motion.div 
          className="absolute -bottom-8 left-0 right-0 text-center"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
        >
          {phase === 'idle' && (
            <motion.p 
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="text-white/40 text-xs uppercase tracking-wider"
            >
              Hover to preview
            </motion.p>
          )}
          {phase === 'hover' && (
            <motion.p 
              key="hover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="text-white/60 text-xs uppercase tracking-wider"
            >
              Hold to rotate...
            </motion.p>
          )}
          {phase === 'dwell' && (
            <motion.p 
              key="dwell"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-gold text-xs uppercase tracking-wider font-semibold"
              style={{ textShadow: '0 0 10px rgba(245, 158, 11, 0.5)' }}
            >
              Rotating
            </motion.p>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Video loading indicator */}
      {!isVideoLoaded && !hasError && phase === 'dwell' && (
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-8 h-8 border-2 border-white/20 border-t-gold rounded-full animate-spin" />
        </motion.div>
      )}
    </div>
  );
}

export default MomentSlab3D;
