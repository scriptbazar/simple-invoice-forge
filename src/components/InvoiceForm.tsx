import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Plus, Minus, ArrowLeft, Upload, Trash2, RotateCcw, Sparkles, QrCode, Palette, Wand2, History, FileSpreadsheet } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { InvoiceItem, InvoiceTotals, InvoiceData, CURRENCIES, COLOR_THEMES } from '@/types/invoice';
import { InvoiceProgress } from './InvoiceProgress';
import { calculateInvoiceTotals, calculateItemTotals } from '@/utils/invoiceCalculator';
import { saveInvoiceToHistory } from '@/utils/invoiceStorage';
import { SavedInvoicesModal } from './SavedInvoicesModal';
import { CsvImportModal } from './CsvImportModal';

interface InvoiceFormProps {
  invoiceType: string;
  onGenerate: (data: InvoiceData) => void;
  onBack: () => void;
}

export const InvoiceForm: React.FC<InvoiceFormProps> = ({ invoiceType, onGenerate, onBack }) => {
  const [formData, setFormData] = useState({
    invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
    date: new Date().toISOString().split('T')[0],
    dueDate: '',
    senderName: '',
    senderAddress: '',
    senderCity: '',
    senderEmail: '',
    senderPhone: '',
    senderGST: '',
    recipientName: '',
    recipientAddress: '',
    recipientCity: '',
    recipientEmail: '',
    recipientPhone: '',
    recipientGST: '',
    patientId: '',
    roomNumber: '',
    checkIn: '',
    checkOut: '',
    logo: null as string | null,
    currency: 'INR',
    currencySymbol: '₹',
    primaryColor: 'blue',
    paymentUpi: '',
    notes: ''
  });

  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', name: '', quantity: 1, rate: 0, tax: 0, discount: 0, discountType: 'percent' }
  ]);

  const [totals, setTotals] = useState<InvoiceTotals>({
    subtotal: 0,
    taxableAmount: 0,
    totalTax: 0,
    totalDiscount: 0,
    grandTotal: 0
  });

  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showCsvModal, setShowCsvModal] = useState(false);

  const senderValid = Boolean(formData.senderName.trim());
  const recipientValid = Boolean(formData.recipientName.trim());
  const itemsValid = items.length > 0 && items.every(item => item.name.trim().length > 0 && item.rate >= 0);

  let percentage = 0;
  if (senderValid) percentage += 35;
  if (recipientValid) percentage += 35;
  if (itemsValid) percentage += 30;

  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem(`invoice_draft_${invoiceType}`);
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        if (parsed.formData) setFormData(parsed.formData);
        if (parsed.items && Array.isArray(parsed.items) && parsed.items.length > 0) setItems(parsed.items);
      }
    } catch (e) {
      console.error('Failed to load draft from localStorage', e);
    }
  }, [invoiceType]);

  useEffect(() => {
    try {
      localStorage.setItem(`invoice_draft_${invoiceType}`, JSON.stringify({ formData, items }));
    } catch (e) {
      console.error('Failed to save draft to localStorage', e);
    }
  }, [formData, items, invoiceType]);

  // Recalculate totals using centralized DRY invoiceCalculator utility
  useEffect(() => {
    const computedTotals = calculateInvoiceTotals(items);
    setTotals(computedTotals);
  }, [items]);

  const addItem = () => {
    setItems([...items, { 
      id: Date.now().toString(), 
      name: '', 
      quantity: 1, 
      rate: 0, 
      tax: 0, 
      discount: 0,
      discountType: 'percent'
    }]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const toggleDiscountType = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, discountType: item.discountType === 'fixed' ? 'percent' : 'fixed' } : item
    ));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCurrencyChange = (currencyCode: string) => {
    const selected = CURRENCIES.find(c => c.code === currencyCode);
    if (selected) {
      setFormData(prev => ({
        ...prev,
        currency: selected.code,
        currencySymbol: selected.symbol
      }));
    }
  };

  const fillSampleData = () => {
    setFormData(prev => ({
      ...prev,
      senderName: 'Acme Digital Solutions Pvt Ltd',
      senderAddress: 'Suite 402, Innovation Tech Park, Sector 62',
      senderEmail: 'billing@acmedigital.com',
      senderPhone: '+91 98765 43210',
      senderGST: '27AAACA12341Z5',
      recipientName: 'Global Nexus Enterprises',
      recipientAddress: '12th Floor, Trade Tower, MG Road',
      recipientEmail: 'finance@globalnexus.com',
      recipientPhone: '+91 88776 55443',
      recipientGST: '27BBBCB56781Z9',
      paymentUpi: 'acme@upi',
      notes: 'Bank Details: HDFC Bank, A/C: 50200012345678, IFSC: HDFC0001234. Payment due within 15 days.'
    }));

    setItems([
      { id: '1', name: 'E-Commerce Web Application Development', quantity: 1, rate: 45000, tax: 18, discount: 5, discountType: 'percent' },
      { id: '2', name: 'UI/UX Mobile Design & Prototyping', quantity: 1, rate: 15000, tax: 18, discount: 0, discountType: 'percent' },
    ]);

    toast({
      title: "Sample data loaded!",
      description: "Demo data autofilled for quick testing."
    });
  };

  const handleSelectHistoricalInvoice = (historical: InvoiceData) => {
    setFormData({
      invoiceNumber: historical.invoiceNumber,
      date: historical.date,
      dueDate: historical.dueDate || '',
      senderName: historical.senderName,
      senderAddress: historical.senderAddress,
      senderCity: historical.senderCity || '',
      senderEmail: historical.senderEmail || '',
      senderPhone: historical.senderPhone || '',
      senderGST: historical.senderGST || '',
      recipientName: historical.recipientName,
      recipientAddress: historical.recipientAddress,
      recipientCity: historical.recipientCity || '',
      recipientEmail: historical.recipientEmail || '',
      recipientPhone: historical.recipientPhone || '',
      recipientGST: historical.recipientGST || '',
      patientId: historical.patientId || '',
      roomNumber: historical.roomNumber || '',
      checkIn: historical.checkIn || '',
      checkOut: historical.checkOut || '',
      logo: historical.logo,
      currency: historical.currency,
      currencySymbol: historical.currencySymbol,
      primaryColor: historical.primaryColor || 'blue',
      paymentUpi: historical.paymentUpi || '',
      notes: historical.notes || ''
    });

    if (historical.items && historical.items.length > 0) {
      setItems(historical.items);
    }

    toast({
      title: "Invoice loaded",
      description: `Loaded invoice #${historical.invoiceNumber} from history.`
    });
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a logo smaller than 2MB",
          variant: "destructive"
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target?.result as string;
        setFormData(prev => ({ ...prev, logo: base64String }));
        toast({
          title: "Logo uploaded",
          description: "Your logo has been uploaded successfully"
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setFormData(prev => ({ ...prev, logo: null }));
    toast({
      title: "Logo removed",
      description: "Company logo removed"
    });
  };

  const clearForm = () => {
    localStorage.removeItem(`invoice_draft_${invoiceType}`);
    setFormData({
      invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
      date: new Date().toISOString().split('T')[0],
      dueDate: '',
      senderName: '',
      senderAddress: '',
      senderCity: '',
      senderEmail: '',
      senderPhone: '',
      senderGST: '',
      recipientName: '',
      recipientAddress: '',
      recipientCity: '',
      recipientEmail: '',
      recipientPhone: '',
      recipientGST: '',
      patientId: '',
      roomNumber: '',
      checkIn: '',
      checkOut: '',
      logo: null,
      currency: 'INR',
      currencySymbol: '₹',
      primaryColor: 'blue',
      paymentUpi: '',
      notes: ''
    });
    setItems([{ id: '1', name: '', quantity: 1, rate: 0, tax: 0, discount: 0, discountType: 'percent' }]);
    toast({
      title: "Form reset",
      description: "Form data cleared"
    });
  };

  const handleGenerate = () => {
    if (!formData.senderName || !formData.recipientName) {
      toast({
        title: "Missing required fields",
        description: "Please fill in sender and recipient names",
        variant: "destructive"
      });
      return;
    }

    if (items.some(item => !item.name.trim())) {
      toast({
        title: "Incomplete items",
        description: "Please fill in all item names",
        variant: "destructive"
      });
      return;
    }

    const invoiceData: InvoiceData = {
      ...formData,
      items,
      totals,
      invoiceType,
      generatedAt: new Date().toISOString()
    };

    // Save to history automatically
    saveInvoiceToHistory(invoiceData);

    onGenerate(invoiceData);
    toast({
      title: "Invoice generated & saved!",
      description: "Saved to invoice history & generated preview."
    });
  };

  const getTypeSpecificFields = () => {
    switch (invoiceType) {
      case 'medical':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <Label htmlFor="patientId">Patient ID</Label>
              <Input
                id="patientId"
                value={formData.patientId}
                onChange={(e) => handleInputChange('patientId', e.target.value)}
                placeholder="Enter patient ID"
                className="rounded-xl"
              />
            </div>
          </div>
        );
      case 'hotel':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <Label htmlFor="roomNumber">Room Number</Label>
              <Input
                id="roomNumber"
                value={formData.roomNumber}
                onChange={(e) => handleInputChange('roomNumber', e.target.value)}
                placeholder="Room number"
                className="rounded-xl"
              />
            </div>
            <div>
              <Label htmlFor="checkIn">Check-in Date</Label>
              <Input
                id="checkIn"
                type="date"
                value={formData.checkIn}
                onChange={(e) => handleInputChange('checkIn', e.target.value)}
                className="rounded-xl"
              />
            </div>
            <div>
              <Label htmlFor="checkOut">Check-out Date</Label>
              <Input
                id="checkOut"
                type="date"
                value={formData.checkOut}
                onChange={(e) => handleInputChange('checkOut', e.target.value)}
                className="rounded-xl"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const taxPresets = [0, 5, 12, 18, 28];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-gray-200 dark:border-gray-800 pb-4">
        <Button variant="outline" onClick={onBack} className="flex items-center space-x-2 rounded-xl">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Types</span>
        </Button>
        
        <div className="text-center">
          <span className="text-xs uppercase tracking-widest text-blue-600 dark:text-blue-400 font-bold">Creating</span>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white capitalize">
            {invoiceType.replace(/([A-Z])/g, ' $1').trim()} Invoice
          </h2>
        </div>

        <div className="flex items-center space-x-2 flex-wrap gap-2">
          {/* History Drawer Button */}
          <Button
            onClick={() => setShowHistoryModal(true)}
            variant="outline"
            size="sm"
            className="rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 border-purple-200 dark:border-purple-800 hover:bg-purple-100"
          >
            <History className="h-4 w-4 mr-1 text-purple-500" />
            History
          </Button>

          {/* Autofill Button */}
          <Button
            onClick={fillSampleData}
            variant="outline"
            size="sm"
            className="rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-300 border-blue-200 dark:border-blue-800 hover:bg-blue-100"
          >
            <Wand2 className="h-4 w-4 mr-1 text-blue-500" />
            Sample Data
          </Button>

          <Button variant="ghost" size="sm" onClick={clearForm} className="text-gray-500 hover:text-red-600 rounded-xl">
            <RotateCcw className="h-4 w-4 mr-1" />
            Reset
          </Button>
        </div>
      </div>

      {/* Live Form Readiness Progress Bar */}
      <InvoiceProgress
        percentage={percentage}
        senderValid={senderValid}
        recipientValid={recipientValid}
        itemsValid={itemsValid}
      />

      {/* Theme Color Palette & Logo Upload Card */}
      <Card className="p-5 glass-card rounded-2xl space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <Label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2 flex items-center">
              <Palette className="h-3.5 w-3.5 mr-1 text-blue-500" />
              Invoice PDF Theme Color
            </Label>
            <div className="flex space-x-2">
              {COLOR_THEMES.map(theme => (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => handleInputChange('primaryColor', theme.id)}
                  title={theme.name}
                  className={`h-7 w-7 rounded-full ${theme.bgClass} transition-all transform ${
                    formData.primaryColor === theme.id 
                      ? 'ring-4 ring-blue-500/30 scale-110 shadow-md' 
                      : 'opacity-70 hover:opacity-100 hover:scale-105'
                  }`}
                />
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="logo" className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2">Company Logo</Label>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="relative overflow-hidden rounded-xl border-dashed border-2">
                <Upload className="h-4 w-4 mr-2 text-blue-500" />
                {formData.logo ? 'Change Logo' : 'Upload Logo'}
                <input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </Button>
              {formData.logo && (
                <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-800 p-1.5 rounded-xl border">
                  <img src={formData.logo} alt="Logo" className="h-8 w-auto max-w-[80px] object-contain rounded" />
                  <Button variant="ghost" size="sm" onClick={removeLogo} className="text-red-500 p-1">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Invoice Details Card */}
      <Card className="p-6 glass-card rounded-2xl">
        <h3 className="text-base font-bold mb-4 text-gray-900 dark:text-white flex items-center">
          <Sparkles className="h-4 w-4 mr-2 text-blue-500" />
          Invoice Info & Currency
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="invoiceNumber">Invoice Number</Label>
            <Input
              id="invoiceNumber"
              value={formData.invoiceNumber}
              onChange={(e) => handleInputChange('invoiceNumber', e.target.value)}
              className="rounded-xl"
            />
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className="rounded-xl"
            />
          </div>
          <div>
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleInputChange('dueDate', e.target.value)}
              className="rounded-xl"
            />
          </div>
          <div>
            <Label htmlFor="currency">Currency</Label>
            <select
              id="currency"
              value={formData.currency}
              onChange={(e) => handleCurrencyChange(e.target.value)}
              className="w-full h-10 px-3 py-2 text-sm bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {CURRENCIES.map(curr => (
                <option key={curr.code} value={curr.code}>
                  {curr.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {getTypeSpecificFields()}
      </Card>

      {/* Sender Details Card */}
      <Card className="p-6 glass-card rounded-2xl">
        <h3 className="text-base font-bold mb-4 text-gray-900 dark:text-white">From (Your Details / Biller)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="senderName">Name / Business Name *</Label>
            <Input
              id="senderName"
              value={formData.senderName}
              onChange={(e) => handleInputChange('senderName', e.target.value)}
              placeholder="e.g. Acme Corporation"
              required
              className="rounded-xl"
            />
          </div>
          <div>
            <Label htmlFor="senderEmail">Email</Label>
            <Input
              id="senderEmail"
              type="email"
              value={formData.senderEmail}
              onChange={(e) => handleInputChange('senderEmail', e.target.value)}
              placeholder="billing@company.com"
              className="rounded-xl"
            />
          </div>
          <div>
            <Label htmlFor="senderPhone">Phone</Label>
            <Input
              id="senderPhone"
              value={formData.senderPhone}
              onChange={(e) => handleInputChange('senderPhone', e.target.value)}
              placeholder="+91 98765 43210"
              className="rounded-xl"
            />
          </div>
          {['gst', 'retail'].includes(invoiceType) && (
            <div>
              <Label htmlFor="senderGST">GSTIN Number</Label>
              <Input
                id="senderGST"
                value={formData.senderGST}
                onChange={(e) => handleInputChange('senderGST', e.target.value)}
                placeholder="27AAAAA0000A1Z5"
                className="rounded-xl"
              />
            </div>
          )}
        </div>
        <div className="mt-4">
          <Label htmlFor="senderAddress">Address</Label>
          <Textarea
            id="senderAddress"
            value={formData.senderAddress}
            onChange={(e) => handleInputChange('senderAddress', e.target.value)}
            placeholder="Street address, City, Pincode"
            rows={2}
            className="rounded-xl"
          />
        </div>
      </Card>

      {/* Recipient Details Card */}
      <Card className="p-6 glass-card rounded-2xl">
        <h3 className="text-base font-bold mb-4 text-gray-900 dark:text-white">To (Client / Billed To)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="recipientName">Client Name / Company *</Label>
            <Input
              id="recipientName"
              value={formData.recipientName}
              onChange={(e) => handleInputChange('recipientName', e.target.value)}
              placeholder="e.g. John Doe / TechCorp"
              required
              className="rounded-xl"
            />
          </div>
          <div>
            <Label htmlFor="recipientEmail">Client Email</Label>
            <Input
              id="recipientEmail"
              type="email"
              value={formData.recipientEmail}
              onChange={(e) => handleInputChange('recipientEmail', e.target.value)}
              placeholder="client@email.com"
              className="rounded-xl"
            />
          </div>
          <div>
            <Label htmlFor="recipientPhone">Phone</Label>
            <Input
              id="recipientPhone"
              value={formData.recipientPhone}
              onChange={(e) => handleInputChange('recipientPhone', e.target.value)}
              placeholder="+1 234 567 8900"
              className="rounded-xl"
            />
          </div>
          {['gst', 'retail'].includes(invoiceType) && (
            <div>
              <Label htmlFor="recipientGST">Client GSTIN</Label>
              <Input
                id="recipientGST"
                value={formData.recipientGST}
                onChange={(e) => handleInputChange('recipientGST', e.target.value)}
                placeholder="Client GSTIN number"
                className="rounded-xl"
              />
            </div>
          )}
        </div>
        <div className="mt-4">
          <Label htmlFor="recipientAddress">Address</Label>
          <Textarea
            id="recipientAddress"
            value={formData.recipientAddress}
            onChange={(e) => handleInputChange('recipientAddress', e.target.value)}
            placeholder="Client billing address"
            rows={2}
            className="rounded-xl"
          />
        </div>
      </Card>

      {/* Line Items Card */}
      <Card className="p-6 glass-card rounded-2xl">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
          <h3 className="text-base font-bold text-gray-900 dark:text-white">Line Items</h3>
          
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => setShowCsvModal(true)}
              variant="outline"
              size="sm"
              className="rounded-xl border-emerald-500/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-bold"
            >
              <FileSpreadsheet className="h-4 w-4 mr-1 text-emerald-500" />
              CSV Import
            </Button>
            
            <Button onClick={addItem} className="flex items-center space-x-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4" />
              <span>Add Item</span>
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          <AnimatePresence initial={false}>
            {items.map((item, index) => {
              const calc = calculateItemTotals(item);

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 space-y-3 bg-gray-50/50 dark:bg-gray-900/40 overflow-hidden"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      Item #{index + 1}
                    </span>
                    {items.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Minus className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
                    <div className="md:col-span-2">
                      <Label className="text-xs">Item Description</Label>
                      <Input
                        value={item.name}
                        onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                        placeholder="Service or Product name"
                        className="rounded-lg"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Quantity</Label>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                        className="rounded-lg"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Rate ({formData.currencySymbol})</Label>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.rate}
                        onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                        className="rounded-lg"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <Label className="text-xs">Discount</Label>
                        <button
                          type="button"
                          onClick={() => toggleDiscountType(item.id)}
                          className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          {item.discountType === 'fixed' ? formData.currencySymbol : '%'}
                        </button>
                      </div>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.discount}
                        onChange={(e) => updateItem(item.id, 'discount', parseFloat(e.target.value) || 0)}
                        placeholder={item.discountType === 'fixed' ? `Amount (${formData.currencySymbol})` : 'Percent (%)'}
                        className="rounded-lg"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <Label className="text-xs">Tax (%)</Label>
                      </div>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        value={item.tax}
                        onChange={(e) => updateItem(item.id, 'tax', parseFloat(e.target.value) || 0)}
                        className="rounded-lg"
                      />
                      <div className="flex space-x-1 mt-1">
                        {taxPresets.map(preset => (
                          <button
                            key={preset}
                            type="button"
                            onClick={() => updateItem(item.id, 'tax', preset)}
                            className={`text-[10px] px-1.5 py-0.5 rounded border transition-colors ${
                              item.tax === preset 
                                ? 'bg-blue-600 text-white border-blue-600 font-bold' 
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                            }`}
                          >
                            {preset}%
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right text-xs font-semibold text-gray-700 dark:text-gray-300 pt-1">
                    Item Total: <span className="text-blue-600 dark:text-blue-400 font-bold">{formData.currencySymbol}{calc.itemTotalAmount.toFixed(2)}</span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <Separator className="my-6" />

        <div className="space-y-2 text-right max-w-xs ml-auto text-sm">
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Subtotal:</span>
            <span>{formData.currencySymbol}{totals.subtotal.toFixed(2)}</span>
          </div>
          {totals.totalDiscount > 0 && (
            <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
              <span>Total Discount:</span>
              <span>-{formData.currencySymbol}{totals.totalDiscount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Taxable Amount:</span>
            <span>{formData.currencySymbol}{totals.taxableAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Total Tax:</span>
            <span>+{formData.currencySymbol}{totals.totalTax.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-extrabold text-lg text-gray-900 dark:text-white pt-1">
            <span>Grand Total:</span>
            <span className="text-blue-600 dark:text-blue-400">{formData.currencySymbol}{totals.grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </Card>

      {/* Payment UPI & Payment QR Code Input Card */}
      <Card className="p-6 glass-card rounded-2xl">
        <h3 className="text-base font-bold mb-4 text-gray-900 dark:text-white flex items-center">
          <QrCode className="h-4 w-4 mr-2 text-blue-500" />
          Live Payment QR Code (Optional)
        </h3>
        <div>
          <Label htmlFor="paymentUpi">UPI ID / GPay / PhonePe / PayPal Username</Label>
          <Input
            id="paymentUpi"
            value={formData.paymentUpi}
            onChange={(e) => handleInputChange('paymentUpi', e.target.value)}
            placeholder="e.g. yourname@upi or paypal.me/yourname"
            className="rounded-xl"
          />
          <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
            If entered, a scannable Payment QR Code will be printed directly onto your PDF invoice.
          </p>
        </div>
      </Card>

      {/* Notes Card */}
      <Card className="p-6 glass-card rounded-2xl">
        <Label htmlFor="notes" className="font-semibold text-sm mb-2 block">Notes & Payment Terms</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => handleInputChange('notes', e.target.value)}
          placeholder="e.g. Bank details: A/C 1234567890, IFSC: ABCD0001234. Payment due within 15 days."
          rows={3}
          className="rounded-xl"
        />
      </Card>

      {/* Generate Button */}
      <div className="flex justify-end">
        <Button onClick={handleGenerate} size="lg" className="px-10 py-6 text-base font-bold rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl shadow-blue-500/20 hover:scale-105 transition-all">
          <Sparkles className="h-5 w-5 mr-2" />
          Generate & Save Invoice
        </Button>
      </div>

      {/* Modals */}
      <SavedInvoicesModal
        isOpen={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
        onSelectInvoice={handleSelectHistoricalInvoice}
      />

      <CsvImportModal
        isOpen={showCsvModal}
        onClose={() => setShowCsvModal(false)}
        onImportItems={(imported) => setItems(prev => [...prev, ...imported])}
      />
    </motion.div>
  );
};
