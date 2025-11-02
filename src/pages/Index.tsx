import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import heroVideo from '@/assets/hero-video.mp4';
import heroPoster from '@/assets/hero-video-poster.jpg';
import aboutBg from '@/assets/about-background.jpg';
import gallery1 from '@/assets/gallery-1.jpg';
import gallery2 from '@/assets/gallery-2.jpg';
import gallery3 from '@/assets/gallery-3.jpg';
import gallery4 from '@/assets/gallery-4.jpg';
import gallery5 from '@/assets/gallery-5.jpg';
import gallery6 from '@/assets/gallery-6.jpg';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ChevronDown, Sparkles, Music, Users, X, Wine, Leaf, Star } from 'lucide-react';
import FrostCard from '@/components/FrostCard';
import CinematicPane from '@/components/CinematicPane';

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

const images: GalleryImage[] = [
  { src: gallery1, alt: 'Elegant cocktail with citrus garnish', category: 'Cocktails' },
  { src: gallery2, alt: 'Flaming cocktail preparation', category: 'Cocktails' },
  { src: gallery3, alt: 'Intimate bar interior', category: 'Interior' },
  { src: gallery4, alt: 'Colorful craft cocktails arrangement', category: 'Cocktails' },
  { src: gallery5, alt: 'Bartender portrait', category: 'People' },
  { src: gallery6, alt: 'Bar atmosphere with guests', category: 'Events' },
];

interface MenuItem {
  name: string;
  description: string;
  price: string;
  category: string;
  icon: typeof Wine;
  fullDescription: string;
  ingredients: string[];
  flavorNotes: string;
  allergens?: string;
}

const menuItems: MenuItem[] = [
  {
    name: "Velvet Noir",
    description: "A moody blend of aged rum, coffee liqueur, and dark chocolate",
    price: "$16",
    category: "Signature",
    icon: Wine,
    fullDescription: "Our signature creation that embodies the essence of Simona—dark, mysterious, and unforgettable. Aged rum meets the richness of coffee liqueur and dark chocolate, finished with a whisper of orange bitters.",
    ingredients: ["Aged dark rum (2 oz)", "Coffee liqueur (0.75 oz)", "Dark chocolate bitters", "Orange peel", "Fresh espresso"],
    flavorNotes: "Rich, velvety, with notes of cocoa, coffee, and subtle citrus",
    allergens: "Contains caffeine"
  },
  {
    name: "Smoke & Mirrors",
    description: "Mezcal, elderflower, fresh lime, activated with smoke",
    price: "$18",
    category: "Signature",
    icon: Leaf,
    fullDescription: "A theatrical experience that balances earthy mezcal with delicate elderflower and bright lime. Served under a glass dome filled with hickory smoke.",
    ingredients: ["Mezcal (2 oz)", "Elderflower liqueur (0.5 oz)", "Fresh lime juice", "Agave nectar", "Hickory smoke"],
    flavorNotes: "Smoky, floral, citrus-forward with earthy undertones",
    allergens: "Vegan"
  },
  {
    name: "The Last Word",
    description: "Classic gin, green Chartreuse, Maraschino, lime",
    price: "$15",
    category: "Classic",
    icon: Star,
    fullDescription: "A prohibition-era classic that remains timeless. Equal parts gin, green Chartreuse, Maraschino liqueur, and fresh lime juice create perfect harmony.",
    ingredients: ["London Dry Gin (0.75 oz)", "Green Chartreuse (0.75 oz)", "Maraschino liqueur (0.75 oz)", "Fresh lime juice (0.75 oz)"],
    flavorNotes: "Herbaceous, balanced, tart with subtle sweetness",
    allergens: "Contains tree nuts (Maraschino)"
  },
  {
    name: "Midnight in Paris",
    description: "Cognac, champagne, lavender, blackberries",
    price: "$17",
    category: "Signature",
    icon: Wine,
    fullDescription: "Romance in a glass. Premium cognac is elevated with fresh blackberries, a hint of lavender, and topped with champagne for elegance.",
    ingredients: ["VS Cognac (1.5 oz)", "Fresh blackberries", "Lavender syrup", "Champagne", "Lemon twist"],
    flavorNotes: "Sophisticated, fruity, floral with sparkling finish",
  },
  {
    name: "Old Fashioned",
    description: "Bourbon, bitters, sugar, orange",
    price: "$14",
    category: "Classic",
    icon: Star,
    fullDescription: "The cornerstone of cocktail culture, executed with precision. Premium bourbon, hand-chipped ice, and the perfect balance of bitters and sugar.",
    ingredients: ["Bourbon (2 oz)", "Angostura bitters", "Sugar cube", "Orange peel", "Luxardo cherry"],
    flavorNotes: "Bold, spirit-forward, subtly sweet with citrus oils",
  },
  {
    name: "Negroni Bianco",
    description: "Gin, Suze, Lillet Blanc, grapefruit",
    price: "$16",
    category: "Contemporary",
    icon: Leaf,
    fullDescription: "A lighter interpretation of the Italian classic. Gin and Suze provide bitterness, while Lillet Blanc adds floral notes, finished with fresh grapefruit.",
    ingredients: ["London Dry Gin (1 oz)", "Suze (1 oz)", "Lillet Blanc (1 oz)", "Grapefruit peel"],
    flavorNotes: "Bitter-sweet, citrus-forward, refreshingly complex",
  }
];

