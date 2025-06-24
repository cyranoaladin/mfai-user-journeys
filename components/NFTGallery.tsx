import { useSimulationStore } from '@/stores/simulationStore';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface NFT {
    id: string;
    name: string;
    imageUrl: string;
    rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
    utility: string;
    unlockedAt: number;
}

interface NFTGalleryProps {
    onNFTSelect?: (nft: NFT) => void;
}

export const NFTGallery: React.FC<NFTGalleryProps> = ({ onNFTSelect }) => {
    const { nfts } = useSimulationStore();
    const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
    const [filter, setFilter] = useState<'all' | 'Common' | 'Rare' | 'Epic' | 'Legendary'>('all');

    const rarityColors = {
        Common: 'border-gray-400',
        Rare: 'border-blue-400',
        Epic: 'border-purple-400',
        Legendary: 'border-yellow-400',
    };

    const rarityGlow = {
        Common: 'shadow-gray-400/20',
        Rare: 'shadow-blue-400/30',
        Epic: 'shadow-purple-400/40',
        Legendary: 'shadow-yellow-400/50',
    };

    const filteredNFTs = nfts.filter(nft =>
        filter === 'all' || nft.rarity === filter
    );

    const handleNFTClick = (nft: NFT) => {
        setSelectedNFT(nft);
        onNFTSelect?.(nft);
    };

    return (
        <div className="space-y-6">
            {/* Filtres */}
            <div className="flex gap-2">
                {(['all', 'Common', 'Rare', 'Epic', 'Legendary'] as const).map((rarity) => (
                    <motion.button
                        key={rarity}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFilter(rarity)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === rarity
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                    >
                        {rarity === 'all' ? 'All' : rarity}
                    </motion.button>
                ))}
            </div>

            {/* Grille de NFTs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence>
                    {filteredNFTs.map((nft) => (
                        <motion.div
                            key={nft.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            whileHover={{ scale: 1.05 }}
                            onClick={() => handleNFTClick(nft)}
                            className={`relative cursor-pointer rounded-lg overflow-hidden border-2 ${rarityColors[nft.rarity]}
                                ${rarityGlow[nft.rarity]}`}
                        >
                            {/* Image du NFT */}
                            <div className="aspect-square relative">
                                <img
                                    src={nft.imageUrl}
                                    alt={nft.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </div>

                            {/* Informations du NFT */}
                            <div className="p-4">
                                <h3 className="text-lg font-bold text-white mb-1">{nft.name}</h3>
                                <p className="text-sm text-gray-300">{nft.utility}</p>
                                <div className="mt-2 flex items-center justify-between">
                                    <span className="text-xs text-gray-400">
                                        Unlocked {new Date(nft.unlockedAt).toLocaleDateString()}
                                    </span>
                                    <span className={`text-xs px-2 py-1 rounded-full ${nft.rarity === 'Legendary' ? 'bg-yellow-500/20 text-yellow-300' :
                                        nft.rarity === 'Epic' ? 'bg-purple-500/20 text-purple-300' :
                                            nft.rarity === 'Rare' ? 'bg-blue-500/20 text-blue-300' :
                                                'bg-gray-500/20 text-gray-300'
                                        }`}>
                                        {nft.rarity}
                                    </span>
                                </div>
                            </div>

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
                    ))}
                </AnimatePresence>
            </div>

            {/* Modal de détails du NFT */}
            <AnimatePresence>
                {selectedNFT && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
                        onClick={() => setSelectedNFT(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-gray-900 rounded-lg max-w-2xl w-full overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="relative">
                                <img
                                    src={selectedNFT.imageUrl}
                                    alt={selectedNFT.name}
                                    className="w-full h-64 object-cover"
                                />
                                <button
                                    onClick={() => setSelectedNFT(null)}
                                    className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-white mb-2">{selectedNFT.name}</h2>
                                <p className="text-gray-300 mb-4">{selectedNFT.utility}</p>
                                <div className="flex items-center justify-between text-sm text-gray-400">
                                    <span>Unlocked {new Date(selectedNFT.unlockedAt).toLocaleDateString()}</span>
                                    <span className={`px-3 py-1 rounded-full ${selectedNFT.rarity === 'Legendary' ? 'bg-yellow-500/20 text-yellow-300' :
                                        selectedNFT.rarity === 'Epic' ? 'bg-purple-500/20 text-purple-300' :
                                            selectedNFT.rarity === 'Rare' ? 'bg-blue-500/20 text-blue-300' :
                                                'bg-gray-500/20 text-gray-300'
                                        }`}>
                                        {selectedNFT.rarity}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}; 