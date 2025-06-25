import { createJourneyServiceMocks } from '@/tests/mocks/mockUtils';
import logger from '@/utils/logger';

/**
 * Création des mocks standardisés pour les services
 * Ces mocks utilisent les données de test standardisées et des comportements cohérents
 */
const { 
  mockGetAllJourneys, 
  mockGetJourneysByPersona, 
  mockGetJourneyBySlug, 
  mockIsPhaseUnlocked
} = createJourneyServiceMocks();

// Mock du module journeyService
jest.mock('@/services/journeyService', () => ({
  getAllJourneys: () => mockGetAllJourneys(),
  getJourneysByPersona: (persona: any) => mockGetJourneysByPersona(persona),
  getJourneyBySlug: (slug: string) => mockGetJourneyBySlug(slug),
  isPhaseUnlocked: (phase: any, userXp: number, userNfts: string[] | undefined | null) => 
    mockIsPhaseUnlocked(phase, userXp, userNfts),
}));

// Fonction pour créer un store de test
export const createTestStore = () => {
  // Import dynamique pour éviter les problèmes de mock
  const { create } = require('zustand');
  
  // Créer un store isolé pour les tests
  return create((set, get) => ({
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
        const journeys = await mockGetAllJourneys();
        set({ journeys, loading: false });
      } catch (error) {
        logger.error('Erreur lors du chargement des journeys:', error);
        set({ 
          error: error instanceof Error ? `Error fetching journeys: ${error.message}` : 'Erreur inconnue',
          loading: false 
        });
      }
    },
    
    fetchJourneysByPersona: async (persona) => {
      set({ loading: true, error: null });
      try {
        const journeys = await mockGetJourneysByPersona(persona);
        set({ journeys, loading: false });
      } catch (error) {
        set({ 
          error: error instanceof Error ? `Error fetching journeys by persona: ${error.message}` : 'Erreur inconnue',
          loading: false 
        });
      }
    },
    
    fetchJourneyBySlug: async (slug) => {
      set({ loading: true, error: null });
      try {
        const journey = await mockGetJourneyBySlug(slug);
        set({ 
          currentJourney: journey, 
          currentPhaseIndex: 0,
          loading: false 
        });
      } catch (error) {
        set({ 
          error: error instanceof Error ? `Error fetching journey: ${error.message}` : 'Erreur inconnue',
          loading: false 
        });
      }
    },
    
    setCurrentJourney: (journey) => {
      set({ 
        currentJourney: journey,
        currentPhaseIndex: 0
      });
    },
    
    setCurrentPhaseIndex: (index) => {
      const { currentJourney } = get();
      if (!currentJourney) return;
      
      const maxIndex = currentJourney.phases.length - 1;
      const safeIndex = Math.max(0, Math.min(index, maxIndex));
      set({ currentPhaseIndex: safeIndex });
    },
    
    nextPhase: () => {
      const { currentPhaseIndex, currentJourney } = get();
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
      set({ 
        currentJourney: null,
        currentPhaseIndex: 0,
        error: null
      });
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
      
      return mockIsPhaseUnlocked(phase, userXP, userNFTs);
    }
  }));
};

// Exporter les mocks pour pouvoir les configurer dans les tests
export {
  mockGetAllJourneys,
  mockGetJourneysByPersona,
  mockGetJourneyBySlug,
  mockIsPhaseUnlocked
};
