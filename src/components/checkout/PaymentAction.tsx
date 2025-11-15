import { Button } from '@/components/ui/button';
import { Loader2, Lock, CreditCard, Smartphone, Wallet } from 'lucide-react';
import { PaymentMethod } from '@/types/checkout';

interface PaymentActionProps {
  paymentMethod: PaymentMethod;
  isLoading: boolean;
  onSubmit: () => void;
  disabled?: boolean;
  totalUsd: number;
  totalAmd: number;
}

export const PaymentAction = ({
  paymentMethod,
  isLoading,
  onSubmit,
  disabled,
  totalUsd,
  totalAmd
}: PaymentActionProps) => {
  const getButtonText = () => {
    if (isLoading) return 'Processing...';
    
    switch (paymentMethod) {
      case 'apple_google':
        return 'Pay with Apple Pay / Google Pay';
      case 'idram':
        return 'Continue to Idram';
      case 'payoneer':
        return 'Continue to Payoneer';
      default:
        return 'Continue to Payment';
    }
  };

  const getButtonIcon = () => {
    if (isLoading) return <Loader2 className="w-5 h-5 animate-spin" />;
    
    switch (paymentMethod) {
      case 'apple_google':
        return <Smartphone className="w-5 h-5" />;
      case 'idram':
        return <Wallet className="w-5 h-5" />;
      case 'payoneer':
        return <CreditCard className="w-5 h-5" />;
      default:
        return <Lock className="w-5 h-5" />;
    }
  };

  const getPaymentInfo = () => {
    switch (paymentMethod) {
      case 'apple_google':
        return `You will pay ${totalAmd.toLocaleString()} AMD (equivalent to $${totalUsd.toFixed(2)} USD) through your Armenian bank.`;
      case 'idram':
        return `You will pay ${totalAmd.toLocaleString()} AMD (equivalent to $${totalUsd.toFixed(2)} USD) via Idram or local cards.`;
      case 'payoneer':
        return `You will pay $${totalUsd.toFixed(2)} USD via Payoneer secure checkout.`;
      default:
        return '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="p-4 bg-muted/50 rounded-lg border border-border">
        <div className="flex items-start gap-3">
          <Lock className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Secure Payment</p>
            <p>{getPaymentInfo()}</p>
          </div>
        </div>
      </div>
      
      <Button
        type="button"
        onClick={onSubmit}
        disabled={disabled || isLoading}
        className="w-full h-12 text-base font-semibold"
        size="lg"
      >
        {getButtonIcon()}
        <span className="ml-2">{getButtonText()}</span>
      </Button>
      
      <p className="text-xs text-center text-muted-foreground">
        By completing this purchase, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
};
