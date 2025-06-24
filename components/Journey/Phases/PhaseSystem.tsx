import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { JourneyPhase } from '@/types/journey';
import { FC } from 'react';

interface PhaseSystemProps {
  phases: JourneyPhase[];
  currentPhaseIndex: number;
  onPhaseChange: (index: number) => void;
}

const PhaseSystem: FC<PhaseSystemProps> = ({ phases, currentPhaseIndex, onPhaseChange }) => {
  // Placeholder navigation logic (to be replaced by usePhaseSystem if available)
  const canNavigateToNext = currentPhaseIndex < phases.length - 1;
  const canNavigateToPrevious = currentPhaseIndex > 0;
  const handleNext = () => {
    if (canNavigateToNext) onPhaseChange(currentPhaseIndex + 1);
  };
  const handlePrevious = () => {
    if (canNavigateToPrevious) onPhaseChange(currentPhaseIndex - 1);
  };
  const currentPhase = phases[currentPhaseIndex];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white">{currentPhase.title}</h2>
        <p className="text-gray-400">{currentPhase.description}</p>
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={!canNavigateToPrevious}
          className={cn(
            'border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white',
            !canNavigateToPrevious && 'opacity-50 cursor-not-allowed'
          )}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={handleNext}
          disabled={!canNavigateToNext}
          className={cn(
            'border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white',
            !canNavigateToNext && 'opacity-50 cursor-not-allowed'
          )}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PhaseSystem;
