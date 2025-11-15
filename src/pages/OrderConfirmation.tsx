import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, Package, Truck, CreditCard, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Order } from '@/types/checkout';
import { getOrderById } from '@/lib/payment-service';

const OrderConfirmation = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (orderId) {
      const foundOrder = getOrderById(orderId);
      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        // Order not found, redirect to shop
        navigate('/shop');
      }
    }
  }, [orderId, navigate]);

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading order details...</p>
        </div>
      </div>
    );
  }

  const getPaymentMethodName = () => {
    switch (order.paymentMethod) {
      case 'apple_google':
        return 'Apple Pay / Google Pay';
      case 'idram':
        return 'Idram & Local Cards';
      case 'payoneer':
        return 'Payoneer Checkout';
      default:
        return 'Card Payment';
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
            <CheckCircle2 className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl font-display font-bold mb-3">Order Confirmed!</h1>
          <p className="text-xl text-muted-foreground">
            Thank you for supporting Simona Bar
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-card border border-border rounded-lg p-8 space-y-8 mb-8">
          {/* Order Info */}
          <div className="grid sm:grid-cols-3 gap-6 pb-6 border-b border-border">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Order Number</p>
              <p className="font-mono font-semibold">{order.orderId}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Date</p>
              <p className="font-semibold">
                {new Date(order.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Paid</p>
              <p className="font-bold text-lg">${order.totalUsd.toFixed(2)} USD</p>
            </div>
          </div>

          {/* Items Purchased */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Items Purchased</h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-20 bg-secondary/20 rounded overflow-hidden flex-shrink-0">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.variantTitle}</p>
                    <p className="text-sm">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t border-border">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Package className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Shipping Address</h3>
              </div>
              <div className="text-sm space-y-1">
                <p className="font-medium">{order.customer.name}</p>
                <p className="text-muted-foreground">{order.shipping.streetAddress}</p>
                <p className="text-muted-foreground">
                  {order.shipping.city}, {order.shipping.postalCode}
                </p>
                <p className="text-muted-foreground">{order.shipping.country}</p>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Mail className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Contact Information</h3>
              </div>
              <div className="text-sm space-y-1">
                <p className="text-muted-foreground">{order.customer.email}</p>
                <p className="text-muted-foreground">{order.customer.phone}</p>
              </div>
            </div>
          </div>

          {/* Shipping & Payment */}
          <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t border-border">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Truck className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Shipping Method</h3>
              </div>
              <p className="text-sm text-muted-foreground">DHL International Express</p>
              <p className="text-sm font-semibold mt-1">${order.shippingCost.toFixed(2)}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CreditCard className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Payment Method</h3>
              </div>
              <p className="text-sm text-muted-foreground">{getPaymentMethodName()}</p>
              {order.paymentMethod !== 'payoneer' && (
                <p className="text-xs text-muted-foreground mt-1">
                  Processed: {order.totalAmd.toLocaleString()} AMD
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Delivery Message */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-8">
          <div className="flex gap-4">
            <Truck className="w-6 h-6 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-2">What's Next?</h3>
              <p className="text-sm text-muted-foreground">
                Your order will be shipped via DHL International Express. 
                We'll email you tracking details within 24 hours. Thank you for supporting Simona Bar!
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={() => navigate('/shop')}
            className="min-w-[200px]"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
