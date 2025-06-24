import { FC } from 'react';
import { motion } from 'framer-motion';
import { Check, Lock } from 'lucide-react';

interface EnhancedVerticalTimelineProps {
  phases: {
    name: string;
    title: string;
    icon?: string;
    badge?: {
      emoji: string;
      title: string;
    };
  }[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  className?: string;
}

const EnhancedVerticalTimeline: FC<EnhancedVerticalTimelineProps> = ({
  phases,
  currentIndex,
  setCurrentIndex,
  className = '',
}) => {
  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      {phases.map((phase, idx) => {
        const isCompleted = idx < currentIndex;
        const isCurrent = idx === currentIndex;
        const isLocked = idx > currentIndex;

        return (
          <motion.button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: 1,
              x: 0,
              scale: isCurrent ? 1.05 : 1,
            }}
            transition={{
              delay: idx * 0.05,
              duration: 0.3,
            }}
            whileHover={{
              backgroundColor: isLocked ? 'rgba(55, 65, 81, 0.3)' : 'rgba(55, 65, 81, 0.7)',
              scale: isLocked ? 1 : 1.02,
            }}
            className={`
              flex items-center gap-3 p-3 rounded-lg text-left transition-all
              ${isCurrent ? 'bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-700/50' : 'border border-gray-800'}
              ${isCompleted ? 'text-white' : isCurrent ? 'text-white' : 'text-gray-500'}
              ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}
            `}
            disabled={isLocked}
            aria-current={isCurrent ? 'step' : undefined}
          >
            <div className="relative">
              <div
                className={`
                w-8 h-8 rounded-full flex items-center justify-center
                ${
                  isCompleted
                    ? 'bg-green-900/50 border border-green-500'
                    : isCurrent
                      ? 'bg-gradient-to-br from-blue-600 to-purple-700 shadow-lg shadow-blue-900/30'
                      : 'bg-gray-800 border border-gray-700'
                }
              `}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4 text-green-400" />
                ) : isLocked ? (
                  <Lock className="h-3 w-3 text-gray-500" />
                ) : (
                  <span className="text-lg">{phase.icon || '•'}</span>
                )}
              </div>

              {idx < phases.length - 1 && (
                <div
                  className={`absolute top-8 left-4 w-0.5 h-6 -translate-x-1/2 
                  ${idx < currentIndex ? 'bg-green-500' : 'bg-gray-700'}`}
                />
              )}
            </div>

            <div className="flex-1">
              <div className="font-medium text-sm">{phase.title || phase.name}</div>
              <div className="text-xs text-gray-400">Phase {idx + 1}</div>
            </div>

            {phase.badge && (
              <div
                className={`
                flex items-center gap-1 text-xs px-2 py-1 rounded-full
                ${idx <= currentIndex ? 'bg-green-900/30 text-green-400' : 'bg-gray-800 text-gray-500'}
              `}
              >
                <span>{idx <= currentIndex ? phase.badge.emoji : '🔒'}</span>
                <span className="hidden sm:inline">{phase.badge.title}</span>
              </div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default EnhancedVerticalTimeline;
