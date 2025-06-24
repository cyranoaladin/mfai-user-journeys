import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { Check, Lock, Brain, BookOpen, Sparkles, Zap, Award, Scale, Target, Users, BrainCircuit } from 'lucide-react';
import { JourneyPhase } from '@/types';
import { LucideIcon } from 'lucide-react';

interface JourneyTimelineProps {
  phases: JourneyPhase[];
  currentPhase: number;
  onPhaseClick: (index: number) => void;
}

/**
 * Maps icon string names to Lucide React icon components
 */
const iconMap: Record<string, LucideIcon> = {
  'book-open': BookOpen,
  'brain': Brain,
  'sparkles': Sparkles,
  'zap': Zap,
  'award': Award,
  'scale': Scale,
  'target': Target,
  'users': Users,
  'brain-circuit': BrainCircuit,
  'lock': Lock,
  'check': Check
};

/**
 * Gets the appropriate icon component based on the icon name
 */
const getIconComponent = (iconName: string | undefined): LucideIcon => {
  if (!iconName) return BookOpen;
  // Convert to lowercase and remove any spaces for consistent matching
  const normalizedName = iconName.toLowerCase().replace(/\s+/g, '-');
  return iconMap[normalizedName] || BookOpen; // Default to BookOpen if icon not found
};

/**
 * JourneyTimeline Component - Displays a vertical timeline for quick navigation between phases
 */
const JourneyTimeline: FC<JourneyTimelineProps> = ({ phases, currentPhase, onPhaseClick }) => {
  if (!phases || phases.length === 0) return null;

  return (
    <div className="my-6 sticky top-24">
      <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
        <Brain className="h-4 w-4 text-blue-400" />
        <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Cognitive Activation Protocol™
        </span>
      </h3>

      <div className="relative">
        {/* Ligne verticale */}
        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/50 to-purple-500/50" />

        {/* Phases */}
        <div className="space-y-5">
          {phases.map((phase, index) => {
            const isCompleted = index < currentPhase;
            const isCurrent = index === currentPhase;
            const isLocked = index > currentPhase;

            return (
              <div
                key={index}
                className={`flex items-center gap-3 cursor-pointer transition-all duration-300 ${isLocked ? 'opacity-50' : ''}`}
                onClick={() => !isLocked && onPhaseClick(index)}
              >
                {/* Indicateur de phase */}
                <motion.div
                  className={`relative z-10 flex items-center justify-center w-6 h-6 rounded-full border-2 ${
                    isCurrent
                      ? 'border-blue-500 bg-blue-500/20'
                      : isCompleted
                        ? 'border-green-500 bg-green-500/20'
                        : 'border-gray-600 bg-gray-800'
                  }`}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: isCurrent ? 1.2 : 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {isCompleted && <Check className="h-3 w-3 text-green-400" />}
                  {isCurrent && (
                    // Show the phase icon for current phase
                    React.createElement(
                      getIconComponent(phase.icon || 'book-open'),
                      { className: "h-3 w-3 text-blue-400" }
                    )
                  )}
                  {isLocked && <Lock className="h-3 w-3 text-gray-400" />}
                </motion.div>

                {/* Nom de la phase */}
                <span
                  className={`text-xs ${
                    isCurrent
                      ? 'font-semibold text-blue-300'
                      : isCompleted
                        ? 'font-medium text-green-300'
                        : 'text-gray-400'
                  }`}
                >
                  {phase.title || `Phase ${index + 1}`}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default JourneyTimeline;
