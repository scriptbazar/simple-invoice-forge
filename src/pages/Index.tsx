
import React, { useState } from 'react';
import { InvoiceTypeSelector } from '../components/InvoiceTypeSelector';
import { InvoiceForm } from '../components/InvoiceForm';
import { InvoicePreview } from '../components/InvoicePreview';
import { ExportOptions } from '../components/ExportOptions';
import { FeedbackModal } from '../components/FeedbackModal';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { AdSense, GenericAd } from '../components/AdSense';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, Zap, Shield, Globe, CheckCircle, 
  Download, Share2, Edit, Clock 
} from 'lucide-react';
import { Link } from 'react-router-dom';

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

  const features = [
    {
      icon: FileText,
      title: "Multiple Invoice Types",
      description: "Retail, GST, Freelance, Medical bills and more"
    },
    {
      icon: Zap,
      title: "Real-time Calculations",
      description: "Automatic tax, discount, and total calculations"
    },
    {
      icon: Download,
      title: "Multi-format Export",
      description: "Export to PDF, PNG, JPG with one click"
    },
    {
      icon: Share2,
      title: "Easy Sharing",
      description: "Share via WhatsApp, Email, SMS instantly"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is processed locally and securely"
    },
    {
      icon: Globe,
      title: "Multi-language",
      description: "Available in English, Hindi and more"
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}`}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Header Ad */}
      <div className="container mx-auto px-4 py-2">
        <AdSense 
          adSlot="header" 
          adFormat="horizontal" 
          className="mb-4"
          style={{ textAlign: 'center' }}
        />
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {!selectedInvoiceType ? (
          <>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4 animate-fade-in">
                Smart Invoice Generator
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Create professional invoices in minutes
              </p>
              <InvoiceTypeSelector onTypeSelect={handleInvoiceTypeSelect} />
            </div>

            {/* Features Section - 2 per row on mobile/tablet */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
                Why Choose Smart Invoice?
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
                {features.map((feature, index) => (
                  <Card key={index} className="p-4 lg:p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <feature.icon className="h-8 lg:h-12 w-8 lg:w-12 text-blue-500 mx-auto mb-4" />
                    <h3 className="text-sm lg:text-lg font-semibold text-gray-800 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-xs lg:text-sm">
                      {feature.description}
                    </p>
                  </Card>
                ))}
              </div>
              
              <div className="text-center">
                <Link to="/features">
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    View All Features
                  </Button>
                </Link>
              </div>
            </div>

            {/* Middle Ad */}
            <div className="mb-8">
              <GenericAd 
                network="media.net" 
                width={728} 
                height={90}
                className="mx-auto"
                style={{ maxWidth: '100%' }}
              />
            </div>

            {/* Benefits Section */}
            <Card className="p-8 mb-8 bg-gradient-to-r from-green-500 to-blue-500 text-white">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Start Creating Professional Invoices Today</h2>
                <p className="text-lg opacity-90 mb-6">
                  Join thousands of businesses who trust Smart Invoice Generator for their billing needs
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">50,000+</div>
                    <div className="opacity-90">Invoices Created</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">99.9%</div>
                    <div className="opacity-90">Uptime</div>
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <div className="text-2xl font-bold">24/7</div>
                    <div className="opacity-90">Support</div>
                  </div>
                </div>
              </div>
            </Card>
          </>
        ) : !showPreview ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 p-6 animate-fade-in">
              <InvoiceForm
                invoiceType={selectedInvoiceType}
                onGenerate={handleInvoiceGenerate}
                onBack={() => setSelectedInvoiceType('')}
              />
            </Card>
            <div className="space-y-4">
              <Card className="p-6 hidden lg:block">
                <div className="text-center text-gray-500 dark:text-gray-400 py-20">
                  <p>Invoice preview will appear here</p>
                </div>
              </Card>
              {/* Sidebar Ad */}
              <AdSense 
                adSlot="sidebar" 
                adFormat="rectangle"
                style={{ width: '100%', minHeight: '250px' }}
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <Card className="lg:col-span-3 p-6 animate-fade-in">
              <InvoicePreview
                invoiceData={invoiceData}
                invoiceType={selectedInvoiceType}
                onEdit={() => setShowPreview(false)}
              />
            </Card>
            <div className="space-y-4">
              <Card className="p-6">
                <ExportOptions
                  invoiceData={invoiceData}
                  onExportComplete={handleExportComplete}
                />
              </Card>
              {/* Sidebar Ad */}
              <AdSense 
                adSlot="sidebar" 
                adFormat="rectangle"
                style={{ width: '100%', minHeight: '250px' }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer Ad */}
      <div className="container mx-auto px-4 py-2">
        <AdSense 
          adSlot="footer" 
          adFormat="horizontal" 
          className="mb-4"
          style={{ textAlign: 'center' }}
        />
      </div>

      {showFeedback && (
        <FeedbackModal
          onClose={() => setShowFeedback(false)}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default Index;
