import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Sparkles, 
  Users, 
  BookOpen, 
  Video, 
  TrendingUp,
  Brain,
  RefreshCw,
  ChevronRight
} from "lucide-react";

const AIRecommendations = () => {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateRecommendations = () => {
    setIsLoading(true);
    
    // Simulate AI recommendation generation
    setTimeout(() => {
      const aiRecommendations = [
        {
          type: "person",
          title: "Connect with James Kigozi",
          description: "Tech entrepreneur from Kampala with similar interests in fintech",
          confidence: 92,
          reason: "Based on your posts about technology and community building",
          action: "Follow",
          icon: Users
        },
        {
          type: "story",
          title: "The Wise Tortoise",
          description: "A Ugandan folktale about patience and wisdom",
          confidence: 88,
          reason: "You enjoyed stories about African wisdom",
          action: "Read",
          icon: BookOpen
        },
        {
          type: "video",
          title: "Coding in Luganda Tutorial",
          description: "Learn JavaScript basics in your native language",
          confidence: 95,
          reason: "Perfect match for your tech education interests",
          action: "Watch",
          icon: Video
        },
        {
          type: "topic",
          title: "#UbuntuPhilosophy",
          description: "Trending discussions about community values",
          confidence: 85,
          reason: "Aligns with your community-focused content",
          action: "Explore",
          icon: TrendingUp
        }
      ];
      
      setRecommendations(aiRecommendations);
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    generateRecommendations();
  }, []);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600 bg-green-100";
    if (confidence >= 80) return "text-blue-600 bg-blue-100";
    return "text-orange-600 bg-orange-100";
  };

  return (
    <Card className="p-4 bg-gradient-to-br from-purple-50/50 to-blue-50/50 border-purple-200/50">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-purple-600" />
            <h3 className="font-semibold text-foreground">AI Recommendations</h3>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={generateRecommendations}
            disabled={isLoading}
            className="text-purple-600 hover:bg-purple-100"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-muted rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {recommendations.map((rec, index) => {
              const Icon = rec.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg p-3 border border-purple-100 hover:border-purple-200 transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="h-4 w-4 text-purple-600" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-sm text-foreground truncate">
                          {rec.title}
                        </h4>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getConfidenceColor(rec.confidence)}`}
                        >
                          {rec.confidence}%
                        </Badge>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                        {rec.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-purple-600 bg-purple-50 rounded px-2 py-1">
                          {rec.reason}
                        </span>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-purple-600 hover:bg-purple-50 h-6 px-2 text-xs"
                        >
                          {rec.action}
                          <ChevronRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="text-center pt-2 border-t border-purple-200/50">
          <div className="flex items-center justify-center space-x-1 text-xs text-muted-foreground">
            <Sparkles className="h-3 w-3" />
            <span>Powered by Ubuntu AI</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AIRecommendations;