
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
  Cloud,
  MessageCircle,
  Mail
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { exportToPDF, exportToPNG, exportToJPG } from '../utils/exportUtils';

interface ExportOptionsProps {
  invoiceData: any;
  onExportComplete: () => void;
}

export const ExportOptions: React.FC<ExportOptionsProps> = ({ invoiceData, onExportComplete }) => {
  const [isExporting, setIsExporting] = useState(false);

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
        description: "Failed to generate PDF",
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
    const text = `Invoice ${invoiceData.invoiceNumber} - Total: ${invoiceData.currency} ${invoiceData.totals.grandTotal.toFixed(2)}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    toast({
      title: "WhatsApp opened",
      description: "Share your invoice via WhatsApp"
    });
  };

  const shareViaEmail = () => {
    const subject = `Invoice ${invoiceData.invoiceNumber}`;
    const body = `Please find attached invoice ${invoiceData.invoiceNumber} for ${invoiceData.currency} ${invoiceData.totals.grandTotal.toFixed(2)}.`;
    const url = `mailto:${invoiceData.recipientEmail || ''}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(url);
    toast({
      title: "Email client opened",
      description: "Your default email client has been opened"
    });
  };

  const copyInvoiceLink = async () => {
    try {
      const link = `${window.location.origin}/invoice/${invoiceData.invoiceNumber}`;
      await navigator.clipboard.writeText(link);
      toast({
        title: "Link copied",
        description: "Invoice link has been copied to clipboard"
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Failed to copy link to clipboard",
        variant: "destructive"
      });
    }
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Invoice ${invoiceData.invoiceNumber}`,
          text: `Invoice for ${invoiceData.currency} ${invoiceData.totals.grandTotal.toFixed(2)}`,
          url: window.location.href
        });
        toast({
          title: "Shared successfully",
          description: "Invoice has been shared"
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      toast({
        title: "Share not supported",
        description: "Native sharing is not supported on this device",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white">Export & Share</h3>

      {/* Download Options */}
      <Card className="p-4">
        <h4 className="font-semibold mb-4 flex items-center">
          <Download className="h-5 w-5 mr-2" />
          Download Options
        </h4>
        <div className="space-y-3">
          <Button
            onClick={handleExportToPDF}
            disabled={isExporting}
            className="w-full justify-start"
            variant="outline"
          >
            <FileText className="h-4 w-4 mr-2" />
            {isExporting ? 'Generating PDF...' : 'Download as PDF'}
          </Button>
          <Button
            onClick={handleExportToPNG}
            disabled={isExporting}
            className="w-full justify-start"
            variant="outline"
          >
            <Image className="h-4 w-4 mr-2" />
            {isExporting ? 'Generating PNG...' : 'Download as PNG'}
          </Button>
          <Button
            onClick={handleExportToJPG}
            disabled={isExporting}
            className="w-full justify-start"
            variant="outline"
          >
            <Image className="h-4 w-4 mr-2" />
            {isExporting ? 'Generating JPG...' : 'Download as JPG'}
          </Button>
        </div>
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
      <Card className="p-4">
        <h4 className="font-semibold mb-4 flex items-center">
          <Share2 className="h-5 w-5 mr-2" />
          Share Options
        </h4>
        <div className="space-y-3">
          <Button
            onClick={shareViaWhatsApp}
            className="w-full justify-start bg-green-600 hover:bg-green-700"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Share via WhatsApp
          </Button>
          <Button
            onClick={shareViaEmail}
            className="w-full justify-start"
            variant="outline"
          >
            <Mail className="h-4 w-4 mr-2" />
            Share via Email
          </Button>
          <Button
            onClick={shareNative}
            className="w-full justify-start"
            variant="outline"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Native Share
          </Button>
        </div>
      </Card>

      {/* Copy Link */}
      <Card className="p-4">
        <Button
          onClick={copyInvoiceLink}
          className="w-full justify-start"
          variant="outline"
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy Invoice Link
        </Button>
      </Card>

      {/* Cloud Upload (Future Feature) */}
      <Card className="p-4 opacity-60">
        <h4 className="font-semibold mb-4 flex items-center">
          <Cloud className="h-5 w-5 mr-2" />
          Cloud Upload (Coming Soon)
        </h4>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <p>• Google Drive</p>
          <p>• Dropbox</p>
          <p>• OneDrive</p>
        </div>
      </Card>

      <Separator />

      {/* Invoice Summary */}
      <Card className="p-4 bg-blue-50 dark:bg-blue-900/20">
        <h4 className="font-semibold mb-2">Invoice Summary</h4>
        <div className="text-sm space-y-1">
          <div className="flex justify-between">
            <span>Invoice #:</span>
            <span>{invoiceData.invoiceNumber}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Amount:</span>
            <span className="font-bold">{invoiceData.currency} {invoiceData.totals.grandTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Items:</span>
            <span>{invoiceData.items.length}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
