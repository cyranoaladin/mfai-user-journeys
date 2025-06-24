import { useSimulationStore } from '@/stores/simulationStore';
import { AnimatePresence, motion } from 'framer-motion';

export const RewardNotification: React.FC = () => {
    const { reward, hideReward } = useSimulationStore();

    if (!reward) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                className="fixed bottom-8 right-8 z-50"
            >
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-xl p-6 max-w-sm">
                    <div className="flex items-center gap-4">
                        <motion.div
                            initial={{ rotate: 0 }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="text-4xl"
                        >
                            {reward.type === 'xp' ? '⭐' : reward.type === 'nft' ? '🎨' : '💰'}
                        </motion.div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-1">
                                {reward.type === 'xp' ? 'XP Gained!' :
                                    reward.type === 'nft' ? 'NFT Unlocked!' :
                                        'MFAI Tokens Earned!'}
                            </h3>
                            <p className="text-gray-200">
                                {reward.type === 'xp' ? `+${reward.amount} XP` :
                                    reward.type === 'nft' ? reward.name :
                                        `+${reward.amount} MFAI`}
                            </p>
                        </div>
                    </div>

                    {reward.type === 'nft' && reward.imageUrl && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mt-4"
                        >
                            <img
                                src={reward.imageUrl}
                                alt={reward.name}
                                className="w-full h-32 object-cover rounded-lg"
                            />
                        </motion.div>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={hideReward}
                        className="mt-4 w-full bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg transition-colors"
                    >
                        Continue
                    </motion.button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}; 