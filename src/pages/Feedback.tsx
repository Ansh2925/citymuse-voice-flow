import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Mic, 
  Star, 
  Heart, 
  Frown, 
  Meh, 
  Smile, 
  Laugh,
  Send,
  Volume2
} from "lucide-react";

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [moodRating, setMoodRating] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const stars = [1, 2, 3, 4, 5];
  
  const moodOptions = [
    { id: "frustrated", icon: Frown, label: "Frustrated", color: "text-red-500" },
    { id: "neutral", icon: Meh, label: "Neutral", color: "text-gray-500" },
    { id: "satisfied", icon: Smile, label: "Satisfied", color: "text-yellow-500" },
    { id: "delighted", icon: Laugh, label: "Delighted", color: "text-green-500" }
  ];

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simulate voice recording
      setTimeout(() => {
        setFeedbackText("The voice stories were amazing! I especially loved the hidden cafe recommendation. The mood detection felt very accurate and helped me discover places I wouldn't have found otherwise.");
        setIsRecording(false);
      }, 3000);
    }
  };

  const submitFeedback = () => {
    // Simulate feedback submission
    alert("Thank you for your feedback! Your input helps us improve CityMuse for everyone.");
    setRating(0);
    setMoodRating("");
    setFeedbackText("");
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <div className="p-6 text-center border-b border-border/50">
        <MessageSquare className="w-12 h-12 mx-auto mb-3 text-primary" />
        <h1 className="text-2xl font-bold">Share Your Experience</h1>
        <p className="text-muted-foreground">Help us make CityMuse even better for fellow travelers</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Overall Rating */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">How was your experience?</h2>
          
          <div className="flex justify-center gap-2 mb-4">
            {stars.map((star) => (
              <Button
                key={star}
                variant="ghost"
                size="sm"
                onClick={() => setRating(star)}
                className="p-1"
              >
                <Star 
                  className={`w-8 h-8 ${
                    star <= rating 
                      ? "fill-yellow-400 text-yellow-400" 
                      : "text-gray-300"
                  }`} 
                />
              </Button>
            ))}
          </div>
          
          {rating > 0 && (
            <p className="text-center text-sm text-muted-foreground">
              {rating === 1 && "We'd love to know how we can improve"}
              {rating === 2 && "Thanks for the feedback - we'll work on it"}
              {rating === 3 && "Good to know - any specific suggestions?"}
              {rating === 4 && "Great! What did you like most?"}
              {rating === 5 && "Amazing! We're thrilled you loved it"}
            </p>
          )}
        </Card>

        {/* Mood During Journey */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            How did you feel during your journey?
          </h2>
          
          <div className="grid grid-cols-2 gap-3">
            {moodOptions.map((mood) => {
              const Icon = mood.icon;
              return (
                <Button
                  key={mood.id}
                  variant={moodRating === mood.id ? "default" : "outline"}
                  onClick={() => setMoodRating(mood.id)}
                  className="h-auto py-3"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Icon className={`w-6 h-6 ${moodRating === mood.id ? "text-white" : mood.color}`} />
                    <span className="text-sm">{mood.label}</span>
                  </div>
                </Button>
              );
            })}
          </div>
          
          {moodRating && (
            <div className="mt-3 p-3 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                {moodRating === "frustrated" && "We're sorry to hear that. Your feedback helps us understand what needs improvement."}
                {moodRating === "neutral" && "Thanks for sharing. What could have made the experience more engaging?"}
                {moodRating === "satisfied" && "Glad you had a good time! Any particular features you enjoyed?"}
                {moodRating === "delighted" && "Wonderful! We love hearing about positive experiences. What made it special?"}
              </p>
            </div>
          )}
        </Card>

        {/* Voice/Text Feedback */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Tell us more</h2>
          
          <div className="space-y-4">
            {/* Voice Recording */}
            <div className="flex items-center gap-3">
              <Button
                onClick={toggleRecording}
                variant={isRecording ? "destructive" : "outline"}
                className="flex-shrink-0"
              >
                {isRecording ? (
                  <>
                    <Volume2 className="w-4 h-4 mr-2" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4 mr-2" />
                    Record Voice
                  </>
                )}
              </Button>
              <div className="flex-1">
                {isRecording ? (
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-muted-foreground">Recording...</span>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    Tap to record your voice feedback
                  </span>
                )}
              </div>
            </div>

            {/* Text Feedback */}
            <div>
              <Textarea
                placeholder="Or type your feedback here... What did you love? What could be better? Any specific stories or features you'd like to see?"
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>
          </div>
        </Card>

        {/* Quick Feedback Tags */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Quick feedback</h2>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
              Voice quality was great
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
              Stories were engaging
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
              Easy to use
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
              Found hidden gems
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
              Mood detection accurate
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
              More languages needed
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
              Offline mode helpful
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
              Navigation could improve
            </Badge>
          </div>
        </Card>

        {/* Submit */}
        <Card className="p-4">
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Your feedback is anonymous and helps us create better travel experiences for everyone.
              </p>
            </div>
            
            <Button 
              onClick={submitFeedback}
              className="w-full gradient-primary"
              disabled={!rating && !feedbackText && !moodRating}
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Feedback
            </Button>
          </div>
        </Card>

        {/* Thank you message */}
        <div className="text-center p-4">
          <p className="text-sm text-muted-foreground">
            Thank you for helping us improve CityMuse! 🎧✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default Feedback;