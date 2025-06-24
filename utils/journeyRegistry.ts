// utils/journeyRegistry.ts
// Centralisation des relations entre parcours, profils associés et badges personnalisés

export interface JourneyLink {
  slug: string;
  title: string;
  profileType: string;
  next?: string; // slug du parcours suivant
  prev?: string; // slug du parcours précédent
  badgeEmoji?: string;
  featured?: boolean;
}

export const journeyRegistry: JourneyLink[] = [
  {
    slug: 'from-silent-watcher-to-protocol-backer',
    title: 'From Silent Watcher to Protocol Backer',
    profileType: 'Observer',
    next: 'from-community-voice-to-synaptic-strategist',
    badgeEmoji: '👀',
  },
  {
    slug: 'from-community-voice-to-synaptic-strategist',
    title: 'From Community Voice to Synaptic Strategist',
    profileType: 'Connector',
    prev: 'from-silent-watcher-to-protocol-backer',
    next: 'from-content-maker-to-cognitive-publisher',
    badgeEmoji: '📢',
  },
  {
    slug: 'from-content-maker-to-cognitive-publisher',
    title: 'From Content Maker to Cognitive Publisher',
    profileType: 'Creator',
    prev: 'from-community-voice-to-synaptic-strategist',
    next: 'from-data-miner-to-intelligence-synthesizer',
    badgeEmoji: '🧠',
  },
  {
    slug: 'from-data-miner-to-intelligence-synthesizer',
    title: 'From Data Miner to Intelligence Synthesizer',
    profileType: 'Analyzer',
    prev: 'from-content-maker-to-cognitive-publisher',
    next: 'from-project-manager-to-mission-commander',
    badgeEmoji: '📊',
  },
  {
    slug: 'from-project-manager-to-mission-commander',
    title: 'From Project Manager to Mission Commander',
    profileType: 'Leader',
    prev: 'from-data-miner-to-intelligence-synthesizer',
    next: 'from-idea-carrier-to-protocol-engineer',
    badgeEmoji: '🚀',
    featured: true,
  },
  {
    slug: 'from-idea-carrier-to-protocol-engineer',
    title: 'From Idea Carrier to Protocol Engineer',
    profileType: 'Builder',
    prev: 'from-project-manager-to-mission-commander',
    next: 'from-web2-hustler-to-web3-sovereign',
    badgeEmoji: '🛠️',
  },
  {
    slug: 'from-web2-hustler-to-web3-sovereign',
    title: 'From Web2 Hustler to Web3 Sovereign',
    profileType: 'Entrepreneur',
    prev: 'from-idea-carrier-to-protocol-engineer',
    badgeEmoji: '🧱',
  },
];

/**
 * Récupère les informations d'un parcours à partir de son slug
 * @param slug - Le slug du parcours
 * @returns Les informations du parcours ou undefined si non trouvé
 */
export function getJourneyLinkBySlug(slug: string): JourneyLink | undefined {
  return journeyRegistry.find(journey => journey.slug === slug);
}

/**
 * Récupère le parcours suivant à partir d'un slug
 * @param slug - Le slug du parcours actuel
 * @returns Les informations du parcours suivant ou undefined si non trouvé
 */
export function getNextJourney(slug: string): JourneyLink | undefined {
  const currentJourney = getJourneyLinkBySlug(slug);
  if (currentJourney?.next) {
    return getJourneyLinkBySlug(currentJourney.next);
  }
  return undefined;
}

/**
 * Récupère le parcours précédent à partir d'un slug
 * @param slug - Le slug du parcours actuel
 * @returns Les informations du parcours précédent ou undefined si non trouvé
 */
export function getPreviousJourney(slug: string): JourneyLink | undefined {
  const currentJourney = getJourneyLinkBySlug(slug);
  if (currentJourney?.prev) {
    return getJourneyLinkBySlug(currentJourney.prev);
  }
  return undefined;
}

/**
 * Récupère tous les parcours mis en avant
 * @returns La liste des parcours mis en avant
 */
export function getFeaturedJourneys(): JourneyLink[] {
  return journeyRegistry.filter(journey => journey.featured);
}
