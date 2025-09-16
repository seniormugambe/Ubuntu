import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  MapPin, 
  Send, 
  Sparkles, 
  Languages, 
  Lightbulb,
  Wand2,
  Globe,
  Mic
} from "lucide-react";
import { toast } from "sonner";

const AIPostCreator = ({ onPost }: { onPost: (post: any) => void }) => {
  const [content, setContent] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const [location, setLocation] = useState("");
  const [isAIGenerating, setIsAIGenerating] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);

  const moods = [
    { emoji: "😊", label: "Happy" },
    { emoji: "🚀", label: "Excited" },
    { emoji: "💪", label: "Motivated" },
    { emoji: "🤔", label: "Thoughtful" },
    { emoji: "❤️", label: "Grateful" },
  ];

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "lg", name: "Luganda", flag: "🇺🇬" },
    { code: "sw", name: "Kiswahili", flag: "🇹🇿" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
  ];

  const aiPrompts = [
    "Share a community success story",
    "Discuss African innovation",
    "Talk about Ubuntu philosophy",
    "Share cultural traditions",
    "Discuss tech education",
    "Community building ideas"
  ];

  const handleAIGenerate = async () => {
    setIsAIGenerating(true);
    
    // Simulate AI content generation
    setTimeout(() => {
      const aiContent = [
        "Just witnessed the most beautiful example of Ubuntu philosophy in action today. Our neighbor's shop was struggling, so the entire community came together to support them. This is what 'I am because we are' truly means! 🌍✨",
        "Excited to share that our local coding bootcamp just graduated 50 new developers! Teaching programming in Luganda has made tech education so much more accessible. The future of African tech is bright! 💻🚀",
        "Reflecting on the wisdom of our elders today. As my grandmother always said, 'Akili ni mali' - intelligence is wealth. Let's invest in knowledge and lift each other up! 📚💡"
      ];
      
      const randomContent = aiContent[Math.floor(Math.random() * aiContent.length)];
      setContent(randomContent);
      setIsAIGenerating(false);
      
      toast.success("AI content generated! ✨", {
        description: "Feel free to edit and personalize it"
      });
    }, 2000);
  };

  const handleTranslate = async () => {
    if (!content.trim()) return;
    
    setIsTranslating(true);
    
    // Simulate AI translation
    setTimeout(() => {
      const translations = {
        lg: "Nkwagala nnyo Ubuntu Social! Ekibiina kino kya mazima kya kiseera kino.",
        sw: "Napenda sana Ubuntu Social! Jamii hii ni ya kweli ya wakati huu.",
        fr: "J'adore Ubuntu Social! Cette communauté est vraiment de notre époque."
      };
      
      if (selectedLanguage !== "en" && translations[selectedLanguage as keyof typeof translations]) {
        setContent(translations[selectedLanguage as keyof typeof translations]);
        toast.success(`Translated to ${languages.find(l => l.code === selectedLanguage)?.name}! 🌍`);
      }
      
      setIsTranslating(false);
    }, 1500);
  };

  const handleSmartSuggestions = () => {
    const suggestions = [
      "Add relevant hashtags like #Ubuntu #Community #Africa",
      "Consider mentioning your location to connect with local community",
      "Share what inspired this thought to engage your audience",
      "Add an emoji to make your post more expressive"
    ];
    
    setAiSuggestions(suggestions.slice(0, 2));
    toast.info("AI suggestions added! 🤖");
  };

  const handlePost = () => {
    if (!content.trim()) return;

    const newPost = {
      id: Date.now(),
      content,
      mood: selectedMood,
      location,
      timestamp: new Date(),
      author: "You",
      likes: 0,
      comments: 0,
      shares: 0,
      aiGenerated: isAIGenerating,
      language: selectedLanguage
    };

    onPost(newPost);
    setContent("");
    setSelectedMood("");
    setLocation("");
    setAiSuggestions([]);

    toast.success("Ubuntu shared! 🌍", {
      description: "Your AI-enhanced voice strengthens our community"
    });
  };

  return (
    <Card className="p-4 border-primary/10 bg-gradient-to-br from-blue-50/30 to-purple-50/30">
      <div className="flex space-x-3">
        <Avatar>
          <AvatarFallback className="bg-gradient-ubuntu text-white">
            YU
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-3">
          {/* AI Header */}
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs bg-gradient-to-r from-blue-100 to-purple-100">
              <Sparkles className="h-3 w-3 mr-1" />
              AI-Powered
            </Badge>
            
            <div className="flex items-center space-x-1">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="text-xs bg-transparent border border-muted rounded px-2 py-1"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Textarea
            placeholder="What's on your mind? Let AI help you express it better..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[80px] resize-none border-muted-foreground/20 focus:border-primary"
          />

          {/* AI Suggestions */}
          {aiSuggestions.length > 0 && (
            <div className="bg-blue-50 rounded-lg p-3 space-y-2">
              <div className="flex items-center space-x-2">
                <Lightbulb className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">AI Suggestions</span>
              </div>
              {aiSuggestions.map((suggestion, index) => (
                <div key={index} className="text-xs text-blue-700 bg-white rounded px-2 py-1">
                  {suggestion}
                </div>
              ))}
            </div>
          )}

          {/* AI Quick Prompts */}
          <div className="flex flex-wrap gap-1">
            {aiPrompts.slice(0, 3).map((prompt, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={() => setContent(content + " " + prompt)}
                className="text-xs h-6 px-2 text-blue-600 hover:bg-blue-50"
              >
                {prompt}
              </Button>
            ))}
          </div>

          {/* Mood and Location */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Feeling:</span>
            <div className="flex space-x-1">
              {moods.slice(0, 3).map((mood) => (
                <Button
                  key={mood.label}
                  variant={selectedMood === mood.label ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedMood(selectedMood === mood.label ? "" : mood.label)}
                  className="h-8 px-2"
                >
                  {mood.emoji}
                </Button>
              ))}
            </div>
          </div>

          {/* AI Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleAIGenerate}
                disabled={isAIGenerating}
                className="text-purple-600 hover:bg-purple-50 h-8 px-2"
              >
                <Wand2 className={`h-4 w-4 ${isAIGenerating ? 'animate-spin' : ''}`} />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleTranslate}
                disabled={isTranslating || !content.trim()}
                className="text-green-600 hover:bg-green-50 h-8 px-2"
              >
                <Languages className={`h-4 w-4 ${isTranslating ? 'animate-pulse' : ''}`} />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSmartSuggestions}
                className="text-blue-600 hover:bg-blue-50 h-8 px-2"
              >
                <Lightbulb className="h-4 w-4" />
              </Button>
              
              <Button variant="ghost" size="sm" className="text-muted-foreground h-8 px-2">
                <Camera className="h-4 w-4" />
              </Button>
              
              <Button variant="ghost" size="sm" className="text-muted-foreground h-8 px-2">
                <Mic className="h-4 w-4" />
              </Button>
            </div>

            <Button
              onClick={handlePost}
              disabled={!content.trim()}
              variant="ubuntu"
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Send className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>

          {/* AI Status */}
          {(isAIGenerating || isTranslating) && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span>
                {isAIGenerating ? "AI is crafting your message..." : "Translating with AI..."}
              </span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default AIPostCreator;