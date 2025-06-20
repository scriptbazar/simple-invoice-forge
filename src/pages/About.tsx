import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Card } from '@/components/ui/card';
import { Lightbulb, Users, ShieldCheck, TrendingUp } from 'lucide-react';

const About = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const teamMembers = [
    {
      name: "John Doe",
      role: "CEO",
      bio: "Passionate about innovation and customer satisfaction."
    },
    {
      name: "Jane Smith",
      role: "CTO",
      bio: "Expert in software development and system architecture."
    },
    {
      name: "Alice Johnson",
      role: "Head of Marketing",
      bio: "Creative marketer with a focus on brand growth."
    },
    {
      name: "Bob Williams",
      role: "Lead Developer",
      bio: "Dedicated to writing clean and efficient code."
    }
  ];

  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We constantly seek new and creative solutions."
    },
    {
      icon: Users,
      title: "Customer Focus",
      description: "Our customers are at the heart of everything we do."
    },
    {
      icon: ShieldCheck,
      title: "Integrity",
      description: "We operate with honesty and transparency."
    },
    {
      icon: TrendingUp,
      title: "Excellence",
      description: "We strive for the highest standards in all our work."
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}`}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-6 animate-fade-in">
            About Us
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Learn more about Smart Invoice Generator and our mission to simplify invoicing for businesses of all sizes.
          </p>
        </div>

        {/* Mission Section */}
        <Card className="p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            Our Mission
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            At Smart Invoice Generator, our mission is to empower businesses with a simple, efficient, and affordable invoicing solution. We believe that managing your finances should be straightforward, allowing you to focus on what you do best – growing your business.
          </p>
        </Card>

        {/* Team Section - 2 per row on mobile/tablet */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="p-4 lg:p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 lg:w-24 h-16 lg:h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-lg lg:text-2xl">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-sm lg:text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-2 text-xs lg:text-sm">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-xs lg:text-sm">
                  {member.bio}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Values Section - 2 per row on mobile/tablet */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
            {values.map((value, index) => (
              <Card key={index} className="p-4 lg:p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <value.icon className="h-8 lg:h-12 w-8 lg:w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-sm lg:text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-xs lg:text-sm">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <Card className="p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                "Smart Invoice Generator has revolutionized our billing process. It's incredibly user-friendly and has saved us countless hours."
              </p>
              <p className="font-semibold text-blue-600 dark:text-blue-400">- Sarah L., Small Business Owner</p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                "As a freelancer, I needed a simple and professional invoicing tool. Smart Invoice Generator exceeded my expectations. Highly recommended!"
              </p>
              <p className="font-semibold text-blue-600 dark:text-blue-400">- Mark D., Freelancer</p>
            </div>
          </div>
        </Card>

        {/* Contact Section */}
        <Card className="p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
            Get In Touch
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Have questions or feedback? We'd love to hear from you!
          </p>
          <a href="/contact" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded">
            Contact Us
          </a>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
