import React, { FC, ReactNode, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../utils/store';
// Les fonctions hasNFT et hasNFTPass sont commentées car nous avons désactivé la vérification NFT
// import { hasNFT, hasNFTPass } from '../../utils/nftUtils';
import WalletConnect from './WalletConnect';

/**
 * NFTGate Component
 *
 * Gates content based on NFT ownership
 * Shows appropriate UI for connected/disconnected states
 */

interface NFTGateProps {
  children: ReactNode;
  requiredNFT?: string;
  requiredPass?: 'Gold' | 'Platinum' | 'Diamond';
  fallbackContent?: ReactNode;
}

const NFTGate: FC<NFTGateProps> = ({ children, requiredNFT, requiredPass, fallbackContent }) => {
  const { walletConnected, walletAddress, ownedNFTs } = useStore();
  const [hasAccess, setHasAccess] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      // Pour le prototype, on donne accès à tout le monde sans restriction
      setHasAccess(true);
      setChecking(false);
      return;

      /* Code original commenté pour référence future
      if (!walletConnected || !walletAddress) {
        setHasAccess(false);
        setChecking(false);
        return;
      }

      try {
        setChecking(true);
        let access = false;

        if (requiredNFT) {
          access = await hasNFT(walletAddress, requiredNFT);
        } else if (requiredPass) {
          access = await hasNFTPass(walletAddress, requiredPass);
        } else {
          // If no specific requirement, just need a connected wallet
          access = true;
        }

        setHasAccess(access);
      } catch (error) {
        console.error('Error checking NFT access:', error);
        setHasAccess(false);
      } finally {
        setChecking(false);
      }
      */
    };

    checkAccess();
  }, [walletConnected, walletAddress, requiredNFT, requiredPass, ownedNFTs]);

  // Loading state
  if (checking) {
    return (
      <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-300">Checking NFT ownership...</p>
      </div>
    );
  }

  // Not connected state
  if (!walletConnected) {
    return (
      <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-white mb-2">Wallet Connection Required</h3>
          <p className="text-gray-300 mb-4">
            {requiredPass
              ? `Connect your wallet to verify your ${requiredPass} Pass ownership`
              : requiredNFT
                ? `Connect your wallet to verify your ${requiredNFT} ownership`
                : 'Connect your wallet to access this content'}
          </p>
          <div className="inline-block">
            <WalletConnect buttonStyle="expanded" />
          </div>
        </div>

        {fallbackContent && (
          <div className="mt-6 pt-6 border-t border-gray-700">
            <div className="text-sm text-gray-400 mb-2">Preview:</div>
            {fallbackContent}
          </div>
        )}
      </div>
    );
  }

  // No access state
  if (!hasAccess) {
    return (
      <motion.div
        className="p-6 bg-gray-800 rounded-lg border border-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center mb-6">
          <div className="text-red-400 text-5xl mb-4">🔒</div>
          <h3 className="text-xl font-bold text-white mb-2">Access Restricted</h3>
          <p className="text-gray-300 mb-4">
            {requiredPass
              ? `You need a ${requiredPass} Pass to access this content`
              : requiredNFT
                ? `You need the ${requiredNFT} to access this content`
                : 'You do not have access to this content'}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
            <a
              href="#"
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Get Required NFT
            </a>
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Refresh Access
            </button>
          </div>
        </div>

        {fallbackContent && (
          <div className="mt-6 pt-6 border-t border-gray-700 opacity-50">
            <div className="text-sm text-gray-400 mb-2">Preview:</div>
            {fallbackContent}
          </div>
        )}
      </motion.div>
    );
  }

  // Has access state
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      {children}
    </motion.div>
  );
};

export default NFTGate;
