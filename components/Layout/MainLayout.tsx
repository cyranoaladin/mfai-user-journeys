import React, { FC, ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import WalletConnect from '../Wallet/WalletConnect';
import { useStore } from '../../utils/store';

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

/**
 * MainLayout Component
 * 
 * Provides consistent layout for all pages with:
 * - Header with navigation and wallet connection
 * - Footer with links and info
 * - SEO metadata
 */
const MainLayout: FC<MainLayoutProps> = ({ 
  children, 
  title = 'Money Factory AI User Journeys',
  description = 'Cognitive Activation Journeys™ for Web3 personas'
}) => {
  const { totalXP } = useStore();
  
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen flex flex-col bg-gray-900 text-white">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo and Brand */}
              <Link href="/" className="flex items-center gap-2">
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  MFAI
                </div>
                <span className="text-sm text-gray-300">User Journeys</span>
              </Link>
              
              {/* Navigation */}
              <nav className="hidden md:flex items-center gap-6">
                <Link href="/journeys" className="text-gray-300 hover:text-white transition-colors">Journeys</Link>
                <Link href="/rewards" className="text-gray-300 hover:text-white transition-colors">Rewards</Link>
                <Link href="/dao" className="text-gray-300 hover:text-white transition-colors">DAO</Link>
              </nav>
              
              {/* User Actions */}
              <div className="flex items-center gap-4">
                <button
                  className="hidden md:inline-block px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded-full text-sm"
                  onClick={() => alert('Zyno simulator coming soon!')}
                >
                  Simulate with Zyno
                </button>
                {/* XP Badge */}
                <motion.div
                  className="hidden md:flex items-center gap-2 bg-gray-700 px-3 py-1 rounded-full"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-xs text-blue-300">XP</span>
                  <span className="text-sm font-medium text-white">{totalXP}</span>
                </motion.div>
                
                {/* Wallet Connection */}
                <WalletConnect />
              </div>
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-grow">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="bg-gray-800 border-t border-gray-700 py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-gray-400 text-sm">
                  © {new Date().getFullYear()} Money Factory AI. All rights reserved.
                </p>
              </div>
              
              <div className="flex gap-6">
                <a href="#" className="text-gray-400 hover:text-white text-sm">Terms</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm">Docs</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm">Support</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default MainLayout;
