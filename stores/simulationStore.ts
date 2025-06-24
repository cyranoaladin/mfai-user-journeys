import { JourneyContent, JourneyPhase, PersonaType } from '@/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface NFT {
    id: string;
    name: string;
    imageUrl: string;
    rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
    utility: string;
    unlockedAt: number;
}

interface Reward {
    type: 'xp' | 'nft' | 'mfai';
    amount?: number;
    name?: string;
    imageUrl?: string;
}

interface SimulationState {
    // État de base
    currentPersona: PersonaType | null;
    currentJourney: JourneyContent | null;
    currentPhaseIndex: number;
    totalXP: number;
    level: number;
    nfts: NFT[];
    mfaiTokens: number;
    stakedTokens: number;
    completedPhases: number[];
    unlockedPhases: number[];
    xp: number;

    // État de l'interface
    loading: boolean;
    error: string | null;
    showRewardAnimation: boolean;
    isPhaseTransitioning: boolean;
    activeModal: string | null;
    reward: Reward | null;

    // Actions de base
    setCurrentPersona: (persona: PersonaType) => void;
    setCurrentJourney: (journey: JourneyContent) => void;
    setCurrentPhaseIndex: (index: number) => void;
    addXP: (amount: number) => void;
    addNFT: (nft: NFT) => void;
    addMFaiTokens: (amount: number) => void;
    stakeTokens: (amount: number) => void;
    unstakeTokens: (amount: number) => void;
    completePhase: (phaseIndex: number) => void;
    unlockPhase: (phaseIndex: number) => void;

    // Actions d'interface
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    showReward: (reward: Reward) => void;
    hideReward: () => void;
    startPhaseTransition: () => void;
    endPhaseTransition: () => void;
    setActiveModal: (modal: string | null) => void;

    // Actions de progression
    nextPhase: () => void;
    previousPhase: () => void;
    resetSimulation: () => void;

    // Getters
    getCurrentPhase: () => JourneyPhase | null;
    getNextPhase: () => JourneyPhase | null;
    getPreviousPhase: () => JourneyPhase | null;
    isPhaseUnlocked: (phaseIndex: number) => boolean;
    isPhaseCompleted: (phaseIndex: number) => boolean;
    getProgressPercentage: () => number;
    getLevelProgress: () => number;
    getRequiredXPForNextLevel: () => number;
}

const XP_PER_LEVEL = 1000;
const INITIAL_STATE = {
    currentPersona: null,
    currentJourney: null,
    currentPhaseIndex: 0,
    totalXP: 0,
    level: 1,
    nfts: [],
    mfaiTokens: 0,
    stakedTokens: 0,
    completedPhases: [],
    unlockedPhases: [0], // La première phase est toujours débloquée
    xp: 0,
    loading: false,
    error: null,
    showRewardAnimation: false,
    isPhaseTransitioning: false,
    activeModal: null,
    reward: null,
};

