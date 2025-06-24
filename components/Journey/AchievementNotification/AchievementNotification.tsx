import { AnimatePresence, motion } from 'framer-motion';
import { Trophy, X } from 'lucide-react';

interface AchievementNotificationProps {
  title: string;
  description: string;
  isVisible: boolean;
  onClose: () => void;
}

export const AchievementNotification = ({
  title,
  description,
  isVisible,
  onClose,
}: AchievementNotificationProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-lg shadow-lg max-w-sm"
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <Trophy className="w-6 h-6 text-yellow-300" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{title}</h3>
              <p className="text-sm opacity-90">{description}</p>
            </div>
            <button onClick={onClose} className="flex-shrink-0 hover:opacity-80 transition-opacity">
              <X className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
