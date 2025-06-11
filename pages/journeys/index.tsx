import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import EnhancedJourneyCard from '../../components/Journey/EnhancedJourneyCard';
import JourneyFilters, { FilterOption, JourneyFiltersProps } from '../../components/Journey/JourneyFilters';
import { useStore } from '../../utils/store';
import { getAllJourneys } from '../../utils/markdownParser';
import { JourneyContent } from '../../utils/markdownParser';

/**
 * Journeys Page - Entry point showing all available user journeys
 * 
 * Features:
 * - Displays all persona journey cards in a responsive grid
 * - Dynamic filtering by profile type and mission type
 * - Animated entrance with Framer Motion
 * - Zyno welcome message
 * - Wallet connection status
 */
interface JourneysPageProps {
  journeyData: JourneyContent[];
}

const JourneysPage: FC<JourneysPageProps> = ({ journeyData }) => {
  const { walletConnected, walletAddress } = useStore();
  const [filteredJourneys, setFilteredJourneys] = useState<JourneyContent[]>(journeyData);
  const [loading, setLoading] = useState(false);
  const [selectedProfileType, setSelectedProfileType] = useState<string | null>(null);
  const [selectedMissionType, setSelectedMissionType] = useState<string | null>(null);
  
  // Define available profile and mission types
  const profileTypes: FilterOption[] = [
    { id: 'creator', label: 'Creator', icon: '🎨' },
    { id: 'investor', label: 'Investor', icon: '💰' },
    { id: 'builder', label: 'Builder', icon: '🛠️' },
    { id: 'analyst', label: 'Analyst', icon: '📊' }
  ];
  
  const missionTypes: FilterOption[] = [
    { id: 'learn', label: 'Learn' },
    { id: 'earn', label: 'Earn' },
    { id: 'build', label: 'Build' },
    { id: 'connect', label: 'Connect' }
  ];

  // Journeys are now loaded via getStaticProps

  // Filter journeys based on selected filters
  const filterJourneys = () => {
    let filtered = [...journeyData];
    
    if (selectedProfileType) {
      filtered = filtered.filter(journey => 
        journey.metadata.profileType.toLowerCase().includes(selectedProfileType.toLowerCase())
      );
    }
    
    if (selectedMissionType) {
      filtered = filtered.filter(journey => 
        journey.metadata.missionType.toLowerCase().includes(selectedMissionType.toLowerCase())
      );
    }
    
    setFilteredJourneys(filtered);
  };
  
  // Update filtered journeys when filters change
  useState(() => {
    filterJourneys();
  });

  // Handle filter changes
  const handleProfileTypeChange = (profileType: string) => {
    setSelectedProfileType(prevType => {
      const newType = prevType === profileType ? null : profileType;
      return newType;
    });
    filterJourneys();
  };
  
  const handleMissionTypeChange = (missionType: string) => {
    setSelectedMissionType(prevType => {
      const newType = prevType === missionType ? null : missionType;
      return newType;
    });
    filterJourneys();
  };
  
  const handleClearFilters = () => {
    setSelectedProfileType(null);
    setSelectedMissionType(null);
    setFilteredJourneys(journeyData);
  };

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

  // If loading
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="journeys-page bg-gray-900 min-h-screen text-white p-6 md:p-10">
      <div className="container mx-auto">
        <motion.header
          className="mb-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4"
            variants={itemVariants}
          >
            Money Factory AI Journeys
          </motion.h1>
          <motion.p
            className="text-gray-300 max-w-2xl"
            variants={itemVariants}
          >
            Discover your path through our AI-augmented entrepreneurship protocols. Each journey represents a unique way to engage with our platform and earn Protocol Proofs™.
          </motion.p>

          {/* Wallet Status */}
          <motion.div className="mt-6" variants={itemVariants}>
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm ${walletConnected ? 'bg-green-900 text-green-300' : 'bg-gray-800 text-gray-300'}`}>
              <div className={`w-2 h-2 rounded-full mr-2 ${walletConnected ? 'bg-green-400' : 'bg-gray-500'}`}></div>
              {walletConnected ?
                `Connected: ${walletAddress?.substring(0, 6)}...${walletAddress?.substring(walletAddress?.length - 4)}` :
                'Wallet Not Connected'
              }
            </div>
          </motion.div>
        </motion.header>

        {/* Journey Filters */}
        <motion.div
          className="mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <JourneyFilters
            profileTypes={profileTypes}
            missionTypes={missionTypes}
            selectedProfileType={selectedProfileType}
            selectedMissionType={selectedMissionType}
            onProfileTypeChange={(type) => handleProfileTypeChange(type || '')}
            onMissionTypeChange={(type) => handleMissionTypeChange(type || '')}
            onClearFilters={handleClearFilters}
          />
        </motion.div>

        {/* Filtered Results Count */}
        {(selectedProfileType || selectedMissionType) && (
          <motion.div
            className="mb-6 text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Showing {filteredJourneys.length} {filteredJourneys.length === 1 ? 'journey' : 'journeys'}
            {selectedProfileType && ` for ${selectedProfileType} profiles`}
            {selectedMissionType && selectedProfileType && ' and'}
            {selectedMissionType && ` with ${selectedMissionType} missions`}
          </motion.div>
        )}

        {/* Empty State */}
        {filteredJourneys.length === 0 && !loading && (
          <motion.div 
            className="col-span-full text-center py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-gray-400 mb-4">No journeys match your selected filters.</p>
            <button 
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-white transition-colors"
              onClick={handleClearFilters}
            >
              Clear Filters
            </button>
          </motion.div>
        )}
        
        {/* Journey Grid */}
        {filteredJourneys.length > 0 && (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredJourneys.map((journey, index) => (
              <motion.div
                key={journey.metadata.title}
                variants={itemVariants}
              >
                <EnhancedJourneyCard
                  title={journey.metadata.title}
                  subtitle={journey.metadata.subtitle}
                  tagline={journey.metadata.tagline}
                  target={journey.metadata.target}
                  profileType={journey.metadata.profileType}
                  missionType={journey.metadata.missionType}
                  icon={journey.metadata.icon || '🚀'}
                  proofs={journey.rewards.map(r => r.proof)}
                  slug={journey.metadata.slug}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

    </div>
  );
};

export default JourneysPage;

// This function runs on the server at build time
export const getStaticProps: GetStaticProps = async () => {
  try {
    const journeyData = await getAllJourneys();
    
    return {
      props: {
        journeyData,
      },
      // Revalidate every hour
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error fetching journeys:', error);
    return {
      props: {
        journeyData: [],
      },
      revalidate: 60, // Retry sooner if there was an error
    };
  }
};
