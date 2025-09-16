import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, X, ChevronRight } from "lucide-react";

const OnboardingTips = () => {
  const [currentTip, setCurrentTip] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const tips = [
    {
      title: "Share Your Ubuntu Story",
      description: "Post about your community, culture, or daily life. Every voice matters in our Ubuntu family.",
      action: "Try posting something!"
    },
    {
      title: "Explore African Stories",
      description: "Discover traditional folktales, proverbs, and wisdom from across Africa in our Stories section.",
      action: "Read a story"
    },
    {
      title: "Watch Ubuntu Shorts",
      description: "Enjoy short videos about African culture, tech education, and community stories.",
      action: "Watch shorts"
    },
    {
      title: "Connect with Community",
      description: "Like, comment, and share posts to build meaningful connections with fellow Ubuntu members.",
      action: "Start connecting"
    }
  ];

  const nextTip = () => {
    if (currentTip < tips.length - 1) {
      setCurrentTip(prev => prev + 1);
    } else {
      setIsVisible(false);
    }
  };

  const skipTips = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const tip = tips[currentTip];

  return (
    <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200/50">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center flex-shrink-0">
            <Lightbulb className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center space-x-2">
              <h4 className="font-semibold text-foreground">{tip.title}</h4>
              <Badge variant="outline" className="text-xs">
                {currentTip + 1}/{tips.length}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground">
              {tip.description}
            </p>
            
            <div className="flex items-center space-x-2 pt-2">
              <Button
                onClick={nextTip}
                size="sm"
                variant="default"
                className="flex items-center space-x-1"
              >
                <span>{currentTip === tips.length - 1 ? "Got it!" : "Next"}</span>
                {currentTip < tips.length - 1 && <ChevronRight className="h-3 w-3" />}
              </Button>
              
              <Button
                onClick={skipTips}
                size="sm"
                variant="ghost"
                className="text-muted-foreground"
              >
                Skip tips
              </Button>
            </div>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={skipTips}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default OnboardingTips;