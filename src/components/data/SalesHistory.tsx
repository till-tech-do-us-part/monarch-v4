import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import type { SaleRecord } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface SalesHistoryProps {
  topSales: SaleRecord[];
  recentSales: SaleRecord[];
}

export function SalesHistory({ topSales, recentSales }: SalesHistoryProps) {
  const [activeTab, setActiveTab] = useState<'top' | 'recent'>('top');

  const sales = activeTab === 'top' ? topSales : recentSales;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="bg-dark-card border border-dark-border rounded-xl overflow-hidden"
    >
      {/* Tabs */}
      <div className="flex border-b border-dark-border">
        <button
          onClick={() => setActiveTab('top')}
          className={`relative px-6 py-4 text-sm font-semibold uppercase tracking-wider transition-colors ${
            activeTab === 'top' ? 'text-white' : 'text-muted-foreground hover:text-white'
          }`}
        >
          Top Purchases
          {activeTab === 'top' && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab('recent')}
          className={`relative px-6 py-4 text-sm font-semibold uppercase tracking-wider transition-colors ${
            activeTab === 'recent' ? 'text-white' : 'text-muted-foreground hover:text-white'
          }`}
        >
          Recent Purchases
          {activeTab === 'recent' && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
            />
          )}
        </button>
      </div>

      {/* Table */}
      <div className="p-4">
        <Table>
          <TableHeader>
            <TableRow className="border-dark-border hover:bg-transparent">
              <TableHead className="text-muted-foreground text-[11px] uppercase tracking-wider">Buyer</TableHead>
              <TableHead className="text-muted-foreground text-[11px] uppercase tracking-wider">Sale Price</TableHead>
              <TableHead className="text-muted-foreground text-[11px] uppercase tracking-wider">Serial</TableHead>
              <TableHead className="text-muted-foreground text-[11px] uppercase tracking-wider">Date / Time</TableHead>
              <TableHead className="text-muted-foreground text-[11px] uppercase tracking-wider text-right">Tx</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence mode="wait">
              {sales.map((sale, index) => (
                <motion.tr
                  key={`${sale.buyer}-${sale.serial}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="border-dark-border hover:bg-dark-elevated transition-colors"
                >
                  <TableCell className="font-medium text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30 flex items-center justify-center">
                        <span className="text-gold text-xs font-bold">
                          {sale.buyer.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      {sale.buyer}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-white font-semibold">{sale.price}</span>
                      {index < 3 && activeTab === 'top' && (
                        <span className="text-[10px] text-gold">Top Sale:</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`font-mono ${sale.serial === '#1' || sale.serial === '#2' || sale.serial === '#3' ? 'text-gold' : 'text-white'}`}>
                      {sale.serial}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{sale.date}</TableCell>
                  <TableCell className="text-right">
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-dark-elevated text-muted-foreground hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>

        {/* View All Link */}
        <div className="mt-4 text-center">
          <a href="#" className="text-gold text-sm hover:underline">
            View {activeTab === 'top' ? 'top sales' : 'complete sales'} history
          </a>
        </div>
      </div>
    </motion.div>
  );
}
