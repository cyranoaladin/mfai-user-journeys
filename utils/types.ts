/**
 * Types centralisés pour l'application
 * Ce fichier réexporte tous les types depuis le répertoire types/
 * pour maintenir la compatibilité avec le code existant
 */

// Réexporter tous les types depuis types/journey.ts
export * from '../types/journey';

// Import types from journeyData.ts pour la compatibilité avec le code existant
// mais avec des noms différents pour éviter les conflits
import {
  Journey as JourneyFromData,
  JourneyPhase as JourneyPhaseFromData,
} from '../utils/journeyData';

// Re-export with type keyword for TypeScript mais avec des noms différents
export type JourneyData = JourneyFromData;
export type JourneyPhaseData = JourneyPhaseFromData;

// Additional types for the application
export interface JourneyWithLock extends JourneyFromData {
  phases: (JourneyPhaseFromData & { locked?: boolean })[];
}
