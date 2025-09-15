import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Server, Lock, Zap, Globe2 } from "lucide-react";

const SovereigntySection = () => {
  return (
    <section className="py-24 bg-gradient-earth">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-accent text-accent">
              Digital Independence
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Powered by <span className="text-accent">Uganda's Sovereign Cloud</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Experience true digital sovereignty with infrastructure built by Africans, for Africans. 
              Your data, your privacy, your control - all secured within Uganda's national innovation ecosystem.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="p-6 text-center border-accent/20 bg-card/80 backdrop-blur-sm">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Server className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Local Infrastructure</h3>
              <p className="text-sm text-muted-foreground">
                Hosted on Uganda's sovereign cloud infrastructure
              </p>
            </Card>

            <Card className="p-6 text-center border-primary/20 bg-card/80 backdrop-blur-sm">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Data Protection</h3>
              <p className="text-sm text-muted-foreground">
                Your personal data never leaves African soil
              </p>
            </Card>

            <Card className="p-6 text-center border-secondary/30 bg-card/80 backdrop-blur-sm">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">High Performance</h3>
              <p className="text-sm text-muted-foreground">
                Lightning-fast connectivity across the continent
              </p>
            </Card>

            <Card className="p-6 text-center border-heritage/20 bg-card/80 backdrop-blur-sm">
              <div className="w-16 h-16 bg-heritage/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe2 className="h-8 w-8 text-heritage" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Continental Reach</h3>
              <p className="text-sm text-muted-foreground">
                Connecting African communities worldwide
              </p>
            </Card>
          </div>

          <div className="bg-card rounded-2xl p-8 md:p-12 border border-primary/10 shadow-warm">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="space-y-4">
                  <Badge variant="secondary" className="text-foreground">
                    National Innovation
                  </Badge>
                  <h3 className="text-3xl font-bold text-foreground">
                    Built with Uganda's 
                    <span className="text-primary block">Tech Ecosystem</span>
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Ubuntu Social is developed in partnership with Uganda's leading tech institutions, 
                    universities, and innovation hubs. We're not just using African infrastructure - 
                    we're building the future of African technology.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-foreground">Makerere University Partnership</h4>
                      <p className="text-sm text-muted-foreground">Research collaboration for AI and data science</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-foreground">Kampala Innovation Hub</h4>
                      <p className="text-sm text-muted-foreground">Startup incubation and talent development</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-foreground">Ministry of ICT Support</h4>
                      <p className="text-sm text-muted-foreground">Policy framework and infrastructure backing</p>
                    </div>
                  </div>
                </div>

                <Button variant="sovereign" size="lg">
                  Learn About Our Infrastructure
                </Button>
              </div>

              <div className="relative">
                <div className="bg-gradient-ubuntu rounded-2xl p-8 text-primary-foreground">
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold">99.9%</div>
                      <div className="text-sm opacity-90">Uptime Guarantee</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold">5ms</div>
                        <div className="text-xs opacity-90">Avg Latency</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">24/7</div>
                        <div className="text-xs opacity-90">Local Support</div>
                      </div>
                    </div>
                    
                    <div className="text-center pt-4 border-t border-primary-foreground/20">
                      <div className="text-sm opacity-90">Certified by</div>
                      <div className="font-semibold">Uganda Communications Commission</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SovereigntySection;