const Index = () => {
  useScrollReveal();
  const [showCTA, setShowCTA] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [reservationOpen, setReservationOpen] = useState(false);

  const categories = ['All', 'Cocktails', 'Interior', 'People', 'Events'];
  const filteredImages = filter === 'All' ? images : images.filter(img => img.category === filter);

  useEffect(() => {
    // Show CTA after hero animation completes (800ms delay + 1200ms duration + 120ms buffer)
    const timer = setTimeout(() => {
      setShowCTA(true);
    }, 2120);
    return () => clearTimeout(timer);
  }, []);

  const scrollToNext = () => {
    const aboutSection = document.querySelector('#about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen">
      {/* HERO SECTION */}
      <section id="hero" className="snap-section relative h-screen w-full overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={heroVideo}
          poster={heroPoster}
          autoPlay
          muted
          loop
          playsInline
        />
        
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
          <div className="text-center animate-fade-in" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>
            <h1 className="font-display text-display-xl md:text-[72px] lg:text-[96px] text-white mb-6 leading-none tracking-tight">
              Simona
            </h1>
            <p className="font-sans text-xl md:text-2xl text-white/90 tracking-[0.02em] font-light">
              Night stories in glass
            </p>
          </div>

          {/* CTA Button - appears after animation */}
          {showCTA && (
            <div 
              className="mt-12 animate-fade-in"
              style={{ 
                animationDelay: '120ms', 
                animationDuration: '600ms',
                animationFillMode: 'both',
                animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <Button
                size="lg"
                onClick={() => setReservationOpen(true)}
                className="bg-gold-400 text-ink-900 hover:bg-gold-300 font-sans tracking-wide px-10 py-6 text-lg rounded-full min-h-[44px] shadow-heavy hover:shadow-glow transition-all duration-300 focus:ring-4 focus:ring-gold-400/50 focus:ring-offset-2 focus:ring-offset-transparent"
              >
                Reserve a table
              </Button>
            </div>
          )}
        </div>
        
        <button
          onClick={scrollToNext}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-bounce cursor-pointer hover:text-gold-400 transition-colors group"
          aria-label="Scroll to next section"
        >
          <span className="font-sans text-sm text-white/70 group-hover:text-gold-400 tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-6 h-6 text-white/70 group-hover:text-gold-400" />
        </button>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="snap-section min-h-screen flex flex-col md:flex-row section-content">
        <CinematicPane 
          imageUrl={aboutBg}
          className="md:w-3/5 min-h-[50vh] md:min-h-screen"
        />
        
        <div className="md:w-2/5 bg-ink-900 p-8 md:p-16 flex items-center">
          <div className="max-w-xl" data-reveal>
            <FrostCard>
              <h2 className="font-display text-display-lg text-mist-100 mb-8">
                Our Story
              </h2>
              
              <div className="space-y-6 text-mist-300 font-sans leading-relaxed">
                <p>
                  Simona was born from a simple idea: that the perfect cocktail is more than just spirits and ice—it's a moment, a memory, a story waiting to unfold in the dim glow of amber light.
                </p>
                
                <p>
                  Founded in the heart of the city, we've crafted a space where time slows down. Where conversations deepen over perfectly balanced drinks. Where every detail, from the music to the glassware, is intentional.
                </p>
                
                <p>
                  Our mixologists are storytellers, each cocktail a carefully composed narrative of flavor, technique, and inspiration. We source rare spirits, press fresh juices daily, and approach each order with the care it deserves.
                </p>
              </div>

              <div className="mt-12 space-y-6">
                <h3 className="font-display text-display-md text-gold-400 mb-6">What We Believe</h3>
                
                <div className="flex gap-4 items-start" data-reveal>
                  <Sparkles className="w-6 h-6 text-gold-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-sans font-semibold text-mist-100 mb-1">Craft</h4>
                    <p className="text-sm text-mist-300">Every ingredient matters. Every technique refined. Excellence in the details.</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start" data-reveal>
                  <Music className="w-6 h-6 text-gold-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-sans font-semibold text-mist-100 mb-1">Atmosphere</h4>
                    <p className="text-sm text-mist-300">Carefully curated soundscapes, lighting, and design create an escape from the everyday.</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start" data-reveal>
                  <Users className="w-6 h-6 text-gold-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-sans font-semibold text-mist-100 mb-1">Connection</h4>
                    <p className="text-sm text-mist-300">Great drinks bring people together. We're here to facilitate those moments.</p>
                  </div>
                </div>
              </div>
            </FrostCard>
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" className="snap-section min-h-screen py-20 bg-ink-900 section-content">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12" data-reveal>
            <h2 className="font-display text-display-lg md:text-display-xl text-mist-100 mb-4">
              Gallery
            </h2>
            <p className="font-sans text-lg text-mist-300 max-w-2xl mx-auto">
              Moments captured in glass and light
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center mb-12" data-reveal>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full font-sans text-sm tracking-wide transition-all ${
                  filter === cat
                    ? 'bg-gold-400 text-ink-900'
                    : 'bg-ink-700 text-mist-300 hover:bg-ink-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredImages.map((image, index) => (
              <div 
                key={index}
                data-reveal
                className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-sm"
                onClick={() => setSelectedImage(index)}
              >
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-auto transition-all duration-600 group-hover:scale-105 group-hover:saturate-50"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-ink-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-mist-300 font-sans text-sm">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>

          {selectedImage !== null && (
            <div 
              className="fixed inset-0 z-50 bg-ink-900/98 flex items-center justify-center p-6"
              onClick={() => setSelectedImage(null)}
            >
              <button 
                className="absolute top-6 right-6 text-mist-300 hover:text-gold-400 transition-colors"
                onClick={() => setSelectedImage(null)}
                aria-label="Close lightbox"
              >
                <X size={32} />
              </button>
              
              <img 
                src={filteredImages[selectedImage].src}
                alt={filteredImages[selectedImage].alt}
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              
              <div className="absolute bottom-6 left-6 right-6 text-center">
                <p className="text-mist-300 font-sans">
                  {filteredImages[selectedImage].alt}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* MENU SECTION */}
      <section id="menu" className="snap-section min-h-screen py-20 bg-ink-700 section-content">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16" data-reveal>
            <h2 className="font-display text-display-lg md:text-display-xl text-mist-100 mb-4">
              Our Menu
            </h2>
            <p className="font-sans text-lg text-mist-300 max-w-2xl mx-auto">
              Each drink is a carefully crafted story
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {menuItems.map((item, index) => (
              <div
                key={index}
                data-reveal
                onClick={() => setSelectedMenuItem(item)}
                className="bg-ink-900/60 backdrop-blur-sm p-8 rounded-sm border border-mist-300/10 hover:border-gold-400/30 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <item.icon className="w-6 h-6 text-gold-400 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-display text-display-sm text-mist-100 group-hover:text-gold-400 transition-colors">
                        {item.name}
                      </h3>
                      <span className="font-sans text-gold-400 font-semibold ml-4">{item.price}</span>
                    </div>
                    <p className="text-sm text-mist-300 font-sans leading-relaxed mb-2">
                      {item.description}
                    </p>
                    <span className="text-xs text-gold-400/70 font-sans uppercase tracking-wide">
                      {item.category}
                    </span>
                    <p className="text-xs text-mist-300/60 mt-2 font-sans italic group-hover:text-mist-300 transition-colors">
                      Tap to view details
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Menu Item Detail Dialog */}
        <Dialog open={selectedMenuItem !== null} onOpenChange={() => setSelectedMenuItem(null)}>
          <DialogContent className="max-w-2xl bg-ink-900/95 backdrop-blur-sm border-gold-400/20">
            {selectedMenuItem && (
              <>
                <DialogHeader>
                  <DialogTitle className="font-display text-display-md text-gold-400 flex items-center gap-3">
                    <selectedMenuItem.icon className="w-8 h-8" />
                    {selectedMenuItem.name}
                  </DialogTitle>
                  <DialogDescription className="text-mist-300 text-base mt-2">
                    {selectedMenuItem.fullDescription}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 mt-6">
                  <div>
                    <h4 className="font-sans font-semibold text-mist-100 mb-3">Ingredients</h4>
                    <ul className="space-y-2">
                      {selectedMenuItem.ingredients.map((ingredient, i) => (
                        <li key={i} className="text-sm text-mist-300 font-sans flex items-start gap-2">
                          <span className="text-gold-400">•</span>
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-sans font-semibold text-mist-100 mb-2">Flavor Profile</h4>
                    <p className="text-sm text-mist-300 font-sans italic">{selectedMenuItem.flavorNotes}</p>
                  </div>

                  {selectedMenuItem.allergens && (
                    <div>
                      <h4 className="font-sans font-semibold text-mist-100 mb-2">Note</h4>
                      <p className="text-sm text-mist-300 font-sans">{selectedMenuItem.allergens}</p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-mist-300/10">
                    <div className="flex justify-between items-center">
                      <span className="font-display text-display-sm text-gold-400">{selectedMenuItem.price}</span>
                      <Button 
                        onClick={() => {
                          setSelectedMenuItem(null);
                          setReservationOpen(true);
                        }}
                        className="bg-gold-400 text-ink-900 hover:bg-gold-300"
                      >
                        Reserve to try this
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </section>

      {/* FOOTER / RESERVATION NOTE */}
      <section id="reservation" className="snap-section min-h-screen bg-ink-900 flex items-center justify-center section-content">
        <div className="container mx-auto px-6 text-center" data-reveal>
          <h2 className="font-display text-display-xl text-mist-100 mb-8">
            Join us
          </h2>
          <p className="font-sans text-xl text-mist-300 mb-12 max-w-2xl mx-auto">
            Reserve your table and experience the stories we pour
          </p>
          <Button
            size="lg"
            onClick={() => setReservationOpen(true)}
            className="bg-gold-400 text-ink-900 hover:bg-gold-300 font-sans tracking-wide px-12 py-6 text-lg rounded-full shadow-heavy hover:shadow-glow transition-all duration-300"
          >
            Make a reservation
          </Button>

          <div className="mt-16 text-mist-300/60 font-sans text-sm space-y-2">
            <p>Open Tuesday – Saturday, 6PM – 2AM</p>
            <p>123 Noir Street, Downtown</p>
          </div>
        </div>
      </section>

      {/* Reservation Dialog */}
      <Dialog open={reservationOpen} onOpenChange={setReservationOpen}>
        <DialogContent className="max-w-md bg-ink-900/95 backdrop-blur-sm border-gold-400/20">
          <DialogHeader>
            <DialogTitle className="font-display text-display-md text-gold-400">
              Reserve a table
            </DialogTitle>
            <DialogDescription className="text-mist-300">
              Call us at (555) 123-4567 or email reservations@simona.bar to book your experience.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <p className="text-mist-300 font-sans text-sm">
              We accept reservations for parties of 2-8 guests. Walk-ins are welcome based on availability.
            </p>
            <div className="pt-4 border-t border-mist-300/10">
              <p className="text-mist-300/80 font-sans text-xs">
                For private events and large groups, please contact us at least 48 hours in advance.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default Index;
