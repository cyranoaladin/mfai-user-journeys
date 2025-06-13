import { useWallet } from '@solana/wallet-adapter-react';
import { AnimatePresence, motion } from 'framer-motion';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// Layout and core components
import PhaseSection from '@/components/Journey/Phases/PhaseSection';
import ZynoSimulator from '@/components/Journey/Zyno/ZynoSimulator';
import MainLayout from '@/components/Layout/MainLayout';
import WalletConnect from '@/components/Wallet/WalletConnect';

// New modular components
import FinalRoleSection from '@/components/Journey/FinalRoleSection';
import JourneyHeader from '@/components/Journey/JourneyHeader';
import JourneySidebar from '@/components/Journey/JourneySidebar';
import PhaseFeedback from '@/components/Journey/Phases/PhaseFeedback';
import WhyItMatters from '@/components/Journey/WhyItMatters';

// Hooks personnalisés
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import { usePhaseBadges } from '@/hooks/usePhaseBadges';
import { usePhaseBalance } from '@/hooks/usePhaseBalance';
import { usePhaseForceUpdate } from '@/hooks/usePhaseForceUpdate';
import { usePhaseProgress } from '@/hooks/usePhaseProgress';
import { usePhaseSystem } from '@/hooks/usePhaseSystem';

// UI components
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { AchievementNotification } from '../../components/Journey/AchievementNotification/AchievementNotification';

// Data and utilities
import { getJourneyByPersona } from '@/utils/journeyData';

// Types
import type { Journey, JourneyPhase } from '@/utils/journeyData';

