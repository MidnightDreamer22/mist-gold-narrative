import { useEffect, useRef, useState } from 'react';
import { Book, Mountain, Award, Clock } from 'lucide-react';

const History = () => {
  const [scrollY, setScrollY] = useState(0);
  const sectionsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const storyParts = [
    {
      icon: Book,
      title: 'The Origins',
      content: [
        'In the shadow of Mount Ararat, where Noah\'s ark is said to have rested, the story of Armenian brandy began over a century ago. The unique terroir of the Ararat Valley, blessed with mineral-rich soil and abundant sunlight, proved perfect for cultivating the finest white grapes.',
        'Legend tells of ancient winemakers who discovered that the spirits aged in oak barrels beneath the mountain developed an unparalleled complexity and smoothness. This discovery would lay the foundation for what would become one of the world\'s most celebrated brandies.',
        'The tradition passed from generation to generation, each master distiller adding their own secrets to the craft, creating a legacy that would eventually capture the attention of royalty and connoisseurs worldwide.'
      ]
    },
    {
      icon: Mountain,
      title: 'The Craftsmanship',
      content: [
        'The art of Ararat brandy-making follows time-honored traditions that have remained unchanged for over 140 years. Every drop begins with carefully selected white grapes, harvested at the precise moment of perfect ripeness when sugar and acid achieve perfect harmony.',
        'Master distillers employ a double-distillation process in traditional copper pot stills, a method that concentrates the essence of the grape while removing impurities. The resulting eau-de-vie is then transferred to Armenian oak barrels, where the magic of aging begins.',
        'These barrels, crafted from centuries-old trees grown on the slopes of Mount Ararat, impart unique flavors—notes of dried fruit, vanilla, and spice—while the spirits slowly breathe and mature in cool, dark cellars carved into ancient stone.'
      ]
    },
    {
      icon: Award,
      title: 'The Legacy',
      content: [
        'Armenian brandy gained international recognition when it became the drink of choice for Winston Churchill, who reportedly ordered 400 bottles annually. Legend has it that Stalin gifted cases to Churchill during their wartime meetings, creating a diplomatic tradition that elevated Ararat brandy to legendary status.',
        'At the Paris Expo of 1900, Armenian brandy won its first gold medal, beginning a tradition of excellence that would see it collect hundreds of international awards. The spirit became a symbol of Armenian craftsmanship and hospitality, served at the most prestigious tables across Europe.',
        'Royal courts from Russia to Persia made Ararat brandy their official spirit of celebration, and its reputation spread through the corridors of power and the salons of high society. Each bottle carried with it the pride of a nation and the mastery of generations.'
      ]
    },
    {
      icon: Clock,
      title: 'Modern Times',
      content: [
        'Today, the tradition continues with the same devotion to quality that defined the earliest distillations. Modern technology serves the ancient craft, ensuring consistency while preserving the handcrafted soul of each bottle.',
        'The master blenders at Ararat maintain a collection of spirits dating back decades, some over 50 years old, allowing them to create expressions of extraordinary depth and character. Each new release honors the past while embracing contemporary tastes.',
        'At Simona, we celebrate this heritage by offering you not just a drink, but a taste of history—a connection to the craftsmen who perfected their art in the shadow of Mount Ararat, and to the legends that made Armenian brandy a symbol of excellence around the world.'
      ]
    }
  ];

  const galleryImages = [
    {
      url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800',
      caption: 'Mount Ararat - The Sacred Mountain'
    },
    {
      url: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800',
      caption: 'Vineyards of the Ararat Valley'
    },
    {
      url: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800',
      caption: 'Oak Barrel Aging Cellars'
    },
    {
      url: 'https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?w=800',
      caption: 'Traditional Copper Pot Stills'
    },
    {
      url: 'https://images.unsplash.com/photo-1568213816046-0ee1c42bd559?w=800',
      caption: 'Master Distiller at Work'
    },
    {
      url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800',
      caption: 'The Art of Brandy Craftsmanship'
    }
  ];

  return (
    <div className="min-h-screen bg-ink-900">
      {/* Hero Section with Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=1920)',
            transform: `translateY(${scrollY * 0.5}px)`,
            willChange: 'transform'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-ink-900/60 via-ink-900/40 to-ink-900" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 
            className="text-6xl md:text-8xl font-display text-mist-100 mb-6"
            data-reveal
            ref={(el) => el && sectionsRef.current.push(el)}
          >
            The Legend of Simona
          </h1>
          <p 
            className="text-xl md:text-2xl text-gold-400 font-light tracking-wide"
            data-reveal
            ref={(el) => el && sectionsRef.current.push(el)}
          >
            A Story of Armenian Tradition & Excellence
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gold-400/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-gold-400 rounded-full" />
          </div>
        </div>
      </section>

      {/* Story Sections */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          {storyParts.map((part, index) => {
            const Icon = part.icon;
            const isEven = index % 2 === 0;
            
            return (
              <div
                key={index}
                className={`mb-32 last:mb-0 grid md:grid-cols-2 gap-12 items-center ${
                  isEven ? '' : 'md:grid-flow-dense'
                }`}
                data-reveal
                ref={(el) => el && sectionsRef.current.push(el)}
              >
                {/* Icon and Title */}
                <div className={`${isEven ? 'md:col-start-1' : 'md:col-start-2'}`}>
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold-400/10 mb-6">
                    <Icon className="w-10 h-10 text-gold-400" />
                  </div>
                  <h2 className="text-5xl md:text-6xl font-display text-mist-100 mb-8">
                    {part.title}
                  </h2>
                </div>

                {/* Content */}
                <div className={`space-y-6 ${isEven ? 'md:col-start-2' : 'md:col-start-1 md:row-start-1'}`}>
                  {part.content.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="text-lg text-mist-300 leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-24 px-6 bg-ink-700">
        <div className="container mx-auto max-w-7xl">
          <h2 
            className="text-5xl md:text-6xl font-display text-mist-100 text-center mb-16"
            data-reveal
            ref={(el) => el && sectionsRef.current.push(el)}
          >
            Our Heritage in Pictures
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="group relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer"
                data-reveal
                ref={(el) => el && sectionsRef.current.push(el)}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <img
                  src={image.url}
                  alt={image.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-mist-100 text-lg font-display">
                      {image.caption}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="py-32 px-6">
        <div 
          className="container mx-auto max-w-3xl text-center"
          data-reveal
          ref={(el) => el && sectionsRef.current.push(el)}
        >
          <p className="text-2xl md:text-3xl font-display text-gold-400 leading-relaxed mb-8">
            "Every glass tells a story, every sip honors a tradition that has endured for generations."
          </p>
          <p className="text-lg text-mist-300">
            Experience the legend at Simona
          </p>
        </div>
      </section>
    </div>
  );
};

export default History;
