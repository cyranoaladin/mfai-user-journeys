import { useCallback } from 'react';

const PHASE_COLORS = {
  Cognitive: 'from-[#9945FF] to-[#14F195]',
  Synaptic: 'from-[#14F195] to-[#9945FF]',
  Neural: 'from-[#9945FF] to-[#14F195]',
  Activation: 'from-[#14F195] to-[#9945FF]',
  Amplification: 'from-[#9945FF] to-[#14F195]',
};

export const usePhaseColors = () => {
  const getPhaseColor = useCallback((phaseIndex: number) => {
    const phaseNames = ['Cognitive', 'Synaptic', 'Neural', 'Activation', 'Amplification'];
    const phaseName = phaseNames[phaseIndex] || 'Cognitive';
    return PHASE_COLORS[phaseName as keyof typeof PHASE_COLORS] || PHASE_COLORS.Cognitive;
  }, []);

  return {
    getPhaseColor,
  };
};
