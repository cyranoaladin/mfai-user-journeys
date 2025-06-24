/**
 * Fichier d'adaptateurs pour faciliter la transition entre les anciennes et nouvelles interfaces
 * Ce fichier permet de maintenir la compatibilité pendant la refactorisation
 */

import { JourneyPhase, JourneyReward } from '../types/journey';

// Adaptateur pour convertir les phases du système existant vers le format JourneyPhase
export function adaptPhaseToJourneyPhase(phase: any): JourneyPhase {
  return {
    name: phase.name || '',
    title: phase.title || phase.name || '',
    content: phase.content || '',
    icon: phase.icon || '',
    description: phase.description || '',
    mission: phase.mission || '',
    xpReward: phase.xpReward || 0,
    nftReward: phase.nftReward,
    locked: phase.locked,
    duration: phase.duration,
  };
}

// Adaptateur pour convertir les récompenses du système existant vers le format JourneyReward
export function adaptRewardToJourneyReward(reward: any): JourneyReward {
  return {
    milestone: reward.milestone || reward.title || '',
    proof: reward.proof || reward.description || '',
    utility: reward.utility || '',
  };
}

// Interface pour les phases utilisées dans le système de timeline
export interface TimelinePhase {
  name: string;
  title?: string;
  icon?: string;
}

// Interface pour les phases utilisées dans le système de phases
export interface SystemPhase {
  name: string;
  title: string;
  description: string;
  mission?: string;
  xpReward?: number;
  icon?: string;
  nftReward?: string;
  locked?: boolean;
  duration?: string;
}

// Adaptateur pour convertir JourneyPhase en TimelinePhase
export function adaptToTimelinePhase(phase: JourneyPhase): TimelinePhase {
  return {
    name: phase.name || phase.title,
    title: phase.title,
    icon: '',
  };
}

// Adaptateur pour convertir JourneyPhase en SystemPhase
export function adaptToSystemPhase(phase: JourneyPhase): SystemPhase {
  return {
    name: phase.name || phase.title,
    title: phase.title,
    description: phase.description,
    mission: phase.mission,
    xpReward: phase.xpReward,
    icon: phase.icon || '',
    nftReward: phase.nftReward,
    locked: phase.locked,
    duration: phase.duration,
  };
}

// Fonction utilitaire pour s'assurer qu'un tableau de phases est complet
export function ensureCompletePhases(phases: Partial<JourneyPhase>[]): JourneyPhase[] {
  return phases.map(phase => ({
    name: phase.name || phase.title || '',
    title: phase.title || phase.name || '',
    content: phase.content || '',
    icon: phase.icon || '',
    description: phase.description || '',
    mission: phase.mission || '',
    xpReward: phase.xpReward || 0,
    nftReward: phase.nftReward,
    locked: phase.locked,
    duration: phase.duration,
  }));
}
