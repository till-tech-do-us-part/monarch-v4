import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/hero/HeroSection';
import { TrendingMoments } from '@/components/trending/TrendingMoments';
import { PackOpening } from '@/components/pack/PackOpening';
import { FeatureCards } from '@/components/features/FeatureCards';
import { ImageTicker } from '@/components/ticker/ImageTicker';
import { StatsDashboard } from '@/components/stats/StatsDashboard';
import { ProductCarousel } from '@/components/carousel/ProductCarousel';
import { CollectibleDetail } from '@/components/detail/CollectibleDetail';

import './App.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    return () => {
      // Cleanup ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-canvas text-white overflow-x-hidden">
      {/* Navigation - Glassmorphism on scroll */}
      <Navigation />

      {/* Main Content */}
      <main>
        {/* Hero Section - Centered single-column with negative margin overlap */}
        <HeroSection />

        {/* Trending Moments - 3D Slabs with pre-rendered video rotation */}
        <TrendingMoments />

        {/* Pack Opening Ceremony - Interactive pack reveal */}
        <PackOpening />

        {/* Feature Cards - Alternating 50/50 layout */}
        <FeatureCards />

        {/* Image Ticker - Horizontal scrolling marquee */}
        <ImageTicker />

        {/* Stats Dashboard - Animated count-up numbers with time filters */}
        <StatsDashboard />

        {/* Product Carousel - Horizontal scroll with image-to-video hover */}
        <ProductCarousel />

        {/* Collectible Detail - 3D holographic display with supply metrics */}
        <CollectibleDetail />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
