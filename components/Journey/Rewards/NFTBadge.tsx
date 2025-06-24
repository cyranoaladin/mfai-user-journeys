import { Button } from '@/components/ui/button';
import '@/styles/mfai-theme.css';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import Image from 'next/image';

interface NFTBadgeProps {
  title: string;
  imageUrl: string;
  claimed: boolean;
  onClaim: () => void;
}

/**
 * Proof-of-Skill™ NFT Badge Component
 * Displays NFT rewards with Solana gradient styling and claim functionality
 */
const NFTBadge = ({ title, imageUrl, claimed, onClaim }: NFTBadgeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative p-6 rounded-xl bg-black/50 border border-[#14F195]/20 backdrop-blur-sm"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#9945FF]/10 to-[#14F195]/10 rounded-xl blur-xl" />

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-2 rounded-lg bg-[#14F195]/10 text-[#14F195]">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="text-gray-400 text-sm">
              {claimed ? 'NFT Claimed' : 'Complete the phase to claim your NFT'}
            </p>
          </div>
        </div>

        <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-4">
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        </div>

        {!claimed && (
          <Button
            onClick={onClaim}
            className="w-full bg-gradient-to-r from-[#9945FF] to-[#14F195] text-black font-semibold hover:shadow-lg hover:shadow-[#14F195]/20 transition-all duration-300"
          >
            Claim NFT
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default NFTBadge;
