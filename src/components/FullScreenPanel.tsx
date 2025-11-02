import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface FullScreenPanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const FullScreenPanel = ({ isOpen, onClose, title, children }: FullScreenPanelProps) => {
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Save currently focused element
      previousActiveElement.current = document.activeElement as HTMLElement;
      
      document.body.style.overflow = 'hidden';
      document.body.setAttribute('data-panel-active', 'true');
      
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleEscape);
      
      return () => {
        document.body.style.overflow = '';
        document.body.removeAttribute('data-panel-active');
        window.removeEventListener('keydown', handleEscape);
        
        // Restore focus to triggering element
        if (previousActiveElement.current) {
          previousActiveElement.current.focus();
        }
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Scrim */}
      <div 
        className="fixed inset-0 z-40 bg-ink-900/60 backdrop-blur-sm"
        style={{
          opacity: isOpen ? 1 : 0,
          transition: 'opacity 180ms ease-out',
          pointerEvents: isOpen ? 'auto' : 'none'
        }}
        onClick={onClose}
      />
      
      {/* Panel */}
      <div 
        className="fixed inset-0 z-50 bg-ink-900"
        style={{
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.985)',
          transition: isOpen 
            ? `opacity var(--timing-enter) var(--easing-enter), transform var(--timing-enter) var(--easing-enter)`
            : `opacity var(--timing-exit) var(--easing-exit), transform var(--timing-exit) var(--easing-exit)`,
          pointerEvents: isOpen ? 'auto' : 'none'
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
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scrimEnter {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
    </>
  );
};

export default FullScreenPanel;
