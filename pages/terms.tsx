import React from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/components/Layout/MainLayout';

/**
 * Terms of Service Page
 */
const TermsPage = () => {
  return (
    <MainLayout title="Terms of Service | Money Factory AI">
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-gray-400">Last updated: June 24, 2025</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/70 backdrop-blur-md rounded-xl p-8 border border-gray-700/50 shadow-lg prose prose-invert max-w-none"
        >
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Money Factory AI User Journeys platform ("Platform"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Platform.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            Money Factory AI User Journeys is an educational platform that provides interactive learning experiences related to finance, blockchain, cryptocurrency, and artificial intelligence. The Platform offers various learning journeys, rewards, and community features.
          </p>

          <h2>3. User Accounts</h2>
          <p>
            To access certain features of the Platform, you may need to connect a cryptocurrency wallet. You are responsible for maintaining the security of your wallet and any activities that occur under your account.
          </p>

          <h2>4. User Conduct</h2>
          <p>
            You agree not to:
          </p>
          <ul>
            <li>Use the Platform for any illegal purpose or in violation of any laws</li>
            <li>Interfere with or disrupt the Platform or servers</li>
            <li>Attempt to gain unauthorized access to any part of the Platform</li>
            <li>Use the Platform to transmit any harmful code or material</li>
            <li>Impersonate any person or entity</li>
          </ul>

          <h2>5. Intellectual Property</h2>
          <p>
            All content on the Platform, including text, graphics, logos, and software, is the property of Money Factory AI or its content suppliers and is protected by intellectual property laws.
          </p>

          <h2>6. Digital Assets and Rewards</h2>
          <p>
            The Platform may offer digital rewards, badges, or tokens. These digital assets:
          </p>
          <ul>
            <li>Are for educational and entertainment purposes only</li>
            <li>Do not represent ownership in Money Factory AI</li>
            <li>May have no monetary value</li>
            <li>Are subject to change or removal at our discretion</li>
          </ul>

          <h2>7. Limitation of Liability</h2>
          <p>
            Money Factory AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the Platform.
          </p>

          <h2>8. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will provide notice of significant changes by posting the new Terms on the Platform.
          </p>

          <h2>9. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of France, without regard to its conflict of law provisions.
          </p>

          <h2>10. Contact Information</h2>
          <p>
            For questions about these Terms, please contact us at support@moneyfactory.ai.
          </p>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default TermsPage;
