import { useState, useEffect } from 'react';
import heroVideo from '@/assets/hero-video.mp4';
import heroPoster from '@/assets/hero-video-poster.jpg';

const CinematicBackground = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  return (
    <div className="fixed inset-0 z-0 overflow-hidden" style={{ pointerEvents: 'none' }}>
      {/* Poster Image - Always visible until video loads */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroPoster})`,
          opacity: videoLoaded && !prefersReducedMotion ? 0 : 1,
          transition: 'opacity 280ms cubic-bezier(.16,1,.3,1)',
          visibility: videoLoaded && !prefersReducedMotion ? 'hidden' : 'visible'
        }}
      />

      {/* Video Layer - Hidden until loaded */}
      {!prefersReducedMotion && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={heroPoster}
          onLoadedData={handleVideoLoad}
          className="heroAnim absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: videoLoaded ? 1 : 0,
            visibility: videoLoaded ? 'visible' : 'hidden',
            transition: 'opacity 280ms cubic-bezier(.16,1,.3,1)',
            transform: 'translateZ(0)',
            willChange: 'opacity'
          }}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      )}

      {/* Dark Overlay */}
      <div 
        className="absolute inset-0 transition-all duration-500"
        style={{
          background: 'linear-gradient(to bottom, rgba(10, 10, 10, 0.5), rgba(10, 10, 10, 0.7))'
        }}
      />
    </div>
  );
};

export default CinematicBackground;
