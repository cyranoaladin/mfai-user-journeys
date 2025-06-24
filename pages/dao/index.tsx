import React, { FC, useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/components/Layout/MainLayout';
import { useStore } from '@/utils/store';
import { Users, Vote, FileText, BarChart3, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
// import { Progress } from '@/components/ui/progress';

/**
 * DAO Page
 * 
 * Displays DAO governance information, proposals, and voting interface
 */
const DAOPage: FC = () => {
  const { walletConnected, totalXP } = useStore();
  const [activeTab, setActiveTab] = useState('proposals');

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

  // Mock proposals data - in a real app, this would come from an API or store
  const proposals = [
    {
      id: 'prop-1',
      title: 'Add New Learning Journey: Web3 Security',
      description: 'Proposal to create a new journey focused on Web3 security best practices and auditing techniques.',
      status: 'active',
      votesFor: 1250,
      votesAgainst: 320,
      endTime: '2025-07-15',
      creator: '0x1234...5678'
    },
    {
      id: 'prop-2',
      title: 'Increase XP Rewards for Community Contributions',
      description: 'Increase XP rewards by 20% for users who contribute to community discussions and help other members.',
      status: 'active',
      votesFor: 980,
      votesAgainst: 210,
      endTime: '2025-07-10',
      creator: '0x8765...4321'
    },
    {
      id: 'prop-3',
      title: 'Partner with DeFi Academy for Cross-Platform Learning',
      description: 'Establish a partnership with DeFi Academy to offer cross-platform learning opportunities and shared credentials.',
      status: 'closed',
      votesFor: 1560,
      votesAgainst: 890,
      endTime: '2025-06-20',
      creator: '0x2468...1357',
      result: 'passed'
    }
  ];

  return (
    <MainLayout title="DAO Governance | Money Factory AI">
      <div className="container mx-auto px-4 py-10 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">DAO Governance</h1>
          <p className="text-gray-400">Participate in the governance of Money Factory AI through proposals and voting</p>
        </motion.div>

        {!walletConnected ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-800/70 backdrop-blur-md rounded-xl p-8 border border-gray-700/50 shadow-lg text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-blue-900/30 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-blue-400" />
              </div>
            </div>
            <h2 className="text-xl font-medium text-white mb-3">Connect Your Wallet to Participate</h2>
            <p className="text-gray-300 mb-6">Connect your wallet to view proposals, vote, and participate in the DAO governance.</p>
          </motion.div>
        ) : (
          <>
            {/* DAO Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            >
              <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-white">Your Voting Power</h3>
                  <Vote className="h-5 w-5 text-blue-400" />
                </div>
                <p className="text-3xl font-bold text-blue-300">{Math.floor(totalXP / 10)} VP</p>
                <p className="text-sm text-gray-400 mt-1">Based on your XP: {totalXP}</p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-white">Active Proposals</h3>
                  <FileText className="h-5 w-5 text-green-400" />
                </div>
                <p className="text-3xl font-bold text-green-300">2</p>
                <p className="text-sm text-gray-400 mt-1">Open for voting</p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-white">DAO Treasury</h3>
                  <BarChart3 className="h-5 w-5 text-purple-400" />
                </div>
                <p className="text-3xl font-bold text-purple-300">125,000 MFAI</p>
                <p className="text-sm text-gray-400 mt-1">Available for proposals</p>
              </div>
            </motion.div>

            {/* Tabs */}
            <div className="flex border-b border-gray-700 mb-8">
              <button
                className={`px-4 py-2 font-medium ${activeTab === 'proposals' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
                onClick={() => setActiveTab('proposals')}
              >
                Proposals
              </button>
              <button
                className={`px-4 py-2 font-medium ${activeTab === 'create' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
                onClick={() => setActiveTab('create')}
              >
                Create Proposal
              </button>
              <button
                className={`px-4 py-2 font-medium ${activeTab === 'history' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
                onClick={() => setActiveTab('history')}
              >
                Voting History
              </button>
            </div>

            {/* Proposals List */}
            {activeTab === 'proposals' && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {proposals.map((proposal) => (
                  <motion.div
                    key={proposal.id}
                    variants={itemVariants}
                    className="bg-gray-800/70 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 shadow-lg"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          {proposal.status === 'active' ? (
                            <span className="px-2 py-1 text-xs font-medium bg-green-900/30 text-green-400 rounded-full">Active</span>
                          ) : (
                            <span className="px-2 py-1 text-xs font-medium bg-gray-700/50 text-gray-300 rounded-full">Closed</span>
                          )}
                          <span className="text-sm text-gray-400">ID: {proposal.id}</span>
                        </div>
                        <h3 className="text-xl font-medium text-white mb-2">{proposal.title}</h3>
                        <p className="text-gray-300 mb-4">{proposal.description}</p>
                        
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-green-400">For: {proposal.votesFor}</span>
                            <span className="text-red-400">Against: {proposal.votesAgainst}</span>
                          </div>
                          <div className="relative w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className="absolute top-0 left-0 h-full bg-green-500"
                              style={{ width: `${(proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100}%` }}
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-400">
                          <Clock className="h-4 w-4 mr-1" />
                          {proposal.status === 'active' ? (
                            <span>Ends on {proposal.endTime}</span>
                          ) : (
                            <span>{proposal.result === 'passed' ? 'Passed' : 'Rejected'} on {proposal.endTime}</span>
                          )}
                        </div>
                      </div>
                      
                      {proposal.status === 'active' && (
                        <div className="flex flex-col gap-2">
                          <Button variant="default" className="bg-green-600 hover:bg-green-700">Vote For</Button>
                          <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-900/20">Vote Against</Button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Create Proposal Form */}
            {activeTab === 'create' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gray-800/70 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 shadow-lg"
              >
                <h2 className="text-xl font-bold text-white mb-4">Create a New Proposal</h2>
                <p className="text-gray-400 mb-6">Submit a new proposal for the DAO to vote on. You need at least 100 VP to create a proposal.</p>
                
                <form className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                    <input
                      type="text"
                      id="title"
                      className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter proposal title"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                    <textarea
                      id="description"
                      rows={4}
                      className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Describe your proposal in detail"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-300 mb-1">Voting Duration</label>
                    <select
                      id="duration"
                      className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="7">7 days</option>
                      <option value="14">14 days</option>
                      <option value="30">30 days</option>
                    </select>
                  </div>
                  
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Submit Proposal
                  </Button>
                </form>
              </motion.div>
            )}

            {/* Voting History */}
            {activeTab === 'history' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gray-800/70 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 shadow-lg"
              >
                <h2 className="text-xl font-bold text-white mb-4">Your Voting History</h2>
                <p className="text-gray-400 mb-6">Record of your past votes and proposal participations.</p>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                    <div>
                      <h3 className="text-white font-medium">Partner with DeFi Academy</h3>
                      <p className="text-sm text-gray-400">Voted: For</p>
                    </div>
                    <div className="text-green-400">+10 VP used</div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                    <div>
                      <h3 className="text-white font-medium">Add New Learning Journey: Web3 Security</h3>
                      <p className="text-sm text-gray-400">Voted: For</p>
                    </div>
                    <div className="text-green-400">+15 VP used</div>
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default DAOPage;
