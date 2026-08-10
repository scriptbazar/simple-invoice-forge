import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Edit, CheckCircle2, Clock, QrCode } from 'lucide-react';
import { InvoiceData, COLOR_THEMES } from '@/types/invoice';
import { calculateItemTotals } from '@/utils/invoiceCalculator';

interface InvoicePreviewProps {
  invoiceData: InvoiceData | null;
  invoiceType: string;
  onEdit: () => void;
}

export const InvoicePreview: React.FC<InvoicePreviewProps> = ({ invoiceData, invoiceType, onEdit }) => {
  const [status, setStatus] = useState<'ISSUED' | 'PAID' | 'PENDING'>('ISSUED');

  if (!invoiceData) return null;

  const symbol = invoiceData.currencySymbol || invoiceData.currency || '$';
  const selectedTheme = COLOR_THEMES.find(t => t.id === invoiceData.primaryColor) || COLOR_THEMES[0];

  const formatCurrency = (amount: number) => {
    return `${symbol}${amount.toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  };

  const qrCodeUrl = invoiceData.paymentUpi 
    ? `https://api.qrserver.com/v1/create-qr-code/?size=140x140&margin=0&data=${encodeURIComponent(invoiceData.paymentUpi.startsWith('http') ? invoiceData.paymentUpi : `upi://pay?pa=${invoiceData.paymentUpi}&pn=${encodeURIComponent(invoiceData.senderName)}&am=${invoiceData.totals.grandTotal.toFixed(2)}&cu=INR`)}`
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      {/* Action Header & Status Selector */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4 print:hidden">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">Invoice Preview</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">Review your generated document</p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Status Watermark Selector */}
          <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl border text-xs font-bold">
            <button
              onClick={() => setStatus('ISSUED')}
              className={`px-3 py-1 rounded-lg transition-colors ${status === 'ISSUED' ? 'bg-blue-600 text-white shadow' : 'text-gray-600 dark:text-gray-400'}`}
            >
              ISSUED
            </button>
            <button
              onClick={() => setStatus('PAID')}
              className={`px-3 py-1 rounded-lg transition-colors ${status === 'PAID' ? 'bg-emerald-600 text-white shadow' : 'text-gray-600 dark:text-gray-400'}`}
            >
              PAID
            </button>
            <button
              onClick={() => setStatus('PENDING')}
              className={`px-3 py-1 rounded-lg transition-colors ${status === 'PENDING' ? 'bg-amber-600 text-white shadow' : 'text-gray-600 dark:text-gray-400'}`}
            >
              PENDING
            </button>
          </div>

          <Button variant="outline" onClick={onEdit} className="flex items-center space-x-2 rounded-xl">
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </Button>
        </div>
      </div>

      <Card id="invoice-preview" className="p-8 bg-white text-gray-900 shadow-xl border border-gray-200/80 rounded-2xl relative overflow-hidden print:shadow-none print:border-none print:p-0 print:bg-white">
        {/* Status Stamp / Badge */}
        <div className="absolute top-8 right-8 print:right-4 pointer-events-none opacity-80">
          {status === 'PAID' && (
            <div className="border-4 border-emerald-600 text-emerald-600 font-extrabold text-xs px-4 py-1.5 rounded-lg tracking-widest uppercase transform rotate-6 flex items-center space-x-1">
              <CheckCircle2 className="h-4 w-4 mr-1" />
              <span>PAID</span>
            </div>
          )}
          {status === 'PENDING' && (
            <div className="border-4 border-amber-500 text-amber-600 font-extrabold text-xs px-4 py-1.5 rounded-lg tracking-widest uppercase transform -rotate-3 flex items-center space-x-1">
              <Clock className="h-4 w-4 mr-1" />
              <span>PAYMENT PENDING</span>
            </div>
          )}
          {status === 'ISSUED' && (
            <div className={`border-4 ${selectedTheme.borderClass} ${selectedTheme.textClass} font-extrabold text-xs px-4 py-1.5 rounded-lg tracking-widest uppercase transform rotate-2`}>
              <span>ORIGINAL INVOICE</span>
            </div>
          )}
        </div>

        {/* Header */}
        <div className="flex justify-between items-start mb-8 flex-wrap gap-4 border-b border-gray-200 pb-6 pr-28">
          <div>
            {invoiceData.logo && (
              <img
                src={invoiceData.logo}
                alt="Company Logo"
                className="h-16 w-auto max-w-[200px] object-contain mb-4"
              />
            )}
            <h1 className="text-3xl font-extrabold text-gray-900 capitalize">
              {invoiceType.replace(/([A-Z])/g, ' $1').trim()} Invoice
            </h1>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-black mb-2 ${selectedTheme.textClass}`}>
              #{invoiceData.invoiceNumber}
            </div>
            <div className="text-xs text-gray-600 space-y-1">
              <div><strong>Date:</strong> {formatDate(invoiceData.date)}</div>
              {invoiceData.dueDate && (
                <div><strong>Due Date:</strong> {formatDate(invoiceData.dueDate)}</div>
              )}
            </div>
          </div>
        </div>

        {/* From/To Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200/70">
            <h3 className="text-[11px] uppercase tracking-widest font-extrabold text-gray-400 mb-2">From:</h3>
            <div className="text-gray-800 space-y-1">
              <div className="font-bold text-lg text-gray-900">{invoiceData.senderName}</div>
              {invoiceData.senderAddress && (
                <div className="whitespace-pre-line text-xs text-gray-600">{invoiceData.senderAddress}</div>
              )}
              {invoiceData.senderEmail && <div className="text-xs text-gray-600">{invoiceData.senderEmail}</div>}
              {invoiceData.senderPhone && <div className="text-xs text-gray-600">{invoiceData.senderPhone}</div>}
              {invoiceData.senderGST && <div className={`text-xs font-semibold mt-1 ${selectedTheme.textClass}`}>GSTIN: {invoiceData.senderGST}</div>}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200/70">
            <h3 className="text-[11px] uppercase tracking-widest font-extrabold text-gray-400 mb-2">To (Billed To):</h3>
            <div className="text-gray-800 space-y-1">
              <div className="font-bold text-lg text-gray-900">{invoiceData.recipientName}</div>
              {invoiceData.recipientAddress && (
                <div className="whitespace-pre-line text-xs text-gray-600">{invoiceData.recipientAddress}</div>
              )}
              {invoiceData.recipientEmail && <div className="text-xs text-gray-600">{invoiceData.recipientEmail}</div>}
              {invoiceData.recipientPhone && <div className="text-xs text-gray-600">{invoiceData.recipientPhone}</div>}
              {invoiceData.recipientGST && <div className={`text-xs font-semibold mt-1 ${selectedTheme.textClass}`}>GSTIN: {invoiceData.recipientGST}</div>}
            </div>
          </div>
        </div>

        {/* Type-specific fields */}
        {invoiceType === 'medical' && invoiceData.patientId && (
          <div className="mb-6 p-4 bg-blue-50/60 rounded-xl border border-blue-100">
            <h3 className="text-xs font-extrabold uppercase text-blue-900 mb-1">Patient Info</h3>
            <div className="text-xs text-blue-800">Patient ID: <strong>{invoiceData.patientId}</strong></div>
          </div>
        )}

        {invoiceType === 'hotel' && (invoiceData.roomNumber || invoiceData.checkIn) && (
          <div className="mb-6 p-4 bg-blue-50/60 rounded-xl border border-blue-100">
            <h3 className="text-xs font-extrabold uppercase text-blue-900 mb-1">Stay Information</h3>
            <div className="text-xs text-blue-800 space-y-1">
              {invoiceData.roomNumber && <div>Room Number: <strong>{invoiceData.roomNumber}</strong></div>}
              {invoiceData.checkIn && <div>Check-in: {formatDate(invoiceData.checkIn)}</div>}
              {invoiceData.checkOut && <div>Check-out: {formatDate(invoiceData.checkOut)}</div>}
            </div>
          </div>
        )}

        {/* Items Table */}
        <div className="mb-8 overflow-hidden rounded-xl border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`${selectedTheme.bgClass} text-white text-[11px] font-extrabold uppercase tracking-wider`}>
                <th className="py-3.5 px-4">Item Description</th>
                <th className="py-3.5 px-4 text-center">Qty</th>
                <th className="py-3.5 px-4 text-right">Rate</th>
                <th className="py-3.5 px-4 text-right">Discount</th>
                <th className="py-3.5 px-4 text-right">Tax</th>
                <th className="py-3.5 px-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-xs">
              {invoiceData.items.map((item, index) => {
                const calc = calculateItemTotals(item);

                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3.5 px-4 font-semibold text-gray-900">{item.name}</td>
                    <td className="py-3.5 px-4 text-center">{item.quantity}</td>
                    <td className="py-3.5 px-4 text-right">{formatCurrency(item.rate)}</td>
                    <td className="py-3.5 px-4 text-right text-gray-600">
                      {item.discount > 0 
                        ? (item.discountType === 'fixed' 
                            ? formatCurrency(calc.itemDiscountAmount)
                            : `${item.discount}% (${formatCurrency(calc.itemDiscountAmount)})`)
                        : '-'}
                    </td>
                    <td className="py-3.5 px-4 text-right text-gray-600">
                      {item.tax > 0 ? `${item.tax}%` : '-'}
                    </td>
                    <td className="py-3.5 px-4 text-right font-extrabold text-gray-900">{formatCurrency(calc.itemTotalAmount)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Totals & Optional Payment QR Code */}
        <div className="flex justify-between items-start mb-8 flex-wrap gap-6">
          {/* Payment QR Code Box */}
          {qrCodeUrl ? (
            <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-xl border border-gray-200">
              <img src={qrCodeUrl} alt="Payment QR Code" className="h-24 w-24 rounded border bg-white p-1" />
              <div>
                <span className="text-[10px] font-extrabold uppercase text-gray-400 block tracking-wider flex items-center">
                  <QrCode className="h-3 w-3 mr-1 text-blue-500" />
                  Scan & Pay
                </span>
                <span className="text-xs font-bold text-gray-800 block mt-0.5">{invoiceData.paymentUpi}</span>
                <span className="text-[10px] text-gray-500 block mt-1">Scan with GPay, PhonePe, Paytm or UPI apps</span>
              </div>
            </div>
          ) : <div />}

          <div className="w-full max-w-xs space-y-2 text-xs">
            <div className="flex justify-between py-1 text-gray-600">
              <span>Subtotal:</span>
              <span className="font-semibold text-gray-900">{formatCurrency(invoiceData.totals.subtotal)}</span>
            </div>
            {invoiceData.totals.totalDiscount > 0 && (
              <div className="flex justify-between py-1 text-emerald-600">
                <span>Total Discount:</span>
                <span className="font-semibold">-{formatCurrency(invoiceData.totals.totalDiscount)}</span>
              </div>
            )}
            <div className="flex justify-between py-1 text-gray-600">
              <span>Taxable Amount:</span>
              <span className="font-semibold text-gray-900">{formatCurrency(invoiceData.totals.taxableAmount)}</span>
            </div>
            <div className="flex justify-between py-1 text-gray-600">
              <span>Total Tax:</span>
              <span className="font-semibold text-gray-900">+{formatCurrency(invoiceData.totals.totalTax)}</span>
            </div>
            <Separator />
            <div className="flex justify-between py-2 text-lg font-black text-gray-900">
              <span>Grand Total:</span>
              <span className={selectedTheme.textClass}>{formatCurrency(invoiceData.totals.grandTotal)}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {invoiceData.notes && (
          <div className="mb-8 border-t border-gray-200 pt-4">
            <h3 className="text-[11px] uppercase tracking-widest font-extrabold text-gray-400 mb-2">Terms & Notes:</h3>
            <div className="text-xs text-gray-700 whitespace-pre-line bg-gray-50 p-4 rounded-xl border border-gray-200/70">
              {invoiceData.notes}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-[11px] text-gray-400 border-t border-gray-200 pt-4 mt-8">
          <p className="font-semibold text-gray-600">Thank you for your business!</p>
          <p className="mt-0.5">Generated via Smart Invoice Forge on {new Date(invoiceData.generatedAt).toLocaleDateString()}</p>
        </div>
      </Card>
    </motion.div>
  );
};
