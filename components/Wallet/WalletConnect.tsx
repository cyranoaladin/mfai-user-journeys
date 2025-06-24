import React, { FC, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../utils/store';
import { getUserNFTs } from '../../utils/nftUtils';

/**
 * WalletConnect Component
 *
 * Handles wallet connection for both EVM (Ethereum) and Solana chains
 * Uses RainbowKit for EVM and Phantom for Solana
 */

interface WalletConnectProps {
  onConnect?: (address: string) => void;
  onDisconnect?: () => void;
  buttonStyle?: 'default' | 'minimal' | 'expanded';
}

const WalletConnect: FC<WalletConnectProps> = ({
  onConnect,
  onDisconnect,
  buttonStyle = 'default',
}) => {
  const { walletConnected, walletAddress, walletType, connectWallet, disconnectWallet, addNFT } =
    useStore();

  // Fetch NFTs when wallet connects
  useEffect(() => {
    const fetchNFTs = async () => {
      if (walletConnected && walletAddress) {
        try {
          // Pass walletType as 'ethereum' if null
          const chainType = walletType || 'ethereum';
          const nfts = await getUserNFTs(walletAddress, chainType);
          // Add each NFT to the store individually
          nfts.forEach(nft => addNFT(nft.name));
        } catch (error) {
          console.error('Error fetching NFTs:', error);
        }
      }
    };

    fetchNFTs();
  }, [walletConnected, walletAddress, walletType, addNFT]);

  // Handle connect wallet
  const handleConnect = async () => {
    try {
      // In a real implementation, this would use RainbowKit or Phantom SDK
      // For now, we'll simulate with a mock address
      const mockAddress = '0x1234567890123456789012345678901234567890';
      const mockChain = 'ethereum';

      await connectWallet(mockAddress, mockChain);

      if (onConnect) {
        onConnect(mockAddress);
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  // Handle disconnect wallet
  const handleDisconnect = () => {
    disconnectWallet();

    if (onDisconnect) {
      onDisconnect();
    }
  };

  // Button variants based on style prop
  const getButtonStyles = () => {
    switch (buttonStyle) {
      case 'minimal':
        return walletConnected
          ? 'text-gray-300 hover:text-white'
          : 'text-blue-400 hover:text-blue-300';
      case 'expanded':
        return walletConnected
          ? 'bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2'
          : 'bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2';
      default:
        return walletConnected
          ? 'bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-full text-sm'
          : 'bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-full text-sm';
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      {walletConnected ? (
        <button onClick={handleDisconnect} className={`transition-colors ${getButtonStyles()}`}>
          {buttonStyle === 'minimal' ? (
            'Disconnect'
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-green-400"></span>
              {buttonStyle === 'expanded'
                ? `${walletAddress?.substring(0, 6)}...${walletAddress?.substring(walletAddress.length - 4)}`
                : 'Disconnect'}
            </>
          )}
        </button>
      ) : (
        <button onClick={handleConnect} className={`transition-colors ${getButtonStyles()}`}>
          {buttonStyle === 'minimal' ? (
            'Connect'
          ) : (
            <>
              {buttonStyle === 'expanded' && (
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 7H5C3.89543 7 3 7.89543 3 9V15C3 16.1046 3.89543 17 5 17H19C20.1046 17 21 16.1046 21 15V9C21 7.89543 20.1046 7 19 7Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 10H21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              Connect Wallet
            </>
          )}
        </button>
      )}
    </motion.div>
  );
};

export default WalletConnect;
