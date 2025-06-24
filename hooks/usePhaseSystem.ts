import { useCallback } from 'react';
import { useStore } from '../utils/store';

export const usePhaseSystem = () => {
  const { currentPhase, setCurrentPhase } = useStore();

  const goToNextPhase = useCallback(() => {
    if (currentPhase !== undefined) {
      setCurrentPhase(currentPhase + 1);
    }
  }, [currentPhase, setCurrentPhase]);

  const goToPreviousPhase = useCallback(() => {
    if (currentPhase !== undefined && currentPhase > 0) {
      setCurrentPhase(currentPhase - 1);
    }
  }, [currentPhase, setCurrentPhase]);

  const canNavigate = useCallback(
    (direction: 'next' | 'prev') => {
      if (currentPhase === undefined) return false;
      if (direction === 'next') return true;
      if (direction === 'prev') return currentPhase > 0;
      return false;
    },
    [currentPhase]
  );

  return {
    goToNextPhase,
    goToPreviousPhase,
    canNavigate,
  };
};
