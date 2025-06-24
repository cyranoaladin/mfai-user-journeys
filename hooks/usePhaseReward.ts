import { useState, useCallback } from 'react';
import { useStore } from '../utils/store';
import { usePhaseData } from './usePhaseData';

export const usePhaseReward = () => {
  const { addNFT } = useStore();
  const { getPhaseData } = usePhaseData();
  const [showRewardNotification, setShowRewardNotification] = useState(false);
  const [rewardMessage, setRewardMessage] = useState('');

  const claimReward = useCallback(
    (phaseIndex: number) => {
      const phase = getPhaseData(phaseIndex);
      if (phase.nftReward) {
        addNFT(phase.nftReward);
        setRewardMessage(`Félicitations ! Vous avez débloqué le badge ${phase.nftReward}`);
        setShowRewardNotification(true);
        setTimeout(() => setShowRewardNotification(false), 3000);
      }
    },
    [getPhaseData, addNFT]
  );

  return {
    claimReward,
    showRewardNotification,
    rewardMessage,
  };
};
