import { JourneyPhase } from '@/types';
import { motion } from 'framer-motion';
import { ProgressBar } from './ProgressBar';

interface PhaseCardProps {
    phase: JourneyPhase;
    isActive: boolean;
    isCompleted: boolean;
    progress: number;
    onClick: () => void;
}

export const PhaseCard: React.FC<PhaseCardProps> = ({
    phase,
    isActive,
    isCompleted,
    progress,
    onClick,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`relative cursor-pointer rounded-lg overflow-hidden ${isActive
                ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                : isCompleted
                    ? 'bg-gray-700'
                    : 'bg-gray-800'
                }`}
        >
            {/* En-tête de la phase */}
            <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                    {phase.icon && (
                        <motion.div
                            initial={{ rotate: 0 }}
                            animate={{ rotate: isActive ? 360 : 0 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="text-3xl"
                        >
                            {phase.icon}
                        </motion.div>
                    )}
                    <div>
                        <h3 className="text-xl font-bold text-white mb-1">{phase.title}</h3>
                        <p className="text-sm text-gray-300">{phase.description}</p>
                    </div>
                </div>

                {/* Barre de progression */}
                <ProgressBar
                    progress={progress}
                    color={
                        isActive
                            ? 'from-purple-500 to-blue-500'
                            : isCompleted
                                ? 'from-green-500 to-green-600'
                                : 'from-gray-500 to-gray-600'
                    }
                    height={4}
                />
            </div>

            {/* Informations supplémentaires */}
            <div className="px-6 pb-6">
                <div className="grid grid-cols-2 gap-4">
                    {phase.xpReward && (
                        <div className="bg-black/20 rounded-lg p-3">
                            <div className="flex items-center gap-2">
                                <span className="text-yellow-400">⭐</span>
                                <div>
                                    <p className="text-xs text-gray-300">XP Reward</p>
                                    <p className="text-sm font-bold text-white">{phase.xpReward} XP</p>
                                </div>
                            </div>
                        </div>
                    )}
                    {phase.nftReward && (
                        <div className="bg-black/20 rounded-lg p-3">
                            <div className="flex items-center gap-2">
                                <span className="text-purple-400">🎨</span>
                                <div>
                                    <p className="text-xs text-gray-300">NFT Reward</p>
                                    <p className="text-sm font-bold text-white">{phase.nftReward}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {phase.duration && (
                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-300">
                        <span>⏱️</span>
                        <span>Duration: {phase.duration}</span>
                    </div>
                )}
            </div>

            {/* Indicateur d'état */}
            {isActive && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute top-4 right-4"
                >
                    <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="w-2 h-2 bg-green-400 rounded-full"
                        />
                        <span className="text-sm text-white">Active</span>
                    </div>
                </motion.div>
            )}

            {isCompleted && (
                <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-full">
                        <span className="text-green-400">✓</span>
                        <span className="text-sm text-green-300">Completed</span>
                    </div>
                </div>
            )}

            {/* Effet de brillance au survol */}
            <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.1 }}
                className="absolute inset-0 bg-white"
                style={{
                    background: 'radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
                }}
            />
        </motion.div>
    );
}; 