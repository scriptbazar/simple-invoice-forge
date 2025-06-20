
import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Card } from '@/components/ui/card';

const RefundPolicy = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}`}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            Refund Policy
          </h1>
          
          <Card className="p-8">
            <div className="prose max-w-none dark:prose-invert">
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <h2 className="text-2xl font-semibold mb-4">Our Refund Policy</h2>
              <p className="mb-4">
                We want you to be completely satisfied with our service. If you're not happy with 
                your purchase, we offer a 30-day money-back guarantee.
              </p>

              <h2 className="text-2xl font-semibold mb-4">Eligibility for Refunds</h2>
              <p className="mb-4">
                To be eligible for a refund, your request must be made within 30 days of your 
                original purchase date.
              </p>

              <h2 className="text-2xl font-semibold mb-4">How to Request a Refund</h2>
              <p className="mb-4">
                To request a refund, please contact our support team at support@smartinvoice.com 
                with your order details and reason for the refund request.
              </p>

              <h2 className="text-2xl font-semibold mb-4">Processing Time</h2>
              <p className="mb-4">
                Once your refund request is approved, it will be processed within 5-7 business days 
                and credited back to your original payment method.
              </p>
            </div>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default RefundPolicy;
