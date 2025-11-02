import { X } from 'lucide-react';
import { useEffect } from 'react';

interface FullScreenPanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const FullScreenPanel = ({ isOpen, onClose, title, children }: FullScreenPanelProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleEscape);
      
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-ink-900"
      style={{
        animation: 'panelEnter 600ms cubic-bezier(.16,1,.3,1) forwards'
      }}
    >
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-10 bg-ink-900/80 backdrop-blur-frost border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 
            id="panel-title" 
            className="text-2xl font-display text-mist-300 tracking-tight"
          >
            {title}
          </h1>
          <button
            onClick={onClose}
            className="p-2 text-mist-300 hover:text-gold-400 transition-colors rounded focus:outline-none focus:ring-2 focus:ring-gold-400"
            aria-label="Close panel"
          >
            <X size={24} />
          </button>
        </div>
      </header>

      {/* Content */}
      <div 
        className="pt-20 h-full overflow-y-auto"
        style={{ scrollSnapType: 'y mandatory', scrollBehavior: 'smooth' }}
      >
        {children}
      </div>

      <style>{`
        @keyframes panelEnter {
          from {
            opacity: 0.96;
            transform: translateY(-24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default FullScreenPanel;
