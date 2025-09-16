import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BookOpen, Heart, Share2, Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

interface Story {
  id: number;
  title: string;
  content: string;
  moral: string;
  origin: string;
  category: "folktale" | "proverb" | "legend" | "wisdom";
  narrator: string;
  audioAvailable: boolean;
  likes: number;
  language: string;
}

const AfricanStories = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);

  const stories: Story[] = [
    {
      id: 1,
      title: "The Hare and the Elephant",
      content: "Long ago in the forests of Uganda, a clever hare challenged a mighty elephant to a tug-of-war. The hare tied one end of a rope to the elephant and ran to the river, where he tied the other end to a hippo, telling each that they were competing against him. As the elephant and hippo pulled against each other, the hare sat in the middle, appearing to hold his own against both mighty beasts.",
      moral: "Intelligence and wit can overcome brute strength. Sometimes the smallest among us can achieve the greatest things through cleverness.",
      origin: "Buganda Kingdom, Uganda",
      category: "folktale",
      narrator: "Elder Nakato",
      audioAvailable: true,
      likes: 234,
      language: "English/Luganda"
    },
    {
      id: 2,
      title: "Akili ni Mali",
      content: "Akili ni mali - Intelligence is wealth. This Swahili proverb teaches us that knowledge and wisdom are more valuable than material possessions. A wise person can create wealth, but a wealthy person without wisdom may lose everything.",
      moral: "Invest in your mind and education. Knowledge is the one treasure that cannot be stolen from you.",
      origin: "East Africa",
      category: "proverb",
      narrator: "Mama Zawadi",
      audioAvailable: true,
      likes: 189,
      language: "Kiswahili/English"
    },
    {
      id: 3,
      title: "The Spider and the Wisdom Pot",
      content: "Anansi the spider decided to gather all the world's wisdom in a pot to keep for himself. As he climbed a tree to hide it, the pot became too heavy and slipped from his grasp, shattering on the ground. The wisdom scattered to the winds, reaching every corner of the earth. This is why wisdom can be found everywhere, in every person.",
      moral: "Wisdom is meant to be shared, not hoarded. When we try to keep knowledge to ourselves, we lose it entirely.",
      origin: "West Africa (Akan people)",
      category: "folktale",
      narrator: "Kwame Asante",
      audioAvailable: true,
      likes: 312,
      language: "English/Twi"
    },
    {
      id: 4,
      title: "Omwana w'omuntu",
      content: "Omwana w'omuntu - A child belongs to everyone. In African communities, every adult has a responsibility to guide, protect, and nurture every child. This proverb reminds us that raising children is a community effort, and every child deserves love and guidance from the entire village.",
      moral: "We all have a role in nurturing the next generation. A child's success is the community's success.",
      origin: "Buganda, Uganda",
      category: "proverb",
      narrator: "Ssebo Mukasa",
      audioAvailable: true,
      likes: 267,
      language: "Luganda/English"
    },
    {
      id: 5,
      title: "The Tortoise and the Birds",
      content: "During a great famine, the birds were invited to a feast in the sky. Tortoise, being cunning, convinced them to lend him feathers so he could join them. At the feast, he told everyone his name was 'All of You,' so when the hosts said the food was for 'All of You,' tortoise ate everything. The angry birds took back their feathers, leaving tortoise to fall from the sky, which is why his shell is cracked.",
      moral: "Greed and deception ultimately lead to downfall. What we gain through trickery, we lose through consequences.",
      origin: "Nigeria (Igbo people)",
      category: "folktale",
      narrator: "Nkem Okafor",
      audioAvailable: true,
      likes: 198,
      language: "English/Igbo"
    }
  ];

  const currentStoryData = stories[currentStory];

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % stories.length);
    setLiked(false);
    setIsPlaying(false);
  };

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + stories.length) % stories.length);
    setLiked(false);
    setIsPlaying(false);
  };

  const handleLike = () => {
    setLiked(!liked);
    if (!liked) {
      toast.success("Story loved! ❤️", {
        description: "Preserving our African heritage together"
      });
    }
  };

  const handleShare = () => {
    const text = `"${currentStoryData.title}" - ${currentStoryData.moral}\n\nFrom: ${currentStoryData.origin}\n\n#AfricanStories #Ubuntu #Heritage`;
    
    if (navigator.share) {
      navigator.share({
        title: currentStoryData.title,
        text: text,
      });
    } else {
      navigator.clipboard.writeText(text);
      toast.success("Story copied to clipboard!");
    }
  };

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      toast.info("🎵 Audio narration would play here", {
        description: "Feature coming soon!"
      });
    }
  };

  // Auto-advance stories
  useEffect(() => {
    if (autoPlay) {
      const timer = setInterval(nextStory, 15000); // 15 seconds per story
      return () => clearInterval(timer);
    }
  }, [autoPlay, currentStory]);

  const getCategoryColor = (category: string) => {
    const colors = {
      folktale: "bg-primary/10 text-primary border-primary/20",
      proverb: "bg-heritage/10 text-heritage border-heritage/20",
      legend: "bg-accent/10 text-accent border-accent/20",
      wisdom: "bg-secondary/10 text-secondary border-secondary/20"
    };
    return colors[category as keyof typeof colors] || colors.folktale;
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200/50">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <BookOpen className="h-6 w-6 text-amber-600" />
            <div>
              <h3 className="font-bold text-lg text-foreground">African Stories</h3>
              <p className="text-sm text-muted-foreground">Heritage & Wisdom</p>
            </div>
          </div>
          <Badge className={getCategoryColor(currentStoryData.category)}>
            {currentStoryData.category}
          </Badge>
        </div>

        {/* Story Content */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xl font-semibold text-foreground">
              {currentStoryData.title}
            </h4>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={prevStory}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground">
                {currentStory + 1} / {stories.length}
              </span>
              <Button variant="ghost" size="sm" onClick={nextStory}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Narrator Info */}
          <div className="flex items-center space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-amber-100 text-amber-800 text-xs">
                {currentStoryData.narrator.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <div className="font-medium text-foreground">{currentStoryData.narrator}</div>
              <div className="text-muted-foreground">{currentStoryData.origin}</div>
            </div>
            {currentStoryData.audioAvailable && (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleAudio}
                className="ml-auto"
              >
                {isPlaying ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            )}
          </div>

          {/* Story Text */}
          <div className="bg-card/80 rounded-lg p-4 border border-amber-200/30">
            <p className="text-foreground leading-relaxed mb-4">
              {currentStoryData.content}
            </p>
            
            <div className="border-t border-amber-200/30 pt-4">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="font-medium text-sm text-foreground mb-1">Moral:</div>
                  <p className="text-sm text-muted-foreground italic">
                    {currentStoryData.moral}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Language & Engagement */}
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs">
              {currentStoryData.language}
            </Badge>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`${liked ? 'text-heritage' : 'text-muted-foreground'} hover:text-heritage`}
              >
                <Heart className={`h-4 w-4 mr-1 ${liked ? 'fill-current' : ''}`} />
                {currentStoryData.likes + (liked ? 1 : 0)}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="text-muted-foreground hover:text-primary"
              >
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
          </div>

          {/* Auto-play Toggle */}
          <div className="flex items-center justify-center pt-2 border-t border-amber-200/30">
            <Button
              variant={autoPlay ? "default" : "outline"}
              size="sm"
              onClick={() => setAutoPlay(!autoPlay)}
              className="text-xs"
            >
              {autoPlay ? "Stop Auto-play" : "Auto-play Stories"}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AfricanStories;