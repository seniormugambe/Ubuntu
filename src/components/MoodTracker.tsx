import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Smile, TrendingUp } from "lucide-react";

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [moodHistory, setMoodHistory] = useState<string[]>([]);

  const moods = [
    { emoji: "😊", name: "Happy", color: "bg-yellow-100 text-yellow-800", message: "Spreading joy in the Ubuntu community!" },
    { emoji: "🚀", name: "Excited", color: "bg-blue-100 text-blue-800", message: "Ready to build something amazing!" },
    { emoji: "💪", name: "Motivated", color: "bg-green-100 text-green-800", message: "Ubuntu spirit is strong today!" },
    { emoji: "🤔", name: "Thoughtful", color: "bg-purple-100 text-purple-800", message: "Reflecting on community wisdom." },
    { emoji: "❤️", name: "Grateful", color: "bg-red-100 text-red-800", message: "Thankful for our Ubuntu family!" },
    { emoji: "🌟", name: "Inspired", color: "bg-amber-100 text-amber-800", message: "Innovation flows through us!" },
  ];

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    setMoodHistory(prev => [mood, ...prev.slice(0, 6)]); // Keep last 7 moods
  };

  const getMoodStats = () => {
    const moodCounts = moodHistory.reduce((acc, mood) => {
      acc[mood] = (acc[mood] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const topMood = Object.entries(moodCounts).sort(([,a], [,b]) => b - a)[0];
    return topMood ? topMood[0] : null;
  };

  const currentMood = moods.find(m => m.name === selectedMood);
  const topMood = getMoodStats();
  const topMoodData = moods.find(m => m.name === topMood);

  return (
    <Card className="p-6 bg-gradient-golden/10 border-secondary/20">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Smile className="h-5 w-5 text-secondary" />
          <h3 className="font-semibold text-foreground">Ubuntu Mood</h3>
          <Badge variant="outline" className="text-xs">
            Community Vibes
          </Badge>
        </div>

        {/* Current Mood Display */}
        {currentMood && (
          <div className="text-center p-4 bg-card rounded-lg border border-primary/10">
            <div className="text-4xl mb-2">{currentMood.emoji}</div>
            <div className="font-medium text-foreground">{currentMood.message}</div>
          </div>
        )}

        {/* Mood Selection Grid */}
        <div className="grid grid-cols-3 gap-2">
          {moods.map((mood) => (
            <Button
              key={mood.name}
              variant={selectedMood === mood.name ? "default" : "outline"}
              size="sm"
              onClick={() => handleMoodSelect(mood.name)}
              className="h-12 flex-col space-y-1 hover:scale-105 transition-transform"
            >
              <span className="text-lg">{mood.emoji}</span>
              <span className="text-xs">{mood.name}</span>
            </Button>
          ))}
        </div>

        {/* Mood History */}
        {moodHistory.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Recent Vibes</span>
            </div>
            <div className="flex space-x-1">
              {moodHistory.slice(0, 7).map((mood, index) => {
                const moodData = moods.find(m => m.name === mood);
                return (
                  <div
                    key={index}
                    className="text-lg opacity-80 hover:opacity-100 transition-opacity"
                    style={{ opacity: 1 - (index * 0.15) }}
                  >
                    {moodData?.emoji}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Top Mood */}
        {topMoodData && moodHistory.length >= 3 && (
          <div className="text-center pt-2 border-t border-muted/20">
            <div className="text-sm text-muted-foreground">
              Your Ubuntu spirit: <span className="font-medium text-foreground">{topMoodData.emoji} {topMoodData.name}</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MoodTracker;