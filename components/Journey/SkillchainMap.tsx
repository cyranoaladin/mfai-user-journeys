import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface RelatedJourney {
  title: string;
  slug: string;
  profileType: string;
}

interface SkillchainMapProps {
  relatedJourneys: RelatedJourney[];
}

export default function SkillchainMap({ relatedJourneys }: SkillchainMapProps) {
  if (!relatedJourneys || relatedJourneys.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <span className="mr-2">🧭</span> Skillchain Map™
      </h3>
      <p className="text-sm text-gray-400 mb-4">
        Continue your learning journey with these related paths
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {relatedJourneys.map((journey, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ scale: 1.02 }}
            className="bg-gray-900/70 border border-gray-700/50 rounded-lg p-4 hover:border-blue-500/50 transition-all duration-300"
          >
            <Link href={`/journey/${journey.slug}`} className="block">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-white">{journey.title}</h4>
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-purple-900/50 text-purple-300 mt-1">
                    {journey.profileType}
                  </span>
                </div>
                <ArrowRight className="h-5 w-5 text-blue-400" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
