import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Sparkles, Zap, Bot } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Contextual Learning',
    description: 'Zyno adapte son assistance en fonction de votre niveau et de vos objectifs',
  },
  {
    icon: Sparkles,
    title: 'Vision Validation',
    description: 'Votre projet est évalué sur des critères concrets et mesurables',
  },
  {
    icon: Zap,
    title: 'Smart Guidance',
    description: 'Des recommandations personnalisées pour chaque étape de votre parcours',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function ZynoHero() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#9945FF]/5 to-[#14F195]/5" />

      <motion.div
        ref={ref}
        className="container mx-auto px-4 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <motion.div
            className="inline-block mb-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bot className="w-16 h-16 text-[#14F195] mx-auto" />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#9945FF] to-[#14F195]">
            Meet Zyno, Your AI Co-Founder™
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Votre partenaire stratégique pour transformer votre vision en réalité Web3. Zyno vous
            guide à travers chaque étape de votre parcours d&apos;activation cognitive.
          </p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" variants={containerVariants}>
          {features.map(feature => (
            <motion.div
              key={feature.title}
              className="group relative"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#9945FF]/10 to-[#14F195]/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative p-6 rounded-xl bg-black/50 border border-[#14F195]/20 backdrop-blur-sm">
                <feature.icon className="w-12 h-12 text-[#14F195] mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="mt-12 text-center" variants={itemVariants}>
          <motion.button
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[#9945FF] to-[#14F195] text-black font-semibold text-lg hover:shadow-lg hover:shadow-[#14F195]/20 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🤖 Engage Zyno AI
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
