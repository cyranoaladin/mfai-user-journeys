import { useSimulationStore } from '@/stores/simulationStore';
import { JourneyPhase } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { PhaseCard } from './PhaseCard';

interface PhaseListProps {
    phases: JourneyPhase[];
    onPhaseSelect: (index: number) => void;
}

export const PhaseList: React.FC<PhaseListProps> = ({
    phases,
    onPhaseSelect,
}) => {
    const { currentPhaseIndex, completedPhases } = useSimulationStore();

    return (
        <div className="space-y-6">
            <AnimatePresence>
                {phases.map((phase, index) => {
                    const isActive = index === currentPhaseIndex;
                    const isCompleted = completedPhases.includes(index);
                    const progress = isCompleted ? 100 : isActive ? 50 : 0;

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <PhaseCard
                                phase={phase}
                                isActive={isActive}
                                isCompleted={isCompleted}
                                progress={progress}
                                onClick={() => onPhaseSelect(index)}
                            />
                        </motion.div>
                    );
                })}
            </AnimatePresence>

            {/* Ligne de connexion entre les phases */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-700 -z-10" />

            {/* Indicateurs de progression */}
            {phases.map((_, index) => {
                const isActive = index === currentPhaseIndex;
                const isCompleted = completedPhases.includes(index);

                return (
                    <motion.div
                        key={index}
                        className="absolute left-6 top-0 w-4 h-4 rounded-full -z-10"
                        style={{
                            top: `${(index * 100) / phases.length}%`,
                            backgroundColor: isCompleted
                                ? '#10B981'
                                : isActive
                                    ? '#8B5CF6'
                                    : '#4B5563',
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                    />
                );
            })}
        </div>
    );
}; 