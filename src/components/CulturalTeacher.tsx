import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  GraduationCap, 
  Brain, 
  Plus, 
  BookOpen, 
  Music, 
  Utensils, 
  Users, 
  MapPin,
  Languages,
  Sparkles,
  CheckCircle,
  Clock,
  Star,
  Upload,
  Mic,
  Camera
} from "lucide-react";
import { toast } from "sonner";

interface CulturalLesson {
  id: string;
  type: "tradition" | "language" | "food" | "music" | "story" | "proverb" | "ceremony" | "craft";
  title: string;
  description: string;
  content: string;
  language: string;
  region: string;
  contributor: string;
  status: "pending" | "verified" | "published";
  aiLearned: boolean;
  examples?: string[];
  pronunciation?: string;
  culturalContext: string;
  modernRelevance: string;
}

const CulturalTeacher = () => {
  const [activeTab, setActiveTab] = useState<"teach" | "contributions" | "progress">("teach");
  const [selectedType, setSelectedType] = useState<CulturalLesson["type"]>("tradition");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    language: "en",
    region: "",
    culturalContext: "",
    modernRelevance: "",
    examples: [""]
  });

  const [contributions, setContributions] = useState<CulturalLesson[]>([
    {
      id: "1",
      type: "proverb",
      title: "Omwana w'omuntu",
      description: "A child belongs to everyone - Ubuntu philosophy about community child-rearing",
      content: "In Buganda culture, every adult in the community has a responsibility to guide and protect every child. This proverb emphasizes collective responsibility for nurturing the next generation.",
      language: "Luganda",
      region: "Buganda, Uganda",
      contributor: "You",
      status: "published",
      aiLearned: true,
      examples: [
        "When a child misbehaves, any adult can correct them",
        "Community members contribute to children's education",
        "Orphaned children are naturally adopted by the community"
      ],
      culturalContext: "Reflects the Ubuntu philosophy of interconnectedness and shared responsibility",
      modernRelevance: "Relevant for modern community-based childcare and education systems"
    },
    {
      id: "2", 
      type: "food",
      title: "Matooke Preparation Ritual",
      description: "Traditional way of preparing matooke with cultural significance",
      content: "Matooke is not just food but a cultural symbol. The way it's peeled, arranged, and cooked carries meaning about patience, community, and respect for nature's gifts.",
      language: "English",
      region: "Central Uganda",
      contributor: "You",
      status: "verified",
      aiLearned: false,
      culturalContext: "Food preparation as a form of meditation and community bonding",
      modernRelevance: "Teaches mindfulness and sustainable cooking practices"
    }
  ]);

  const lessonTypes: Array<{ type: CulturalLesson["type"], label: string, icon: any, color: string }> = [
    { type: "tradition", label: "Tradition", icon: Users, color: "bg-blue-100 text-blue-700" },
    { type: "language", label: "Language", icon: Languages, color: "bg-green-100 text-green-700" },
    { type: "food", label: "Food", icon: Utensils, color: "bg-orange-100 text-orange-700" },
    { type: "music", label: "Music", icon: Music, color: "bg-purple-100 text-purple-700" },
    { type: "story", label: "Story", icon: BookOpen, color: "bg-amber-100 text-amber-700" },
    { type: "proverb", label: "Proverb", icon: Star, color: "bg-yellow-100 text-yellow-700" },
    { type: "ceremony", label: "Ceremony", icon: Sparkles, color: "bg-pink-100 text-pink-700" },
    { type: "craft", label: "Craft", icon: GraduationCap, color: "bg-indigo-100 text-indigo-700" }
  ];

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "lg", name: "Luganda", flag: "🇺🇬" },
    { code: "sw", name: "Kiswahili", flag: "🇹🇿" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "am", name: "Amharic", flag: "🇪🇹" },
    { code: "yo", name: "Yoruba", flag: "🇳🇬" },
    { code: "zu", name: "Zulu", flag: "🇿🇦" }
  ];

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error("Please fill in the required fields");
      return;
    }

    setIsSubmitting(true);

    // Simulate AI learning process
    setTimeout(() => {
      const newLesson: CulturalLesson = {
        id: Date.now().toString(),
        type: selectedType,
        title: formData.title,
        description: formData.description,
        content: formData.content,
        language: formData.language,
        region: formData.region,
        contributor: "You",
        status: "pending",
        aiLearned: false,
        examples: formData.examples.filter(ex => ex.trim()),
        culturalContext: formData.culturalContext,
        modernRelevance: formData.modernRelevance
      };

      setContributions(prev => [newLesson, ...prev]);
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        content: "",
        language: "en",
        region: "",
        culturalContext: "",
        modernRelevance: "",
        examples: [""]
      });

      setIsSubmitting(false);
      setActiveTab("contributions");

      toast.success("Cultural knowledge submitted! 🎓", {
        description: "AI is learning from your contribution"
      });

      // Simulate AI learning completion
      setTimeout(() => {
        setContributions(prev => 
          prev.map(lesson => 
            lesson.id === newLesson.id 
              ? { ...lesson, status: "verified", aiLearned: true }
              : lesson
          )
        );
        
        toast.success("AI has learned your cultural knowledge! 🤖✨", {
          description: "This knowledge will help AI better understand your culture"
        });
      }, 3000);
    }, 2000);
  };

  const addExample = () => {
    setFormData(prev => ({
      ...prev,
      examples: [...prev.examples, ""]
    }));
  };

  const updateExample = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      examples: prev.examples.map((ex, i) => i === index ? value : ex)
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "bg-green-100 text-green-700";
      case "verified": return "bg-blue-100 text-blue-700";
      case "pending": return "bg-yellow-100 text-yellow-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getTypeIcon = (type: string) => {
    const typeData = lessonTypes.find(t => t.type === type);
    return typeData ? typeData.icon : BookOpen;
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-emerald-50 to-blue-50 border-emerald-200/50">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground">Cultural AI Teacher</h3>
              <p className="text-sm text-muted-foreground">Help AI learn your traditions & culture</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-gradient-to-r from-emerald-100 to-blue-100">
            <Brain className="h-3 w-3 mr-1" />
            AI Learning
          </Badge>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-white/70 rounded-lg p-1">
          <Button
            variant={activeTab === "teach" ? "default" : "ghost"}
            onClick={() => setActiveTab("teach")}
            size="sm"
            className="flex-1"
          >
            <Plus className="h-4 w-4 mr-2" />
            Teach AI
          </Button>
          <Button
            variant={activeTab === "contributions" ? "default" : "ghost"}
            onClick={() => setActiveTab("contributions")}
            size="sm"
            className="flex-1"
          >
            <BookOpen className="h-4 w-4 mr-2" />
            My Contributions
          </Button>
          <Button
            variant={activeTab === "progress" ? "default" : "ghost"}
            onClick={() => setActiveTab("progress")}
            size="sm"
            className="flex-1"
          >
            <Brain className="h-4 w-4 mr-2" />
            AI Progress
          </Button>
        </div>

        {/* Teach AI Tab */}
        {activeTab === "teach" && (
          <div className="space-y-6">
            {/* Lesson Type Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">What would you like to teach AI?</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {lessonTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <Button
                      key={type.type}
                      variant={selectedType === type.type ? "default" : "outline"}
                      onClick={() => setSelectedType(type.type)}
                      className="h-auto p-3 flex-col space-y-1"
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-xs">{type.label}</span>
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Form */}
            <div className="bg-white/80 rounded-lg p-4 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Traditional Wedding Ceremony"
                    className="w-full p-2 border border-muted rounded-lg text-sm"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Language</label>
                  <select
                    value={formData.language}
                    onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value }))}
                    className="w-full p-2 border border-muted rounded-lg text-sm"
                  >
                    {languages.map(lang => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Brief Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Short summary of this cultural element"
                  className="w-full p-2 border border-muted rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Region/Community</label>
                <input
                  type="text"
                  value={formData.region}
                  onChange={(e) => setFormData(prev => ({ ...prev, region: e.target.value }))}
                  placeholder="e.g., Buganda, Uganda or Maasai, Kenya"
                  className="w-full p-2 border border-muted rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Detailed Content *</label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Explain the tradition, its meaning, how it's practiced, and why it's important..."
                  className="min-h-[100px] resize-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Cultural Context</label>
                <Textarea
                  value={formData.culturalContext}
                  onChange={(e) => setFormData(prev => ({ ...prev, culturalContext: e.target.value }))}
                  placeholder="What does this represent in your culture? What values does it embody?"
                  className="min-h-[60px] resize-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Modern Relevance</label>
                <Textarea
                  value={formData.modernRelevance}
                  onChange={(e) => setFormData(prev => ({ ...prev, modernRelevance: e.target.value }))}
                  placeholder="How is this relevant today? How can it be applied in modern life?"
                  className="min-h-[60px] resize-none"
                />
              </div>

              {/* Examples */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-foreground">Examples (Optional)</label>
                  <Button variant="ghost" size="sm" onClick={addExample}>
                    <Plus className="h-3 w-3 mr-1" />
                    Add Example
                  </Button>
                </div>
                <div className="space-y-2">
                  {formData.examples.map((example, index) => (
                    <input
                      key={index}
                      type="text"
                      value={example}
                      onChange={(e) => updateExample(index, e.target.value)}
                      placeholder="Provide a specific example or use case"
                      className="w-full p-2 border border-muted rounded-lg text-sm"
                    />
                  ))}
                </div>
              </div>

              {/* Media Upload Placeholders */}
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Camera className="h-4 w-4 mr-2" />
                  Add Photo
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Mic className="h-4 w-4 mr-2" />
                  Record Audio
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload File
                </Button>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.title.trim() || !formData.content.trim()}
                className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
              >
                {isSubmitting ? (
                  <>
                    <Brain className="h-4 w-4 mr-2 animate-pulse" />
                    Teaching AI...
                  </>
                ) : (
                  <>
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Teach AI This Knowledge
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Contributions Tab */}
        {activeTab === "contributions" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-foreground">Your Cultural Contributions</h4>
              <Badge variant="outline">{contributions.length} lessons shared</Badge>
            </div>

            <div className="space-y-3">
              {contributions.map((lesson) => {
                const Icon = getTypeIcon(lesson.type);
                return (
                  <div key={lesson.id} className="bg-white/80 rounded-lg p-4 border border-emerald-100">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                          <Icon className="h-4 w-4 text-emerald-600" />
                        </div>
                        <div>
                          <h5 className="font-medium text-foreground">{lesson.title}</h5>
                          <p className="text-sm text-muted-foreground">{lesson.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(lesson.status)}>
                          {lesson.status}
                        </Badge>
                        {lesson.aiLearned && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            <Brain className="h-3 w-3 mr-1" />
                            AI Learned
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="text-sm text-muted-foreground mb-2">
                      <span className="font-medium">Region:</span> {lesson.region} • 
                      <span className="font-medium ml-1">Language:</span> {lesson.language}
                    </div>

                    <p className="text-sm text-foreground line-clamp-2 mb-3">
                      {lesson.content}
                    </p>

                    {lesson.examples && lesson.examples.length > 0 && (
                      <div className="mb-3">
                        <span className="text-xs font-medium text-muted-foreground">Examples:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {lesson.examples.slice(0, 2).map((example, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {example}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Contributed by {lesson.contributor}</span>
                      <div className="flex items-center space-x-2">
                        {lesson.aiLearned ? (
                          <div className="flex items-center text-green-600">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            AI Trained
                          </div>
                        ) : (
                          <div className="flex items-center text-yellow-600">
                            <Clock className="h-3 w-3 mr-1" />
                            Processing
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* AI Progress Tab */}
        {activeTab === "progress" && (
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">AI Cultural Learning Progress</h4>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/80 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Total Lessons Learned</span>
                  <span className="text-2xl font-bold text-emerald-600">247</span>
                </div>
                <div className="text-xs text-muted-foreground">From 89 contributors</div>
              </div>

              <div className="bg-white/80 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Your Contribution</span>
                  <span className="text-2xl font-bold text-blue-600">{contributions.length}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {contributions.filter(c => c.aiLearned).length} learned by AI
                </div>
              </div>
            </div>

            <div className="bg-white/80 rounded-lg p-4">
              <h5 className="font-medium text-foreground mb-3">AI Knowledge Areas</h5>
              <div className="space-y-2">
                {lessonTypes.map((type) => {
                  const count = Math.floor(Math.random() * 50) + 10;
                  const percentage = Math.floor(Math.random() * 40) + 60;
                  return (
                    <div key={type.type} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <type.icon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{type.label}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-emerald-500 h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-muted-foreground w-8">{count}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-100 to-blue-100 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="h-5 w-5 text-emerald-600" />
                <span className="font-medium text-emerald-800">AI Impact</span>
              </div>
              <p className="text-sm text-emerald-700">
                Your cultural teachings have helped AI generate 156 culturally-aware responses, 
                translate 89 traditional phrases, and recommend 234 relevant cultural content pieces to community members.
              </p>
            </div>
          </div>
        )}

        <div className="text-center pt-4 border-t border-emerald-200/50">
          <div className="flex items-center justify-center space-x-1 text-xs text-muted-foreground">
            <GraduationCap className="h-3 w-3" />
            <span>Building culturally-aware AI together</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CulturalTeacher;