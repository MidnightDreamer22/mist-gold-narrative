import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { CartDrawer } from './CartDrawer';

interface NavigationProps {
  onNavigate: (panel: string) => void;
}

const Navigation = ({ onNavigate }: NavigationProps) => {
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
    { id: 'about', label: 'About', type: 'panel' },
    { id: 'gallery', label: 'Gallery', type: 'panel' },
    { id: 'menu', label: 'Menu', type: 'panel' },
    { id: 'reservation', label: 'Reservation', type: 'panel' },
    { id: 'shop', label: 'Shop', type: 'route', path: '/shop' },
  ];

  const handleNavClick = (link: any) => {
    if (link.type === 'panel') {
      onNavigate(link.id);
    }
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
                link.type === 'route' ? (
                  <Link
                    key={link.id}
                    to={link.path}
                    className="text-sm font-sans tracking-wide link-underline text-mist-300 hover:text-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-ink-900 rounded px-2 py-1"
                    style={{ transition: 'all 480ms cubic-bezier(.16,1,.3,1)' }}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link)}
                    className="text-sm font-sans tracking-wide link-underline text-mist-300 hover:text-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-ink-900 rounded px-2 py-1"
                    style={{ transition: 'all 480ms cubic-bezier(.16,1,.3,1)' }}
                  >
                    {link.label}
                  </button>
                )
              ))}
            </div>
            
            {/* Cart Icon - Desktop */}
            <div className="hidden md:block absolute right-0">
              <CartDrawer />
            </div>

            {/* Mobile - Brand + Hamburger + Cart */}
            <div className="md:hidden flex items-center justify-between w-full">
              <span className="text-xl font-display text-mist-300 tracking-tight">
                Simona
              </span>
              <div className="flex items-center gap-2">
                <CartDrawer />
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
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-ink-900/98 backdrop-blur-frost" />
          <div className="relative flex flex-col items-center justify-center h-full gap-8">
            {navLinks.map(link => (
              link.type === 'route' ? (
                <Link
                  key={link.id}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-display text-mist-300 hover:text-gold-400"
                  style={{ transition: 'all 480ms cubic-bezier(.16,1,.3,1)' }}
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link)}
                  className="text-2xl font-display text-mist-300 hover:text-gold-400"
                  style={{ transition: 'all 480ms cubic-bezier(.16,1,.3,1)' }}
                >
                  {link.label}
                </button>
              )
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
