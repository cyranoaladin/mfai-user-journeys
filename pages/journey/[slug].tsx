import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths } from 'next';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { getJourneyBySlug, getAllJourneys } from '../../utils/markdownParser';
import { JourneyContent } from '../../utils/markdownParser';
import ProofBadge from '../../components/Journey/ProofBadge';
import ZynoTeaser from '../../components/Journey/ZynoTeaser';
import ProofStack from '../../components/Journey/ProofStack';
import SkillchainMap from '../../components/Journey/SkillchainMap';
import { useStore } from '../../utils/store';

/**
 * Journey Detail Page - Dynamic route for each user journey
 * 
 * Features:
 * - Displays the journey details from markdown content
 * - Shows phases, rewards, and badges
 * - Animated transitions and micro-interactions
 * - Zyno integration teaser
 */
interface JourneyDetailPageProps {
  journey: JourneyContent;
}

const JourneyDetailPage: FC<JourneyDetailPageProps> = ({ journey }) => {
  const router = useRouter();
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const { walletConnected, walletAddress } = useStore();
  
  // If the page is in fallback mode
  if (router.isFallback) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-bold">Loading journey...</h2>
        </div>
      </div>
    );
  }

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
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Handle phase navigation
  const goToNextPhase = () => {
    if (journey && currentPhaseIndex < journey.phases.length - 1) {
      setCurrentPhaseIndex(currentPhaseIndex + 1);
    }
  };

  const goToPrevPhase = () => {
    if (currentPhaseIndex > 0) {
      setCurrentPhaseIndex(currentPhaseIndex - 1);
    }
  };

  // Current phase - fallback to the first phase if index is invalid
  const currentPhase = journey.phases && journey.phases.length > 0
    ? journey.phases[currentPhaseIndex] || journey.phases[0]
    : {
        name: 'Introductory Phase',
        content: 'No content available for this phase.',
        title: 'Introduction',
        icon: '✨'
      };

  return (
    <div className="journey-detail-page bg-gray-900 min-h-screen text-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 pt-16 pb-24 px-6">
        <div className="container mx-auto">
          <motion.div
            className="flex flex-col md:flex-row gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Journey Icon */}
            <motion.div 
              className="flex-shrink-0"
              variants={itemVariants}
            >
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center text-4xl md:text-5xl shadow-lg shadow-blue-900/30">
                {journey.metadata.icon || '🚀'}
              </div>
            </motion.div>

            {/* Journey Info */}
            <motion.div className="flex-grow" variants={itemVariants}>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                {journey.metadata.title}
              </h1>
              <p className="text-xl text-gray-300 mb-4">{journey.metadata.subtitle}</p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-sm">
                  {journey.metadata.profileType} Profile
                </span>
                <span className="px-3 py-1 bg-purple-900/50 text-purple-300 rounded-full text-sm">
                  {journey.metadata.missionType} Mission
                </span>
              </div>
              
              <p className="text-gray-400">{journey.metadata.tagline}</p>
            </motion.div>

            {/* Wallet Status */}
            <motion.div className="flex-shrink-0" variants={itemVariants}>
              <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm ${walletConnected ? 'bg-green-900 text-green-300' : 'bg-gray-800 text-gray-300'}`}>
                <div className={`w-2 h-2 rounded-full mr-2 ${walletConnected ? 'bg-green-400' : 'bg-gray-500'}`}></div>
                {walletConnected ?
                  `Connected: ${walletAddress?.substring(0, 6)}...${walletAddress?.substring(walletAddress?.length - 4)}` :
                  'Wallet Not Connected'
                }
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Phases */}
          <div className="lg:col-span-2">
            {/* Phase Navigation */}
            <motion.div 
              className="flex items-center justify-between mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <button 
                onClick={goToPrevPhase}
                disabled={currentPhaseIndex === 0}
                className={`px-4 py-2 rounded-lg ${currentPhaseIndex === 0 ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-gray-800 hover:bg-gray-700 text-white'}`}
              >
                Previous Phase
              </button>
              <div className="text-center">
                <span className="text-sm text-gray-400">Phase {currentPhaseIndex + 1} of {journey.phases?.length || 1}</span>
                <h2 className="text-xl font-semibold">{currentPhase?.name || 'Phase'}</h2>
              </div>
              <button 
                onClick={goToNextPhase}
                disabled={currentPhaseIndex === journey.phases.length - 1}
                className={`px-4 py-2 rounded-lg ${currentPhaseIndex === journey.phases.length - 1 ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-gray-800 hover:bg-gray-700 text-white'}`}
              >
                Next Phase
              </button>
            </motion.div>

            {/* Current Phase Content */}
            <motion.div
              key={currentPhaseIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 mb-8"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-900/50 flex items-center justify-center text-2xl">
                  {currentPhase?.icon || '✨'}
                </div>
                <h3 className="text-2xl font-bold">{currentPhase?.title || currentPhase?.name || 'Phase'}</h3>
              </div>
              <div 
                className="prose prose-invert prose-blue max-w-none"
                dangerouslySetInnerHTML={{ __html: currentPhase.content }}
              />
            </motion.div>

            {/* Why It Matters */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="bg-gray-800/30 backdrop-blur-md rounded-xl p-6 border border-gray-700/30 mb-8"
            >
              <motion.h3 
                className="text-xl font-bold mb-4 flex items-center gap-2"
                variants={itemVariants}
              >
                <span className="text-blue-400">✨</span> Why It Matters
              </motion.h3>
              <motion.div 
                className="prose prose-invert prose-blue max-w-none"
                variants={itemVariants}
                dangerouslySetInnerHTML={{ __html: journey.whyItMatters }}
              />
            </motion.div>
          </div>

          {/* Right Column - Rewards & CTA */}
          <div>
            {/* Protocol Proofs */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 mb-8"
            >
              <motion.h3 
                className="text-xl font-bold mb-4 flex items-center gap-2"
                variants={itemVariants}
              >
                <span className="text-purple-400">🏆</span> Protocol Proofs™
              </motion.h3>
              
              <motion.div className="space-y-4" variants={itemVariants}>
                {journey.rewards.map((reward, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-lg bg-gray-800/70 border border-gray-700/50"
                  >
                    <ProofBadge proof={reward.proof} size="md" />
                    <div>
                      <h4 className="font-medium">{reward.milestone}</h4>
                      <p className="text-sm text-gray-400">{reward.utility}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Zyno Teaser */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mb-8"
            >
              <ZynoTeaser journeyTitle={journey.metadata.title} />
            </motion.div>

            {/* Proof Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <ProofStack proofs={journey.rewards.map(r => r.proof)} />
            </motion.div>

            {/* Skillchain Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-8"
            >
              <SkillchainMap
                relatedJourneys={journey.related || []}
              />
            </motion.div>

            {/* Call to Action */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-md rounded-xl p-6 border border-blue-700/30"
            >
              <motion.h3 
                className="text-xl font-bold mb-4"
                variants={itemVariants}
              >
                Ready to Begin?
              </motion.h3>
              
              <motion.div className="space-y-4" variants={itemVariants}>
                {journey.callToAction.map((cta, index) => (
                  <p key={index} className="text-gray-300">{cta}</p>
                ))}
                
                <button 
                  className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2 mt-4"
                >
                  <span>Start This Journey</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
                
                <p className="text-center text-sm text-gray-400 mt-2">
                  {walletConnected ? 'Your progress will be tracked' : 'Connect wallet to track progress'}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JourneyDetailPage;

// This function generates all possible routes at build time
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    // Retrieve all journeys
    const journeys = await getAllJourneys();

    // Generate paths for each journey
    const paths = journeys.map((journey) => ({
      params: { slug: journey.metadata.slug },
    }));
    
    return {
      paths,
      // fallback: true allows new pages to be generated on demand
      fallback: true,
    };
  } catch (error) {
    console.error('Error generating paths:', error);
    return {
      paths: [],
      fallback: true,
    };
  }
};

// This function fetches the data for each page at build time
export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    if (!params?.slug) {
      return { notFound: true };
    }
    
    const journey = await getJourneyBySlug(params.slug as string);
    
    if (!journey) {
      return { notFound: true };
    }
    
    return {
      props: {
        journey,
      },
      // Revalidate every hour
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error fetching journey:', error);
    return { notFound: true };
  }
};
