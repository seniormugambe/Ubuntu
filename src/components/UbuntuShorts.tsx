import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Play, 
  Pause, 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark,
  Volume2,
  VolumeX,
  MoreVertical,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import { toast } from "sonner";

interface Short {
  id: number;
  title: string;
  creator: string;
  thumbnail: string;
  duration: string;
  views: string;
  likes: number;
  comments: number;
  description: string;
  hashtags: string[];
  category: "culture" | "tech" | "education" | "entertainment" | "community";
  location?: string;
}

const UbuntuShorts = () => {
  const [currentShort, setCurrentShort] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);

  const shorts: Short[] = [
    {
      id: 1,
      title: "Traditional Ugandan Dance Tutorial",
      creator: "Sarah Nakamya",
      thumbnail: "🎭",
      duration: "0:45",
      views: "12.3K",
      likes: 1240,
      comments: 89,
      description: "Learning the beautiful Kiganda dance moves! Join me as I teach the basic steps of our traditional dance. #UgandanCulture #TraditionalDance",
      hashtags: ["#UgandanCulture", "#TraditionalDance", "#Heritage", "#Ubuntu"],
      category: "culture",
      location: "Kampala, Uganda"
    },
    {
      id: 2,
      title: "Coding in Luganda - Variables",
      creator: "David Musoke",
      thumbnail: "💻",
      duration: "1:20",
      views: "8.7K",
      likes: 892,
      comments: 156,
      description: "Teaching programming concepts in Luganda! Today we learn about variables - 'ebirowoozo' in our local language. Making tech accessible for everyone!",
      hashtags: ["#CodingInLuganda", "#TechEducation", "#Programming", "#LocalLanguage"],
      category: "tech",
      location: "Makerere University"
    },
    {
      id: 3,
      title: "Ubuntu Philosophy Explained",
      creator: "Elder Mukasa",
      thumbnail: "🌍",
      duration: "2:15",
      views: "25.1K",
      likes: 2340,
      comments: 234,
      description: "Understanding 'Omuntu w'omuntu ku bantu' - the heart of Ubuntu philosophy. How this ancient wisdom applies to modern life and community building.",
      hashtags: ["#Ubuntu", "#Philosophy", "#Community", "#Wisdom"],
      category: "education",
      location: "Entebbe, Uganda"
    },
    {
      id: 4,
      title: "Street Food Adventures - Rolex",
      creator: "Grace Achieng",
      thumbnail: "🥚",
      duration: "1:05",
      views: "18.9K",
      likes: 1567,
      comments: 203,
      description: "Making the perfect Ugandan Rolex! Watch me create this delicious street food favorite. Recipe in the comments! 🔥",
      hashtags: ["#UgandanFood", "#StreetFood", "#Rolex", "#Cooking"],
      category: "entertainment",
      location: "Jinja, Uganda"
    },
    {
      id: 5,
      title: "Community Garden Project",
      creator: "James Kigozi",
      thumbnail: "🌱",
      duration: "1:30",
      views: "6.2K",
      likes: 634,
      comments: 78,
      description: "Our neighborhood came together to create this amazing community garden! See how Ubuntu spirit transforms spaces and lives. 🌿",
      hashtags: ["#CommunityGarden", "#Ubuntu", "#Sustainability", "#Together"],
      category: "community",
      location: "Nakawa, Kampala"
    }
  ];

  const currentShortData = shorts[currentShort];

  const nextShort = () => {
    setCurrentShort((prev) => (prev + 1) % shorts.length);
    resetInteractions();
  };

  const prevShort = () => {
    setCurrentShort((prev) => (prev - 1 + shorts.length) % shorts.length);
    resetInteractions();
  };

  const resetInteractions = () => {
    setIsPlaying(false);
    setLiked(false);
    setBookmarked(false);
    setShowComments(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      toast.info("▶️ Video would play here", {
        description: "Short video feature demo"
      });
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    if (!liked) {
      toast.success("Ubuntu love! ❤️", {
        description: "Supporting our creators"
      });
    }
  };

  const handleShare = () => {
    const text = `Check out "${currentShortData.title}" by ${currentShortData.creator} on Ubuntu Social! 🎬\n\n${currentShortData.hashtags.join(' ')}`;
    
    if (navigator.share) {
      navigator.share({
        title: currentShortData.title,
        text: text,
      });
    } else {
      navigator.clipboard.writeText(text);
      toast.success("Short link copied!");
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      culture: "bg-heritage/10 text-heritage",
      tech: "bg-primary/10 text-primary",
      education: "bg-accent/10 text-accent",
      entertainment: "bg-secondary/10 text-secondary",
      community: "bg-green-100 text-green-700"
    };
    return colors[category as keyof typeof colors] || colors.entertainment;
  };

  // Auto-advance shorts (optional)
  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        nextShort();
      }, 10000); // 10 seconds for demo
      return () => clearTimeout(timer);
    }
  }, [isPlaying, currentShort]);

  return (
    <Card className="p-0 bg-black text-white overflow-hidden max-w-sm mx-auto">
      {/* Video Area */}
      <div 
        ref={videoRef}
        className="relative aspect-[9/16] bg-gradient-to-br from-gray-900 to-black flex items-center justify-center cursor-pointer"
        onClick={togglePlay}
      >
        {/* Thumbnail/Video Placeholder */}
        <div className="text-8xl opacity-50">
          {currentShortData.thumbnail}
        </div>
        
        {/* Play/Pause Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <Button
              variant="ghost"
              size="lg"
              className="text-white hover:bg-white/20 rounded-full w-16 h-16"
            >
              <Play className="h-8 w-8 ml-1" />
            </Button>
          </div>
        )}

        {/* Top Controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <Badge className={getCategoryColor(currentShortData.category)}>
            {currentShortData.category}
          </Badge>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setIsMuted(!isMuted);
              }}
              className="text-white hover:bg-white/20 rounded-full w-8 h-8 p-0"
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 rounded-full w-8 h-8 p-0"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              prevShort();
            }}
            className="text-white hover:bg-white/20 rounded-full w-10 h-10 p-0"
          >
            <ChevronUp className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              nextShort();
            }}
            className="text-white hover:bg-white/20 rounded-full w-10 h-10 p-0"
          >
            <ChevronDown className="h-5 w-5" />
          </Button>
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-end justify-between">
            {/* Creator Info & Description */}
            <div className="flex-1 mr-4">
              <div className="flex items-center space-x-3 mb-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary text-white text-xs">
                    {currentShortData.creator.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-sm">{currentShortData.creator}</div>
                  {currentShortData.location && (
                    <div className="text-xs text-gray-300">{currentShortData.location}</div>
                  )}
                </div>
              </div>
              
              <h4 className="font-medium text-sm mb-1">{currentShortData.title}</h4>
              <p className="text-xs text-gray-300 line-clamp-2 mb-2">
                {currentShortData.description}
              </p>
              
              <div className="flex flex-wrap gap-1 mb-2">
                {currentShortData.hashtags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="text-xs text-blue-300">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center space-x-4 text-xs text-gray-300">
                <span>{currentShortData.views} views</span>
                <span>{currentShortData.duration}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike();
                }}
                className={`text-white hover:bg-white/20 rounded-full w-12 h-12 p-0 flex-col ${
                  liked ? 'text-red-500' : ''
                }`}
              >
                <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
                <span className="text-xs mt-1">
                  {(currentShortData.likes + (liked ? 1 : 0)).toLocaleString()}
                </span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowComments(!showComments);
                }}
                className="text-white hover:bg-white/20 rounded-full w-12 h-12 p-0 flex-col"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="text-xs mt-1">{currentShortData.comments}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleShare();
                }}
                className="text-white hover:bg-white/20 rounded-full w-12 h-12 p-0 flex-col"
              >
                <Share2 className="h-5 w-5" />
                <span className="text-xs mt-1">Share</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setBookmarked(!bookmarked);
                  toast.success(bookmarked ? "Removed from saved" : "Saved to watch later");
                }}
                className={`text-white hover:bg-white/20 rounded-full w-12 h-12 p-0 flex-col ${
                  bookmarked ? 'text-yellow-500' : ''
                }`}
              >
                <Bookmark className={`h-5 w-5 ${bookmarked ? 'fill-current' : ''}`} />
                <span className="text-xs mt-1">Save</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="flex space-x-1 p-2 bg-gray-900">
        {shorts.map((_, index) => (
          <div
            key={index}
            className={`h-1 flex-1 rounded ${
              index === currentShort ? 'bg-white' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    </Card>
  );
};

export default UbuntuShorts;