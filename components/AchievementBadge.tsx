import { motion } from 'framer-motion';
import { useState } from 'react';

interface AchievementBadgeProps {
    title: string;
    description: string;
    icon: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    unlockedAt?: number;
    isNew?: boolean;
}

const rarityColors = {
    common: 'from-gray-400 to-gray-500',
    rare: 'from-blue-400 to-blue-500',
    epic: 'from-purple-400 to-purple-500',
    legendary: 'from-yellow-400 to-yellow-500',
};

const rarityGlow = {
    common: 'shadow-gray-500/20',
    rare: 'shadow-blue-500/30',
    epic: 'shadow-purple-500/40',
    legendary: 'shadow-yellow-500/50',
};

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({
    title,
    description,
    icon,
    rarity,
    unlockedAt,
    isNew = false,
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className={`relative p-4 rounded-lg bg-gradient-to-br ${rarityColors[rarity]} ${rarityGlow[rarity]} shadow-lg`}
        >
            {/* Badge d'état */}
            {isNew && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
                >
                    New!
                </motion.div>
            )}

            {/* Icône */}
            <div className="text-4xl mb-2">{icon}</div>

            {/* Titre */}
            <h3 className="text-lg font-bold text-white mb-1">{title}</h3>

            {/* Description */}
            <p className="text-sm text-white/80">{description}</p>

            {/* Date de déblocage */}
            {unlockedAt && (
                <p className="text-xs text-white/60 mt-2">
                    Unlocked {new Date(unlockedAt).toLocaleDateString()}
                </p>
            )}

            {/* Effet de brillance au survol */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 0.1 : 0 }}
                className="absolute inset-0 bg-white rounded-lg"
                style={{
                    background: 'radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
                }}
            />

            {/* Effet de particules pour les badges légendaires */}
            {rarity === 'legendary' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0.3 }}
                    className="absolute inset-0 overflow-hidden"
                >
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                            initial={{ x: '50%', y: '50%' }}
                            animate={{
                                x: ['50%', `${Math.random() * 100}%`],
                                y: ['50%', `${Math.random() * 100}%`],
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.4,
                            }}
                        />
                    ))}
                </motion.div>
            )}
        </motion.div>
    );
}; 