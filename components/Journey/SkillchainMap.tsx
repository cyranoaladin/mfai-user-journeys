import { FC } from 'react';
import { motion } from 'framer-motion';

interface SkillchainMapProps {
  relatedJourneys: { title: string; slug: string; icon: string }[];
}

/**
 * SkillchainMap - simple visualization connecting this journey to others
 * This is a lightweight placeholder showing how journeys relate to one another.
 */
const SkillchainMap: FC<SkillchainMapProps> = ({ relatedJourneys }) => {
  return (
    <div className="skillchain-map bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
      <h3 className="text-lg font-bold mb-4">Skillchain Map™</h3>
      <div className="flex flex-wrap gap-4 justify-center">
        {relatedJourneys.map((journey, index) => (
          <motion.a
            key={journey.slug}
            href={`/journey/${journey.slug}`}
            className="flex flex-col items-center text-sm text-gray-300 hover:text-white"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center mb-1">
              <span className="text-xl">{journey.icon}</span>
            </div>
            {journey.title}
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default SkillchainMap;
