import { useCallback } from 'react';
import { useStore } from '../utils/store';

export const usePhaseNavigation = () => {
  const { currentPhase, setCurrentPhase } = useStore();

  const handleNavigation = useCallback(
    (phaseIndex: number) => {
      if (phaseIndex >= 0) {
        setCurrentPhase(phaseIndex);
      }
    },
    [setCurrentPhase]
  );

  return {
    handleNavigation,
    currentPhase,
  };
};
