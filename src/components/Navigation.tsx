import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 64);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '#about', label: 'About' },
    { to: '#gallery', label: 'Gallery' },
    { to: '#menu', label: 'Menu' },
    { to: '#reservation', label: 'Reservation' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    const element = document.querySelector(hash);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-600 ${
          scrolled ? 'bg-ink-900/80 backdrop-blur-frost shadow-subtle' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-center relative">
            {/* Desktop Navigation - Centered */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <a
                  key={link.to}
                  href={link.to}
                  onClick={(e) => handleNavClick(e, link.to)}
                  className="text-sm font-sans tracking-wide link-underline text-mist-300 hover:text-gold-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-ink-900 rounded px-2 py-1"
                  aria-current={location.hash === link.to ? 'page' : undefined}
                >
                  {link.label}
                </a>
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
              <a
                key={link.to}
                href={link.to}
                onClick={(e) => handleNavClick(e, link.to)}
                className="text-2xl font-display text-mist-300 hover:text-gold-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
