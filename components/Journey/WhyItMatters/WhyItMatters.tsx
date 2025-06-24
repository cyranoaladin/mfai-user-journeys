import React, { FC } from 'react';
import { motion } from 'framer-motion';

interface WhyItMattersProps {
  content: string;
}

/**
 * WhyItMatters Component - Displays the "Why It Matters" section with animation
 */
const WhyItMatters: FC<WhyItMattersProps> = ({ content }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 mb-6 hover:border-blue-700/30 transition-all duration-300"
    >
      <h3 className="text-xl font-semibold mb-4">Why It Matters</h3>
      <div className="prose prose-invert max-w-none">
        <div
          dangerouslySetInnerHTML={{
            __html:
              content ||
              'This journey will help you understand key concepts in the Money Factory ecosystem.',
          }}
        />
      </div>
    </motion.div>
  );
};

export default WhyItMatters;
