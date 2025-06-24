import { useSimulationStore } from '@/stores/simulationStore';
import { motion } from 'framer-motion';

interface NFTGalleryProps {
    nfts: Array<{
        id: string;
        name: string;
        imageUrl: string;
        rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
        utility: string;
        unlockedAt: number;
    }>;
}

const NFTGallery: React.FC<NFTGalleryProps> = ({ nfts }) => {
    const getRarityColor = (rarity: string) => {
        switch (rarity) {
            case 'Common':
                return 'bg-gray-500';
            case 'Rare':
                return 'bg-blue-500';
            case 'Epic':
                return 'bg-purple-500';
            case 'Legendary':
                return 'bg-yellow-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <div className="grid grid-cols-2 gap-4">
            {nfts.map((nft) => (
                <motion.div
                    key={nft.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gray-900/50 rounded-lg p-4"
                >
                    <div className="relative">
                        <img
                            src={nft.imageUrl}
                            alt={nft.name}
                            className="w-full h-32 object-cover rounded-lg mb-2"
                        />
                        <span
                            className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs text-white ${getRarityColor(
                                nft.rarity
                            )}`}
                        >
                            {nft.rarity}
                        </span>
                    </div>
                    <h4 className="text-sm font-semibold text-white mb-1">{nft.name}</h4>
                    <p className="text-xs text-gray-300">{nft.utility}</p>
                </motion.div>
            ))}
        </div>
    );
};

export const SimulatedStatePanel: React.FC = () => {
    const {
        totalXP,
        level,
        nfts,
        mfaiTokens,
        stakedTokens,
        getLevelProgress,
        getRequiredXPForNextLevel,
    } = useSimulationStore();

    const levelProgress = getLevelProgress();
    const requiredXP = getRequiredXPForNextLevel();

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-xl p-6"
        >
            {/* Niveau et XP */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">Level {level}</h3>
                    <span className="text-sm text-gray-300">
                        {totalXP} / {requiredXP} XP
                    </span>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${levelProgress}%` }}
                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                    />
                </div>
            </div>

            {/* Tokens */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-900/50 rounded-lg p-4">
                    <h4 className="text-sm text-gray-300 mb-1">$MFAI Balance</h4>
                    <p className="text-xl font-bold text-white">{mfaiTokens.toLocaleString()}</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                    <h4 className="text-sm text-gray-300 mb-1">Staked Tokens</h4>
                    <p className="text-xl font-bold text-white">{stakedTokens.toLocaleString()}</p>
                </div>
            </div>

            {/* NFT Gallery */}
            <div>
                <h3 className="text-lg font-semibold text-white mb-4">NFT Collection</h3>
                {nfts.length > 0 ? (
                    <NFTGallery nfts={nfts} />
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-400">No NFTs collected yet</p>
                        <p className="text-sm text-gray-500">
                            Complete missions to earn NFT badges
                        </p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}; 