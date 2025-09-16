import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  BookOpen, 
  Heart, 
  Share2, 
  Volume2, 
  VolumeX, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  Brain,
  Languages,
  Wand2,
  MessageSquare
} from "lucide-react";
import { toast } from "sonner";

interface AIStory {
  id: number;
  title: string;
  content: string;
  moral: string;
  origin: string;
  category: "folktale" | "proverb" | "legend" | "wisdom";
  narrator: string;
  audioAvailable: boolean;
  likes: number;
  language: string;
  aiGenerated: boolean;
  personalizedFor: string[];
  culturalContext: string;
  modernApplication: string;
}

const AIAfricanStories = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isGeneratingStory, setIsGeneratingStory] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [personalizedStories, setPersonalizedStories] = useState<AIStory[]>([]);

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "lg", name: "Luganda", flag: "🇺🇬" },
    { code: "sw", name: "Kiswahili", flag: "🇹🇿" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
  ];

  const aiStories: AIStory[] = [
    {
      id: 1,
      title: "The Digital Baobab Tree",
      content: "In a village where the ancient baobab tree stood for centuries, the elders worried that young people were forgetting their roots as they spent time on their phones. But wise grandmother Nakato had an idea. She created a digital archive of stories, songs, and wisdom, storing them like seeds in the cloud. Soon, the youth were sharing these treasures globally, and the baobab's wisdom spread further than its branches ever could.",
      moral: "Technology can preserve and amplify our cultural heritage when used wisely.",
      origin: "AI-Generated (Inspired by Ugandan traditions)",
      category: "wisdom",
      narrator: "AI Storyteller",
      audioAvailable: true,
      likes: 342,
      language: "English",
      aiGenerated: true,
      personalizedFor: ["tech enthusiasts", "cultural preservationists"],
      culturalContext: "Combines traditional African wisdom with modern technology themes",
      modernApplication: "Relevant for digital preservation of cultural heritage"
    },
    {
      id: 2,
      title: "The Ubuntu Algorithm",
      content: "A brilliant programmer from Kampala created an AI system that could solve any problem. But the AI kept giving the same answer to every question: 'Ask your community.' Frustrated, the programmer realized the AI had learned the most important lesson - that true intelligence comes not from individual brilliance, but from collective wisdom. Ubuntu w'omuntu ku bantu - I am because we are.",
      moral: "The greatest intelligence is knowing when to seek help from others.",
      origin: "AI-Generated (Ubuntu Philosophy)",
      category: "wisdom",
      narrator: "AI Storyteller",
      audioAvailable: true,
      likes: 567,
      language: "English",
      aiGenerated: true,
      personalizedFor: ["programmers", "community builders"],
      culturalContext: "Modern interpretation of Ubuntu philosophy in tech context",
      modernApplication: "Relevant for collaborative AI development and community-driven solutions"
    },
    {
      id: 3,
      title: "Akili na Teknolojia",
      content: "Kijana mmoja alipata simu ya kisasa lakini hakujua jinsi ya kuitumia. Bibi yake alimwambia, 'Akili ni mali, lakini hekima ni utajiri.' Kijana akaanza kutumia simu kusoma vitabu, kujifunza lugha mpya, na kuwasiliana na wazee wa kijiji. Simu ikawa chombo cha maarifa, si cha mchezo tu.",
      moral: "Technology becomes valuable when combined with wisdom and purpose.",
      origin: "AI-Generated (Swahili Wisdom)",
      category: "proverb",
      narrator: "AI Storyteller",
      audioAvailable: true,
      likes: 234,
      language: "Kiswahili",
      aiGenerated: true,
      personalizedFor: ["Swahili speakers", "tech learners"],
      culturalContext: "Traditional Swahili wisdom applied to modern technology adoption",
      modernApplication: "Guidance for meaningful technology use in African communities"
    }
  ];

  useEffect(() => {
    setPersonalizedStories(aiStories);
  }, []);

  const currentStoryData = personalizedStories[currentStory] || aiStories[0];

  const generatePersonalizedStory = async () => {
    setIsGeneratingStory(true);
    
    // Simulate AI story generation
    setTimeout(() => {
      const newStory: AIStory = {
        id: Date.now(),
        title: "The Connected Village",
        content: "A small village got internet for the first time. Instead of dividing the community, the village chief used it to connect with other villages, sharing farming techniques, cultural practices, and solving problems together. The internet became like the village square - a place where Ubuntu spirit could flourish across distances.",
        moral: "Technology should bring communities together, not apart.",
        origin: "AI-Generated (Personalized for you)",
        category: "wisdom",
        narrator: "AI Storyteller",
        audioAvailable: true,
        likes: 0,
        language: selectedLanguage,
        aiGenerated: true,
        personalizedFor: ["community builders", "tech enthusiasts"],
        culturalContext: "Modern community building with traditional values",
        modernApplication: "Relevant for digital community platforms and social networks"
      };
      
      setPersonalizedStories(prev => [newStory, ...prev]);
      setCurrentStory(0);
      setIsGeneratingStory(false);
      
      toast.success("AI generated a personalized story! ✨", {
        description: "Based on your interests and community values"
      });
    }, 3000);
  };

  const translateStory = async () => {
    if (selectedLanguage === currentStoryData.language.toLowerCase()) return;
    
    toast.info("AI is translating the story...", {
      description: `Translating to ${languages.find(l => l.code === selectedLanguage)?.name}`
    });
    
    // Simulate translation
    setTimeout(() => {
      toast.success("Story translated! 🌍", {
        description: "AI preserved cultural nuances in translation"
      });
    }, 2000);
  };

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % personalizedStories.length);
    setLiked(false);
    setIsPlaying(false);
  };

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + personalizedStories.length) % personalizedStories.length);
    setLiked(false);
    setIsPlaying(false);
  };

  const handleLike = () => {
    setLiked(!liked);
    if (!liked) {
      toast.success("Story loved! ❤️", {
        description: "AI will recommend similar stories"
      });
    }
  };

  const handleShare = () => {
    const text = `"${currentStoryData.title}" - ${currentStoryData.moral}\n\nAI-powered African wisdom on Ubuntu Social! 🤖🌍`;
    
    if (navigator.share) {
      navigator.share({
        title: currentStoryData.title,
        text: text,
      });
    } else {
      navigator.clipboard.writeText(text);
      toast.success("AI story shared!");
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      folktale: "bg-primary/10 text-primary border-primary/20",
      proverb: "bg-heritage/10 text-heritage border-heritage/20",
      legend: "bg-accent/10 text-accent border-accent/20",
      wisdom: "bg-blue-100 text-blue-700 border-blue-200"
    };
    return colors[category as keyof typeof colors] || colors.folktale;
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-amber-50 via-blue-50 to-purple-50 border-blue-200/50">
      <div className="space-y-6">
        {/* AI Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-amber-600" />
              <Brain className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground">AI African Stories</h3>
              <p className="text-sm text-muted-foreground">Personalized wisdom & tales</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getCategoryColor(currentStoryData.category)}>
              {currentStoryData.category}
            </Badge>
            {currentStoryData.aiGenerated && (
              <Badge variant="outline" className="text-xs bg-gradient-to-r from-blue-100 to-purple-100">
                <Sparkles className="h-3 w-3 mr-1" />
                AI
              </Badge>
            )}
          </div>
        </div>

        {/* AI Controls */}
        <div className="flex items-center justify-between bg-white/70 rounded-lg p-3">
          <div className="flex items-center space-x-2">
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
            
            <Button
              variant="ghost"
              size="sm"
              onClick={translateStory}
              className="text-green-600 hover:bg-green-50 h-7 px-2"
            >
              <Languages className="h-3 w-3" />
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={generatePersonalizedStory}
            disabled={isGeneratingStory}
            className="text-purple-600 hover:bg-purple-50 h-7 px-2"
          >
            <Wand2 className={`h-3 w-3 mr-1 ${isGeneratingStory ? 'animate-spin' : ''}`} />
            {isGeneratingStory ? "Generating..." : "New Story"}
          </Button>
        </div>

        {/* Story Content */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xl font-semibold text-foreground">
              {currentStoryData.title}
            </h4>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={prevStory}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground">
                {currentStory + 1} / {personalizedStories.length}
              </span>
              <Button variant="ghost" size="sm" onClick={nextStory}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Narrator Info */}
          <div className="flex items-center space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-xs">
                <Brain className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <div className="font-medium text-foreground">{currentStoryData.narrator}</div>
              <div className="text-muted-foreground">{currentStoryData.origin}</div>
            </div>
            {currentStoryData.audioAvailable && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
                className="ml-auto text-blue-600 hover:bg-blue-50"
              >
                {isPlaying ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            )}
          </div>

          {/* Story Text */}
          <div className="bg-white/80 rounded-lg p-4 border border-blue-200/30">
            <p className="text-foreground leading-relaxed mb-4">
              {currentStoryData.content}
            </p>
            
            <div className="border-t border-blue-200/30 pt-4 space-y-3">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="font-medium text-sm text-foreground mb-1">Moral:</div>
                  <p className="text-sm text-muted-foreground italic">
                    {currentStoryData.moral}
                  </p>
                </div>
              </div>
              
              {currentStoryData.aiGenerated && (
                <>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-medium text-sm text-foreground mb-1">AI Context:</div>
                      <p className="text-sm text-muted-foreground">
                        {currentStoryData.culturalContext}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-medium text-sm text-foreground mb-1">Modern Application:</div>
                      <p className="text-sm text-muted-foreground">
                        {currentStoryData.modernApplication}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Personalization Tags */}
          {currentStoryData.personalizedFor && (
            <div className="flex flex-wrap gap-1">
              <span className="text-xs text-muted-foreground mr-2">Personalized for:</span>
              {currentStoryData.personalizedFor.map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs bg-purple-50 text-purple-700"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-blue-200/30">
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`${liked ? 'text-heritage' : 'text-muted-foreground'} hover:text-heritage`}
              >
                <Heart className={`h-4 w-4 mr-1 ${liked ? 'fill-current' : ''}`} />
                {currentStoryData.likes + (liked ? 1 : 0)}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-blue-600"
              >
                <MessageSquare className="h-4 w-4 mr-1" />
                Discuss
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="text-muted-foreground hover:text-primary"
              >
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
          </div>
        </div>

        <div className="text-center pt-2 border-t border-blue-200/50">
          <div className="flex items-center justify-center space-x-1 text-xs text-muted-foreground">
            <Sparkles className="h-3 w-3" />
            <span>Stories powered by Ubuntu AI - preserving culture, inspiring futures</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AIAfricanStories;