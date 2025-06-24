/**
 * Tests pour le service journeyService
 * 
 * Ces tests valident le comportement des fonctions du service journeyService
 * en utilisant les mocks standardisés.
 */

import { JourneyContent, JourneyPhase, PersonaType } from '../../types';
import { mockJourneys, mockJourneyPhases } from '../../tests/mocks/journeyMocks';

// Mock des modules externes avant d'importer le service
jest.mock('@/utils/journeyData', () => ({
  journeys: [
    {
      persona: 'Investor',
      label: 'Test Journey',
      description: 'Un journey de test',
      icon: 'icon-test',
      tagline: 'Tagline du journey',
      phases: [
        {
          name: 'phase-1',
          title: 'Phase 1',
          description: 'Description de la phase 1',
          mission: 'Mission de la phase 1',
          xpReward: 100,
          locked: false,
          duration: '30 minutes',
          content: 'Contenu de la phase 1'
        }
      ],
      rewards: ['Récompense 1'],
      whyItMatters: 'Pourquoi ce journey est important',
      finalRole: 'Rôle final après complétion'
    }
  ]
}));

// Mock pour markdownParser
const mockGetAllJourneys = jest.fn();
jest.mock('@/utils/markdownParser', () => ({
  getAllJourneys: mockGetAllJourneys
}));

// Mock de la variable isClient
let mockIsClient = true;

// Mock du module journeyService en réexportant le module original
// mais en remplaçant la constante isClient
jest.mock('../journeyService', () => {
  // Récupérer le module original
  const originalModule = jest.requireActual('../journeyService');
  
  // Créer un nouvel objet qui contient toutes les exportations originales
  const mockedModule = { ...originalModule };
  
  // Redéfinir la propriété isClient pour utiliser notre variable mockée
  Object.defineProperty(mockedModule, 'isClient', {
    get: () => mockIsClient
  });
  
  return mockedModule;
});

// Importer après les mocks
const { 
  getAllJourneys, 
  getJourneysByPersona, 
  getJourneyBySlug,
  isPhaseUnlocked,
  getAllJourneysMetadata 
} = require('../journeyService');

