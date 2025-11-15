import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { CartDrawer } from './CartDrawer';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 64);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'history', label: 'History', path: '/history' },
    { id: 'menu', label: 'Menu', path: '/menu' },
    { id: 'reservation', label: 'Reservation', path: '/reservation' },
    { id: 'shop', label: 'Shop', path: '/shop' },
  ];

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
            {/* Home Button - Desktop (left side, hidden on home page) */}
            {!isHomePage && (
              <Link
                to="/"
                className="hidden md:block absolute left-0 text-xl font-display text-mist-300 hover:text-gold-400 tracking-tight transition-colors"
              >
                Simona
              </Link>
            )}
            
            {/* Desktop Navigation - Centered */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.id}
                  to={link.path}
                  className="text-sm font-sans tracking-wide link-underline text-mist-300 hover:text-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-ink-900 rounded px-2 py-1"
                  style={{ transition: 'all 480ms cubic-bezier(.16,1,.3,1)' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            
            {/* Cart Icon - Desktop */}
            <div className="hidden md:block absolute right-0">
              <CartDrawer />
            </div>

            {/* Mobile - Brand + Hamburger + Cart */}
            <div className="md:hidden flex items-center justify-between w-full">
              {isHomePage ? (
                <span className="text-xl font-display text-mist-300 tracking-tight">
                  Simona
                </span>
              ) : (
                <Link
                  to="/"
                  className="text-xl font-display text-mist-300 hover:text-gold-400 tracking-tight transition-colors"
                >
                  Simona
                </Link>
              )}
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
              <Link
                key={link.id}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-display text-mist-300 hover:text-gold-400"
                style={{ transition: 'all 480ms cubic-bezier(.16,1,.3,1)' }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
