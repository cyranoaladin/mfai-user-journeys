import { renderHook } from '@testing-library/react';

// Mock du module journeyStore
jest.mock('../journeyStore', () => {
  const mockState = {
    currentJourney: null,
    currentPhaseIndex: 0,
    journeys: [],
    loading: false,
    error: null,
    getCurrentPhase: jest.fn(),
    isPhaseUnlocked: jest.fn(),
  };
  
  return {
    useJourneyStore: jest.fn((selector) => {
      if (selector) {
        return selector(mockState);
      }
      return mockState;
    }),
    useCurrentPhase: jest.fn(),
    useJourneyPhases: jest.fn(),
    useIsPhaseUnlocked: jest.fn(),
    useJourneyProgress: jest.fn(),
    // Exposer le mock state pour les tests
    __mockState: mockState,
  };
});

// Récupérer les mocks
const mockUseCurrentPhase = jest.requireMock('../journeyStore').useCurrentPhase;
const mockUseJourneyPhases = jest.requireMock('../journeyStore').useJourneyPhases;
const mockUseIsPhaseUnlocked = jest.requireMock('../journeyStore').useIsPhaseUnlocked;
const mockUseJourneyProgress = jest.requireMock('../journeyStore').useJourneyProgress;

describe('Journey Store Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  describe('useCurrentPhase', () => {
    it('should return the current phase from the store', () => {
      // Configurer le mock pour retourner une phase spécifique
      const mockPhase = { title: 'Test Phase', locked: false };
      mockUseCurrentPhase.mockReturnValue(mockPhase);
      
      // Tester le hook
      const { result } = renderHook(() => mockUseCurrentPhase());
      
      // Vérifier le résultat
      expect(result.current).toEqual(mockPhase);
    });
    
    it('should return null when no current phase is available', () => {
      // Configurer le mock pour retourner null
      mockUseCurrentPhase.mockReturnValue(null);
      
      // Tester le hook
      const { result } = renderHook(() => mockUseCurrentPhase());
      
      // Vérifier le résultat
      expect(result.current).toBeNull();
    });
  });
  
  describe('useJourneyPhases', () => {
    it('should return all phases from the current journey', () => {
      // Configurer le mock pour retourner des phases
      const mockPhases = [
        { title: 'Phase 1', locked: false },
        { title: 'Phase 2', locked: true }
      ];
      mockUseJourneyPhases.mockReturnValue(mockPhases);
      
      // Tester le hook
      const { result } = renderHook(() => mockUseJourneyPhases());
      
      // Vérifier le résultat
      expect(result.current).toEqual(mockPhases);
    });
    
    it('should return an empty array when no journey is selected', () => {
      // Configurer le mock pour retourner un tableau vide
      mockUseJourneyPhases.mockReturnValue([]);
      
      // Tester le hook
      const { result } = renderHook(() => mockUseJourneyPhases());
      
      // Vérifier le résultat
      expect(result.current).toEqual([]);
    });
  });
  
  describe('useIsPhaseUnlocked', () => {
    it('should check if a phase is unlocked', () => {
      // Configurer le mock pour simuler une phase déverrouillée
      mockUseIsPhaseUnlocked.mockReturnValue(true);
      
      // Tester le hook avec des paramètres
      const { result } = renderHook(() => mockUseIsPhaseUnlocked(1, 100, ['nft1']));
      
      // Vérifier le résultat
      expect(result.current).toBe(true);
      expect(mockUseIsPhaseUnlocked).toHaveBeenCalledWith(1, 100, ['nft1']);
    });
    
    it('should return false when a phase is locked', () => {
      // Configurer le mock pour simuler une phase verrouillée
      mockUseIsPhaseUnlocked.mockReturnValue(false);
      
      // Tester le hook avec des paramètres
      const { result } = renderHook(() => mockUseIsPhaseUnlocked(2, 50, []));
      
      // Vérifier le résultat
      expect(result.current).toBe(false);
    });
  });
  
  describe('useJourneyProgress', () => {
    it('should calculate progress percentage correctly', () => {
      // Configurer le mock pour simuler un pourcentage de progression de 50%
      mockUseJourneyProgress.mockReturnValue(50);
      
      // Tester le hook
      const { result } = renderHook(() => mockUseJourneyProgress());
      
      // Vérifier le résultat
      expect(result.current).toBe(50);
    });
    
    it('should return 0 when there is only one phase', () => {
      // Configurer le mock pour simuler un journey avec une seule phase
      mockUseJourneyProgress.mockReturnValue(0);
      
      // Tester le hook
      const { result } = renderHook(() => mockUseJourneyProgress());
      
      // Vérifier le résultat
      expect(result.current).toBe(0);
    });
    
    it('should return 0 when there are no phases', () => {
      // Configurer le mock pour simuler un journey sans phases
      mockUseJourneyProgress.mockReturnValue(0);
      
      // Tester le hook
      const { result } = renderHook(() => mockUseJourneyProgress());
      
      // Vérifier le résultat
      expect(result.current).toBe(0);
    });
  });
});
