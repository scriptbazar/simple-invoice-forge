
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
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
      // This would submit to backend (Firebase/MongoDB)
      const feedbackData = {
        rating,
        satisfied,
        feedback,
        timestamp: new Date().toISOString()
      };
      
      console.log('Submitting feedback:', feedbackData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {step === 1 ? 'Rate Your Experience' : 'Tell Us More'}
          </DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="py-6">
            <div className="text-center mb-6">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                How would you rate our Smart Invoice Generator?
              </p>
              <div className="flex justify-center space-x-2">
                {renderStars()}
              </div>
              {rating > 0 && (
                <p className="mt-4 text-sm text-gray-500">
                  {rating === 1 && "We're sorry to hear that. We'll do better!"}
                  {rating === 2 && "Thanks for the feedback. We'll improve!"}
                  {rating === 3 && "Good! We appreciate your feedback."}
                  {rating === 4 && "Great! We're glad you enjoyed it."}
                  {rating === 5 && "Excellent! Thank you so much!"}
                </p>
              )}
            </div>
            <div className="flex justify-center space-x-3">
              <Button variant="outline" onClick={onClose}>
                Skip
              </Button>
              <Button onClick={handleRatingSubmit}>
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="py-6 space-y-6">
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Are you satisfied with this tool?
              </p>
              <div className="flex justify-center space-x-4">
                <Button
                  variant={satisfied === true ? "default" : "outline"}
                  onClick={() => setSatisfied(true)}
                  className="px-8"
                >
                  Yes
                </Button>
                <Button
                  variant={satisfied === false ? "default" : "outline"}
                  onClick={() => setSatisfied(false)}
                  className="px-8"
                >
                  No
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Additional Feedback (Optional)
              </label>
              <Textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Tell us what you liked or how we can improve..."
                rows={4}
              />
            </div>

            <div className="flex justify-center space-x-3">
              <Button variant="outline" onClick={onClose}>
                Skip
              </Button>
              <Button onClick={handleFeedbackSubmit}>
                Submit Feedback
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
