import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import FullScreenPanel from '@/components/FullScreenPanel';
import AboutPanel from '@/components/panels/AboutPanel';
import ReservationPanel from '@/components/panels/ReservationPanel';
import DiveInModal from '@/components/DiveInModal';
import heroPoster from '@/assets/hero-video-poster.jpg';

const Index = () => {
  const navigate = useNavigate();
  const [showCTA, setShowCTA] = useState(false);
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [diveInModalOpen, setDiveInModalOpen] = useState(false);

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
  };

  const closePanel = () => {
    setActivePanel(null);
  };

  const openReservation = () => {
    setActivePanel('reservation');
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
        <section id="hero" className="snap-section relative min-h-screen flex items-center justify-center overflow-hidden z-10">

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
                onClick={() => setDiveInModalOpen(true)}
                size="lg"
                className="bg-gold-400 hover:bg-gold-300 text-ink-900 text-lg px-8 py-6 rounded-full font-semibold shadow-heavy"
                style={{
                  animation: 'ctaEnter 600ms cubic-bezier(.16,1,.3,1) 120ms both',
                  minHeight: '44px'
                }}
              >
                Dive In
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
            
            @keyframes sectionEnter {
              from {
                opacity: 0.96;
                transform: translateY(-18px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
        </section>
      </div>

      {/* About Intro Section */}
      <section id="about-intro" className="snap-section min-h-screen relative z-10 flex items-center justify-center">
        <div 
          className="section-content container mx-auto px-6 py-20 max-w-6xl"
          data-motion
          style={{
            opacity: 0.96,
            transform: 'translateY(-18px)',
            animation: 'sectionEnter 560ms var(--easing-enter) forwards',
            animationDelay: '100ms'
          }}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-6xl font-display text-mist-100">
                About Simona
              </h2>
              <p className="text-xl text-mist-300 leading-relaxed">
                Discover the story behind "Spirit of the City" — our philosophy, 
                heritage, and commitment to craft.
              </p>
              <Button
                onClick={() => openPanel('about')}
                size="lg"
                className="bg-gold-400 hover:bg-gold-300 text-ink-900 text-lg px-8 py-6 rounded-full font-semibold"
              >
                Open
              </Button>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <img 
                src="/src/assets/about-background.jpg" 
                alt="Simona interior"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Menu Intro Section */}
      <section id="menu-intro" className="snap-section min-h-screen relative z-10 flex items-center justify-center">
        <div 
          className="section-content container mx-auto px-6 py-20 max-w-6xl"
          data-motion
          style={{
            opacity: 0.96,
            transform: 'translateY(-18px)',
            animation: 'sectionEnter 560ms var(--easing-enter) forwards',
            animationDelay: '100ms'
          }}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-6xl font-display text-mist-100">
                Menu
              </h2>
              <p className="text-xl text-mist-300 leading-relaxed">
                Explore our signature cocktails — from timeless classics to 
                innovative creations inspired by the city.
              </p>
              <Button
                onClick={() => navigate('/menu')}
                size="lg"
                className="bg-gold-400 hover:bg-gold-300 text-ink-900 text-lg px-8 py-6 rounded-full font-semibold"
              >
                Open
              </Button>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <img 
                src="/src/assets/gallery-3.jpg" 
                alt="Cocktail menu preview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Reservation Intro Section */}
      <section id="reservation-intro" className="snap-section min-h-screen relative z-10 flex items-center justify-center">
        <div 
          className="section-content container mx-auto px-6 py-20 max-w-6xl"
          data-motion
          style={{
            opacity: 0.96,
            transform: 'translateY(-18px)',
            animation: 'sectionEnter 560ms var(--easing-enter) forwards',
            animationDelay: '100ms'
          }}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden order-2 md:order-1">
              <img 
                src="/src/assets/gallery-5.jpg" 
                alt="Reservation"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-6 order-1 md:order-2">
              <h2 className="text-5xl md:text-6xl font-display text-mist-100">
                Reservation
              </h2>
              <p className="text-xl text-mist-300 leading-relaxed">
                Reserve your table and join us for an unforgettable experience 
                at Simona.
              </p>
              <Button
                onClick={openReservation}
                size="lg"
                className="bg-gold-400 hover:bg-gold-300 text-ink-900 text-lg px-8 py-6 rounded-full font-semibold"
              >
                Open
              </Button>
            </div>
          </div>
        </div>
      </section>


      {/* Panels */}
      <FullScreenPanel
        isOpen={activePanel === 'about'}
        onClose={closePanel}
        title="About Simona"
      >
        <AboutPanel />
      </FullScreenPanel>

      <FullScreenPanel
        isOpen={activePanel === 'reservation'}
        onClose={closePanel}
        title="Reservation"
      >
        <ReservationPanel />
      </FullScreenPanel>

      {/* Dive In Modal */}
      <DiveInModal 
        isOpen={diveInModalOpen}
        onClose={() => setDiveInModalOpen(false)}
      />

      {/* Floating Dive In Button */}
      <button
        onClick={() => setDiveInModalOpen(true)}
        className="fixed bottom-8 right-8 z-50 bg-gold-400 hover:bg-gold-300 text-ink-900 px-6 py-4 rounded-full font-semibold shadow-heavy transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-ink-900"
        style={{
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
        }}
        aria-label="Open Dive In modal"
      >
        DIVE IN
      </button>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(201, 164, 108, 0.7);
          }
          50% {
            box-shadow: 0 0 0 12px rgba(201, 164, 108, 0);
          }
        }
      `}</style>
    </>
  );
};

export default Index;
