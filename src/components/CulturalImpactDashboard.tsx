import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Users, 
  Globe, 
  Brain, 
  BookOpen,
  Languages,
  Heart,
  Sparkles,
  Award,
  Target,
  Zap
} from "lucide-react";

const CulturalImpactDashboard = () => {
  const [stats, setStats] = useState({
    totalContributions: 1247,
    activeContributors: 89,
    languagesCovered: 23,
    countriesRepresented: 45,
    aiAccuracyImprovement: 34.5,
    culturalContextsLearned: 567,
    communityValidations: 2341,
    aiResponsesImproved: 15678
  });

  const [recentImpacts, setRecentImpacts] = useState([
    {
      type: "language",
      description: "AI learned 15 new Luganda phrases from your contributions",
      impact: "Now provides better translations for 2.3K users",
      timestamp: "2 hours ago"
    },
    {
      type: "tradition",
      description: "Your Maasai ceremony explanation helped AI understand cultural context",
      impact: "Improved cultural sensitivity in 156 AI responses",
      timestamp: "5 hours ago"
    },
    {
      type: "validation",
      description: "Community validated your Ubuntu philosophy explanation",
      impact: "AI now uses this knowledge in community discussions",
      timestamp: "1 day ago"
    }
  ]);

  const [achievements, setAchievements] = useState([
    { title: "Cultural Ambassador", description: "Taught AI 10+ traditions", earned: true },
    { title: "Language Guardian", description: "Contributed in 3+ languages", earned: true },
    { title: "Wisdom Keeper", description: "Shared 25+ proverbs", earned: false },
    { title: "Community Validator", description: "Validated 50+ submissions", earned: true },
    { title: "Heritage Preserver", description: "Documented 5+ ceremonies", earned: false }
  ]);

  const getImpactIcon = (type: string) => {
    switch (type) {
      case "language": return <Languages className="h-4 w-4 text-blue-600" />;
      case "tradition": return <Users className="h-4 w-4 text-purple-600" />;
      case "validation": return <Heart className="h-4 w-4 text-red-600" />;
      default: return <Sparkles className="h-4 w-4 text-amber-600" />;
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-amber-50 to-emerald-50 border-amber-200/50">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground">Cultural Impact Dashboard</h3>
              <p className="text-sm text-muted-foreground">See how your contributions help AI learn</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-gradient-to-r from-amber-100 to-emerald-100">
            <Target className="h-3 w-3 mr-1" />
            Impact Tracking
          </Badge>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/80 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-amber-600">{stats.totalContributions.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Total Contributions</div>
          </div>
          
          <div className="bg-white/80 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-emerald-600">{stats.activeContributors}</div>
            <div className="text-xs text-muted-foreground">Active Contributors</div>
          </div>
          
          <div className="bg-white/80 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.languagesCovered}</div>
            <div className="text-xs text-muted-foreground">Languages Covered</div>
          </div>
          
          <div className="bg-white/80 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.countriesRepresented}</div>
            <div className="text-xs text-muted-foreground">Countries</div>
          </div>
        </div>

        {/* AI Improvement Metrics */}
        <div className="bg-white/80 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3 flex items-center">
            <Brain className="h-5 w-5 mr-2 text-blue-600" />
            AI Learning Progress
          </h4>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-blue-600">+{stats.aiAccuracyImprovement}%</div>
              <div className="text-xs text-muted-foreground">Cultural Accuracy</div>
            </div>
            
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-600">{stats.culturalContextsLearned}</div>
              <div className="text-xs text-muted-foreground">Contexts Learned</div>
            </div>
            
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-lg font-bold text-purple-600">{stats.aiResponsesImproved.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Responses Improved</div>
            </div>
          </div>
        </div>

        {/* Recent Impact */}
        <div className="space-y-3">
          <h4 className="font-semibold text-foreground flex items-center">
            <Zap className="h-5 w-5 mr-2 text-amber-600" />
            Recent Impact
          </h4>
          
          {recentImpacts.map((impact, index) => (
            <div key={index} className="bg-white/80 rounded-lg p-3 border border-amber-100">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  {getImpactIcon(impact.type)}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">{impact.description}</div>
                  <div className="text-xs text-emerald-600 font-medium">{impact.impact}</div>
                  <div className="text-xs text-muted-foreground">{impact.timestamp}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div className="space-y-3">
          <h4 className="font-semibold text-foreground flex items-center">
            <Award className="h-5 w-5 mr-2 text-amber-600" />
            Cultural Achievements
          </h4>
          
          <div className="grid md:grid-cols-2 gap-3">
            {achievements.map((achievement, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-lg border ${
                  achievement.earned 
                    ? 'bg-amber-50 border-amber-200' 
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Award className={`h-4 w-4 ${achievement.earned ? 'text-amber-600' : 'text-gray-400'}`} />
                  <div className="flex-1">
                    <div className={`text-sm font-medium ${achievement.earned ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {achievement.title}
                    </div>
                    <div className="text-xs text-muted-foreground">{achievement.description}</div>
                  </div>
                  {achievement.earned && (
                    <Badge className="bg-amber-100 text-amber-700 text-xs">
                      Earned
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Leaderboard Preview */}
        <div className="bg-gradient-to-r from-emerald-100 to-blue-100 rounded-lg p-4">
          <h4 className="font-semibold text-emerald-800 mb-3 flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Top Cultural Contributors This Month
          </h4>
          
          <div className="space-y-2">
            {[
              { name: "Sarah N.", contributions: 47, badge: "🥇" },
              { name: "Joseph M.", contributions: 39, badge: "🥈" },
              { name: "Amina K.", contributions: 34, badge: "🥉" },
              { name: "You", contributions: 28, badge: "4th" }
            ].map((contributor, index) => (
              <div key={index} className="flex items-center justify-between bg-white/70 rounded p-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{contributor.badge}</span>
                  <span className="text-sm text-foreground">{contributor.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">{contributor.contributions} contributions</span>
              </div>
            ))}
          </div>
          
          <Button variant="ghost" size="sm" className="w-full mt-3 text-emerald-700 hover:bg-emerald-50">
            View Full Leaderboard
          </Button>
        </div>

        <div className="text-center pt-4 border-t border-amber-200/50">
          <div className="flex items-center justify-center space-x-1 text-xs text-muted-foreground">
            <Heart className="h-3 w-3" />
            <span>Your cultural contributions are making AI more inclusive and authentic</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CulturalImpactDashboard;