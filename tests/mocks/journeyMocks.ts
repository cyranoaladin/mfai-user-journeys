/**
 * Mocks standardisés pour les tests liés aux journeys
 * 
 * Ce fichier centralise toutes les données de test pour les journeys afin d'assurer
 * une cohérence dans les tests et faciliter la maintenance.
 */

import { JourneyContent, JourneyPhase } from '@/types';

/**
 * Données de test pour les phases de journey
 */
export const mockJourneyPhases: JourneyPhase[] = [
    {
        name: 'phase-1',
        title: 'Phase 1',
        description: 'Description de la phase 1',
        mission: 'Mission de la phase 1',
        xpReward: 100,
        locked: false,
        duration: '30 minutes',
        content: 'Contenu de la phase 1'
    },
    {
        name: 'phase-2',
        title: 'Phase 2',
        description: 'Description de la phase 2',
        mission: 'Mission de la phase 2',
        xpReward: 200,
        locked: false,
        duration: '45 minutes',
        content: 'Contenu de la phase 2'
    },
    {
        name: 'phase-3',
        title: 'Phase 3',
        description: 'Description de la phase 3',
        mission: 'Mission de la phase 3',
        xpReward: 300,
        locked: true,
        duration: '60 minutes',
        content: 'Contenu de la phase 3',
        nftReward: 'nft-1'
    }
];

/**
 * Données de test pour un journey complet
 */
export const mockJourney: JourneyContent = {
    metadata: {
        title: 'Test Journey',
        slug: 'test-journey',
        description: 'Un journey de test',
        subtitle: 'Sous-titre du journey',
        icon: 'icon-test',
        profileType: 'Investor',
        target: 'Débutants',
        missionType: 'learn',
        tagline: 'Tagline du journey'
    },
    phases: mockJourneyPhases,
    callToAction: ['Action 1', 'Action 2'],
    rewards: [
        {
            milestone: 'Milestone 1',
            proof: 'Preuve de complétion',
            utility: 'Utilité de la récompense'
        }
    ],
    whyItMatters: 'Pourquoi ce journey est important',
    finalRole: 'Rôle final après complétion'
};

/**
 * Données de test pour une liste de journeys
 */
export const mockJourneys: JourneyContent[] = [
    mockJourney,
    {
        metadata: {
            title: 'Second Journey',
            slug: 'second-journey',
            description: 'Un second journey de test',
            subtitle: 'Sous-titre du second journey',
            icon: 'icon-second',
            profileType: 'Creator',
            target: 'Intermédiaires',
            missionType: 'build',
            tagline: 'Tagline du second journey'
        },
        phases: [
            {
                name: 'phase-1-second',
                title: 'Phase 1 Second',
                description: 'Description de la phase 1 du second journey',
                mission: 'Mission de la phase 1 du second journey',
                xpReward: 150,
                locked: false,
                duration: '30 minutes',
                content: 'Contenu de la phase 1 du second journey'
            }
        ],
        callToAction: ['Action 1'],
        rewards: [
            {
                milestone: 'Milestone 2',
                proof: 'Preuve de complétion du second journey',
                utility: 'Utilité de la récompense du second journey'
            }
        ],
        whyItMatters: 'Pourquoi ce journey est important',
        finalRole: 'Rôle final après complétion'
    }
];

/**
 * Fonction utilitaire pour créer une copie profonde des données de test
 * afin d'éviter les mutations entre les tests
 */
export const getTestJourney = (): JourneyContent => JSON.parse(JSON.stringify(mockJourney));
export const getTestJourneys = (): JourneyContent[] => JSON.parse(JSON.stringify(mockJourneys));
export const getTestPhases = (): JourneyPhase[] => JSON.parse(JSON.stringify(mockJourneyPhases));
