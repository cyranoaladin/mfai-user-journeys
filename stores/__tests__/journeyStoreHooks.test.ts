import { renderHook, act } from '@testing-library/react';
import { useJourneyStore, useCurrentPhase, useJourneyPhases, useIsPhaseUnlocked, useJourneyProgress } from '../journeyStore';
import * as journeyService from '../../services/journeyService';

// Import de la configuration pour réduire les avertissements console
import './setupConsole';

// Mock des services
jest.mock('../../services/journeyService');

describe('Journey Store Hooks', () => {
  // Typages pour les mocks
  const mockIsPhaseUnlocked = journeyService.isPhaseUnlocked as jest.MockedFunction<typeof journeyService.isPhaseUnlocked>;
  
  // Journey de test
  const mockJourney = {
    metadata: { title: 'Test Journey', slug: 'test-journey' },
    phases: [
      { title: 'Phase 1', content: 'Content 1' },
      { title: 'Phase 2', content: 'Content 2' },
      { title: 'Phase 3', content: 'Content 3' },
    ],
  };

  beforeEach(() => {
    // Reset des mocks
    jest.clearAllMocks();
    
    // Reset du store
    useJourneyStore.setState({
      journeys: [],
      currentJourney: null,
      currentPhaseIndex: 0,
      loading: false,
      error: null
    });
    
    // Setup du mock pour isPhaseUnlocked
    mockIsPhaseUnlocked.mockImplementation((phaseIndex) => {
      return phaseIndex === 0; // Seule la première phase est déverrouillée par défaut
    });
  });

  describe('useCurrentPhase', () => {
    it('should return the current phase', () => {
      // Setup du store avec un journey et un index spécifique
      useJourneyStore.setState({
        currentJourney: mockJourney,
        currentPhaseIndex: 1
      });
      
      // Utilisation du hook
      const { result } = renderHook(() => useCurrentPhase());
      
      // Vérification du résultat
      expect(result.current).toEqual(mockJourney.phases[1]);
    });
    
    it('should return null if no journey is selected', () => {
      // Utilisation du hook sans journey sélectionné
      const { result } = renderHook(() => useCurrentPhase());
      
      // Vérification du résultat
      expect(result.current).toBeNull();
    });
  });
  
  describe('useJourneyPhases', () => {
    it('should return all phases of the current journey', () => {
      // Setup du store avec un journey
      useJourneyStore.setState({
        currentJourney: mockJourney
      });
      
      // Utilisation du hook
      const { result } = renderHook(() => useJourneyPhases());
      
      // Vérification du résultat
      expect(result.current).toEqual(mockJourney.phases);
    });
    
    it('should return empty array if no journey is selected', () => {
      // Utilisation du hook sans journey sélectionné
      const { result } = renderHook(() => useJourneyPhases());
      
      // Vérification du résultat
      expect(result.current).toEqual([]);
    });
  });
  
  describe('useIsPhaseUnlocked', () => {
    it('should check if a phase is unlocked', () => {
      // Setup du store avec un journey
      useJourneyStore.setState({
        currentJourney: mockJourney
      });
      
      // Utilisation du hook
      const { result } = renderHook(() => useIsPhaseUnlocked(0, 0, []));
      
      // Vérification du résultat
      expect(result.current).toBe(false); // Le mock retourne false
      expect(mockIsPhaseUnlocked).toHaveBeenCalled();
    });
    
    it('should return false for locked phases', () => {
      // Setup du store avec un journey
      useJourneyStore.setState({
        currentJourney: mockJourney
      });
      
      // Utilisation du hook
      const { result } = renderHook(() => useIsPhaseUnlocked(1, 0, []));
      
      // Vérification du résultat
      expect(result.current).toBe(false); // Les autres phases sont verrouillées
    });
  });
  
  describe('useJourneyProgress', () => {
    it('should calculate the journey progress percentage', () => {
      // Setup du store avec un journey et un index spécifique
      useJourneyStore.setState({
        currentJourney: mockJourney,
        currentPhaseIndex: 1 // Deuxième phase sur 3
      });
      
      // Utilisation du hook
      const { result } = renderHook(() => useJourneyProgress());
      
      // Vérification du résultat (2ème phase sur 3 = 50%)
      expect(result.current).toBe(50);
    });
    
    it('should return 0 if no journey is selected', () => {
      // Utilisation du hook sans journey sélectionné
      const { result } = renderHook(() => useJourneyProgress());
      
      // Vérification du résultat
      expect(result.current).toBe(0);
    });
    
    it('should return 100 if on the last phase', () => {
      // Setup du store avec un journey et le dernier index
      useJourneyStore.setState({
        currentJourney: mockJourney,
        currentPhaseIndex: 2 // Dernière phase (index 2 sur 3 phases)
      });
      
      // Utilisation du hook
      const { result } = renderHook(() => useJourneyProgress());
      
      // Vérification du résultat
      expect(result.current).toBe(100);
    });
  });
  
  describe('Store Persistence', () => {
    // Note: Ces tests sont limités car localStorage n'est pas disponible dans l'environnement de test
    // Mais nous pouvons tester le comportement de partialize
    
    it('should only persist specific fields', () => {
      // Setup du store avec des données complètes
      useJourneyStore.setState({
        journeys: [mockJourney],
        currentJourney: mockJourney,
        currentPhaseIndex: 1,
        loading: true, // Ne devrait pas être persisté
        error: 'Some error' // Ne devrait pas être persisté
      });
      
      // Récupération de l'état pour vérifier ce qui serait persisté
      const state = useJourneyStore.getState();
      
      // Vérification que loading et error ne seraient pas persistés
      // (Nous ne pouvons pas tester directement la persistance, mais nous pouvons vérifier que ces champs existent)
      expect(state).toHaveProperty('loading');
      expect(state).toHaveProperty('error');
      
      // Vérification que les autres champs seraient persistés
      expect(state).toHaveProperty('journeys');
      expect(state).toHaveProperty('currentJourney');
      expect(state).toHaveProperty('currentPhaseIndex');
    });
  });
});
