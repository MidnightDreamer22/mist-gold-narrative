import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import ScrollToTop from "./components/ScrollToTop";
import CinematicBackground from "./components/CinematicBackground";
import Index from "./pages/Index";
import IntroReserve from "./pages/IntroReserve";
import History from "./pages/History";
import Menu from "./pages/Menu";
import Reservation from "./pages/Reservation";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const hideBackground = location.pathname.startsWith('/shop') || 
                        location.pathname.startsWith('/product') || 
                        location.pathname === '/checkout' ||
                        location.pathname.startsWith('/order-confirmation') ||
                        location.pathname === '/history' ||
                        location.pathname.startsWith('/menu') ||
                        location.pathname === '/reservation' ||
                        location.pathname === '/privacy';
  
  const hideFooter = location.pathname === '/checkout' ||
                     location.pathname.startsWith('/order-confirmation');

  return (
    <>
      {/* Cinematic Background Layer - Hidden on shop pages */}
      {!hideBackground && <CinematicBackground />}
      
      {/* Film grain overlay */}
      <div className="grain-overlay" />
      
      <Navigation />
      
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/intro-reserve" element={<IntroReserve />} />
        <Route path="/dive-in" element={<IntroReserve />} />
        <Route path="/history" element={<History />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/:menuId" element={<Menu />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:handle" element={<Product />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
        <Route path="/privacy" element={<Privacy />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      {!hideFooter && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
