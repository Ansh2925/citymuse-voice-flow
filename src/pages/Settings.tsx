import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { 
  Settings as SettingsIcon, 
  Mic, 
  Volume2, 
  Globe, 
  Brain, 
  Accessibility, 
  Moon, 
  Type,
  Eye
} from "lucide-react";

const Settings = () => {
  const [voiceInput, setVoiceInput] = useState(true);
  const [voiceOutput, setVoiceOutput] = useState(true);
  const [moodDetection, setMoodDetection] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState([16]);
  const [volume, setVolume] = useState([75]);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
    { code: "pt", name: "Português", flag: "🇵🇹" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
    { code: "ko", name: "한국어", flag: "🇰🇷" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
    { code: "ar", name: "العربية", flag: "🇸🇦" }
  ];

  const testMood = () => {
    // Simulate mood detection test
    const moods = ["happy", "calm", "adventurous", "curious"];
    const randomMood = moods[Math.floor(Math.random() * moods.length)];
    alert(`Mood detected: ${randomMood} 😊`);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <div className="p-6 text-center border-b border-border/50">
        <SettingsIcon className="w-12 h-12 mx-auto mb-3 text-primary" />
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Customize your CityMuse experience</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Voice Settings */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Mic className="w-5 h-5 text-primary" />
            Voice Settings
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Voice Input</h3>
                <p className="text-sm text-muted-foreground">Enable microphone for voice commands</p>
              </div>
              <Switch checked={voiceInput} onCheckedChange={setVoiceInput} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Voice Output</h3>
                <p className="text-sm text-muted-foreground">Hear stories and responses spoken aloud</p>
              </div>
              <Switch checked={voiceOutput} onCheckedChange={setVoiceOutput} />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Volume</h3>
                <span className="text-sm text-muted-foreground">{volume[0]}%</span>
              </div>
              <Slider
                value={volume}
                onValueChange={setVolume}
                max={100}
                step={5}
                className="w-full"
              />
            </div>
          </div>
        </Card>

        {/* Language Settings */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            Language & Translation
          </h2>
          
          <div className="space-y-3">
            <h3 className="font-medium">Preferred Language</h3>
            <div className="grid grid-cols-2 gap-2">
              {languages.slice(0, 6).map((lang) => (
                <Button
                  key={lang.code}
                  variant={selectedLanguage === lang.code ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLanguage(lang.code)}
                  className="justify-start"
                >
                  <span className="mr-2">{lang.flag}</span>
                  {lang.name}
                </Button>
              ))}
            </div>
            <Button variant="outline" size="sm" className="w-full">
              View All Languages ({languages.length} available)
            </Button>
          </div>
        </Card>

        {/* Mood Detection */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            Mood Detection
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Enable Mood Detection</h3>
                <p className="text-sm text-muted-foreground">AI analyzes your voice tone for personalized recommendations</p>
              </div>
              <Switch checked={moodDetection} onCheckedChange={setMoodDetection} />
            </div>
            
            {moodDetection && (
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-sm mb-3">Test your current mood detection:</p>
                <Button onClick={testMood} size="sm" className="w-full">
                  Test Mood Detection
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* Accessibility */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Accessibility className="w-5 h-5 text-primary" />
            Accessibility
          </h2>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium flex items-center gap-2">
                  <Type className="w-4 h-4" />
                  Font Size
                </h3>
                <span className="text-sm text-muted-foreground">{fontSize[0]}px</span>
              </div>
              <Slider
                value={fontSize}
                onValueChange={setFontSize}
                min={12}
                max={24}
                step={1}
                className="w-full"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  High Contrast Mode
                </h3>
                <p className="text-sm text-muted-foreground">Increase text and border contrast</p>
              </div>
              <Switch />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Screen Reader Support</h3>
                <p className="text-sm text-muted-foreground">Enhanced navigation for screen readers</p>
              </div>
              <Switch />
            </div>
          </div>
        </Card>

        {/* App Preferences */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">App Preferences</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium flex items-center gap-2">
                  <Moon className="w-4 h-4" />
                  Dark Mode
                </h3>
                <p className="text-sm text-muted-foreground">Switch to dark theme</p>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Auto-download Stories</h3>
                <p className="text-sm text-muted-foreground">Download nearby stories for offline use</p>
              </div>
              <Switch />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Location Services</h3>
                <p className="text-sm text-muted-foreground">Allow location access for better recommendations</p>
              </div>
              <Badge variant="secondary">Required</Badge>
            </div>
          </div>
        </Card>

        {/* Reset */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Reset & Data</h2>
          <div className="space-y-3">
            <Button variant="outline" className="w-full">
              Clear Downloaded Stories
            </Button>
            <Button variant="outline" className="w-full">
              Reset All Settings
            </Button>
            <Button variant="destructive" className="w-full">
              Delete All Data
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;