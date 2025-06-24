import { FC } from 'react';
import { motion } from 'framer-motion';
import { JourneyPhase } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Trophy, Lock, Check } from 'lucide-react';

interface BadgeProgressProps {
  phases: JourneyPhase[];
  currentPhase: number;
}

/**
 * BadgeProgress Component - Displays the NFT badges/proofs earned during the journey
 */
const BadgeProgress: FC<BadgeProgressProps> = ({ phases, currentPhase }) => {
  return (
    <div className="p-6 rounded-xl bg-black/50 border border-[#14F195]/20 backdrop-blur-sm mb-8">
      <div className="absolute inset-0 bg-gradient-to-r from-[#9945FF]/10 to-[#14F195]/10 rounded-xl blur-xl" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            Proof-of-Skill™ NFT
          </h2>
          <Badge className="bg-purple-900/20 text-purple-400">
            {currentPhase} / {phases.length} débloqués
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {phases.map((phase, index) => {
            const isUnlocked = index <= currentPhase;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-lg p-4 border ${
                  isUnlocked 
                    ? 'border-purple-500/50 bg-purple-900/20' 
                    : 'border-gray-700/50 bg-gray-800/50 opacity-50'
                }`}
              >
                <div className="absolute top-2 right-2">
                  {isUnlocked ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Lock className="w-4 h-4 text-gray-400" />
                  )}
                </div>
                
                <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
                  isUnlocked ? 'bg-gradient-to-br from-purple-500 to-blue-600' : 'bg-gray-700'
                }`}>
                  <Trophy className={`w-8 h-8 ${isUnlocked ? 'text-white' : 'text-gray-400'}`} />
                </div>
                
                <h3 className="text-sm font-medium text-center truncate">
                  {phase.title || `Phase ${index + 1}`}
                </h3>
                
                <p className="text-xs text-center text-gray-400 mt-1 truncate">
                  {phase.nftReward || 'Badge de compétence'}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BadgeProgress;
