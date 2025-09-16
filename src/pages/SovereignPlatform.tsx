import Navigation from "@/components/Navigation";
import SovereignCloudStatus from "@/components/SovereignCloudStatus";
import LocalContentBooster from "@/components/LocalContentBooster";
import UgandanLanguageHub from "@/components/UgandanLanguageHub";
import NationalInnovationTracker from "@/components/NationalInnovationTracker";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Globe, 
  Users, 
  Zap,
  Heart,
  Star,
  Award,
  Flag,
  Crown,
  Sparkles
} from "lucide-react";
import { useState } from "react";

const SovereignPlatform = () => {
  const [activeSection, setActiveSection] = useState<"overview" | "cloud" | "content" | "language" | "innovation">("overview");

  const platformFeatures = [
    {
      title: "Data Sovereignty",
      description: "100% of user data stays within Uganda's borders",
      icon: Shield,
      color: "text-green-600",
      stats: "99.97% uptime"
    },
    {
      title: "Local Content Priority",
      description: "Ugandan creators and businesses get priority visibility",
      icon: Star,
      color: "text-orange-600",
      stats: "2.3K local creators"
    },
    {
      title: "Language Preservation",
      description: "Support for 40+ Ugandan indigenous languages",
      icon: Globe,
      color: "text-blue-600",
      stats: "15M+ speakers"
    },
    {
      title: "Innovation Ecosystem",
      description: "Connected to Uganda's national innovation infrastructure",
      icon: Zap,
      color: "text-purple-600",
      stats: "247 active projects"
    }
  ];

  const nationalPartners = [
    { name: "Ministry of ICT", role: "Policy & Regulation", logo: "🏛️" },
    { name: "Uganda Communications Commission", role: "Infrastructure", logo: "📡" },
    { name: "Makerere University", role: "Research & Innovation", logo: "🎓" },
    { name: "Bank of Uganda", role: "Digital Finance", logo: "🏦" },
    { name: "Uganda Investment Authority", role: "Economic Development", logo: "💼" },
    { name: "National IT Authority", role: "Digital Transformation", logo: "💻" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 pb-8">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 rounded-full flex items-center justify-center">
                <Flag className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-5xl font-bold text-foreground">
                  Uganda's <span className="text-green-600">Sovereign</span> Social Platform
                </h1>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <Badge className="bg-green-100 text-green-700">
                    <Shield className="h-3 w-3 mr-1" />
                    Data Sovereign
                  </Badge>
                  <Badge className="bg-yellow-100 text-yellow-700">
                    <Crown className="h-3 w-3 mr-1" />
                    Nationally Owned
                  </Badge>
                  <Badge className="bg-red-100 text-red-700">
                    <Heart className="h-3 w-3 mr-1" />
                    Community First
                  </Badge>
                </div>
              </div>
            </div>
            
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
              Built on Uganda's Sovereign Cloud infrastructure, powered by national innovation hubs, 
              and designed to serve African realities. Where local content thrives, indigenous languages flourish, 
              and community values guide technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="ubuntu" size="lg" className="min-w-48" asChild>
                <a href="/feed">Experience the Platform</a>
              </Button>
              <Button variant="outline" size="lg" className="min-w-48">
                Learn About Sovereignty
              </Button>
            </div>
          </div>

          {/* Platform Features Overview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {platformFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
                  <Badge variant="outline" className="text-xs">
                    {feature.stats}
                  </Badge>
                </Card>
              );
            })}
          </div>

          {/* Section Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-muted rounded-lg p-1 flex flex-wrap">
              <Button
                variant={activeSection === "overview" ? "default" : "ghost"}
                onClick={() => setActiveSection("overview")}
                size="sm"
              >
                Overview
              </Button>
              <Button
                variant={activeSection === "cloud" ? "default" : "ghost"}
                onClick={() => setActiveSection("cloud")}
                size="sm"
              >
                Sovereign Cloud
              </Button>
              <Button
                variant={activeSection === "content" ? "default" : "ghost"}
                onClick={() => setActiveSection("content")}
                size="sm"
              >
                Local Content
              </Button>
              <Button
                variant={activeSection === "language" ? "default" : "ghost"}
                onClick={() => setActiveSection("language")}
                size="sm"
              >
                Languages
              </Button>
              <Button
                variant={activeSection === "innovation" ? "default" : "ghost"}
                onClick={() => setActiveSection("innovation")}
                size="sm"
              >
                Innovation
              </Button>
            </div>
          </div>

          {/* Dynamic Content Sections */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {activeSection === "overview" && (
                <div className="space-y-8">
                  {/* National Partnership */}
                  <Card className="p-6 bg-gradient-to-r from-green-50 to-yellow-50">
                    <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center">
                      <Award className="h-6 w-6 mr-3 text-green-600" />
                      National Partnership Ecosystem
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Ubuntu Social is built in collaboration with Uganda's key national institutions, 
                      ensuring alignment with national development goals and digital transformation initiatives.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      {nationalPartners.map((partner, index) => (
                        <div key={index} className="bg-white/80 rounded-lg p-4 border border-green-100">
                          <div className="flex items-center space-x-3">
                            <div className="text-2xl">{partner.logo}</div>
                            <div>
                              <div className="font-medium text-foreground">{partner.name}</div>
                              <div className="text-sm text-muted-foreground">{partner.role}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Vision 2040 Alignment */}
                  <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
                    <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center">
                      <Sparkles className="h-6 w-6 mr-3 text-blue-600" />
                      Aligned with Uganda Vision 2040
                    </h3>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-white/70 rounded-lg">
                        <div className="text-3xl mb-2">🏭</div>
                        <div className="font-semibold text-blue-700">Industrial Economy</div>
                        <div className="text-sm text-muted-foreground">Supporting local businesses and manufacturing</div>
                      </div>
                      
                      <div className="text-center p-4 bg-white/70 rounded-lg">
                        <div className="text-3xl mb-2">🎓</div>
                        <div className="font-semibold text-purple-700">Knowledge Society</div>
                        <div className="text-sm text-muted-foreground">Promoting education and innovation</div>
                      </div>
                      
                      <div className="text-center p-4 bg-white/70 rounded-lg">
                        <div className="text-3xl mb-2">🌍</div>
                        <div className="font-semibold text-green-700">Global Competitiveness</div>
                        <div className="text-sm text-muted-foreground">Showcasing Uganda to the world</div>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {activeSection === "cloud" && <SovereignCloudStatus />}
              {activeSection === "content" && <LocalContentBooster />}
              {activeSection === "language" && <UgandanLanguageHub />}
              {activeSection === "innovation" && <NationalInnovationTracker />}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Platform Stats */}
              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-600" />
                  Platform Impact
                </h3>
                
                <div className="space-y-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">12.8K</div>
                    <div className="text-sm text-muted-foreground">Active Ugandan Users</div>
                  </div>
                  
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">2.3TB</div>
                    <div className="text-sm text-muted-foreground">Data Processed Daily</div>
                  </div>
                  
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">40+</div>
                    <div className="text-sm text-muted-foreground">Local Languages</div>
                  </div>
                  
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">89%</div>
                    <div className="text-sm text-muted-foreground">Local Content</div>
                  </div>
                </div>
              </Card>

              {/* Sovereignty Benefits */}
              <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50">
                <h3 className="font-semibold text-foreground mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-green-600" />
                  Sovereignty Benefits
                </h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-medium text-foreground">Data Protection</div>
                      <div className="text-muted-foreground">Your data never leaves Uganda</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-medium text-foreground">Economic Benefits</div>
                      <div className="text-muted-foreground">Revenue stays in Uganda</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-medium text-foreground">Cultural Preservation</div>
                      <div className="text-muted-foreground">Local languages and traditions</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-medium text-foreground">Innovation Support</div>
                      <div className="text-muted-foreground">Local tech ecosystem growth</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Get Involved</h3>
                
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="/feed">
                      <Users className="h-4 w-4 mr-3" />
                      Join the Community
                    </a>
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="/teach-ai">
                      <Globe className="h-4 w-4 mr-3" />
                      Teach AI Culture
                    </a>
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="/stories">
                      <Star className="h-4 w-4 mr-3" />
                      Share Stories
                    </a>
                  </Button>
                </div>
              </Card>

              {/* Recognition */}
              <Card className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50">
                <h3 className="font-semibold text-foreground mb-4 flex items-center">
                  <Award className="h-5 w-5 mr-2 text-yellow-600" />
                  Recognition
                </h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="text-lg">🏆</div>
                    <div>
                      <div className="font-medium text-foreground">Best Digital Platform 2024</div>
                      <div className="text-muted-foreground">Uganda ICT Awards</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="text-lg">🌟</div>
                    <div>
                      <div className="font-medium text-foreground">Innovation Excellence</div>
                      <div className="text-muted-foreground">African Union Recognition</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="text-lg">🛡️</div>
                    <div>
                      <div className="font-medium text-foreground">Data Sovereignty Leader</div>
                      <div className="text-muted-foreground">EAC Digital Summit</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SovereignPlatform;