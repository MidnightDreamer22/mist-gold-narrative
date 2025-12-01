import { Link } from 'react-router-dom';
import { Instagram, Facebook } from 'lucide-react';
import { useFooterReveal } from '@/hooks/useFooterReveal';

const Footer = () => {
  const { footerRef, isVisible: footerVisible } = useFooterReveal();

  return (
    <section 
      className="snap-section"
      style={{ 
        minHeight: '60vh',
        scrollSnapAlign: 'end',
        scrollSnapStop: 'always'
      }}
    >
      <footer 
        ref={footerRef}
        className="relative z-10 border-t border-border py-16"
        style={{
          minHeight: '480px',
          opacity: footerVisible ? 1 : 0,
          transform: footerVisible ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 480ms var(--easing-enter), transform 480ms var(--easing-enter)'
        }}
      >
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-display text-mist-100">Location</h3>
              <p className="text-mist-300 leading-relaxed">
                80 Aram Street<br />
                Yerevan, Armenia
              </p>
              <a 
                href="https://maps.google.com/?q=80+Aram+Street,Yerevan,Armenia" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block text-gold-400 hover:underline text-sm"
              >
                View on Map →
              </a>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-display text-mist-100">Hours</h3>
              <p className="text-mist-300 leading-relaxed">
                Every day<br />
                <span className="text-gold-400 font-semibold">18:30 - 02:00</span>
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-display text-mist-100">Contact</h3>
              <div className="space-y-2 text-mist-300">
                <p>
                  <a href="tel:+37495426619" className="hover:text-gold-400 transition-colors">
                    +374 95 426 619
                  </a>
                </p>
                <p>
                  <a href="mailto:cheers@simona.bar" className="hover:text-gold-400 transition-colors">
                    cheers@simona.bar
                  </a>
                </p>
                <div className="flex gap-4 mt-4">
                  <a 
                    href="https://www.instagram.com/simonagathers/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram size={20} />
                    <span>Instagram</span>
                  </a>
                  <a 
                    href="https://www.facebook.com/simonabarhome/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook size={20} />
                    <span>Facebook</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border space-y-4">
            <p className="text-mist-300 text-sm leading-relaxed text-center">
              Simona Bar – Cocktail & listening bar in Yerevan. Alcohol is served only to guests of legal drinking age under Armenian law. Please drink responsibly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-mist-300 text-sm">
              <p>
                © {new Date().getFullYear()} Simona. All rights reserved.
              </p>
              <span className="hidden sm:inline">•</span>
              <Link 
                to="/privacy" 
                className="text-gold-400 hover:text-gold-300 transition-colors underline"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
