import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle2, Sparkles, Download, ArrowRight, Shield } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface HeroDemoCardProps {
  onStartClick: (type: string) => void;
}

export const HeroDemoCard: React.FC<HeroDemoCardProps> = ({ onStartClick }) => {
  const [activeTab, setActiveTab] = useState<'retail' | 'gst' | 'freelance'>('retail');

  const demoData = {
    retail: {
      type: 'Retail Invoice',
      number: 'INV-2026-001',
      from: 'Apex Retail Store',
      to: 'Rahul Sharma',
      items: [
        { name: 'Wireless Bluetooth Headphones', qty: 1, total: '₹2,499.00' },
        { name: 'USB-C Fast Charging Cable', qty: 2, total: '₹798.00' },
      ],
      total: '₹3,297.00',
      badge: 'POPULAR'
    },
    gst: {
      type: 'GST Tax Invoice',
      number: 'GST-8849',
      from: 'TechSolutions India Pvt Ltd',
      to: 'Global Enterprises Inc',
      items: [
        { name: 'Cloud Server Infrastructure setup', qty: 1, total: '₹15,000.00' },
        { name: 'GST @ 18% Tax Rate', qty: 1, total: '₹2,700.00' },
      ],
      total: '₹17,700.00',
      badge: 'GST 18%'
    },
    freelance: {
      type: 'Freelance Invoice',
      number: 'FL-0941',
      from: 'Alex Vance (UI/UX Designer)',
      to: 'Starlight Studio',
      items: [
        { name: 'Web Application UI Redesign (40 hrs)', qty: 1, total: '$1,200.00' },
        { name: 'Framer Motion Spring Animations', qty: 1, total: '$350.00' },
      ],
      total: '$1,550.00',
      badge: 'USD $'
    }
  };

  const current = demoData[activeTab];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="max-w-xl mx-auto mb-12"
    >
      <Card className="p-6 glass-card rounded-3xl shadow-2xl border border-white/40 dark:border-gray-800/80 relative overflow-hidden">
        {/* Top Header Pill Controls */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex space-x-1.5 bg-gray-100 dark:bg-gray-800/80 p-1 rounded-xl border border-gray-200/50 dark:border-gray-700/50 text-xs font-extrabold">
            <button
              onClick={() => setActiveTab('retail')}
              className={`px-3 py-1 rounded-lg transition-all ${activeTab === 'retail' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 dark:text-gray-400'}`}
            >
              Retail
            </button>
            <button
              onClick={() => setActiveTab('gst')}
              className={`px-3 py-1 rounded-lg transition-all ${activeTab === 'gst' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-600 dark:text-gray-400'}`}
            >
              GST Tax
            </button>
            <button
              onClick={() => setActiveTab('freelance')}
              className={`px-3 py-1 rounded-lg transition-all ${activeTab === 'freelance' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-600 dark:text-gray-400'}`}
            >
              Freelance
            </button>
          </div>

          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 tracking-wider">
            {current.badge}
          </span>
        </div>

        {/* Live Mockup Box */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200/80 dark:border-gray-800 shadow-inner text-left text-xs space-y-3">
          <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
            <div>
              <div className="font-extrabold text-sm text-gray-900 dark:text-white">{current.type}</div>
              <div className="text-[10px] text-gray-400">Sample Generated Output</div>
            </div>
            <span className="font-bold text-blue-600 dark:text-blue-400 text-sm">{current.number}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] py-1">
            <div>
              <span className="text-gray-400 uppercase tracking-wider text-[9px] block font-bold">Billed From</span>
              <span className="font-bold text-gray-800 dark:text-gray-200">{current.from}</span>
            </div>
            <div>
              <span className="text-gray-400 uppercase tracking-wider text-[9px] block font-bold">Billed To</span>
              <span className="font-bold text-gray-800 dark:text-gray-200">{current.to}</span>
            </div>
          </div>

          {/* Line items mini table */}
          <div className="space-y-1.5 pt-1">
            {current.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center py-1 border-b border-gray-50 dark:border-gray-800/40 text-[11px]">
                <span className="text-gray-700 dark:text-gray-300 font-medium">{item.name}</span>
                <span className="font-bold text-gray-900 dark:text-white">{item.total}</span>
              </div>
            ))}
          </div>

          {/* Grand total banner */}
          <div className="flex justify-between items-center pt-2 font-black text-sm text-gray-900 dark:text-white">
            <span>Grand Total:</span>
            <span className="text-blue-600 dark:text-blue-400 text-base">{current.total}</span>
          </div>
        </div>

        {/* CTA to launch this specific format */}
        <div className="pt-4 flex justify-between items-center">
          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center font-medium">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mr-1" />
            PDF & Image Export Ready
          </span>
          <Button
            onClick={() => onStartClick(activeTab)}
            size="sm"
            className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold px-4"
          >
            <span>Create {current.type}</span>
            <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};
