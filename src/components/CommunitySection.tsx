import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import communityImage from "@/assets/community-connection.jpg";

const CommunitySection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 text-sm font-medium">
              Community First
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Where African Voices <span className="text-primary">Thrive</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience social media designed for African communities - from Luganda conversations 
              to Kiswahili content, every voice matters in our digital Ubuntu.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <Card className="p-6 border-primary/10 shadow-warm">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-ubuntu rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">AM</span>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-foreground">Amina Mukasa</h4>
                        <Badge variant="outline" className="text-xs">Kampala</Badge>
                      </div>
                      <p className="text-foreground">
                        Excited to share my startup journey! 🚀 Building the next fintech solution 
                        right here in Uganda. #AfricanInnovation #TechUganda
                      </p>
                      <div className="flex items-center space-x-6 pt-2">
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-heritage">
                          <Heart className="h-4 w-4 mr-1" />
                          124
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-accent">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          23
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                          <Share2 className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-accent/10 shadow-warm">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-golden rounded-full flex items-center justify-center">
                      <span className="text-foreground font-bold">JK</span>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-foreground">James Kigozi</h4>
                        <Badge variant="outline" className="text-xs">Entrepreneur</Badge>
                      </div>
                      <p className="text-foreground">
                        "Omuntu w'omuntu ku bantu" - A person is a person through other people. 
                        This Ubuntu philosophy drives everything we do at Ubuntu Social! 💫
                      </p>
                      <div className="flex items-center space-x-6 pt-2">
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-heritage">
                          <Heart className="h-4 w-4 mr-1" />
                          89
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-accent">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          15
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                          <Bookmark className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="text-center">
                <Button variant="ubuntu" size="lg">
                  Join Our Community
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img 
                  src={communityImage} 
                  alt="African community connecting through technology"
                  className="rounded-2xl shadow-glow w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-ubuntu rounded-2xl -z-10 opacity-20"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;