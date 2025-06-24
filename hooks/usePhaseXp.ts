import { useState, useCallback } from 'react';
import { useStore } from '../utils/store';
import { usePhaseData } from './usePhaseData';

export const usePhaseXp = () => {
  const { totalXP, addXP } = useStore();
  const { getPhaseData } = usePhaseData();
  const [showXpGain, setShowXpGain] = useState(false);

  const addXp = useCallback(
    (phaseIndex: number) => {
      const phase = getPhaseData(phaseIndex);
      addXP(phase.xpReward);
      setShowXpGain(true);
      setTimeout(() => setShowXpGain(false), 3000);
    },
    [getPhaseData, addXP]
  );

  return {
    xp: totalXP,
    addXp,
    showXpGain,
    setShowXpGain,
  };
};
