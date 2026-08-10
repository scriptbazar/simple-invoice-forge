import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, FileText, Zap, Download, Share2, Shield, Globe, Edit, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

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
      description: "Tailored templates for every business model and industry requirement.",
      details: [
        "Retail & POS Invoices",
        "GST Compliant Tax Bills",
        "Freelance & Service Billing",
        "Medical & Healthcare Bills",
        "Hotel & Lodging Bills",
        "Proforma Quotations",
      ]
    },
    {
      icon: Zap,
      title: "Real-time Calculations",
      description: "Automated standard GST tax, discount rates & grand totals.",
      details: [
        "Automatic Taxable Value Math",
        "Item-level Discounting",
        "Grand Total Calculation",
        "Multi-item Line Aggregation",
        "Live Preview Updates",
        "Zero Math Error Risk",
      ]
    },
    {
      icon: Download,
      title: "Multi-format Export",
      description: "High-resolution file generation in standard image & document formats.",
      details: [
        "Vector Crisp PDF Export",
        "PNG Image Output",
        "JPG Image Output",
        "Print Ready Page Layout",
        "A4 Page Scaling",
        "Custom Logo Embedding",
      ]
    },
    {
      icon: Share2,
      title: "Instant Sharing Options",
      description: "Share invoices directly with clients across popular channels.",
      details: [
        "One-click WhatsApp Share",
        "Native Mail Client Trigger",
        "Summary Link Copy",
        "Native Browser Sharing",
        "Print Window Trigger",
        "Mobile-friendly Previews",
      ]
    },
    {
      icon: Shield,
      title: "100% Privacy & Security",
      description: "Client data is processed exclusively inside your local browser.",
      details: [
        "Local Browser Storage",
        "No Cloud Tracking",
        "No Third-party Data Leak",
        "Zero Account Sign-up Required",
        "Instant Offline Availability",
        "GDPR Compliant Architecture",
      ]
    },
    {
      icon: Globe,
      title: "Global Multi-Currency",
      description: "Support for global business billing currencies & symbols.",
      details: [
        "Indian Rupee (₹)",
        "US Dollar ($)",
        "Euro (€)",
        "British Pound (£)",
        "UAE Dirham (AED)",
        "Canadian & Australian Dollars",
      ]
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 relative overflow-hidden ${isDarkMode ? 'dark bg-gray-950 text-white' : 'bg-gradient-to-br from-blue-50/80 via-indigo-50/50 to-purple-50/80 text-gray-900'}`}>
      
      {/* Glow Orbs */}
      <div className="absolute top-10 left-1/3 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs font-bold mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Built for Modern Business Needs</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
            Powerful Features for <span className="gradient-text">Effortless Billing</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Everything you need to generate, customize, and issue professional invoices without complicated software setup.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {mainFeatures.map((feature, index) => (
            <Card key={index} className="p-6 glass-card rounded-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group">
              <div>
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white w-fit mb-5 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <ul className="space-y-2.5 border-t border-gray-200/60 dark:border-gray-800/80 pt-4">
                {feature.details.map((detail, idx) => (
                  <li key={idx} className="flex items-center text-xs font-medium text-gray-700 dark:text-gray-300">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        {/* Call to Action Card */}
        <Card className="p-10 mb-12 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white text-center shadow-2xl">
          <h2 className="text-3xl font-extrabold mb-3">Ready to Create Your First Invoice?</h2>
          <p className="text-base text-blue-100 max-w-xl mx-auto mb-6 opacity-90">
            No signup, no credit card required. Generate and download your invoice instantly.
          </p>
          <Link to="/">
            <Button size="lg" className="rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-bold px-8 shadow-xl">
              Create Invoice Now
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Features;
