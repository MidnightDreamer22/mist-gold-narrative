import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import heroVideo from '@/assets/hero-video.mp4';
import heroPoster from '@/assets/hero-video-poster.jpg';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ChevronDown } from 'lucide-react';

const Index = () => {
  useScrollReveal();

  return (
    <main className="min-h-screen">
      {/* Full-Screen Video Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={heroVideo}
          poster={heroPoster}
          autoPlay
          muted
          loop
          playsInline
        />
        
        {/* Dark Overlay (40% black) */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Centered Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
          <div className="text-center animate-fade-in" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>
            <h1 className="font-display text-display-xl md:text-[72px] lg:text-[96px] text-white mb-6 leading-none tracking-tight">
              Simona
            </h1>
            <p className="font-sans text-xl md:text-2xl text-white/90 tracking-[0.02em] font-light">
              Night stories in glass
            </p>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-bounce">
          <span className="font-sans text-sm text-white/70 tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-6 h-6 text-white/70" />
        </div>
      </section>

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
