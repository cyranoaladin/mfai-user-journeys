import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Pickaxe, GraduationCap, Bot, Coins, Brain, RefreshCw, Link2 } from 'lucide-react';

const features = [
  {
    title: 'Skillchain Mining™',
    description: "Extrayez de la valeur cognitive via les phases d'apprentissage",
    icon: Pickaxe,
    gradient: 'from-[#9945FF] to-[#14F195]',
  },
  {
    title: 'Proof-of-Skill Token™',
    description: 'Chaque compétence validée devient un NFT certifiant',
    icon: GraduationCap,
    gradient: 'from-[#14F195] to-[#9945FF]',
  },
  {
    title: 'Zyno AI Co-Founder™',
    description: 'Agent IA contextuel, guide et bâtisseur',
    icon: Bot,
    gradient: 'from-[#9945FF] to-[#14F195]',
  },
  {
    title: 'Neuro-Dividends™',
    description: 'Revenus distribués pour contribution méritée',
    icon: Coins,
    gradient: 'from-[#14F195] to-[#9945FF]',
  },
  {
    title: 'Synaptic Governance™',
    description: 'Pouvoir méritocratique piloté par preuve on-chain',
    icon: Brain,
    gradient: 'from-[#9945FF] to-[#14F195]',
  },
  {
    title: 'Activation Loop™',
    description: 'Boucle circulaire de valeur et utilité utilisateur',
    icon: RefreshCw,
    gradient: 'from-[#14F195] to-[#9945FF]',
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

export default function MFAIFeatures() {
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
            Les Innovations Protocolaires MFAI
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Découvrez les mécanismes uniques qui transforment l&apos;intelligence en souveraineté
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              transition={{ delay: i * 0.1 }}
              className={`bg-gradient-to-br ${feature.gradient} p-0.5 rounded-2xl group transition-all duration-300`}
            >
              <div className="bg-black rounded-2xl p-6 h-full flex flex-col items-center justify-center text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="mb-4"
                >
                  <feature.icon className="h-10 w-10" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2 text-center">{feature.title}</h3>
                <p className="text-sm text-gray-300 text-center">{feature.description}</p>
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

        <div className="mt-16 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-[#14F195]/20 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Link2 className="h-5 w-5" /> Engage Zyno AI
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
