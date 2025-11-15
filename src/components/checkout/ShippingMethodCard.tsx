import { Truck } from 'lucide-react';

interface ShippingMethodCardProps {
  cost: number;
  country: string;
}

export const ShippingMethodCard = ({ cost, country }: ShippingMethodCardProps) => {
  const isArmenia = country.toLowerCase() === 'armenia' || country.toLowerCase() === 'am';
  
  return (
    <div className="border border-border rounded-lg p-4 bg-card">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Truck className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold">DHL International Express</h4>
          <p className="text-sm text-muted-foreground mt-1">
            {isArmenia ? 'Estimated delivery: 2-3 business days' : 'Estimated delivery: 5-7 business days'}
          </p>
        </div>
        <div className="text-right">
          <p className="font-bold">${cost.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};
