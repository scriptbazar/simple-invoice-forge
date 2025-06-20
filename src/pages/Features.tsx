
import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Card } from '@/components/ui/card';
import { CheckCircle, FileText, Zap, Download, Share2, Shield, Globe, Edit, Clock } from 'lucide-react';

const Features = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const mainFeatures = [
    {
      icon: FileText,
      title: "Multiple Invoice Types",
      description: "Retail, GST, Freelance, Medical bills and more",
      details: [
        "Retail Invoices",
        "GST Invoices",
        "Freelance Invoices",
        "Medical Bills",
        "Hotel Bills",
        "Proforma Invoices",
      ]
    },
    {
      icon: Zap,
      title: "Real-time Calculations",
      description: "Automatic tax, discount, and total calculations",
      details: [
        "Automatic Tax Calculations",
        "Discount Calculations",
        "Total Calculations",
        "Dynamic Updates",
        "Instant Preview",
        "Error Checking",
      ]
    },
    {
      icon: Download,
      title: "Multi-format Export",
      description: "Export to PDF, PNG, JPG with one click",
      details: [
        "PDF Export",
        "PNG Export",
        "JPG Export",
        "High Resolution",
        "Customizable Settings",
        "Batch Export",
      ]
    },
    {
      icon: Share2,
      title: "Easy Sharing",
      description: "Share via WhatsApp, Email, SMS instantly",
      details: [
        "WhatsApp Sharing",
        "Email Sharing",
        "SMS Sharing",
        "Social Media Sharing",
        "Link Generation",
        "QR Code Sharing",
      ]
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is processed locally and securely",
      details: [
        "Local Data Processing",
        "Secure Data Storage",
        "Encryption",
        "Privacy Protection",
        "No Data Logging",
        "GDPR Compliance",
      ]
    },
    {
      icon: Globe,
      title: "Multi-language",
      description: "Available in English, Hindi and more",
      details: [
        "English Support",
        "Hindi Support",
        "Spanish Support",
        "French Support",
        "German Support",
        "Multi-language Support",
      ]
    }
  ];

  const customizationFeatures = [
    {
      icon: Edit,
      title: "Customizable Templates",
      description: "Dozens of professional templates for different industries",
      details: [
        "Industry-specific Templates",
        "Customizable Layouts",
        "Color Scheme Options",
        "Font Selection",
        "Logo Integration",
        "Template Gallery",
      ]
    },
    {
      icon: Clock,
      title: "Payment Terms",
      description: "Set payment terms and due dates",
      details: [
        "Net 30",
        "Net 60",
        "Customizable Terms",
        "Due Date Reminders",
        "Late Payment Fees",
        "Payment Tracking",
      ]
    },
    {
      icon: FileText,
      title: "Invoice Numbering",
      description: "Automatic invoice numbering",
      details: [
        "Sequential Numbering",
        "Custom Prefixes",
        "Date-based Numbering",
        "Reset Options",
        "Duplicate Detection",
        "Invoice History",
      ]
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}`}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-6 animate-fade-in">
            Key Features
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore the powerful features that make Smart Invoice Generator the perfect choice for your billing needs.
          </p>
        </div>

        {/* Main Features Grid - 2 per row on mobile/tablet */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 mb-16">
          {mainFeatures.map((feature, index) => (
            <Card key={index} className="p-4 lg:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <feature.icon className="h-8 lg:h-12 w-8 lg:w-12 text-blue-500 mb-4" />
              <h3 className="text-sm lg:text-xl font-semibold text-gray-800 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-xs lg:text-base">
                {feature.description}
              </p>
              <ul className="space-y-2">
                {feature.details.map((detail, idx) => (
                  <li key={idx} className="flex items-center text-xs lg:text-sm text-gray-600 dark:text-gray-300">
                    <CheckCircle className="h-3 lg:h-4 w-3 lg:w-4 text-green-500 mr-2 flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        {/* Customization Features Section - 2 per row on mobile/tablet */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            Customization Options
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {customizationFeatures.map((feature, index) => (
              <Card key={index} className="p-4 lg:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <feature.icon className="h-8 lg:h-10 w-8 lg:w-10 text-blue-500 mb-4" />
                <h3 className="text-sm lg:text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-xs lg:text-base">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center text-xs lg:text-sm text-gray-600 dark:text-gray-300">
                      <CheckCircle className="h-3 lg:h-4 w-3 lg:w-4 text-green-500 mr-2" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <Card className="p-8 mb-8 bg-gradient-to-r from-green-500 to-blue-500 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Unlock the Full Potential of Your Business</h2>
            <p className="text-lg opacity-90 mb-6">
              Experience the benefits of streamlined invoicing and efficient financial management
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">Save Time</div>
                <div className="opacity-90">Automate invoice creation</div>
              </div>
              <div>
                <div className="text-2xl font-bold">Get Paid Faster</div>
                <div className="opacity-90">Professional invoices</div>
              </div>
              <div className="col-span-2 lg:col-span-1">
                <div className="text-2xl font-bold">Stay Organized</div>
                <div className="opacity-90">Track payments easily</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Features;
