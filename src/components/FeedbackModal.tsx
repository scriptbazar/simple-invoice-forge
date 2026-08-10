import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface FeedbackModalProps {
  onClose: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState(0);
  const [satisfied, setSatisfied] = useState<boolean | null>(null);
  const [feedback, setFeedback] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleRatingSubmit = () => {
    if (rating === 0) {
      toast({
        title: "Please rate us",
        description: "Please select a rating before continuing",
        variant: "destructive"
      });
      return;
    }
    setStep(2);
  };

  const handleFeedbackSubmit = async () => {
    try {
      const feedbackData = {
        rating,
        satisfied,
        feedback,
        timestamp: new Date().toISOString()
      };
      
      console.log('Submitting feedback:', feedbackData);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast({
        title: "Thank you for your feedback!",
        description: "Your feedback helps us improve our service"
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Failed to submit feedback",
        description: "Please try again later",
        variant: "destructive"
      });
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starNumber = index + 1;
      const isActive = starNumber <= (hoveredStar || rating);
      
      return (
        <button
          key={index}
          onClick={() => setRating(starNumber)}
          onMouseEnter={() => setHoveredStar(starNumber)}
          onMouseLeave={() => setHoveredStar(0)}
          className="p-1 transition-transform hover:scale-110"
        >
          <Star
            className={`h-8 w-8 transition-colors ${
              isActive 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300 hover:text-yellow-300'
            }`}
          />
        </button>
      );
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-2xl w-full max-w-md relative space-y-4"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full p-2"
          >
            <X className="h-4 w-4" />
          </Button>

          <h2 className="text-xl font-extrabold text-center text-gray-900 dark:text-white pt-2">
            {step === 1 ? 'Rate Your Experience' : 'Tell Us More'}
          </h2>

          {step === 1 && (
            <div className="py-4">
              <div className="text-center mb-6">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  How would you rate your experience with Smart Invoice Generator?
                </p>
                <div className="flex justify-center space-x-2">
                  {renderStars()}
                </div>
                {rating > 0 && (
                  <p className="mt-4 text-xs text-gray-500">
                    {rating === 1 && "We're sorry to hear that. We'll do better!"}
                    {rating === 2 && "Thanks for the feedback. We'll improve!"}
                    {rating === 3 && "Good! We appreciate your feedback."}
                    {rating === 4 && "Great! We're glad you enjoyed it."}
                    {rating === 5 && "Excellent! Thank you so much!"}
                  </p>
                )}
              </div>
              <div className="flex justify-center space-x-3">
                <Button variant="outline" onClick={onClose} className="rounded-xl text-xs">
                  Skip
                </Button>
                <Button onClick={handleRatingSubmit} className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs">
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="py-4 space-y-5">
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Are you satisfied with this tool?
                </p>
                <div className="flex justify-center space-x-3">
                  <Button
                    variant={satisfied === true ? "default" : "outline"}
                    onClick={() => setSatisfied(true)}
                    className="px-6 rounded-xl text-xs"
                  >
                    Yes
                  </Button>
                  <Button
                    variant={satisfied === false ? "default" : "outline"}
                    onClick={() => setSatisfied(false)}
                    className="px-6 rounded-xl text-xs"
                  >
                    No
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5 text-gray-700 dark:text-gray-300">
                  Additional Feedback (Optional)
                </label>
                <Textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell us what you liked or how we can improve..."
                  rows={3}
                  className="rounded-xl text-xs"
                />
              </div>

              <div className="flex justify-center space-x-3">
                <Button variant="outline" onClick={onClose} className="rounded-xl text-xs">
                  Skip
                </Button>
                <Button onClick={handleFeedbackSubmit} className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs">
                  Submit Feedback
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
