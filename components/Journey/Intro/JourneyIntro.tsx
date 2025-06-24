import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { JourneyMetadata } from '@/types/journey';
import { motion } from 'framer-motion';
import { Award, Target, Users } from 'lucide-react';
import { FC } from 'react';

interface JourneyIntroProps {
  journey: {
    metadata: JourneyMetadata;
  };
}

const JourneyIntro: FC<JourneyIntroProps> = ({ journey }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 mb-8"
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column - Main Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white mb-4">
            Welcome to {journey.metadata.title}
          </h2>
          <p className="text-gray-400 mb-6">{journey.metadata.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge className="bg-blue-900/20 text-blue-400">{journey.metadata.profileType}</Badge>
            <Badge className="bg-purple-900/20 text-purple-400">{journey.metadata.target}</Badge>
            {journey.metadata.missionType && (
              <Badge className="bg-green-900/20 text-green-400">
                {journey.metadata.missionType}
              </Badge>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              <div>
                <div className="text-sm text-gray-400">Profile</div>
                <div className="text-white font-medium">{journey.metadata.profileType}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Target</div>
                <div className="text-white font-medium">{journey.metadata.target}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-green-400" />
              <div>
                <div className="text-sm text-gray-400">Mission</div>
                <div className="text-white font-medium">
                  {journey.metadata.missionType || 'Cognitive Enhancement'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Actions */}
        <div className="md:w-64 flex flex-col gap-4">
          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            Start Journey
          </Button>
          <Button
            variant="outline"
            className="w-full border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            View Progress
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default JourneyIntro;
