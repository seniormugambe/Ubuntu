import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  TrendingUp, 
  MapPin, 
  Users, 
  Star,
  Flame,
  Eye,
  Heart,
  Share2,
  Crown,
  Zap,
  Globe
} from "lucide-react";
import { toast } from "sonner";

interface LocalContent {
  id: string;
  title: string;
  creator: string;
  location: string;
  category: "business" | "culture" | "education" | "entertainment" | "news";
  engagement: number;
  localReach: number;
  isVerified: boolean;
  isTrending: boolean;
  supportLevel: "community" | "district" | "national";
  content: string;
  timestamp: Date;
}

const LocalContentBooster = () => {
  const [localContent, setLocalContent] = useState<LocalContent[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [userLocation] = useState("Kampala, Uganda");

  useEffect(() => {
    // Mock local content data
    const mockContent: LocalContent[] = [
      {
        id: "1",
        title: "New Matooke Processing Plant Opens in Masaka",
        creator: "Sarah Nakamya",
        location: "Masaka, Uganda",
        category: "business",
        engagement: 89,
        localReach: 2340,
        isVerified: true,
        isTrending: true,
        supportLevel: "district",
        content: "Exciting news! Our community-funded matooke processing plant is now operational, creating 150 local jobs and supporting 500+ farmers. This is Ubuntu in action! 🍌💪",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
      },
      {
        id: "2",
        title: "Traditional Kiganda Wedding Ceremony",
        creator: "James Mukasa",
        location: "Entebbe, Uganda",
        category: "culture",
        engagement: 156,
        localReach: 1890,
        isVerified: true,
        isTrending: true,
        supportLevel: "community",
        content: "Beautiful traditional wedding ceremony showcasing our rich Buganda culture. The bride price ceremony (kukyala) was absolutely stunning! 👰🏿🤵🏿",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000)
      },
      {
        id: "3",
        title: "Coding Bootcamp Graduates 50 Students",
        creator: "Grace Achieng",
        location: "Kampala, Uganda",
        category: "education",
        engagement: 234,
        localReach: 3450,
        isVerified: true,
        isTrending: false,
        supportLevel: "national",
        content: "Proud to announce that our Luganda-taught coding bootcamp has graduated 50 new developers! Making tech education accessible in our local language. 💻🎓",
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000)
      },
      {
        id: "4",
        title: "Local Artist's Music Video Goes Viral",
        creator: "David Ssemakula",
        location: "Jinja, Uganda",
        category: "entertainment",
        engagement: 567,
        localReach: 8900,
        isVerified: false,
        isTrending: true,
        supportLevel: "national",
        content: "My latest song 'Ubuntu Spirit' celebrating our community values has reached 100K views! Thank you for the love Uganda! 🎵❤️",
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000)
      }
    ];

    setLocalContent(mockContent);
  }, []);

  const categories = [
    { id: "all", label: "All Content", icon: Globe },
    { id: "business", label: "Business", icon: TrendingUp },
    { id: "culture", label: "Culture", icon: Star },
    { id: "education", label: "Education", icon: Users },
    { id: "entertainment", label: "Entertainment", icon: Flame },
    { id: "news", label: "News", icon: Eye }
  ];

  const getSupportLevelColor = (level: string) => {
    switch (level) {
      case "national": return "bg-red-100 text-red-700 border-red-200";
      case "district": return "bg-blue-100 text-blue-700 border-blue-200";
      case "community": return "bg-green-100 text-green-700 border-green-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getSupportLevelIcon = (level: string) => {
    switch (level) {
      case "national": return <Crown className="h-3 w-3" />;
      case "district": return <MapPin className="h-3 w-3" />;
      case "community": return <Users className="h-3 w-3" />;
      default: return <Star className="h-3 w-3" />;
    }
  };

  const handleBoostContent = (contentId: string) => {
    setLocalContent(prev => 
      prev.map(content => 
        content.id === contentId 
          ? { ...content, engagement: content.engagement + 10, localReach: content.localReach + 50 }
          : content
      )
    );

    toast.success("Content boosted! 🚀", {
      description: "Helping local creators reach more people in your community"
    });
  };

  const filteredContent = selectedCategory === "all" 
    ? localContent 
    : localContent.filter(content => content.category === selectedCategory);

  return (
    <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 border-orange-200/50">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground">Local Content Booster</h3>
              <p className="text-sm text-muted-foreground">Amplifying voices from {userLocation}</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-gradient-to-r from-orange-100 to-red-100">
            <MapPin className="h-3 w-3 mr-1" />
            Community First
          </Badge>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center space-x-1"
              >
                <Icon className="h-3 w-3" />
                <span>{category.label}</span>
              </Button>
            );
          })}
        </div>

        {/* Local Content Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-foreground">Trending in Your Area</h4>
            <Badge variant="outline">{filteredContent.length} posts</Badge>
          </div>

          {filteredContent.map((content) => (
            <div key={content.id} className="bg-white/80 rounded-lg p-4 border border-orange-100">
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-orange-100 text-orange-700">
                        {content.creator.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h5 className="font-medium text-foreground">{content.creator}</h5>
                        {content.isVerified && (
                          <Badge className="bg-blue-100 text-blue-700 text-xs">
                            <Star className="h-2 w-2 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{content.location}</span>
                        {content.isTrending && (
                          <Badge className="bg-red-100 text-red-700 text-xs">
                            <Flame className="h-2 w-2 mr-1" />
                            Trending
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <Badge className={getSupportLevelColor(content.supportLevel)}>
                    {getSupportLevelIcon(content.supportLevel)}
                    <span className="ml-1 capitalize">{content.supportLevel}</span>
                  </Badge>
                </div>

                {/* Content */}
                <div>
                  <h6 className="font-medium text-foreground mb-2">{content.title}</h6>
                  <p className="text-sm text-muted-foreground">{content.content}</p>
                </div>

                {/* Engagement Stats */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4 text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4" />
                      <span>{content.engagement}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{content.localReach.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Share2 className="h-4 w-4" />
                      <span>Share</span>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleBoostContent(content.id)}
                    className="text-orange-600 hover:bg-orange-50"
                  >
                    <Zap className="h-3 w-3 mr-1" />
                    Boost Local
                  </Button>
                </div>

                {/* Local Impact */}
                <div className="bg-orange-50 rounded-lg p-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-orange-700 font-medium">Local Impact Score</span>
                    <span className="text-orange-600 font-bold">{content.engagement + content.localReach / 10}/100</span>
                  </div>
                  <div className="w-full bg-orange-200 rounded-full h-1.5 mt-1">
                    <div 
                      className="bg-orange-500 h-1.5 rounded-full" 
                      style={{ width: `${Math.min((content.engagement + content.localReach / 10), 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-orange-600 mt-1">
                    Reaching {content.localReach.toLocaleString()} people in your community
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Local Creator Spotlight */}
        <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-lg p-4">
          <h4 className="font-semibold text-orange-800 mb-3 flex items-center">
            <Crown className="h-5 w-5 mr-2" />
            Featured Local Creator
          </h4>
          
          <div className="flex items-center space-x-3 mb-3">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-orange-200 text-orange-800">
                SN
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-orange-800">Sarah Nakamya</div>
              <div className="text-sm text-orange-600">Community Business Leader • Masaka</div>
              <div className="text-xs text-orange-600">2.3K local followers • 89% engagement</div>
            </div>
          </div>
          
          <p className="text-sm text-orange-700 mb-3">
            "Building sustainable businesses that create jobs and strengthen our local economy. 
            Every purchase from local businesses keeps money in our community!"
          </p>
          
          <Button variant="ghost" size="sm" className="text-orange-700 hover:bg-orange-50">
            Follow Local Creator
          </Button>
        </div>

        {/* Boost Your Content */}
        <div className="bg-white/80 rounded-lg p-4 border border-orange-200">
          <h4 className="font-semibold text-foreground mb-3 flex items-center">
            <Zap className="h-5 w-5 mr-2 text-orange-600" />
            Boost Your Local Content
          </h4>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span>Use local hashtags (#Kampala #Uganda #Buganda)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span>Tag your location for community visibility</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span>Share in local languages (Luganda, English)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span>Engage with other local creators</span>
            </div>
          </div>
          
          <Button variant="outline" size="sm" className="w-full mt-3 text-orange-600 border-orange-200 hover:bg-orange-50">
            Learn More About Local Boosting
          </Button>
        </div>

        <div className="text-center pt-4 border-t border-orange-200/50">
          <div className="flex items-center justify-center space-x-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>Supporting local voices and community-driven content</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LocalContentBooster;