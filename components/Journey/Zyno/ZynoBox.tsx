import { Button } from '@/components/ui/button';
import '@/styles/mfai-theme.css';
import { Brain, X } from 'lucide-react';
import { FC } from 'react';

interface ZynoBoxProps {
  onOpenZynoModal: () => void;
}

/**
 * AI Co-Founder (Zyno) Component
 * Provides contextual support and strategic guidance for the current phase
 */
const ZynoBox: FC<ZynoBoxProps> = ({ onOpenZynoModal }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl p-6 max-w-lg w-full mx-4 relative">
        <button
          onClick={onOpenZynoModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="bg-purple-500/10 p-3 rounded-lg">
            <Brain className="h-6 w-6 text-purple-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Zyno AI</h2>
            <p className="text-gray-400">Your personal assistant</p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-gray-300">
            Zyno is your personal AI assistant that helps you navigate through your learning
            journey.
          </p>
          <p className="text-gray-300">
            Ask questions about concepts, request additional explanations, or
            get personalized advice.
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            onClick={onOpenZynoModal}
            className="bg-purple-500 hover:bg-purple-600 text-white"
          >
            Commencer à discuter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ZynoBox;
