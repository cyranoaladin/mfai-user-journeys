import { FC } from 'react';
import { motion } from 'framer-motion';

export interface FilterOption {
  id: string;
  label: string;
  icon?: string;
}

export interface JourneyFiltersProps {
  profileTypes: FilterOption[];
  missionTypes: FilterOption[];
  selectedProfileType: string | null;
  selectedMissionType: string | null;
  onProfileTypeChange: (type: string | null) => void;
  onMissionTypeChange: (type: string | null) => void;
  onClearFilters?: () => void;
}

const JourneyFilters: FC<JourneyFiltersProps> = ({
  profileTypes,
  missionTypes,
  selectedProfileType,
  selectedMissionType,
  onProfileTypeChange,
  onMissionTypeChange,
  onClearFilters,
}) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div
      className="journey-filters bg-gray-800/70 backdrop-blur-md p-4 rounded-xl mb-8 sticky top-0 z-10 border border-gray-700/50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Clear Filters Button (only shown when filters are active) */}
      {(selectedProfileType !== null || selectedMissionType !== null) && onClearFilters && (
        <div className="flex justify-end mb-3">
          <button
            onClick={onClearFilters}
            className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
          >
            <span>Clear all filters</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Profile Type Filters */}
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Filter by Profile</h3>
          <div className="flex flex-wrap gap-2">
            <motion.button
              variants={itemVariants}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedProfileType === null
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onClick={() => onProfileTypeChange(null)}
            >
              All Profiles
            </motion.button>

            {profileTypes.map(type => (
              <motion.button
                key={type.id}
                variants={itemVariants}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${
                  selectedProfileType === type.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                onClick={() => onProfileTypeChange(type.id)}
              >
                {type.icon && <span>{type.icon}</span>}
                {type.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Mission Type Filters */}
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Filter by Mission</h3>
          <div className="flex flex-wrap gap-2">
            <motion.button
              variants={itemVariants}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedMissionType === null
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onClick={() => onMissionTypeChange(null)}
            >
              All Missions
            </motion.button>

            {missionTypes.map(type => (
              <motion.button
                key={type.id}
                variants={itemVariants}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${
                  selectedMissionType === type.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                onClick={() => onMissionTypeChange(type.id)}
              >
                {type.icon && <span>{type.icon}</span>}
                {type.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default JourneyFilters;
