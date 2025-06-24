import { useCallback } from 'react';
import { usePhaseData } from './usePhaseData';

export const usePhaseDescription = () => {
  const { getPhaseData } = usePhaseData();

  const getDescription = useCallback(
    (phaseIndex: number) => {
      const phase = getPhaseData(phaseIndex);
      return phase.description;
    },
    [getPhaseData]
  );

  return {
    getDescription,
  };
};
