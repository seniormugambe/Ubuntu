import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, Bookmark, MapPin, MoreHorizontal } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

interface Post {
  id: number;
  content: string;
  author: string;
  timestamp: Date;
  mood?: string;
  location?: string;
  likes: number;
  comments: number;
  shares: number;
}

const InteractivePost = ({ post }: { post: Post }) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [localLikes, setLocalLikes] = useState(post.likes);
  const [localComments, setLocalComments] = useState<string[]>([]);

  const handleLike = () => {
    setLiked(!liked);
    setLocalLikes(prev => liked ? prev - 1 : prev + 1);
    
    if (!liked) {
      toast.success("Ubuntu love shared! ❤️", {
        description: "Your appreciation strengthens our community"
      });
    }
  };

  const handleComment = () => {
    if (newComment.trim()) {
      setLocalComments(prev => [...prev, newComment]);
      setNewComment("");
      toast.success("Comment shared!", {
        description: "Your voice adds to our Ubuntu conversation"
      });
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getMoodEmoji = (mood: string) => {
    const moodMap: { [key: string]: string } = {
      "Happy": "😊",
      "Excited": "🚀", 
      "Motivated": "💪",
      "Thoughtful": "🤔",
      "Grateful": "❤️"
    };
    return moodMap[mood] || "";
  };

  return (
    <Card className="p-6 border-primary/10 shadow-warm hover:shadow-glow transition-all duration-300">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarFallback className="bg-gradient-ubuntu text-white">
                {getInitials(post.author)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold text-foreground">{post.author}</h4>
                {post.mood && (
                  <Badge variant="outline" className="text-xs">
                    {getMoodEmoji(post.mood)} {post.mood}
                  </Badge>
                )}
              </div>
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

        {/* Content */}
        <div className="text-foreground leading-relaxed">
          {post.content}
        </div>

        {/* Action Buttons */}
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
              {post.comments + localComments.length}
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
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

        {/* Comments Section */}
        {showComments && (
          <div className="space-y-4 pt-4 border-t border-muted/20">
            {/* Existing Comments */}
            {localComments.map((comment, index) => (
              <div key={index} className="flex space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-gradient-golden text-foreground text-xs">
                    YU
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 bg-muted rounded-lg p-3">
                  <div className="font-medium text-sm">You</div>
                  <div className="text-sm text-foreground">{comment}</div>
                </div>
              </div>
            ))}

            {/* Comment Input */}
            <div className="flex space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-gradient-golden text-foreground text-xs">
                  YU
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 flex space-x-2">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleComment()}
                  className="flex-1 bg-muted rounded-lg px-3 py-2 text-sm border-none outline-none focus:ring-2 focus:ring-primary/20"
                />
                <Button 
                  size="sm" 
                  onClick={handleComment}
                  disabled={!newComment.trim()}
                  variant="ubuntu"
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default InteractivePost;