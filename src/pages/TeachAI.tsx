import Navigation from "@/components/Navigation";
import CulturalTeacher from "@/components/CulturalTeacher";
import CulturalValidator from "@/components/CulturalValidator";
import CulturalImpactDashboard from "@/components/CulturalImpactDashboard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  Brain, 
  Users, 
  Globe, 
  BookOpen,
  Sparkles,
  Heart,
  TrendingUp,
  CheckCircle
} from "lucide-react";
import { useState } from "react";

const TeachAI = () => {
  const [activeView, setActiveView] = useState<"teach" | "validate">("teach");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 pb-8">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
                <GraduationCap className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-foreground">
                Teach AI Your <span className="text-emerald-600">Culture</span>
              </h1>
              <Badge variant="outline" className="bg-gradient-to-r from-emerald-100 to-blue-100">
                <Brain className="h-3 w-3 mr-1" />
                Community Powered
              </Badge>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Help our AI understand and preserve African traditions, languages, and wisdom. 
              Your cultural knowledge makes our AI more authentic and respectful.
            </p>
            
            {/* View Toggle */}
            <div className="flex justify-center mt-6">
              <div className="bg-muted rounded-lg p-1 flex">
                <Button
                  variant={activeView === "teach" ? "default" : "ghost"}
                  onClick={() => setActiveView("teach")}
                  className="flex items-center space-x-2"
                >
                  <GraduationCap className="h-4 w-4" />
                  <span>Teach AI</span>
                </Button>
                <Button
                  variant={activeView === "validate" ? "default" : "ghost"}
                  onClick={() => setActiveView("validate")}
                  className="flex items-center space-x-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>Validate Knowledge</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {activeView === "teach" ? <CulturalTeacher /> : <CulturalValidator />}
            </div>

            {/* Sidebar with Info and Stats */}
            <div className="space-y-6">
              {/* Why Teach AI */}
              <Card className="p-6 bg-gradient-to-br from-emerald-50 to-blue-50">
                <h3 className="font-semibold text-foreground mb-4 flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-emerald-600" />
                  Why Teach AI?
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-medium text-foreground">Preserve Culture</div>
                      <div className="text-muted-foreground">Help AI understand and preserve your traditions for future generations</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-medium text-foreground">Improve AI Responses</div>
                      <div className="text-muted-foreground">Make AI more culturally aware and respectful in its interactions</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-medium text-foreground">Share Knowledge</div>
                      <div className="text-muted-foreground">Help others learn about your culture through AI-powered content</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-medium text-foreground">Build Community</div>
                      <div className="text-muted-foreground">Connect with others who share and value your cultural heritage</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Community Impact */}
              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                  Community Impact
                </h3>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-emerald-50 rounded-lg">
                    <div className="text-2xl font-bold text-emerald-600">1,247</div>
                    <div className="text-sm text-muted-foreground">Cultural lessons shared</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">89</div>
                      <div className="text-xs text-muted-foreground">Contributors</div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="text-lg font-bold text-purple-600">23</div>
                      <div className="text-xs text-muted-foreground">Languages</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <div className="text-lg font-bold text-orange-600">45</div>
                      <div className="text-xs text-muted-foreground">Countries</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">156</div>
                      <div className="text-xs text-muted-foreground">Traditions</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Recent Contributions */}
              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-purple-600" />
                  Recent Contributions
                </h3>
                <div className="space-y-3">
                  {[
                    { name: "Amina K.", contribution: "Taught AI about Maasai beadwork", time: "2 hours ago" },
                    { name: "Joseph M.", contribution: "Shared Yoruba proverbs", time: "5 hours ago" },
                    { name: "Fatima S.", contribution: "Explained Ramadan traditions", time: "1 day ago" },
                    { name: "David O.", contribution: "Traditional drumming patterns", time: "2 days ago" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {item.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground">{item.name}</div>
                        <div className="text-xs text-muted-foreground truncate">{item.contribution}</div>
                        <div className="text-xs text-muted-foreground">{item.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* AI Learning Categories */}
              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-amber-600" />
                  What AI is Learning
                </h3>
                <div className="space-y-2 text-sm">
                  {[
                    { category: "Traditional Stories", count: 234, color: "bg-amber-100 text-amber-700" },
                    { category: "Cultural Practices", count: 189, color: "bg-blue-100 text-blue-700" },
                    { category: "Language Phrases", count: 156, color: "bg-green-100 text-green-700" },
                    { category: "Food & Recipes", count: 123, color: "bg-orange-100 text-orange-700" },
                    { category: "Music & Dance", count: 98, color: "bg-purple-100 text-purple-700" },
                    { category: "Ceremonies", count: 87, color: "bg-pink-100 text-pink-700" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                      <span className="text-foreground">{item.category}</span>
                      <Badge className={`text-xs ${item.color}`}>
                        {item.count}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Cultural Impact Dashboard */}
              <CulturalImpactDashboard />

              {/* Call to Action */}
              <Card className="p-6 bg-gradient-to-r from-emerald-500 to-blue-500 text-white">
                <div className="text-center space-y-3">
                  <Sparkles className="h-8 w-8 mx-auto" />
                  <h3 className="font-bold">Start Teaching Today!</h3>
                  <p className="text-sm opacity-90">
                    Every piece of cultural knowledge you share helps build a more inclusive and culturally-aware AI for everyone.
                  </p>
                  <div className="text-xs opacity-75">
                    Join 89+ cultural ambassadors preserving African heritage through AI
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeachAI;