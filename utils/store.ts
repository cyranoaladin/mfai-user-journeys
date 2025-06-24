import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UserState {
  // User profile
  walletConnected: boolean;
  walletAddress: string | null;
  walletType: 'ethereum' | 'solana' | null;

  // Journey progress
  selectedPersona: string | null;
  currentPhase: number;
  totalXP: number;
  mfaiBalance: number;
  completedMissions: string[];

  // NFT ownership
  ownedNFTs: string[];

  // Zyno AI interaction history
  zynoHistory: {
    prompt: string;
    response: string;
    timestamp: number;
  }[];

  // Actions
  connectWallet: (address: string, type: 'ethereum' | 'solana') => void;
  disconnectWallet: () => void;
  selectPersona: (persona: string) => void;
  setCurrentPhase: (phase: number) => void;
  addXP: (amount: number) => void;
  addMfai: (amount: number) => void;
  completeMission: (missionId: string) => void;
  addNFT: (nftId: string) => void;
  addZynoInteraction: (prompt: string, response: string) => void;
  resetJourney: () => void;
}

const storage = createJSONStorage<UserState>(() => {
  if (typeof window === 'undefined') {
    return {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    };
  }
  return {
    getItem: (name: string) => {
      const str = localStorage.getItem(name);
      if (!str) return null;
      return JSON.parse(str);
    },
    setItem: (name: string, value: unknown) => {
      localStorage.setItem(name, JSON.stringify(value));
    },
    removeItem: (name: string) => {
      localStorage.removeItem(name);
    },
  };
});

/**
 * Global state store using Zustand
 *
 * Features:
 * - Persistent storage via localStorage
 * - Wallet connection state
 * - Journey progress tracking
 * - XP and NFT management
 * - Zyno AI interaction history
 */
export const useStore = create(
  persist<UserState>(
    set => ({
      // Initial state
      walletConnected: false,
      walletAddress: null,
      walletType: null,
      selectedPersona: null,
      currentPhase: 0,
      totalXP: 0,
      mfaiBalance: 0,
      completedMissions: [],
      ownedNFTs: [],
      zynoHistory: [],

      // Actions
      connectWallet: (address, type) =>
        set({
          walletConnected: true,
          walletAddress: address,
          walletType: type,
        }),

      disconnectWallet: () =>
        set({
          walletConnected: false,
          walletAddress: null,
          walletType: null,
        }),

      selectPersona: persona =>
        set({
          selectedPersona: persona,
          currentPhase: 0, // Reset to first phase when changing persona
        }),

      setCurrentPhase: phase =>
        set({
          currentPhase: phase,
        }),

      addXP: amount =>
        set(state => ({
          totalXP: state.totalXP + amount,
        })),

      addMfai: amount =>
        set(state => ({
          mfaiBalance: state.mfaiBalance + amount,
        })),

      completeMission: missionId =>
        set(state => ({
          completedMissions: [...state.completedMissions, missionId],
        })),

      addNFT: nftId =>
        set(state => ({
          ownedNFTs: [...state.ownedNFTs, nftId],
        })),

      addZynoInteraction: (prompt, response) =>
        set(state => ({
          zynoHistory: [
            ...state.zynoHistory,
            {
              prompt,
              response,
              timestamp: Date.now(),
            },
          ],
        })),

      resetJourney: () =>
        set({
          currentPhase: 0,
          totalXP: 0,
          mfaiBalance: 0,
          completedMissions: [],
        }), // Note: We don't reset XP or NFTs as those are permanent
    }),
    {
      name: 'mfai-user-journey-storage',
      storage,
    }
  )
);

/**
 * Selector hooks for common state access patterns
 */

// Note: useCurrentJourney has been moved to a separate hook in hooks/useCurrentJourney.ts

// Check if a specific mission is completed
export const useMissionStatus = (missionId: string) => {
  return useStore(state => state.completedMissions.includes(missionId));
};

// Check if user has required NFT for access
export const useHasRequiredNFT = (nftId: string) => {
  return useStore(state => state.ownedNFTs.includes(nftId));
};

// Get user level based on XP
export const useUserLevel = () => {
  const totalXP = useStore(state => state.totalXP);
  return Math.floor(totalXP / 100) + 1;
};

// Calculate next reward threshold
export const useNextRewardThreshold = () => {
  const totalXP = useStore(state => state.totalXP);
  const currentLevel = Math.floor(totalXP / 100) + 1;
  return currentLevel * 100;
};
