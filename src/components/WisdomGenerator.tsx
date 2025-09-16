import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Copy, Share2 } from "lucide-react";

const WisdomGenerator = () => {
  const [currentWisdom, setCurrentWisdom] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const wisdomPhrases = [
    {
      text: "Ubuntu teaches us that our strength lies in our unity",
      context: "Community Building",
      action: "Connect with someone new today"
    },
    {
      text: "Like the baobab tree, we grow stronger with deep roots in community",
      context: "Growth Mindset",
      action: "Share your knowledge with others"
    },
    {
      text: "In the spirit of Ubuntu, your success is our success",
      context: "Collective Achievement",
      action: "Celebrate a friend's accomplishment"
    },
    {
      text: "The river that moves mountains starts with a single drop",
      context: "Starting Small",
      action: "Take one small step toward your goal"
    },
    {
      text: "Ubuntu reminds us: I am because we are, we are because I am",
      context: "Interconnectedness",
      action: "Help someone in your community"
    },
    {
      text: "Like Ubuntu software, the best solutions are built together",
      context: "Collaboration",
      action: "Contribute to a shared project"
    },
    {
      text: "In Ubuntu philosophy, listening is the first act of wisdom",
      context: "Understanding",
      action: "Really listen to someone today"
    },
    {
      text: "The Ubuntu way: Share your fire without dimming your own flame",
      context: "Generosity",
      action: "Teach someone a skill you have"
    }
  ];

  const generateWisdom = () => {
    setIsGenerating(true);
    
    // Simulate generation delay for effect
    setTimeout(() => {
      const newIndex = Math.floor(Math.random() * wisdomPhrases.length);
      setCurrentWisdom(newIndex);
      setIsGenerating(false);
    }, 800);
  };

  const copyWisdom = () => {
    const wisdom = wisdomPhrases[currentWisdom];
    navigator.clipboard.writeText(`"${wisdom.text}" - Ubuntu Wisdom`);
  };

  const shareWisdom = () => {
    const wisdom = wisdomPhrases[currentWisdom];
    const text = `"${wisdom.text}" - Ubuntu Wisdom\n\n${wisdom.action} 🌍 #UbuntuWisdom #CommunityFirst`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Ubuntu Wisdom',
        text: text,
      });
    } else {
      copyWisdom();
    }
  };

  const wisdom = wisdomPhrases[currentWisdom];

  return (
    <Card className="p-6 bg-gradient-to-br from-heritage/5 to-accent/5 border-heritage/20">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-heritage" />
            <h3 className="font-semibold text-foreground">Ubuntu Wisdom</h3>
          </div>
          <Badge variant="outline" className="text-heritage border-heritage/30">
            Daily Inspiration
          </Badge>
        </div>

        <div className={`space-y-4 transition-all duration-500 ${isGenerating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
          <div className="text-center p-6 bg-card rounded-lg border border-heritage/10">
            <blockquote className="text-lg font-medium text-foreground italic mb-3">
              "{wisdom.text}"
            </blockquote>
            <Badge variant="secondary" className="mb-3">
              {wisdom.context}
            </Badge>
            <div className="text-sm text-muted-foreground">
              <strong>Today's Ubuntu Action:</strong> {wisdom.action}
            </div>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button
            onClick={generateWisdom}
            disabled={isGenerating}
            variant="heritage"
            size="sm"
            className="flex-1"
          >
            <Sparkles className={`h-4 w-4 mr-1 ${isGenerating ? 'animate-spin' : ''}`} />
            {isGenerating ? 'Generating...' : 'New Wisdom'}
          </Button>
          
          <Button
            onClick={copyWisdom}
            variant="outline"
            size="sm"
          >
            <Copy className="h-4 w-4" />
          </Button>
          
          <Button
            onClick={shareWisdom}
            variant="outline"
            size="sm"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="text-center text-xs text-muted-foreground">
          Wisdom from the Ubuntu philosophy and African proverbs
        </div>
      </div>
    </Card>
  );
};

export default WisdomGenerator;