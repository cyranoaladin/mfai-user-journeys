import { JourneyMetadata, JourneyPhase } from '@/types';
import { FC } from 'react';
import { Badge } from '../../ui/badge';
import { Card, CardContent } from '../../ui/card';
import JourneyTimeline from './JourneyTimeline';
import { BookOpen, Brain, Sparkles, Zap, Award, Scale, Target, Users, BrainCircuit, GraduationCap } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface JourneySidebarProps {
  metadata: JourneyMetadata;
  phases?: JourneyPhase[];
  currentPhase?: number;
  onPhaseClick?: (index: number) => void;
  onOpenZynoModal: () => void;
  onNotifyClick: () => void;
  mfaiBalance: string;
}

/**
 * Maps icon string names to Lucide React icon components
 */
const iconMap: Record<string, LucideIcon> = {
  'book-open': BookOpen,
  'brain': Brain,
  'sparkles': Sparkles,
  'zap': Zap,
  'award': Award,
  'scale': Scale,
  'target': Target,
  'users': Users,
  'brain-circuit': BrainCircuit,
  'graduation-cap': GraduationCap
};

/**
 * Gets the appropriate icon component based on the icon name
 */
const getIconComponent = (iconName: string | undefined): LucideIcon => {
  if (!iconName) return BookOpen;
  // Convert to lowercase and remove any spaces for consistent matching
  const normalizedName = iconName.toLowerCase().replace(/\s+/g, '-');
  return iconMap[normalizedName] || BookOpen; // Default to BookOpen if icon not found
};

/**
 * JourneySidebar Component - Displays metadata, timeline and actions in the right column
 */
const JourneySidebar: FC<JourneySidebarProps> = ({
  metadata,
  phases = [],
  currentPhase = 0,
  onPhaseClick,
  onOpenZynoModal,
  onNotifyClick,
  mfaiBalance,
}) => {
  // Get the icon component based on metadata.icon
  const IconComponent = getIconComponent(metadata.icon);
  return (
    <div className="space-y-6">
      {/* Journey Info Card */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center text-2xl">
              <IconComponent className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{metadata.title}</h3>
              <p className="text-sm text-gray-400">{metadata.subtitle}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className="bg-blue-900/20 text-blue-400">{metadata.profileType}</Badge>
            <Badge className="bg-purple-900/20 text-purple-400">{metadata.target}</Badge>
            {metadata.missionType && (
              <Badge className="bg-green-900/20 text-green-400">{metadata.missionType}</Badge>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-400 mb-4">{metadata.description}</p>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={onOpenZynoModal}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Open Zyno
            </button>
            <button
              onClick={onNotifyClick}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Notify
            </button>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <span className="text-xs text-gray-400">MFAI Balance:</span>
            <span className="font-semibold text-green-400">{mfaiBalance}</span>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      {phases.length > 0 && (
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Journey Progress</h3>
            <JourneyTimeline
              currentPhase={currentPhase}
              onPhaseClick={onPhaseClick || (() => {})}
              phases={phases}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default JourneySidebar;
