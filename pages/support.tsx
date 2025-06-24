import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/components/Layout/MainLayout';
import { MessageSquare, HelpCircle, FileText, Send, Mail, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Support Page
 */
const SupportPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data to a backend
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // FAQ items
  const faqItems = [
    {
      question: 'How do I connect my wallet?',
      answer: 'Click the "Connect Wallet" button in the top-right corner of the page, then select your preferred wallet provider from the dropdown menu. Follow the prompts in your wallet to authorize the connection.'
    },
    {
      question: 'Why am I not receiving XP after completing a phase?',
      answer: 'XP is awarded when you complete a phase and click the "Next Phase" button. If you\'re not receiving XP, make sure you\'re properly connected with your wallet and that you haven\'t already received XP for that phase.'
    },
    {
      question: 'Can I reset my progress on a journey?',
      answer: 'Currently, journey progress cannot be reset as it\'s stored on-chain. However, you can always revisit any phase of a journey to review the content.'
    },
    {
      question: 'How do I view my earned rewards?',
      answer: 'Visit the Rewards page by clicking "Rewards" in the navigation menu. There you\'ll find all badges, NFTs, and other rewards you\'ve earned through completing journeys.'
    },
    {
      question: 'How can I participate in the DAO?',
      answer: 'To participate in the DAO, visit the DAO page from the navigation menu. You\'ll need to connect your wallet and have earned at least 100 XP to create proposals or vote on existing ones.'
    },
  ];

  return (
    <MainLayout title="Support | Money Factory AI">
      <div className="container mx-auto px-4 py-10 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Support Center</h1>
          <p className="text-gray-400">Get help with Money Factory AI User Journeys</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gray-800/70 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 shadow-lg mb-8"
            >
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center mr-3">
                  <Mail className="h-5 w-5 text-blue-400" />
                </div>
                <h2 className="text-xl font-medium text-white">Contact Support</h2>
              </div>

              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-900/30 border border-green-700/50 rounded-lg p-4 text-center"
                >
                  <h3 className="text-lg font-medium text-green-400 mb-2">Message Sent!</h3>
                  <p className="text-gray-300">Thank you for contacting us. We'll respond to your inquiry as soon as possible.</p>
                  <Button 
                    onClick={() => setFormSubmitted(false)} 
                    className="mt-4 bg-green-600 hover:bg-green-700"
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">Subject</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a topic</option>
                      <option value="account">Account Issues</option>
                      <option value="wallet">Wallet Connection</option>
                      <option value="rewards">Rewards & XP</option>
                      <option value="journeys">Journey Content</option>
                      <option value="technical">Technical Problems</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Describe your issue or question in detail"
                    ></textarea>
                  </div>
                  
                  <Button type="submit" className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700">
                    <Send className="h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              )}
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="bg-gray-800/70 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 shadow-lg"
            >
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center mr-3">
                  <HelpCircle className="h-5 w-5 text-purple-400" />
                </div>
                <h2 className="text-xl font-medium text-white">Frequently Asked Questions</h2>
              </div>

              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="border border-gray-700 rounded-lg overflow-hidden"
                  >
                    <details className="group">
                      <summary className="flex items-center justify-between p-4 cursor-pointer bg-gray-700/30 hover:bg-gray-700/50 transition-colors">
                        <span className="text-white font-medium">{item.question}</span>
                        <span className="text-blue-400 group-open:rotate-180 transition-transform">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </span>
                      </summary>
                      <div className="p-4 text-gray-300">
                        {item.answer}
                      </div>
                    </details>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar - Right Side */}
          <div className="space-y-6">
            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800/70 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 shadow-lg"
            >
              <h3 className="text-lg font-medium text-white mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <a href="/docs" className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                    <FileText className="h-4 w-4 mr-2" />
                    <span>Documentation</span>
                  </a>
                </li>
                <li>
                  <a href="/terms" className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                    <FileText className="h-4 w-4 mr-2" />
                    <span>Terms of Service</span>
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                    <FileText className="h-4 w-4 mr-2" />
                    <span>Privacy Policy</span>
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800/70 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 shadow-lg"
            >
              <h3 className="text-lg font-medium text-white mb-4">Contact Information</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Mail className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                  <span className="text-gray-300">support@moneyfactory.ai</span>
                </li>
                <li className="flex items-start">
                  <MessageSquare className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                  <span className="text-gray-300">Join our Discord community for real-time support</span>
                </li>
              </ul>
            </motion.div>

            {/* Support Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-800/70 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 shadow-lg"
            >
              <h3 className="text-lg font-medium text-white mb-4">Support Hours</h3>
              <p className="text-gray-300 mb-2">Our team is available during the following hours:</p>
              <ul className="space-y-1 text-gray-300">
                <li>Monday - Friday: 9:00 AM - 6:00 PM CET</li>
                <li>Saturday: 10:00 AM - 2:00 PM CET</li>
                <li>Sunday: Closed</li>
              </ul>
              <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-700/30 rounded-lg flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-yellow-300">
                  Response times may be longer during weekends and holidays. We aim to respond to all inquiries within 24-48 hours.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SupportPage;
