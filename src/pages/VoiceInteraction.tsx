import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, Volume2, RotateCcw, Languages, Heart } from "lucide-react";

const VoiceInteraction = () => {
  const [isListening, setIsListening] = useState(false);
  const [currentMood, setCurrentMood] = useState("happy");
  const [currentLanguage, setCurrentLanguage] = useState("English");
  const [conversation, setConversation] = useState([
    { type: "assistant", text: "Hello! I detected you're feeling adventurous today. What would you like to discover in this area?" },
  ]);

  const moods = {
    happy: { color: "mood-happy", label: "Happy", emoji: "😊" },
    calm: { color: "mood-calm", label: "Calm", emoji: "😌" },
    adventurous: { color: "mood-adventurous", label: "Adventurous", emoji: "🗺️" },
    curious: { color: "mood-curious", label: "Curious", emoji: "🤔" },
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate voice input after 2 seconds
      setTimeout(() => {
        setConversation(prev => [...prev, 
          { type: "user", text: "Tell me about hidden cafes nearby" },
          { type: "assistant", text: "I found 3 charming local cafes! There's a hidden rooftop cafe just 200m away that locals love for sunset views. Would you like me to guide you there?" }
        ]);
        setIsListening(false);
      }, 2000);
    }
  };

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
              <>
                <div className="w-1 bg-voice-active rounded-full voice-wave h-8"></div>
                <div className="w-1 bg-voice-active rounded-full voice-wave h-12"></div>
                <div className="w-1 bg-voice-active rounded-full voice-wave h-6"></div>
                <div className="w-1 bg-voice-active rounded-full voice-wave h-16"></div>
                <div className="w-1 bg-voice-active rounded-full voice-wave h-10"></div>
              </>
            )}
          </div>
        </div>

        {/* Main Voice Button */}
        <Button
          onClick={toggleListening}
          size="lg"
          className={`w-24 h-24 rounded-full transition-all duration-300 ${
            isListening 
              ? "bg-voice-active hover:bg-voice-active/90 shadow-voice scale-110" 
              : "gradient-primary hover:scale-105 shadow-warm"
          }`}
        >
          {isListening ? (
            <MicOff className="w-8 h-8" />
          ) : (
            <Mic className="w-8 h-8" />
          )}
        </Button>

        <p className="mt-4 text-center text-muted-foreground">
          {isListening ? "Listening..." : "Tap to speak"}
        </p>
      </div>

      {/* Conversation */}
      <div className="p-4 space-y-4 max-h-64 overflow-y-auto">
        {conversation.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <Card className={`max-w-xs p-3 ${
              message.type === "user" 
                ? "bg-primary text-primary-foreground ml-12" 
                : "bg-card mr-12"
            }`}>
              <p className="text-sm">{message.text}</p>
            </Card>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="p-4 flex justify-center gap-4">
        <Button variant="outline" size="sm">
          <RotateCcw className="w-4 h-4 mr-2" />
          Replay
        </Button>
        <Button variant="outline" size="sm">
          <Languages className="w-4 h-4 mr-2" />
          Translate
        </Button>
        <Button variant="outline" size="sm" onClick={() => setCurrentMood(currentMood === "happy" ? "calm" : "happy")}>
          <Heart className="w-4 h-4 mr-2" />
          Change Mood
        </Button>
        <Button variant="outline" size="sm">
          <Volume2 className="w-4 h-4 mr-2" />
          Audio
        </Button>
      </div>
    </div>
  );
};

export default VoiceInteraction;