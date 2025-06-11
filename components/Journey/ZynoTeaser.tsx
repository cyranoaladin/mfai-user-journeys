import React, { FC } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface ZynoTeaserProps {
  journeyName?: string;
  journeyTitle?: string;
}

const ZynoTeaser: FC<ZynoTeaserProps> = ({ journeyName, journeyTitle }) => {
  // Use journeyTitle or journeyName or default text
  const displayName = journeyTitle || journeyName || 'this journey';
  return (
    <motion.div 
      className="zyno-teaser bg-gradient-to-br from-gray-800/70 to-gray-900/70 border border-purple-500/20 rounded-xl p-6 backdrop-blur-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      {/* Animated glow effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl blur-xl animate-pulse" />
      </div>
      
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Zyno Icon */}
        <div className="flex-shrink-0">
          <motion.div 
            className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-3xl"
            animate={{ 
              boxShadow: ['0 0 0 rgba(139, 92, 246, 0.3)', '0 0 20px rgba(139, 92, 246, 0.6)', '0 0 0 rgba(139, 92, 246, 0.3)'] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          >
            🧠
          </motion.div>
        </div>
        
        {/* Content */}
        <div className="flex-grow text-center md:text-left">
          <h3 className="text-xl font-bold mb-2">Meet Zyno™ - Your AI Companion</h3>
          <p className="text-gray-300 mb-3">
            Zyno™ can help you navigate {displayName}, provide personalized guidance, and unlock deeper insights.
            <br />
            <span className="italic text-sm">Zyno will soon analyze your AEPO profile and recommend a tailored journey.</span>
          </p>
          {journeyName && ` The ${journeyName} awaits your unique contribution.`} Are you ready?
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <Link 
              href="/zyno-preview"
              className="px-4 py-2 rounded-full border border-purple-500/50 text-purple-300 hover:bg-purple-900/30 transition-colors flex items-center gap-2"
            >
              <span>🧬</span> Preview Zyno Diagnostic
            </Link>
            <button 
              className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            >
              Notify me when protocol activates
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ZynoTeaser;
