import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles, TrendingUp, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    category: 'Digital Collectibles',
    headline: 'Own The Future Of Sports',
    description: 'Each moment is minted as a unique NFT on the blockchain, giving you true ownership of iconic high school sports highlights. Trade, sell, or showcase your collection with complete transparency.',
    image: '/images/feature-1.jpg',
    icon: Sparkles,
    cta: 'Browse Collection',
    stats: [
      { value: '100%', label: 'Authentic' },
      { value: 'On-Chain', label: 'Verified' },
    ],
  },
  {
    category: 'Marketplace',
    headline: 'Trade With Confidence',
    description: 'Our decentralized marketplace ensures fair pricing, instant settlements, and zero counterparty risk. Buy and sell moments directly with collectors worldwide, 24/7.',
    image: '/images/feature-2.jpg',
    icon: TrendingUp,
    cta: 'Explore Market',
    stats: [
      { value: '$2.5M', label: 'Daily Volume' },
      { value: '50K+', label: 'Active Traders' },
    ],
  },
  {
    category: 'Security',
    headline: 'Your Assets, Protected',
    description: 'Built on enterprise-grade blockchain infrastructure with multi-sig wallets, cold storage options, and comprehensive insurance coverage for all digital assets.',
    image: '/images/feature-3.jpg',
    icon: Shield,
    cta: 'Learn More',
    stats: [
      { value: '$0', label: 'Lost to Hacks' },
      { value: '99.9%', label: 'Uptime' },
    ],
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-20%' });
  const isReversed = index % 2 === 1;

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, []);

  const Icon = feature.icon;

  return (
    <div
      ref={cardRef}
      className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
        isReversed ? 'lg:flex-row-reverse' : ''
      }`}
    >
      {/* Image */}
      <motion.div
        className={`relative ${isReversed ? 'lg:order-2' : ''}`}
        initial={{ opacity: 0, x: isReversed ? 60 : -60 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
          {/* Glow effect */}
          <div className="absolute -inset-2 bg-gradient-to-br from-gold/10 via-transparent to-neon-blue/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/5">
            <img
              src={feature.image}
              alt={feature.headline}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        className={`flex flex-col ${isReversed ? 'lg:order-1 lg:pr-8' : 'lg:pl-8'}`}
        initial={{ opacity: 0, x: isReversed ? -60 : 60 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
            <Icon className="w-5 h-5 text-gold" />
          </div>
          <span className="text-gold text-xs font-semibold uppercase tracking-[0.2em]">
            {feature.category}
          </span>
        </div>

        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
          {feature.headline}
        </h2>

        <p className="mt-6 text-white/60 text-lg leading-relaxed max-w-lg">
          {feature.description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-8 mt-8">
          {feature.stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-white/40 uppercase tracking-wider mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ x: 5 }}
          className="flex items-center gap-2 mt-8 text-gold font-semibold group"
        >
          {feature.cta}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </motion.button>
      </motion.div>
    </div>
  );
}

export function FeatureCards() {
  return (
    <section className="relative py-24 lg:py-32 bg-black">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-gold text-xs font-semibold uppercase tracking-[0.2em]">
            Why Monarch
          </span>
          <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-white">
            The Future of Sports Collectibles
          </h2>
          <p className="mt-6 text-white/60 text-lg">
            Built for collectors, by collectors. Experience the next generation of digital sports memorabilia.
          </p>
        </motion.div>
      </div>

      {/* Feature cards */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-24 lg:space-y-32">
        {features.map((feature, index) => (
          <FeatureCard key={feature.category} feature={feature} index={index} />
        ))}
      </div>
    </section>
  );
}
