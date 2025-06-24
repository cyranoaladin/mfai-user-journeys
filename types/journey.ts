/**
 * Types centralisés pour les journeys
 * Ce fichier contient toutes les définitions de types liées aux journeys
 * pour assurer la cohérence dans toute l'application
 */

// Types de base pour les journeys
// Compatible avec markdownParser.ts et [slug].tsx
export interface JourneyMetadata {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  profileType: string;
  target: string;
  missionType?: string;
  slug: string;
  tagline: string;
}

// Type for phases compatible with journeyData.ts, markdownParser.ts and [slug].tsx
export interface JourneyPhase {
  name?: string;
  title: string;
  description: string;
  mission?: string;
  xpReward?: number;
  xp?: number;
  reward?: string;
  nftReward?: string;
  locked?: boolean;
  duration?: string;
  content?: string;
  icon?: string;
  estimatedTime?: string;
  // Indique à quelle étape du Cognitive Activation Protocol™ cette phase correspond
  protocolPhase?: 'Learn' | 'Build' | 'Prove' | 'Activate' | 'Scale' | 'Cognitive' | 'Synaptic' | 'Neural' | 'Activation' | 'Amplification';
}

// Type pour les récompenses
export interface JourneyReward {
  milestone: string;
  proof: string;
  utility: string;
}

// Type principal pour le contenu d'un journey
// Compatible avec markdownParser.ts
export interface JourneyContent {
  metadata: JourneyMetadata;
  phases: JourneyPhase[];
  callToAction: string[];
  rewards: JourneyReward[];
  whyItMatters: string;
  finalRole: string;
}

// Types pour la gestion du feedback
export interface PhaseFeedbackData {
  phaseIndex: number;
  rating: number;
  comment: string;
  timestamp: number;
}

export interface JourneyFeedback {
  [journeySlug: string]: {
    [phaseIndex: number]: PhaseFeedbackData;
  };
}

// Types pour les props des composants
export interface JourneyDetailPageProps {
  journey: JourneyContent | null;
}

// Types pour les réponses API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface ProofData {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  tags: string[];
}

export interface JourneyData {
  metadata: JourneyMetadata;
  phases: JourneyPhase[];
  callToAction: string[];
  rewards: {
    milestone: string;
    proof: string;
    utility: string;
  }[];
  whyItMatters: string;
  finalRole: string;
}

export interface Proof {
  id: string;
  title: string;
  description: string;
  isUnlocked: boolean;
}

export interface Journey {
  id: string;
  title: string;
  description: string;
  phases: Phase[];
  rewards: Proof[];
  whyItMatters?: string;
  finalRole?: string;
}

export interface Phase {
  id: string;
  title: string;
  description: string;
  order: number;
  isComplete: boolean;
}
