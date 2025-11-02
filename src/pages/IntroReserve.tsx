import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useState, useEffect } from 'react';
import ReservationPanel from '@/components/panels/ReservationPanel';

const IntroReserve = () => {
  useScrollReveal();
  const [isClient, setIsClient] = useState(false);

  // Ensure client-side hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main className="min-h-screen pt-20">
      {/* Section 1: Introduction */}
      <section className="snap-section min-h-screen relative z-10 flex items-center justify-center bg-ink-900">
        <div 
          className="section-content container mx-auto px-6 py-20 max-w-4xl"
          data-motion
          style={{
            opacity: 0.96,
            transform: 'translateY(-18px)',
            animation: 'sectionEnter 560ms var(--easing-enter) forwards',
            animationDelay: '100ms'
          }}
        >
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl font-display text-mist-100 text-center">
              Welcome to Simona
            </h1>
            
            <div className="space-y-6 text-mist-300 font-sans leading-relaxed text-lg">
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
          </div>
        </div>
      </section>

      {/* Section 2: Reservation Module */}
      {isClient && <ReservationPanel />}
    </main>
  );
};

export default IntroReserve;
