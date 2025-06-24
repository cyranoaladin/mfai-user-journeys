import React from 'react';
import { useJourneyStore } from '@/stores';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/utils/store';
import { BookOpen, Zap, Activity, Power, TrendingUp } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// Définition des phases du Cognitive Activation Protocol
const PROTOCOL_PHASES = ['Learn', 'Build', 'Prove', 'Activate', 'Scale'];

// Couleurs et icônes associées à chaque phase pour une meilleure visibilité
const PROTOCOL_COLORS = {
  Learn: { bg: 'bg-blue-600', text: 'text-white', border: 'border-blue-400', icon: 'book-open' },
  Build: { bg: 'bg-green-600', text: 'text-white', border: 'border-green-400', icon: 'zap' },
  Prove: { bg: 'bg-purple-600', text: 'text-white', border: 'border-purple-400', icon: 'activity' },
  Activate: { bg: 'bg-orange-600', text: 'text-white', border: 'border-orange-400', icon: 'power' },
  Scale: { bg: 'bg-pink-600', text: 'text-white', border: 'border-pink-400', icon: 'trending-up' },
};

// Mapping des noms d'icônes aux composants Lucide
const iconMap: Record<string, LucideIcon> = {
  'book-open': BookOpen,
  'zap': Zap,
  'activity': Activity,
  'power': Power,
  'trending-up': TrendingUp,
};

// Fonction pour obtenir le composant d'icône à partir du nom
const getIconComponent = (iconName: string | undefined): LucideIcon => {
  if (!iconName) return BookOpen;
  const normalizedName = iconName.toLowerCase().replace(/\s+/g, '-');
  return iconMap[normalizedName] || BookOpen;
};

/**
 * ProtocolBanner - Affiche les étapes du Cognitive Activation Protocol™
 * avec une mise en évidence de la phase actuelle et des indicateurs visuels
 */
export const ProtocolBanner: React.FC = () => {
  const { currentPhaseIndex, currentJourney } = useJourneyStore();
  const { totalXP } = useStore();
  
  // Déterminer la phase actuelle du protocole
  const currentPhase = currentJourney?.phases[currentPhaseIndex];
  const currentProtocolPhase = currentPhase?.protocolPhase || PROTOCOL_PHASES[Math.min(currentPhaseIndex, PROTOCOL_PHASES.length - 1)];
  
  // Calculer la progression globale
  const progress = Math.min((totalXP / 500) * 100, 100);
  
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold text-white">Cognitive Activation Protocol™</h2>
        <span className="text-sm font-medium text-gray-300">
          <div className="flex items-center space-x-2 p-1.5 rounded-md">
            {React.createElement(getIconComponent(PROTOCOL_COLORS[currentProtocolPhase].icon), {
              className: "h-5 w-5",
              strokeWidth: 2
            })}
            <span className="text-xs font-medium">{currentProtocolPhase}</span>
          </div>
          {Math.round(progress)}% ({totalXP} XP)
        </span>
      </div>
      
      {/* Indicateur de progression avec étapes */}
      <div className="relative mb-6">
        <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#9945FF] to-[#14F195]"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Points d'étape sur la barre de progression */}
        <div className="absolute top-0 left-0 w-full flex justify-between transform -translate-y-1/2 px-2">
          {PROTOCOL_PHASES.map((phase, index) => {
            const position = `${(index / (PROTOCOL_PHASES.length - 1)) * 100}%`;
            const isActive = phase === currentProtocolPhase;
            const isCompleted = PROTOCOL_PHASES.indexOf(currentProtocolPhase) > index;
            
            return (
              <div 
                key={phase}
                className={`
                  w-5 h-5 rounded-full flex items-center justify-center text-xs
                  ${isActive ? PROTOCOL_COLORS[phase]?.bg : isCompleted ? 'bg-green-600' : 'bg-gray-700'}
                  ${isActive ? 'ring-2 ring-white/30 transform scale-125' : ''}
                `}
                style={{ left: position, marginLeft: '-10px' }}
              >
                {isCompleted && '✓'}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Badges des phases */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        {PROTOCOL_PHASES.map((phase, index) => {
          const isActive = phase === currentProtocolPhase;
          const isCompleted = PROTOCOL_PHASES.indexOf(currentProtocolPhase) > index;
          
          return (
            <Badge 
              key={phase}
              className={`
                ${isActive 
                  ? PROTOCOL_COLORS[phase]?.bg
                  : isCompleted 
                    ? 'bg-green-700' 
                    : 'bg-gray-700/50'
                } 
                ${isActive ? 'ring-2 ring-white/20' : ''} 
                border ${isActive ? PROTOCOL_COLORS[phase]?.border || 'border-white/20' : 'border-transparent'}
                text-white px-3 py-1.5 text-sm font-medium
              `}
            >
              {React.createElement(getIconComponent(PROTOCOL_COLORS[phase].icon), {
                className: "h-5 w-5",
                strokeWidth: 2
              })} {phase} {isCompleted && '✓'}
            </Badge>
          );
        })}
      </div>
    </div>
  );
};

export default ProtocolBanner;
