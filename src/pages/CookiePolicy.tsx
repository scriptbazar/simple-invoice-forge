
import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Card } from '@/components/ui/card';

const CookiePolicy = () => {
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
            Cookie Policy
          </h1>
          
          <Card className="p-8">
            <div className="prose max-w-none dark:prose-invert">
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <h2 className="text-2xl font-semibold mb-4">What Are Cookies</h2>
              <p className="mb-4">
                Cookies are small text files that are placed on your computer by websites that you visit. 
                They are widely used to make websites work more efficiently.
              </p>

              <h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
              <p className="mb-4">
                We use cookies to improve your experience on our website, remember your preferences, 
                and analyze how our site is used.
              </p>

              <h2 className="text-2xl font-semibold mb-4">Types of Cookies We Use</h2>
              <ul className="mb-4 list-disc pl-6">
                <li>Essential cookies - necessary for the website to function</li>
                <li>Analytics cookies - help us understand how visitors use our site</li>
                <li>Functional cookies - remember your preferences</li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
              <p className="mb-4">
                You can control and/or delete cookies as you wish. You can delete all cookies that are 
                already on your computer and set most browsers to prevent them from being placed.
              </p>
            </div>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CookiePolicy;
