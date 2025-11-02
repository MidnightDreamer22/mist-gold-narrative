import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import CinematicBackground from "./components/CinematicBackground";
import Index from "./pages/Index";
import IntroReserve from "./pages/IntroReserve";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const handleNavigate = (panel: string) => {
    // Dispatch custom event that Index will listen to
    window.dispatchEvent(new CustomEvent('navigate-panel', { detail: { panel } }));
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* Cinematic Background Layer */}
          <CinematicBackground />
          
          {/* Film grain overlay */}
          <div className="grain-overlay" />
          
          <Navigation onNavigate={handleNavigate} />
          
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/intro-reserve" element={<IntroReserve />} />
            <Route path="/dive-in" element={<IntroReserve />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:handle" element={<Product />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
