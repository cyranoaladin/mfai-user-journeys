/**
 * JourneyService - Service unifié pour accéder aux données des journeys
 * 
 * Ce service centralise l'accès aux données des journeys, qu'elles proviennent
 * des fichiers markdown ou des données statiques. Il offre une interface cohérente
 * pour récupérer les journeys et leurs métadonnées.
 */

import { 
  JourneyContent, 
  JourneyMetadata, 
  JourneyPhase, 
  PersonaType 
} from '@/types';

// Import des sources de données existantes
import { journeys as staticJourneys, Journey } from '@/utils/journeyData';
import * as markdownParser from '@/utils/markdownParser';
import logger from '@/utils/logger';

/**
 * Détermine si nous sommes côté client ou serveur
 */
const isClient = typeof window !== 'undefined';

/**
 * Génère un slug à partir d'un titre
 * 
 * Cette fonction prend un titre et génère un slug en minuscules, sans espaces ni caractères spéciaux
 * 
 * @param title - Le titre à convertir en slug
 * @returns Le slug généré
 */
function generateSlugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Convertit un Journey (format statique) en JourneyContent (format unifié)
 */
function convertJourneyToJourneyContent(journey: Journey): JourneyContent {
  // Générer un slug unique basé sur le titre du parcours
  const slug = generateSlugFromTitle(journey.label);
  
  // Convertir les phases pour assurer la compatibilité des types
  const convertedPhases = journey.phases.map(phase => {
    // Convertir le type de phase du protocole pour assurer la compatibilité
    let safeProtocolPhase: 'Learn' | 'Build' | 'Prove' | 'Activate' | 'Scale' | undefined = undefined;
    
    // Utiliser le titre comme phase du protocole si c'est une valeur valide
    if (['Learn', 'Build', 'Prove', 'Activate', 'Scale'].includes(phase.title)) {
      safeProtocolPhase = phase.title;
    }
    
    // Créer une nouvelle phase avec les propriétés compatibles
    return {
      name: phase.name,
      title: phase.title,
      description: phase.description,
      mission: phase.mission,
      xpReward: phase.xpReward,
      nftReward: phase.nftReward,
      locked: phase.locked,
      duration: phase.duration,
      content: phase.content,
      icon: phase.icon,
      protocolPhase: safeProtocolPhase
    };
  });

  return {
    metadata: {
      title: journey.label,
      subtitle: '',
      tagline: journey.tagline,
      target: '',
      profileType: journey.persona as PersonaType,
      missionType: '',
      icon: journey.icon,
      slug: slug, // Utiliser le slug généré à partir du titre
      description: journey.description
    },
    phases: convertedPhases,
    rewards: journey.rewards.map(reward => ({
      milestone: reward,
      proof: '',
      utility: ''
    })),
    whyItMatters: journey.whyItMatters,
    finalRole: journey.finalRole,
    callToAction: []
  };
}

/**
 * Récupère tous les parcours disponibles
 * 
 * Cette fonction retourne tous les parcours disponibles dans l'application.
 * Si l'application est en mode client, les données sont récupérées depuis les données statiques.
 * Si l'application est en mode serveur, les données sont récupérées depuis l'API.
 * 
 * @returns Une promesse contenant un tableau de parcours
 * @throws Error if data retrieval from the API fails
 */
export async function getAllJourneys(): Promise<JourneyContent[]> {
  // Client-side, use only static data
  if (isClient) {
    return staticJourneys.map(convertJourneyToJourneyContent);
  }
  
  try {
    // Server-side, first try to retrieve journeys from markdown files
    const markdownJourneys = await markdownParser.getAllJourneys();
    
    // If markdown journeys are available, return them
    if (markdownJourneys && markdownJourneys.length > 0) {
      return markdownJourneys;
    }
  } catch (error) {
    logger.warn('Error retrieving markdown journeys:', error);
  }
  
  // Fallback sur les données statiques
  return staticJourneys.map(convertJourneyToJourneyContent);
}

/**
 * Retrieves journeys filtered by persona (profileType)
 * 
 * Cette fonction filtre les parcours disponibles en fonction du type de profil (persona).
 * Le filtrage est insensible à la casse (utilise toLowerCase).
 * 
 * @param persona - Le type de profil à filtrer
 * @returns Une promesse contenant un tableau de parcours filtrés
 * @throws Error si persona est undefined ou null (ne peut pas appeler toLowerCase)
 */
