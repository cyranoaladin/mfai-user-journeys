import { useSimulationStore } from '@/stores/simulationStore';
import { JourneyContent, PersonaType } from '@/types';
import { motion } from 'framer-motion';

interface JourneyCardProps {
    journey: JourneyContent;
    onClick: () => void;
}

const JourneyCard: React.FC<JourneyCardProps> = ({ journey, onClick }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-xl p-6 cursor-pointer"
            onClick={onClick}
        >
            <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">{journey.metadata.icon}</span>
                <div>
                    <h3 className="text-xl font-bold text-white">{journey.metadata.title}</h3>
                    <p className="text-sm text-gray-300">{journey.metadata.subtitle}</p>
                </div>
            </div>

            <p className="text-gray-300 mb-4">{journey.metadata.description}</p>

            <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-purple-500/20 rounded-full text-sm text-purple-300">
                    {journey.metadata.profileType}
                </span>
                <span className="px-3 py-1 bg-blue-500/20 rounded-full text-sm text-blue-300">
                    {journey.metadata.target}
                </span>
                {journey.metadata.missionType && (
                    <span className="px-3 py-1 bg-green-500/20 rounded-full text-sm text-green-300">
                        {journey.metadata.missionType}
                    </span>
                )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-sm text-gray-400">{journey.metadata.tagline}</p>
            </div>
        </motion.div>
    );
};

interface JourneySelectorProps {
    journeys: JourneyContent[];
    onSelect: (journey: JourneyContent) => void;
}

export const JourneySelector: React.FC<JourneySelectorProps> = ({ journeys, onSelect }) => {
    const { setCurrentPersona } = useSimulationStore();

    const handleJourneySelect = (journey: JourneyContent) => {
        // Set the current persona based on the profile type
        setCurrentPersona(journey.metadata.profileType as PersonaType);
        onSelect(journey);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <h1 className="text-4xl font-bold text-white mb-4">
                    Choose Your Transformation Path
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                    Select a journey that aligns with your goals and aspirations in the Web3 ecosystem.
                    Each path offers unique opportunities for growth and value creation.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {journeys.map((journey) => (
                    <JourneyCard
                        key={journey.metadata.slug}
                        journey={journey}
                        onClick={() => handleJourneySelect(journey)}
                    />
                ))}
            </motion.div>
        </div>
    );
}; 