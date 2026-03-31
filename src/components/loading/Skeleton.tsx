import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'rect' | 'circle' | 'text';
  width?: string | number;
  height?: string | number;
}

export function Skeleton({ 
  className, 
  variant = 'rect',
  width,
  height 
}: SkeletonProps) {
  const baseStyles = 'animate-shimmer';
  
  const variantStyles = {
    rect: 'rounded-lg',
    circle: 'rounded-full',
    text: 'rounded h-4',
  };

  const style: React.CSSProperties = {
    width: width,
    height: height,
    background: 'linear-gradient(90deg, #2B2C33 25%, #3A3B42 50%, #2B2C33 75%)',
    backgroundSize: '200% 100%',
  };

  return (
    <div
      className={cn(baseStyles, variantStyles[variant], className)}
      style={style}
    />
  );
}

// Pre-built skeleton patterns
export function CardSkeleton() {
  return (
    <div className="w-[260px] rounded-2xl overflow-hidden bg-canvas-surface-2 border border-whiteAlpha-100">
      {/* Image skeleton */}
      <Skeleton className="w-full aspect-[3/4]" />
      
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="40%" />
        <div className="flex justify-between pt-2">
          <Skeleton variant="text" width="30%" />
          <Skeleton variant="text" width="25%" />
        </div>
      </div>
    </div>
  );
}

export function SlabSkeleton() {
  return (
    <div className="perspective-1000">
      <div 
        className="relative rounded-xl overflow-hidden animate-shimmer"
        style={{ 
          width: '240px', 
          height: '320px',
          background: 'linear-gradient(135deg, #17171B 0%, #2B2C33 50%, #17171B 100%)',
          backgroundSize: '200% 200%',
          animation: 'shimmer 2s linear infinite',
        }}
      >
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-white/10 rounded-tl-xl" />
        <div className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-white/10 rounded-tr-xl" />
        <div className="absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-white/10 rounded-bl-xl" />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-white/10 rounded-br-xl" />
        
        {/* Center pulse */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/5 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="p-6 rounded-2xl bg-canvas-surface-2 border border-whiteAlpha-100 space-y-3">
          <Skeleton variant="circle" width={40} height={40} />
          <Skeleton variant="text" width="70%" className="h-8" />
          <Skeleton variant="text" width="50%" />
        </div>
      ))}
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text skeleton */}
          <div className="space-y-6">
            <Skeleton variant="text" width={80} height={20} />
            <Skeleton variant="text" width="90%" className="h-16" />
            <Skeleton variant="text" width="90%" className="h-16" />
            <Skeleton variant="text" width="70%" height={80} />
            <div className="flex gap-4 pt-4">
              <Skeleton width={180} height={56} className="rounded-full" />
              <Skeleton width={140} height={56} className="rounded-full" />
            </div>
          </div>
          
          {/* Image skeleton */}
          <Skeleton className="aspect-[4/3] rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
