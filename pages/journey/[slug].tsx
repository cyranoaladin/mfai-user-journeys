import React, { FC, useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// Layout and core components
import MainLayout from '../../components/Layout/MainLayout';
import SkillchainMap from '../../components/Journey/SkillchainMap';
import PhaseSection from '../../components/Journey/Phases/PhaseSection';
import WalletConnect from '../../components/WalletConnect';
import JourneyHeader from '../../components/Journey/JourneyHeader';
import ProofSection from '../../components/Journey/Rewards/ProofSection';
import JourneySidebar from '../../components/Journey/JourneySidebar';
import VerticalTimeline from '../../components/Journey/Timeline/VerticalTimeline';
import PhaseFeedback from '../../components/Journey/Phases/PhaseFeedback';
// Missing JourneyIntro component
const JourneyIntro = ({ journey }: any) => (
  <div className="mb-8 bg-gradient-to-br from-gray-800/70 to-gray-900/70 backdrop-blur-md rounded-xl p-5 border border-gray-700/50 shadow-lg">
    <div className="flex items-center justify-between mb-2">
      <h2 className="text-xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        {journey?.metadata?.title || 'Journey'} - Introduction
      </h2>
      <div className="relative group">
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/20 text-blue-300 text-xs cursor-help">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
          </svg>
        </span>
        <div className="absolute z-50 w-72 p-3 bg-gray-800 border border-gray-700 rounded-md shadow-lg text-sm text-gray-300 right-0 top-8 hidden group-hover:block">
          <p>This journey is part of the MFAI learning protocol. Complete all phases to earn rewards and unlock new skills.</p>
          <div className="absolute -top-2 right-2 w-3 h-3 bg-gray-800 border-t border-l border-gray-700 transform rotate-45"></div>
        </div>
      </div>
    </div>
    <p className="text-gray-300">{journey?.metadata?.description || 'Loading description...'}</p>
  </div>
);

// UI components
import { Button } from '../../components/ui/button';
import { Progress } from '../../components/ui/progress';

// Hooks
import { useStore } from '../../utils/store';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';
import usePhaseFeedback from '../../hooks/usePhaseFeedback';
import { useToast } from '../../components/ui/use-toast';

// Data and utilities
import { JourneyMetadata } from '../../types/journey';

// Types
type PhaseFeedbackData = {
  rating: number;
  comment: string;
  phaseId: string;
  journeyId: string;
};
type JourneyDetailPageProps = any;

// Function to get the MFAI phase name from index
const getPhaseNameByIndex = (index: number): string => {
  const phaseNames = ['Cognitive Learning', 'Synaptic Building', 'Neural Proving', 'Activation Protocol', 'Amplification Scaling'];
  return phaseNames[index] || `Phase ${index + 1}`;
};

// Modal components
const ZynoSimulator = ({ isOpen, onClose }: any) => (
  <div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}>
    <div className="bg-gray-900/95 p-6 rounded-xl border border-blue-500/30 shadow-xl max-w-4xl w-full">
      <h2 className="text-xl font-bold mb-4 text-blue-300">Zyno Simulator</h2>
      <p className="text-gray-300 mb-4">Interactive AI assistant simulation that helps you practice your skills in a safe environment.</p>
      <p className="text-gray-400 text-sm mb-6">The simulator will be available in a future update. Stay tuned!</p>
      <button onClick={onClose} className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
        Close
      </button>
    </div>
  </div>
);

const PhaseNavigator = ({ currentPhase, totalPhases, phaseName, onPrevious, onNext, className }: any) => (
  <div className={`flex items-center gap-2 ${className || ''}`}>
    <div className="relative group">
      <button 
        onClick={onPrevious} 
        disabled={currentPhase === 0}
        className="p-2 rounded-full bg-blue-600/30 hover:bg-blue-600/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        title="Go to previous phase"
      >
        ←
      </button>
      <div className="absolute z-50 w-40 p-2 bg-gray-800 border border-gray-700 rounded-md shadow-lg text-xs text-gray-300 left-0 -bottom-10 hidden group-hover:block">
        Previous phase
      </div>
    </div>
    <span className="text-sm text-blue-300">{phaseName} ({currentPhase + 1}/{totalPhases})</span>
    <div className="relative group">
      <button 
        onClick={onNext} 
        disabled={currentPhase === totalPhases - 1}
        className="p-2 rounded-full bg-blue-600/30 hover:bg-blue-600/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        title="Go to next phase"
      >
        →
      </button>
      <div className="absolute z-50 w-40 p-2 bg-gray-800 border border-gray-700 rounded-md shadow-lg text-xs text-gray-300 right-0 -bottom-10 hidden group-hover:block">
        Next phase
      </div>
    </div>
  </div>
);

