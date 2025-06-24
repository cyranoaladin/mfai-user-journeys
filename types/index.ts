/**
 * Centralized types for the MFAI User Journeys application
 * 
 * This file groups all interfaces and types used in the application
 * to ensure consistency and standardization of types.
 */

/**
 * Types of personas available in the application
 */
export type PersonaType = 'Builder' | 'Creator' | 'Strategist' | 'Investor' | 'Researcher' | 'Operator' | 'Explorer';

/**
 * Journey metadata
 * Contains basic information about a journey
 */
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

/**
 * Journey phase
 * Represents a step in a learning journey
 */
export interface JourneyPhase {
  name?: string;
  title: string;
  description: string;
  mission: string;
  xpReward: number;
  nftReward?: string;
  locked?: boolean;
  duration?: string;
  content?: string;
  icon?: string;
  // Indicates which stage of the Cognitive Activation Protocol™ this phase corresponds to
  protocolPhase?: 'Learn' | 'Build' | 'Prove' | 'Activate' | 'Scale';
}

/**
 * Journey reward
 * Represents a reward obtained during a journey
 */
export interface JourneyReward {
  milestone: string;
  proof: string;
  utility: string;
}

/**
 * Main journey content
 * Contains all information about a journey
 */
export interface JourneyContent {
  metadata: JourneyMetadata;
  phases: JourneyPhase[];
  callToAction: string[];
  rewards: JourneyReward[];
  whyItMatters: string;
  finalRole: string;
}

/**
 * Feedback data for a phase
 */
export interface PhaseFeedbackData {
  phaseIndex: number;
  rating: number;
  comment: string;
  timestamp: number;
}

/**
 * Feedback for a journey
 */
export interface JourneyFeedback {
  [journeySlug: string]: {
    [phaseIndex: number]: PhaseFeedbackData;
  };
}

/**
 * Props for a journey detail page
 */
export interface JourneyDetailPageProps {
  journey: JourneyContent | null;
}

/**
 * Generic API response
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Proof data
 */
export interface ProofData {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  tags: string[];
}

/**
 * Data format for a journey
 */
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

/**
 * Proof of competence
 */
export interface Proof {
  id: string;
  title: string;
  description: string;
  isUnlocked: boolean;
}

/**
 * Complete journey with all information
 * Compatible with static and dynamic data
 */
export interface Journey {
  id?: string;
  persona?: string;
  label?: string;
  title?: string;
  description: string;
  icon: string;
  tagline: string;
  phases: JourneyPhase[];
  rewards?: (JourneyReward | string)[];
  whyItMatters?: string;
  finalRole?: string;
  requiredPass?: 'Free' | 'Gold' | 'Platinum' | 'Diamond';
  zynoSays?: string;
}

/**
 * Journey phase with ID
 */
export interface Phase {
  id: string;
  title: string;
  description: string;
  order: number;
  isComplete: boolean;
}

/**
 * Type for phases in the timeline
 */
export interface TimelinePhase {
  id: string;
  title: string;
  isActive: boolean;
  isCompleted: boolean;
  icon?: string;
}

/**
 * Type for phases in the system
 */
export interface SystemPhase {
  id: string;
  title: string;
  description: string;
  xpValue: number;
  isLocked: boolean;
}

// Re-export types for backward compatibility
export * from './journey';
