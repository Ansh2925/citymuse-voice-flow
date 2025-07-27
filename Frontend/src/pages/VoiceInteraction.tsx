import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Mic, 
  MicOff, 
  Volume2, 
  RotateCcw, 
  Languages, 
  Heart,
  Loader2 
} from "lucide-react";
import { toast } from "sonner";

interface Mood {
  color: string;
  label: string;
  emoji: string;
}

interface Message {
  type: "user" | "assistant";
  text: string;
  timestamp?: Date;
}

const VoiceInteraction = () => {
  // Core states
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentMood, setCurrentMood] = useState("happy");
  const [currentLanguage, setCurrentLanguage] = useState("English");
  
  // Conversation state
  const [conversation, setConversation] = useState<Message[]>([
    { 
      type: "assistant", 
      text: "Hello! I detected you're feeling adventurous today. What would you like to discover in this area?",
      timestamp: new Date()
    },
  ]);

  const moods: Record<string, Mood> = {
    happy: { color: "mood-happy", label: "Happy", emoji: "😊" },
    calm: { color: "mood-calm", label: "Calm", emoji: "😌" },
    adventurous: { color: "mood-adventurous", label: "Adventurous", emoji: "🗺️" },
    curious: { color: "mood-curious", label: "Curious", emoji: "🤔" },
  };

  const toggleListening = useCallback(async () => {
    try {
      setIsListening(!isListening);
      
      if (!isListening) {
        // Start listening
        setIsProcessing(true);
        
        // Request microphone permission
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        // Simulate voice input after 2 seconds
        setTimeout(() => {
          setConversation(prev => [
            ...prev,
            { 
              type: "user", 
              text: "Tell me about hidden cafes nearby",
              timestamp: new Date()
            },
            { 
              type: "assistant", 
              text: "I found 3 charming local cafes! There's a hidden rooftop cafe just 200m away that locals love for sunset views. Would you like me to guide you there?",
              timestamp: new Date()
            }
          ]);
          setIsListening(false);
          setIsProcessing(false);
          
          // Clean up audio stream
          stream.getTracks().forEach(track => track.stop());
        }, 2000);
      } else {
        // Stop listening
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Voice interaction error:', error);
      toast.error('Could not access microphone. Please check your permissions.');
      setIsListening(false);
      setIsProcessing(false);
    }
  }, [isListening]);

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full bg-${moods[currentMood as keyof typeof moods].color}`}></div>
          <span className="text-sm font-medium">{moods[currentMood as keyof typeof moods].label} {moods[currentMood as keyof typeof moods].emoji}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Languages className="w-4 h-4" />
          {currentLanguage}
        </div>
      </div>

      {/* Voice Visualization */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="mb-8">
          <div className="flex items-center justify-center gap-1 h-20">
            {isListening && (
              <div className="flex items-center gap-1">
                {[8, 12, 6, 16, 10].map((height, index) => (
                  <div
                    key={index}
                    className={`w-1 bg-voice-active rounded-full voice-wave transition-all duration-300`}
                    style={{ height: `${height * 4}px` }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Voice Button */}
        <Button
          onClick={toggleListening}
          size="lg"
          disabled={isProcessing && !isListening}
          className={`w-24 h-24 rounded-full transition-all duration-300 relative ${
            isListening 
              ? "bg-voice-active hover:bg-voice-active/90 shadow-voice scale-110" 
              : "gradient-primary hover:scale-105 shadow-warm"
          }`}
        >
          {isProcessing ? (
            <Loader2 className="w-8 h-8 animate-spin" />
          ) : isListening ? (
            <MicOff className="w-8 h-8" />
          ) : (
            <Mic className="w-8 h-8" />
          )}
          
          {/* Ripple effect when listening */}
          {isListening && (
            <div className="absolute inset-0 rounded-full">
              <div className="absolute inset-0 rounded-full animate-ping bg-voice-active/30" />
            </div>
          )}
        </Button>

        <p className="mt-4 text-center text-muted-foreground">
          {isProcessing 
            ? "Processing..." 
            : isListening 
              ? "Listening..." 
              : "Tap to speak"}
        </p>
      </div>

      {/* Conversation */}
      <div className="p-4 space-y-4 max-h-[calc(100vh-24rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
        {conversation.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <Card 
              className={`max-w-xs md:max-w-sm p-3 shadow-sm ${
                message.type === "user" 
                  ? "bg-primary text-primary-foreground ml-12" 
                  : "bg-card mr-12"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.text}</p>
              {message.timestamp && (
                <p className="text-xs mt-1 opacity-60">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit'
                  })}
                </p>
              )}
            </Card>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="p-4 flex flex-wrap justify-center gap-3">
        <Button 
          variant="outline" 
          size="sm"
          disabled={isProcessing || conversation.length < 2}
          onClick={() => {
            // Implement replay functionality
            toast.info("Replaying last message...");
          }}
        >
          <RotateCcw className={`w-4 h-4 mr-2 ${isProcessing ? 'animate-spin' : ''}`} />
          Replay
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => {
            const nextLang = currentLanguage === "English" ? "Español" : "English";
            setCurrentLanguage(nextLang);
            toast.success(`Switched to ${nextLang}`);
          }}
        >
          <Languages className="w-4 h-4 mr-2" />
          {currentLanguage}
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => {
            const nextMood = currentMood === "happy" ? "calm" : "happy";
            setCurrentMood(nextMood);
            toast.success(`Mood updated to ${moods[nextMood].label} ${moods[nextMood].emoji}`);
          }}
        >
          <Heart className="w-4 h-4 mr-2" />
          {moods[currentMood].emoji}
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => {
            // Implement text-to-speech
            toast.info("Playing audio response...");
          }}
        >
          <Volume2 className="w-4 h-4 mr-2" />
          Audio
        </Button>
      </div>
    </div>
  );
};

export default VoiceInteraction;