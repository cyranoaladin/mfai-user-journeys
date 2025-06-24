import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import CognitiveActivationIntro from './CognitiveActivationIntro';
import MFAIFeatures from './MFAIFeatures';
import ActivationLoop from './ActivationLoop';
import ConstructionBanner from './ConstructionBanner';
import GlossaryModal from './GlossaryModal';
import ActivationLoopBackground from './ActivationLoopBackground';
import ZynoHero from './ZynoHero';

export default function JourneyHomePage() {
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black relative">
      {/* Background animation */}
      <ActivationLoopBackground />

      {/* Construction banner */}
      <ConstructionBanner />

      {/* Main content */}
      <div className="relative z-10">
        {/* Glossary button */}
        <motion.button
          onClick={() => setIsGlossaryOpen(true)}
          className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 border border-[#14F195]/20 text-[#14F195] hover:bg-[#14F195]/10 transition-all duration-300 backdrop-blur-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <BookOpen className="w-5 h-5" />
          <span>MFAI Glossary</span>
        </motion.button>

        {/* Hero section */}
        <ZynoHero />

        {/* Main sections */}
        <div className="container mx-auto px-4 py-12 space-y-24">
          <CognitiveActivationIntro />
          <MFAIFeatures />
          <ActivationLoop />
        </div>
      </div>

      {/* Glossary modal */}
      <GlossaryModal isOpen={isGlossaryOpen} onClose={() => setIsGlossaryOpen(false)} />
    </div>
  );
}
