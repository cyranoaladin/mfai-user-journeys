import { JourneyPhase } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';

interface PhaseTransitionProps {
    fromPhase: JourneyPhase;
    toPhase: JourneyPhase;
    onComplete: () => void;
}

export const PhaseTransition: React.FC<PhaseTransitionProps> = ({
    fromPhase,
    toPhase,
    onComplete,
}) => {
    return (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="max-w-2xl w-full p-8"
                >
                    {/* Cercle de progression */}
                    <div className="relative w-32 h-32 mx-auto mb-8">
                        <motion.div
                            initial={{ rotate: 0 }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                            className="absolute inset-0 border-4 border-purple-500 border-t-transparent rounded-full"
                        />
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute inset-0 flex items-center justify-center text-4xl"
                        >
                            🎉
                        </motion.div>
                    </div>

                    {/* Message de transition */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-center mb-8"
                    >
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Phase Completed!
                        </h2>
                        <p className="text-gray-300 text-lg">
                            You've successfully completed "{fromPhase.title}"
                        </p>
                    </motion.div>

                    {/* Détails de la nouvelle phase */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="bg-gray-800 rounded-lg p-6 mb-8"
                    >
                        <h3 className="text-xl font-bold text-white mb-4">
                            Next Phase: {toPhase.title}
                        </h3>
                        <p className="text-gray-300 mb-4">{toPhase.description}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span>Estimated time:</span>
                            <span className="text-purple-400">{toPhase.duration}</span>
                        </div>
                    </motion.div>

                    {/* Bouton de continuation */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        className="text-center"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onComplete}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-medium"
                        >
                            Continue to Next Phase
                        </motion.button>
                    </motion.div>

                    {/* Effets de particules */}
                    <div className="absolute inset-0 pointer-events-none">
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-purple-500 rounded-full"
                                initial={{
                                    x: '50%',
                                    y: '50%',
                                    opacity: 0,
                                }}
                                animate={{
                                    x: `${Math.random() * 100}%`,
                                    y: `${Math.random() * 100}%`,
                                    opacity: [0, 1, 0],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.1,
                                }}
                            />
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}; 