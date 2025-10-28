import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { X } from 'lucide-react';
import gallery1 from '@/assets/gallery-1.jpg';
import gallery2 from '@/assets/gallery-2.jpg';
import gallery3 from '@/assets/gallery-3.jpg';
import gallery4 from '@/assets/gallery-4.jpg';
import gallery5 from '@/assets/gallery-5.jpg';
import gallery6 from '@/assets/gallery-6.jpg';

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

const Gallery = () => {
  useScrollReveal();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Cocktails', 'Interior', 'People', 'Events'];
  
  const filteredImages = filter === 'All' 
    ? images 
    : images.filter(img => img.category === filter);

  return (
    <main className="min-h-screen pt-20 pb-16 bg-ink-900">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12" data-reveal>
          <h1 className="font-display text-display-lg md:text-display-xl text-mist-100 mb-4">
            Gallery
          </h1>
          <p className="font-sans text-lg text-mist-300 max-w-2xl mx-auto">
            Moments captured in glass and light
          </p>
        </div>

        {/* Filter Pills */}
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

        {/* Masonry Grid */}
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

        {/* Lightbox */}
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
    </main>
  );
};

export default Gallery;
