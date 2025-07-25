import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Map, Filter, Play, Clock, Globe, Heart, Star, Languages } from "lucide-react";

const CityDiscovery = () => {
  const [selectedMood, setSelectedMood] = useState("all");
  const [selectedTime, setSelectedTime] = useState("all");

  const stories = [
    {
      id: 1,
      title: "The Secret Garden Café",
      excerpt: "Hidden behind a bookstore, this rooftop café has been serving locals for 30 years...",
      mood: "calm",
      duration: "5 min",
      distance: "200m",
      rating: 4.8,
      language: "EN",
      audioUrl: "#"
    },
    {
      id: 2,
      title: "Underground Jazz History",
      excerpt: "Discover the speakeasy where famous musicians gathered in the 1920s...",
      mood: "curious",
      duration: "8 min",
      distance: "400m",
      rating: 4.9,
      language: "EN",
      audioUrl: "#"
    },
    {
      id: 3,
      title: "Street Art Revolution",
      excerpt: "Follow the trail of murals that sparked a neighborhood transformation...",
      mood: "adventurous",
      duration: "12 min",
      distance: "600m",
      rating: 4.7,
      language: "EN",
      audioUrl: "#"
    },
    {
      id: 4,
      title: "Local Market Tales",
      excerpt: "Meet the vendors who've been here for generations and taste authentic flavors...",
      mood: "happy",
      duration: "6 min",
      distance: "150m",
      rating: 4.9,
      language: "EN",
      audioUrl: "#"
    }
  ];

  const moods = [
    { value: "all", label: "All Moods", color: "bg-muted" },
    { value: "happy", label: "Happy", color: "bg-mood-happy" },
    { value: "calm", label: "Calm", color: "bg-mood-calm" },
    { value: "adventurous", label: "Adventurous", color: "bg-mood-adventurous" },
    { value: "curious", label: "Curious", color: "bg-mood-curious" },
  ];

  const filteredStories = stories.filter(story => 
    selectedMood === "all" || story.mood === selectedMood
  );

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <div className="p-4 border-b border-border/50">
        <h1 className="text-2xl font-bold text-center mb-4">Discover Your City</h1>
        
        {/* Search */}
        <div className="relative mb-4">
          <Input 
            placeholder="Search for stories, places, or experiences..."
            className="pl-4 pr-10"
          />
          <Button size="sm" className="absolute right-1 top-1 h-8">
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* Mood Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {moods.map((mood) => (
            <Button
              key={mood.value}
              variant={selectedMood === mood.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedMood(mood.value)}
              className="whitespace-nowrap"
            >
              <div className={`w-2 h-2 rounded-full ${mood.color} mr-2`}></div>
              {mood.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Map Preview */}
      <div className="p-4">
        <Card className="h-48 flex items-center justify-center bg-sage-light/20">
          <div className="text-center">
            <Map className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Interactive map would load here</p>
            <p className="text-xs text-muted-foreground mt-1">OpenStreetMap integration</p>
          </div>
        </Card>
      </div>

      {/* Stories */}
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Nearby Stories</h2>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Globe className="w-3 h-3" />
            English
          </Badge>
        </div>

        {filteredStories.map((story) => (
          <Card key={story.id} className="p-4 transition-smooth hover:shadow-warm">
            <div className="flex items-start gap-3">
              <Button size="sm" className="gradient-primary mt-1">
                <Play className="w-4 h-4" />
              </Button>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-sm">{story.title}</h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    {story.rating}
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {story.excerpt}
                </p>
                
                <div className="flex items-center gap-3 text-xs">
                  <Badge variant="outline" className="text-xs">
                    <div className={`w-2 h-2 rounded-full bg-mood-${story.mood} mr-1`}></div>
                    {story.mood}
                  </Badge>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {story.duration}
                  </div>
                  <div className="text-muted-foreground">
                    📍 {story.distance}
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Globe className="w-3 h-3" />
                    {story.language}
                  </div>
                </div>
              </div>
              
              <Button variant="ghost" size="sm">
                <Heart className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Language Toggle */}
      <div className="p-4">
        <Button variant="outline" className="w-full">
          <Languages className="w-4 h-4 mr-2" />
          Switch Language (Google Translate Mock)
        </Button>
      </div>
    </div>
  );
};

export default CityDiscovery;