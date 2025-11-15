import { CheckoutData, Order } from '@/types/checkout';
import { storeOrderLocally } from './payment-service';

/**
 * Simulate a successful payment (for development/testing)
 * In production, real payment gateways will handle this
 */
export async function mockPaymentSuccess(checkoutData: CheckoutData): Promise<void> {
  console.log('🧪 Mock Payment: Processing...', checkoutData);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Create completed order
  const order: Order = {
    ...checkoutData,
    date: new Date().toISOString(),
    status: 'completed'
  };
  
  // Store order locally
  storeOrderLocally(order);
  
  console.log('✅ Mock Payment: Success', order);
  
  // Redirect to confirmation page
  window.location.href = `/order-confirmation/${order.orderId}`;
}

/**
 * Simulate a failed payment (for testing error handling)
 */
export async function mockPaymentFailure(checkoutData: CheckoutData): Promise<void> {
  console.log('🧪 Mock Payment: Processing...', checkoutData);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  console.log('❌ Mock Payment: Failed');
  
  throw new Error('Payment failed. Please try again or use a different payment method.');
}
