import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Video, Users, Compass } from "lucide-react";

const QuickActions = () => {
  return (
    <Card className="p-6 border-primary/10">
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
        
        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full justify-start hover:bg-primary/5"
            asChild
          >
            <a href="/stories">
              <BookOpen className="h-4 w-4 mr-3" />
              African Stories
            </a>
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start hover:bg-accent/5"
            asChild
          >
            <a href="/stories">
              <Video className="h-4 w-4 mr-3" />
              Ubuntu Shorts
            </a>
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start hover:bg-heritage/5"
          >
            <Users className="h-4 w-4 mr-3" />
            Find Communities
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start hover:bg-secondary/5"
          >
            <Compass className="h-4 w-4 mr-3" />
            Explore
          </Button>
        </div>
        
        <div className="pt-4 border-t border-muted/20">
          <div className="text-xs text-muted-foreground text-center">
            Discover more of Ubuntu Social
          </div>
        </div>
      </div>
    </Card>
  );
};

export default QuickActions;