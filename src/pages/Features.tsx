
import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Card } from '@/components/ui/card';
import { 
  FileText, Zap, Shield, Globe, Palette, Calculator, 
  Download, Share2, Edit, Upload, Users, Award,
  CheckCircle, Clock, DollarSign, Smartphone
} from 'lucide-react';

const Features = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const features = [
    {
      icon: FileText,
      title: "Multiple Invoice Types",
      description: "Support for retail, GST, freelance, medical, hotel bills and more with customized fields"
    },
    {
      icon: Calculator,
      title: "Real-time Calculations",
      description: "Automatic calculation of taxes, discounts, totals, and complex pricing structures"
    },
    {
      icon: Palette,
      title: "Custom Branding",
      description: "Add your logo, customize colors, themes, and create professional-looking invoices"
    },
    {
      icon: Download,
      title: "Multiple Export Formats",
      description: "Export to PDF, PNG, JPG formats with high-quality output for all your needs"
    },
    {
      icon: Share2,
      title: "Easy Sharing",
      description: "Share directly via WhatsApp, Email, SMS, or generate shareable links instantly"
    },
    {
      icon: Edit,
      title: "Edit & Modify",
      description: "Easily edit existing invoices, duplicate templates, and make quick modifications"
    },
    {
      icon: Upload,
      title: "Cloud Storage",
      description: "Save to Google Drive, Dropbox, OneDrive with automatic backup and sync"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is processed securely with encryption and privacy protection"
    },
    {
      icon: Globe,
      title: "Multi-language Support",
      description: "Available in multiple languages including English, Hindi, and more"
    },
    {
      icon: Smartphone,
      title: "Mobile Responsive",
      description: "Works perfectly on all devices - desktop, tablet, and mobile phones"
    },
    {
      icon: Clock,
      title: "Quick Generation",
      description: "Create professional invoices in under 2 minutes with our streamlined process"
    },
    {
      icon: DollarSign,
      title: "Tax Compliance",
      description: "Built-in tax calculations that comply with local and international standards"
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}`}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-6 animate-fade-in">
            Powerful Features
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover all the amazing features that make Smart Invoice Generator the best choice 
            for your invoicing needs. From basic invoices to complex billing scenarios.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <feature.icon className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="p-8 text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience These Features?</h2>
          <p className="text-lg mb-6 opacity-90">
            Start creating professional invoices today with all these powerful features
          </p>
          <a href="/" className="inline-block bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-colors">
            Get Started Now
          </a>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Features;
