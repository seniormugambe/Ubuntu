import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Camera, MapPin, Send } from "lucide-react";
import { toast } from "sonner";

const PostCreator = ({ onPost }: { onPost: (post: any) => void }) => {
  const [content, setContent] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const [location, setLocation] = useState("");

  const moods = [
    { emoji: "😊", label: "Happy", color: "bg-yellow-100 text-yellow-800" },
    { emoji: "🚀", label: "Excited", color: "bg-blue-100 text-blue-800" },
    { emoji: "💪", label: "Motivated", color: "bg-green-100 text-green-800" },
    {
      emoji: "🤔",
      label: "Thoughtful",
      color: "bg-purple-100 text-purple-800",
    },
    { emoji: "❤️", label: "Grateful", color: "bg-red-100 text-red-800" },
  ];

  const handlePost = () => {
    if (!content.trim()) return;

    const newPost = {
      id: Date.now(),
      content,
      mood: selectedMood,
      location,
      timestamp: new Date(),
      author: "You",
      likes: 0,
      comments: 0,
      shares: 0,
    };

    onPost(newPost);
    setContent("");
    setSelectedMood("");
    setLocation("");

    toast.success("Ubuntu shared! 🌍", {
      description: "Your voice strengthens our community",
    });
  };

  return (
    <Card className="p-4 border-primary/10">
      <div className="flex space-x-3">
        <Avatar>
          <AvatarFallback className="bg-gradient-ubuntu text-white">
            YU
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-3">
          <Textarea
            placeholder="What's on your mind? Share with the Ubuntu community..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[80px] resize-none border-muted-foreground/20 focus:border-primary"
          />

          {/* Quick Actions */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground h-8 px-2"
              >
                <Camera className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground h-8 px-2"
              >
                <MapPin className="h-4 w-4" />
              </Button>
              {/* Quick mood selection */}
              {moods.slice(0, 3).map((mood) => (
                <Button
                  key={mood.label}
                  variant={selectedMood === mood.label ? "default" : "ghost"}
                  size="sm"
                  onClick={() =>
                    setSelectedMood(
                      selectedMood === mood.label ? "" : mood.label
                    )
                  }
                  className="h-8 px-2"
                  title={mood.label}
                >
                  {mood.emoji}
                </Button>
              ))}
            </div>

            <Button
              onClick={handlePost}
              disabled={!content.trim()}
              variant="ubuntu"
              size="sm"
            >
              Share
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PostCreator;
