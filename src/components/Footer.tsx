import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Twitter, Youtube, Mail, Phone, MapPin, FileText, Send, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast({
      title: "Subscribed!",
      description: "Thank you for subscribing to our newsletter."
    });
    setEmail('');
  };

  return (
    <footer className="bg-gray-950 text-gray-200 border-t border-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="p-2.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-xl shadow-lg shadow-blue-500/20">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Smart Invoice <span className="text-blue-500">Forge</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Create, customize, and export professional GST & retail invoices in seconds. Free, secure, and privacy-focused.
            </p>
            
            {/* Newsletter Subscription */}
            <div className="pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-2">
                Subscribe for invoice tips
              </span>
              <form onSubmit={handleSubscribe} className="flex max-w-sm items-center space-x-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-900 border-gray-800 text-white placeholder:text-gray-500 text-sm focus-visible:ring-blue-500"
                />
                <Button type="submit" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white px-4 shrink-0">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-3 pt-2">
              <a href="#" className="p-2 bg-gray-900 hover:bg-blue-600 text-gray-400 hover:text-white rounded-lg transition-all duration-300">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-gray-900 hover:bg-pink-600 text-gray-400 hover:text-white rounded-lg transition-all duration-300">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-gray-900 hover:bg-blue-500 text-gray-400 hover:text-white rounded-lg transition-all duration-300">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-gray-900 hover:bg-sky-500 text-gray-400 hover:text-white rounded-lg transition-all duration-300">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-gray-900 hover:bg-red-600 text-gray-400 hover:text-white rounded-lg transition-all duration-300">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link to="/features" className="text-gray-400 hover:text-blue-400 transition-colors">Features</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-blue-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Legal Policy</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/privacy-policy" className="text-gray-400 hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="text-gray-400 hover:text-blue-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/cookie-policy" className="text-gray-400 hover:text-blue-400 transition-colors">Cookie Policy</Link></li>
              <li><Link to="/refund-policy" className="text-gray-400 hover:text-blue-400 transition-colors">Refund Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Support</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="h-4 w-4 text-blue-400 shrink-0" />
                <span>support@smartinvoice.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="h-4 w-4 text-green-400 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="h-4 w-4 text-red-400 shrink-0" />
                <span>Global Digital Platform</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-900 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Smart Invoice Forge. Built for speed and accuracy.</p>
          <p className="flex items-center">
            Crafted with <Heart className="h-3.5 w-3.5 text-red-500 mx-1 fill-red-500" /> for global businesses
          </p>
        </div>
      </div>
    </footer>
  );
};
