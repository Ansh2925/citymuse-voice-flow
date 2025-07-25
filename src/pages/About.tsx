import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mic, Globe, Brain, MapPin, Code, Heart } from "lucide-react";

const About = () => {
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "Lead UX Designer",
      bio: "Former Google Designer passionate about voice interfaces and cultural storytelling",
      image: "👩‍💻"
    },
    {
      name: "Marcus Rodriguez",
      role: "AI Engineer",
      bio: "Specialist in sentiment analysis and multilingual NLP systems",
      image: "👨‍🔬"
    },
    {
      name: "Amira Hassan",
      role: "Cultural Researcher",
      bio: "Anthropologist and local story curator with 10+ years in travel industry",
      image: "👩‍🎓"
    },
    {
      name: "David Kim",
      role: "Full-Stack Developer",
      bio: "Previously at Spotify, expert in audio streaming and geolocation services",
      image: "👨‍💻"
    }
  ];

  const techStack = [
    { name: "Flask", description: "Python web framework for API development", icon: "🐍" },
    { name: "OpenAI", description: "GPT models for conversational AI", icon: "🤖" },
    { name: "TextBlob", description: "Sentiment analysis and mood detection", icon: "📊" },
    { name: "Web Speech API", description: "Browser-native voice recognition", icon: "🎤" },
    { name: "Google Translate", description: "Real-time multilingual support", icon: "🌐" },
    { name: "OpenStreetMap", description: "Open-source mapping and geolocation", icon: "🗺️" }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <div className="p-6 text-center">
        <div className="mb-6">
          <Mic className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h1 className="text-3xl font-bold mb-4">About CityMuse</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We believe every traveler deserves to experience a city like a local. 
            CityMuse uses voice AI and mood detection to create personalized, 
            hyperlocal stories that transform any journey into an authentic adventure.
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="p-6">
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            Our Mission
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Traditional travel guides show you the same tourist spots as everyone else. 
            We're building something different - a voice-first platform that understands 
            your mood, speaks your language, and connects you with the hidden stories 
            that make each neighborhood unique. Every interaction is designed to turn 
            visitors into temporary locals.
          </p>
        </Card>

        {/* Features */}
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">What Makes Us Different</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Mic className="w-5 h-5 text-primary mt-1" />
              <div>
                <h3 className="font-medium">Voice-First Experience</h3>
                <p className="text-sm text-muted-foreground">Natural conversations while walking, no screen dependency</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-primary mt-1" />
              <div>
                <h3 className="font-medium">Mood Detection</h3>
                <p className="text-sm text-muted-foreground">AI understands your emotional state and adapts recommendations</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-primary mt-1" />
              <div>
                <h3 className="font-medium">Multilingual</h3>
                <p className="text-sm text-muted-foreground">Stories available in your preferred language instantly</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-1" />
              <div>
                <h3 className="font-medium">Hyperlocal</h3>
                <p className="text-sm text-muted-foreground">Stories within 100 meters of your exact location</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Team */}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {teamMembers.map((member, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-start gap-3">
                <div className="text-3xl">{member.image}</div>
                <div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <Badge variant="secondary" className="text-xs mb-2">{member.role}</Badge>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="p-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Code className="w-5 h-5 text-primary" />
            Technology Stack
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {techStack.map((tech, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-2xl">{tech.icon}</span>
                <div>
                  <h3 className="font-medium">{tech.name}</h3>
                  <p className="text-sm text-muted-foreground">{tech.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* CTA */}
      <div className="p-6 text-center">
        <Button size="lg" className="gradient-primary">
          <Mic className="w-5 h-5 mr-2" />
          Try CityMuse Now
        </Button>
      </div>
    </div>
  );
};

export default About;