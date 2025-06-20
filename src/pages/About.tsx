
import React from 'react';
import { Header } from '../components/Header';
import { Card } from '@/components/ui/card';
import { FileText, Zap, Shield, Globe, Users, Award, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const features = [
    {
      icon: FileText,
      title: "Multiple Invoice Types",
      description: "Support for retail, GST, freelance, medical, hotel bills and more"
    },
    {
      icon: Zap,
      title: "Real-time Calculations",
      description: "Automatic calculation of taxes, discounts, and totals"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is processed locally and securely"
    },
    {
      icon: Globe,
      title: "Multi-format Export",
      description: "Export to PDF, PNG, JPG formats with sharing options"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Invoices Generated" },
    { number: "50+", label: "Invoice Templates" },
    { number: "15+", label: "Export Formats" },
    { number: "99.9%", label: "Uptime" }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}`}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-6 animate-fade-in">
            About Smart Invoice Generator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're revolutionizing the way businesses create and manage invoices. Our platform combines 
            powerful automation with intuitive design to make invoice generation effortless and professional.
          </p>
        </div>

        {/* Mission Section */}
        <Card className="p-8 mb-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg opacity-90 max-w-4xl mx-auto">
              To empower businesses of all sizes with professional invoice generation tools that save time, 
              reduce errors, and enhance financial management. We believe every business deserves access to 
              enterprise-grade invoicing capabilities.
            </p>
          </div>
        </Card>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            Why Choose Smart Invoice?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <feature.icon className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            Our Impact
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-500 mb-2">{stat.number}</div>
                <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <Users className="h-10 w-10 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                User-Centric Design
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Every feature is designed with user experience in mind, ensuring simplicity without 
                compromising functionality.
              </p>
            </Card>
            
            <Card className="p-6">
              <Award className="h-10 w-10 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                Quality Excellence
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We maintain the highest standards in code quality, security, and performance 
                to deliver reliable solutions.
              </p>
            </Card>
            
            <Card className="p-6">
              <CheckCircle className="h-10 w-10 text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                Continuous Innovation
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We constantly evolve our platform based on user feedback and emerging 
                business needs.
              </p>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="p-8 text-center bg-gradient-to-r from-green-400 to-blue-500 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-6 opacity-90">
            Join thousands of businesses already using Smart Invoice Generator
          </p>
          <Link to="/">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3">
              Create Your First Invoice
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default About;
