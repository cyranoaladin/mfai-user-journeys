import React, { FC } from 'react';
import { Button } from '../../../components/ui/button';
import { BrainCircuit, Bell, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/router';

interface ZynoActionsProps {
  onOpenZynoModal: () => void;
  onNotifyClick: () => void;
  journeySlug: string;
}

/**
 * ZynoActions Component - Displays Zyno AI assistant actions and buttons
 */
const ZynoActions: FC<ZynoActionsProps> = ({ onOpenZynoModal, onNotifyClick, journeySlug }) => {
  const router = useRouter();

  return (
    <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 mb-8 hover:border-blue-700/30 transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center">
          <BrainCircuit className="h-5 w-5 text-blue-400" />
        </div>
        <h3 className="text-lg font-semibold">Zyno AI Assistant</h3>
      </div>

      <p className="text-sm text-gray-300 mb-4">
        Zyno will guide you through this journey with personalized insights and adaptive learning.
      </p>

      <div className="space-y-3">
        <Button
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          onClick={onOpenZynoModal}
          aria-label="Simulate with Zyno"
        >
          <BrainCircuit className="h-4 w-4" />
          <span>Simulate with Zyno</span>
        </Button>

        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 hover:bg-gray-700 hover:border-gray-600 transition-colors duration-200"
          onClick={onNotifyClick}
          aria-label="Get notified when protocol activates"
        >
          <Bell className="h-4 w-4" />
          <span>Notify me when protocol activates</span>
        </Button>

        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors duration-200"
          onClick={() => router.push(`/zyno-preview?journey=${journeySlug}`)}
          aria-label="Preview Zyno Diagnostic"
        >
          <span>Preview Zyno Diagnostic</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ZynoActions;
