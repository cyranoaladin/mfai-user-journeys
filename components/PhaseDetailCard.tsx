import { JourneyPhase } from '@/types';
import { motion } from 'framer-motion';

interface PhaseDetailCardProps {
    phase: JourneyPhase;
    onComplete: () => void;
}

export const PhaseDetailCard: React.FC<PhaseDetailCardProps> = ({ phase, onComplete }) => {
    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden">
            {/* En-tête */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
                <div className="flex items-center gap-4 mb-4">
                    {phase.icon && (
                        <motion.div
                            initial={{ rotate: 0 }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="text-4xl"
                        >
                            {phase.icon}
                        </motion.div>
                    )}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">{phase.title}</h2>
                        <p className="text-gray-200">{phase.description}</p>
                    </div>
                </div>
            </div>

            {/* Contenu */}
            <div className="p-6 space-y-6">
                {/* Mission */}
                {phase.mission && (
                    <div>
                        <h3 className="text-lg font-bold text-white mb-2">Mission</h3>
                        <p className="text-gray-300">{phase.mission}</p>
                    </div>
                )}

                {/* Contenu détaillé */}
                {phase.content && (
                    <div>
                        <h3 className="text-lg font-bold text-white mb-2">Details</h3>
                        <div className="prose prose-invert max-w-none">
                            {phase.content}
                        </div>
                    </div>
                )}

                {/* Récompenses */}
                <div className="grid grid-cols-2 gap-4">
                    {phase.xpReward && (
                        <div className="bg-gray-700/50 rounded-lg p-4">
                            <div className="flex items-center gap-2">
                                <span className="text-yellow-400 text-2xl">⭐</span>
                                <div>
                                    <p className="text-sm text-gray-300">XP Reward</p>
                                    <p className="text-xl font-bold text-white">{phase.xpReward} XP</p>
                                </div>
                            </div>
                        </div>
                    )}
                    {phase.nftReward && (
                        <div className="bg-gray-700/50 rounded-lg p-4">
                            <div className="flex items-center gap-2">
                                <span className="text-purple-400 text-2xl">🎨</span>
                                <div>
                                    <p className="text-sm text-gray-300">NFT Reward</p>
                                    <p className="text-xl font-bold text-white">{phase.nftReward}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Durée estimée */}
                {phase.duration && (
                    <div className="flex items-center gap-2 text-gray-300">
                        <span className="text-2xl">⏱️</span>
                        <span>Estimated duration: {phase.duration}</span>
                    </div>
                )}

                {/* Bouton de complétion */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onComplete}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-medium"
                >
                    Complete Phase
                </motion.button>
            </div>

            {/* Effet de brillance au survol */}
            <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.1 }}
                className="absolute inset-0 bg-white pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
                }}
            />
        </div>
    );
}; 