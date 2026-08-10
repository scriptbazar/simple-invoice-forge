import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Trash2, ExternalLink, History, FileText, Calendar, Sparkles } from 'lucide-react';
import { InvoiceData } from '@/types/invoice';
import { getInvoiceHistory, deleteInvoiceFromHistory, clearAllInvoiceHistory } from '@/utils/invoiceStorage';

interface SavedInvoicesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectInvoice: (invoice: InvoiceData) => void;
}

export const SavedInvoicesModal: React.FC<SavedInvoicesModalProps> = ({
  isOpen,
  onClose,
  onSelectInvoice,
}) => {
  const [invoices, setInvoices] = useState<InvoiceData[]>([]);

  useEffect(() => {
    if (isOpen) {
      setInvoices(getInvoiceHistory());
    }
  }, [isOpen]);

  const handleDelete = (invoiceNumber: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = deleteInvoiceFromHistory(invoiceNumber);
    setInvoices(updated);
  };

  const handleClearAll = () => {
    clearAllInvoiceHistory();
    setInvoices([]);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col"
        >
          <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <History className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">Saved Invoice History</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">Manage and reload past created invoices</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {invoices.length > 0 && (
                <Button variant="ghost" size="sm" onClick={handleClearAll} className="text-red-500 hover:text-red-700 text-xs">
                  Clear All
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full p-2">
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="overflow-y-auto flex-1 py-4 space-y-3 pr-1">
            {invoices.length === 0 ? (
              <div className="text-center py-16 text-gray-400 dark:text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-3 opacity-40" />
                <p className="font-bold text-sm">No Saved Invoices Found</p>
                <p className="text-xs mt-1">Generated invoices will automatically appear here.</p>
              </div>
            ) : (
              invoices.map((inv) => (
                <motion.div
                  key={inv.invoiceNumber}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => {
                    onSelectInvoice(inv);
                    onClose();
                  }}
                  className="p-4 rounded-2xl border border-gray-200/90 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-extrabold text-sm text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        #{inv.invoiceNumber}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 uppercase">
                        {inv.invoiceType}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      <strong>To:</strong> {inv.recipientName || 'N/A'} • <strong>From:</strong> {inv.senderName || 'N/A'}
                    </div>
                    <div className="text-[11px] text-gray-400 flex items-center space-x-2">
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(inv.generatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="font-black text-base text-blue-600 dark:text-blue-400">
                      {inv.currencySymbol}{inv.totals.grandTotal.toFixed(2)}
                    </span>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => handleDelete(inv.invoiceNumber, e)}
                      className="text-gray-400 hover:text-red-600 p-2 rounded-xl"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          <div className="pt-3 border-t border-gray-200 dark:border-gray-800 text-right">
            <Button onClick={onClose} variant="outline" className="rounded-xl text-xs">
              Close
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
