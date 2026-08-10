import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  FileText, Zap, Shield, Globe, 
  Download, Share2, Sparkles, ArrowRight, QrCode, Palette, CheckCircle2, Lock, Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { InvoiceData } from '@/types/invoice';
import { HeroDemoCard } from '../components/HeroDemoCard';
import { StickySummaryBar } from '../components/StickySummaryBar';

const Index = () => {
  const [selectedInvoiceType, setSelectedInvoiceType] = useState('');
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleInvoiceTypeSelect = (type: string) => {
    setSelectedInvoiceType(type);
    setShowPreview(false);
  };

  const handleInvoiceGenerate = (data: InvoiceData) => {
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
      description: "Retail, GST, Freelance, Medical, Hotel bills & Custom formats"
    },
    {
      icon: Zap,
      title: "Real-time Calculations",
      description: "Automatic Taxable Amount, Tax, Discount & Grand Total"
    },
    {
      icon: Download,
      title: "Multi-format Export",
      description: "Instant high-res download in PDF, PNG & JPG formats"
    },
    {
      icon: Share2,
      title: "Direct Sharing",
      description: "Send via WhatsApp, Email & Clipboard in one tap"
    },
    {
      icon: QrCode,
      title: "Scannable Payment QR",
      description: "Print instant scannable UPI & PayPal QR codes directly on invoices"
    },
    {
      icon: Palette,
      title: "Custom Accent Themes",
      description: "Personalize your invoice colors with 5 premium PDF themes"
    },
    {
      icon: Shield,
      title: "100% Secure & Private",
      description: "Your data stays in your browser - zero server logging"
    },
    {
      icon: Globe,
      title: "Multi-currency Support",
      description: "Support for INR (₹), USD ($), EUR (€), GBP (£), AED, etc."
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 relative overflow-hidden ${isDarkMode ? 'dark bg-gray-950 text-white' : 'bg-gradient-to-br from-blue-50/80 via-indigo-50/50 to-purple-50/80 text-gray-900'}`}>
      
      {/* Background Decorative Glow Orbs */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/15 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute top-80 right-1/4 w-96 h-96 bg-purple-500/15 dark:bg-purple-600/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }} />

      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="container mx-auto px-4 py-2 md:py-6 relative z-10">
        <AnimatePresence mode="wait">
          {!selectedInvoiceType ? (
            <motion.div
              key="hero"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              {/* Hero Section */}
              <div className="text-center max-w-4xl mx-auto mb-8 md:mb-14 pt-2 md:pt-4">
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs font-bold mb-6"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>100% Free & Privacy-Focused Invoice Generator</span>
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight"
                >
                  Create Professional Invoices <br className="hidden sm:inline" />
                  <span className="shimmer-text">In Under 60 Seconds</span>
                </motion.h1>

                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
                  Generate GST-compliant tax invoices, retail receipts, and freelance bills with automatic calculations and instant PDF export.
                </p>

                {/* Animated Trust Pills */}
                <div className="flex items-center justify-center space-x-6 text-xs font-bold text-gray-600 dark:text-gray-400 mb-10 flex-wrap gap-y-2">
                  <span className="flex items-center text-blue-600 dark:text-blue-400">
                    <Zap className="h-4 w-4 mr-1 text-amber-500" /> Instant PDF Export
                  </span>
                  <span className="flex items-center text-emerald-600 dark:text-emerald-400">
                    <Lock className="h-4 w-4 mr-1" /> 100% Client-Side Private
                  </span>
                  <span className="flex items-center text-purple-600 dark:text-purple-400">
                    <Globe className="h-4 w-4 mr-1" /> 8+ Currencies Supported
                  </span>
                </div>

                {/* Hero Interactive Demo Widget */}
                <HeroDemoCard onStartClick={handleInvoiceTypeSelect} />

                {/* Type Selector */}
                <div className="text-left mb-6 pt-6 border-t border-gray-200/60 dark:border-gray-800">
                  <div className="text-center mb-10">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white leading-normal tracking-tight">
                      Select an Invoice Format to Get Started
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Choose from specialized layouts tailored for your business
                    </p>
                  </div>
                  <InvoiceTypeSelector onTypeSelect={handleInvoiceTypeSelect} />
                </div>
              </div>

              {/* Features Section */}
              <div className="mb-20">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
                    Why Thousands Trust Smart Invoice
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Engineered with speed, accuracy, and ease of use at its core
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -6, scale: 1.03 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <Card className="p-6 glass-card rounded-2xl h-full shadow-lg group border border-gray-200/80 dark:border-gray-800 hover:border-blue-500/50 hover:shadow-blue-500/10 transition-all">
                        <div className="p-3.5 rounded-2xl bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 w-fit mb-4 group-hover:scale-110 transition-transform">
                          <feature.icon className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                          {feature.description}
                        </p>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                
                <div className="text-center">
                  <Link to="/features">
                    <Button size="lg" className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform">
                      Explore All Features
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Middle Ad */}
              <div className="mb-12 print:hidden">
                <GenericAd 
                  network="media.net" 
                  width={728} 
                  height={90}
                  className="mx-auto rounded-2xl overflow-hidden"
                  style={{ maxWidth: '100%' }}
                />
              </div>

              {/* Benefits Stats Card */}
              <Card className="p-10 mb-12 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                  <FileText className="h-80 w-80 -mr-16 -mb-16" />
                </div>
                <div className="text-center max-w-3xl mx-auto relative z-10">
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-200 block mb-2">Empowering Businesses Worldwide</span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Fast, Accurate & Completely Free</h2>
                  <p className="text-base text-blue-100 opacity-90 mb-8 max-w-xl mx-auto">
                    Join freelancers, retailers, and small businesses generating invoices seamlessly every day.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center border-t border-white/20 pt-8">
                    <div>
                      <div className="text-3xl font-extrabold">50,000+</div>
                      <div className="text-xs text-blue-100 opacity-80 mt-1">Invoices Created</div>
                    </div>
                    <div>
                      <div className="text-3xl font-extrabold">100%</div>
                      <div className="text-xs text-blue-100 opacity-80 mt-1">Free Forever</div>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <div className="text-3xl font-extrabold">0 Server Logs</div>
                      <div className="text-xs text-blue-100 opacity-80 mt-1">Privacy First</div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ) : !showPreview ? (
            <motion.div
              key="form-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <Card className="lg:col-span-2 p-6 glass-card rounded-2xl shadow-xl">
                <InvoiceForm
                  invoiceType={selectedInvoiceType}
                  onGenerate={handleInvoiceGenerate}
                  onBack={() => setSelectedInvoiceType('')}
                />
              </Card>
              <div className="space-y-6 print:hidden">
                <Card className="p-6 glass-card rounded-2xl hidden lg:block text-center py-24 shadow-xl">
                  <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-600 w-fit mx-auto mb-3">
                    <FileText className="h-8 w-8" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">Live Invoice Preview</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
                    Fill in the details on the left or click "Autofill Sample Data" to view and export.
                  </p>
                </Card>
                {/* Sidebar Ad */}
                <AdSense 
                  adSlot="sidebar" 
                  adFormat="rectangle"
                  style={{ width: '100%', minHeight: '250px' }}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="preview-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-4 gap-8"
            >
              <Card className="lg:col-span-3 p-6 glass-card rounded-2xl print:shadow-none print:p-0 print:border-none print:bg-transparent">
                <InvoicePreview
                  invoiceData={invoiceData}
                  invoiceType={selectedInvoiceType}
                  onEdit={() => setShowPreview(false)}
                />
              </Card>
              <div className="space-y-6 print:hidden">
                <Card className="p-6 glass-card rounded-2xl shadow-xl">
                  {invoiceData && (
                    <ExportOptions
                      invoiceData={invoiceData}
                      onExportComplete={handleExportComplete}
                    />
                  )}
                </Card>
                {/* Sidebar Ad */}
                <AdSense 
                  adSlot="sidebar" 
                  adFormat="rectangle"
                  style={{ width: '100%', minHeight: '250px' }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sticky Bottom Summary Controls when creating an invoice */}
      <StickySummaryBar
        visible={Boolean(selectedInvoiceType && !showPreview)}
        currencySymbol={invoiceData?.currencySymbol || '₹'}
        grandTotal={invoiceData?.totals.grandTotal || 0}
        itemCount={invoiceData?.items.length || 1}
        onGenerate={() => {
          const btn = document.querySelector('button:has(svg)') as HTMLButtonElement;
          if (btn) btn.click();
        }}
      />

      {/* Footer Ad */}
      <div className="container mx-auto px-4 py-2 print:hidden">
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
      
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