const JourneyDetailPage: FC<JourneyDetailPageProps> = ({ journey }) => {
  const router = useRouter();
  const { currentPhase: storedPhase, setCurrentPhase, walletConnected, totalXP, addXP } = useStore();
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState<number>(0);
  const [forceUpdate, setForceUpdate] = useState<number>(0);
  const [showZynoModal, setShowZynoModal] = useState(false);
  const { toast } = useToast();
  
  // Effect to monitor journey changes (for debugging in development only)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && !journey?.phases?.length) {
      console.log('Notice: Using default phases as journey phases are empty');
    }
  }, [journey]);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Create safe versions of data to avoid TypeScript errors
  const metadata: JourneyMetadata = journey?.metadata || {
    title: 'Journey',
    subtitle: '',
    tagline: 'Explore this journey',
    target: '',
    profileType: '',
    missionType: '',
    icon: 'graduation-cap',
    slug: '',
    description: ''
  };
  
  // Make phases reactive with useMemo and add default phases if empty
  const phases = useMemo(() => {
    return journey?.phases || [];
  }, [journey]) as any[];

  // Use stored value or 0, but ensure it doesn't exceed the number of phases
  const safePhaseIndex = Math.min(phases.length - 1, Math.max(0, currentPhaseIndex));
  
  // Update currentPhaseIndex if necessary
  useEffect(() => {
    if (safePhaseIndex !== currentPhaseIndex) {
      setCurrentPhaseIndex(safePhaseIndex);
    }
  }, [safePhaseIndex, currentPhaseIndex]);
  
  useEffect(() => {
    console.log('useEffect: storedPhase changed', storedPhase, 'currentPhaseIndex:', currentPhaseIndex);
    if (storedPhase) {
      // Find the index corresponding to the stored phase
      const index = phases.findIndex(p => p.name === (storedPhase as any).name);
      if (index !== -1 && index !== currentPhaseIndex) {
        console.log('Updating currentPhaseIndex to match storedPhase index:', index);
        setCurrentPhaseIndex(index);
        // Force re-render
        setForceUpdate(prev => prev + 1);
      }
    }
  }, [storedPhase, currentPhaseIndex, phases]);
  
  // Track unlocked proofs (for demo purposes)
  const [unlockedProofs, setUnlockedProofs] = useState<number[]>([]);
  
  // Calculate progress percentage with animation
  const [progressPercentage, setProgressPercentage] = useState(0);
  
  // Phase feedback system
  const { hasFeedbackForPhase } = usePhaseFeedback(journey?.metadata?.slug || '');
  
  // Synchronize global state with local state
  useEffect(() => {
    if (journey && journey.phases && journey.phases.length > 0) {
      const newPhaseIndex = Math.max(0, Math.min(currentPhaseIndex, journey.phases.length - 1));
      setCurrentPhaseIndex(newPhaseIndex);
      // Explicit conversion to resolve type incompatibility
      const currentPhaseObj = journey.phases[newPhaseIndex];
      if (currentPhaseObj) {
        setCurrentPhase(currentPhaseObj as any);
      }
    }
  }, [journey, currentPhaseIndex, setCurrentPhase]);
  
  // Progress animation effect
  useEffect(() => {
    if (phases.length > 0) {
      const targetPercentage = (currentPhaseIndex / (phases.length - 1)) * 100;
      
      // Animate progress bar
      let start = 0;
      const animateProgress = () => {
        start += 1;
        setProgressPercentage(Math.min(start, targetPercentage));
        if (start < targetPercentage) {
          requestAnimationFrame(animateProgress);
        }
      };
      
      requestAnimationFrame(animateProgress);
    }
  }, [currentPhaseIndex, phases.length]);
  
  // Auto-scroll to content when phase changes
  useEffect(() => {
    if (contentRef.current) {
      // Smooth scroll to the content
      contentRef.current.scrollIntoView({ 
        behavior: 'smooth'
      });
    }
  }, [contentRef, currentPhaseIndex]);

  // Animation variants for content
  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } }
  };

  // Function to go to next phase
  const goToNextPhase = useCallback(() => {
    // Check if we're on the last phase
    const isLastPhase = currentPhaseIndex === phases.length - 1;
    
    if (isLastPhase) {
      // Special handling for the last phase - mark it as completed
      const lastPhaseIndex = currentPhaseIndex;
      
      // Add XP if it's not already unlocked
      if (!unlockedProofs.includes(lastPhaseIndex)) {
        const xpToAdd = phases[lastPhaseIndex].xpReward || 100; // Extra XP for completing the journey
        addXP(xpToAdd);
        toast({
          description: `+${xpToAdd} XP: Congratulations! You've completed the ${getPhaseNameByIndex(lastPhaseIndex) || ''} phase and the entire journey!`,
          title: "Achievement Unlocked",
          variant: "success"
        });
        
        // Marquer explicitement la dernière phase comme complétée
        setUnlockedProofs(prev => [...prev, lastPhaseIndex]);
        
        // Ajouter un marqueur spécial pour indiquer que toutes les phases sont terminées
        // Cela permettra de débloquer les récompenses Neuro-Dividends™ et Cognitive Lock™
        localStorage.setItem('journey-completed', 'true');
        
        // Mettre à jour le store global pour indiquer que toutes les phases sont terminées
        // Cela est nécessaire pour débloquer les récompenses
        const completedPhase = {...phases[lastPhaseIndex], completed: true};
        setCurrentPhase(completedPhase as any);
      }
      
      // Keep the current phase as the last phase
      // but mark it as completed in the UI
      setForceUpdate(prev => prev + 1);
    } else if (currentPhaseIndex < phases.length - 1) {
      // Normal handling for non-last phases
      // Update local index
      const nextIndex = currentPhaseIndex + 1;
      setCurrentPhaseIndex(nextIndex);
      
      // Update phase in global store
      const currentPhaseObj = phases[nextIndex];
      if (currentPhaseObj) {
        setCurrentPhase(currentPhaseObj as any);
      }
      
      // Scroll to top of section
      if (contentRef.current) {
        contentRef.current.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
      
      // Add XP if it's a new phase
      if (!unlockedProofs.includes(nextIndex)) {
        const xpToAdd = phases[nextIndex].xpReward || 50;
        addXP(xpToAdd);
        toast({
          description: `+${xpToAdd} XP: You've unlocked the ${getPhaseNameByIndex(nextIndex) || ''} phase!`,
          title: "Phase Unlocked",
          variant: "success"
        });
        setUnlockedProofs(prev => [...prev, nextIndex]);
      }
    }
  }, [currentPhaseIndex, phases, setCurrentPhase, unlockedProofs, addXP, toast]);

  // Note: The handleProofClick function is used to unlock proofs

  const goToPrevPhase = useCallback(() => {
    if (currentPhaseIndex > 0) {
      // Update the local index
      const prevIndex = currentPhaseIndex - 1;
      setCurrentPhaseIndex(prevIndex);
      
      // Update the phase in the global store
      const currentPhaseObj = phases[prevIndex];
      if (currentPhaseObj) {
        setCurrentPhase(currentPhaseObj as any);
      }
      
      // Scroll to the top of the section
      if (contentRef.current) {
        contentRef.current.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }
  }, [currentPhaseIndex, phases, setCurrentPhase]);

  // Setup keyboard navigation
  useKeyboardNavigation({
    onNext: goToNextPhase,
    onPrevious: goToPrevPhase,
    enabled: true
  });
  
  // Refs for automatic scrolling
  const exploreProtocolRef = useRef<HTMLDivElement>(null);

  // Handle explore protocol action - scroll to the section instead of redirecting
  const handleExploreProtocol = () => {
    toast("Navigating to Cognitive Activation Protocol");
    if (exploreProtocolRef.current) {
      exploreProtocolRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Handle Zyno modal
  const handleZynoClick = () => {
    setShowZynoModal(true);
  };
  
  // Vérifier si toutes les phases sont terminées
  const areAllPhasesCompleted = useCallback(() => {
    // Vérifier si le marqueur spécial existe dans localStorage
    const journeyCompleted = localStorage.getItem('journey-completed') === 'true';
    
    // Vérifier si toutes les phases sont dans unlockedProofs
    const allPhasesUnlocked = phases.length > 0 && 
      phases.every((_, index) => unlockedProofs.includes(index));
      
    return journeyCompleted || allPhasesUnlocked;
  }, [phases, unlockedProofs]);
  
  // Handle proof badge click
  const handleProofClick = (proofIndex: number) => {
    if (walletConnected) {
      if (!unlockedProofs.includes(proofIndex)) {
        setUnlockedProofs([...unlockedProofs, proofIndex]);
        addXP(100);
        toast("Congratulations! You've unlocked a new proof of competence!");
      }
    } else {
      toast("You need to connect your wallet to claim this proof");
    }
  };
  
  // Handle feedback submission
  const handleFeedbackSubmit = useCallback((data: PhaseFeedbackData) => {
    console.log('Feedback submitted:', data);
    toast(`Feedback sent: Thank you for your experience feedback!`);
    // Add XP for submitting feedback
    addXP(25);
  }, [toast, addXP]);
  
  // Define the current phase based on the index
  const currentPhase = useMemo(() => {
    if (!phases || phases.length === 0) {
      return {
        name: 'Learning',
        title: 'Getting Started',
        content: 'Loading phase content...',
        description: 'Introduction to the journey',
        mission: 'Complete this phase to begin your journey',
        icon: 'book-open',
        protocolPhase: 'Learn',
        xpReward: 50
      };
    }
    return phases[currentPhaseIndex] || phases[0];
  }, [phases, currentPhaseIndex]);
  
  // Render un message d'erreur si journey est null
  if (!journey) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-10 max-w-7xl">
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <h1 className="text-2xl font-bold mb-4">Journey not found</h1>
            <p className="text-gray-400 mb-6">The journey you are looking for does not exist or is not available.</p>
            <button 
              onClick={() => router.push('/journeys')} 
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg text-white font-medium"
            >
              Return to Journeys
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Head>
        <title>{`${metadata.title || 'Journey'} | Money Factory AI`}</title>
        <meta name="description" content={metadata.description || 'Journey details'} />
      </Head>
      
      <div className="container mx-auto px-4 py-10 max-w-7xl">
        {/* Journey Header */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start gap-6">
          <JourneyHeader metadata={metadata} />
          <WalletConnect />
        </div>
        
        {/* Journey Intro Component */}
        <JourneyIntro 
          journey={journey} 
          currentPhase={currentPhaseIndex} 
        />
        
        {/* Main Content Area - Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mt-10">
          {/* Left Column - Timeline (Desktop Only) */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="sticky top-24">
              <VerticalTimeline 
                phases={phases as any}
                currentPhaseIndex={currentPhaseIndex}
                onPhaseClick={setCurrentPhaseIndex}
              />
            </div>
          </div>
          
          {/* Middle Column - Main Content */}
          <div className="lg:col-span-7" ref={contentRef}>
            {/* Progress Bar */}
            <div className="mb-8 bg-gradient-to-br from-gray-800/70 to-gray-900/70 backdrop-blur-md rounded-xl p-5 border border-gray-700/50 shadow-lg">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
                <div className="flex-1 w-full">
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span className="text-blue-300">Progress</span>
                    <span className="text-purple-300">{Math.round(progressPercentage)}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2.5 bg-gray-700/50" />
                  <div className="flex justify-between items-center mt-3">
                    <p className="text-sm text-gray-200">
                      Phase {currentPhaseIndex + 1} of {phases.length}: <strong className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">{currentPhase.name || getPhaseNameByIndex(currentPhaseIndex)}</strong>
                    </p>
                    <div className="relative group">
                      {walletConnected ? (
                        <div className="flex items-center gap-2 bg-blue-900/40 px-3 py-1.5 rounded-full border border-blue-500/20">
                          <span className="text-xs font-semibold text-blue-300">XP: {totalXP}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 bg-gray-700/40 px-3 py-1.5 rounded-full border border-gray-600/20 cursor-help">
                          <span className="text-xs font-semibold text-gray-400">XP: Connect wallet</span>
                        </div>
                      )}
                      <div className="absolute z-50 w-64 p-3 bg-gray-800 border border-gray-700 rounded-md shadow-lg text-sm text-gray-300 -right-2 top-8 hidden group-hover:block">
                        <p>Experience Points (XP) track your progress through the journey. Earn XP by completing phases and providing feedback.</p>
                        <div className="absolute -top-2 right-2 w-3 h-3 bg-gray-800 border-t border-l border-gray-700 transform rotate-45"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <PhaseNavigator
                  currentPhase={currentPhaseIndex}
                  totalPhases={phases.length || 0}
                  phaseName={currentPhase.name || ''}
                  onPrevious={goToPrevPhase}
                  onNext={goToNextPhase}
                  className="md:ml-4"
                />
              </div>
            </div>
            
            {/* Phase Content */}
            <div className="mb-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`phase-${currentPhaseIndex}-${forceUpdate}`}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={contentVariants as any}
                  className="prose prose-invert max-w-none prose-headings:text-blue-300 prose-strong:text-purple-300 prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300 prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-900/20 prose-blockquote:p-4 prose-blockquote:rounded-r-md"
                >
                  <PhaseSection 
                    phase={currentPhase}
                    currentPhase={currentPhaseIndex}
                    totalPhases={phases.length}
                    onNextPhase={goToNextPhase}
                    onPreviousPhase={goToPrevPhase}
                  />
                </motion.div>
              </AnimatePresence>
              
              {/* Phase Feedback System */}
              {!hasFeedbackForPhase(currentPhaseIndex) && (
                <PhaseFeedback
                  phaseId={currentPhaseIndex.toString()}
                  onFeedbackSubmit={handleFeedbackSubmit}
                  {...{phaseName: journey.phases[currentPhaseIndex]?.name || ''} as any}
                />
              )}
              
              {/* Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-5 mt-10">
                {journey.callToAction && journey.callToAction.length > 0 && (
                  <div className="flex-1 relative group">
                    <Button 
                      variant="secondary" 
                      className="w-full py-6 flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-900/30 rounded-xl border border-blue-500/20"
                      onClick={handleExploreProtocol}
                      aria-label="Explore Cognitive Activation Protocol"
                      title="Learn about the Cognitive Activation Protocol"
                    >
                      <span className="text-base font-medium">🚀 Explore Cognitive Activation Protocol™</span>
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                    <div className="absolute z-50 w-72 p-3 bg-gray-800 border border-gray-700 rounded-md shadow-lg text-sm text-gray-300 left-1/2 transform -translate-x-1/2 -bottom-24 hidden group-hover:block">
                      <p>The Cognitive Activation Protocol™ is our proprietary learning methodology that helps you master new skills through a structured approach.</p>
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-800 border-t border-l border-gray-700 rotate-45"></div>
                    </div>
                  </div>
                )}
                <div className="flex-1 relative group">
                  <Button 
                    variant="outline" 
                    className="w-full py-6 flex items-center justify-center gap-3 border-blue-500/30 hover:bg-blue-900/20 transition-all duration-300 shadow-md rounded-xl"
                    onClick={handleZynoClick}
                    aria-label="Open Zyno AI Simulator"
                    title="Open the Zyno AI Simulator"
                  >
                    <span className="text-base font-medium">🤖 Open Zyno AI Simulator</span>
                  </Button>
                  <div className="absolute z-50 w-72 p-3 bg-gray-800 border border-gray-700 rounded-md shadow-lg text-sm text-gray-300 left-1/2 transform -translate-x-1/2 -bottom-24 hidden group-hover:block">
                    <p>Zyno is an AI simulator that helps you practice your skills in a safe environment. This feature will be available in a future update.</p>
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-800 border-t border-l border-gray-700 rotate-45"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Proof-of-Skill Tokens */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-12 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md rounded-xl p-7 border border-amber-500/20 shadow-xl relative overflow-hidden"
              ref={exploreProtocolRef}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">
                      Proof-of-Skill Tokens™
                    </span>
                  </h3>
                  <div className="relative group">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs cursor-help">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                      </svg>
                    </span>
                    <div className="absolute z-50 w-72 p-3 bg-gray-800 border border-gray-700 rounded-md shadow-lg text-sm text-gray-300 right-0 top-8 hidden group-hover:block">
                      <p>Proof-of-Skill Tokens™ are digital certificates that verify your mastery of specific skills in the MFAI protocol.</p>
                      <div className="absolute -top-2 right-2 w-3 h-3 bg-gray-800 border-t border-l border-gray-700 transform rotate-45"></div>
                    </div>
                  </div>
                </div>
                {areAllPhasesCompleted() ? (
                  <p className="text-green-400/80 text-sm mb-7 max-w-2xl">✅ Félicitations ! Vous avez débloqué vos récompenses Neuro-Dividends™ et Cognitive Lock™</p>
                ) : (
                  <p className="text-amber-100/80 text-sm mb-7 max-w-2xl">🔓 Complete phases to unlock your Neuro-Dividends™ and Cognitive Lock™ rewards</p>
                )}
                <ProofSection
                  proofs={(journey.rewards || []) as any}
                  unlockedProofs={areAllPhasesCompleted() ? Array.from({length: phases.length}, (_, i) => i) : unlockedProofs}
                  onProofClick={handleProofClick}
                />
              </div>
            </motion.div>
            
            {/* Phase Navigator (Mobile Only) */}
            <div className="lg:hidden mt-10">
              <PhaseNavigator
                currentPhase={currentPhaseIndex}
                totalPhases={phases.length || 0}
                phaseName={journey.phases[currentPhaseIndex]?.name || ''}
                onPrevious={goToPrevPhase}
                onNext={goToNextPhase}
                className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 backdrop-blur-md rounded-xl p-5 border border-blue-500/20 shadow-lg"
              />
            </div>
            
            {/* Cognitive Activation Protocol */}
            <div className="mt-14 mb-10 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-md rounded-xl p-7 border border-blue-500/20 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -ml-32 -mt-32 pointer-events-none"></div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
                  <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    Cognitive Activation Protocol™
                  </span>
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/20 text-blue-300 text-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                    </svg>
                  </span>
                </h2>
                <p className="text-blue-100/70 text-sm mb-6 max-w-2xl">Connect your learning journey with related skills and protocols to maximize your cognitive growth</p>
                <SkillchainMap relatedJourneys={[
                  { title: "Staking Basics", slug: "staking-basics", profileType: "Investor" },
                  { title: "DeFi Fundamentals", slug: "defi-fundamentals", profileType: "Student" }
                ]} />
              </div>
            </div>
          </div>
          
          {/* Right Column - Sidebar */}
          <div className="lg:col-span-3">
            {/* Journey Sidebar with metadata, timeline and actions */}
            <div className="sticky top-24">
              <JourneySidebar 
                phases={phases as any} 
                currentPhase={currentPhase as any}
                onPhaseClick={(phase) => {
                  // Find the index of the clicked phase
                  const index = phases.findIndex(p => p.name === (phase as any).name);
                  if (index !== -1) {
                    setCurrentPhaseIndex(index);
                    setCurrentPhase(phase as any);
                  }
                }}
                metadata={{
                  ...journey.metadata as any,
                  whyItMatters: journey.whyItMatters as string,
                  finalRole: journey.finalRole as string
                } as any}
                onOpenZynoModal={() => console.log('Open Zyno modal')}
                onNotifyClick={() => console.log('Notification clicked')}
                mfaiBalance={'0'}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Zyno Modal */}
      {showZynoModal && (
        <ZynoSimulator 
          isOpen={showZynoModal}
          onClose={() => setShowZynoModal(false)}
        />
      )}
    </MainLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  console.log('Starting getStaticPaths');
  
  // Simplified approach: hardcode all known slugs
  const hardcodedSlugs = [
    'student', 'entrepreneur', 'investor', 'builder', 'mentor', 'visionary',
    'connector-protocol', 'defi-fundamentals', 'intro-finance', 'ai-finance', 'blockchain-crypto'
  ];
  
  const paths = hardcodedSlugs.map(slug => ({
    params: { slug }
  }));
  
  console.log('Generated paths:', paths);

  return {
    paths,
    fallback: 'blocking', // Use 'blocking' to allow on-demand generation
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    console.log('Starting getStaticProps for slug:', params?.slug);
    const slug = params?.slug as string;
    
    // Import both data sources directly
    const { journeys: staticJourneys } = await import('@/utils/journeyData');
    const { journeys: dataJourneys } = await import('@/data/journeys');
    
    console.log('Searching for journey with slug:', slug);
    console.log('Available journeys in staticJourneys:', staticJourneys.map((j: any) => j.persona || j.label?.toLowerCase().replace(/ /g, '-')));
    console.log('Available journeys in dataJourneys:', dataJourneys.map((j: any) => j.metadata?.slug));
    
    // First look in static journeys
    let journey: any = null;
    
    // Search in staticJourneys
    const staticJourney = staticJourneys.find((j: any) => 
      (j.persona === slug) || 
      (j.label && j.label.toLowerCase().replace(/ /g, '-') === slug)
    );
    
    if (staticJourney) {
      console.log('Journey found in staticJourneys:', staticJourney.label);
      // Convert the static journey to the expected format
      journey = {
        metadata: {
          title: staticJourney.label,
          subtitle: '',
          description: staticJourney.description || '',
          icon: staticJourney.icon || '',
          profileType: staticJourney.persona || '',
          target: '',
          missionType: '',
          slug: staticJourney.persona || staticJourney.label?.toLowerCase().replace(/ /g, '-') || '',
          tagline: staticJourney.tagline || ''
        },
        phases: staticJourney.phases.map((phase: any) => ({
          title: phase.title,
          description: phase.description || '',
          mission: phase.mission || phase.description || '',
          xpReward: phase.xpReward || 0,
          nftReward: phase.nftReward || '',
          content: phase.content || ''
        })),
        rewards: (staticJourney.rewards || []).map((reward: string) => ({
          milestone: reward,
          proof: '',
          utility: ''
        })),
        whyItMatters: staticJourney.whyItMatters || staticJourney.zynoSays || '',
        finalRole: staticJourney.finalRole || '',
        callToAction: []
      };
    } else {
      // Search in dataJourneys
      const dataJourney = dataJourneys.find((j: any) => j.metadata?.slug === slug);
      if (dataJourney) {
        console.log('Journey found in dataJourneys:', dataJourney.metadata.title);
        journey = dataJourney;
      }
    }
    
    if (!journey) {
      console.log('No journey found for slug:', slug);
      return {
        notFound: true
      };
    }
    
    // Verify and normalize the journey structure to avoid errors
    // Use type assertion to bypass compatibility issues
    // Ensure journey.metadata exists to avoid errors
    const metadata = journey.metadata || {};
    
    const safeJourney = {
      metadata: {
        title: metadata.title || `Journey ${slug}`,
        subtitle: metadata.subtitle || 'Journey details',
        tagline: metadata.tagline || 'Explore this journey',
        target: metadata.target || 'Beginners',
        profileType: metadata.profileType || 'Default',
        missionType: metadata.missionType || 'Learning',
        icon: metadata.icon || 'graduation-cap',
        slug: metadata.slug || slug,
        description: metadata.description || 'Journey description'
      },
      phases: Array.isArray(journey.phases) ? journey.phases.map((phase, index) => {
        // Ensure phase exists and is not null
        const safePhase = phase || {};
        
        // Create an explicit JourneyPhase object with all required properties
        const normalizedPhase: any = {
          name: safePhase.name || safePhase.title || `Phase ${index + 1}`,
          title: safePhase.title || 'Untitled',
          content: safePhase.content || 'No content available',
          icon: safePhase.icon || 'book-open',
          description: safePhase.description || 'No description available',
          mission: safePhase.mission || 'Complete this phase',
          xpReward: safePhase.xpReward || 0,
        };
        
        // Add optional properties if they exist
        if (safePhase.nftReward) normalizedPhase.nftReward = safePhase.nftReward;
        if (safePhase.locked !== undefined) normalizedPhase.locked = safePhase.locked;
        if (safePhase.duration) normalizedPhase.duration = safePhase.duration;
        
        return normalizedPhase;
      }) : [],
      callToAction: Array.isArray(journey.callToAction) ? journey.callToAction : ['Start your journey'],
      rewards: Array.isArray(journey.rewards) && journey.rewards.length > 0 ? journey.rewards : [{
        milestone: 'Completion',
        proof: 'Certificate',
        utility: 'Knowledge'
      }],
      whyItMatters: typeof journey.whyItMatters === 'string' ? journey.whyItMatters : 'This journey matters because it helps you grow',
      finalRole: typeof journey.finalRole === 'string' ? journey.finalRole : 'Expert'
    };
    
    return {
      props: {
        journey: safeJourney,
      },
      // Re-generate at most once per hour
      revalidate: 3600,
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    // Return minimal data to avoid rendering errors
    return { 
      props: { 
        journey: null 
      },
      revalidate: 60 // Retry more quickly in case of error
    };
  }
};

export default JourneyDetailPage;
