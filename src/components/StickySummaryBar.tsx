import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';

interface StickySummaryBarProps {
  visible: boolean;
  currencySymbol: string;
  grandTotal: number;
  itemCount: number;
  onGenerate: () => void;
}

export const StickySummaryBar: React.FC<StickySummaryBarProps> = ({
  visible,
  currencySymbol,
  grandTotal,
  itemCount,
  onGenerate,
}) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-xl print:hidden"
        >
          <div className="bg-gray-900/90 dark:bg-gray-900/95 backdrop-blur-2xl border border-white/20 text-white rounded-full p-2.5 pl-6 shadow-2xl shadow-blue-500/20 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">
                  Grand Total ({itemCount} {itemCount === 1 ? 'item' : 'items'})
                </span>
                <span className="text-xl font-extrabold text-white">
                  {currencySymbol}{grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <Button
              onClick={onGenerate}
              size="sm"
              className="rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold px-6 shadow-lg shadow-blue-500/30 hover:scale-105 transition-transform"
            >
              <Sparkles className="h-4 w-4 mr-1.5" />
              <span>Generate</span>
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
