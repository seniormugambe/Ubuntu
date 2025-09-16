import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Quote } from "lucide-react";

const UbuntuQuotes = () => {
  const [currentQuote, setCurrentQuote] = useState(0);

  const quotes = [
    {
      text: "Omuntu w'omuntu ku bantu",
      translation: "A person is a person through other people",
      language: "Luganda",
      author: "Ubuntu Philosophy"
    },
    {
      text: "Umuntu ngumuntu ngabantu",
      translation: "I am because we are",
      language: "Zulu",
      author: "Ubuntu Philosophy"
    },
    {
      text: "Mtu ni watu",
      translation: "A person is people",
      language: "Kiswahili",
      author: "Ubuntu Philosophy"
    },
    {
      text: "If you want to go fast, go alone. If you want to go far, go together.",
      translation: "Community over individual success",
      language: "African Proverb",
      author: "Traditional Wisdom"
    },
    {
      text: "Okukola awamu kw'amaanyi",
      translation: "Working together is strength",
      language: "Luganda",
      author: "Ugandan Proverb"
    }
  ];

  const nextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % quotes.length);
  };

  useEffect(() => {
    const interval = setInterval(nextQuote, 8000); // Auto-rotate every 8 seconds
    return () => clearInterval(interval);
  }, []);

  const quote = quotes[currentQuote];

  return (
    <Card className="p-6 bg-gradient-ubuntu text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <pattern id="ubuntu-pattern" patternUnits="userSpaceOnUse" width="20" height="20">
            <circle cx="10" cy="10" r="2" fill="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#ubuntu-pattern)" />
        </svg>
      </div>

      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Quote className="h-5 w-5" />
            <span className="text-sm font-medium opacity-90">Ubuntu Wisdom</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={nextQuote}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-3">
          <blockquote className="text-lg font-medium italic">
            "{quote.text}"
          </blockquote>
          
          <div className="text-sm opacity-90">
            <div className="font-medium">{quote.translation}</div>
            <div className="text-xs opacity-75 mt-1">
              {quote.language} • {quote.author}
            </div>
          </div>
        </div>

        {/* Quote indicators */}
        <div className="flex space-x-2 justify-center pt-2">
          {quotes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuote(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentQuote 
                  ? 'bg-primary-foreground' 
                  : 'bg-primary-foreground/30 hover:bg-primary-foreground/50'
              }`}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default UbuntuQuotes;