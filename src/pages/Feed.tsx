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
import { BookOpen, Video, Brain, Shield, GraduationCap, Image, Music } from "lucide-react";
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
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 pb-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* AI Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              <Card className="p-4 bg-gradient-to-br from-blue-50 to-purple-50">
                <h3 className="font-semibold text-foreground mb-3 flex items-center">
                  <Brain className="h-4 w-4 mr-2 text-blue-600" />
                  AI Features
                </h3>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start text-blue-600 hover:bg-blue-100" asChild>
                    <a href="/stories">
                      <BookOpen className="h-4 w-4 mr-3" />
                      AI Stories
                    </a>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-purple-600 hover:bg-purple-100" asChild>
                    <a href="/stories">
                      <Video className="h-4 w-4 mr-3" />
                      Smart Shorts
                    </a>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-green-600 hover:bg-green-100">
                    <Shield className="h-4 w-4 mr-3" />
                    AI Moderation
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-emerald-600 hover:bg-emerald-100" asChild>
                    <a href="/teach-ai">
                      <GraduationCap className="h-4 w-4 mr-3" />
                      Teach AI Culture
                    </a>
                  </Button>
                  {/* Media Hub temporarily disabled */}
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold text-foreground mb-3 flex items-center">
                  <Image className="h-4 w-4 mr-2 text-purple-600" />
                  Media Gallery
                </h3>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                    <Image className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="aspect-square bg-gradient-to-br from-red-100 to-pink-100 rounded-lg flex items-center justify-center">
                    <Video className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="aspect-square bg-gradient-to-br from-green-100 to-teal-100 rounded-lg flex items-center justify-center">
                    <Music className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="aspect-square bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg flex items-center justify-center">
                    <Image className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="text-xs text-muted-foreground text-center">
                  2.3K photos • 456 videos • 189 audio
                </div>
              </Card>

              <AIRecommendations />
              <AIInsights />
              <AIContentModerator />
            </div>

            {/* Main Feed */}
            <div className="lg:col-span-3 space-y-4">
              <WelcomeCard />
              <OnboardingTips />
              <AIPostCreator onPost={handleNewPost} />
              
              <div className="space-y-6">
                {/* Media-rich posts */}
                {mediaPosts.map((post) => (
                  <Card key={post.id} className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="w-10 h-10 bg-gradient-ubuntu rounded-full flex items-center justify-center text-white font-bold">
                        {post.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{post.author}</h4>
                        <div className="text-sm text-muted-foreground">{post.location}</div>
                      </div>
                    </div>
                    
                    <p className="text-foreground mb-4">{post.content}</p>
                    
                    {/* Media Preview */}
                    <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg p-8 mb-4">
                      <div className="text-center">
                        <Image className="h-16 w-16 mx-auto text-blue-600 mb-3" />
                        <div className="font-semibold text-foreground">Rich Media Content</div>
                        <div className="text-sm text-muted-foreground">
                          {post.media.length} media file{post.media.length !== 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-4">
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-heritage">
                          ❤️ {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-accent">
                          💬 {post.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                          🔄 Share
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
                
                {/* Regular posts */}
                {posts.map((post) => (
                  <InteractivePost key={post.id} post={post} />
                ))}
              </div>

              {/* Load More */}
              <div className="text-center py-8">
                <Button variant="outline">
                  Load More Posts
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Feed;