import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Video, Users, X } from "lucide-react";
import { useState } from "react";

const WelcomeCard = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <Card className="p-6 bg-gradient-ubuntu text-primary-foreground relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 text-primary-foreground hover:bg-primary-foreground/20"
      >
        <X className="h-4 w-4" />
      </Button>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold mb-2">Welcome to Ubuntu Social! 🌍</h3>
          <p className="text-primary-foreground/90">
            Connect with African communities, share stories, and celebrate our heritage together.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Button
            variant="ghost"
            className="text-primary-foreground hover:bg-primary-foreground/20 justify-start"
            asChild
          >
            <a href="/feed">
              <Users className="h-4 w-4 mr-2" />
              Join Feed
            </a>
          </Button>
          
          <Button
            variant="ghost"
            className="text-primary-foreground hover:bg-primary-foreground/20 justify-start"
            asChild
          >
            <a href="/stories">
              <BookOpen className="h-4 w-4 mr-2" />
              Read Stories
            </a>
          </Button>
          
          <Button
            variant="ghost"
            className="text-primary-foreground hover:bg-primary-foreground/20 justify-start"
            asChild
          >
            <a href="/stories">
              <Video className="h-4 w-4 mr-2" />
              Watch Shorts
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default WelcomeCard;