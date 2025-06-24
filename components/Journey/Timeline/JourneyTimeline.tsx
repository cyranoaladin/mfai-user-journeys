import { FC } from 'react';
import { motion } from 'framer-motion';
import { useJourneyStore, useJourneyPhases } from '@/stores';
import { Badge } from '@/components/ui/badge';

/**
 * JourneyTimeline - Contains the 5 phases of the journey: Learn → Build → Prove → Activate → Scale
 *
 * Features:
 * - Phase tabs with icons + progress
 * - Phase title + description + mission
 * - Uses Framer Motion for phase transitions
 * - Locked phase logic (based on wallet/NFT/XP)
 */

// Définition des phases du Cognitive Activation Protocol
const PROTOCOL_PHASES = ['Learn', 'Build', 'Prove', 'Activate', 'Scale'];
interface JourneyTimelineProps {
  // Optionnellement, on peut conserver onPhaseChange pour une personnalisation
  onPhaseChange?: (index: number) => void;
}

const JourneyTimeline: FC<JourneyTimelineProps> = ({ onPhaseChange }) => {
  // Utilisation du store pour accéder aux données
  const { currentPhaseIndex, setCurrentPhaseIndex } = useJourneyStore();
  const phases = useJourneyPhases();

  // Fonction de changement de phase qui utilise le store ou la prop
  const handlePhaseChange = (index: number) => {
    if (onPhaseChange) {
      onPhaseChange(index);
    } else {
      setCurrentPhaseIndex(index);
    }
  };
  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-700" />

      {/* Timeline Items */}
      <div className="space-y-6">
        {phases.map((phase, index) => {
          const isActive = index === currentPhaseIndex;
          const isCompleted = index < currentPhaseIndex;
          const isLocked = index > currentPhaseIndex;

          return (
            <motion.div
              key={phase.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex items-start gap-4"
            >
              {/* Timeline Dot */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                  isActive
                    ? 'bg-blue-500 ring-4 ring-blue-500/20'
                    : isCompleted
                      ? 'bg-green-500'
                      : isLocked
                        ? 'bg-gray-600'
                        : 'bg-gray-700'
                }`}
              >
                {isCompleted ? (
                  <span className="text-white">✓</span>
                ) : (
                  <span className="text-white">{index + 1}</span>
                )}
              </div>

              {/* Phase Content */}
              <button
                onClick={() => handlePhaseChange(index)}
                disabled={isLocked}
                className={`flex-1 text-left ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {/* Protocol Phase Badge */}
                <Badge 
                  className={`mb-2 ${isActive ? 'bg-purple-900/20 text-purple-400' : isCompleted ? 'bg-green-900/20 text-green-400' : 'bg-gray-800/50 text-gray-500'}`}
                >
                  {PROTOCOL_PHASES[Math.min(index, PROTOCOL_PHASES.length - 1)]}
                </Badge>
                
                <h3 className="text-lg font-semibold text-white mb-1">{phase.title}</h3>
                <p className="text-sm text-gray-400">{phase.description}</p>

                {/* Rewards */}
                <div className="mt-2 flex items-center gap-2">
                  {phase.xpReward && phase.xpReward > 0 && (
                    <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                      +{phase.xpReward} XP
                    </span>
                  )}
                  {phase.nftReward && (
                    <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full">
                      {phase.nftReward}
                    </span>
                  )}
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default JourneyTimeline;
