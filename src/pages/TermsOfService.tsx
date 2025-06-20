
import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Card } from '@/components/ui/card';

const TermsOfService = () => {
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
            Terms of Service
          </h1>
          
          <Card className="p-8">
            <div className="prose max-w-none dark:prose-invert">
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing and using Smart Invoice Generator, you accept and agree to be bound by 
                the terms and provision of this agreement.
              </p>

              <h2 className="text-2xl font-semibold mb-4">Use License</h2>
              <p className="mb-4">
                Permission is granted to temporarily use Smart Invoice Generator for personal, 
                non-commercial transitory viewing only.
              </p>

              <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
              <p className="mb-4">
                The materials on Smart Invoice Generator are provided on an 'as is' basis. 
                We make no warranties, expressed or implied.
              </p>

              <h2 className="text-2xl font-semibold mb-4">Limitations</h2>
              <p className="mb-4">
                In no event shall Smart Invoice Generator or its suppliers be liable for any damages 
                arising out of the use or inability to use the materials on our website.
              </p>
            </div>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;
