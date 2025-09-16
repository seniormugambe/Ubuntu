import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Video } from "lucide-react";
import { useState } from "react";

const TestStories = () => {
  const [activeTab, setActiveTab] = useState<"stories" | "shorts">("stories");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Ubuntu Stories & Shorts
            </h1>
            <p className="text-lg text-muted-foreground">
              Test page to verify Stories functionality
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-muted rounded-lg p-1 flex">
              <Button
                variant={activeTab === "stories" ? "default" : "ghost"}
                onClick={() => setActiveTab("stories")}
                className="flex items-center space-x-2"
              >
                <BookOpen className="h-4 w-4" />
                <span>Stories</span>
              </Button>
              <Button
                variant={activeTab === "shorts" ? "default" : "ghost"}
                onClick={() => setActiveTab("shorts")}
                className="flex items-center space-x-2"
              >
                <Video className="h-4 w-4" />
                <span>Shorts</span>
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-4xl mx-auto">
            {activeTab === "stories" ? (
              <Card className="p-8 text-center">
                <BookOpen className="h-16 w-16 mx-auto text-primary mb-4" />
                <h2 className="text-2xl font-bold text-foreground mb-2">Stories Tab</h2>
                <p className="text-muted-foreground">
                  This is the Stories tab. The functionality is working correctly!
                </p>
              </Card>
            ) : (
              <Card className="p-8 text-center">
                <Video className="h-16 w-16 mx-auto text-accent mb-4" />
                <h2 className="text-2xl font-bold text-foreground mb-2">Shorts Tab</h2>
                <p className="text-muted-foreground">
                  This is the Shorts tab. The functionality is working correctly!
                </p>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TestStories;