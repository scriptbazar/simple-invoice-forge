import { InvoiceItem, InvoiceTotals } from '@/types/invoice';

export interface CalculatedItemTotals {
  itemSubtotal: number;
  itemDiscountAmount: number;
  itemTaxableAmount: number;
  itemTaxAmount: number;
  itemTotalAmount: number;
}

export const calculateItemTotals = (item: InvoiceItem): CalculatedItemTotals => {
  const qty = item.quantity || 0;
  const rate = item.rate || 0;
  const itemSubtotal = qty * rate;

  let itemDiscountAmount = 0;
  if (item.discountType === 'fixed') {
    itemDiscountAmount = Math.min(itemSubtotal, item.discount || 0);
  } else {
    itemDiscountAmount = itemSubtotal * ((item.discount || 0) / 100);
  }

  const itemTaxableAmount = Math.max(0, itemSubtotal - itemDiscountAmount);
  const itemTaxAmount = itemTaxableAmount * ((item.tax || 0) / 100);
  const itemTotalAmount = itemTaxableAmount + itemTaxAmount;

  return {
    itemSubtotal,
    itemDiscountAmount,
    itemTaxableAmount,
    itemTaxAmount,
    itemTotalAmount,
  };
};

export const calculateInvoiceTotals = (items: InvoiceItem[]): InvoiceTotals => {
  let subtotal = 0;
  let totalDiscount = 0;
  let taxableAmount = 0;
  let totalTax = 0;

  items.forEach(item => {
    const calc = calculateItemTotals(item);
    subtotal += calc.itemSubtotal;
    totalDiscount += calc.itemDiscountAmount;
    taxableAmount += calc.itemTaxableAmount;
    totalTax += calc.itemTaxAmount;
  });

  const grandTotal = taxableAmount + totalTax;

  return {
    subtotal,
    taxableAmount,
    totalTax,
    totalDiscount,
    grandTotal,
  };
};
