import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Feed from "./pages/Feed";
import Stories from "./pages/Stories";
import TestStories from "./pages/TestStories";
import TeachAI from "./pages/TeachAI";
import SovereignPlatform from "./pages/SovereignPlatform";
// import MediaHub from "./pages/MediaHub";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/test-stories" element={<TestStories />} />
          <Route path="/teach-ai" element={<TeachAI />} />
          <Route path="/sovereign" element={<SovereignPlatform />} />
          {/* <Route path="/media" element={<MediaHub />} /> */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
