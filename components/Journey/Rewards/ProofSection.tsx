import { cn } from '@/lib/utils';
import { Proof } from '@/types/journey';
import { CheckCircle, Info, Lock } from 'lucide-react';
import { FC, useState } from 'react';

interface ProofSectionProps {
  proofs: Proof[];
  unlockedProofs: number[];
  onProofClick: (index: number) => void;
}

/**
 * ProofSection Component - Displays Proof-of-Skill Tokens™ and Neuro-Dividends™ for journey completion
 */
const ProofSection: FC<ProofSectionProps> = ({ proofs, unlockedProofs, onProofClick }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold text-white">Proof of Skills</h3>
        <div className="relative">
          <button 
            className="text-blue-400 hover:text-blue-300 transition-colors"
            onClick={() => setShowTooltip(!showTooltip)}
          >
            <Info size={16} />
          </button>
          {showTooltip && (
            <div className="absolute z-50 w-64 p-3 bg-gray-800 border border-gray-700 rounded-md shadow-lg text-sm text-gray-300 -right-2 top-6">
              <p>Proof-of-Skill Tokens™ represent your mastery of specific skills. Complete phases to unlock these tokens and showcase your expertise. Neuro-Dividends™ are rewards that increase in value as you progress.</p>
              <div className="absolute -top-2 right-2 w-3 h-3 bg-gray-800 border-t border-l border-gray-700 transform rotate-45"></div>
            </div>
          )}
        </div>
      </div>
      <p className="text-sm text-gray-400">Complete phases to unlock your Neuro-Dividends™ and Cognitive Lock™ rewards</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {proofs.map((proof, index) => {
          const isUnlocked = unlockedProofs.includes(index);
          return (
            <button
              key={index}
              onClick={() => onProofClick(index)}
              className={cn(
                'p-4 rounded-lg border transition-all duration-200',
                isUnlocked
                  ? 'bg-green-900/20 border-green-500'
                  : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
              )}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    'p-2 rounded-full',
                    isUnlocked ? 'bg-green-500/20' : 'bg-gray-700/50'
                  )}
                >
                  {isUnlocked ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Lock className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-medium text-white">{proof.title}</h4>
                  <p className="text-sm text-gray-400 mt-1">{proof.description}</p>
                  {!isUnlocked && (
                    <p className="text-xs text-blue-400 mt-1">Complete this phase to unlock</p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProofSection;
