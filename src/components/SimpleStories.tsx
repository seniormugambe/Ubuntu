import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Heart, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

const SimpleStories = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [liked, setLiked] = useState(false);

  const stories = [
    {
      id: 1,
      title: "The Wise Tortoise",
      content: "Long ago in the forests of Uganda, there lived a wise tortoise who taught the animals about patience and wisdom. When the rains failed to come, all the animals panicked except the tortoise, who had prepared by storing water in hollow tree trunks.",
      moral: "Preparation and patience are the keys to overcoming challenges.",
      origin: "Buganda, Uganda",
      likes: 234
    },
    {
      id: 2,
      title: "Ubuntu Philosophy",
      content: "Omuntu w'omuntu ku bantu - A person is a person through other people. This ancient wisdom teaches us that our humanity is interconnected, and we can only truly be ourselves through our relationships with others.",
      moral: "We are stronger together than apart.",
      origin: "African Philosophy",
      likes: 456
    },
    {
      id: 3,
      title: "The Generous Farmer",
      content: "A farmer in Masaka always shared his harvest with his neighbors, even in difficult years. When drought struck his own fields, the entire community came together to help him, ensuring no one went hungry.",
      moral: "Generosity creates a circle of support that benefits everyone.",
      origin: "Central Uganda",
      likes: 189
    }
  ];

  const currentStoryData = stories[currentStory];

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % stories.length);
    setLiked(false);
  };

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + stories.length) % stories.length);
    setLiked(false);
  };

  const handleLike = () => {
    setLiked(!liked);
    if (!liked) {
      toast.success("Story loved! ❤️", {
        description: "Thank you for appreciating our cultural heritage"
      });
    }
  };

  const handleShare = () => {
    const text = `"${currentStoryData.title}" - ${currentStoryData.moral}\n\nFrom: ${currentStoryData.origin}`;
    
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

  return (
    <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200/50 max-w-4xl mx-auto">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <BookOpen className="h-6 w-6 text-amber-600" />
            <div>
              <h3 className="font-bold text-lg text-foreground">African Stories</h3>
              <p className="text-sm text-muted-foreground">Traditional wisdom and tales</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-amber-100 text-amber-700">
            Story {currentStory + 1} of {stories.length}
          </Badge>
        </div>

        {/* Story Navigation */}
        <div className="flex items-center justify-between">
          <h4 className="text-xl font-semibold text-foreground">
            {currentStoryData.title}
          </h4>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={prevStory}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={nextStory}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Story Content */}
        <div className="bg-white/80 rounded-lg p-4 border border-amber-200/30">
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

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            From: {currentStoryData.origin}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`${liked ? 'text-red-500' : 'text-muted-foreground'} hover:text-red-500`}
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
      </div>
    </Card>
  );
};

export default SimpleStories;