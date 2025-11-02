import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import FullScreenPanel from '@/components/FullScreenPanel';
import AboutPanel from '@/components/panels/AboutPanel';
import GalleryPanel from '@/components/panels/GalleryPanel';
import MenuPanel from '@/components/panels/MenuPanel';
import MenuDetailPanel from '@/components/panels/MenuDetailPanel';
import ReservationPanel from '@/components/panels/ReservationPanel';
import { useFooterReveal } from '@/hooks/useFooterReveal';
import heroPoster from '@/assets/hero-video-poster.jpg';

const Index = () => {
  const navigate = useNavigate();
  const [showCTA, setShowCTA] = useState(false);
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [selectedMenuCategory, setSelectedMenuCategory] = useState<string | null>(null);
  const { footerRef, isVisible: footerVisible } = useFooterReveal();

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
                onClick={() => navigate('/intro-reserve')}
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

      {/* Gallery Intro Section */}
      <section id="gallery-intro" className="snap-section min-h-screen relative z-10 flex items-center justify-center">
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
                src="/src/assets/gallery-1.jpg" 
                alt="Gallery preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-6 order-1 md:order-2">
              <h2 className="text-5xl md:text-6xl font-display text-mist-100">
                Gallery
              </h2>
              <p className="text-xl text-mist-300 leading-relaxed">
                Step into our world through a curated collection of moments, 
                ambiance, and artistry.
              </p>
              <Button
                onClick={() => openPanel('gallery')}
                size="lg"
                className="bg-gold-400 hover:bg-gold-300 text-ink-900 text-lg px-8 py-6 rounded-full font-semibold"
              >
                Open
              </Button>
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
                onClick={() => openPanel('menu')}
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

      {/* Footer - wrapped in snap section */}
      <section 
        className="snap-section"
        style={{ 
          minHeight: '60vh',
          scrollSnapAlign: 'end',
          scrollSnapStop: 'always'
        }}
      >
        <footer 
          ref={footerRef}
          className="relative z-10 border-t border-border py-16"
          style={{
            minHeight: '480px',
            opacity: footerVisible ? 1 : 0,
            transform: footerVisible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 480ms var(--easing-enter), transform 480ms var(--easing-enter)'
          }}
        >
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-display text-mist-100">Location</h3>
              <p className="text-mist-300 leading-relaxed">
                80 Aram Street<br />
                Yerevan, Armenia
              </p>
              <a 
                href="https://maps.google.com/?q=80+Aram+Street,Yerevan,Armenia" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block text-gold-400 hover:underline text-sm"
              >
                View on Map →
              </a>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-display text-mist-100">Hours</h3>
              <p className="text-mist-300 leading-relaxed">
                Every day<br />
                <span className="text-gold-400 font-semibold">18:30 - 02:00</span>
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-display text-mist-100">Contact</h3>
              <div className="space-y-2 text-mist-300">
                <p>
                  <a href="tel:+37495426619" className="hover:text-gold-400 transition-colors">
                    +374 95 426 619
                  </a>
                </p>
                <p>
                  <a href="mailto:simonebarhome@gmail.com" className="hover:text-gold-400 transition-colors">
                    simonebarhome@gmail.com
                  </a>
                </p>
                <div className="flex gap-4 mt-4">
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gold-400 hover:text-gold-300 transition-colors"
                    aria-label="Instagram"
                  >
                    Instagram
                  </a>
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gold-400 hover:text-gold-300 transition-colors"
                    aria-label="Facebook"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border text-center">
            <p className="text-mist-300 text-sm">
              © {new Date().getFullYear()} Simona. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
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
