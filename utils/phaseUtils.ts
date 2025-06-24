/**
 * Phase utility functions for the MFAI User Journey
 */

/**
 * Get the image URL for a specific phase
 * @param phase The phase name
 * @returns The URL to the phase image
 */
export const getPhaseImageUrl = (phase: string): string => {
  switch (phase.toLowerCase()) {
    case 'cognitive':
      return '/images/phases/cognitive-phase.png';
    case 'synaptic':
      return '/images/phases/synaptic-phase.png';
    case 'neural':
      return '/images/phases/neural-phase.png';
    case 'activation':
      return '/images/phases/activation-phase.png';
    case 'amplification':
      return '/images/phases/amplification-phase.png';
    default:
      return '/images/phases/default-phase.png';
  }
};

/**
 * Get the color variable for a specific phase
 * @param phase The phase name
 * @returns The CSS variable for the phase color
 */
export const getPhaseColor = (phase: string): string => {
  switch (phase.toLowerCase()) {
    case 'cognitive':
      return 'var(--phase-cognitive)';
    case 'synaptic':
      return 'var(--phase-synaptic)';
    case 'neural':
      return 'var(--phase-neural)';
    case 'activation':
      return 'var(--phase-activation)';
    case 'amplification':
      return 'var(--phase-amplification)';
    default:
      return 'var(--phase-cognitive)';
  }
};

/**
 * Get the MFAI terminology for a specific phase
 * @param phase The phase name
 * @returns The MFAI terminology for the phase
 */
export const getPhaseMFAITerm = (phase: string): string => {
  switch (phase.toLowerCase()) {
    case 'cognitive':
      return 'Skillchain Mining™';
    case 'synaptic':
      return 'Neural Network Building™';
    case 'neural':
      return 'Proof-of-Skill™ Validation';
    case 'activation':
      return 'Protocol Activation™';
    case 'amplification':
      return 'Synaptic Governance™';
    default:
      return 'Cognitive Protocol™';
  }
};
