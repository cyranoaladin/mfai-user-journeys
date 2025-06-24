import { useCallback } from 'react';
import { useStore } from '../utils/store';
import { useJourneyStore } from '@/stores';

// Cognitive Activation Protocol™: Learn → Build → Prove → Activate → Scale
// XP nécessaire pour compléter tout le parcours
const TOTAL_XP_REQUIRED = 500; // 100 XP par phase en moyenne

export const usePhaseProgress = () => {
  const { totalXP } = useStore();
  const { currentPhaseIndex } = useJourneyStore();
  const phases = useJourneyStore(state => state.currentJourney?.phases || []);

  // Mise à jour de la progression (peut être utilisé pour des actions supplémentaires)
  const updateProgress = useCallback(() => {
    // La progression est automatiquement mise à jour via le store
    // Cette fonction peut être étendue pour des actions supplémentaires
  }, []);

  // Calcul de la progression basé sur l'XP et la position dans le parcours
  const getProgress = useCallback(() => {
    // Si pas de phases ou pas d'XP, retourner 0
    if (!phases.length || totalXP === undefined) return 0;
    
    // Calculer la progression basée sur l'XP accumulée
    const xpProgress = Math.min((totalXP / TOTAL_XP_REQUIRED) * 100, 100);
    
    // Calculer la progression basée sur la position dans le parcours
    const phaseProgress = phases.length > 1 
      ? (currentPhaseIndex / (phases.length - 1)) * 100 
      : 0;
    
    // Utiliser la valeur la plus élevée entre les deux pour une meilleure expérience utilisateur
    return Math.max(xpProgress, phaseProgress);
  }, [totalXP, currentPhaseIndex, phases]);

  return {
    updateProgress,
    getProgress,
    totalXP,
  };
};
