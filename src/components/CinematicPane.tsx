import { ReactNode } from 'react';

interface CinematicPaneProps {
  imageUrl: string;
  children?: ReactNode;
  className?: string;
}

const CinematicPane = ({ imageUrl, children, className = '' }: CinematicPaneProps) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${imageUrl})`,
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Dark overlay with frost effect */}
      <div className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default CinematicPane;
