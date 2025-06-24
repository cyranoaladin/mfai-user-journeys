import { FC } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Award, Check, Lock } from 'lucide-react';

interface RewardBadgeProps {
  title: string;
  description?: string;
  imageUrl: string;
  claimed?: boolean;
  onClaim?: () => void;
  className?: string;
}

/**
 * NFTBadge - Shows NFTs unlocked for each phase
 *
 * Features:
 * - Claimed = full color, animation
 * - Unclaimed = grayscale with "Unlock" hint
 * - Tooltip with NFT metadata
 * - Connect to wallet if unclaimed
 */
const RewardBadge: FC<RewardBadgeProps> = ({ title, imageUrl, claimed, onClaim }) => {
  return (
    <motion.div
      className="nft-badge relative"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div
        className={`nft-image-container w-16 h-16 rounded-lg overflow-hidden relative ${!claimed ? 'filter grayscale' : ''}`}
      >
        {/* Fallback image if the provided URL doesn't exist */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#9945FF] to-[#14F195] flex items-center justify-center">
          <Award className="w-8 h-8 text-white" />
        </div>

        {/* Actual NFT image */}
        {imageUrl && (
          <div className="relative w-full h-full">
            <Image
              src={imageUrl}
              alt={`${title} NFT Badge`}
              fill
              style={{ objectFit: 'cover' }}
              onError={e => {
                // Keep the fallback visible on error
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Shine effect for claimed NFTs */}
        {claimed && (
          <motion.div
            className="absolute inset-0 bg-white bg-opacity-30"
            initial={{ x: -100, y: -100 }}
            animate={{ x: 100, y: 100 }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              repeatType: 'mirror',
            }}
          />
        )}

        {/* Claim button for unclaimed NFTs */}
        {!claimed && onClaim && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <button
              onClick={onClaim}
              className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded-md font-medium"
            >
              Claim
            </button>
          </div>
        )}
      </div>

      {/* NFT Status Indicator */}
      <div
        className={`status-indicator absolute -top-1 -right-1 w-5 h-5 rounded-full ${claimed ? 'bg-[#14F195]' : 'bg-gray-500'} flex items-center justify-center`}
      >
        {claimed ? (
          <Check className="w-3 h-3 text-white" />
        ) : (
          <Lock className="w-3 h-3 text-white" />
        )}
      </div>

      {/* Tooltip with NFT metadata */}
      <div className="nft-tooltip absolute left-1/2 bottom-full mb-2 -translate-x-1/2 bg-gray-900 text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none w-48 z-10">
        <p className="font-bold">{title}</p>
        <p className="text-gray-300 text-xs">Proof-of-Skill™ NFT</p>
        {claimed ? (
          <p className="text-green-400 text-xs">Claimed ✓</p>
        ) : (
          <p className="text-yellow-400 text-xs">Complete mission to claim</p>
        )}
      </div>
    </motion.div>
  );
};

export default RewardBadge;
