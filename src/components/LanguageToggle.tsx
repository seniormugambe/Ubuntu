import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Globe } from "lucide-react";

const LanguageToggle = () => {
  const [currentLang, setCurrentLang] = useState("en");
  
  const languages = [
    { code: "en", name: "English", flag: "🇺🇬" },
    { code: "lg", name: "Luganda", flag: "🇺🇬" },
    { code: "sw", name: "Kiswahili", flag: "🇹🇿" },
  ];

  const greetings = {
    en: "Welcome to Ubuntu Social!",
    lg: "Tukusanyukidde ku Ubuntu Social!",
    sw: "Karibu Ubuntu Social!"
  };

  const nextLang = () => {
    const currentIndex = languages.findIndex(lang => lang.code === currentLang);
    const nextIndex = (currentIndex + 1) % languages.length;
    setCurrentLang(languages[nextIndex].code);
  };

  const currentLanguage = languages.find(lang => lang.code === currentLang);

  return (
    <div className="flex items-center space-x-3">
      <div className="text-sm text-muted-foreground">
        {greetings[currentLang as keyof typeof greetings]}
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={nextLang}
        className="flex items-center space-x-2 hover:bg-primary/10"
      >
        <Globe className="h-4 w-4" />
        <span>{currentLanguage?.flag}</span>
        <span>{currentLanguage?.name}</span>
      </Button>
    </div>
  );
};

export default LanguageToggle;