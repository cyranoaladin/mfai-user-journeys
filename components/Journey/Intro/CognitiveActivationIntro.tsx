import { motion } from 'framer-motion';
import { FaBrain, FaBriefcase, FaCoins, FaGraduationCap } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import InspirationalQuote from './InspirationalQuote';
import WalletStateCTA from './WalletStateCTA';

const personas = [
  {
    icon: <FaGraduationCap size={28} />,
    title: 'Student',
    subtitle: 'Mine cognitive capital via Skillchain Mining™',
    gradient: 'from-[#9945FF] to-[#14F195]',
    phase: 'Phase 0: Cognitive Activation',
    xp: '0 XP',
    quote: 'Transform your learning into sovereign value',
    author: 'MFAI Protocol',
  },
  {
    icon: <FaBriefcase size={28} />,
    title: 'Entrepreneur',
    subtitle: 'Tokenize your vision with Proof-of-Skill™',
    gradient: 'from-[#14F195] to-[#9945FF]',
    phase: 'Phase 0: Cognitive Activation',
    xp: '0 XP',
    quote: 'Build the future with AI co-founders',
    author: 'MFAI Protocol',
  },
  {
    icon: <FaBrain size={28} />,
    title: 'Builder',
    subtitle: 'Co-build with Zyno AI Co-Founder™',
    gradient: 'from-[#9945FF] to-[#14F195]',
    phase: 'Phase 0: Cognitive Activation',
    xp: '0 XP',
    quote: 'Create with the power of collective intelligence',
    author: 'MFAI Protocol',
  },
  {
    icon: <FaCoins size={28} />,
    title: 'Investor',
    subtitle: 'Unlock Neuro-Dividends™ via Synaptic Governance™',
    gradient: 'from-[#14F195] to-[#9945FF]',
    phase: 'Phase 0: Cognitive Activation',
    xp: '0 XP',
    quote: 'Invest in the future of human-AI collaboration',
    author: 'MFAI Protocol',
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

export default function CognitiveActivationIntro() {
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
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#9945FF] to-[#14F195]"
          >
            The Protocol That Turns Intelligence into Sovereignty™
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Powered by Zyno. Governed by Proof. Built for Builders.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {personas.map((p, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              transition={{ delay: i * 0.1 }}
              className={`bg-gradient-to-br ${p.gradient} p-0.5 rounded-2xl group transition-all duration-300 relative`}
            >
              <div className="bg-black rounded-2xl p-6 h-full flex flex-col items-center justify-center text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.div
                  className="text-3xl mb-3 text-[#14F195]"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {p.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
                <p className="text-sm text-gray-300 text-center mb-4">{p.subtitle}</p>
                <div className="mt-auto w-full">
                  <div className="text-xs text-[#14F195] mb-1">{p.phase}</div>
                  <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#9945FF] to-[#14F195]"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1, delay: i * 0.2 }}
                    />
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{p.xp}</div>
                </div>
                <InspirationalQuote quote={p.quote} author={p.author} />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <WalletStateCTA />
        </div>
      </motion.div>
    </section>
  );
}
