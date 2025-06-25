import { FC, useState } from 'react';
import { Button } from '../../ui/button';
import { Textarea } from '../../ui/textarea';
import { Star } from 'lucide-react';
import logger from '@/utils/logger';

export interface PhaseFeedbackData {
  phaseIndex: number;
  rating: number;
  comment: string;
  timestamp: number;
}

interface PhaseFeedbackProps {
  phaseId: string;
  className?: string;
  feedback?: string;
  onFeedbackSubmit?: (feedback: PhaseFeedbackData) => void;
}

const PhaseFeedback: FC<PhaseFeedbackProps> = ({
  phaseId,
  className = '',
  feedback = '',
  onFeedbackSubmit,
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState(feedback);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) return;

    setIsSubmitting(true);
    try {
      const feedbackData: PhaseFeedbackData = {
        phaseIndex: parseInt(phaseId.split('-')[1]) || 0,
        rating,
        comment,
        timestamp: Date.now(),
      };

      if (onFeedbackSubmit) {
        onFeedbackSubmit(feedbackData);
      }

      // Reset form
      setRating(0);
      setComment('');
    } catch (error) {
      logger.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`bg-gray-800/50 rounded-lg p-6 ${className}`}>
      <h3 className="text-lg font-semibold mb-4 text-white">Your Feedback</h3>

      {/* Rating Stars */}
      <div className="flex gap-2 mb-4">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className={`p-2 rounded-full transition-colors ${
              star <= rating ? 'text-yellow-400' : 'text-gray-400'
            }`}
          >
            <Star className="w-6 h-6" fill={star <= rating ? 'currentColor' : 'none'} />
          </button>
        ))}
      </div>

      {/* Comment Textarea */}
      <Textarea
        value={comment}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
        placeholder="Tell us what you liked about this phase and how we could improve it. What concepts were most valuable? What would you like to learn more about? Your detailed feedback helps us enhance the Cognitive Activation Protocol™ experience for all users."
        className="mb-4 bg-gray-900 border-gray-700 text-white"
        rows={4}
      />

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={rating === 0 || isSubmitting}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
      </Button>
    </div>
  );
};

export default PhaseFeedback;
