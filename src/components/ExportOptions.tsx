import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Download, 
  FileText, 
  Image, 
  Printer, 
  Share2, 
  Copy,
  MessageCircle,
  Mail
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { exportToPDF, exportToPNG, exportToJPG } from '../utils/exportUtils';
import { InvoiceData } from '@/types/invoice';

interface ExportOptionsProps {
  invoiceData: InvoiceData;
  onExportComplete: () => void;
}

export const ExportOptions: React.FC<ExportOptionsProps> = ({ invoiceData, onExportComplete }) => {
  const [isExporting, setIsExporting] = useState(false);

  const symbol = invoiceData.currencySymbol || invoiceData.currency || '$';

  const handleExportToPDF = async () => {
    setIsExporting(true);
    try {
      const fileName = `invoice-${invoiceData.invoiceNumber}.pdf`;
      await exportToPDF('invoice-preview', fileName);
      
      toast({
        title: "PDF Generated",
        description: "Your invoice has been downloaded as PDF"
      });
      onExportComplete();
    } catch (error) {
      console.error('PDF Export error:', error);
      toast({
        title: "Export failed",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportToPNG = async () => {
    setIsExporting(true);
    try {
      const fileName = `invoice-${invoiceData.invoiceNumber}.png`;
      await exportToPNG('invoice-preview', fileName);
      
      toast({
        title: "PNG Generated",
        description: "Your invoice has been downloaded as PNG"
      });
      onExportComplete();
    } catch (error) {
      console.error('PNG Export error:', error);
      toast({
        title: "Export failed",
        description: "Failed to generate PNG",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportToJPG = async () => {
    setIsExporting(true);
    try {
      const fileName = `invoice-${invoiceData.invoiceNumber}.jpg`;
      await exportToJPG('invoice-preview', fileName);
      
      toast({
        title: "JPG Generated",
        description: "Your invoice has been downloaded as JPG"
      });
      onExportComplete();
    } catch (error) {
      console.error('JPG Export error:', error);
      toast({
        title: "Export failed",
        description: "Failed to generate JPG",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  const printInvoice = () => {
    window.print();
    toast({
      title: "Print dialog opened",
      description: "Your invoice is ready to print"
    });
  };

  const shareViaWhatsApp = () => {
    const text = `Invoice #${invoiceData.invoiceNumber} - Total Amount: ${symbol}${invoiceData.totals.grandTotal.toFixed(2)}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    toast({
      title: "WhatsApp opened",
      description: "Share your invoice summary via WhatsApp"
    });
  };

  const shareViaEmail = () => {
    const subject = `Invoice #${invoiceData.invoiceNumber}`;
    const body = `Dear ${invoiceData.recipientName},\n\nPlease find invoice #${invoiceData.invoiceNumber} details.\nTotal Amount: ${symbol}${invoiceData.totals.grandTotal.toFixed(2)}.\n\nThank you!`;
    const url = `mailto:${invoiceData.recipientEmail || ''}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(url);
    toast({
      title: "Email client opened",
      description: "Your default email client has been opened"
    });
  };

  const copyInvoiceDetails = async () => {
    try {
      const summaryText = `Invoice #${invoiceData.invoiceNumber}\nFrom: ${invoiceData.senderName}\nTo: ${invoiceData.recipientName}\nTotal Amount: ${symbol}${invoiceData.totals.grandTotal.toFixed(2)}`;
      await navigator.clipboard.writeText(summaryText);
      toast({
        title: "Copied to clipboard",
        description: "Invoice details copied to clipboard"
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Failed to copy to clipboard",
        variant: "destructive"
      });
    }
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Invoice ${invoiceData.invoiceNumber}`,
          text: `Invoice #${invoiceData.invoiceNumber} for ${symbol}${invoiceData.totals.grandTotal.toFixed(2)}`,
          url: window.location.href
        });
        toast({
          title: "Shared successfully",
          description: "Invoice details shared"
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      toast({
        title: "Share not supported",
        description: "Native sharing is not supported on this browser",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6 print:hidden">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white">Export & Share</h3>

      {/* Download Options */}
      <Card className="p-4 space-y-3">
        <h4 className="font-semibold text-sm flex items-center text-gray-700 dark:text-gray-200">
          <Download className="h-4 w-4 mr-2" />
          Download Options
        </h4>
        <Button
          onClick={handleExportToPDF}
          disabled={isExporting}
          className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white"
        >
          <FileText className="h-4 w-4 mr-2" />
          {isExporting ? 'Generating PDF...' : 'Download PDF'}
        </Button>
        <Button
          onClick={handleExportToPNG}
          disabled={isExporting}
          className="w-full justify-start"
          variant="outline"
        >
          <Image className="h-4 w-4 mr-2" />
          {isExporting ? 'Generating PNG...' : 'Download PNG'}
        </Button>
        <Button
          onClick={handleExportToJPG}
          disabled={isExporting}
          className="w-full justify-start"
          variant="outline"
        >
          <Image className="h-4 w-4 mr-2" />
          {isExporting ? 'Generating JPG...' : 'Download JPG'}
        </Button>
      </Card>

      {/* Print Option */}
      <Card className="p-4">
        <Button
          onClick={printInvoice}
          className="w-full justify-start"
          variant="outline"
        >
          <Printer className="h-4 w-4 mr-2" />
          Print Invoice
        </Button>
      </Card>

      {/* Share Options */}
      <Card className="p-4 space-y-3">
        <h4 className="font-semibold text-sm flex items-center text-gray-700 dark:text-gray-200">
          <Share2 className="h-4 w-4 mr-2" />
          Share Options
        </h4>
        <Button
          onClick={shareViaWhatsApp}
          className="w-full justify-start bg-green-600 hover:bg-green-700 text-white"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          WhatsApp
        </Button>
        <Button
          onClick={shareViaEmail}
          className="w-full justify-start"
          variant="outline"
        >
          <Mail className="h-4 w-4 mr-2" />
          Email
        </Button>
        {navigator.share && (
          <Button
            onClick={shareNative}
            className="w-full justify-start"
            variant="outline"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Native Share
          </Button>
        )}
      </Card>

      {/* Copy Details */}
      <Card className="p-4">
        <Button
          onClick={copyInvoiceDetails}
          className="w-full justify-start"
          variant="outline"
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy Invoice Details
        </Button>
      </Card>

      <Separator />

      {/* Invoice Summary */}
      <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
        <h4 className="font-semibold text-sm mb-2 text-blue-900 dark:text-blue-200">Summary</h4>
        <div className="text-xs space-y-1.5">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Invoice #:</span>
            <span className="font-semibold">{invoiceData.invoiceNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Total Amount:</span>
            <span className="font-bold text-blue-600 dark:text-blue-400">{symbol}{invoiceData.totals.grandTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Items:</span>
            <span>{invoiceData.items.length}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
