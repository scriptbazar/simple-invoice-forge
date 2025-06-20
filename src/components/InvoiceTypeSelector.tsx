
import React from 'react';
import { Card } from '@/components/ui/card';
import { 
  FileText, 
  Calculator, 
  User, 
  Heart, 
  Building, 
  ScrollText,
  Briefcase,
  CreditCard
} from 'lucide-react';

interface InvoiceTypeSelectorProps {
  onTypeSelect: (type: string) => void;
}

const invoiceTypes = [
  {
    id: 'retail',
    name: 'Retail Invoice',
    description: 'For retail sales and products',
    icon: FileText,
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'gst',
    name: 'GST Invoice',
    description: 'Tax compliant GST invoice',
    icon: Calculator,
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'freelance',
    name: 'Freelance Invoice',
    description: 'For freelancers and contractors',
    icon: User,
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'medical',
    name: 'Medical Bill',
    description: 'Healthcare and medical services',
    icon: Heart,
    color: 'from-red-500 to-red-600'
  },
  {
    id: 'hotel',
    name: 'Hotel Bill',
    description: 'Hospitality and accommodation',
    icon: Building,
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 'proforma',
    name: 'Proforma Invoice',
    description: 'Quotation and estimates',
    icon: ScrollText,
    color: 'from-indigo-500 to-indigo-600'
  },
  {
    id: 'service',
    name: 'Service Invoice',
    description: 'Professional services',
    icon: Briefcase,
    color: 'from-teal-500 to-teal-600'
  },
  {
    id: 'custom',
    name: 'Custom Invoice',
    description: 'Create your own format',
    icon: CreditCard,
    color: 'from-pink-500 to-pink-600'
  }
];

export const InvoiceTypeSelector: React.FC<InvoiceTypeSelectorProps> = ({ onTypeSelect }) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {invoiceTypes.map((type) => {
          const IconComponent = type.icon;
          return (
            <Card
              key={type.id}
              className="p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl group border-2 hover:border-blue-300 dark:hover:border-blue-600"
              onClick={() => onTypeSelect(type.id)}
            >
              <div className="text-center">
                <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${type.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {type.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {type.description}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
