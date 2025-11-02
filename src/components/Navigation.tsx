import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  onNavigate: (panel: string) => void;
}

const Navigation = ({ onNavigate }: NavigationProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 64);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'menu', label: 'Menu' },
    { id: 'reservation', label: 'Reservation' },
  ];

  const handleNavClick = (panelId: string) => {
    onNavigate(panelId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? 'bg-ink-900/70 backdrop-blur-frost shadow-subtle' : 'bg-transparent'
        }`}
        style={{ transition: 'all 700ms cubic-bezier(.16,1,.3,1)' }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-center relative">
            {/* Desktop Navigation - Centered */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className="text-sm font-sans tracking-wide link-underline text-mist-300 hover:text-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-ink-900 rounded px-2 py-1"
                  style={{ transition: 'all 480ms cubic-bezier(.16,1,.3,1)' }}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Mobile - Brand + Hamburger */}
            <div className="md:hidden flex items-center justify-between w-full">
              <span className="text-xl font-display text-mist-300 tracking-tight">
                Simona
              </span>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-mist-300 p-2"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-ink-900/98 backdrop-blur-frost" />
          <div className="relative flex flex-col items-center justify-center h-full gap-8">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-2xl font-display text-mist-300 hover:text-gold-400"
                style={{ transition: 'all 480ms cubic-bezier(.16,1,.3,1)' }}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
