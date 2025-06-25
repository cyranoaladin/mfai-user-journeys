/**
 * Utilitaires pour les mocks dans les tests
 * 
 * Ce fichier centralise les fonctions utilitaires pour créer des mocks
 * standardisés pour les tests.
 */

import { getTestJourneys } from './journeyMocks';
import logger from '@/utils/logger';

/**
 * Crée un mock pour getAllJourneys
 */
export const createMockGetAllJourneys = () => {
  return jest.fn().mockResolvedValue(getTestJourneys());
};

/**
 * Crée un mock pour getJourneysByPersona
 */
export const createMockGetJourneysByPersona = () => {
  const mockJourneys = getTestJourneys();
  return jest.fn().mockImplementation((persona: string | undefined | null) => {
    // Vérifier si persona est undefined ou null pour éviter l'erreur toLowerCase()
    if (persona === undefined || persona === null) {
      logger.warn('mockGetJourneysByPersona a été appelé avec une persona undefined ou null');
      return Promise.resolve([]);
    }
    
    // Filtre les journeys par type de profil (insensible à la casse)
    const filteredJourneys = mockJourneys.filter(journey => {
      // Vérifier que journey.metadata.profileType existe avant d'appeler toLowerCase
      const profileType = journey.metadata.profileType;
      if (!profileType) return false;
      
      return profileType.toLowerCase() === persona.toLowerCase();
    });
    
    return Promise.resolve(filteredJourneys);
  });
};

/**
 * Crée un mock pour getJourneyBySlug
 */
export const createMockGetJourneyBySlug = () => {
  return jest.fn().mockImplementation((slug: string | undefined | null) => {
    // Vérifier si slug est undefined ou null
    if (slug === undefined || slug === null || slug === '') {
      return Promise.resolve(null);
    }
    
    const journeys = getTestJourneys();
    const journey = journeys.find((journey) => journey.metadata.slug === slug) || null;
    return Promise.resolve(journey);
  });
};

/**
 * Crée un mock pour isPhaseUnlocked
 */
export const createMockIsPhaseUnlocked = () => {
  return jest.fn().mockImplementation(
    (phase: any, userXp: number, userNfts: string[] | undefined | null) => {
      // Si la phase n'a pas de propriété locked, on considère qu'elle est déverrouillée
      if (phase.locked === undefined || phase.locked === null) {
        return true;
      }
      
      // Si la phase est explicitement verrouillée et qu'il n'y a pas d'autres conditions
      // de déverrouillage (xpReward ou nftReward), alors elle reste verrouillée
      if (phase.locked === true && !phase.xpReward && !phase.nftReward) {
        return false;
      }
      
      // Si la phase n'est pas verrouillée explicitement, elle est déverrouillée
      if (phase.locked === false) {
        return true;
      }
      
      // Vérifie si l'utilisateur a assez d'XP
      if (phase.xpReward && userXp < phase.xpReward) {
        return false;
      }
      
      // Vérifie si l'utilisateur possède le NFT requis
      // Si userNfts est undefined ou null, on considère que l'utilisateur ne possède pas le NFT
      if (phase.nftReward) {
        if (!userNfts) {
          return false;
        }
        if (!userNfts.includes(phase.nftReward)) {
          return false;
        }
      }
      
      return true;
    }
  );
};

/**
 * Crée tous les mocks pour les services de journey
 */
export const createJourneyServiceMocks = () => {
  return {
    mockGetAllJourneys: createMockGetAllJourneys(),
    mockGetJourneysByPersona: createMockGetJourneysByPersona(),
    mockGetJourneyBySlug: createMockGetJourneyBySlug(),
    mockIsPhaseUnlocked: createMockIsPhaseUnlocked()
  };
};

/**
 * Réinitialise tous les mocks des services de journey
 */
export const resetJourneyServiceMocks = (mocks: ReturnType<typeof createJourneyServiceMocks>) => {
  Object.values(mocks).forEach(mock => mock.mockReset());
};