export async function getJourneysByPersona(persona: PersonaType): Promise<JourneyContent[]> {
  // Vérifier si persona est undefined ou null pour éviter l'erreur toLowerCase()
  if (persona === undefined || persona === null) {
    logger.warn('getJourneysByPersona a été appelé avec une persona undefined ou null');
    return [];
  }
  
  const allJourneys = await getAllJourneys();
  
  // Filtre les journeys par type de profil (insensible à la casse)
  return allJourneys.filter(journey => {
    // Vérifier que journey.metadata.profileType existe avant d'appeler toLowerCase
    const profileType = journey.metadata.profileType;
    if (!profileType) return false;
    
    return profileType.toLowerCase() === persona.toLowerCase();
  });
}

/**
 * Récupère un parcours par son slug (identifiant unique)
 * 
 * Cette fonction recherche un parcours spécifique en utilisant son slug comme identifiant.
 * Si aucun parcours ne correspond au slug donné, la fonction retourne null.
 * 
 * @param slug - Le slug du parcours à rechercher
 * @returns Une promesse contenant le parcours trouvé ou null si aucun parcours ne correspond
 */
// Import des données de la page d'accueil pour assurer la cohérence
// Utiliser le même type JourneyContent que celui utilisé dans le reste du service
import { journeys as homePageJourneysRaw } from '@/data/journeys';

// Adapter les données de la page d'accueil au format attendu par le service
// pour éviter les incompatibilités de types
const homePageJourneys = homePageJourneysRaw.map(journey => {
  // Adapter les phases pour s'assurer que tous les champs requis sont présents
  const adaptedPhases = journey.phases.map(phase => {
    // Convertir les phases du protocole pour assurer la compatibilité
    let safeProtocolPhase: 'Learn' | 'Build' | 'Prove' | 'Activate' | 'Scale' | undefined = undefined;
    
    // Mapper les valeurs personnalisées vers les valeurs standard si nécessaire
    if (phase.protocolPhase) {
      if (phase.protocolPhase === 'Cognitive') safeProtocolPhase = 'Learn';
      else if (phase.protocolPhase === 'Synaptic') safeProtocolPhase = 'Build';
      else if (phase.protocolPhase === 'Neural') safeProtocolPhase = 'Prove';
      else if (phase.protocolPhase === 'Activation') safeProtocolPhase = 'Activate';
      else if (phase.protocolPhase === 'Amplification') safeProtocolPhase = 'Scale';
      // Si c'est déjà une valeur standard, la conserver
      else if (['Learn', 'Build', 'Prove', 'Activate', 'Scale'].includes(phase.protocolPhase as string)) {
        safeProtocolPhase = phase.protocolPhase as any;
      }
    }
    
    return {
      ...phase,
      // S'assurer que mission est défini (requis par JourneyPhase dans types/index.ts)
      mission: phase.mission || phase.description,
      // S'assurer que xpReward est défini (requis par JourneyPhase dans types/index.ts)
      xpReward: phase.xpReward || phase.xp || 0,
      // Utiliser la valeur convertie pour protocolPhase
      protocolPhase: safeProtocolPhase
    };
  });
  
  return {
    ...journey,
    phases: adaptedPhases
  };
});

