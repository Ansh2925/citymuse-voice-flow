import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { 
  Mic, 
  Globe, 
  Brain, 
  MapPin, 
  Volume2, 
  Smartphone,
  Users,
  Star,
  Play,
  ChevronRight
} from "lucide-react";

// Import mood images
import heroImage from "@/assets/hero-cityscape.jpg";
import moodHappy from "@/assets/mood-happy.jpg";
import moodCalm from "@/assets/mood-calm.jpg";
import moodAdventurous from "@/assets/mood-adventurous.jpg";
import moodCurious from "@/assets/mood-curious.jpg";

const Index = () => {
  const [currentMood, setCurrentMood] = useState(0);
  
  const moods = [
    {
      name: "Happy",
      image: moodHappy,
      description: "Discover vibrant markets, local celebrations, and joyful community spaces",
      color: "mood-happy",
      emoji: "😊"
    },
    {
      name: "Calm",
      image: moodCalm,
      description: "Find peaceful gardens, quiet cafes, and serene meditation spots",
      color: "mood-calm", 
      emoji: "😌"
    },
    {
      name: "Adventurous",
      image: moodAdventurous,
      description: "Explore hidden ruins, secret passages, and thrilling discoveries",
      color: "mood-adventurous",
      emoji: "🗺️"
    },
    {
      name: "Curious",
      image: moodCurious,
      description: "Visit museums, galleries, and cultural learning experiences",
      color: "mood-curious",
      emoji: "🤔"
    }
  ];

  const features = [
    {
      icon: Mic,
      title: "Voice-First Experience",
      description: "Natural conversations while walking, no screen dependency"
    },
    {
      icon: Brain,
      title: "Mood Detection",
      description: "AI understands your emotional state and adapts recommendations"
    },
    {
      icon: Globe,
      title: "Multilingual Stories",
      description: "Available in 50+ languages with real-time translation"
    },
    {
      icon: MapPin,
      title: "Hyperlocal Content",
      description: "Stories within 100 meters of your exact location"
    }
  ];

  // Auto-cycle through moods
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMood((prev) => (prev + 1) % moods.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [moods.length]);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Text */}
            <div className="text-center lg:text-left">
              <Badge variant="secondary" className="mb-4 px-4 py-2">
                🎧 Voice-Powered Travel Guide
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Turn every traveler into a{" "}
                <span className="gradient-primary bg-clip-text text-transparent">
                  local explorer
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-lg">
                Discover hidden stories, local secrets, and authentic experiences through 
                voice-powered AI that understands your mood and speaks your language.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" asChild className="gradient-primary shadow-warm">
                  <Link to="/voice">
                    <Mic className="w-5 h-5 mr-2" />
                    Try It Now
                  </Link>
                </Button>
                
                <Button size="lg" variant="outline" asChild>
                  <Link to="/about">
                    <Play className="w-5 h-5 mr-2" />
                    How It Works
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-warm">
                <img 
                  src={heroImage} 
                  alt="CityMuse travelers exploring with voice guides"
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
              </div>
              
              {/* Floating voice bubble */}
              <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-voice">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-voice-active rounded-full animate-pulse"></div>
                  <Mic className="w-5 h-5 text-voice-active" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mood-Based Illustrations */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Stories That Match Your Mood</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI detects how you're feeling and recommends experiences that perfectly 
              match your emotional state, creating deeper connections with every destination.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Mood Selector */}
            <div className="space-y-4">
              {moods.map((mood, index) => (
                <Card 
                  key={index}
                  className={`p-4 cursor-pointer transition-all duration-300 hover:shadow-warm ${
                    index === currentMood ? "border-primary shadow-glow" : ""
                  }`}
                  onClick={() => setCurrentMood(index)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full bg-${mood.color}`}></div>
                    <div className="flex-1">
                      <h3 className="font-semibold flex items-center gap-2">
                        {mood.name} {mood.emoji}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {mood.description}
                      </p>
                    </div>
                    <ChevronRight className={`w-5 h-5 transition-transform ${
                      index === currentMood ? "rotate-90 text-primary" : "text-muted-foreground"
                    }`} />
                  </div>
                </Card>
              ))}
            </div>
            
            {/* Mood Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-warm">
                <img 
                  src={moods[currentMood].image}
                  alt={`${moods[currentMood].name} mood illustration`}
                  className="w-full h-80 object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <Badge variant="secondary" className="mb-2">
                    {moods[currentMood].name} Experience
                  </Badge>
                  <p className="text-white text-sm font-medium">
                    {moods[currentMood].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose CityMuse?</h2>
            <p className="text-muted-foreground">
              Experience travel like never before with our innovative voice-first approach
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6 text-center hover:shadow-warm transition-smooth">
                  <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50K+</div>
              <p className="text-muted-foreground">Stories Shared</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">120+</div>
              <p className="text-muted-foreground">Cities Covered</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">4.9★</div>
              <p className="text-muted-foreground">User Rating</p>
            </div>
          </div>
          
          <Card className="p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-1 mb-4">
              {[1,2,3,4,5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <blockquote className="text-lg italic mb-4">
              "CityMuse completely changed how I explore cities. The voice stories feel like 
              having a local friend guide you through hidden gems you'd never find otherwise."
            </blockquote>
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                👩‍💼
              </div>
              <span className="font-medium">Sarah M., Travel Blogger</span>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 gradient-primary text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore Like a Local?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers discovering authentic experiences through voice-powered storytelling
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/voice">
                <Mic className="w-5 h-5 mr-2" />
                Start Exploring Now
              </Link>
            </Button>
            
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
              <Link to="/discover">
                <MapPin className="w-5 h-5 mr-2" />
                Browse Stories
              </Link>
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-6 mt-8 text-sm opacity-80">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              Mobile-First
            </div>
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4" />
              Voice-Powered
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Community-Driven
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border/50">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 gradient-primary rounded-lg flex items-center justify-center">
                <Mic className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold">CityMuse</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link to="/about" className="hover:text-foreground transition-smooth">About</Link>
              <Link to="/feedback" className="hover:text-foreground transition-smooth">Feedback</Link>
              <Link to="/settings" className="hover:text-foreground transition-smooth">Settings</Link>
            </div>
            
            <p className="text-sm text-muted-foreground">
              © 2024 CityMuse. Made with ❤️ for travelers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;