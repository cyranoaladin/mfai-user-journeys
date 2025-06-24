import React from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/components/Layout/MainLayout';
import { FileText, Book, Code, Users, Award, ChevronRight } from 'lucide-react';
import Link from 'next/link';

/**
 * Documentation Page
 */
const DocsPage = () => {
  // Animation variants for items
  // Note: We're using direct animation on individual items instead of container variants

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Documentation categories
  const docCategories = [
    {
      title: 'Getting Started',
      description: 'Learn the basics of Money Factory AI User Journeys',
      icon: Book,
      links: [
        { title: 'Platform Overview', url: '#overview' },
        { title: 'Connecting Your Wallet', url: '#wallet' },
        { title: 'Understanding XP and Rewards', url: '#rewards' },
      ]
    },
    {
      title: 'Journey Guides',
      description: 'Detailed guides for each learning journey',
      icon: FileText,
      links: [
        { title: 'The Connector Protocol™', url: '#connector-protocol' },
        { title: 'DeFi Fundamentals', url: '#defi-fundamentals' },
        { title: 'Introduction to Finance', url: '#intro-finance' },
        { title: 'AI in Finance', url: '#ai-finance' },
        { title: 'Blockchain and Crypto', url: '#blockchain-crypto' },
      ]
    },
    {
      title: 'Technical Documentation',
      description: 'Technical details for developers',
      icon: Code,
      links: [
        { title: 'API Reference', url: '#api' },
        { title: 'Smart Contract Integration', url: '#smart-contracts' },
        { title: 'Wallet Adapter', url: '#wallet-adapter' },
      ]
    },
    {
      title: 'Community & Governance',
      description: 'Participate in the Money Factory AI community',
      icon: Users,
      links: [
        { title: 'DAO Participation Guide', url: '#dao-guide' },
        { title: 'Proposal Creation', url: '#proposals' },
        { title: 'Voting Mechanism', url: '#voting' },
      ]
    },
    {
      title: 'Rewards System',
      description: 'Understanding the rewards ecosystem',
      icon: Award,
      links: [
        { title: 'XP System Explained', url: '#xp-system' },
        { title: 'Badge Collection', url: '#badges' },
        { title: 'NFT Rewards', url: '#nft-rewards' },
      ]
    },
  ];

  return (
    <MainLayout title="Documentation | Money Factory AI">
      <div className="container mx-auto px-4 py-10 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Documentation</h1>
          <p className="text-gray-400">Comprehensive guides and resources for Money Factory AI User Journeys</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {docCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/70 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center mr-3">
                    <IconComponent className="h-5 w-5 text-blue-400" />
                  </div>
                  <h2 className="text-xl font-medium text-white">{category.title}</h2>
                </div>
                <p className="text-gray-300 mb-4">{category.description}</p>
                <ul className="space-y-2">
                  {category.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link href={link.url} className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                        <ChevronRight className="h-4 w-4 mr-1" />
                        <span>{link.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Featured Documentation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Featured Documentation</h2>
          
          <div className="bg-gray-800/70 backdrop-blur-md rounded-xl p-8 border border-gray-700/50 shadow-lg prose prose-invert max-w-none">
            <h3 id="overview">Platform Overview</h3>
            <p>
              Money Factory AI User Journeys is an educational platform designed to guide users through various learning paths related to finance, blockchain, cryptocurrency, and artificial intelligence. Each journey consists of multiple phases that build upon each other, providing a comprehensive learning experience.
            </p>
            
            <h4>Key Features</h4>
            <ul>
              <li><strong>Interactive Learning Journeys:</strong> Structured learning paths with progressive phases</li>
              <li><strong>XP and Rewards:</strong> Earn experience points and digital rewards as you progress</li>
              <li><strong>Wallet Integration:</strong> Connect your cryptocurrency wallet to track progress and store rewards</li>
              <li><strong>DAO Governance:</strong> Participate in platform governance through proposals and voting</li>
            </ul>
            
            <h3 id="wallet">Connecting Your Wallet</h3>
            <p>
              To fully experience Money Factory AI User Journeys, you'll need to connect a cryptocurrency wallet. We support various wallet providers including MetaMask, WalletConnect, Coinbase Wallet, and Phantom.
            </p>
            
            <h4>Connection Steps</h4>
            <ol>
              <li>Click the "Connect Wallet" button in the top-right corner of the platform</li>
              <li>Select your preferred wallet provider from the dropdown menu</li>
              <li>Follow the prompts in your wallet to authorize the connection</li>
              <li>Once connected, your wallet address will appear in the header, and you'll have access to all platform features</li>
            </ol>
            
            <h3 id="rewards">Understanding XP and Rewards</h3>
            <p>
              As you progress through journeys and complete phases, you'll earn Experience Points (XP) and various rewards. These serve as proof of your learning achievements and can unlock additional features on the platform.
            </p>
            
            <h4>XP System</h4>
            <p>
              XP is earned by completing journey phases. Each phase awards a specific amount of XP based on its complexity and depth. Your total XP is displayed in the platform header and contributes to your overall profile level.
            </p>
            
            <h4>Reward Types</h4>
            <ul>
              <li><strong>Skill Badges:</strong> Digital badges that represent specific skills or knowledge areas you've mastered</li>
              <li><strong>NFT Rewards:</strong> Unique digital collectibles that serve as proof of your achievements</li>
              <li><strong>Access Tokens:</strong> Special tokens that unlock exclusive content or features</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default DocsPage;