export async function getJourneyBySlug(slug: string): Promise<JourneyContent | null> {
  if (!slug) {
    logger.error('getJourneyBySlug appelé avec un slug vide ou null');
    return null;
  }

  const normalizedSlug = slug.toLowerCase().trim();
  logger.log(`Recherche du parcours avec le slug: ${normalizedSlug}`);
  
  // Réimporter les données directement depuis le fichier source pour éviter les problèmes de cache
  // et s'assurer que nous avons les données les plus à jour
  const { journeys: latestJourneysRaw } = await import('@/data/journeys');
  logger.log('Données de parcours disponibles (réimportées):', latestJourneysRaw.map(j => j.metadata.slug));
  
  // Adapter les données réimportées pour qu'elles soient compatibles avec le type JourneyContent de @/types
  const latestJourneys = latestJourneysRaw.map(journey => {
    // Adapter les phases pour s'assurer que tous les champs requis sont présents
    const adaptedPhases = journey.phases.map(phase => {
      // Mapper les valeurs personnalisées de protocolPhase vers les valeurs standard
      let standardProtocolPhase: 'Learn' | 'Build' | 'Prove' | 'Activate' | 'Scale' | undefined = undefined;
      
      if (phase.protocolPhase) {
        // Mapper les valeurs personnalisées vers les valeurs standard
        if (phase.protocolPhase === 'Cognitive') standardProtocolPhase = 'Learn';
        else if (phase.protocolPhase === 'Synaptic') standardProtocolPhase = 'Build';
        else if (phase.protocolPhase === 'Neural') standardProtocolPhase = 'Prove';
        else if (phase.protocolPhase === 'Activation') standardProtocolPhase = 'Activate';
        else if (phase.protocolPhase === 'Amplification') standardProtocolPhase = 'Scale';
        // Si c'est déjà une valeur standard, la conserver
        else if (['Learn', 'Build', 'Prove', 'Activate', 'Scale'].includes(phase.protocolPhase as string)) {
          standardProtocolPhase = phase.protocolPhase as any;
        }
      }
      
      return {
        ...phase,
        // S'assurer que tous les champs requis sont présents
        mission: phase.mission || phase.description || '',
        xpReward: phase.xpReward || phase.xp || 0,
        content: phase.content || '',
        icon: phase.icon || 'book-open',
        // Utiliser la valeur standard pour protocolPhase
        protocolPhase: standardProtocolPhase
      };
    });
    
    return {
      ...journey,
      phases: adaptedPhases
    };
  });
  
  // Essayer d'abord de trouver le parcours dans les données réimportées
  const latestJourney = latestJourneys.find(journey => journey.metadata.slug === normalizedSlug);
  if (latestJourney) {
    logger.log(`Parcours trouvé dans les données réimportées: ${latestJourney.metadata.title}`);
    return latestJourney;
  }
  
  // Essayer ensuite dans les données de la page d'accueil
  const homePageJourney = homePageJourneys.find(journey => journey.metadata.slug === normalizedSlug);
  if (homePageJourney) {
    logger.log(`Parcours trouvé dans les données de la page d'accueil: ${homePageJourney.metadata.title}`);
    return homePageJourney;
  }
  
  logger.log(`Parcours non trouvé dans les données pour le slug: ${normalizedSlug}`);
  logger.log('Recherche dans les données statiques...');
  
  // Côté client, utilise les données statiques
  if (isClient) {
    const allJourneys = staticJourneys.map(convertJourneyToJourneyContent);
    
    // Recherche exacte d'abord
    let journey = allJourneys.find(journey => journey.metadata.slug === normalizedSlug);
    
    // Si aucun résultat, essayer une recherche plus souple
    if (!journey) {
      journey = allJourneys.find(journey => 
        journey.metadata.slug.includes(normalizedSlug) || 
        normalizedSlug.includes(journey.metadata.slug) ||
        journey.metadata.title.toLowerCase().includes(normalizedSlug)
      );
    }
    
    // Si toujours aucun résultat, essayer de faire correspondre avec les titres des parcours de la page d'accueil
    if (!journey) {
      // Mapper les titres des parcours de la page d'accueil aux parcours statiques
      const titleMapping: Record<string, string> = {
        'Introduction à la Finance': 'student',
        'Intelligence Artificielle en Finance': 'entrepreneur',
        'Blockchain et Crypto': 'developer'
      };
      
      // Trouver le titre correspondant au slug
      const matchingTitle = Object.keys(titleMapping).find(title => 
        normalizedSlug.includes(generateSlugFromTitle(title)) || 
        generateSlugFromTitle(title).includes(normalizedSlug)
      );
      
      if (matchingTitle && titleMapping[matchingTitle]) {
        const persona = titleMapping[matchingTitle];
        journey = allJourneys.find(j => j.metadata.profileType.toLowerCase() === persona.toLowerCase());
        if (journey) {
          logger.log(`Parcours trouvé par correspondance de titre: ${matchingTitle}`);
        }
      }
    }
    
    // Si toujours aucun résultat, utiliser le parcours correspondant au slug de la page d'accueil
    if (!journey) {
      const slugMapping: Record<string, string> = {
        'intro-finance': 'student',
        'ai-finance': 'entrepreneur',
        'blockchain-crypto': 'developer'
      };
      
      if (slugMapping[normalizedSlug]) {
        const persona = slugMapping[normalizedSlug];
        journey = allJourneys.find(j => j.metadata.profileType.toLowerCase() === persona.toLowerCase());
        if (journey) {
          logger.log(`Parcours trouvé par mapping de slug: ${normalizedSlug} -> ${persona}`);
        }
      }
    }
    
    // Si toujours aucun résultat, prendre le premier parcours comme fallback
    if (!journey && allJourneys.length > 0) {
      logger.warn(`Aucun parcours trouvé pour le slug ${normalizedSlug}, utilisation du premier parcours disponible comme fallback`);
      journey = allJourneys[0];
    }
    
    return journey || null;
  }
  
  try {
    // Côté serveur, essaie d'abord de récupérer le journey depuis les fichiers markdown
    const markdownJourney = await markdownParser.getJourneyBySlug(normalizedSlug);
    
    if (markdownJourney) {
      return markdownJourney;
    }
  } catch (error) {
    logger.warn(`Erreur lors de la récupération du journey ${normalizedSlug} depuis markdown:`, error);
  }
  
  // Fallback sur les données statiques avec la même logique que côté client
  const allJourneys = staticJourneys.map(convertJourneyToJourneyContent);
  
  // Recherche exacte d'abord
  let journey = allJourneys.find(journey => journey.metadata.slug === normalizedSlug);
  
  // Si aucun résultat, essayer une recherche plus souple
  if (!journey) {
    journey = allJourneys.find(journey => 
      journey.metadata.slug.includes(normalizedSlug) || 
      normalizedSlug.includes(journey.metadata.slug) ||
      journey.metadata.title.toLowerCase().includes(normalizedSlug)
    );
  }
  
  // Si toujours aucun résultat, essayer de faire correspondre avec les titres des parcours de la page d'accueil
  if (!journey) {
    // Mapper les titres des parcours de la page d'accueil aux parcours statiques
    const titleMapping: Record<string, string> = {
      'Introduction à la Finance': 'student',
      'Intelligence Artificielle en Finance': 'entrepreneur',
      'Blockchain et Crypto': 'developer'
    };
    
    // Trouver le titre correspondant au slug
    const matchingTitle = Object.keys(titleMapping).find(title => 
      normalizedSlug.includes(generateSlugFromTitle(title)) || 
      generateSlugFromTitle(title).includes(normalizedSlug)
    );
    
    if (matchingTitle && titleMapping[matchingTitle]) {
      const persona = titleMapping[matchingTitle];
      journey = allJourneys.find(j => j.metadata.profileType.toLowerCase() === persona.toLowerCase());
    }
  }
  
  // Si toujours aucun résultat, utiliser le parcours correspondant au slug de la page d'accueil
  if (!journey) {
    const slugMapping: Record<string, string> = {
      'intro-finance': 'student',
      'ai-finance': 'entrepreneur',
      'blockchain-crypto': 'developer'
    };
    
    if (slugMapping[normalizedSlug]) {
      const persona = slugMapping[normalizedSlug];
      journey = allJourneys.find(j => j.metadata.profileType.toLowerCase() === persona.toLowerCase());
    }
  }
  
  // Si toujours aucun résultat, prendre le premier parcours comme fallback
  if (!journey && allJourneys.length > 0) {
    logger.warn(`Aucun parcours trouvé pour le slug ${normalizedSlug}, utilisation du premier parcours disponible comme fallback`);
    journey = allJourneys[0];
  }
  
  return journey || null;
}

