import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface InvoiceProgressProps {
  percentage: number;
  senderValid: boolean;
  recipientValid: boolean;
  itemsValid: boolean;
}

export const InvoiceProgress: React.FC<InvoiceProgressProps> = ({
  percentage,
  senderValid,
  recipientValid,
  itemsValid,
}) => {
  return (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200/80 dark:border-gray-800 rounded-2xl p-4 shadow-lg mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Form Readiness
          </span>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            {percentage}%
          </span>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
          {percentage === 100 ? 'Ready to generate!' : 'Fill required fields'}
        </span>
      </div>

      {/* Animated Progress Track */}
      <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mb-3">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      {/* Validation Badges */}
      <div className="flex items-center space-x-4 text-[11px] font-semibold flex-wrap gap-y-1">
        <div className={`flex items-center space-x-1 ${senderValid ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400 dark:text-gray-500'}`}>
          {senderValid ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertCircle className="h-3.5 w-3.5" />}
          <span>Sender Name</span>
        </div>

        <div className={`flex items-center space-x-1 ${recipientValid ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400 dark:text-gray-500'}`}>
          {recipientValid ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertCircle className="h-3.5 w-3.5" />}
          <span>Recipient Name</span>
        </div>

        <div className={`flex items-center space-x-1 ${itemsValid ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400 dark:text-gray-500'}`}>
          {itemsValid ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertCircle className="h-3.5 w-3.5" />}
          <span>Item Details</span>
        </div>
      </div>
    </div>
  );
};
