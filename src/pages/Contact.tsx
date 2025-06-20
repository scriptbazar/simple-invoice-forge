
import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Mail, Phone, MapPin, Clock, Send, MessageCircle, 
  ChevronDown, ChevronUp, HelpCircle 
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
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
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
      description: "Thank you for your message. We'll get back to you soon.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "support@smartinvoice.com",
      description: "Send us an email anytime"
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      description: "Mon-Fri from 8am to 6pm"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "123 Business St, Tech City, TC 12345",
      description: "Our office headquarters"
    },
    {
      icon: Clock,
      title: "Business Hours",
      content: "Monday - Friday: 8am - 6pm",
      description: "Saturday: 9am - 4pm"
    }
  ];

  const faqs = [
    { q: "How do I create my first invoice?", a: "Simply select an invoice type, fill in the details, and click generate. It takes less than 2 minutes!" },
    { q: "Is Smart Invoice Generator free to use?", a: "Yes! Our basic features are completely free. Premium features are available with our paid plans." },
    { q: "What invoice types are supported?", a: "We support Retail, GST, Freelance, Medical, Hotel, Proforma, and many other invoice types." },
    { q: "Can I customize the invoice design?", a: "Absolutely! You can add your logo, change colors, and customize the layout to match your brand." },
    { q: "What export formats are available?", a: "You can export invoices in PDF, PNG, and JPG formats for maximum compatibility." },
    { q: "How do I add my company logo?", a: "Click the logo upload button in the invoice form and select your image file. We support PNG, JPG, and SVG formats." },
    { q: "Can I save invoices for later editing?", a: "Yes, you can save invoices to your account and edit them anytime. Premium users get unlimited storage." },
    { q: "Is my data secure?", a: "Absolutely. We use industry-standard encryption and never store sensitive financial information without permission." },
    { q: "Can I share invoices directly?", a: "Yes! Share via WhatsApp, Email, SMS, or generate a shareable link with one click." },
    { q: "Do you support multiple currencies?", a: "Yes, we support over 50 currencies with automatic formatting based on your selection." },
    { q: "How do tax calculations work?", a: "Our system automatically calculates taxes based on the rates you specify and your location settings." },
    { q: "Can I use this on mobile devices?", a: "Yes! Our platform is fully responsive and works perfectly on phones, tablets, and desktops." },
    { q: "What languages are supported?", a: "Currently we support English and Hindi, with more languages being added regularly." },
    { q: "How do I apply discounts?", a: "You can add percentage or fixed amount discounts to individual items or the entire invoice." },
    { q: "Can I duplicate existing invoices?", a: "Yes, you can easily duplicate any invoice to create similar ones quickly." },
    { q: "Is there a limit on invoice items?", a: "Free users can add up to 20 items per invoice. Premium users have unlimited items." },
    { q: "How do I add payment terms?", a: "Payment terms can be added in the invoice details section with customizable text." },
    { q: "Can I track invoice payments?", a: "Premium users can track payment status and send payment reminders automatically." },
    { q: "Do you provide invoice templates?", a: "Yes, we offer dozens of professional templates for different industries and use cases." },
    { q: "How do I contact customer support?", a: "You can reach us via email, phone, or live chat. We typically respond within 2 hours." },
    { q: "Can I integrate with accounting software?", a: "Yes, we offer integrations with QuickBooks, Xero, and other popular accounting platforms." },
    { q: "What if I make a mistake on an invoice?", a: "You can easily edit and regenerate invoices. We also keep a version history for reference." },
    { q: "Do you offer bulk invoice generation?", a: "Premium users can generate multiple invoices at once using our batch processing feature." },
    { q: "Can I set up recurring invoices?", a: "Yes, you can set up automatic recurring invoices for subscription or regular billing." },
    { q: "How do I backup my invoices?", a: "All invoices are automatically backed up to the cloud. You can also export them for local storage." },
    { q: "Is there an API available?", a: "Yes, we offer a REST API for developers who want to integrate invoice generation into their applications." },
    { q: "What payment methods do you accept?", a: "We accept all major credit cards, PayPal, and bank transfers for premium subscriptions." },
    { q: "Can I cancel my subscription anytime?", a: "Yes, you can cancel anytime. Your account will remain active until the end of your billing period." },
    { q: "Do you offer refunds?", a: "We offer a 30-day money-back guarantee for all premium subscriptions." },
    { q: "How do I upgrade to premium?", a: "Click the upgrade button in your dashboard or contact our sales team for enterprise plans." }
  ];

  const supportChannels = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help with our live chat support",
      action: "Start Chat"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send detailed questions via email",
      action: "Send Email"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our support team",
      action: "Call Now"
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}`}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-6 animate-fade-in">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Have questions about Smart Invoice Generator? We're here to help! 
            Reach out to us through any of the channels below.
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <info.icon className="h-10 w-10 text-blue-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                {info.title}
              </h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-1">
                {info.content}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {info.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject *
                </label>
                <Input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="What's this about?"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message *
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  placeholder="Tell us more about your inquiry..."
                />
              </div>
              
              <Button type="submit" className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </form>
          </Card>

          {/* Support Channels */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Other Ways to Reach Us
            </h2>
            
            {supportChannels.map((channel, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start space-x-4">
                  <channel.icon className="h-8 w-8 text-blue-500 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                      {channel.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {channel.description}
                    </p>
                    <Button variant="outline" size="sm">
                      {channel.action}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <HelpCircle className="h-16 w-16 text-blue-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Find quick answers to common questions about Smart Invoice Generator
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                      {faq.q}
                    </h3>
                    {expandedFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 dark:text-gray-300">{faq.a}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Location Map Placeholder */}
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Visit Our Office
          </h2>
          <div className="bg-gray-200 dark:bg-gray-700 h-64 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 dark:text-gray-400">Interactive Map Coming Soon</p>
            </div>
          </div>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;
