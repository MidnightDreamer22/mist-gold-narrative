import { useEffect, useState } from 'react';
import { Check, CreditCard, Smartphone, Wallet } from 'lucide-react';
import { PaymentMethod } from '@/types/checkout';
import { detectAppleGooglePay, getRecommendedPaymentMethod } from '@/lib/payment-config';

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod;
  onMethodChange: (method: PaymentMethod) => void;
  shippingCountry: string;
}

export const PaymentMethodSelector = ({
  selectedMethod,
  onMethodChange,
  shippingCountry
}: PaymentMethodSelectorProps) => {
  const [appleGooglePayAvailable, setAppleGooglePayAvailable] = useState(false);

  useEffect(() => {
    // Check if Apple/Google Pay is available
    const isAvailable = detectAppleGooglePay();
    setAppleGooglePayAvailable(isAvailable);

    // Auto-select recommended payment method if none selected
    if (!selectedMethod || selectedMethod === ('apple_google' as PaymentMethod) && !isAvailable) {
      const recommended = getRecommendedPaymentMethod(shippingCountry, isAvailable);
      onMethodChange(recommended);
    }
  }, [shippingCountry]);

  const paymentMethods = [
    {
      id: 'apple_google' as PaymentMethod,
      icon: Smartphone,
      title: 'Apple Pay / Google Pay',
      description: 'Fast, secure checkout with your device',
      recommended: appleGooglePayAvailable,
      disabled: !appleGooglePayAvailable,
      disabledReason: 'Not available on this device'
    },
    {
      id: 'idram' as PaymentMethod,
      icon: Wallet,
      title: 'Idram & Local Cards',
      subtitle: '(Armenia)',
      description: 'Pay with Idram wallet or ArCa cards. Processed in AMD at bank rate.',
      recommended: shippingCountry.toLowerCase() === 'armenia' && !appleGooglePayAvailable,
      disabled: false
    },
    {
      id: 'payoneer' as PaymentMethod,
      icon: CreditCard,
      title: 'Payoneer Checkout',
      subtitle: '(International)',
      description: 'Pay in USD with Visa/Mastercard. Secure partner checkout.',
      recommended: shippingCountry.toLowerCase() !== 'armenia' && !appleGooglePayAvailable,
      disabled: false
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Choose your payment method</h3>
      
      <div className="grid gap-4 sm:grid-cols-1">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          const isSelected = selectedMethod === method.id;
          
          return (
            <button
              key={method.id}
              type="button"
              onClick={() => !method.disabled && onMethodChange(method.id)}
              disabled={method.disabled}
              className={`
                relative w-full text-left p-4 rounded-lg border-2 transition-all
                ${isSelected 
                  ? 'border-primary bg-primary/5' 
                  : method.disabled 
                    ? 'border-border bg-muted/30 opacity-60 cursor-not-allowed'
                    : 'border-border hover:border-primary/50 bg-card'
                }
              `}
            >
              <div className="flex items-start gap-4">
                <div className={`
                  p-2 rounded-lg
                  ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}
                  ${method.disabled ? 'opacity-60' : ''}
                `}>
                  <Icon className="w-5 h-5" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">
                      {method.title}
                      {method.subtitle && (
                        <span className="text-sm text-muted-foreground ml-1">{method.subtitle}</span>
                      )}
                    </h4>
                    {method.recommended && !method.disabled && (
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-medium">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {method.disabled && method.disabledReason 
                      ? method.disabledReason 
                      : method.description
                    }
                  </p>
                </div>
                
                {isSelected && (
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
