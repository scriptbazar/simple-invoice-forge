import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { 
  FileText, 
  Calculator, 
  User, 
  Heart, 
  Building, 
  ScrollText,
  Briefcase,
  CreditCard,
  ArrowRight
} from 'lucide-react';

interface InvoiceTypeSelectorProps {
  onTypeSelect: (type: string) => void;
}

const invoiceTypes = [
  {
    id: 'retail',
    name: 'Retail Invoice',
    tag: 'Popular',
    description: 'For store sales, POS receipts, and physical products',
    icon: FileText,
    gradient: 'from-blue-500 via-indigo-500 to-blue-600',
    tagStyle: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800/80',
    accentBorder: 'hover:border-blue-500/60 hover:shadow-blue-500/15'
  },
  {
    id: 'gst',
    name: 'GST Tax Invoice',
    tag: 'Compliant',
    description: 'Tax compliant GST bills with CGST/SGST breakdown',
    icon: Calculator,
    gradient: 'from-emerald-500 via-teal-500 to-emerald-600',
    tagStyle: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800/80',
    accentBorder: 'hover:border-emerald-500/60 hover:shadow-emerald-500/15'
  },
  {
    id: 'freelance',
    name: 'Freelance Invoice',
    tag: 'Contractors',
    description: 'For digital services, developers, designers & creators',
    icon: User,
    gradient: 'from-purple-500 via-violet-500 to-purple-600',
    tagStyle: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800/80',
    accentBorder: 'hover:border-purple-500/60 hover:shadow-purple-500/15'
  },
  {
    id: 'medical',
    name: 'Medical Bill',
    tag: 'Healthcare',
    description: 'Hospitals, clinics, pharmacies & patient care billing',
    icon: Heart,
    gradient: 'from-rose-500 via-pink-500 to-rose-600',
    tagStyle: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800/80',
    accentBorder: 'hover:border-rose-500/60 hover:shadow-rose-500/15'
  },
  {
    id: 'hotel',
    name: 'Hotel Bill',
    tag: 'Hospitality',
    description: 'Room stay, check-in/out & accommodation receipts',
    icon: Building,
    gradient: 'from-amber-500 via-orange-500 to-amber-600',
    tagStyle: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800/80',
    accentBorder: 'hover:border-amber-500/60 hover:shadow-amber-500/15'
  },
  {
    id: 'proforma',
    name: 'Proforma Invoice',
    tag: 'Estimates',
    description: 'Quotations and price estimates before final payment',
    icon: ScrollText,
    gradient: 'from-indigo-500 via-blue-500 to-indigo-600',
    tagStyle: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800/80',
    accentBorder: 'hover:border-indigo-500/60 hover:shadow-indigo-500/15'
  },
  {
    id: 'service',
    name: 'Service Invoice',
    tag: 'B2B',
    description: 'Professional agency, consulting & enterprise retainers',
    icon: Briefcase,
    gradient: 'from-cyan-500 via-teal-500 to-cyan-600',
    iconBg: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
    tagStyle: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800/80',
    accentBorder: 'hover:border-cyan-500/60 hover:shadow-cyan-500/15'
  },
  {
    id: 'custom',
    name: 'Custom Format',
    tag: 'Flexible',
    description: 'Create your own personalized custom billing layout',
    icon: CreditCard,
    gradient: 'from-fuchsia-500 via-purple-500 to-fuchsia-600',
    tagStyle: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200 dark:bg-fuchsia-950/60 dark:text-fuchsia-300 dark:border-fuchsia-800/80',
    accentBorder: 'hover:border-fuchsia-500/60 hover:shadow-fuchsia-500/15'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 260, damping: 20 } 
  },
};

export const InvoiceTypeSelector: React.FC<InvoiceTypeSelectorProps> = ({ onTypeSelect }) => {
  return (
    <div className="max-w-6xl mx-auto pt-2">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {invoiceTypes.map((type) => {
          const IconComponent = type.icon;
          return (
            <motion.div
              key={type.id}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onTypeSelect(type.id)}
            >
              <Card
                className={`p-6 cursor-pointer relative overflow-hidden transition-all duration-300 hover:shadow-2xl group border border-gray-200/90 dark:border-gray-800/90 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl h-full ${type.accentBorder}`}
              >
                {/* Top Accent Gradient Bar */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${type.gradient}`} />

                <div className="flex flex-col h-full justify-between space-y-5 pt-1">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      {/* Glowing Icon Container */}
                      <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${type.gradient} text-white shadow-lg shadow-blue-500/15 group-hover:scale-110 transition-all duration-300`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      {/* Color-coded Tag Pill */}
                      <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full border ${type.tagStyle} tracking-wide`}>
                        {type.tag}
                      </span>
                    </div>

                    <h3 className="text-lg font-extrabold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                      {type.name}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mt-2 font-normal">
                      {type.description}
                    </p>
                  </div>

                  {/* Bottom Action Pill Button */}
                  <div className="pt-2">
                    <div className="inline-flex items-center justify-between w-full px-3.5 py-2 rounded-xl bg-gray-50 dark:bg-gray-800/80 group-hover:bg-blue-600 dark:group-hover:bg-blue-600 text-gray-700 dark:text-gray-300 group-hover:text-white transition-all duration-300 text-xs font-bold shadow-sm">
                      <span>Create Invoice</span>
                      <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};
