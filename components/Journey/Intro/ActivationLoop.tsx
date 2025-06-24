import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BookOpen, Hammer, CheckCircle, Zap, Rocket } from 'lucide-react';

const phases = [
  {
    title: 'Learn',
    description: 'Acquérir les compétences Web3 fondamentales',
    icon: BookOpen,
    gradient: 'from-[#9945FF] to-[#14F195]',
  },
  {
    title: 'Build',
    description: 'Créer des projets concrets avec Zyno AI',
    icon: Hammer,
    gradient: 'from-[#14F195] to-[#9945FF]',
  },
  {
    title: 'Prove',
    description: 'Valider vos compétences via Proof-of-Skill™',
    icon: CheckCircle,
    gradient: 'from-[#9945FF] to-[#14F195]',
  },
  {
    title: 'Activate',
    description: 'Unlock Neuro-Dividends™',
    icon: Zap,
    gradient: 'from-[#14F195] to-[#9945FF]',
  },
  {
    title: 'Scale',
    description: 'Amplify your impact in the protocol',
    icon: Rocket,
    gradient: 'from-[#9945FF] to-[#14F195]',
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  hover: {
    scale: 1.05,
    boxShadow: '0 0 20px rgba(20, 241, 149, 0.3)',
  },
};

export default function ActivationLoop() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-black via-gray-950 to-black text-white">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={fadeInUp}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#9945FF] to-[#14F195]"
          >
            La Boucle d&apos;Activation Cognitive™
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Votre parcours vers la souveraineté numérique en 5 phases
          </motion.p>
        </div>

        <div className="relative">
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <div className="w-full h-1 bg-gradient-to-r from-[#9945FF] via-[#14F195] to-[#9945FF] rounded-full opacity-20" />
          </motion.div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {phases.map((phase, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                transition={{ delay: i * 0.1 }}
                className={`bg-gradient-to-br ${phase.gradient} p-0.5 rounded-2xl group transition-all duration-300`}
              >
                <div className="bg-black rounded-2xl p-6 h-full flex flex-col items-center justify-center text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <motion.div
                    className="mb-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="h-10 w-10">
                      {phase.icon && <phase.icon className="h-10 w-10" strokeWidth={2} />}
                    </div>
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2 text-center">{phase.title}</h3>
                  <p className="text-sm text-gray-300 text-center">{phase.description}</p>
                  <div className="mt-4 text-xs text-[#14F195]">Phase {i + 1}/5</div>
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#9945FF] to-[#14F195]"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-[#14F195]/20 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Rocket className="h-5 w-5" /> Start Your Cognitive Activation™
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
