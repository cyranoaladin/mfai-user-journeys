import { FC } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import MainLayout from '../components/Layout/MainLayout';
import WalletConnect from '../components/Wallet/WalletConnect';
import { useStore } from '../utils/store';

/**
 * Home Page
 * 
 * Landing page with hero section and journey entry point
 */
const HomePage: FC = () => {
  const router = useRouter();
  const { walletConnected } = useStore();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  return (
    <MainLayout
      title="Money Factory AI - Cognitive Activation Journeys™"
      description="Personalized Web3 learning and earning journeys for students, entrepreneurs, investors, and builders."
    >
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-6">
        <div className="container mx-auto">
          <motion.div 
            className="flex flex-col md:flex-row items-center gap-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Hero Content */}
            <motion.div className="flex-1" variants={itemVariants}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Cognitive Activation Journeys™
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                Personalized Web3 learning and earning paths designed for your specific goals. 
                Build skills, earn credentials, and unlock opportunities.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => router.push('/journeys')}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Explore Journeys
                </button>

                <button
                  onClick={() => alert('Zyno will soon recommend a journey for you!')}
                  className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Ask Zyno
                </button>
                
                {!walletConnected && (
                  <div className="inline-block">
                    <WalletConnect buttonStyle="expanded" />
                  </div>
                )}
              </div>
              
              <div className="mt-8 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  <span className="text-gray-300 text-sm">5 Unique Personas</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                  <span className="text-gray-300 text-sm">NFT Rewards</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                  <span className="text-gray-300 text-sm">AI Assistance</span>
                </div>
              </div>
            </motion.div>
            
            {/* Hero Image */}
            <motion.div className="flex-1" variants={itemVariants}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-xl"></div>
                <div className="relative bg-gray-800 border border-gray-700 rounded-lg overflow-hidden p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="journey-preview bg-gray-700 rounded-lg p-4 flex flex-col items-center text-center">
                      <div className="text-4xl mb-2">👨‍🎓</div>
                      <h3 className="font-bold mb-1">Student</h3>
                      <p className="text-xs text-gray-400">Learn Web3 fundamentals</p>
                    </div>
                    <div className="journey-preview bg-gray-700 rounded-lg p-4 flex flex-col items-center text-center">
                      <div className="text-4xl mb-2">👨‍💼</div>
                      <h3 className="font-bold mb-1">Entrepreneur</h3>
                      <p className="text-xs text-gray-400">Tokenize your business</p>
                    </div>
                    <div className="journey-preview bg-gray-700 rounded-lg p-4 flex flex-col items-center text-center">
                      <div className="text-4xl mb-2">🧠</div>
                      <h3 className="font-bold mb-1">Builder</h3>
                      <p className="text-xs text-gray-400">Create Web3 apps</p>
                    </div>
                    <div className="journey-preview bg-gray-700 rounded-lg p-4 flex flex-col items-center text-center">
                      <div className="text-4xl mb-2">💰</div>
                      <h3 className="font-bold mb-1">Investor</h3>
                      <p className="text-xs text-gray-400">Maximize Web3 returns</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                      <span className="text-xs text-gray-400">5-Phase Journey</span>
                    </div>
                    <div className="text-xs text-blue-400">Powered by Zyno AI</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-800/50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              How it Works
            </span>
          </h2>
          <div className="max-w-3xl mx-auto space-y-6 text-gray-300">
            <div>
              <h3 className="font-semibold">How will these journeys be activated?</h3>
              <p className="text-sm">Journeys are deployed progressively. You can explore the prototype now and your progress will carry over once the protocol goes live.</p>
            </div>
            <div>
              <h3 className="font-semibold">What is a Proof™?</h3>
              <p className="text-sm">A Proof™ is a verifiable credential minted on-chain to certify your achievements.</p>
            </div>
            <div>
              <h3 className="font-semibold">When can I launch my project?</h3>
              <p className="text-sm">As soon as your activation phases are complete and your Proof Stack is validated, you'll unlock project launch tools.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-800/50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Journey Features
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="feature-card bg-gray-800 border border-gray-700 rounded-lg p-6">
              <div className="text-blue-400 text-3xl mb-4">🧠</div>
              <h3 className="text-xl font-bold mb-2">Zyno AI Co-Founder™</h3>
              <p className="text-gray-300">
                Get personalized guidance from your AI assistant throughout your journey.
              </p>
            </div>
            
            <div className="feature-card bg-gray-800 border border-gray-700 rounded-lg p-6">
              <div className="text-blue-400 text-3xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-2">Proof-of-Skill™ NFTs</h3>
              <p className="text-gray-300">
                Earn verifiable on-chain credentials as you complete journey phases.
              </p>
            </div>
            
            <div className="feature-card bg-gray-800 border border-gray-700 rounded-lg p-6">
              <div className="text-blue-400 text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">XP & Leveling</h3>
              <p className="text-gray-300">
                Track your progress and unlock rewards as you gain experience points.
              </p>
            </div>
            
            <div className="feature-card bg-gray-800 border border-gray-700 rounded-lg p-6">
              <div className="text-blue-400 text-3xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-2">NFT Gating</h3>
              <p className="text-gray-300">
                Access premium content with NFT passes and earned credentials.
              </p>
            </div>
            
            <div className="feature-card bg-gray-800 border border-gray-700 rounded-lg p-6">
              <div className="text-blue-400 text-3xl mb-4">🏛️</div>
              <h3 className="text-xl font-bold mb-2">DAO Governance</h3>
              <p className="text-gray-300">
                Participate in decision-making as you advance through your journey.
              </p>
            </div>
            
            <div className="feature-card bg-gray-800 border border-gray-700 rounded-lg p-6">
              <div className="text-blue-400 text-3xl mb-4">💎</div>
              <h3 className="text-xl font-bold mb-2">Neuro-Dividends™</h3>
              <p className="text-gray-300">
                Earn passive income from your knowledge contributions to the ecosystem.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 px-6">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Start Your Journey?
              </h2>
              
              <p className="text-xl text-gray-300 mb-8">
                Choose your persona and begin your Web3 cognitive activation journey today.
              </p>
              
              <button 
                onClick={() => router.push('/journeys')}
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-medium text-lg transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default HomePage;
