
import React, { useState } from 'react';
import { InvoiceTypeSelector } from '../components/InvoiceTypeSelector';
import { InvoiceForm } from '../components/InvoiceForm';
import { InvoicePreview } from '../components/InvoicePreview';
import { ExportOptions } from '../components/ExportOptions';
import { FeedbackModal } from '../components/FeedbackModal';
import { Header } from '../components/Header';
import { Card } from '@/components/ui/card';

const Index = () => {
  const [selectedInvoiceType, setSelectedInvoiceType] = useState('');
  const [invoiceData, setInvoiceData] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleInvoiceTypeSelect = (type: string) => {
    setSelectedInvoiceType(type);
    setShowPreview(false);
  };

  const handleInvoiceGenerate = (data: any) => {
    setInvoiceData(data);
    setShowPreview(true);
  };

  const handleExportComplete = () => {
    setShowFeedback(true);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}`}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="container mx-auto px-4 py-8">
        {!selectedInvoiceType ? (
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4 animate-fade-in">
              Smart Invoice Generator
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Create professional invoices in minutes
            </p>
            <InvoiceTypeSelector onTypeSelect={handleInvoiceTypeSelect} />
          </div>
        ) : !showPreview ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-6 animate-fade-in">
              <InvoiceForm
                invoiceType={selectedInvoiceType}
                onGenerate={handleInvoiceGenerate}
                onBack={() => setSelectedInvoiceType('')}
              />
            </Card>
            <Card className="p-6 hidden lg:block">
              <div className="text-center text-gray-500 dark:text-gray-400 py-20">
                <p>Invoice preview will appear here</p>
              </div>
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 p-6 animate-fade-in">
              <InvoicePreview
                invoiceData={invoiceData}
                invoiceType={selectedInvoiceType}
                onEdit={() => setShowPreview(false)}
              />
            </Card>
            <Card className="p-6">
              <ExportOptions
                invoiceData={invoiceData}
                onExportComplete={handleExportComplete}
              />
            </Card>
          </div>
        )}
      </div>

      {showFeedback && (
        <FeedbackModal
          onClose={() => setShowFeedback(false)}
        />
      )}
    </div>
  );
};

export default Index;
