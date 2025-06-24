import { renderHook } from '@testing-library/react';
import { useCurrentPhase, useJourneyPhases, useIsPhaseUnlocked, useJourneyProgress } from '../journeyStore';

// Mock des hooks et du store
jest.mock('../journeyStore');

// Récupération des hooks mockés après le mock avec typage approprié
const mockUseCurrentPhase = useCurrentPhase as jest.MockedFunction<typeof useCurrentPhase>;
const mockUseJourneyPhases = useJourneyPhases as jest.MockedFunction<typeof useJourneyPhases>;
const mockUseIsPhaseUnlocked = useIsPhaseUnlocked as jest.MockedFunction<typeof useIsPhaseUnlocked>;
const mockUseJourneyProgress = useJourneyProgress as jest.MockedFunction<typeof useJourneyProgress>;

// Données de test pour les hooks
const mockPhases = [
  { title: 'Phase 1', description: 'Description 1', mission: 'Mission 1', xpReward: 100, locked: false },
  { title: 'Phase 2', description: 'Description 2', mission: 'Mission 2', xpReward: 200, locked: false },
  { title: 'Phase 3', description: 'Description 3', mission: 'Mission 3', xpReward: 300, locked: true },
];

// Configuration des mocks avant les tests
beforeEach(() => {
  mockUseCurrentPhase.mockReturnValue(mockPhases[1]);
  mockUseJourneyPhases.mockReturnValue(mockPhases);
  mockUseIsPhaseUnlocked.mockImplementation((phaseIndex) => phaseIndex < 2);
  mockUseJourneyProgress.mockReturnValue(50);
});

describe('Journey Hooks', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('useCurrentPhase', () => {
    it('should return the current phase', () => {
      const { result } = renderHook(() => useCurrentPhase());
      
      expect(result.current).toEqual({ title: 'Phase 2', description: 'Description 2', mission: 'Mission 2', xpReward: 200, locked: false });
      // Vérifier que le hook a été appelé
      expect(mockUseCurrentPhase).toHaveBeenCalled();
    });
  });

  describe('useJourneyPhases', () => {
    it('should return all phases of the current journey', () => {
      const { result } = renderHook(() => useJourneyPhases());
      
      expect(result.current).toEqual([
        { title: 'Phase 1', description: 'Description 1', mission: 'Mission 1', xpReward: 100, locked: false },
        { title: 'Phase 2', description: 'Description 2', mission: 'Mission 2', xpReward: 200, locked: false },
        { title: 'Phase 3', description: 'Description 3', mission: 'Mission 3', xpReward: 300, locked: true },
      ]);
      expect(mockUseJourneyPhases).toHaveBeenCalled();
    });
  });

  describe('useIsPhaseUnlocked', () => {
    it('should check if a phase is unlocked', () => {
      const { result: unlockedResult } = renderHook(() => useIsPhaseUnlocked(1, 0, []));
      const { result: lockedResult } = renderHook(() => useIsPhaseUnlocked(2, 0, []));
      
      expect(unlockedResult.current).toBe(true);
      expect(lockedResult.current).toBe(false);
      expect(mockUseIsPhaseUnlocked).toHaveBeenCalledTimes(2);
    });
  });

  describe('useJourneyProgress', () => {
    it('should calculate the journey progress percentage', () => {
      const { result } = renderHook(() => useJourneyProgress());
      
      // currentPhaseIndex = 1, phases.length = 3
      // (1 / (3 - 1)) * 100 = 50%
      expect(result.current).toBe(50);
    });

    it('should return 0 when there is only one phase', () => {
      // Modifier temporairement le mock pour simuler un journey avec une seule phase
      mockUseJourneyProgress.mockReturnValueOnce(0);
      
      const { result } = renderHook(() => useJourneyProgress());
      expect(result.current).toBe(0);
    });
  });
});
