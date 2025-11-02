import CinematicPane from '../CinematicPane';
import FrostCard from '../FrostCard';
import aboutBg from '@/assets/about-background.jpg';

const AboutPanel = () => {
  return (
    <section className="snap-section grid md:grid-cols-2 min-h-screen">
      <CinematicPane imageUrl={aboutBg} />
      
      <div className="flex items-center justify-center p-8 md:p-12 bg-ink-900">
        <div className="section-content max-w-xl">
          <FrostCard>
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-display text-mist-100 mb-8">
                Our Story
              </h2>
              
              <div className="prose prose-invert max-w-none space-y-6 text-mist-300">
                <h3 className="text-3xl font-display text-gold-400">
                  The Spirit of the City
                </h3>
                
                <p className="text-lg leading-relaxed">
                  Born in 2016 Simona took its name from Simone de Beauvoir — a muse of freedom and thought — then softened to Simona, easier to say but never easier to forget.
                </p>
                
                <p className="leading-relaxed">
                  It began when Yerevan barely knew the language of mixology. From a tiny room, Simona poured its first crafted cocktails and spun its first vinyls of funk and house, igniting a movement that would reshape the city&apos;s nights.
                </p>
                
                <hr className="border-border my-6" />
                
                <p className="leading-relaxed italic">
                  Simona became more than a bar — a haven for artists, dreamers, and creators, where ideas mixed as freely as drinks.
                </p>
                
                <hr className="border-border my-6" />
                
                <p className="leading-relaxed">
                  Today, Simona remains what it has always been — a meeting point of sound and spirit, where every night tells a story and every glass remembers the rhythm of Yerevan.
                </p>
              </div>
            </div>
          </FrostCard>
        </div>
      </div>
    </section>
  );
};

export default AboutPanel;
