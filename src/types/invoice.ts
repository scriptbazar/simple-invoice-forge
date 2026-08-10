export interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  rate: number;
  tax: number;
  discount: number;
  discountType?: 'percent' | 'fixed';
}

export interface InvoiceTotals {
  subtotal: number;
  taxableAmount: number;
  totalTax: number;
  totalDiscount: number;
  grandTotal: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  
  senderName: string;
  senderAddress: string;
  senderCity?: string;
  senderEmail?: string;
  senderPhone?: string;
  senderGST?: string;
  
  recipientName: string;
  recipientAddress: string;
  recipientCity?: string;
  recipientEmail?: string;
  recipientPhone?: string;
  recipientGST?: string;
  
  patientId?: string;
  roomNumber?: string;
  checkIn?: string;
  checkOut?: string;
  
  logo: string | null;
  currency: string;
  currencySymbol: string;
  primaryColor?: string;
  paymentUpi?: string;
  notes?: string;
  
  items: InvoiceItem[];
  totals: InvoiceTotals;
  invoiceType: string;
  generatedAt: string;
}

export interface CurrencyOption {
  code: string;
  symbol: string;
  name: string;
}

export const CURRENCIES: CurrencyOption[] = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee (₹)' },
  { code: 'USD', symbol: '$', name: 'US Dollar ($)' },
  { code: 'EUR', symbol: '€', name: 'Euro (€)' },
  { code: 'GBP', symbol: '£', name: 'British Pound (£)' },
  { code: 'AED', symbol: 'AED ', name: 'UAE Dirham (AED)' },
  { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar (CA$)' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar (A$)' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar (S$)' },
];

export interface ColorTheme {
  id: string;
  name: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
  badgeClass: string;
}

export const COLOR_THEMES: ColorTheme[] = [
  { id: 'blue', name: 'Classic Blue', bgClass: 'bg-blue-600', textClass: 'text-blue-600', borderClass: 'border-blue-600', badgeClass: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'emerald', name: 'Emerald Green', bgClass: 'bg-emerald-600', textClass: 'text-emerald-600', borderClass: 'border-emerald-600', badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { id: 'purple', name: 'Royal Purple', bgClass: 'bg-purple-600', textClass: 'text-purple-600', borderClass: 'border-purple-600', badgeClass: 'bg-purple-50 text-purple-700 border-purple-200' },
  { id: 'rose', name: 'Crimson Red', bgClass: 'bg-rose-600', textClass: 'text-rose-600', borderClass: 'border-rose-600', badgeClass: 'bg-rose-50 text-rose-700 border-rose-200' },
  { id: 'slate', name: 'Slate Dark', bgClass: 'bg-slate-800', textClass: 'text-slate-800', borderClass: 'border-slate-800', badgeClass: 'bg-slate-100 text-slate-800 border-slate-300' },
];
