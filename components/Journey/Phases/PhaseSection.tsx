import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useJourneyStore } from '@/stores';
import { JourneyPhase } from '@/types';
import { useStore } from '@/utils/store';
import { motion } from 'framer-motion';
import { Award, ChevronLeft, ChevronRight, Lock, Star, BookOpen, Zap, Activity, Power, TrendingUp, LucideIcon } from 'lucide-react';

interface PhaseSectionProps {
  phase: JourneyPhase;
  currentPhase: number;
  totalPhases: number;
  onNextPhase?: () => void;
  onPreviousPhase?: () => void;
}

// Define the phases of the Cognitive Activation Protocol according to specifications
const PROTOCOL_PHASES = ['Learn', 'Build', 'Prove', 'Activate', 'Scale'];

// Colors associated with each protocol phase for better visibility
const PROTOCOL_COLORS = {
  Learn: { bg: 'bg-blue-600', text: 'text-white', border: 'border-blue-400', icon: 'book-open' },
  Build: { bg: 'bg-green-600', text: 'text-white', border: 'border-green-400', icon: 'zap' },
  Prove: { bg: 'bg-purple-600', text: 'text-white', border: 'border-purple-400', icon: 'activity' },
  Activate: { bg: 'bg-orange-600', text: 'text-white', border: 'border-orange-400', icon: 'power' },
  Scale: { bg: 'bg-pink-600', text: 'text-white', border: 'border-pink-400', icon: 'trending-up' },
};

/**
 * Maps icon string names to Lucide React icon components
 */
const iconMap: Record<string, LucideIcon> = {
  'book-open': BookOpen,
  'zap': Zap,
  'activity': Activity,
  'power': Power,
  'trending-up': TrendingUp,
};

/**
 * Gets the appropriate icon component based on the icon name
 */
const getIconComponent = (iconName: string | undefined): LucideIcon => {
  if (!iconName) return BookOpen;
  
  const normalizedName = iconName.toLowerCase().replace(/\s+/g, '-');
  return iconMap[normalizedName] || BookOpen; // Default to BookOpen if icon not found
};

