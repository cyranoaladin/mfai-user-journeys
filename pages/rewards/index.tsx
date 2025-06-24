import React, { FC } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/components/Layout/MainLayout';
import { useStore } from '@/utils/store';
import { Award, Star, Shield, Trophy } from 'lucide-react';

/**
 * Rewards Page
 * 
 * Displays user's earned rewards, badges, and achievements
 */
const RewardsPage: FC = () => {
  const { totalXP, walletConnected } = useStore();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Mock rewards data - in a real app, this would come from an API or store
  const userRewards = [
    {
      id: 'reward-1',
      title: 'Cognitive Learning Badge',
      description: 'Completed the first phase of a journey',
      icon: Award,
      color: 'blue',
      xp: 100,
      date: '2025-06-20'
    },
    {
      id: 'reward-2',
      title: 'Synaptic Builder Badge',
      description: 'Completed the second phase of a journey',
      icon: Star,
      color: 'green',
      xp: 150,
      date: '2025-06-22'
    },
    {
      id: 'reward-3',
      title: 'Neural Prover Badge',
      description: 'Completed the third phase of a journey',
      icon: Shield,
      color: 'purple',
      xp: 200,
      date: '2025-06-23'
    }
  ];

  return (
    <MainLayout title="Your Rewards | Money Factory AI">
      <div className="container mx-auto px-4 py-10 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Your Rewards</h1>
          <p className="text-gray-400">Track your achievements and earned rewards across all journeys</p>
        </motion.div>

        {!walletConnected ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-800/70 backdrop-blur-md rounded-xl p-8 border border-gray-700/50 shadow-lg text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-blue-900/30 rounded-full flex items-center justify-center">
                <Trophy className="h-8 w-8 text-blue-400" />
              </div>
            </div>
            <h2 className="text-xl font-medium text-white mb-3">Connect Your Wallet to View Rewards</h2>
            <p className="text-gray-300 mb-6">Your rewards are stored on-chain. Connect your wallet to view and manage your earned badges and achievements.</p>
          </motion.div>
        ) : (
          <>
            {/* XP Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 shadow-lg mb-8"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Total Experience</h2>
                  <p className="text-gray-400">Your accumulated XP across all journeys</p>
                </div>
                <div className="bg-blue-900/40 px-4 py-2 rounded-lg border border-blue-500/20">
                  <span className="text-2xl font-bold text-blue-300">{totalXP} XP</span>
                </div>
              </div>
            </motion.div>

            {/* Rewards List */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {userRewards.map((reward) => {
                const IconComponent = reward.icon;
                return (
                  <motion.div
                    key={reward.id}
                    variants={itemVariants}
                    className="bg-gray-800/70 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 shadow-lg"
                  >
                    <div className="flex items-start">
                      <div className={`w-12 h-12 rounded-full bg-${reward.color}-900/30 flex items-center justify-center mr-4`}>
                        <IconComponent className={`h-6 w-6 text-${reward.color}-400`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white mb-1">{reward.title}</h3>
                        <p className="text-gray-400 text-sm mb-3">{reward.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-blue-300">+{reward.xp} XP</span>
                          <span className="text-xs text-gray-500">Earned on {reward.date}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* No Rewards State (hidden when rewards exist) */}
            {userRewards.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gray-800/70 backdrop-blur-md rounded-xl p-8 border border-gray-700/50 shadow-lg text-center"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gray-700/30 rounded-full flex items-center justify-center">
                    <Trophy className="h-8 w-8 text-gray-400" />
                  </div>
                </div>
                <h2 className="text-xl font-medium text-white mb-3">No Rewards Yet</h2>
                <p className="text-gray-300 mb-6">Complete journey phases to earn rewards and badges.</p>
              </motion.div>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default RewardsPage;
