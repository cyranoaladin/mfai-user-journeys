import { useCallback } from 'react';
import { useStore } from '../utils/store';

export const usePhaseBalance = () => {
  const { mfaiBalance } = useStore();

  const updateBalance = useCallback(async () => {
    // Ici, nous pourrions implémenter la logique pour récupérer le solde réel
    // Pour l'instant, nous utilisons juste le solde stocké localement
    return mfaiBalance;
  }, [mfaiBalance]);

  return {
    mfaiBalance,
    updateBalance,
  };
};
