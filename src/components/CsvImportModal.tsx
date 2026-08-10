import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { X, FileSpreadsheet, Sparkles, Upload } from 'lucide-react';
import { InvoiceItem } from '@/types/invoice';
import { toast } from '@/hooks/use-toast';

interface CsvImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportItems: (items: InvoiceItem[]) => void;
}

export const CsvImportModal: React.FC<CsvImportModalProps> = ({
  isOpen,
  onClose,
  onImportItems,
}) => {
  const [csvText, setCsvText] = useState(
`Web Development Service, 1, 25000, 18, 0
UI/UX Design Mockups, 2, 8000, 18, 5
Cloud Server Hosting, 1, 4500, 0, 0`
  );

  if (!isOpen) return null;

  const parseCsv = () => {
    const lines = csvText.split('\n').map(l => l.trim()).filter(Boolean);
    const newItems: InvoiceItem[] = [];

    lines.forEach((line, index) => {
      const parts = line.split(',').map(p => p.trim());
      if (parts.length >= 2) {
        const name = parts[0];
        const quantity = parseFloat(parts[1]) || 1;
        const rate = parseFloat(parts[2]) || 0;
        const tax = parseFloat(parts[3]) || 0;
        const discount = parseFloat(parts[4]) || 0;

        newItems.push({
          id: `${Date.now()}-${index}`,
          name,
          quantity,
          rate,
          tax,
          discount,
          discountType: 'percent'
        });
      }
    });

    if (newItems.length > 0) {
      onImportItems(newItems);
      onClose();
      toast({
        title: "Items imported!",
        description: `Successfully imported ${newItems.length} line items.`
      });
    } else {
      toast({
        title: "Import failed",
        description: "Please check your format: Item Name, Qty, Rate, Tax%, Discount%",
        variant: "destructive"
      });
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-2xl w-full max-w-lg space-y-4"
        >
          <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <FileSpreadsheet className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-gray-900 dark:text-white">Import Line Items (CSV / Text)</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">Paste line items in CSV format</p>
              </div>
            </div>
            
            <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full p-2">
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
              Format: <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-blue-600 dark:text-blue-400">Item Name, Quantity, Rate, Tax%, Discount%</code>
            </label>

            <Textarea
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
              rows={6}
              className="font-mono text-xs rounded-xl"
              placeholder="Item Name, Quantity, Rate, Tax%, Discount%"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <Button variant="outline" onClick={onClose} className="rounded-xl text-xs">
              Cancel
            </Button>
            <Button onClick={parseCsv} className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs">
              <Upload className="h-4 w-4 mr-1.5" />
              Import Items
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
