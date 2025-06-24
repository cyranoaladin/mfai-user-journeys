import { useSimulationStore } from '@/stores/simulationStore';
import { JourneyContent } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { NFTGallery } from './NFTGallery';
import { PhaseDetailCard } from './PhaseDetailCard';
import { PhaseList } from './PhaseList';
import { PhaseTransition } from './PhaseTransition';
import { RewardNotification } from './RewardNotification';
import { SimulatedStatePanel } from './SimulatedStatePanel';
import { StatsPanel } from './StatsPanel';
import { ZynoAssistantBox } from './ZynoAssistantBox';

interface JourneyDashboardProps {
    journey: JourneyContent;
}

export const JourneyDashboard: React.FC<JourneyDashboardProps> = ({ journey }) => {
    const {
        currentPhaseIndex,
        setCurrentPhaseIndex,
        completePhase,
        addXP,
        addNFT,
        addMFaiTokens,
        showReward,
        hideReward,
        startPhaseTransition,
        endPhaseTransition,
        isPhaseTransitioning,
        reward,
    } = useSimulationStore();

    const handlePhaseSelect = (index: number) => {
        setCurrentPhaseIndex(index);
    };

    const handlePhaseComplete = async () => {
        const currentPhase = journey.phases[currentPhaseIndex];
        if (!currentPhase) return;

        // Démarrer la transition
        startPhaseTransition();
        showReward({
            type: 'xp',
            amount: currentPhase.xpReward || 0,
        });

        // Ajouter les récompenses
        if (currentPhase.xpReward) {
            addXP(currentPhase.xpReward);
        }

        if (currentPhase.nftReward) {
            addNFT({
                id: `${journey.metadata.slug}-${currentPhaseIndex}`,
                name: currentPhase.nftReward,
                imageUrl: `/nfts/${journey.metadata.slug}-${currentPhaseIndex}.png`,
                rarity: 'Common',
                utility: 'Proof of completion',
                unlockedAt: Date.now(),
            });
        }

        // Ajouter des tokens MFAI
        addMFaiTokens(currentPhase.xpReward || 0);

        // Marquer la phase comme complétée
        completePhase(currentPhaseIndex);

        // Attendre les animations
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Terminer la transition
        hideReward();
        endPhaseTransition();
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* En-tête */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-purple-900 to-blue-900 p-8"
            >
                <div className="container mx-auto">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-4xl">{journey.metadata.icon}</span>
                        <div>
                            <h1 className="text-3xl font-bold">{journey.metadata.title}</h1>
                            <p className="text-gray-300">{journey.metadata.subtitle}</p>
                        </div>
                    </div>
                    <p className="text-gray-300 max-w-3xl">{journey.metadata.description}</p>
                </div>
            </motion.div>

            {/* Contenu principal */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Timeline (gauche) */}
                    <div className="lg:col-span-3">
                        <PhaseList
                            phases={journey.phases}
                            onPhaseSelect={handlePhaseSelect}
                        />
                    </div>

                    {/* Détails de la phase (centre) */}
                    <div className="lg:col-span-6">
                        <AnimatePresence mode="wait">
                            {isPhaseTransitioning ? (
                                <motion.div
                                    key="transition"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="h-full flex items-center justify-center"
                                >
                                    <div className="text-center">
                                        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                                        <p className="text-gray-300">Processing your progress...</p>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="content"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                >
                                    <PhaseDetailCard
                                        phase={journey.phases[currentPhaseIndex]}
                                        onComplete={handlePhaseComplete}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Panneau latéral (droite) */}
                    <div className="lg:col-span-3 space-y-6">
                        <StatsPanel />
                        <SimulatedStatePanel />
                        <ZynoAssistantBox phase={journey.phases[currentPhaseIndex]} />
                    </div>
                </div>

                {/* Galerie NFT */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6">Your NFT Collection</h2>
                    <NFTGallery />
                </div>
            </div>

            {/* Notifications de récompense */}
            <AnimatePresence>
                {reward && <RewardNotification />}
            </AnimatePresence>

            {/* Transition de phase */}
            <AnimatePresence>
                {isPhaseTransitioning && currentPhaseIndex < journey.phases.length - 1 && (
                    <PhaseTransition
                        fromPhase={journey.phases[currentPhaseIndex]}
                        toPhase={journey.phases[currentPhaseIndex + 1]}
                        onComplete={endPhaseTransition}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}; 