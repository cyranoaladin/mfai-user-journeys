import { useSimulationStore } from '@/stores/simulationStore';
import { motion } from 'framer-motion';
import { ProgressBar } from './ProgressBar';

export const StatsPanel: React.FC = () => {
    const { xp, mfaiTokens, nfts, completedPhases } = useSimulationStore();

    // Calculer le niveau basé sur l'XP
    const calculateLevel = (xp: number) => {
        return Math.floor(Math.sqrt(xp / 100)) + 1;
    };

    // Calculer la progression vers le prochain niveau
    const calculateLevelProgress = (xp: number) => {
        const currentLevel = calculateLevel(xp);
        const xpForCurrentLevel = Math.pow(currentLevel - 1, 2) * 100;
        const xpForNextLevel = Math.pow(currentLevel, 2) * 100;
        const xpInCurrentLevel = xp - xpForCurrentLevel;
        const xpNeededForNextLevel = xpForNextLevel - xpForCurrentLevel;
        return (xpInCurrentLevel / xpNeededForNextLevel) * 100;
    };

    const level = calculateLevel(xp);
    const levelProgress = calculateLevelProgress(xp);

    // Statistiques des NFTs
    const nftStats = {
        total: nfts.length,
        byRarity: {
            Common: nfts.filter(nft => nft.rarity === 'Common').length,
            Rare: nfts.filter(nft => nft.rarity === 'Rare').length,
            Epic: nfts.filter(nft => nft.rarity === 'Epic').length,
            Legendary: nfts.filter(nft => nft.rarity === 'Legendary').length,
        },
    };

    return (
        <div className="bg-gray-800 rounded-lg p-6 space-y-6">
            {/* Niveau et XP */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-white">Level {level}</h3>
                    <span className="text-gray-300">{xp} XP</span>
                </div>
                <ProgressBar
                    progress={levelProgress}
                    color="from-purple-500 to-blue-500"
                    height={8}
                />
            </div>

            {/* Tokens MFAI */}
            <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                    <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="text-2xl"
                    >
                        💰
                    </motion.div>
                    <div>
                        <h4 className="text-sm text-gray-300">MFAI Tokens</h4>
                        <p className="text-xl font-bold text-white">{mfaiTokens}</p>
                    </div>
                </div>
            </div>

            {/* Statistiques des NFTs */}
            <div>
                <h3 className="text-lg font-bold text-white mb-4">NFT Collection</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-700/50 rounded-lg p-4">
                        <h4 className="text-sm text-gray-300 mb-1">Total NFTs</h4>
                        <p className="text-2xl font-bold text-white">{nftStats.total}</p>
                    </div>
                    <div className="bg-gray-700/50 rounded-lg p-4">
                        <h4 className="text-sm text-gray-300 mb-1">Completed Phases</h4>
                        <p className="text-2xl font-bold text-white">{completedPhases.length}</p>
                    </div>
                </div>

                {/* Répartition par rareté */}
                <div className="mt-4 space-y-2">
                    {Object.entries(nftStats.byRarity).map(([rarity, count]) => (
                        <div key={rarity} className="flex items-center justify-between">
                            <span className="text-sm text-gray-300">{rarity}</span>
                            <div className="flex items-center gap-2">
                                <ProgressBar
                                    progress={(count / nftStats.total) * 100}
                                    color={
                                        rarity === 'Legendary' ? 'from-yellow-500 to-yellow-600' :
                                            rarity === 'Epic' ? 'from-purple-500 to-purple-600' :
                                                rarity === 'Rare' ? 'from-blue-500 to-blue-600' :
                                                    'from-gray-500 to-gray-600'
                                    }
                                    height={4}
                                    showPercentage={false}
                                />
                                <span className="text-sm text-gray-300">{count}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Badges de réussite */}
            <div>
                <h3 className="text-lg font-bold text-white mb-4">Achievements</h3>
                <div className="grid grid-cols-2 gap-4">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-gray-700/50 rounded-lg p-4 text-center"
                    >
                        <div className="text-3xl mb-2">🏆</div>
                        <h4 className="text-sm text-gray-300">Highest Level</h4>
                        <p className="text-xl font-bold text-white">{level}</p>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-gray-700/50 rounded-lg p-4 text-center"
                    >
                        <div className="text-3xl mb-2">🌟</div>
                        <h4 className="text-sm text-gray-300">Total XP</h4>
                        <p className="text-xl font-bold text-white">{xp}</p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}; 