export default function JourneyPage() {
  const router = useRouter();
  const { slug } = router.query;
  const { publicKey } = useWallet();
  const { toast } = useToast();
  const contentRef = useRef<HTMLDivElement>(null);
  const [isZynoModalOpen, setIsZynoModalOpen] = useState(false);

  // États liés aux phases
  const [journeyData, setJourneyData] = useState<Journey | null>(null);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);

  // États liés aux preuves
  const [progressPercentage, setProgressPercentage] = useState(0);

  // État pour les notifications d'accomplissements
  const [achievementNotification, setAchievementNotification] = useState<{
    title: string;
    description: string;
    isVisible: boolean;
  }>({
    title: '',
    description: '',
    isVisible: false,
  });

  // Hooks personnalisés
  const { goToPreviousPhase, canNavigate } = usePhaseSystem();
  const { updateProgress } = usePhaseProgress();
  const { checkBadges } = usePhaseBadges();
  const { updateBalance } = usePhaseBalance();
  const { triggerUpdate } = usePhaseForceUpdate();

  // Calculs mémoïsés
  const phases = useMemo<JourneyPhase[]>(() => {
    return journeyData?.phases || [];
  }, [journeyData]);

  const safePhaseIndex = useMemo(() => {
    return Math.min(currentPhaseIndex, phases.length - 1 >= 0 ? phases.length - 1 : 0);
  }, [currentPhaseIndex, phases.length]);

  const currentPhase = useMemo(() => {
    return phases[currentPhaseIndex] || phases[0];
  }, [phases, currentPhaseIndex]);

  // Callbacks
  const handleNextPhase = useCallback(() => {
    if (!journeyData) return;
    if (currentPhaseIndex < journeyData.phases.length - 1) {
      setCurrentPhaseIndex(prev => prev + 1);
      setAchievementNotification({
        title: 'Nouvelle phase débloquée !',
        description: `Vous avez débloqué la phase ${currentPhaseIndex + 2}`,
        isVisible: true,
      });
      toast({
        title: 'Phase débloquée !',
        description: `Vous avez accès à la phase ${currentPhaseIndex + 2}`,
      });
    }
  }, [currentPhaseIndex, journeyData, toast]);

  const handlePreviousPhase = useCallback(() => {
    if (canNavigate('prev')) {
      goToPreviousPhase();
      triggerUpdate();
    }
  }, [canNavigate, goToPreviousPhase, triggerUpdate]);

  // Keyboard navigation
  useKeyboardNavigation({
    onNext: () => handleNextPhase(),
    onPrevious: () => handlePreviousPhase(),
    enabled: true,
  });

  // Effects
  useEffect(() => {
    if (!slug) return;

    const data = getJourneyByPersona(slug as string);
    if (data) {
      setJourneyData(data as Journey);
    }
  }, [slug]);

  useEffect(() => {
    if (currentPhaseIndex !== undefined) {
      updateProgress();
      checkBadges(currentPhaseIndex);
    }
  }, [currentPhaseIndex, updateProgress, checkBadges]);

  useEffect(() => {
    if (publicKey) {
      updateBalance();
    }
  }, [publicKey, updateBalance]);

  useEffect(() => {
    if (currentPhaseIndex !== safePhaseIndex) {
      setCurrentPhaseIndex(safePhaseIndex);
    }
  }, [safePhaseIndex, currentPhaseIndex]);

  useEffect(() => {
    if (phases.length > 0) {
      const targetPercentage = (currentPhaseIndex / (phases.length - 1)) * 100;
      setProgressPercentage(targetPercentage);
    }
  }, [currentPhaseIndex, phases.length]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [currentPhaseIndex]);

  // Log de débogage pour suivre les changements de phase
  useEffect(() => {
    console.log('Phase changed', currentPhaseIndex, currentPhase);
  }, [currentPhaseIndex, currentPhase]);

  // Construction de l'objet metadata
  const metadata = {
    title: journeyData?.label || '',
    subtitle: '',
    tagline: journeyData?.tagline || '',
    target: '',
    profileType: '',
    missionType: '',
    icon: journeyData?.icon || '',
    slug: journeyData?.persona || '',
    description: journeyData?.description || '',
  };

  // Rendu conditionnel
  if (router.isFallback || !journeyData) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <h2 className="text-xl font-bold">Loading journey...</h2>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Animation variants for content
  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
  };

  // Handle Zyno modal
  const handleZynoClick = () => {
    setIsZynoModalOpen(true);
  };

  return (
    <MainLayout>
      <Head>
        <title>{`${metadata.title || 'Journey'} | Money Factory AI`}</title>
        <meta name="description" content={metadata.description || 'Journey details'} />
      </Head>

      <div className="container mx-auto px-4 py-8">
        {/* Journey Header */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start gap-6">
          <JourneyHeader journey={{ title: metadata.title, description: metadata.description }} />
          <WalletConnect />
        </div>

        {/* Global Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progression globale</span>
            <span className="text-sm font-medium text-gray-700">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <JourneySidebar
              metadata={metadata}
              phases={phases}
              currentPhase={currentPhaseIndex}
              onPhaseClick={setCurrentPhaseIndex}
              onOpenZynoModal={handleZynoClick}
              onNotifyClick={() => {}}
              mfaiBalance={'0'}
            />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPhaseIndex}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={contentVariants}
                className="space-y-8"
              >
                {/* Phase Content */}
                <PhaseSection
                  phase={currentPhase}
                  currentPhase={currentPhaseIndex}
                  totalPhases={phases.length}
                />

                {/* Phase Feedback */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Phase</span>
                  <span className="text-sm font-medium text-gray-900">{currentPhaseIndex + 1}</span>
                  <span className="text-sm text-gray-500">sur</span>
                  <span className="text-sm font-medium text-gray-900">
                    {journeyData?.phases.length ?? '0'}
                  </span>
                </div>
                <PhaseFeedback phaseId={`phase-${currentPhaseIndex}`} />

                {/* Why It Matters Section */}
                <WhyItMatters content={journeyData.whyItMatters} />

                {/* Final Role Section */}
                <FinalRoleSection content={journeyData.finalRole} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Achievement Notification */}
      <AchievementNotification
        title={achievementNotification.title}
        description={achievementNotification.description}
        isVisible={achievementNotification.isVisible}
        onClose={() => setAchievementNotification(prev => ({ ...prev, isVisible: false }))}
      />

      {/* Zyno Modal */}
      <ZynoSimulator
        isOpen={isZynoModalOpen}
        onClose={() => setIsZynoModalOpen(false)}
        journeySlug={metadata.slug}
      />
    </MainLayout>
  );
}
