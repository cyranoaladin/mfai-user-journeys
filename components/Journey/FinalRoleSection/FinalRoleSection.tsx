import React, { FC } from 'react';
import { motion } from 'framer-motion';

interface FinalRoleSectionProps {
  content: string;
}

/**
 * FinalRoleSection Component - Displays the "Your Final Role" section with animation
 */
const FinalRoleSection: FC<FinalRoleSectionProps> = ({ content }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 mb-6 hover:border-green-700/30 transition-all duration-300"
    >
      <h3 className="text-xl font-semibold mb-4">Your Final Role</h3>
      <div className="prose prose-invert max-w-none">
        <div
          dangerouslySetInnerHTML={{
            __html:
              content ||
              'Complete this journey to unlock your potential in the Money Factory ecosystem.',
          }}
        />
      </div>
    </motion.div>
  );
};

export default FinalRoleSection;
