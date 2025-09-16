import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, MessageSquare, Heart, Globe, TrendingUp } from "lucide-react";

const CommunityStats = () => {
  const [stats, setStats] = useState({
    members: 12847,
    posts: 45623,
    likes: 234567,
    countries: 15,
    growth: 23.5
  });

  const [animatedStats, setAnimatedStats] = useState({
    members: 0,
    posts: 0,
    likes: 0,
    countries: 0,
    growth: 0
  });

  // Animate numbers on mount
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    const animate = (key: keyof typeof stats, target: number) => {
      let current = 0;
      const increment = target / steps;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setAnimatedStats(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, stepDuration);
    };

    // Start animations with slight delays
    setTimeout(() => animate('members', stats.members), 100);
    setTimeout(() => animate('posts', stats.posts), 300);
    setTimeout(() => animate('likes', stats.likes), 500);
    setTimeout(() => animate('countries', stats.countries), 700);
    setTimeout(() => animate('growth', stats.growth), 900);
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        members: prev.members + Math.floor(Math.random() * 3),
        posts: prev.posts + Math.floor(Math.random() * 5),
        likes: prev.likes + Math.floor(Math.random() * 20),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <Card className="p-6 bg-gradient-earth border-primary/10">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Ubuntu Community
          </h3>
          <Badge variant="secondary" className="text-sm">
            Growing Together • Live Stats
          </Badge>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground">
              {formatNumber(animatedStats.members)}
            </div>
            <div className="text-sm text-muted-foreground">Members</div>
          </div>

          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
              <MessageSquare className="h-6 w-6 text-accent" />
            </div>
            <div className="text-2xl font-bold text-foreground">
              {formatNumber(animatedStats.posts)}
            </div>
            <div className="text-sm text-muted-foreground">Posts</div>
          </div>

          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-heritage/10 rounded-full flex items-center justify-center mx-auto">
              <Heart className="h-6 w-6 text-heritage" />
            </div>
            <div className="text-2xl font-bold text-foreground">
              {formatNumber(animatedStats.likes)}
            </div>
            <div className="text-sm text-muted-foreground">Likes</div>
          </div>

          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
              <Globe className="h-6 w-6 text-secondary" />
            </div>
            <div className="text-2xl font-bold text-foreground">
              {animatedStats.countries}
            </div>
            <div className="text-sm text-muted-foreground">Countries</div>
          </div>

          <div className="text-center space-y-2 md:col-span-2">
            <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-foreground">
              +{animatedStats.growth.toFixed(1)}%
            </div>
            <div className="text-sm text-muted-foreground">Monthly Growth</div>
          </div>
        </div>

        <div className="text-center pt-4 border-t border-muted/20">
          <div className="text-sm text-muted-foreground">
            🌍 Connecting Africa • 🚀 Building Together • ❤️ Ubuntu Spirit
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CommunityStats;