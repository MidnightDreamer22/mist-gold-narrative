import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import FullScreenPanel from '@/components/FullScreenPanel';
import AboutPanel from '@/components/panels/AboutPanel';
import GalleryPanel from '@/components/panels/GalleryPanel';
import MenuPanel from '@/components/panels/MenuPanel';
import MenuDetailPanel from '@/components/panels/MenuDetailPanel';
import ReservationPanel from '@/components/panels/ReservationPanel';
import heroVideo from '@/assets/hero-video.mp4';
import heroPoster from '@/assets/hero-video-poster.jpg';

const Index = () => {
  const [showCTA, setShowCTA] = useState(false);
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [selectedMenuCategory, setSelectedMenuCategory] = useState<string | null>(null);

  useEffect(() => {
    // Show CTA after hero animation completes
    const timer = setTimeout(() => {
      setShowCTA(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const scrollToNext = () => {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  };

  const openPanel = (panel: string) => {
    setActivePanel(panel);
    setSelectedMenuCategory(null);
  };

  const closePanel = () => {
    setActivePanel(null);
    setSelectedMenuCategory(null);
  };

  const openReservation = () => {
    setActivePanel('reservation');
  };

  const handleMenuCategorySelect = (categoryId: string) => {
    setSelectedMenuCategory(categoryId);
  };

  const getCategoryTitle = (id: string) => {
    const titles: Record<string, string> = {
      classics: "Simona's Classics",
      paloma: "Paloma List",
      spirit: "Spirit of the City"
    };
    return titles[id] || id;
  };

  // Listen for navigation events from Navigation component
  useEffect(() => {
    const handleNavigate = (e: CustomEvent) => {
      openPanel(e.detail.panel);
    };
    
    window.addEventListener('navigate-panel' as any, handleNavigate);
    return () => window.removeEventListener('navigate-panel' as any, handleNavigate);
  }, []);

  return (
    <>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section id="hero" className="snap-section relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={heroPoster}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-ink-900/40" />

          {/* Content */}
          <div className="relative z-10 text-center px-6">
            <h1 
              className="text-6xl md:text-8xl font-display text-mist-100 mb-6 tracking-tight"
              style={{ 
                animation: 'heroFadeIn 1200ms cubic-bezier(.16,1,.3,1) 800ms both',
                letterSpacing: '0.02em'
              }}
            >
              Simona
            </h1>
            <p 
              className="text-xl md:text-2xl text-mist-300 font-light tracking-wide mb-12"
              style={{ 
                animation: 'heroFadeIn 1200ms cubic-bezier(.16,1,.3,1) 1000ms both',
                letterSpacing: '0.1em'
              }}
            >
              Spirit of the City
            </p>

            {/* Dive In CTA */}
            {showCTA && (
              <Button
                onClick={openReservation}
                size="lg"
                className="bg-gold-400 hover:bg-gold-300 text-ink-900 text-lg px-8 py-6 rounded-full font-semibold shadow-heavy"
                style={{
                  animation: 'ctaEnter 600ms cubic-bezier(.16,1,.3,1) 120ms both',
                  minHeight: '44px'
                }}
              >
                Dive in
              </Button>
            )}
          </div>

          {/* Scroll Indicator */}
          <button
            onClick={scrollToNext}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 text-mist-300 hover:text-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400 rounded-full p-2"
            aria-label="Scroll to next section"
            style={{ 
              animation: 'bounce 2s ease-in-out infinite',
              transition: 'color 480ms cubic-bezier(.16,1,.3,1)'
            }}
          >
            <ChevronDown size={32} />
          </button>

          <style>{`
            @keyframes heroFadeIn {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            @keyframes ctaEnter {
              from {
                opacity: 0;
                transform: scale(0.98);
              }
              to {
                opacity: 1;
                transform: scale(1);
              }
            }
            
            @keyframes bounce {
              0%, 100% {
                transform: translateX(-50%) translateY(0);
              }
              50% {
                transform: translateX(-50%) translateY(-10px);
              }
            }
          `}</style>
        </section>
      </div>

      {/* Panels */}
      <FullScreenPanel
        isOpen={activePanel === 'about'}
        onClose={closePanel}
        title="About Simona"
      >
        <AboutPanel />
      </FullScreenPanel>

      <FullScreenPanel
        isOpen={activePanel === 'gallery'}
        onClose={closePanel}
        title="Gallery"
      >
        <GalleryPanel />
      </FullScreenPanel>

      <FullScreenPanel
        isOpen={activePanel === 'menu'}
        onClose={closePanel}
        title={selectedMenuCategory ? getCategoryTitle(selectedMenuCategory) : "Menu"}
      >
        {selectedMenuCategory ? (
          <MenuDetailPanel
            categoryId={selectedMenuCategory}
            categoryTitle={getCategoryTitle(selectedMenuCategory)}
            onBack={() => setSelectedMenuCategory(null)}
          />
        ) : (
          <MenuPanel onSelectCategory={handleMenuCategorySelect} />
        )}
      </FullScreenPanel>

      <FullScreenPanel
        isOpen={activePanel === 'reservation'}
        onClose={closePanel}
        title="Reservation"
      >
        <ReservationPanel />
      </FullScreenPanel>
    </>
  );
};

export default Index;