export default function PhaseSection({ phase, currentPhase, totalPhases, onNextPhase, onPreviousPhase }: PhaseSectionProps) {
  const { totalXP } = useStore();
  // Get store functions as fallbacks
  const { nextPhase: storeNextPhase, previousPhase: storePreviousPhase } = useJourneyStore();
  
  // Calculate progression based on total XP
  // Use a more realistic scale: 100 XP per phase, 5 phases = 500 XP total
  const progress = Math.min((totalXP / 500) * 100, 100);
  
  // Determine the current phase name according to the protocol
  // Use the protocolPhase property if it exists, otherwise use the index
  const protocolPhase = phase.protocolPhase || PROTOCOL_PHASES[Math.min(currentPhase, PROTOCOL_PHASES.length - 1)];
  
  const isFirstPhase = currentPhase === 0;
  const isLastPhase = currentPhase === totalPhases - 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="relative p-6 rounded-xl bg-black/50 border border-[#14F195]/20 backdrop-blur-sm"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#9945FF]/10 to-[#14F195]/10 rounded-xl blur-xl" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
                {/* Protocol badge with dynamic color and icon */}
                <Badge 
                  className={`${PROTOCOL_COLORS[protocolPhase]?.bg || 'bg-gray-900/20'} ${PROTOCOL_COLORS[protocolPhase]?.text || 'text-gray-400'} text-sm font-medium px-3 py-1.5 border ${PROTOCOL_COLORS[protocolPhase]?.border || 'border-gray-600'}`}
                  style={{ fontSize: '14px' }}
                >
                  {PROTOCOL_COLORS[protocolPhase]?.icon || '🔍'} {protocolPhase ? protocolPhase.toUpperCase() : 'PHASE'} → {currentPhase + 1}/{totalPhases}
                </Badge>
              </div>
            <h2 className="text-2xl font-bold text-white mb-2">{phase.title || `Phase ${currentPhase + 1}`}</h2>
            <p className="text-gray-400">{phase.description || 'Complete this phase to progress in your journey.'}</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800/80 rounded-lg p-4 border border-gray-700/50 shadow-lg"
          >
            <h3 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              Mission
            </h3>
            <p className="text-gray-200">{phase.description}</p>
          </motion.div>

          {/* Content Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800/90 rounded-lg p-6 border border-gray-700/50 shadow-lg"
          >
            <h3 className="text-xl font-medium text-white mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
              Content
            </h3>
            <div className="prose prose-invert max-w-none text-gray-100 leading-relaxed">
              {phase.content ? (
                <div dangerouslySetInnerHTML={{ __html: phase.content }} />
              ) : (
                <div className="p-6 bg-gradient-to-br from-gray-700/30 to-gray-800/30 rounded-lg border border-gray-600/50 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-blue-900/30 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-medium text-white mb-3">Content Coming Soon</h3>
                  <p className="text-gray-300">This phase is currently being developed by our expert team.</p>
                  <p className="text-sm text-gray-400 mt-2">We're creating high-quality learning materials to ensure you get the most out of your journey.</p>
                  
                  <div className="mt-6 p-4 bg-blue-900/20 border border-blue-800/30 rounded-lg">
                    <p className="text-sm text-blue-300">💡 <strong>Coming in this phase:</strong> Interactive lessons, practical exercises, and expert guidance to help you master the skills needed for this stage of the Cognitive Activation Protocol™.</p>
                  </div>
                  
                  <div className="mt-6 flex justify-center">
                    <div className="animate-pulse flex space-x-2">
                      <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
                      <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
                      <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Rewards Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800/80 rounded-lg p-4 border border-gray-700/50 shadow-lg"
          >
            <h3 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-400" />
              Rewards
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-200">
                <div className="bg-blue-900/30 p-1.5 rounded-full">
                  <span className="text-blue-400 text-sm">+{phase.xpReward || 100} XP</span>
                </div>
                <span className="text-sm text-gray-400">Experience Points</span>
                <div className="relative group">
                  <button className="text-blue-400 hover:text-blue-300 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 16v-4"></path>
                      <path d="M12 8h.01"></path>
                    </svg>
                  </button>
                  <div className="absolute z-50 w-64 p-3 bg-gray-800 border border-gray-700 rounded-md shadow-lg text-sm text-gray-300 -right-2 top-6 hidden group-hover:block">
                    <p>XP (Experience Points) measure your progress in the journey. Accumulate XP to level up and unlock new features and rewards.</p>
                    <div className="absolute -top-2 right-2 w-3 h-3 bg-gray-800 border-t border-l border-gray-700 transform rotate-45"></div>
                  </div>
                </div>
              </div>
              
              {phase.nftReward && (
                <div className="flex items-center gap-2 text-gray-200">
                  <div className="bg-purple-900/30 p-1.5 rounded-full">
                    <span className="text-purple-400 text-sm">Badge {phase.nftReward}</span>
                  </div>
                  <span className="text-sm text-gray-400">NFT Explorer</span>
                  <div className="relative group">
                    <button className="text-blue-400 hover:text-blue-300 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 16v-4"></path>
                        <path d="M12 8h.01"></path>
                      </svg>
                    </button>
                    <div className="absolute z-50 w-64 p-3 bg-gray-800 border border-gray-700 rounded-md shadow-lg text-sm text-gray-300 -right-2 top-6 hidden group-hover:block">
                      <p>NFT Explorer badges are unique digital collectibles that prove your skills and can be displayed in your profile or exported to compatible wallets.</p>
                      <div className="absolute -top-2 right-2 w-3 h-3 bg-gray-800 border-t border-l border-gray-700 transform rotate-45"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>  
            {phase.locked && (
                <div className="flex items-center gap-2 bg-gray-700/30 px-3 py-1.5 rounded-md">
                  <Lock className="w-5 h-5 text-gray-300" />
                  <span className="text-gray-200">Phase locked</span>
                </div>
              )}
          </motion.div>

          {/* Progress Bar - Cognitive Activation Protocol™ */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-lg border border-gray-700/50 shadow-lg"
          >
            <h3 className="text-xl font-medium text-white mb-4 flex items-center gap-2">
              <Award className="w-6 h-6 text-[#14F195]" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 font-bold">
                Cognitive Activation Protocol™
              </span>
            </h3>
            
            <div className="flex items-center gap-3">
              <div className="flex-grow">
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-white font-medium">Global Progress</span>
                  <span className="font-bold text-blue-300">{Math.round(progress)}% <span className="text-purple-300">({totalXP} XP)</span></span>
                </div>
                <div className="relative w-full h-4 bg-gray-700/70 rounded-full overflow-hidden">
                  <div 
                    className={`absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-purple-600 ${progress >= 100 ? 'animate-pulse-slow' : ''}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                
                {/* Phases du protocole */}
                <div className="flex justify-between mt-6">
                  {PROTOCOL_PHASES.map((phase, index) => {
                    const isActive = protocolPhase === phase;
                    const isCompleted = PROTOCOL_PHASES.indexOf(protocolPhase) > index;
                    
                    return (
                      <div key={phase} className="flex flex-col items-center group">
                        <div 
                          className={`
                            w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium
                            ${isActive ? PROTOCOL_COLORS[phase]?.bg : isCompleted ? 'bg-green-600' : 'bg-gray-700'}
                            ${isActive ? 'ring-2 ring-white/50 shadow-lg shadow-blue-500/20' : ''}
                            transition-all duration-200 ease-in-out
                            ${isCompleted ? 'scale-100' : 'group-hover:scale-110'}
                          `}
                        >
                          {(() => {
                            const IconComponent = getIconComponent(PROTOCOL_COLORS[phase]?.icon);
                            return <IconComponent className="h-5 w-5" />;
                          })()}
                        </div>
                        <span className={`text-sm mt-2 ${isActive ? 'text-white font-medium' : isCompleted ? 'text-green-400' : 'text-gray-400'}`}>
                          {phase}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Navigation Buttons */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={onPreviousPhase || storePreviousPhase}
              disabled={isFirstPhase}
              className="flex items-center gap-2 border-gray-700 hover:bg-gray-800 hover:text-white"
              title="Go to the previous phase of this journey"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous Phase
            </Button>
            
            {isLastPhase ? (
              <Button
                onClick={onNextPhase || storeNextPhase}
                className="flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 relative group animate-pulse-slow"
                title="Complete the journey and unlock all rewards"
              >
                <Award className="w-4 h-4 mr-1" />
                Complete Journey
                <div className="absolute z-50 w-64 p-3 bg-gray-800 border border-gray-700 rounded-md shadow-lg text-sm text-gray-300 -right-2 bottom-12 hidden group-hover:block">
                  <p>Click to complete the final phase and unlock all your Neuro-Dividends™ and Cognitive Lock™ rewards!</p>
                  <div className="absolute -bottom-2 right-2 w-3 h-3 bg-gray-800 border-b border-r border-gray-700 transform rotate-45"></div>
                </div>
              </Button>
            ) : (
              <Button
                onClick={onNextPhase || storeNextPhase}
                disabled={isLastPhase}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 relative group"
                title="Progress to the next phase of this journey and earn XP rewards"
              >
                Next Phase
                <ChevronRight className="w-4 h-4" />
                <div className="absolute z-50 w-64 p-3 bg-gray-800 border border-gray-700 rounded-md shadow-lg text-sm text-gray-300 -right-2 bottom-12 hidden group-hover:block">
                  <p>Complete this phase and move to the next one. Your progress will be saved and XP rewards will be added to your profile.</p>
                  <div className="absolute -bottom-2 right-2 w-3 h-3 bg-gray-800 border-b border-r border-gray-700 transform rotate-45"></div>
                </div>
              </Button>
            )}
            </div>
            <div className="text-center text-xs text-gray-400 mt-2">
              <span>Tip: You can also use <kbd className="px-1.5 py-0.5 bg-gray-800 border border-gray-700 rounded">←</kbd> and <kbd className="px-1.5 py-0.5 bg-gray-800 border border-gray-700 rounded">→</kbd> arrow keys to navigate between phases</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
