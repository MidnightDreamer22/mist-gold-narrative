import { useState, useEffect } from 'react';
import heroVideo from '@/assets/hero-video.mp4';

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

  return (
    <div className="fixed inset-0 z-0 overflow-hidden" style={{ pointerEvents: 'none' }}>
      {/* Branded gradient fallback - visible until video loads */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background: 'linear-gradient(to bottom, hsl(220 10% 8%), hsl(220 10% 5%))',
          opacity: videoLoaded && !prefersReducedMotion ? 0 : 1,
        }}
      />

      {/* Video Layer - Fades in once loaded */}
      {!prefersReducedMotion && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          className="hero-video absolute inset-0 w-full h-full min-w-full min-h-full object-cover object-center transition-opacity duration-700"
          style={{
            opacity: videoLoaded ? 1 : 0,
            transformOrigin: 'center center',
            willChange: 'opacity, transform'
          }}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      )}

      {/* Dark Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(10, 10, 10, 0.5), rgba(10, 10, 10, 0.7))'
        }}
      />
    </div>
  );
};

export default CinematicBackground;
