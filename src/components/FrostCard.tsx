import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FrostCardProps {
  children: ReactNode;
  className?: string;
}

const FrostCard = ({ children, className }: FrostCardProps) => {
  return (
    <div 
      className={cn(
        "frost-panel rounded-sm p-8 md:p-12",
        "shadow-heavy",
        "border border-border/20",
        className
      )}
    >
      {children}
    </div>
  );
};

export default FrostCard;
