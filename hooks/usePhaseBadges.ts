import { useCallback } from 'react';
import { useStore } from '../utils/store';

export const usePhaseBadges = () => {
  const { ownedNFTs, addNFT } = useStore();

  const checkBadges = useCallback(
    (phaseIndex: number) => {
      const badgeId = `phase-${phaseIndex}-badge`;
      if (!ownedNFTs.includes(badgeId)) {
        addNFT(badgeId);
      }
    },
    [ownedNFTs, addNFT]
  );

  const unlockedBadges = useCallback(() => {
    return ownedNFTs.filter(nftId => nftId.startsWith('phase-'));
  }, [ownedNFTs]);

  return {
    checkBadges,
    unlockedBadges,
  };
};
