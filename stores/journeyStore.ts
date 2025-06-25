import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { JourneyContent, JourneyPhase, PersonaType } from '@/types';
import { getAllJourneys, getJourneysByPersona, getJourneyBySlug, isPhaseUnlocked } from '@/services/journeyService';
import logger from '@/utils/logger';

/**
 * Interface for the journeys store
 */
export interface JourneyState {
  // État
  journeys: JourneyContent[];
  currentJourney: JourneyContent | null;
  currentPhaseIndex: number;
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchAllJourneys: () => Promise<void>;
  fetchJourneysByPersona: (persona: PersonaType) => Promise<void>;
  fetchJourneyBySlug: (slug: string) => Promise<void>;
  setCurrentJourney: (journey: JourneyContent | null) => void;
  setCurrentPhaseIndex: (index: number) => void;
  nextPhase: () => void;
  previousPhase: () => void;
  resetJourney: () => void;
  
  // Selectors
  getCurrentPhase: () => JourneyPhase | null;
  isPhaseUnlocked: (phaseIndex: number, userXP: number, userNFTs: string[]) => boolean;
}

/**
 * Zustand store for journeys
 * 
 * Centralizes all operations related to journeys:
 * - Data loading
 * - Navigation between phases
 * - Verification of unlock conditions
 */
