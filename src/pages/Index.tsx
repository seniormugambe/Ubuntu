import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import CommunitySection from "@/components/CommunitySection";
import SovereigntySection from "@/components/SovereigntySection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <CommunitySection />
        <SovereigntySection />
      </main>
    </div>
  );
};

export default Index;
