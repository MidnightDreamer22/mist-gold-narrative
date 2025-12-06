import { useState, useEffect, useRef } from 'react';
import heroVideo from '@/assets/hero-video.mp4';

const CinematicBackground = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Autoplay with user gesture fallback for mobile browsers
  useEffect(() => {
    if (prefersReducedMotion) return;

    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      video.play().catch(() => {
        // Autoplay blocked – will retry on first user interaction
      });
    };

    // Try immediately on mount
    tryPlay();

    // Fallback: retry on first user interaction
    const handleUserInteraction = () => {
      tryPlay();
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
    };

    window.addEventListener('click', handleUserInteraction, { once: true });
    window.addEventListener('touchstart', handleUserInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [prefersReducedMotion]);

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
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          controls={false}
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
