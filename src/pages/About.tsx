import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, Users, ShieldCheck, TrendingUp, Sparkles, ArrowRight, Quote, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const values = [
    {
      icon: Lightbulb,
      title: "Innovation First",
      description: "Building fast, zero-friction tools that eliminate billing overhead for entrepreneurs."
    },
    {
      icon: ShieldCheck,
      title: "Privacy & Trust",
      description: "Your financial and client data belongs to you. Zero server tracking or sales of user data."
    },
    {
      icon: Users,
      title: "User Centric",
      description: "Designed intuitively so anyone can issue professional invoices in under a minute."
    },
    {
      icon: TrendingUp,
      title: "Excellence",
      description: "Rigorous standards for calculations, layout precision, and multi-format document export."
    }
  ];

  const testimonials = [
    {
      quote: "Smart Invoice Generator has completely transformed my client billing. I generate PDF invoices on my phone in 30 seconds!",
      author: "Sarah Jenkins",
      role: "Digital Consultant"
    },
    {
      quote: "The GST calculation and instant WhatsApp sharing features save our retail store hours of admin work every week.",
      author: "Rajesh Kumar",
      role: "Retail Business Owner"
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 relative overflow-hidden ${isDarkMode ? 'dark bg-gray-950 text-white' : 'bg-gradient-to-br from-blue-50/80 via-indigo-50/50 to-purple-50/80 text-gray-900'}`}>
      
      {/* Background Glow */}
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-purple-500/10 dark:bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs font-bold mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Empowering Global Commerce</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
            Simplifying Invoicing For <br />
            <span className="gradient-text">Businesses Everywhere</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Smart Invoice Forge was created with a clear goal: to make professional billing accessible, accurate, and completely free for freelancers and small businesses worldwide.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="p-8 md:p-10 mb-16 glass-card rounded-3xl border-l-4 border-l-blue-600 shadow-2xl max-w-4xl mx-auto">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4">
            Our Core Mission
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
            We believe managing business billing shouldn't require expensive subscriptions or cumbersome desktop software. Smart Invoice Forge processes calculations locally in your browser, ensuring maximum privacy, zero data retention, and unmatched speed.
          </p>
        </Card>

        {/* Core Values */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
              Guided By Core Principles
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              The values that drive every line of code we write
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="p-6 glass-card rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="p-3.5 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 w-fit mb-4">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* User Testimonials */}
        <div className="mb-20">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-12">
            Loved By Business Owners
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((item, index) => (
              <Card key={index} className="p-8 glass-card rounded-3xl relative">
                <Quote className="h-8 w-8 text-blue-500/20 absolute top-6 right-6" />
                <p className="text-gray-700 dark:text-gray-300 text-sm italic mb-6 leading-relaxed">
                  "{item.quote}"
                </p>
                <div className="border-t border-gray-200/60 dark:border-gray-800/80 pt-4">
                  <div className="font-bold text-gray-900 dark:text-white text-sm">{item.author}</div>
                  <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">{item.role}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Get in touch banner */}
        <Card className="p-10 mb-12 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white text-center shadow-2xl">
          <h2 className="text-3xl font-extrabold mb-3">Have Questions or Feature Ideas?</h2>
          <p className="text-base text-blue-100 max-w-lg mx-auto mb-6 opacity-90">
            We are continuously improving Smart Invoice Forge based on community feedback.
          </p>
          <Link to="/contact">
            <Button size="lg" className="rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-bold px-8 shadow-xl">
              Contact Support
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
