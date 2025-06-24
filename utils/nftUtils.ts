/**
 * NFT & Wallet Utilities
 *
 * This file contains functions for wallet connection, NFT detection,
 * and token balance checking across Ethereum and Solana networks.
 */

import { useStore } from './store';

// Types
export interface NFT {
  id: string;
  name: string;
  image: string;
  description: string;
  attributes: {
    trait_type: string;
    value: string | number;
  }[];
  collection?: string;
}

/**
 * Get all NFTs owned by a wallet address
 *
 * @param address Wallet address
 * @param chain 'ethereum' | 'solana'
 * @returns Array of NFTs
 */
export const getUserNFTs = async (
  address: string,
  chain: 'ethereum' | 'solana' = 'ethereum'
): Promise<NFT[]> => {
  // This is a mock implementation
  // In production, this would call Moralis, Thirdweb, or Metaplex APIs

  console.log(`Fetching NFTs for ${address} on ${chain}`);

  // Mock data for development
  const mockNFTs: Record<string, NFT[]> = {
    // Mock Ethereum address
    '0x1234567890123456789012345678901234567890': [
      {
        id: 'gold-pass-1',
        name: 'Gold Pass',
        image: '/nfts/gold-pass.png',
        description: 'Access to premium MFAI features and journeys',
        attributes: [
          { trait_type: 'Tier', value: 'Gold' },
          { trait_type: 'XP Multiplier', value: 2 },
        ],
        collection: 'MFAI Passes',
      },
      {
        id: 'proof-of-skill-web3',
        name: 'Proof-of-Skill: Web3 Basics',
        image: '/nfts/web3-basics.png',
        description: 'Successfully completed Web3 Basics training',
        attributes: [
          { trait_type: 'XP', value: 50 },
          { trait_type: 'Category', value: 'Education' },
        ],
        collection: 'Proof-of-Skill™',
      },
    ],
    // Mock Solana address
    HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH: [
      {
        id: 'platinum-pass-1',
        name: 'Platinum Pass',
        image: '/nfts/platinum-pass.png',
        description: 'VIP access to all MFAI features and exclusive content',
        attributes: [
          { trait_type: 'Tier', value: 'Platinum' },
          { trait_type: 'XP Multiplier', value: 3 },
        ],
        collection: 'MFAI Passes',
      },
    ],
  };

  // Return mock data or empty array
  return mockNFTs[address] || [];
};

/**
 * Check if a wallet has a specific NFT
 *
 * @param address Wallet address
 * @param nftName Name or partial name of the NFT
 * @returns Boolean indicating if the NFT is owned
 */
export const hasNFT = async (address: string, nftName: string): Promise<boolean> => {
  if (!address) return false;

  const nfts = await getUserNFTs(address);
  return nfts.some(nft => nft.name.includes(nftName));
};

/**
 * Check if a wallet has a specific NFT Pass
 *
 * @param address Wallet address
 * @param tier 'Gold' | 'Platinum' | 'Diamond'
 * @returns Boolean indicating if the pass is owned
 */
export const hasNFTPass = async (
  address: string,
  tier: 'Gold' | 'Platinum' | 'Diamond'
): Promise<boolean> => {
  return hasNFT(address, `${tier} Pass`);
};

/**
 * Get token balance for a wallet
 *
 * @param address Wallet address
 * @param tokenSymbol Token symbol (e.g., '$MFAI')
 * @returns Token balance as number
 */
export const getTokenBalance = async (address: string, tokenSymbol: string): Promise<number> => {
  // Mock implementation
  // In production, this would call web3.js, ethers.js, or @solana/web3.js

  // Mock balances for development
  const mockBalances: Record<string, Record<string, number>> = {
    '0x1234567890123456789012345678901234567890': {
      $MFAI: 1000,
      ETH: 1.5,
    },
    HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH: {
      $MFAI: 5000,
      SOL: 25,
    },
  };

  return mockBalances[address]?.[tokenSymbol] || 0;
};

/**
 * Mint a new NFT to a wallet
 *
 * @param address Wallet address
 * @param metadata NFT metadata
 * @returns Transaction hash or ID
 */
export const mintNFT = async (
  address: string,
  metadata: {
    name: string;
    image: string;
    description: string;
    attributes: { trait_type: string; value: string | number }[];
  }
): Promise<string> => {
  // Mock implementation
  // In production, this would call Thirdweb SDK, Metaplex, or a custom contract

  console.log(`Minting NFT to ${address}`, metadata);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Mock transaction hash
  return `0x${Math.random().toString(16).substring(2, 42)}`;
};

/**
 * Check if a phase is locked based on wallet NFTs and user progress
 *
 * @returns Boolean indicating if the phase is locked
 *
 * NOTE: Pour le prototype, toutes les phases sont accessibles sans restriction NFT
 * afin que les visiteurs puissent explorer l'ensemble du parcours.
 */
export const isPhaseAccessible = async (): Promise<boolean> => {
  // Pour le prototype, toutes les phases sont accessibles
  return true;

  // Code original commenté ci-dessous pour référence future
  /*
  // Always allow access to current or previous phases
  if (phase <= currentPhase) return true;
  
  // If no wallet connected, lock future phases
  if (!walletAddress) return false;
  
  // Phase-specific requirements
  switch (phase) {
    case 1: // Build phase
      return await hasNFTPass(walletAddress, 'Gold');
    case 2: // Prove phase
      return await hasNFT(walletAddress, 'Proof-of-Skill');
    case 3: // Activate phase
      // Either has NFT pass or has staked tokens
      const hasPass = await hasNFTPass(walletAddress, 'Gold');
      const tokenBalance = await getTokenBalance(walletAddress, '$MFAI');
      return hasPass || tokenBalance > 100;
    case 4: // Scale phase
      return await hasNFTPass(walletAddress, 'Platinum');
    default:
      return false;
  }
  */
};

/**
 * Hook to check if the current user has a specific NFT
 *
 * @param nftName Name or partial name of the NFT
 * @returns Boolean indicating if the NFT is owned
 */
export const useHasNFT = (nftName: string): boolean => {
  const { walletConnected, walletAddress, ownedNFTs } = useStore();

  // If wallet not connected, return false
  if (!walletConnected || !walletAddress) return false;

  // Check if NFT is in the store's ownedNFTs array
  return ownedNFTs.some(nft => nft.includes(nftName));
};
