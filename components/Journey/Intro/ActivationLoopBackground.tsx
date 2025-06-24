import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Sparkles, Zap, Lock } from 'lucide-react';

const phases = [
  {
    name: 'Cognitive Activation',
    description: 'Débloquez votre potentiel cognitif',
    icon: Brain,
  },
  {
    name: 'Skillchain Mining',
    description: 'Acquérez et validez vos compétences',
    icon: Sparkles,
  },
  {
    name: 'Proof-of-Vision',
    description: 'Validez votre vision et votre exécution',
    icon: Zap,
  },
  {
    name: 'Cognitive Lock',
    description: 'Commit to the protocol',
    icon: Lock,
  },
];

const circleVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: 'easeOut' as const,
    },
  },
};

const phaseVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  }),
};

export default function ActivationLoopBackground() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#9945FF]/20 to-[#14F195]/20 blur-3xl" />

      {/* Animated circle */}
      <motion.div
        ref={ref}
        className="relative w-[600px] h-[600px]"
        variants={circleVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 600 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.circle
            cx="300"
            cy="300"
            r="250"
            stroke="url(#gradient)"
            strokeWidth="2"
            strokeDasharray="1570"
            strokeDashoffset="1570"
            initial={{ strokeDashoffset: 1570 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
          <defs>
            <linearGradient
              id="gradient"
              x1="50"
              y1="300"
              x2="550"
              y2="300"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9945FF" />
              <stop offset="1" stopColor="#14F195" />
            </linearGradient>
          </defs>
        </svg>

        {/* Phase cards */}
        <div className="absolute inset-0">
          {phases.map((phase, index) => {
            const angle = (index * 360) / phases.length;
            const radians = (angle * Math.PI) / 180;
            const x = 300 + 250 * Math.cos(radians);
            const y = 300 + 250 * Math.sin(radians);

            return (
              <motion.div
                key={phase.name}
                className="absolute w-48 h-48 -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                }}
                variants={phaseVariants}
                custom={index}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                whileHover={{ scale: 1.1 }}
              >
                <div className="group relative w-full h-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#9945FF]/10 to-[#14F195]/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                  <div className="relative p-6 rounded-xl bg-black/50 border border-[#14F195]/20 backdrop-blur-sm h-full flex flex-col items-center justify-center text-center">
                    <phase.icon className="w-12 h-12 text-[#14F195] mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">{phase.name}</h3>
                    <p className="text-sm text-gray-400">{phase.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