export const useSimulationStore = create<SimulationState>()(
    persist(
        (set, get) => ({
            ...INITIAL_STATE,

            // Actions de base
            setCurrentPersona: (persona) => set({ currentPersona: persona }),

            setCurrentJourney: (journey) => set({
                currentJourney: journey,
                currentPhaseIndex: 0,
                completedPhases: [],
                unlockedPhases: [0]
            }),

            setCurrentPhaseIndex: (index) => {
                const { currentJourney, unlockedPhases } = get();
                if (!currentJourney) return;

                const maxIndex = currentJourney.phases.length - 1;
                const safeIndex = Math.max(0, Math.min(index, maxIndex));

                // Vérifier si la phase est débloquée
                if (unlockedPhases.includes(safeIndex)) {
                    set({ currentPhaseIndex: safeIndex });
                }
            },

            addXP: (amount) => {
                const { totalXP } = get();
                const newXP = totalXP + amount;
                const newLevel = Math.floor(newXP / XP_PER_LEVEL) + 1;

                set({
                    totalXP: newXP,
                    level: newLevel
                });
            },

            addNFT: (nft) => set((state) => ({
                nfts: [...state.nfts, { ...nft, unlockedAt: Date.now() }]
            })),

            addMFaiTokens: (amount) => set((state) => ({
                mfaiTokens: state.mfaiTokens + amount
            })),

            stakeTokens: (amount) => set((state) => ({
                mfaiTokens: state.mfaiTokens - amount,
                stakedTokens: state.stakedTokens + amount
            })),

            unstakeTokens: (amount) => set((state) => ({
                mfaiTokens: state.mfaiTokens + amount,
                stakedTokens: state.stakedTokens - amount
            })),

            completePhase: (phaseIndex) => {
                const { completedPhases, currentJourney } = get();
                if (!currentJourney) return;

                // Ajouter la phase aux phases complétées
                set({ completedPhases: [...completedPhases, phaseIndex] });

                // Débloquer la phase suivante si elle existe
                if (phaseIndex < currentJourney.phases.length - 1) {
                    set((state) => ({
                        unlockedPhases: [...state.unlockedPhases, phaseIndex + 1]
                    }));
                }
            },

            unlockPhase: (phaseIndex) => set((state) => ({
                unlockedPhases: [...state.unlockedPhases, phaseIndex]
            })),

            // Actions d'interface
            setLoading: (loading) => set({ loading }),
            setError: (error) => set({ error }),
            showReward: (reward) => set({ reward }),
            hideReward: () => set({ reward: null }),
            startPhaseTransition: () => set({ isPhaseTransitioning: true }),
            endPhaseTransition: () => set({ isPhaseTransitioning: false }),
            setActiveModal: (modal) => set({ activeModal: modal }),

            // Actions de progression
            nextPhase: () => {
                const { currentPhaseIndex, currentJourney, unlockedPhases } = get();
                if (!currentJourney) return;

                const nextIndex = currentPhaseIndex + 1;
                if (nextIndex < currentJourney.phases.length && unlockedPhases.includes(nextIndex)) {
                    set({ currentPhaseIndex: nextIndex });
                }
            },

            previousPhase: () => {
                const { currentPhaseIndex, unlockedPhases } = get();
                const prevIndex = currentPhaseIndex - 1;
                if (prevIndex >= 0 && unlockedPhases.includes(prevIndex)) {
                    set({ currentPhaseIndex: prevIndex });
                }
            },

            resetSimulation: () => set(INITIAL_STATE),

            // Getters
            getCurrentPhase: () => {
                const { currentJourney, currentPhaseIndex } = get();
                if (!currentJourney) return null;
                return currentJourney.phases[currentPhaseIndex] || null;
            },

            getNextPhase: () => {
                const { currentJourney, currentPhaseIndex, unlockedPhases } = get();
                if (!currentJourney) return null;

                const nextIndex = currentPhaseIndex + 1;
                if (nextIndex < currentJourney.phases.length && unlockedPhases.includes(nextIndex)) {
                    return currentJourney.phases[nextIndex];
                }
                return null;
            },

            getPreviousPhase: () => {
                const { currentJourney, currentPhaseIndex, unlockedPhases } = get();
                if (!currentJourney) return null;

                const prevIndex = currentPhaseIndex - 1;
                if (prevIndex >= 0 && unlockedPhases.includes(prevIndex)) {
                    return currentJourney.phases[prevIndex];
                }
                return null;
            },

            isPhaseUnlocked: (phaseIndex) => {
                const { unlockedPhases } = get();
                return unlockedPhases.includes(phaseIndex);
            },

            isPhaseCompleted: (phaseIndex) => {
                const { completedPhases } = get();
                return completedPhases.includes(phaseIndex);
            },

            getProgressPercentage: () => {
                const { currentJourney, completedPhases } = get();
                if (!currentJourney) return 0;

                return (completedPhases.length / currentJourney.phases.length) * 100;
            },

            getLevelProgress: () => {
                const { totalXP, level } = get();
                const currentLevelXP = totalXP - ((level - 1) * XP_PER_LEVEL);
                return (currentLevelXP / XP_PER_LEVEL) * 100;
            },

            getRequiredXPForNextLevel: () => {
                const { level } = get();
                return level * XP_PER_LEVEL;
            },
        }),
        {
            name: 'mfai-simulation-storage',
            storage: createJSONStorage(() => {
              // Check if window is defined (client-side) before accessing localStorage
              if (typeof window !== 'undefined') {
                return localStorage;
              }
              // Return a mock storage for server-side rendering
              return {
                getItem: () => null,
                setItem: () => null,
                removeItem: () => null
              };
            }),
            partialize: (state) => ({
                currentPersona: state.currentPersona,
                currentJourney: state.currentJourney,
                currentPhaseIndex: state.currentPhaseIndex,
                totalXP: state.totalXP,
                level: state.level,
                nfts: state.nfts,
                mfaiTokens: state.mfaiTokens,
                stakedTokens: state.stakedTokens,
                completedPhases: state.completedPhases,
                unlockedPhases: state.unlockedPhases,
                xp: state.xp,
            }),
        }
    )
);

// Sélecteurs optimisés
export const useCurrentPhase = () => useSimulationStore((state) => state.getCurrentPhase());
export const useNextPhase = () => useSimulationStore((state) => state.getNextPhase());
export const usePreviousPhase = () => useSimulationStore((state) => state.getPreviousPhase());
export const useIsPhaseUnlocked = (phaseIndex: number) =>
    useSimulationStore((state) => state.isPhaseUnlocked(phaseIndex));
export const useIsPhaseCompleted = (phaseIndex: number) =>
    useSimulationStore((state) => state.isPhaseCompleted(phaseIndex));
export const useProgressPercentage = () =>
    useSimulationStore((state) => state.getProgressPercentage());
export const useLevelProgress = () =>
    useSimulationStore((state) => state.getLevelProgress());
export const useRequiredXPForNextLevel = () =>
    useSimulationStore((state) => state.getRequiredXPForNextLevel()); 