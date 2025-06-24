import React, { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface AlertBannerProps {
  /**
   * Message to display in the alert banner
   */
  message: string;
  /**
   * Whether the alert can be dismissed
   */
  dismissible?: boolean;
  /**
   * Type of alert (affects styling)
   */
  type?: 'info' | 'warning' | 'construction';
}

/**
 * Platform-wide alert banner to display important messages
 * Can be used for construction notices, announcements, etc.
 */
const AlertBanner: FC<AlertBannerProps> = ({ message, dismissible = true, type = 'info' }) => {
  const [isVisible, setIsVisible] = useState(true);

  // If banner is dismissed, don't render anything
  if (!isVisible) return null;

  // Determine background color based on type
  const getBgColor = () => {
    switch (type) {
      case 'warning':
        return 'bg-amber-900/70 border-amber-600/50';
      case 'construction':
        return 'bg-yellow-900/70 border-yellow-600/50';
      case 'info':
      default:
        return 'bg-blue-900/70 border-blue-600/50';
    }
  };

  // Determine text color based on type
  const getTextColor = () => {
    switch (type) {
      case 'warning':
        return 'text-amber-200';
      case 'construction':
        return 'text-yellow-200';
      case 'info':
      default:
        return 'text-blue-200';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`w-full ${getBgColor()} backdrop-blur-sm border-b ${getTextColor()} py-2 px-4 flex items-center justify-center`}
          role="alert"
          aria-live="polite"
        >
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center">
              {type === 'construction' && (
                <span className="mr-2 text-lg" aria-hidden="true">
                  🚧
                </span>
              )}
              {type === 'warning' && (
                <span className="mr-2 text-lg" aria-hidden="true">
                  ⚠️
                </span>
              )}
              {type === 'info' && (
                <span className="mr-2 text-lg" aria-hidden="true">
                  ℹ️
                </span>
              )}
              <p className="text-sm md:text-base">{message}</p>
            </div>
            {dismissible && (
              <button
                onClick={() => setIsVisible(false)}
                className="ml-4 opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full"
                aria-label="Dismiss alert"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AlertBanner;
