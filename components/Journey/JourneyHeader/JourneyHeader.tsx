import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useJourneyStore } from '@/stores';

interface JourneyHeaderProps {
  metadata: {
    title: string;
    description: string;
    [key: string]: any; // Pour les autres propriétés de metadata
  };
}

// Définition des phases du Cognitive Activation Protocol
const PROTOCOL_PHASES = ['Learn', 'Build', 'Prove', 'Activate', 'Scale'];

// Couleurs associées à chaque phase pour une meilleure visibilité
const PROTOCOL_COLORS = {
  Learn: { bg: 'bg-blue-600', text: 'text-white' },
  Build: { bg: 'bg-green-600', text: 'text-white' },
  Prove: { bg: 'bg-purple-600', text: 'text-white' },
  Activate: { bg: 'bg-orange-600', text: 'text-white' },
  Scale: { bg: 'bg-pink-600', text: 'text-white' },
};

/**
 * JourneyHeader Component - Displays the title, subtitle, and types for a Cognitive Activation Protocol™
 */
export const JourneyHeader: React.FC<JourneyHeaderProps> = ({ metadata }) => {
  const { currentPhaseIndex } = useJourneyStore();
  
  // Valeurs par défaut si metadata est undefined
  const safeMetadata = metadata || {
    title: 'Journey',
    description: 'Explore this journey'
  };
  
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Titre du Cognitive Activation Protocol™ */}
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-semibold">Cognitive Activation Protocol™</h2>
          <div className="flex items-center space-x-2">
            {PROTOCOL_PHASES.map((phase, index) => (
              <Badge 
                key={phase}
                className={`${index === currentPhaseIndex ? PROTOCOL_COLORS[phase]?.bg || 'bg-gray-600' : 'bg-gray-700/50'} 
                           ${index === currentPhaseIndex ? 'ring-2 ring-white/20' : ''} 
                           px-3 py-1`}
              >
                {phase}
              </Badge>
            ))}
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-2">{safeMetadata.title}</h1>
        <p className="text-lg opacity-90">{safeMetadata.description}</p>
      </div>
    </header>
  );
};

export default JourneyHeader;
