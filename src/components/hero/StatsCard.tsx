import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  stats: { label: string; value: string | number }[];
}

export function StatsCard({ title, stats }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="bg-dark-card border border-dark-border rounded-lg p-4"
    >
      <h4 className="text-muted-foreground text-xs font-medium uppercase tracking-wider mb-3">
        {title}
      </h4>
      <div className="flex items-center gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col">
            <span className="text-2xl font-bold text-white">{stat.value}</span>
            <span className="text-xs text-muted-foreground uppercase tracking-wide">{stat.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
