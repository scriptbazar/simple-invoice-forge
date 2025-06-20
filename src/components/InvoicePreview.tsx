
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Edit } from 'lucide-react';

interface InvoicePreviewProps {
  invoiceData: any;
  invoiceType: string;
  onEdit: () => void;
}

export const InvoicePreview: React.FC<InvoicePreviewProps> = ({ invoiceData, invoiceType, onEdit }) => {
  if (!invoiceData) return null;

  const formatCurrency = (amount: number) => {
    return `${invoiceData.currency} ${amount.toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div id="invoice-preview" className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Invoice Preview</h2>
        <Button variant="outline" onClick={onEdit} className="flex items-center space-x-2">
          <Edit className="h-4 w-4" />
          <span>Edit</span>
        </Button>
      </div>

      <Card className="p-8 bg-white print:shadow-none">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            {invoiceData.logo && (
              <img
                src={URL.createObjectURL(invoiceData.logo)}
                alt="Company Logo"
                className="h-16 w-auto mb-4"
              />
            )}
            <h1 className="text-3xl font-bold text-gray-800 capitalize">
              {invoiceType} Invoice
            </h1>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              #{invoiceData.invoiceNumber}
            </div>
            <div className="text-sm text-gray-600">
              <div>Date: {formatDate(invoiceData.date)}</div>
              {invoiceData.dueDate && (
                <div>Due: {formatDate(invoiceData.dueDate)}</div>
              )}
            </div>
          </div>
        </div>

        {/* From/To Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">From:</h3>
            <div className="text-gray-600 space-y-1">
              <div className="font-medium text-gray-800">{invoiceData.senderName}</div>
              {invoiceData.senderAddress && (
                <div className="whitespace-pre-line">{invoiceData.senderAddress}</div>
              )}
              {invoiceData.senderEmail && <div>{invoiceData.senderEmail}</div>}
              {invoiceData.senderPhone && <div>{invoiceData.senderPhone}</div>}
              {invoiceData.senderGST && <div>GST: {invoiceData.senderGST}</div>}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">To:</h3>
            <div className="text-gray-600 space-y-1">
              <div className="font-medium text-gray-800">{invoiceData.recipientName}</div>
              {invoiceData.recipientAddress && (
                <div className="whitespace-pre-line">{invoiceData.recipientAddress}</div>
              )}
              {invoiceData.recipientEmail && <div>{invoiceData.recipientEmail}</div>}
              {invoiceData.recipientPhone && <div>{invoiceData.recipientPhone}</div>}
              {invoiceData.recipientGST && <div>GST: {invoiceData.recipientGST}</div>}
            </div>
          </div>
        </div>

        {/* Type-specific fields */}
        {invoiceType === 'medical' && invoiceData.patientId && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Patient Information:</h3>
            <div className="text-gray-600">Patient ID: {invoiceData.patientId}</div>
          </div>
        )}

        {invoiceType === 'hotel' && (invoiceData.roomNumber || invoiceData.checkIn) && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Stay Information:</h3>
            <div className="text-gray-600 space-y-1">
              {invoiceData.roomNumber && <div>Room: {invoiceData.roomNumber}</div>}
              {invoiceData.checkIn && <div>Check-in: {formatDate(invoiceData.checkIn)}</div>}
              {invoiceData.checkOut && <div>Check-out: {formatDate(invoiceData.checkOut)}</div>}
            </div>
          </div>
        )}

        {/* Items Table */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Items:</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-2 font-semibold">Item</th>
                  <th className="text-center py-3 px-2 font-semibold">Qty</th>
                  <th className="text-right py-3 px-2 font-semibold">Rate</th>
                  <th className="text-right py-3 px-2 font-semibold">Tax</th>
                  <th className="text-right py-3 px-2 font-semibold">Discount</th>
                  <th className="text-right py-3 px-2 font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.items.map((item: any, index: number) => {
                  const itemSubtotal = item.quantity * item.rate;
                  const itemTax = itemSubtotal * item.tax / 100;
                  const itemDiscount = itemSubtotal * item.discount / 100;
                  const itemTotal = itemSubtotal + itemTax - itemDiscount;

                  return (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 px-2">{item.name}</td>
                      <td className="py-3 px-2 text-center">{item.quantity}</td>
                      <td className="py-3 px-2 text-right">{formatCurrency(item.rate)}</td>
                      <td className="py-3 px-2 text-right">{item.tax}%</td>
                      <td className="py-3 px-2 text-right">{item.discount}%</td>
                      <td className="py-3 px-2 text-right font-medium">{formatCurrency(itemTotal)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-8">
          <div className="w-full max-w-sm space-y-2">
            <div className="flex justify-between py-1">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">{formatCurrency(invoiceData.totals.subtotal)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-600">Total Tax:</span>
              <span className="font-medium">{formatCurrency(invoiceData.totals.totalTax)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-600">Total Discount:</span>
              <span className="font-medium">-{formatCurrency(invoiceData.totals.totalDiscount)}</span>
            </div>
            <Separator />
            <div className="flex justify-between py-2 text-lg font-bold">
              <span>Grand Total:</span>
              <span className="text-blue-600">{formatCurrency(invoiceData.totals.grandTotal)}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {invoiceData.notes && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Notes:</h3>
            <div className="text-gray-600 whitespace-pre-line bg-gray-50 p-4 rounded-lg">
              {invoiceData.notes}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 border-t pt-4">
          <p>Thank you for your business!</p>
          <p className="mt-1">Generated on {new Date(invoiceData.generatedAt).toLocaleDateString()}</p>
        </div>
      </Card>
    </div>
  );
};
