import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, Globe, Home, BookOpen, Video, Users, GraduationCap, Shield, Image } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/feed", label: "Feed", icon: Users },
    // { href: "/media", label: "Media", icon: Image },
    { href: "/stories", label: "Stories", icon: BookOpen },
    { href: "/teach-ai", label: "Teach AI", icon: GraduationCap },
    { href: "/sovereign", label: "Sovereign", icon: Shield },
  ];

  const isActive = (href: string) => {
    if (href === "/" && location.pathname === "/") return true;
    if (href !== "/" && location.pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-ubuntu rounded-lg flex items-center justify-center">
              <Globe className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <span className="font-bold text-lg text-foreground">Ubuntu Social</span>
              <Badge variant="outline" className="text-xs ml-2 bg-gradient-to-r from-blue-100 to-purple-100">
                AI-Powered
              </Badge>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.href}
                  variant={isActive(item.href) ? "default" : "ghost"}
                  asChild
                  className="flex items-center space-x-2"
                >
                  <a href={item.href}>
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </a>
                </Button>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ubuntu" size="sm">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground hover:bg-muted rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.href}
                    variant={isActive(item.href) ? "default" : "ghost"}
                    className="w-full justify-start"
                    asChild
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <a href={item.href}>
                      <Icon className="h-4 w-4 mr-3" />
                      {item.label}
                    </a>
                  </Button>
                );
              })}
              <div className="pt-3 border-t border-border/50">
                <Button variant="ubuntu" className="w-full">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;