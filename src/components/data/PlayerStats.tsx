import { motion } from 'framer-motion';
import type { PlayerCard } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface PlayerStatsProps {
  card: PlayerCard;
}

export function PlayerStats({ card }: PlayerStatsProps) {
  const playerInfo = [
    { label: 'Position', value: card.position },
    { label: 'Height', value: card.stats.height },
    { label: 'Weight', value: card.stats.weight },
    { label: 'Class', value: 'Junior' },
    { label: 'Hometown', value: 'Birmingham, AL' },
    { label: 'School', value: 'Thompson High' },
  ];

  const seasonStats = [
    { label: 'GP', value: card.seasonAverages.games },
    { label: 'REC', value: card.seasonAverages.receptions },
    { label: 'YDS', value: card.seasonAverages.yards },
    { label: 'TD', value: card.seasonAverages.touchdowns },
    { label: 'AVG', value: card.seasonAverages.avgYards },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="bg-dark-card border border-dark-border rounded-xl p-6"
    >
      <h3 className="text-white font-bold text-lg mb-6">Player Stats</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Player Info */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30 flex items-center justify-center">
              <span className="text-gold text-xl font-bold">MG</span>
            </div>
            <div>
              <h4 className="text-white font-semibold">{card.playerName.split(' - ')[0]}</h4>
              <p className="text-muted-foreground text-sm">#{card.serial.current} · {card.team}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {playerInfo.map((info, index) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1">
                  {info.label}
                </div>
                <div className="text-white font-medium">{info.value}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Season Averages */}
        <div>
          <h4 className="text-muted-foreground text-sm uppercase tracking-wider mb-4">
            Season Averages
          </h4>
          <Table>
            <TableHeader>
              <TableRow className="border-dark-border hover:bg-transparent">
                {seasonStats.map((stat) => (
                  <TableHead key={stat.label} className="text-muted-foreground text-[11px] uppercase tracking-wider text-center">
                    {stat.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-dark-border">
                {seasonStats.map((stat) => (
                  <TableCell key={stat.label} className="text-white font-bold text-center">
                    {stat.value}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </motion.div>
  );
}
