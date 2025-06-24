import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ConstructionBanner() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      className="w-full bg-gradient-to-r from-[#9945FF]/10 to-[#14F195]/10 border border-[#14F195]/20 rounded-2xl p-6 mb-8"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-2xl">⚠️</div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">Protocole en Évolution Active</h3>
            <p className="text-sm text-gray-300">
              Vous prévisualisez le Cognitive Activation Engine™ — conçu pour les bâtisseurs
              souverains.
            </p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-full text-white text-sm font-medium shadow-lg hover:shadow-[#14F195]/20 transition-all duration-300"
        >
          En savoir plus
        </motion.button>
      </div>
    </motion.div>
  );
}
