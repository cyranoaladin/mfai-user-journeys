import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Modal } from '../../ui/modal';
import { Button } from '../../ui/button';
import { BrainCircuit, User, ArrowRight } from 'lucide-react';

interface ZynoSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
  journeySlug: string;
}

const personas = [
  { id: 'beginner', name: 'Crypto Beginner', description: 'New to Web3 and blockchain concepts' },
  {
    id: 'investor',
    name: 'Passive Investor',
    description: 'Interested in long-term value and stability',
  },
  {
    id: 'builder',
    name: 'Web3 Builder',
    description: 'Technical background, wants to build dApps',
  },
  {
    id: 'creator',
    name: 'Content Creator',
    description: 'Focused on community and content creation',
  },
  {
    id: 'trader',
    name: 'Active Trader',
    description: 'Experienced in markets and trading strategies',
  },
];

export default function ZynoSimulator({ isOpen, onClose, journeySlug }: ZynoSimulatorProps) {
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSimulate = () => {
    if (!selectedPersona) return;

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      // Redirect to a simulated page (you would create this page)
      router.push(`/zyno-preview?journey=${journeySlug}&persona=${selectedPersona}`);
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Zyno AI Simulator">
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-3 bg-blue-900/20 rounded-lg border border-blue-800/30">
          <BrainCircuit className="h-8 w-8 text-blue-400" />
          <div>
            <h4 className="font-medium text-white">Zyno AI Simulator</h4>
            <p className="text-sm text-gray-300">
              Experience a personalized journey based on your profile
            </p>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-300 mb-2">Select a persona:</h4>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
            {personas.map(persona => (
              <motion.div
                key={persona.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedPersona === persona.id
                    ? 'bg-blue-900/30 border-blue-500'
                    : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                }`}
                onClick={() => setSelectedPersona(persona.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-gray-700 rounded-full p-2">
                    <User className="h-4 w-4 text-gray-300" />
                  </div>
                  <div>
                    <h5 className="font-medium text-white">{persona.name}</h5>
                    <p className="text-xs text-gray-400">{persona.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose} className="px-4 py-2">
            Cancel
          </Button>
          <Button
            onClick={handleSimulate}
            disabled={!selectedPersona || isLoading}
            className="px-4 py-2 flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>Start Simulation</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
