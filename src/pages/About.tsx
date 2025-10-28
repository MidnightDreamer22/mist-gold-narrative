import CinematicPane from '@/components/CinematicPane';
import FrostCard from '@/components/FrostCard';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import aboutBg from '@/assets/about-background.jpg';
import { Sparkles, Music, Users } from 'lucide-react';

const About = () => {
  useScrollReveal();

  return (
    <main className="min-h-screen pt-20">
      {/* Split Panel Section */}
      <section className="min-h-screen flex flex-col md:flex-row">
        {/* Left - Cinematic Background */}
        <CinematicPane 
          imageUrl={aboutBg}
          className="md:w-3/5 min-h-[50vh] md:min-h-screen md:fixed md:left-0 md:top-0"
        />
        
        {/* Right - Content Card */}
        <div className="md:w-2/5 md:ml-[60%] bg-ink-900 p-8 md:p-16 flex items-center">
          <div className="max-w-xl" data-reveal>
            <FrostCard>
              <h1 className="font-display text-display-lg text-mist-100 mb-8">
                Our Story
              </h1>
              
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

              {/* Values */}
              <div className="mt-12 space-y-6">
                <h2 className="font-display text-display-md text-gold-400 mb-6">What We Believe</h2>
                
                <div className="flex gap-4 items-start" data-reveal>
                  <Sparkles className="w-6 h-6 text-gold-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-sans font-semibold text-mist-100 mb-1">Craft</h3>
                    <p className="text-sm text-mist-300">Every ingredient matters. Every technique refined. Excellence in the details.</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start" data-reveal>
                  <Music className="w-6 h-6 text-gold-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-sans font-semibold text-mist-100 mb-1">Atmosphere</h3>
                    <p className="text-sm text-mist-300">Carefully curated soundscapes, lighting, and design create an escape from the everyday.</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start" data-reveal>
                  <Users className="w-6 h-6 text-gold-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-sans font-semibold text-mist-100 mb-1">Connection</h3>
                    <p className="text-sm text-mist-300">Great drinks bring people together. We're here to facilitate those moments.</p>
                  </div>
                </div>
              </div>
            </FrostCard>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
