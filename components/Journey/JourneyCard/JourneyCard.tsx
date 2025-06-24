import { motion } from 'framer-motion';
import { ArrowRight, Clock, Users, Target, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { JourneyContent } from '@/types/journey';
import { cn } from '@/lib/utils';

interface JourneyCardProps {
  journey: JourneyContent;
  onSelect: (slug: string) => void;
  className?: string;
}

export default function JourneyCard({ journey, onSelect, className }: JourneyCardProps) {
  const totalXp = journey.phases.reduce((sum, phase) => sum + (phase.xpReward || 0), 0);
  const progress = Math.min((totalXp / 1000) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className={cn('group relative', className)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#9945FF]/10 to-[#14F195]/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
      <div className="relative p-6 rounded-xl bg-black/50 border border-[#14F195]/20 backdrop-blur-sm">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">{journey.metadata.title}</h3>
            <p className="text-sm text-gray-400">{journey.metadata.description}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center text-2xl">
            {journey.metadata.icon}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge className="bg-blue-900/20 text-blue-400">{journey.metadata.profileType}</Badge>
          <Badge className="bg-purple-900/20 text-purple-400">{journey.metadata.target}</Badge>
          {journey.metadata.missionType && (
            <Badge className="bg-green-900/20 text-green-400">{journey.metadata.missionType}</Badge>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-400" />
            <div>
              <div className="text-xs text-gray-400">Profile</div>
              <div className="text-sm text-white">{journey.metadata.profileType}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-purple-400" />
            <div>
              <div className="text-xs text-gray-400">Target</div>
              <div className="text-sm text-white">{journey.metadata.target}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-green-400" />
            <div>
              <div className="text-xs text-gray-400">Phases</div>
              <div className="text-sm text-white">{journey.phases.length}</div>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Progress</span>
            <span className="text-white">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Phases Preview */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-white mb-2">Phases</h4>
          <div className="space-y-2">
            {journey.phases.map((phase, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 rounded-lg bg-gray-800/50"
              >
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-white">{phase.title}</span>
                </div>
                <Badge className="bg-blue-900/20 text-blue-400">{phase.xp} XP</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={() => onSelect(journey.metadata.slug)}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <span>Start Journey</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
}
