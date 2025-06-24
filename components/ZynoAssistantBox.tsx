import { useSimulationStore } from '@/stores/simulationStore';
import { JourneyPhase } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface ZynoAssistantBoxProps {
    phase: JourneyPhase;
}

export const ZynoAssistantBox: React.FC<ZynoAssistantBoxProps> = ({ phase }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { currentPhaseIndex, isPhaseCompleted } = useSimulationStore();

    const isCompleted = isPhaseCompleted(currentPhaseIndex);

    const getZynoTip = () => {
        if (isCompleted) {
            return "Congratulations! You've mastered this phase. Ready to move on to the next challenge?";
        }

        switch (phase.protocolPhase) {
            case 'Learn':
                return "Take your time to understand the fundamentals. Knowledge is the foundation of your journey.";
            case 'Build':
                return "Focus on practical application. Every skill you build now will be valuable later.";
            case 'Prove':
                return "This is your chance to demonstrate your capabilities. Show what you've learned!";
            case 'Activate':
                return "Time to put your skills into action. The ecosystem is waiting for your contribution.";
            case 'Scale':
                return "Think big! How can you multiply your impact in the ecosystem?";
            default:
                return "I'm here to guide you through your journey. What would you like to know?";
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-xl p-6"
        >
            {/* En-tête de Zyno */}
            <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🤖</span>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white">Zyno Assistant</h3>
                    <p className="text-sm text-gray-300">Your AI Guide</p>
                </div>
            </div>

            {/* Message principal */}
            <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                <p className="text-gray-300">{getZynoTip()}</p>
            </div>

            {/* Section expandable */}
            <div className="border-t border-gray-700 pt-4">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full flex items-center justify-between text-gray-300 hover:text-white transition-colors"
                >
                    <span className="text-sm font-medium">Additional Resources</span>
                    <motion.span
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        className="text-xl"
                    >
                        ▼
                    </motion.span>
                </button>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="mt-4 space-y-4">
                                <div className="bg-gray-900/50 rounded-lg p-4">
                                    <h4 className="text-sm font-semibold text-white mb-2">
                                        Phase Objectives
                                    </h4>
                                    <ul className="text-sm text-gray-300 space-y-2">
                                        <li>• Understand the core concepts</li>
                                        <li>• Complete all required tasks</li>
                                        <li>• Earn your phase badge</li>
                                    </ul>
                                </div>

                                <div className="bg-gray-900/50 rounded-lg p-4">
                                    <h4 className="text-sm font-semibold text-white mb-2">
                                        Tips & Tricks
                                    </h4>
                                    <ul className="text-sm text-gray-300 space-y-2">
                                        <li>• Take notes as you progress</li>
                                        <li>• Engage with the community</li>
                                        <li>• Don't hesitate to ask questions</li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Indicateur de progression */}
            <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">Phase Progress</span>
                    <span className="text-purple-300">
                        {isCompleted ? 'Completed' : 'In Progress'}
                    </span>
                </div>
                <div className="w-full h-1 bg-gray-700 rounded-full mt-2">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: isCompleted ? '100%' : '0%' }}
                        className="h-full bg-purple-500"
                    />
                </div>
            </div>
        </motion.div>
    );
}; 