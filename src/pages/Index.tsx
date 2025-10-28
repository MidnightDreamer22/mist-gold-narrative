import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CinematicPane from '@/components/CinematicPane';
import { Button } from '@/components/ui/button';
import heroPoster from '@/assets/hero-video-poster.jpg';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const Index = () => {
  useScrollReveal();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <CinematicPane 
        imageUrl={heroPoster}
        className="h-screen flex items-center justify-center"
      >
        <div className="container mx-auto px-6 text-center" data-reveal>
          <h1 className="font-display text-display-xl md:text-[72px] text-mist-100 mb-6 leading-none">
            Simona
          </h1>
          <p className="font-sans text-xl md:text-2xl text-mist-300 mb-12 max-w-2xl mx-auto tracking-wide">
            Night stories in glass
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/menu">
              <Button 
                size="lg" 
                className="bg-gold-400 text-ink-900 hover:bg-gold-300 font-sans tracking-wide px-8"
              >
                View Menu
              </Button>
            </Link>
            <Link to="/reservation">
              <Button 
                size="lg" 
                variant="outline"
                className="border-mist-300 text-mist-300 hover:bg-mist-300/10 font-sans tracking-wide px-8"
              >
                Reserve a Table
              </Button>
            </Link>
          </div>
        </div>
      </CinematicPane>

      {/* Preview Section */}
      <section className="py-24 px-6 bg-ink-900">
        <div className="container mx-auto max-w-4xl text-center" data-reveal>
          <h2 className="font-display text-display-lg text-mist-100 mb-6">
            Where craft meets atmosphere
          </h2>
          <p className="font-sans text-lg text-mist-300 leading-relaxed mb-12 max-w-2xl mx-auto">
            An intimate cocktail bar where every drink tells a story. 
            Experience elevated mixology in a cinematic setting that transforms the ordinary into extraordinary.
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div data-reveal>
              <h3 className="font-display text-display-md text-gold-400 mb-2">Craft</h3>
              <p className="text-mist-300 font-sans text-sm">Hand-crafted cocktails using premium spirits and fresh ingredients</p>
            </div>
            <div data-reveal>
              <h3 className="font-display text-display-md text-gold-400 mb-2">Atmosphere</h3>
              <p className="text-mist-300 font-sans text-sm">Noir-inspired interiors with soft lighting and curated music</p>
            </div>
            <div data-reveal>
              <h3 className="font-display text-display-md text-gold-400 mb-2">Experience</h3>
              <p className="text-mist-300 font-sans text-sm">Intimate service that makes every visit memorable</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
