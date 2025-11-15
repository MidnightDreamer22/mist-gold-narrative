import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/stores/cartStore';
import { CheckoutFormSection } from '@/components/checkout/CheckoutFormSection';
import { CheckoutInput } from '@/components/checkout/CheckoutInput';
import { CheckoutSelect } from '@/components/checkout/CheckoutSelect';
import { OrderSummaryCard } from '@/components/checkout/OrderSummaryCard';
import { ShippingMethodCard } from '@/components/checkout/ShippingMethodCard';
import { PaymentMethodSelector } from '@/components/checkout/PaymentMethodSelector';
import { PaymentAction } from '@/components/checkout/PaymentAction';
import { PaymentMethod, CustomerDetails, ShippingAddress } from '@/types/checkout';
import { getShippingCost } from '@/lib/payment-config';
import { 
  prepareCheckoutData, 
  redirectToIdram, 
  redirectToPayoneer, 
  initiateAppleGooglePay 
} from '@/lib/payment-service';
import { toast } from 'sonner';

// Validation schema
const checkoutSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(6, 'Phone number is required'),
  country: z.string().min(2, 'Please select a country'),
  city: z.string().min(2, 'City is required'),
  postalCode: z.string().min(3, 'Postal code is required'),
  streetAddress: z.string().min(5, 'Street address is required'),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const countries = [
  { value: 'Armenia', label: 'Armenia' },
  { value: 'United States', label: 'United States' },
  { value: 'United Kingdom', label: 'United Kingdom' },
  { value: 'Germany', label: 'Germany' },
  { value: 'France', label: 'France' },
  { value: 'Spain', label: 'Spain' },
  { value: 'Italy', label: 'Italy' },
  { value: 'Canada', label: 'Canada' },
  { value: 'Australia', label: 'Australia' },
  { value: 'Japan', label: 'Japan' },
  { value: 'South Korea', label: 'South Korea' },
  { value: 'Other', label: 'Other' },
];

const Checkout = () => {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('payoneer');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      country: 'Armenia',
    },
  });

  const selectedCountry = watch('country');
  const shippingCost = selectedCountry ? getShippingCost(selectedCountry) : 0;

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      navigate('/shop');
    }
  }, [items, navigate]);

  const onSubmit = async (data: CheckoutFormData) => {
    setIsProcessing(true);

    try {
      const customer: CustomerDetails = {
        name: data.name,
        email: data.email,
        phone: data.phone,
      };

      const shipping: ShippingAddress = {
        country: data.country,
        city: data.city,
        postalCode: data.postalCode,
        streetAddress: data.streetAddress,
      };

      const checkoutData = prepareCheckoutData(
        items,
        customer,
        shipping,
        selectedPaymentMethod
      );

      console.log('Processing checkout:', checkoutData);

      // Route to appropriate payment gateway
      switch (selectedPaymentMethod) {
        case 'apple_google':
          await initiateAppleGooglePay(checkoutData);
          break;
        case 'idram':
          redirectToIdram(checkoutData);
          break;
        case 'payoneer':
          redirectToPayoneer(checkoutData);
          break;
      }

      // Clear cart after successful redirect initiation
      clearCart();
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Payment failed', {
        description: error instanceof Error ? error.message : 'Please try again or use a different payment method.',
      });
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return null;
  }

  const totalUsd = items.reduce((sum, item) => 
    sum + (parseFloat(item.price.amount) * item.quantity), 0
  ) + shippingCost;

  const totalAmd = Math.round(totalUsd * 390); // Using default exchange rate

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/shop')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shop
          </Button>
          <div className="flex items-center gap-3">
            <Package className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-display font-bold">Checkout</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Customer Information */}
              <CheckoutFormSection
                title="Customer Information"
                description="We'll use this to contact you about your order"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <CheckoutInput
                    label="Full Name"
                    {...register('name')}
                    error={errors.name?.message}
                    required
                    placeholder="John Doe"
                  />
                  <CheckoutInput
                    label="Phone"
                    {...register('phone')}
                    error={errors.phone?.message}
                    required
                    type="tel"
                    placeholder="+374 XX XXX XXX"
                  />
                </div>
                <CheckoutInput
                  label="Email"
                  {...register('email')}
                  error={errors.email?.message}
                  required
                  type="email"
                  placeholder="john@example.com"
                />
              </CheckoutFormSection>

              {/* Shipping Address */}
              <CheckoutFormSection
                title="Shipping Address"
                description="Where should we send your order?"
              >
                <CheckoutSelect
                  label="Country"
                  options={countries}
                  value={selectedCountry}
                  onValueChange={(value) => setValue('country', value)}
                  error={errors.country?.message}
                  required
                />
                <div className="grid sm:grid-cols-2 gap-4">
                  <CheckoutInput
                    label="City"
                    {...register('city')}
                    error={errors.city?.message}
                    required
                    placeholder="Yerevan"
                  />
                  <CheckoutInput
                    label="Postal Code"
                    {...register('postalCode')}
                    error={errors.postalCode?.message}
                    required
                    placeholder="0001"
                  />
                </div>
                <CheckoutInput
                  label="Street Address"
                  {...register('streetAddress')}
                  error={errors.streetAddress?.message}
                  required
                  placeholder="123 Main Street, Apt 4"
                />
              </CheckoutFormSection>

              {/* Shipping Method */}
              <CheckoutFormSection
                title="Shipping Method"
                description="Fast and reliable international shipping"
              >
                <ShippingMethodCard cost={shippingCost} country={selectedCountry} />
              </CheckoutFormSection>

              {/* Payment Method */}
              <CheckoutFormSection
                title="Payment"
                description="All transactions are secure and encrypted"
              >
                <PaymentMethodSelector
                  selectedMethod={selectedPaymentMethod}
                  onMethodChange={setSelectedPaymentMethod}
                  shippingCountry={selectedCountry}
                />
                
                <PaymentAction
                  paymentMethod={selectedPaymentMethod}
                  isLoading={isProcessing}
                  onSubmit={handleSubmit(onSubmit)}
                  totalUsd={totalUsd}
                  totalAmd={totalAmd}
                />
              </CheckoutFormSection>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <OrderSummaryCard 
                  items={items} 
                  shippingCost={shippingCost}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
