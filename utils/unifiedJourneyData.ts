/**
 * Source unique de vérité pour tous les parcours de l'application
 * Ce fichier combine les parcours de journeyData.ts et data/journeys.ts
 */

import { journeys as staticJourneys } from './journeyData';
import { journeys as dataJourneys } from '../data/journeys';

// Type pour les parcours unifiés
export interface UnifiedJourney {
  slug: string;
  title: string;
  description: string;
  source: 'static' | 'data';
  originalData: any;
}

// Fonction pour générer un slug cohérent
function generateSlug(journey: any): string {
  // Pour les parcours de data/journeys.ts
  if (journey.metadata && journey.metadata.slug) {
    return journey.metadata.slug;
  }
  
  // Pour les parcours de journeyData.ts
  if (journey.persona) {
    return journey.persona;
  }
  
  // Fallback: générer à partir du titre
  const title = journey.metadata?.title || journey.label || '';
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// Convertir les parcours statiques en format unifié
const unifiedStaticJourneys: UnifiedJourney[] = staticJourneys.map(journey => ({
  slug: generateSlug(journey),
  title: journey.label || '',
  description: journey.description || '',
  source: 'static',
  originalData: journey
}));

// Convertir les parcours de data en format unifié
const unifiedDataJourneys: UnifiedJourney[] = dataJourneys.map(journey => ({
  slug: generateSlug(journey),
  title: journey.metadata?.title || '',
  description: journey.metadata?.description || '',
  source: 'data',
  originalData: journey
}));

// Combiner les deux sources en évitant les doublons par slug
const slugMap = new Map<string, UnifiedJourney>();

// D'abord ajouter les parcours statiques
unifiedStaticJourneys.forEach(journey => {
  slugMap.set(journey.slug, journey);
});

// Ensuite ajouter les parcours de data (ils ont priorité si le slug existe déjà)
unifiedDataJourneys.forEach(journey => {
  slugMap.set(journey.slug, journey);
});

// Convertir la Map en tableau
export const unifiedJourneys = Array.from(slugMap.values());

// Fonction pour obtenir un parcours par son slug
export function getJourneyBySlug(slug: string): UnifiedJourney | undefined {
  return unifiedJourneys.find(journey => journey.slug === slug);
}

// Exporter tous les slugs disponibles
export const availableSlugs = unifiedJourneys.map(journey => journey.slug);

// Journeys pour débogage
console.log('Slugs disponibles:', availableSlugs);
