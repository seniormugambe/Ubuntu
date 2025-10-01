import { useState } from "react";
import Navigation from "@/components/Navigation";
import AIPostCreator from "@/components/AIPostCreator";
import InteractivePost from "@/components/InteractivePost";
// import MediaRichPost from "@/components/MediaRichPost";
import AIRecommendations from "@/components/AIRecommendations";
import AIContentModerator from "@/components/AIContentModerator";
import AIInsights from "@/components/AIInsights";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Video, Brain, Shield, GraduationCap, Image, Music, MapPin } from "lucide-react";
import WelcomeCard from "@/components/WelcomeCard";
import OnboardingTips from "@/components/OnboardingTips";

const Feed = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      content: "Just launched my new app for connecting local farmers with markets! 🌾 Technology can truly transform our communities. #TechForGood #UgandaInnovation",
      author: "Sarah Nakamya",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      mood: "Excited",
      location: "Kampala, Uganda",
      likes: 45,
      comments: 12,
      shares: 8
    },
    {
      id: 2,
      content: "Webale nnyo banange! Thank you all for the warm welcome to Ubuntu Social. Feeling the true spirit of community here. Omuntu w'omuntu ku bantu! 🙏",
      author: "David Musoke",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      mood: "Grateful",
      location: "Entebbe, Uganda",
      likes: 78,
      comments: 23,
      shares: 15
    },
    {
      id: 3,
      content: "Beautiful sunset over Lake Victoria tonight. Sometimes we need to pause and appreciate the natural beauty around us. 🌅 #LakeVictoria #Uganda",
      author: "Grace Achieng",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      mood: "Thoughtful",
      location: "Jinja, Uganda",
      likes: 156,
      comments: 34,
      shares: 42
    }
  ]);

  const [mediaPosts] = useState([
    {
      id: 101,
      content: "Traditional Kiganda wedding ceremony was absolutely beautiful! Every moment captured the essence of our rich cultural heritage. 💒✨",
      author: "Sarah Nakamya",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      location: "Entebbe, Uganda",
      likes: 234,
      comments: 45,
      shares: 23,
      media: [
        {
          id: "m1",
          type: "image" as const,
          url: "/api/placeholder/800/600"
        },
        {
          id: "m2",
          type: "video" as const,
          url: "/api/placeholder/800/600",
          duration: "2:34"
        }
      ],
      tags: ["#Buganda", "#Wedding", "#Culture", "#Tradition"]
    },
    {
      id: 102,
      content: "New podcast episode exploring Ubuntu philosophy in modern African society! Featuring amazing community leaders sharing their wisdom. 🎙️",
      author: "David Ssemakula",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      location: "Kampala, Uganda",
      likes: 189,
      comments: 67,
      shares: 34,
      media: [
        {
          id: "m3",
          type: "audio" as const,
          url: "/api/placeholder/audio",
          duration: "45:23"
        }
      ],
      tags: ["#Podcast", "#Ubuntu", "#Philosophy", "#Community"]
    }
  ]);

  const handleNewPost = (newPost: any) => {
    setPosts(prev => [newPost, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      <Navigation />
      
      <main className="pt-20 pb-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-6">
            {/* AI Sidebar - Sticky */}
            <div className="lg:col-span-3 space-y-4">
              <div className="sticky top-24 space-y-4">
                <Card className="p-4 bg-gradient-to-br from-primary/5 via-accent/5 to-heritage/5 border-primary/10 backdrop-blur-sm animate-fade-in">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center">
                    <div className="p-1.5 rounded-lg bg-primary/10 mr-2">
                      <Brain className="h-4 w-4 text-primary" />
                    </div>
                    AI Features
                  </h3>
                  <div className="space-y-1">
                    <Button variant="ghost" className="w-full justify-start hover:bg-primary/10 hover:text-primary transition-all group" asChild>
                      <a href="/stories">
                        <BookOpen className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform" />
                        <span>AI Stories</span>
                      </a>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start hover:bg-accent/10 hover:text-accent transition-all group" asChild>
                      <a href="/stories">
                        <Video className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform" />
                        <span>Smart Shorts</span>
                      </a>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start hover:bg-heritage/10 hover:text-heritage transition-all group">
                      <Shield className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform" />
                      <span>AI Moderation</span>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start hover:bg-primary/10 hover:text-primary transition-all group" asChild>
                      <a href="/teach-ai">
                        <GraduationCap className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform" />
                        <span>Teach AI Culture</span>
                      </a>
                    </Button>
                  </div>
                </Card>

                <Card className="p-4 border-primary/10 animate-fade-in" style={{ animationDelay: '100ms' }}>
                  <h3 className="font-semibold text-foreground mb-3 flex items-center">
                    <div className="p-1.5 rounded-lg bg-accent/10 mr-2">
                      <Image className="h-4 w-4 text-accent" />
                    </div>
                    Media Gallery
                  </h3>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center hover-scale cursor-pointer transition-all hover:shadow-lg">
                      <Image className="h-6 w-6 text-primary" />
                    </div>
                    <div className="aspect-square bg-gradient-to-br from-heritage/20 to-primary/20 rounded-lg flex items-center justify-center hover-scale cursor-pointer transition-all hover:shadow-lg">
                      <Video className="h-6 w-6 text-heritage" />
                    </div>
                    <div className="aspect-square bg-gradient-to-br from-accent/20 to-heritage/20 rounded-lg flex items-center justify-center hover-scale cursor-pointer transition-all hover:shadow-lg">
                      <Music className="h-6 w-6 text-accent" />
                    </div>
                    <div className="aspect-square bg-gradient-to-br from-primary/20 to-heritage/20 rounded-lg flex items-center justify-center hover-scale cursor-pointer transition-all hover:shadow-lg">
                      <Image className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground text-center font-medium">
                    2.3K photos • 456 videos • 189 audio
                  </div>
                </Card>

                <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                  <AIRecommendations />
                </div>
              </div>
            </div>

            {/* Main Feed */}
            <div className="lg:col-span-6 space-y-5">
              <div className="animate-fade-in">
                <WelcomeCard />
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '50ms' }}>
                <OnboardingTips />
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
                <AIPostCreator onPost={handleNewPost} />
              </div>
              
              <div className="space-y-5">
                {/* Media-rich posts */}
                {mediaPosts.map((post, idx) => (
                  <Card key={post.id} className="overflow-hidden border-primary/10 hover:border-primary/20 transition-all hover:shadow-lg animate-fade-in group" style={{ animationDelay: `${150 + idx * 50}ms` }}>
                    <div className="p-6">
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-ubuntu rounded-full flex items-center justify-center text-white font-bold shadow-md group-hover:shadow-lg transition-shadow">
                          {post.author.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">{post.author}</h4>
                          <div className="text-sm text-muted-foreground flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {post.location}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-foreground mb-4 leading-relaxed">{post.content}</p>
                      
                      {/* Media Preview with improved design */}
                      <div className="relative bg-gradient-to-br from-primary/10 via-accent/10 to-heritage/10 rounded-xl p-10 mb-5 overflow-hidden group-hover:shadow-inner transition-all">
                        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                        <div className="relative text-center">
                          <div className="inline-flex items-center justify-center w-20 h-20 bg-background/80 backdrop-blur-sm rounded-2xl shadow-lg mb-4 group-hover:scale-110 transition-transform">
                            <Image className="h-10 w-10 text-primary" />
                          </div>
                          <div className="font-semibold text-foreground text-lg mb-1">Rich Media Content</div>
                          <div className="text-sm text-muted-foreground">
                            {post.media.length} media file{post.media.length !== 1 ? 's' : ''} • {post.tags.length} tags
                          </div>
                          <div className="flex flex-wrap justify-center gap-2 mt-3">
                            {post.tags.map((tag, i) => (
                              <span key={i} className="text-xs px-2.5 py-1 bg-primary/10 text-primary rounded-full font-medium hover:bg-primary/20 transition-colors cursor-pointer">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="px-6 pb-6 flex items-center justify-between border-t border-border/50 pt-4">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-heritage hover:bg-heritage/10 transition-all group/btn">
                          <span className="mr-2 group-hover/btn:scale-125 transition-transform inline-block">❤️</span>
                          <span className="font-semibold">{post.likes}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-accent hover:bg-accent/10 transition-all group/btn">
                          <span className="mr-2 group-hover/btn:scale-125 transition-transform inline-block">💬</span>
                          <span className="font-semibold">{post.comments}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all group/btn">
                          <span className="mr-2 group-hover/btn:scale-125 transition-transform inline-block">🔄</span>
                          <span className="font-semibold">{post.shares}</span>
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                        <span className="text-lg">•••</span>
                      </Button>
                    </div>
                  </Card>
                ))}
                
                {/* Regular posts */}
                {posts.map((post, idx) => (
                  <div key={post.id} className="animate-fade-in" style={{ animationDelay: `${250 + idx * 50}ms` }}>
                    <InteractivePost post={post} />
                  </div>
                ))}
              </div>

              {/* Load More with better styling */}
              <div className="text-center py-8 animate-fade-in" style={{ animationDelay: '400ms' }}>
                <Button variant="outline" className="px-8 hover:bg-primary/5 hover:border-primary/30 hover:text-primary transition-all">
                  Load More Posts
                </Button>
              </div>
            </div>

            {/* Right Sidebar - Insights & Moderation */}
            <div className="lg:col-span-3 space-y-4">
              <div className="sticky top-24 space-y-4">
                <div className="animate-fade-in" style={{ animationDelay: '150ms' }}>
                  <AIInsights />
                </div>
                <div className="animate-fade-in" style={{ animationDelay: '250ms' }}>
                  <AIContentModerator />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Feed;