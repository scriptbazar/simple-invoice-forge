import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Mail, Phone, MapPin, Clock, Send, MessageCircle, 
  ChevronDown, ChevronUp, HelpCircle, Sparkles 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const { toast } = useToast();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We will get back to you shortly.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Support",
      content: "support@smartinvoice.com",
      description: "Average response within 2 hours"
    },
    {
      icon: Phone,
      title: "Direct Call",
      content: "+1 (555) 123-4567",
      description: "Mon-Fri from 9am to 6pm EST"
    },
    {
      icon: MapPin,
      title: "Global Platform",
      content: "Smart Invoice Forge Inc.",
      description: "Digital web application worldwide"
    },
    {
      icon: Clock,
      title: "Platform Availability",
      content: "24/7 / 365 Days",
      description: "100% Client-side uptime"
    }
  ];

  const faqs = [
    { q: "Is Smart Invoice Forge 100% free?", a: "Yes! Creating, customizing, and exporting PDF/PNG invoices is completely free without limits or subscriptions." },
    { q: "Where is my invoice data stored?", a: "Your invoice data is saved locally inside your browser's LocalStorage. No data is sent or saved on external servers." },
    { q: "Can I generate GST Tax Invoices in India?", a: "Yes, our GST Invoice layout automatically calculates CGST, SGST, IGST, and prints your GSTIN registration number." },
    { q: "What currencies are supported?", a: "We support INR (₹), USD ($), EUR (€), GBP (£), AED, CAD, AUD, and SGD with automatic symbol formatting." },
    { q: "How do I add my company logo to invoices?", a: "Click 'Upload Logo' in the invoice form. Your logo is converted locally to Base64 and embedded cleanly into PDFs." },
    { q: "What export formats are supported?", a: "You can download your generated invoice as a vector PDF, high-res PNG image, or JPG image." },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 relative overflow-hidden ${isDarkMode ? 'dark bg-gray-950 text-white' : 'bg-gradient-to-br from-blue-50/80 via-indigo-50/50 to-purple-50/80 text-gray-900'}`}>
      
      {/* Glow Orbs */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs font-bold mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            <span>We're Here to Help</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
            Get In Touch With <span className="gradient-text">Our Support Team</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Have questions, feedback, or need help with custom billing formats? Drop us a line below.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <Card key={index} className="p-6 glass-card rounded-2xl text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="p-3.5 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 w-fit mx-auto mb-4">
                <info.icon className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                {info.title}
              </h3>
              <p className="text-blue-600 dark:text-blue-400 font-bold text-sm mb-1">
                {info.content}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {info.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Contact Form & Side Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          <Card className="lg:col-span-2 p-8 glass-card rounded-3xl">
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2">
                    Your Name *
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="John Doe"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="john@company.com"
                    className="rounded-xl"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2">
                  Subject *
                </label>
                <Input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="Inquiry about custom invoice layout..."
                  className="rounded-xl"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2">
                  Message *
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  placeholder="Type your message here..."
                  className="rounded-xl"
                />
              </div>
              
              <Button type="submit" size="lg" className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold shadow-lg shadow-blue-500/20">
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </form>
          </Card>

          {/* Side Info */}
          <div className="space-y-6">
            <Card className="p-8 glass-card rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-xl">
              <MessageCircle className="h-10 w-10 mb-4 opacity-90" />
              <h3 className="text-xl font-bold mb-2">Instant Community Support</h3>
              <p className="text-sm text-blue-100 opacity-90 leading-relaxed mb-6">
                Have a quick question? Check out our frequently asked questions below or drop an email directly.
              </p>
              <div className="space-y-3 text-xs text-blue-100">
                <div className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 mr-2" />
                  <span>Free & Unlimited Usage</span>
                </div>
                <div className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 mr-2" />
                  <span>No Account / Login Required</span>
                </div>
                <div className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 mr-2" />
                  <span>PDF, PNG & JPG Export</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="p-3.5 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 w-fit mx-auto mb-4">
              <HelpCircle className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Quick answers to common questions about invoice creation
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="glass-card rounded-2xl overflow-hidden border">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 text-left flex justify-between items-center hover:bg-gray-50/50 dark:hover:bg-gray-800/40 transition-colors"
                >
                  <h3 className="text-base font-bold text-gray-900 dark:text-white pr-4">
                    {faq.q}
                  </h3>
                  {expandedFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-blue-500 shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400 shrink-0" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-5 pb-5 border-t border-gray-100 dark:border-gray-800 pt-3">
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;