export const useJourneyStore = create<JourneyState>()(persist(
  (set, get) => ({
  // État initial
  journeys: [],
  currentJourney: null,
  currentPhaseIndex: 0,
  loading: false,
  error: null,
  
  // Actions
  fetchAllJourneys: async () => {
    set({ loading: true, error: null });
    try {
      const journeys = await getAllJourneys();
      
      if (!journeys || journeys.length === 0) {
        set({ 
          error: 'No journeys found. Please try again later.',
          loading: false,
          journeys: [] 
        });
        return;
      }
      
      set({ journeys, loading: false, error: null });
    } catch (error) {
      logger.error('Error loading journeys:', error);
      
      // More descriptive and categorized error message
      let errorMessage = 'An error occurred while loading journeys.';
      
      if (error instanceof Error) {
        if (error.message.includes('network') || error.message.includes('Network')) {
          errorMessage = 'Erreur de connexion réseau. Vérifiez votre connexion internet et réessayez.';
        } else if (error.message.includes('timeout') || error.message.includes('Timeout')) {
          errorMessage = 'La requête a expiré. Le serveur met trop de temps à répondre.';
        } else if (error.message.includes('404')) {
          errorMessage = 'Journey data not found on the server.';
        } else if (error.message.includes('401') || error.message.includes('403')) {
          errorMessage = 'Accès non autorisé. Veuillez vous reconnecter.';
        } else if (error.message.includes('500')) {
          errorMessage = 'Erreur serveur. Veuillez réessayer plus tard.';
        } else {
          errorMessage = `Erreur: ${error.message}`;
        }
      }
      
      set({ 
        error: errorMessage,
        loading: false 
      });
    }
  },
  
  fetchJourneysByPersona: async (persona) => {
    set({ loading: true, error: null });
    try {
      const journeys = await getJourneysByPersona(persona);
      
      if (!journeys || journeys.length === 0) {
        set({ 
          error: `No journey found for the profile "${persona}". Try another profile.`,
          loading: false,
          journeys: [] 
        });
        return;
      }
      
      set({ journeys, loading: false, error: null });
      
      // If journeys are found, set the first one as currentJourney
      if (journeys.length > 0) {
        set({ currentJourney: journeys[0] });
      }
    } catch (error) {
      logger.error(`Error loading journeys for ${persona}:`, error);
      
      // More descriptive and categorized error message
      let errorMessage = `An error occurred while loading journeys for "${persona}".`;
      
      if (error instanceof Error) {
        if (error.message.includes('network') || error.message.includes('Network')) {
          errorMessage = 'Network connection error. Check your internet connection and try again.';
        } else if (error.message.includes('timeout') || error.message.includes('Timeout')) {
          errorMessage = 'Request timed out. The server is taking too long to respond.';
        } else if (error.message.includes('404')) {
          errorMessage = `The profile "${persona}" was not found on the server.`;
        } else if (error.message.includes('401') || error.message.includes('403')) {
          errorMessage = 'Unauthorized access. Please log in again.';
        } else if (error.message.includes('500')) {
          errorMessage = 'Server error. Please try again later.';
        } else {
          errorMessage = `Error: ${error.message}`;
        }
      }
      
      set({ 
        error: errorMessage,
        loading: false 
      });
    }
  },
  
  fetchJourneyBySlug: async (slug) => {
    set({ loading: true, error: null });
    try {
      const journey = await getJourneyBySlug(slug);
      
      if (journey) {
        set({ 
          currentJourney: journey,
          currentPhaseIndex: 0,
          loading: false,
          error: null
        });
      } else {
        set({ 
          error: `The journey "${slug}" was not found. Check the URL and try again.`,
          loading: false 
        });
      }
    } catch (error) {
      logger.error(`Error loading journey ${slug}:`, error);
      
      // More descriptive and categorized error message
      let errorMessage = `An error occurred while loading the journey "${slug}".`;
      
      if (error instanceof Error) {
        if (error.message.includes('network') || error.message.includes('Network')) {
          errorMessage = 'Network connection error. Check your internet connection and try again.';
        } else if (error.message.includes('timeout') || error.message.includes('Timeout')) {
          errorMessage = 'Request timed out. The server is taking too long to respond.';
        } else if (error.message.includes('404')) {
          errorMessage = `The journey "${slug}" was not found on the server.`;
        } else if (error.message.includes('401') || error.message.includes('403')) {
          errorMessage = 'Unauthorized access. Please log in again.';
        } else if (error.message.includes('500')) {
          errorMessage = 'Server error. Please try again later.';
        } else {
          errorMessage = `Error: ${error.message}`;
        }
      }
      
      set({ 
        error: errorMessage,
        loading: false 
      });
    }
  },
  
  setCurrentJourney: (journey) => {
    set({ 
      currentJourney: journey,
      currentPhaseIndex: 0 // Reset phase index when changing journey
    });
  },
  
  setCurrentPhaseIndex: (index) => {
    const { currentJourney } = get();
    if (!currentJourney) return;
    
    // Verify that the index is valid
    const maxIndex = currentJourney.phases.length - 1;
    const safeIndex = Math.max(0, Math.min(index, maxIndex));
    
    set({ currentPhaseIndex: safeIndex });
  },
  
  nextPhase: () => {
    const { currentJourney, currentPhaseIndex } = get();
    if (!currentJourney) return;
    
    const maxIndex = currentJourney.phases.length - 1;
    if (currentPhaseIndex < maxIndex) {
      set({ currentPhaseIndex: currentPhaseIndex + 1 });
    }
  },
  
  previousPhase: () => {
    const { currentPhaseIndex } = get();
    if (currentPhaseIndex > 0) {
      set({ currentPhaseIndex: currentPhaseIndex - 1 });
    }
  },
  
  resetJourney: () => {
    set({ currentPhaseIndex: 0 });
  },
  
  // Selectors
  getCurrentPhase: () => {
    const { currentJourney, currentPhaseIndex } = get();
    if (!currentJourney || !currentJourney.phases) return null;
    
    return currentJourney.phases[currentPhaseIndex] || null;
  },
  
  isPhaseUnlocked: (phaseIndex, userXP, userNFTs) => {
    const { currentJourney } = get();
    if (!currentJourney || !currentJourney.phases) return false;
    
    const phase = currentJourney.phases[phaseIndex];
    if (!phase) return false;
    
    return isPhaseUnlocked(phase, userXP, userNFTs);
  }
  }),
  {
    name: 'mfai-journey-storage',
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
      // Ne sauvegarder que les données essentielles
      currentJourney: state.currentJourney,
      currentPhaseIndex: state.currentPhaseIndex
    })
  }
));

/**
 * Utility hooks for easily accessing store data
 */

// Get the current phase
export const useCurrentPhase = () => {
  return useJourneyStore(state => state.getCurrentPhase());
};

// Get all phases of the current journey
export const useJourneyPhases = () => {
  return useJourneyStore(state => state.currentJourney?.phases || []);
};

// Check if a phase is unlocked
export const useIsPhaseUnlocked = (phaseIndex: number, userXP: number, userNFTs: string[]) => {
  return useJourneyStore(state => state.isPhaseUnlocked(phaseIndex, userXP, userNFTs));
};

// Get the percentage of progress in the current journey
export const useJourneyProgress = () => {
  const currentPhaseIndex = useJourneyStore(state => state.currentPhaseIndex);
  const phases = useJourneyStore(state => state.currentJourney?.phases || []);
  
  if (phases.length <= 1) return 0;
  return (currentPhaseIndex / (phases.length - 1)) * 100;
};
