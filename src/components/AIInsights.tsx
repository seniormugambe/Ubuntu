import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  MessageCircle,
  Heart,
  Globe,
  Brain,
  Sparkles,
  Calendar,
  Clock
} from "lucide-react";

const AIInsights = () => {
  const [insights, setInsights] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate AI analytics generation
    setTimeout(() => {
      setInsights({
        engagement: {
          trend: "up",
          percentage: 23.5,
          description: "Community engagement is growing strongly"
        },
        bestPostTime: {
          time: "7:00 PM",
          timezone: "EAT",
          confidence: 87
        },
        topTopics: [
          { topic: "#UbuntuPhilosophy", posts: 156, growth: 12 },
          { topic: "#TechEducation", posts: 134, growth: 8 },
          { topic: "#CommunityGarden", posts: 98, growth: 15 },
          { topic: "#AfricanCulture", posts: 87, growth: 6 }
        ],
        languageDistribution: [
          { language: "English", percentage: 65, flag: "🇺🇸" },
          { language: "Luganda", percentage: 20, flag: "🇺🇬" },
          { language: "Kiswahili", percentage: 12, flag: "🇹🇿" },
          { language: "French", percentage: 3, flag: "🇫🇷" }
        ],
        communityHealth: {
          score: 92,
          factors: [
            "High positive sentiment",
            "Active cross-cultural engagement", 
            "Strong Ubuntu values alignment",
            "Low conflict resolution time"
          ]
        },
        predictions: [
          {
            type: "growth",
            prediction: "Community will reach 15K members by month end",
            confidence: 89
          },
          {
            type: "content",
            prediction: "Tech education content will trend next week",
            confidence: 76
          }
        ]
      });
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return (
      <Card className="p-4 bg-gradient-to-br from-indigo-50/50 to-purple-50/50">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded w-1/2"></div>
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 border-indigo-200/50">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-indigo-600" />
          <h3 className="font-semibold text-foreground">AI Community Insights</h3>
          <Badge variant="outline" className="text-xs bg-indigo-100 text-indigo-700">
            Real-time
          </Badge>
        </div>

        {/* Engagement Trend */}
        <div className="bg-white rounded-lg p-3 border border-indigo-100">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">Engagement Trend</span>
            </div>
            <Badge className="text-xs bg-green-100 text-green-700">
              +{insights.engagement.percentage}%
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            {insights.engagement.description}
          </p>
        </div>

        {/* Best Posting Time */}
        <div className="bg-white rounded-lg p-3 border border-indigo-100">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium">Optimal Post Time</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-blue-600">
              {insights.bestPostTime.time} {insights.bestPostTime.timezone}
            </span>
            <Badge variant="outline" className="text-xs">
              {insights.bestPostTime.confidence}% confidence
            </Badge>
          </div>
        </div>

        {/* Top Topics */}
        <div className="bg-white rounded-lg p-3 border border-indigo-100">
          <div className="flex items-center space-x-2 mb-3">
            <BarChart3 className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium">Trending Topics</span>
          </div>
          <div className="space-y-2">
            {insights.topTopics.slice(0, 3).map((topic: any, index: number) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-xs font-medium text-purple-600">
                  {topic.topic}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground">
                    {topic.posts} posts
                  </span>
                  <Badge className="text-xs bg-purple-100 text-purple-700">
                    +{topic.growth}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Language Distribution */}
        <div className="bg-white rounded-lg p-3 border border-indigo-100">
          <div className="flex items-center space-x-2 mb-3">
            <Globe className="h-4 w-4 text-orange-600" />
            <span className="text-sm font-medium">Language Usage</span>
          </div>
          <div className="space-y-2">
            {insights.languageDistribution.slice(0, 3).map((lang: any, index: number) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm">{lang.flag}</span>
                  <span className="text-xs">{lang.language}</span>
                </div>
                <span className="text-xs font-medium">{lang.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Community Health Score */}
        <div className="bg-white rounded-lg p-3 border border-indigo-100">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Heart className="h-4 w-4 text-red-500" />
              <span className="text-sm font-medium">Community Health</span>
            </div>
            <div className="text-2xl font-bold text-green-600">
              {insights.communityHealth.score}/100
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            {insights.communityHealth.factors.slice(0, 2).map((factor: string, index: number) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs bg-green-50 text-green-700"
              >
                {factor}
              </Badge>
            ))}
          </div>
        </div>

        {/* AI Predictions */}
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-3">
            <Sparkles className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">AI Predictions</span>
          </div>
          <div className="space-y-2">
            {insights.predictions.map((pred: any, index: number) => (
              <div key={index} className="bg-white/70 rounded p-2">
                <div className="flex items-center justify-between mb-1">
                  <Badge variant="outline" className="text-xs">
                    {pred.confidence}% likely
                  </Badge>
                </div>
                <p className="text-xs text-purple-800">{pred.prediction}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center pt-2 border-t border-indigo-200/50">
          <div className="flex items-center justify-center space-x-1 text-xs text-muted-foreground">
            <Brain className="h-3 w-3" />
            <span>Powered by Ubuntu AI Analytics</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AIInsights;