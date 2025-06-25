import { useState, useEffect } from 'react';
import { PhaseFeedbackData } from '../components/Journey/Phases/PhaseFeedback';
import logger from '@/utils/logger';

/**
 * Hook to handle phase feedback storage in localStorage
 */
export function usePhaseFeedback(journeySlug: string) {
  const [feedbackData, setFeedbackData] = useState<PhaseFeedbackData[]>([]);

  // Load feedback from localStorage on mount
  useEffect(() => {
    try {
      const storedFeedback = localStorage.getItem(`journey_feedback_${journeySlug}`);
      if (storedFeedback) {
        setFeedbackData(JSON.parse(storedFeedback));
      }
    } catch (error) {
      logger.error('Error loading feedback data:', error);
    }
  }, [journeySlug]);

  // Save feedback to localStorage
  const saveFeedback = (feedback: PhaseFeedbackData) => {
    try {
      // Add to state
      const updatedFeedback = [...feedbackData, feedback];
      setFeedbackData(updatedFeedback);

      // Save to localStorage
      localStorage.setItem(`journey_feedback_${journeySlug}`, JSON.stringify(updatedFeedback));

      // Log for debugging (can be connected to analytics later)
      logger.log('Feedback saved:', feedback);

      return true;
    } catch (error) {
      logger.error('Error saving feedback:', error);
      return false;
    }
  };

  // Check if feedback exists for a specific phase
  const hasFeedbackForPhase = (phaseIndex: number) => {
    return feedbackData.some(item => item.phaseIndex === phaseIndex);
  };

  return {
    feedbackData,
    saveFeedback,
    hasFeedbackForPhase,
  };
}

export default usePhaseFeedback;
