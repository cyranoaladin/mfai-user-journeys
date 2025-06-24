import { FC, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy } from 'lucide-react';

interface XPTrackerProps {
  totalXP: number;
  nextRewardAt: number;
}

/**
 * XPTracker - Shows global XP and upcoming rewards
 *
 * Features:
 * - XP progress ring
 * - Milestone animation when level up
 * - Shows bonus for NFT Pass holders
 */
const XPTracker: FC<XPTrackerProps> = ({ totalXP, nextRewardAt }) => {
  const progressRef = useRef<SVGCircleElement>(null);

  // State for animation
  const [prevXP, setPrevXP] = useState(totalXP);
  const [showLevelUp, setShowLevelUp] = useState(false);

  // Calculate progress percentage
  const progress = Math.min(totalXP / nextRewardAt, 1);
  const circumference = 2 * Math.PI * 40; // Circle radius is 40

  useEffect(() => {
    if (progressRef.current) {
      const offset = circumference - progress * circumference;
      progressRef.current.style.strokeDashoffset = `${offset}`;
    }

    // Check if level changed
    const prevLevel = calculateLevel(prevXP);
    const currentLevel = calculateLevel(totalXP);

    if (currentLevel > prevLevel) {
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 3000);
    }

    setPrevXP(totalXP);
  }, [totalXP, progress, circumference, prevXP]);

  // Calculate user level based on XP
  const calculateLevel = (xp: number) => {
    return Math.floor(xp / 100) + 1;
  };

  const level = calculateLevel(totalXP);
  const levelTitle = getLevelTitle(level);

  function getLevelTitle(level: number): string {
    if (level < 5) return 'Explorer';
    if (level < 10) return 'Builder';
    if (level < 15) return 'Creator';
    if (level < 20) return 'Innovator';
    return 'Visionary';
  }

  return (
    <div className="xp-tracker">
      {/* Level Up Animation */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            className="level-up-notification absolute top-0 left-0 right-0 bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white px-4 py-2 rounded-md shadow-lg z-20 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex items-center justify-center">
              <Trophy className="w-5 h-5 mr-2" />
              <span className="font-medium">
                Level Up! You&apos;re now {levelTitle} Level {level}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-4">
        {/* XP Progress Ring */}
        <div className="xp-ring relative w-20 h-20">
          <svg width="100%" height="100%" viewBox="0 0 100 100" className="transform -rotate-90">
            {/* Background circle */}
            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#1f2937" strokeWidth="8" />

            {/* Progress circle */}
            <circle
              ref={progressRef}
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="url(#xp-gradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
              className="transition-all duration-1000 ease-out"
            />

            {/* Gradient definition */}
            <defs>
              <linearGradient id="xp-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>

          {/* XP Level in center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-white">{level}</span>
            <span className="text-xs text-gray-400">Level</span>
          </div>
        </div>

        {/* XP Info */}
        <div className="xp-info">
          <h3 className="text-lg font-bold text-white">{levelTitle}</h3>
          <div className="text-sm text-gray-300 mb-1">
            <span className="text-blue-400 font-medium">{totalXP} XP</span> total
          </div>
          <div className="text-xs text-gray-400">{nextRewardAt - totalXP} XP until next reward</div>
        </div>
      </div>

      {/* Next Reward Preview */}
      <motion.div
        className="next-reward mt-4 p-3 bg-gray-800 rounded-lg border border-gray-700 flex items-center gap-3"
        whileHover={{ scale: 1.02 }}
      >
        <div className="reward-icon w-10 h-10 bg-indigo-900 rounded-full flex items-center justify-center text-lg">
          🎁
        </div>
        <div>
          <h4 className="text-sm font-medium text-white">Next Reward</h4>
          <p className="text-xs text-gray-400">Unlock at {nextRewardAt} XP</p>
        </div>
        <div className="ml-auto">
          <span className="text-xs bg-blue-900 text-blue-200 px-2 py-1 rounded-full">
            {Math.round(progress * 100)}%
          </span>
        </div>
      </motion.div>

      {/* NFT Pass Bonus */}
      <div className="nft-pass-bonus mt-3 text-xs text-center text-gray-400">
        <i className="fas fa-info-circle mr-1"></i>
        NFT Pass holders earn <span className="text-yellow-400">2x XP</span>
      </div>
    </div>
  );
};

export default XPTracker;
