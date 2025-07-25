import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WifiOff, Download, BookOpen, Heart, MapPin, Clock } from "lucide-react";

const OfflineMode = () => {
  const offlineStories = [
    {
      title: "Historic Downtown Walking Tour",
      description: "A 45-minute audio guide through the city's founding neighborhoods",
      duration: "45 min",
      size: "12 MB",
      mood: "curious",
      downloaded: true
    },
    {
      title: "Local Food Market Guide",
      description: "Discover authentic flavors and vendor stories at the central market",
      duration: "25 min", 
      size: "8 MB",
      mood: "happy",
      downloaded: false
    },
    {
      title: "Hidden Parks & Gardens",
      description: "Peaceful spots away from tourist crowds for quiet reflection",
      duration: "30 min",
      size: "10 MB",
      mood: "calm",
      downloaded: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <div className="p-6 text-center">
        <WifiOff className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
        <h1 className="text-2xl font-bold mb-2">You're Offline</h1>
        <p className="text-muted-foreground">
          No worries! You can still explore with downloaded stories or use our offline mood journal.
        </p>
      </div>

      {/* Offline Features */}
      <div className="p-6 space-y-4">
        {/* Downloaded Stories */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Download className="w-5 h-5 text-primary" />
            Downloaded Stories
          </h2>
          {offlineStories
            .filter(story => story.downloaded)
            .map((story, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <h3 className="font-medium text-sm">{story.title}</h3>
                  <p className="text-xs text-muted-foreground">{story.description}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <Badge variant="outline" className="text-xs">
                      <div className={`w-2 h-2 rounded-full bg-mood-${story.mood} mr-1`}></div>
                      {story.mood}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {story.duration}
                    </span>
                  </div>
                </div>
                <Button size="sm">Play</Button>
              </div>
            ))}
        </Card>

        {/* Available Downloads */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-3">Available for Download</h2>
          <p className="text-sm text-muted-foreground mb-3">
            Download these stories while connected to enjoy them offline later.
          </p>
          {offlineStories
            .filter(story => !story.downloaded)
            .map((story, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg mb-2">
                <div>
                  <h3 className="font-medium text-sm">{story.title}</h3>
                  <p className="text-xs text-muted-foreground mb-1">{story.description}</p>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs">
                      <div className={`w-2 h-2 rounded-full bg-mood-${story.mood} mr-1`}></div>
                      {story.mood}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{story.size}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" disabled>
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              </div>
            ))}
          <p className="text-xs text-muted-foreground text-center mt-3">
            Connect to WiFi to download more stories
          </p>
        </Card>

        {/* Offline Mood Journal */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            Offline Mood Journal
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Track how different places make you feel. Your entries will sync when you're back online.
          </p>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Current location: Downtown Park</span>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-2">How do you feel here?</p>
              <div className="flex gap-2 flex-wrap">
                <Button variant="outline" size="sm">😊 Happy</Button>
                <Button variant="outline" size="sm">😌 Calm</Button>
                <Button variant="outline" size="sm">🗺️ Adventurous</Button>
                <Button variant="outline" size="sm">🤔 Curious</Button>
              </div>
            </div>
            
            <Button className="w-full mt-3">
              <BookOpen className="w-4 h-4 mr-2" />
              Add Journal Entry
            </Button>
          </div>
        </Card>

        {/* Connection Status */}
        <Card className="p-4 text-center bg-muted/30">
          <WifiOff className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Checking for connection...
          </p>
          <Button variant="outline" size="sm" className="mt-2">
            Retry Connection
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default OfflineMode;