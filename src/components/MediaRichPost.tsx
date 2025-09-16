import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Download,
  Eye,
  MapPin,
  MoreHorizontal,
  Image as ImageIcon,
  Video,
  Music
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

interface MediaItem {
  id: string;
  type: "image" | "video" | "audio";
  url: string;
  thumbnail?: string;
  duration?: string;
  size?: string;
}

interface MediaPost {
  id: number;
  content: string;
  author: string;
  timestamp: Date;
  location?: string;
  likes: number;
  comments: number;
  shares: number;
  media: MediaItem[];
  tags: string[];
}

const MediaRichPost = ({ post }: { post: MediaPost }) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [localLikes, setLocalLikes] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLocalLikes(prev => liked ? prev - 1 : prev + 1);
    
    if (!liked) {
      toast.success("Post liked! ❤️", {
        description: "Supporting community content"
      });
    }
  };

  const handleShare = () => {
    const text = `Check out this post by ${post.author} on Ubuntu Social!\n\n${post.content}\n\n${post.tags.join(' ')}`;
    
    if (navigator.share) {
      navigator.share({
        title: `Post by ${post.author}`,
        text: text,
      });
    } else {
      navigator.clipboard.writeText(text);
      toast.success("Post link copied!");
    }
  };

  const getMediaIcon = (type: string) => {
    switch (type) {
      case "image": return <ImageIcon className="h-4 w-4" />;
      case "video": return <Video className="h-4 w-4" />;
      case "audio": return <Music className="h-4 w-4" />;
      default: return <ImageIcon className="h-4 w-4" />;
    }
  };

  const getMediaTypeColor = (type: string) => {
    switch (type) {
      case "image": return "bg-blue-100 text-blue-700";
      case "video": return "bg-red-100 text-red-700";
      case "audio": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const renderMediaContent = (media: MediaItem, index: number) => {
    const isActive = index === currentMediaIndex;
    
    switch (media.type) {
      case "image":
        return (
          <div className="relative aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <ImageIcon className="h-16 w-16 text-blue-500" />
            </div>
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-lg font-semibold">High-Quality Image</div>
                <div className="text-sm opacity-90">Click to view full size</div>
              </div>
            </div>
            <div className="absolute top-2 left-2">
              <Badge className="bg-black/70 text-white text-xs">
                <ImageIcon className="h-3 w-3 mr-1" />
                Image
              </Badge>
            </div>
          </div>
        );
        
      case "video":
        return (
          <div className="relative aspect-video bg-gradient-to-br from-red-100 to-pink-100 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <Video className="h-16 w-16 text-red-500" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                variant="ghost"
                size="lg"
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 bg-black/50 rounded-full text-white hover:bg-black/70"
              >
                {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
              </Button>
            </div>
            <div className="absolute top-2 left-2">
              <Badge className="bg-black/70 text-white text-xs">
                <Video className="h-3 w-3 mr-1" />
                {media.duration || "Video"}
              </Badge>
            </div>
            <div className="absolute bottom-2 right-2 flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMuted(!isMuted)}
                className="bg-black/50 text-white hover:bg-black/70 h-8 w-8 p-0"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        );
        
      case "audio":
        return (
          <div className="relative aspect-video bg-gradient-to-br from-green-100 to-teal-100 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Music className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <Button
                  variant="ghost"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-green-500 text-white hover:bg-green-600"
                >
                  {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                  {isPlaying ? "Pause" : "Play"}
                </Button>
                <div className="text-sm text-green-600 mt-2">
                  {media.duration || "Audio"}
                </div>
              </div>
            </div>
            <div className="absolute top-2 left-2">
              <Badge className="bg-black/70 text-white text-xs">
                <Music className="h-3 w-3 mr-1" />
                Audio
              </Badge>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        {/* Post Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarFallback className="bg-gradient-ubuntu text-white">
                {post.author.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold text-foreground">{post.author}</h4>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>{formatDistanceToNow(post.timestamp)} ago</span>
                {post.location && (
                  <>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{post.location}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* Post Content */}
        <div className="mb-4">
          <p className="text-foreground leading-relaxed mb-3">
            {post.content}
          </p>
          
          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs hover:bg-primary/10 cursor-pointer">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Media Content */}
      {post.media.length > 0 && (
        <div className="px-6 pb-4">
          {/* Main Media Display */}
          <div className="mb-4">
            {renderMediaContent(post.media[currentMediaIndex], currentMediaIndex)}
          </div>

          {/* Media Navigation */}
          {post.media.length > 1 && (
            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-2 overflow-x-auto">
                {post.media.map((media, index) => (
                  <button
                    key={media.id}
                    onClick={() => setCurrentMediaIndex(index)}
                    className={`flex-shrink-0 p-2 rounded-lg border-2 transition-colors ${
                      index === currentMediaIndex 
                        ? 'border-primary bg-primary/10' 
                        : 'border-muted hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <div className={`p-1 rounded ${getMediaTypeColor(media.type)}`}>
                        {getMediaIcon(media.type)}
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-medium capitalize">{media.type}</div>
                        {media.duration && (
                          <div className="text-xs text-muted-foreground">{media.duration}</div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="flex items-center space-x-1">
                <span className="text-sm text-muted-foreground">
                  {currentMediaIndex + 1} / {post.media.length}
                </span>
              </div>
            </div>
          )}

          {/* Media Info */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <Eye className="h-3 w-3" />
                <span>Media</span>
              </span>
              <span>{post.media.length} file{post.media.length !== 1 ? 's' : ''}</span>
            </div>
            
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <Download className="h-3 w-3 mr-1" />
              Download
            </Button>
          </div>
        </div>
      )}

      {/* Post Actions */}
      <div className="px-6 pb-6">
        <div className="flex items-center justify-between pt-3 border-t border-muted/20">
          <div className="flex space-x-1">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLike}
              className={`${liked ? 'text-heritage hover:text-heritage' : 'text-muted-foreground hover:text-heritage'} transition-colors`}
            >
              <Heart className={`h-4 w-4 mr-1 ${liked ? 'fill-current' : ''}`} />
              {localLikes}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowComments(!showComments)}
              className="text-muted-foreground hover:text-accent"
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              {post.comments}
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
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setBookmarked(!bookmarked)}
            className={`${bookmarked ? 'text-secondary' : 'text-muted-foreground'} hover:text-secondary`}
          >
            <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default MediaRichPost;