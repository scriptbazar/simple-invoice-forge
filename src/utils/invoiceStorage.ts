import { InvoiceData } from '@/types/invoice';

const STORAGE_KEY = 'saved_invoices_history';

export const saveInvoiceToHistory = (invoice: InvoiceData): void => {
  try {
    const existing = getInvoiceHistory();
    const updated = [invoice, ...existing.filter(i => i.invoiceNumber !== invoice.invoiceNumber)].slice(0, 50);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save invoice to history', e);
  }
};

export const getInvoiceHistory = (): InvoiceData[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to parse invoice history', e);
    return [];
  }
};

export const deleteInvoiceFromHistory = (invoiceNumber: string): InvoiceData[] => {
  try {
    const existing = getInvoiceHistory();
    const updated = existing.filter(i => i.invoiceNumber !== invoiceNumber);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to delete invoice from history', e);
    return [];
  }
};

export const clearAllInvoiceHistory = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear invoice history', e);
  }
};
