import React from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/components/Layout/MainLayout';

/**
 * Privacy Policy Page
 */
const PrivacyPage = () => {
  return (
    <MainLayout title="Privacy Policy | Money Factory AI">
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-gray-400">Last updated: June 24, 2025</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/70 backdrop-blur-md rounded-xl p-8 border border-gray-700/50 shadow-lg prose prose-invert max-w-none"
        >
          <h2>1. Introduction</h2>
          <p>
            Money Factory AI ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our User Journeys platform ("Platform").
          </p>

          <h2>2. Information We Collect</h2>
          <p>
            We may collect information about you in various ways, including:
          </p>
          <ul>
            <li><strong>Wallet Information:</strong> When you connect your cryptocurrency wallet, we collect your wallet address and transaction history related to our platform.</li>
            <li><strong>Usage Data:</strong> Information about how you use the Platform, including completed journeys, earned rewards, and interaction patterns.</li>
            <li><strong>Device Information:</strong> Information about your device, IP address, browser type, and operating system.</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>
            We may use the information we collect for various purposes, including:
          </p>
          <ul>
            <li>Providing and maintaining the Platform</li>
            <li>Tracking your progress and awarding rewards</li>
            <li>Improving and personalizing your experience</li>
            <li>Communicating with you about updates or changes</li>
            <li>Analyzing usage patterns to enhance our services</li>
            <li>Preventing fraudulent activity and ensuring security</li>
          </ul>

          <h2>4. Blockchain Data</h2>
          <p>
            Please be aware that blockchain technology is inherently transparent. When you interact with blockchain features of our Platform:
          </p>
          <ul>
            <li>Your wallet address and transactions are publicly visible on the blockchain</li>
            <li>Any rewards, badges, or tokens you earn may be linked to your public wallet address</li>
            <li>This information cannot be deleted or modified due to the immutable nature of blockchain technology</li>
          </ul>

          <h2>5. Sharing Your Information</h2>
          <p>
            We may share your information with:
          </p>
          <ul>
            <li>Service providers who help us operate the Platform</li>
            <li>Legal authorities when required by law</li>
            <li>Other users, but only in aggregated or anonymized form</li>
          </ul>
          <p>
            We do not sell your personal information to third parties.
          </p>

          <h2>6. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your information. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2>7. Your Rights</h2>
          <p>
            Depending on your location, you may have rights regarding your personal information, including:
          </p>
          <ul>
            <li>Accessing your data</li>
            <li>Correcting inaccurate data</li>
            <li>Deleting your data (where possible)</li>
            <li>Restricting or objecting to processing</li>
            <li>Data portability</li>
          </ul>
          <p>
            To exercise these rights, please contact us at privacy@moneyfactory.ai.
          </p>

          <h2>8. Children's Privacy</h2>
          <p>
            Our Platform is not intended for children under 18 years of age. We do not knowingly collect personal information from children.
          </p>

          <h2>9. Changes to This Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
          </p>

          <h2>10. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at privacy@moneyfactory.ai.
          </p>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default PrivacyPage;
