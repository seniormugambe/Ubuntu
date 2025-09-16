import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Globe, Shield, Users, Zap } from "lucide-react";
import heroImage from "@/assets/hero-digital-africa.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-earth overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Geometric Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" viewBox="0 0 100 100" className="h-full w-full">
          <pattern id="african-pattern" patternUnits="userSpaceOnUse" width="20" height="20">
            <path d="M 10,0 L 20,10 L 10,20 L 0,10 Z" fill="currentColor" className="text-primary"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#african-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-ubuntu bg-clip-text text-transparent leading-tight">
              Ubuntu Social
            </h1>
            <p className="text-xl md:text-2xl text-primary font-semibold">
              Empowered by Uganda's Sovereign Cloud
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Connect, share, and grow together on Africa's first AI-powered sovereign social platform. 
              Experience intelligent content creation, smart translations, and personalized cultural stories.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="ubuntu" size="lg" className="min-w-48" asChild>
              <a href="/feed">Start Connecting</a>
            </Button>
            <Button variant="sovereign" size="lg" className="min-w-48" asChild>
              <a href="/sovereign">Sovereign Platform</a>
            </Button>
          </div>

          {/* Feature Icons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-primary/10">
              <div className="space-y-3 text-center">
                <Shield className="h-8 w-8 mx-auto text-accent" />
                <h3 className="font-semibold text-foreground">Data Sovereignty</h3>
                <p className="text-sm text-muted-foreground">Your data stays in Africa</p>
              </div>
            </Card>
            
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-primary/10">
              <div className="space-y-3 text-center">
                <Globe className="h-8 w-8 mx-auto text-heritage" />
                <h3 className="font-semibold text-foreground">Cultural Identity</h3>
                <p className="text-sm text-muted-foreground">Celebrate African languages</p>
              </div>
            </Card>
            
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-primary/10">
              <div className="space-y-3 text-center">
                <Users className="h-8 w-8 mx-auto text-primary" />
                <h3 className="font-semibold text-foreground">Ubuntu Philosophy</h3>
                <p className="text-sm text-muted-foreground">I am because we are</p>
              </div>
            </Card>
            
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-primary/10">
              <div className="space-y-3 text-center">
                <Zap className="h-8 w-8 mx-auto text-secondary" />
                <h3 className="font-semibold text-foreground">Innovation Hub</h3>
                <p className="text-sm text-muted-foreground">Powered by local tech</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;