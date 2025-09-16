import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Languages, 
  Volume2, 
  VolumeX, 
  BookOpen, 
  Users,
  Star,
  Play,
  Pause,
  Mic,
  MessageSquare,
  Globe,
  Award
} from "lucide-react";
import { toast } from "sonner";

interface LanguageContent {
  id: string;
  language: string;
  languageCode: string;
  flag: string;
  content: string;
  translation: string;
  pronunciation: string;
  category: "greeting" | "proverb" | "phrase" | "story" | "song";
  difficulty: "beginner" | "intermediate" | "advanced";
  speaker: string;
  region: string;
  audioAvailable: boolean;
  likes: number;
  learned: number;
}

const UgandanLanguageHub = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("lg");
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [learningProgress, setLearningProgress] = useState({
    luganda: 45,
    runyankole: 23,
    acholi: 12,
    ateso: 8
  });

  const [languageContent, setLanguageContent] = useState<LanguageContent[]>([
    {
      id: "1",
      language: "Luganda",
      languageCode: "lg",
      flag: "🇺🇬",
      content: "Oli otya? Ndi bulungi, webale.",
      translation: "How are you? I am fine, thank you.",
      pronunciation: "OH-lee OH-tya? N-dee boo-LOON-gee, weh-BAH-leh",
      category: "greeting",
      difficulty: "beginner",
      speaker: "Mama Nakato",
      region: "Buganda",
      audioAvailable: true,
      likes: 234,
      learned: 1567
    },
    {
      id: "2",
      language: "Luganda",
      languageCode: "lg",
      flag: "🇺🇬",
      content: "Omuntu w'omuntu ku bantu",
      translation: "A person is a person through other people",
      pronunciation: "oh-MOON-too woh-MOON-too koo BAH-n-too",
      category: "proverb",
      difficulty: "intermediate",
      speaker: "Ssebo Mukasa",
      region: "Buganda",
      audioAvailable: true,
      likes: 456,
      learned: 2341
    },
    {
      id: "3",
      language: "Runyankole",
      languageCode: "nyn",
      flag: "🇺🇬",
      content: "Oraire ota? Ndi mwesigye.",
      translation: "How are you? I am fine.",
      pronunciation: "oh-RAH-ee-reh OH-ta? N-dee mweh-SEE-gyeh",
      category: "greeting",
      difficulty: "beginner",
      speaker: "Mama Tusiime",
      region: "Ankole",
      audioAvailable: true,
      likes: 189,
      learned: 892
    },
    {
      id: "4",
      language: "Acholi",
      languageCode: "ach",
      flag: "🇺🇬",
      content: "Itye nadi? Atye maber.",
      translation: "How are you? I am well.",
      pronunciation: "EE-tyeh NAH-dee? AH-tyeh MAH-ber",
      category: "greeting",
      difficulty: "beginner",
      speaker: "Mama Akello",
      region: "Acholi",
      audioAvailable: true,
      likes: 167,
      learned: 743
    },
    {
      id: "5",
      language: "Luganda",
      languageCode: "lg",
      flag: "🇺🇬",
      content: "Enkya tuzze ku ssomero",
      translation: "Tomorrow we go to school",
      pronunciation: "en-KYA too-ZEH koo soh-MEH-roh",
      category: "phrase",
      difficulty: "intermediate",
      speaker: "Teacher Nambi",
      region: "Buganda",
      audioAvailable: true,
      likes: 123,
      learned: 567
    }
  ]);

  const ugandanLanguages = [
    { code: "lg", name: "Luganda", flag: "🇺🇬", speakers: "4M+", region: "Central" },
    { code: "nyn", name: "Runyankole", flag: "🇺🇬", speakers: "2.3M+", region: "Western" },
    { code: "ach", name: "Acholi", flag: "🇺🇬", speakers: "1.2M+", region: "Northern" },
    { code: "teo", name: "Ateso", flag: "🇺🇬", speakers: "1M+", region: "Eastern" },
    { code: "lgg", name: "Lugbara", flag: "🇺🇬", speakers: "800K+", region: "West Nile" },
    { code: "xog", name: "Soga", flag: "🇺🇬", speakers: "2.4M+", region: "Eastern" }
  ];

  const categories = [
    { id: "greeting", label: "Greetings", icon: Users },
    { id: "proverb", label: "Proverbs", icon: Star },
    { id: "phrase", label: "Phrases", icon: MessageSquare },
    { id: "story", label: "Stories", icon: BookOpen },
    { id: "song", label: "Songs", icon: Volume2 }
  ];

  const handlePlayAudio = (contentId: string) => {
    if (isPlaying === contentId) {
      setIsPlaying(null);
      toast.info("Audio paused");
    } else {
      setIsPlaying(contentId);
      toast.success("Playing pronunciation 🔊", {
        description: "Listen and practice the pronunciation"
      });
      
      // Simulate audio duration
      setTimeout(() => {
        setIsPlaying(null);
      }, 3000);
    }
  };

  const handleMarkLearned = (contentId: string) => {
    setLanguageContent(prev => 
      prev.map(content => 
        content.id === contentId 
          ? { ...content, learned: content.learned + 1 }
          : content
      )
    );

    toast.success("Great job! 🎉", {
      description: "Phrase marked as learned. Keep practicing!"
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-green-100 text-green-700";
      case "intermediate": return "bg-yellow-100 text-yellow-700";
      case "advanced": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const filteredContent = languageContent.filter(content => 
    selectedLanguage === "all" || content.languageCode === selectedLanguage
  );

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-green-50 border-blue-200/50">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
              <Languages className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground">Ugandan Language Hub</h3>
              <p className="text-sm text-muted-foreground">Learn and preserve our native languages</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-gradient-to-r from-blue-100 to-green-100">
            <Globe className="h-3 w-3 mr-1" />
            40+ Languages
          </Badge>
        </div>

        {/* Language Selection */}
        <div className="space-y-3">
          <h4 className="font-semibold text-foreground">Choose Your Language</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <Button
              variant={selectedLanguage === "all" ? "default" : "outline"}
              onClick={() => setSelectedLanguage("all")}
              size="sm"
              className="justify-start"
            >
              🌍 All Languages
            </Button>
            {ugandanLanguages.map((lang) => (
              <Button
                key={lang.code}
                variant={selectedLanguage === lang.code ? "default" : "outline"}
                onClick={() => setSelectedLanguage(lang.code)}
                size="sm"
                className="justify-start"
              >
                <span className="mr-2">{lang.flag}</span>
                {lang.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Learning Progress */}
        <div className="bg-white/80 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3 flex items-center">
            <Award className="h-5 w-5 mr-2 text-blue-600" />
            Your Learning Progress
          </h4>
          
          <div className="space-y-3">
            {Object.entries(learningProgress).map(([lang, progress]) => (
              <div key={lang} className="flex items-center justify-between">
                <span className="text-sm capitalize text-foreground">{lang}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-muted-foreground w-8">{progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Language Content */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-foreground">Learn & Practice</h4>
            <Badge variant="outline">{filteredContent.length} phrases</Badge>
          </div>

          {filteredContent.map((content) => (
            <div key={content.id} className="bg-white/80 rounded-lg p-4 border border-blue-100">
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{content.flag}</div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h5 className="font-medium text-foreground">{content.language}</h5>
                        <Badge className={getDifficultyColor(content.difficulty)}>
                          {content.difficulty}
                        </Badge>
                        <Badge variant="outline" className="text-xs capitalize">
                          {content.category}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        by {content.speaker} • {content.region}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="space-y-2">
                    <div className="text-lg font-medium text-blue-800">
                      {content.content}
                    </div>
                    <div className="text-sm text-blue-600">
                      <strong>Translation:</strong> {content.translation}
                    </div>
                    <div className="text-sm text-blue-600">
                      <strong>Pronunciation:</strong> {content.pronunciation}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {content.audioAvailable && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handlePlayAudio(content.id)}
                        className="text-blue-600 hover:bg-blue-50"
                      >
                        {isPlaying === content.id ? (
                          <Pause className="h-4 w-4 mr-1" />
                        ) : (
                          <Play className="h-4 w-4 mr-1" />
                        )}
                        {isPlaying === content.id ? "Playing..." : "Listen"}
                      </Button>
                    )}
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-green-600 hover:bg-green-50"
                    >
                      <Mic className="h-4 w-4 mr-1" />
                      Practice
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleMarkLearned(content.id)}
                      className="text-purple-600 hover:bg-purple-50"
                    >
                      <Star className="h-4 w-4 mr-1" />
                      Learned
                    </Button>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{content.likes} likes</span>
                    <span>{content.learned} learned</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Language Statistics */}
        <div className="bg-gradient-to-r from-blue-100 to-green-100 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
            <Globe className="h-5 w-5 mr-2" />
            Uganda's Linguistic Diversity
          </h4>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <div className="text-2xl font-bold text-blue-700">40+</div>
              <div className="text-sm text-blue-600">Indigenous Languages</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-700">15M+</div>
              <div className="text-sm text-green-600">Native Speakers</div>
            </div>
          </div>
          
          <div className="mt-3 text-sm text-blue-700">
            Preserving Uganda's rich linguistic heritage through technology and community engagement.
          </div>
        </div>

        {/* Contribute Section */}
        <div className="bg-white/80 rounded-lg p-4 border border-green-200">
          <h4 className="font-semibold text-foreground mb-3 flex items-center">
            <Users className="h-5 w-5 mr-2 text-green-600" />
            Contribute to Language Preservation
          </h4>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Record pronunciations in your native language</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Share traditional proverbs and their meanings</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Translate common phrases for learners</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Validate content from other contributors</span>
            </div>
          </div>
          
          <Button variant="outline" size="sm" className="w-full mt-3 text-green-600 border-green-200 hover:bg-green-50">
            Become a Language Ambassador
          </Button>
        </div>

        <div className="text-center pt-4 border-t border-blue-200/50">
          <div className="flex items-center justify-center space-x-1 text-xs text-muted-foreground">
            <Languages className="h-3 w-3" />
            <span>Preserving Uganda's linguistic heritage for future generations</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UgandanLanguageHub;