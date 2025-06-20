
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Plus, Minus, ArrowLeft, Upload } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface InvoiceFormProps {
  invoiceType: string;
  onGenerate: (data: any) => void;
  onBack: () => void;
}

interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  rate: number;
  tax: number;
  discount: number;
}

export const InvoiceForm: React.FC<InvoiceFormProps> = ({ invoiceType, onGenerate, onBack }) => {
  const [formData, setFormData] = useState({
    // Invoice details
    invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
    date: new Date().toISOString().split('T')[0],
    dueDate: '',
    
    // Sender details
    senderName: '',
    senderAddress: '',
    senderCity: '',
    senderEmail: '',
    senderPhone: '',
    senderGST: '',
    
    // Recipient details
    recipientName: '',
    recipientAddress: '',
    recipientCity: '',
    recipientEmail: '',
    recipientPhone: '',
    recipientGST: '',
    
    // Additional fields based on type
    patientId: '',
    roomNumber: '',
    checkIn: '',
    checkOut: '',
    
    // Settings
    logo: null as File | null,
    currency: 'INR',
    notes: ''
  });

  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', name: '', quantity: 1, rate: 0, tax: 0, discount: 0 }
  ]);

  const [totals, setTotals] = useState({
    subtotal: 0,
    totalTax: 0,
    totalDiscount: 0,
    grandTotal: 0
  });

  // Calculate totals whenever items change
  useEffect(() => {
    const subtotal = items.reduce((sum, item) => {
      return sum + (item.quantity * item.rate);
    }, 0);

    const totalTax = items.reduce((sum, item) => {
      const itemTotal = item.quantity * item.rate;
      return sum + (itemTotal * item.tax / 100);
    }, 0);

    const totalDiscount = items.reduce((sum, item) => {
      const itemTotal = item.quantity * item.rate;
      return sum + (itemTotal * item.discount / 100);
    }, 0);

    const grandTotal = subtotal + totalTax - totalDiscount;

    setTotals({ subtotal, totalTax, totalDiscount, grandTotal });
  }, [items]);

  const addItem = () => {
    setItems([...items, { 
      id: Date.now().toString(), 
      name: '', 
      quantity: 1, 
      rate: 0, 
      tax: 0, 
      discount: 0 
    }]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
      setFormData(prev => ({ ...prev, logo: file }));
      toast({
        title: "Logo uploaded",
        description: "Your logo has been uploaded successfully"
      });
    }
  };

  const handleGenerate = () => {
    // Validation
    if (!formData.senderName || !formData.recipientName) {
      toast({
        title: "Missing required fields",
        description: "Please fill in sender and recipient names",
        variant: "destructive"
      });
      return;
    }

    if (items.some(item => !item.name)) {
      toast({
        title: "Incomplete items",
        description: "Please fill in all item names",
        variant: "destructive"
      });
      return;
    }

    const invoiceData = {
      ...formData,
      items,
      totals,
      invoiceType,
      generatedAt: new Date().toISOString()
    };

    onGenerate(invoiceData);
    toast({
      title: "Invoice generated",
      description: "Your invoice has been generated successfully"
    });
  };

  const getTypeSpecificFields = () => {
    switch (invoiceType) {
      case 'medical':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="patientId">Patient ID</Label>
              <Input
                id="patientId"
                value={formData.patientId}
                onChange={(e) => handleInputChange('patientId', e.target.value)}
                placeholder="Enter patient ID"
              />
            </div>
          </div>
        );
      case 'hotel':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="roomNumber">Room Number</Label>
              <Input
                id="roomNumber"
                value={formData.roomNumber}
                onChange={(e) => handleInputChange('roomNumber', e.target.value)}
                placeholder="Room number"
              />
            </div>
            <div>
              <Label htmlFor="checkIn">Check-in Date</Label>
              <Input
                id="checkIn"
                type="date"
                value={formData.checkIn}
                onChange={(e) => handleInputChange('checkIn', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="checkOut">Check-out Date</Label>
              <Input
                id="checkOut"
                type="date"
                value={formData.checkOut}
                onChange={(e) => handleInputChange('checkOut', e.target.value)}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack} className="flex items-center space-x-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Types</span>
        </Button>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white capitalize">
          {invoiceType.replace(/([A-Z])/g, ' $1').trim()} Invoice
        </h2>
      </div>

      {/* Logo Upload */}
      <Card className="p-4">
        <Label htmlFor="logo" className="block text-sm font-medium mb-2">Company Logo</Label>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="relative overflow-hidden">
            <Upload className="h-4 w-4 mr-2" />
            Upload Logo
            <input
              id="logo"
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </Button>
          {formData.logo && (
            <span className="text-sm text-green-600">{formData.logo.name}</span>
          )}
        </div>
      </Card>

      {/* Invoice Details */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Invoice Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="invoiceNumber">Invoice Number</Label>
            <Input
              id="invoiceNumber"
              value={formData.invoiceNumber}
              onChange={(e) => handleInputChange('invoiceNumber', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleInputChange('dueDate', e.target.value)}
            />
          </div>
        </div>
        {getTypeSpecificFields()}
      </Card>

      {/* Sender Details */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">From (Sender)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="senderName">Name/Company *</Label>
            <Input
              id="senderName"
              value={formData.senderName}
              onChange={(e) => handleInputChange('senderName', e.target.value)}
              placeholder="Your name or company"
              required
            />
          </div>
          <div>
            <Label htmlFor="senderEmail">Email</Label>
            <Input
              id="senderEmail"
              type="email"
              value={formData.senderEmail}
              onChange={(e) => handleInputChange('senderEmail', e.target.value)}
              placeholder="your@email.com"
            />
          </div>
          <div>
            <Label htmlFor="senderPhone">Phone</Label>
            <Input
              id="senderPhone"
              value={formData.senderPhone}
              onChange={(e) => handleInputChange('senderPhone', e.target.value)}
              placeholder="+1 234 567 8900"
            />
          </div>
          {['gst', 'retail'].includes(invoiceType) && (
            <div>
              <Label htmlFor="senderGST">GST Number</Label>
              <Input
                id="senderGST"
                value={formData.senderGST}
                onChange={(e) => handleInputChange('senderGST', e.target.value)}
                placeholder="GST registration number"
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
            placeholder="Full address"
            rows={3}
          />
        </div>
      </Card>

      {/* Recipient Details */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">To (Recipient)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="recipientName">Name/Company *</Label>
            <Input
              id="recipientName"
              value={formData.recipientName}
              onChange={(e) => handleInputChange('recipientName', e.target.value)}
              placeholder="Client name or company"
              required
            />
          </div>
          <div>
            <Label htmlFor="recipientEmail">Email</Label>
            <Input
              id="recipientEmail"
              type="email"
              value={formData.recipientEmail}
              onChange={(e) => handleInputChange('recipientEmail', e.target.value)}
              placeholder="client@email.com"
            />
          </div>
          <div>
            <Label htmlFor="recipientPhone">Phone</Label>
            <Input
              id="recipientPhone"
              value={formData.recipientPhone}
              onChange={(e) => handleInputChange('recipientPhone', e.target.value)}
              placeholder="+1 234 567 8900"
            />
          </div>
          {['gst', 'retail'].includes(invoiceType) && (
            <div>
              <Label htmlFor="recipientGST">GST Number</Label>
              <Input
                id="recipientGST"
                value={formData.recipientGST}
                onChange={(e) => handleInputChange('recipientGST', e.target.value)}
                placeholder="Client GST number"
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
            placeholder="Client address"
            rows={3}
          />
        </div>
      </Card>

      {/* Items */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Items</h3>
          <Button onClick={addItem} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Item</span>
          </Button>
        </div>
        
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={item.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Item {index + 1}</span>
                {items.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <div className="md:col-span-2">
                  <Label>Item Name</Label>
                  <Input
                    value={item.name}
                    onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                    placeholder="Item description"
                  />
                </div>
                <div>
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <Label>Rate ({formData.currency})</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.rate}
                    onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <Label>Tax (%)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={item.tax}
                    onChange={(e) => updateItem(item.id, 'tax', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <Label>Discount (%)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={item.discount}
                    onChange={(e) => updateItem(item.id, 'discount', parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>
              
              <div className="text-right text-sm text-gray-600 dark:text-gray-400">
                Item Total: {formData.currency} {((item.quantity * item.rate) + (item.quantity * item.rate * item.tax / 100) - (item.quantity * item.rate * item.discount / 100)).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-6" />

        <div className="space-y-2 text-right">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>{formData.currency} {totals.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Tax:</span>
            <span>{formData.currency} {totals.totalTax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Discount:</span>
            <span>-{formData.currency} {totals.totalDiscount.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold text-lg">
            <span>Grand Total:</span>
            <span>{formData.currency} {totals.grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </Card>

      {/* Notes */}
      <Card className="p-6">
        <Label htmlFor="notes">Notes/Terms</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => handleInputChange('notes', e.target.value)}
          placeholder="Additional notes, terms and conditions..."
          rows={4}
        />
      </Card>

      {/* Generate Button */}
      <div className="flex justify-end">
        <Button onClick={handleGenerate} size="lg" className="px-8">
          Generate Invoice
        </Button>
      </div>
    </div>
  );
};
