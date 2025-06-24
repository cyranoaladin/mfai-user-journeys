import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../ui/button';

interface PhaseNavigatorProps {
  currentPhase: number;
  totalPhases: number;
  phaseName: string;
  onPrevious: () => void;
  onNext: () => void;
  className?: string;
}

export default function PhaseNavigator({
  currentPhase,
  totalPhases,
  phaseName,
  onPrevious,
  onNext,
  className = '',
}: PhaseNavigatorProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <Button
        onClick={onPrevious}
        disabled={currentPhase === 0}
        variant="outline"
        className="px-3 py-2 flex items-center gap-1 hover:bg-gray-700 hover:border-gray-600 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        aria-label="Previous phase"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Previous</span>
      </Button>

      <motion.div
        key={currentPhase}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center px-2"
      >
        <span className="text-xs text-gray-400 block sm:inline">
          Phase {currentPhase + 1} of {totalPhases}
        </span>
        <span className="font-medium text-white text-sm block sm:inline sm:ml-2">{phaseName}</span>
      </motion.div>

      <Button
        onClick={onNext}
        disabled={currentPhase === totalPhases - 1}
        variant="outline"
        className="px-3 py-2 flex items-center gap-1 hover:bg-gray-700 hover:border-gray-600 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        aria-label="Next phase"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