describe('journeyService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllJourneys', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      // Simuler l'environnement client pour simplifier les tests
      mockIsClient = true;
    });
    
    it('devrait retourner les journeys statiques côté client', async () => {
      const result = await getAllJourneys();
      expect(result.length).toBeGreaterThan(0);
    });
    
    // Note: Les tests côté serveur sont difficiles à implémenter dans ce contexte
    // car la variable isClient est définie dans le module et non exportée.
    // Dans un environnement réel, il faudrait utiliser des tests d'intégration
    // ou modifier l'architecture pour faciliter les tests.
  });

  describe('getJourneysByPersona', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      // Simuler l'environnement client pour simplifier les tests
      mockIsClient = true;
    });
    
    it('devrait filtrer les journeys par profileType', async () => {
      const journeys = await getJourneysByPersona('Investor' as PersonaType);
      expect(journeys.length).toBeGreaterThan(0);
      journeys.forEach(journey => {
        expect(journey.metadata.profileType?.toLowerCase()).toBe('investor');
      });
    });

    it('devrait retourner un tableau vide si aucun journey ne correspond', async () => {
      const journeys = await getJourneysByPersona('Unknown' as PersonaType);
      expect(journeys).toEqual([]);
    });
    
    it('devrait gérer les cas où persona est undefined', async () => {
      const journeys = await getJourneysByPersona(undefined as unknown as PersonaType);
      expect(journeys).toEqual([]);
    });
    
    it('devrait gérer les cas où persona est null', async () => {
      const journeys = await getJourneysByPersona(null as unknown as PersonaType);
      expect(journeys).toEqual([]);
    });
    
    // Note: Les tests d'erreur sont difficiles à implémenter dans ce contexte
    // car les mocks sont déjà configurés pour retourner des données statiques.
    // Dans un environnement réel, il faudrait utiliser des tests d'intégration
    // pour tester les erreurs de récupération des données.
  });

  describe('getJourneyBySlug', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      // Simuler l'environnement client pour simplifier les tests
      mockIsClient = true;
    });
    
    it('devrait retourner un journey par son slug côté client', async () => {
      // Test côté client avec un slug qui existe dans les données statiques
      const result = await getJourneyBySlug('investor');
      expect(result).not.toBeNull();
      expect(result?.metadata.slug).toBe('investor');
    });

    it('devrait retourner null si aucun journey ne correspond', async () => {
      const result = await getJourneyBySlug('non-existent');
      expect(result).toBeNull();
    });
    
    it('devrait gérer les cas où slug est vide', async () => {
      const result = await getJourneyBySlug('');
      expect(result).toBeNull();
    });
    
    // Ces tests fonctionnent car getJourneyBySlug gère implicitement les cas undefined/null
    // en retournant null quand aucun journey ne correspond
    
    it('devrait gérer les cas où slug est undefined', async () => {
      const result = await getJourneyBySlug(undefined as unknown as string);
      expect(result).toBeNull();
    });
    
    it('devrait gérer les cas où slug est null', async () => {
      const result = await getJourneyBySlug(null as unknown as string);
      expect(result).toBeNull();
    });
    
    // Note: Les tests côté serveur sont difficiles à implémenter dans ce contexte
    // car la variable isClient est définie dans le module et non exportée.
    // Dans un environnement réel, il faudrait utiliser des tests d'intégration
    // ou modifier l'architecture pour faciliter les tests.
  });

  describe('getAllJourneysMetadata', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      // Simuler l'environnement client pour simplifier les tests
      mockIsClient = true;
    });
    
    it('devrait retourner les métadonnées de tous les journeys', async () => {
      const result = await getAllJourneysMetadata();
      expect(result.length).toBeGreaterThan(0);
      
      // Vérifier que chaque élément a les propriétés attendues d'une métadonnée
      result.forEach(metadata => {
        expect(metadata).toHaveProperty('title');
        expect(metadata).toHaveProperty('slug');
        expect(metadata).toHaveProperty('profileType');
      });
    });
  });

  describe('isPhaseUnlocked', () => {
    it('devrait retourner true pour une phase non verrouillée', () => {
      const phase = { title: 'Phase 1', locked: false };
      expect(isPhaseUnlocked(phase, 0, [])).toBe(true);
    });

    it('devrait retourner false pour une phase verrouillée par locked=true', () => {
      const phase = { title: 'Phase 2', locked: true };
      expect(isPhaseUnlocked(phase, 0, [])).toBe(false);
    });

    it('devrait retourner false pour une phase verrouillée par exigence XP', () => {
      const phase = { title: 'Phase 3', locked: true, xpReward: 100 };
      expect(isPhaseUnlocked(phase, 50, [])).toBe(false);
    });

    it('devrait retourner true pour une phase avec exigence XP satisfaite', () => {
      const phase = { title: 'Phase 4', locked: true, xpReward: 100 };
      expect(isPhaseUnlocked(phase, 100, [])).toBe(true);
    });

    it('devrait retourner false pour une phase verrouillée par exigence NFT', () => {
      const phase = { title: 'Phase 5', locked: true, nftReward: 'nft-1' };
      expect(isPhaseUnlocked(phase, 0, [])).toBe(false);
    });

    it('devrait retourner true pour une phase avec exigence NFT satisfaite', () => {
      const phase = { title: 'Phase 6', locked: true, nftReward: 'nft-1' };
      expect(isPhaseUnlocked(phase, 0, ['nft-1'])).toBe(true);
    });
    
    it('devrait retourner true pour une phase avec exigence XP et NFT satisfaites', () => {
      const phase = { title: 'Phase 7', locked: true, xpReward: 100, nftReward: 'nft-1' };
      expect(isPhaseUnlocked(phase, 100, ['nft-1'])).toBe(true);
    });
    
    it('devrait retourner false pour une phase avec exigence XP satisfaite mais NFT non satisfaite', () => {
      const phase = { title: 'Phase 8', locked: true, xpReward: 100, nftReward: 'nft-1' };
      expect(isPhaseUnlocked(phase, 100, ['nft-2'])).toBe(false);
    });
    
    it('devrait retourner false pour une phase avec exigence NFT satisfaite mais XP non satisfaite', () => {
      const phase = { title: 'Phase 9', locked: true, xpReward: 100, nftReward: 'nft-1' };
      expect(isPhaseUnlocked(phase, 50, ['nft-1'])).toBe(false);
    });
    
    it('devrait gérer les cas où userNfts est undefined', () => {
      const phase = { title: 'Phase 10', locked: true, nftReward: 'nft-1' };
      expect(isPhaseUnlocked(phase, 0, undefined as unknown as string[])).toBe(false);
    });
    
    it('devrait gérer les cas où userNfts est null', () => {
      const phase = { title: 'Phase 11', locked: true, nftReward: 'nft-1' };
      expect(isPhaseUnlocked(phase, 0, null as unknown as string[])).toBe(false);
    });
  });
});