/**
 * Récupère les métadonnées de tous les journeys
 */
export async function getAllJourneysMetadata(): Promise<JourneyMetadata[]> {
  const allJourneys = await getAllJourneys();
  return allJourneys.map(journey => journey.metadata);
}

/**
 * Vérifie si une phase est déverrouillée en fonction de plusieurs critères
 * 
 * Une phase peut être verrouillée ou déverrouillée selon les règles suivantes :
 * 1. Si la phase a `locked === false`, elle est toujours déverrouillée
 * 2. Si la phase a `locked === true` et n'a pas d'autres conditions (xpReward, nftReward), elle reste verrouillée
 * 3. Si la phase a `locked === true` et a des conditions :
 *    - Si l'utilisateur n'a pas assez d'XP (userXp < phase.xpReward), la phase reste verrouillée
 *    - Si l'utilisateur ne possède pas le NFT requis, la phase reste verrouillée
 *    - Si toutes les conditions sont satisfaites, la phase est déverrouillée
 * 
 * @param phase - La phase à vérifier
 * @param userXp - L'expérience de l'utilisateur
 * @param userNfts - Les NFTs possédés par l'utilisateur (peut être undefined ou null)
 * @returns true si la phase est déverrouillée, false sinon
 */
export function isPhaseUnlocked(phase: JourneyPhase, userXp: number, userNfts: string[] | undefined | null): boolean {
  // Si la phase n'a pas de propriété locked, on considère qu'elle est déverrouillée
  if (phase.locked === undefined || phase.locked === null) {
    return true;
  }
  
  // Si la phase est explicitement verrouillée et qu'il n'y a pas d'autres conditions
  // de déverrouillage (xpReward ou nftReward), alors elle reste verrouillée
  if (phase.locked === true && !phase.xpReward && !phase.nftReward) {
    return false;
  }
  
  // Si la phase n'est pas verrouillée explicitement, elle est déverrouillée
  if (phase.locked === false) {
    return true;
  }
  
  // Vérifie si l'utilisateur a assez d'XP
  if (phase.xpReward && userXp < phase.xpReward) {
    return false;
  }
  
  // Vérifie si l'utilisateur possède le NFT requis
  // Si userNfts est undefined ou null, on considère que l'utilisateur ne possède pas le NFT
  if (phase.nftReward) {
    if (!userNfts) {
      return false;
    }
    if (!userNfts.includes(phase.nftReward)) {
      return false;
    }
  }
  
  return true;
}
