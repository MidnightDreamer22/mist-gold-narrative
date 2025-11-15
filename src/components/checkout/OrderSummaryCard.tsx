import { CartItem } from '@/stores/cartStore';

interface OrderSummaryCardProps {
  items: CartItem[];
  shippingCost: number;
  className?: string;
}

export const OrderSummaryCard = ({ items, shippingCost, className = '' }: OrderSummaryCardProps) => {
  const subtotal = items.reduce((sum, item) => 
    sum + (parseFloat(item.price.amount) * item.quantity), 0
  );
  const total = subtotal + shippingCost;
  
  return (
    <div className={`bg-card border border-border rounded-lg p-6 space-y-6 ${className}`}>
      <h3 className="text-lg font-semibold">Order Summary</h3>
      
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.variantId} className="flex gap-3">
            <div className="w-16 h-16 bg-secondary/20 rounded overflow-hidden flex-shrink-0">
              {item.product.node.images?.edges?.[0]?.node && (
                <img
                  src={item.product.node.images.edges[0].node.url}
                  alt={item.product.node.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium truncate">{item.product.node.title}</h4>
              <p className="text-xs text-muted-foreground">
                {item.selectedOptions.map(opt => opt.value).join(' • ')}
              </p>
              <p className="text-sm">Qty: {item.quantity}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">
                ${(parseFloat(item.price.amount) * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t border-border pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span>${shippingCost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
          <span>Total</span>
          <span>${total.toFixed(2)} USD</span>
        </div>
      </div>
    </div>
  );
};
