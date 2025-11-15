import { ReactNode } from 'react';

interface CheckoutFormSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export const CheckoutFormSection = ({
  title,
  description,
  children,
  className = ''
}: CheckoutFormSectionProps) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};
