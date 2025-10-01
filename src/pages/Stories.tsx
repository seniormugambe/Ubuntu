import Navigation from "@/components/Navigation";
import AIAfricanStories from "@/components/AIAfricanStories";
import UbuntuShorts from "@/components/UbuntuShorts";
import SimpleStories from "@/components/SimpleStories";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Video, Brain, Sparkles, TrendingUp } from "lucide-react";
import { useState } from "react";

const Stories = () => {
  const [activeTab, setActiveTab] = useState<"stories" | "shorts">("shorts");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <h1 className="text-4xl font-bold text-foreground">
                AI-Powered Ubuntu <span className="text-primary">Stories</span> & <span className="text-accent">Shorts</span>
              </h1>
              <Badge variant="outline" className="bg-gradient-to-r from-blue-100 to-purple-100">
                <Brain className="h-3 w-3 mr-1" />
                AI Enhanced
              </Badge>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Experience personalized African heritage through AI-curated stories, intelligent translations, 
              and culturally-aware content recommendations
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
                <Sparkles className="h-3 w-3" />
                <span>AI Stories</span>
              </Button>
              <Button
                variant={activeTab === "shorts" ? "default" : "ghost"}
                onClick={() => setActiveTab("shorts")}
                className="flex items-center space-x-2"
              >
                <Video className="h-4 w-4" />
                <Brain className="h-3 w-3" />
                <span>Smart Shorts</span>
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-6xl mx-auto">
            {activeTab === "stories" ? (
              <div className="space-y-8">
                {/* Simple Stories Component for Testing */}
                <SimpleStories />
                
                {/* AI Stories Component */}
                <AIAfricanStories />
                
                {/* Stories Stats & Info */}
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center p-6 bg-card rounded-lg border border-primary/10">
                    <BookOpen className="h-8 w-8 mx-auto text-primary mb-3" />
                    <div className="text-2xl font-bold text-foreground">500+</div>
                    <div className="text-sm text-muted-foreground">Traditional Stories</div>
                  </div>
                  
                  <div className="text-center p-6 bg-card rounded-lg border border-heritage/10">
                    <TrendingUp className="h-8 w-8 mx-auto text-heritage mb-3" />
                    <div className="text-2xl font-bold text-foreground">50+</div>
                    <div className="text-sm text-muted-foreground">African Languages</div>
                  </div>
                  
                  <div className="text-center p-6 bg-card rounded-lg border border-accent/10">
                    <Video className="h-8 w-8 mx-auto text-accent mb-3" />
                    <div className="text-2xl font-bold text-foreground">1000+</div>
                    <div className="text-sm text-muted-foreground">Audio Narrations</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Shorts Player */}
                <div className="lg:col-span-1 flex justify-center">
                  <UbuntuShorts />
                </div>
                
                {/* Shorts Info & Features */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-card rounded-lg p-6 border border-primary/10">
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      Ubuntu Shorts Features
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <div>
                          <h4 className="font-medium text-foreground">Cultural Content</h4>
                          <p className="text-sm text-muted-foreground">Traditional dances, music, and cultural practices</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                        <div>
                          <h4 className="font-medium text-foreground">Tech Education</h4>
                          <p className="text-sm text-muted-foreground">Programming tutorials in local languages</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-heritage rounded-full mt-2"></div>
                        <div>
                          <h4 className="font-medium text-foreground">Community Stories</h4>
                          <p className="text-sm text-muted-foreground">Real stories from Ubuntu Social members</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                        <div>
                          <h4 className="font-medium text-foreground">Local Creators</h4>
                          <p className="text-sm text-muted-foreground">Supporting African content creators</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Creator Spotlight */}
                  <div className="bg-gradient-ubuntu rounded-lg p-6 text-primary-foreground">
                    <h3 className="text-xl font-semibold mb-4">Creator Spotlight</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold">SN</span>
                        </div>
                        <div>
                          <div className="font-medium">Sarah Nakamya</div>
                          <div className="text-sm opacity-90">Cultural Dance Instructor</div>
                        </div>
                      </div>
                      <p className="text-sm opacity-90">
                        "Ubuntu Shorts gives me a platform to share our beautiful Ugandan culture with the world. 
                        Every dance tells a story, and every story connects us to our roots."
                      </p>
                    </div>
                  </div>

                  {/* Trending Hashtags */}
                  <div className="bg-card rounded-lg p-6 border border-secondary/10">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Trending on Shorts</h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "#UgandanCulture", "#TechEducation", "#Ubuntu", "#TraditionalDance",
                        "#CodingInLuganda", "#AfricanFood", "#CommunityGarden", "#Heritage"
                      ].map((tag) => (
                        <Badge key={tag} variant="outline" className="hover:bg-primary/10 cursor-pointer">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Stories;