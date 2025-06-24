import { useSimulationStore } from '@/stores/simulationStore';
import { JourneyPhase } from '@/types';
import { motion } from 'framer-motion';

interface TimelinePhaseProps {
    phase: JourneyPhase;
    index: number;
    isActive: boolean;
    isCompleted: boolean;
    isUnlocked: boolean;
    onClick: () => void;
}

const TimelinePhase: React.FC<TimelinePhaseProps> = ({
    phase,
    index,
    isActive,
    isCompleted,
    isUnlocked,
    onClick,
}) => {
    const getPhaseColor = () => {
        if (isCompleted) return 'bg-green-500';
        if (isActive) return 'bg-purple-500';
        if (isUnlocked) return 'bg-blue-500';
        return 'bg-gray-500';
    };

    const getPhaseIcon = () => {
        if (isCompleted) return '✓';
        if (isActive) return '→';
        if (isUnlocked) return '🔓';
        return '🔒';
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative flex items-start gap-4 p-4 rounded-lg ${isActive ? 'bg-purple-900/30' : 'bg-gray-900/30'
                } ${isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed'}`}
            onClick={isUnlocked ? onClick : undefined}
        >
            {/* Ligne verticale */}
            {index < 4 && (
                <div
                    className={`absolute left-6 top-16 w-0.5 h-16 ${isCompleted ? 'bg-green-500' : 'bg-gray-700'
                        }`}
                />
            )}

            {/* Cercle de phase */}
            <div
                className={`w-12 h-12 rounded-full ${getPhaseColor()} flex items-center justify-center text-white font-bold z-10`}
            >
                {getPhaseIcon()}
            </div>

            {/* Contenu de la phase */}
            <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-1">{phase.title}</h3>
                <p className="text-sm text-gray-300 mb-2">{phase.description}</p>

                {/* Récompenses */}
                <div className="flex flex-wrap gap-2">
                    {phase.xpReward && (
                        <span className="px-2 py-1 bg-yellow-500/20 rounded-full text-xs text-yellow-300">
                            +{phase.xpReward} XP
                        </span>
                    )}
                    {phase.nftReward && (
                        <span className="px-2 py-1 bg-purple-500/20 rounded-full text-xs text-purple-300">
                            {phase.nftReward}
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

interface JourneyTimelineProps {
    phases: JourneyPhase[];
    onPhaseSelect: (index: number) => void;
}

export const JourneyTimeline: React.FC<JourneyTimelineProps> = ({
    phases,
    onPhaseSelect,
}) => {
    const { currentPhaseIndex, isPhaseUnlocked, isPhaseCompleted } = useSimulationStore();

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="space-y-4">
                {phases.map((phase, index) => (
                    <TimelinePhase
                        key={index}
                        phase={phase}
                        index={index}
                        isActive={index === currentPhaseIndex}
                        isCompleted={isPhaseCompleted(index)}
                        isUnlocked={isPhaseUnlocked(index)}
                        onClick={() => onPhaseSelect(index)}
                    />
                ))}
            </div>
        </div>
    );
}; 