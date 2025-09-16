import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Rocket, 
  Building, 
  GraduationCap, 
  Lightbulb,
  TrendingUp,
  MapPin,
  Users,
  DollarSign,
  Award,
  Target,
  Zap,
  Globe
} from "lucide-react";

interface Innovation {
  id: string;
  title: string;
  description: string;
  category: "startup" | "research" | "policy" | "infrastructure" | "education";
  institution: string;
  location: string;
  stage: "concept" | "development" | "pilot" | "scaling" | "deployed";
  impact: "local" | "national" | "regional" | "global";
  funding: number;
  jobs: number;
  beneficiaries: number;
  sdgGoals: number[];
  partners: string[];
  timeline: string;
  featured: boolean;
}

const NationalInnovationTracker = () => {
  const [innovations, setInnovations] = useState<Innovation[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [nationalStats, setNationalStats] = useState({
    totalInnovations: 247,
    activeStartups: 89,
    researchProjects: 156,
    jobsCreated: 3450,
    fundingDeployed: 45.6,
    institutionsInvolved: 23
  });

  useEffect(() => {
    // Mock innovation data
    const mockInnovations: Innovation[] = [
      {
        id: "1",
        title: "AgriTech Mobile Platform for Smallholder Farmers",
        description: "AI-powered mobile app providing weather forecasts, crop advice, and market prices to smallholder farmers across Uganda in local languages.",
        category: "startup",
        institution: "Makerere University Innovation Hub",
        location: "Kampala",
        stage: "scaling",
        impact: "national",
        funding: 2.5,
        jobs: 45,
        beneficiaries: 15000,
        sdgGoals: [1, 2, 8, 9],
        partners: ["Ministry of Agriculture", "USAID", "Grameen Foundation"],
        timeline: "2022-2025",
        featured: true
      },
      {
        id: "2",
        title: "Solar-Powered Internet Kiosks for Rural Communities",
        description: "Deployment of solar-powered internet access points in rural areas, providing digital literacy training and e-government services.",
        category: "infrastructure",
        institution: "Uganda Communications Commission",
        location: "Nationwide",
        stage: "deployed",
        impact: "national",
        funding: 12.3,
        jobs: 234,
        beneficiaries: 50000,
        sdgGoals: [4, 7, 9, 10],
        partners: ["World Bank", "MTN Uganda", "Airtel Uganda"],
        timeline: "2021-2024",
        featured: true
      },
      {
        id: "3",
        title: "Blockchain-Based Land Registry System",
        description: "Secure, transparent land ownership records using blockchain technology to reduce disputes and improve property rights.",
        category: "policy",
        institution: "Ministry of Lands",
        location: "Kampala",
        stage: "pilot",
        impact: "national",
        funding: 5.8,
        jobs: 67,
        beneficiaries: 100000,
        sdgGoals: [1, 16],
        partners: ["World Bank", "Bitland", "Makerere University"],
        timeline: "2023-2026",
        featured: false
      },
      {
        id: "4",
        title: "AI-Powered Healthcare Diagnostics",
        description: "Machine learning system for early detection of malaria and tuberculosis using smartphone cameras and AI analysis.",
        category: "research",
        institution: "Mbarara University of Science & Technology",
        location: "Mbarara",
        stage: "development",
        impact: "regional",
        funding: 1.8,
        jobs: 23,
        beneficiaries: 25000,
        sdgGoals: [3, 9],
        partners: ["WHO", "Gates Foundation", "Kampala International University"],
        timeline: "2023-2025",
        featured: true
      },
      {
        id: "5",
        title: "Digital Skills Training for Youth",
        description: "Comprehensive digital literacy and coding bootcamp program targeting unemployed youth in urban and rural areas.",
        category: "education",
        institution: "Uganda Technology Association",
        location: "Multiple Cities",
        stage: "scaling",
        impact: "national",
        funding: 3.2,
        jobs: 156,
        beneficiaries: 8000,
        sdgGoals: [4, 8, 10],
        partners: ["Google", "Microsoft", "Andela"],
        timeline: "2022-2024",
        featured: false
      }
    ];

    setInnovations(mockInnovations);
  }, []);

  const categories = [
    { id: "all", label: "All Innovations", icon: Globe },
    { id: "startup", label: "Startups", icon: Rocket },
    { id: "research", label: "Research", icon: Lightbulb },
    { id: "policy", label: "Policy", icon: Building },
    { id: "infrastructure", label: "Infrastructure", icon: Zap },
    { id: "education", label: "Education", icon: GraduationCap }
  ];

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "deployed": return "bg-green-100 text-green-700 border-green-200";
      case "scaling": return "bg-blue-100 text-blue-700 border-blue-200";
      case "pilot": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "development": return "bg-orange-100 text-orange-700 border-orange-200";
      case "concept": return "bg-gray-100 text-gray-700 border-gray-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "global": return "bg-purple-100 text-purple-700";
      case "regional": return "bg-blue-100 text-blue-700";
      case "national": return "bg-green-100 text-green-700";
      case "local": return "bg-yellow-100 text-yellow-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getSDGColor = (goal: number) => {
    const colors = [
      "bg-red-500", "bg-yellow-500", "bg-green-500", "bg-red-600", "bg-orange-500",
      "bg-blue-500", "bg-yellow-600", "bg-purple-500", "bg-orange-600", "bg-pink-500",
      "bg-yellow-700", "bg-green-600", "bg-blue-600", "bg-blue-700", "bg-green-700",
      "bg-blue-800", "bg-purple-600"
    ];
    return colors[goal - 1] || "bg-gray-500";
  };

  const filteredInnovations = selectedCategory === "all" 
    ? innovations 
    : innovations.filter(innovation => innovation.category === selectedCategory);

  return (
    <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200/50">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
              <Rocket className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground">National Innovation Tracker</h3>
              <p className="text-sm text-muted-foreground">Uganda's Innovation Ecosystem Dashboard</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-gradient-to-r from-purple-100 to-blue-100">
            <Target className="h-3 w-3 mr-1" />
            Vision 2040
          </Badge>
        </div>

        {/* National Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white/80 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{nationalStats.totalInnovations}</div>
            <div className="text-xs text-muted-foreground">Active Innovations</div>
          </div>
          
          <div className="bg-white/80 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{nationalStats.activeStartups}</div>
            <div className="text-xs text-muted-foreground">Tech Startups</div>
          </div>
          
          <div className="bg-white/80 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{nationalStats.jobsCreated.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Jobs Created</div>
          </div>
          
          <div className="bg-white/80 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">${nationalStats.fundingDeployed}M</div>
            <div className="text-xs text-muted-foreground">Funding Deployed</div>
          </div>
          
          <div className="bg-white/80 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{nationalStats.researchProjects}</div>
            <div className="text-xs text-muted-foreground">Research Projects</div>
          </div>
          
          <div className="bg-white/80 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-indigo-600">{nationalStats.institutionsInvolved}</div>
            <div className="text-xs text-muted-foreground">Institutions</div>
          </div>
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

        {/* Innovation Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-foreground">Innovation Pipeline</h4>
            <Badge variant="outline">{filteredInnovations.length} projects</Badge>
          </div>

          {filteredInnovations.map((innovation) => (
            <div key={innovation.id} className={`bg-white/80 rounded-lg p-4 border ${innovation.featured ? 'border-purple-200 shadow-lg' : 'border-gray-100'}`}>
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h5 className="font-medium text-foreground">{innovation.title}</h5>
                      {innovation.featured && (
                        <Badge className="bg-purple-100 text-purple-700 text-xs">
                          <Award className="h-2 w-2 mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{innovation.description}</p>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Building className="h-3 w-3" />
                      <span>{innovation.institution}</span>
                      <span>•</span>
                      <MapPin className="h-3 w-3" />
                      <span>{innovation.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    <Badge className={getStageColor(innovation.stage)}>
                      {innovation.stage}
                    </Badge>
                    <Badge className={getImpactColor(innovation.impact)}>
                      {innovation.impact} impact
                    </Badge>
                  </div>
                </div>

                {/* Impact Metrics */}
                <div className="grid grid-cols-3 gap-4 bg-gray-50 rounded-lg p-3">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">${innovation.funding}M</div>
                    <div className="text-xs text-muted-foreground">Funding</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{innovation.jobs}</div>
                    <div className="text-xs text-muted-foreground">Jobs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">{innovation.beneficiaries.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Beneficiaries</div>
                  </div>
                </div>

                {/* SDG Goals */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-muted-foreground">SDG Goals:</span>
                  <div className="flex space-x-1">
                    {innovation.sdgGoals.map((goal) => (
                      <div
                        key={goal}
                        className={`w-6 h-6 ${getSDGColor(goal)} rounded text-white text-xs flex items-center justify-center font-bold`}
                      >
                        {goal}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Partners */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-muted-foreground">Partners:</span>
                  <div className="flex flex-wrap gap-1">
                    {innovation.partners.slice(0, 3).map((partner, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {partner}
                      </Badge>
                    ))}
                    {innovation.partners.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{innovation.partners.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Timeline */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <span>Timeline: {innovation.timeline}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-purple-600 hover:bg-purple-50">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Innovation Hubs */}
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-4">
          <h4 className="font-semibold text-purple-800 mb-3 flex items-center">
            <Building className="h-5 w-5 mr-2" />
            Key Innovation Hubs
          </h4>
          
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { name: "Makerere University Innovation Hub", projects: 45, location: "Kampala" },
              { name: "Mbarara Innovation Center", projects: 23, location: "Mbarara" },
              { name: "Gulu University Tech Hub", projects: 18, location: "Gulu" },
              { name: "Uganda Technology Association", projects: 34, location: "Kampala" }
            ].map((hub, index) => (
              <div key={index} className="bg-white/70 rounded p-3">
                <div className="font-medium text-purple-800">{hub.name}</div>
                <div className="text-sm text-purple-600">{hub.location} • {hub.projects} active projects</div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-white/80 rounded-lg p-4 border border-purple-200">
          <h4 className="font-semibold text-foreground mb-3 flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-purple-600" />
            Join Uganda's Innovation Ecosystem
          </h4>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Submit your innovation project for tracking</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Connect with other innovators and researchers</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Access funding opportunities and partnerships</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Showcase your impact on national development</span>
            </div>
          </div>
          
          <Button variant="outline" size="sm" className="w-full mt-3 text-purple-600 border-purple-200 hover:bg-purple-50">
            Register Your Innovation
          </Button>
        </div>

        <div className="text-center pt-4 border-t border-purple-200/50">
          <div className="flex items-center justify-center space-x-1 text-xs text-muted-foreground">
            <Rocket className="h-3 w-3" />
            <span>Building Uganda's knowledge economy through innovation and technology</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NationalInnovationTracker;