import { CheckoutData, PaymentMethod, Order } from '@/types/checkout';
import { CartItem } from '@/stores/cartStore';
import { CustomerDetails, ShippingAddress } from '@/types/checkout';
import { 
  PAYONEER_CHECKOUT_URL, 
  IDRAM_CHECKOUT_URL, 
  APPLE_GOOGLE_PAY_ENDPOINT,
  convertUsdToAmd,
  getShippingCost 
} from './payment-config';

/**
 * Generate a unique order ID
 */
export function generateOrderId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 9);
  return `ORD-${timestamp}-${random}`.toUpperCase();
}

/**
 * Prepare checkout data from cart items and customer information
 */
export function prepareCheckoutData(
  items: CartItem[],
  customer: CustomerDetails,
  shipping: ShippingAddress,
  paymentMethod: PaymentMethod
): CheckoutData {
  const orderId = generateOrderId();
  const shippingCost = getShippingCost(shipping.country);
  
  // Calculate subtotal in USD
  const subtotal = items.reduce((sum, item) => 
    sum + (parseFloat(item.price.amount) * item.quantity), 0
  );
  
  const totalUsd = subtotal + shippingCost;
  const totalAmd = convertUsdToAmd(totalUsd);
  
  // Format items for checkout
  const checkoutItems = items.map(item => ({
    id: item.variantId,
    title: item.product.node.title,
    variantTitle: item.variantTitle,
    quantity: item.quantity,
    price: parseFloat(item.price.amount),
    image: item.product.node.images?.edges?.[0]?.node?.url
  }));
  
  return {
    orderId,
    items: checkoutItems,
    customer,
    shipping,
    shippingCost,
    totalUsd,
    totalAmd,
    paymentMethod
  };
}

/**
 * Redirect to Idram checkout
 * Uses AMD total
 */
export function redirectToIdram(checkoutData: CheckoutData): void {
  const params = new URLSearchParams({
    order_id: checkoutData.orderId,
    amount: checkoutData.totalAmd.toString(), // Amount in AMD
    currency: 'AMD',
    customer_email: checkoutData.customer.email,
    customer_name: checkoutData.customer.name,
    return_url: `${window.location.origin}/order-confirmation/${checkoutData.orderId}`
  });
  
  const checkoutUrl = `${IDRAM_CHECKOUT_URL}?${params.toString()}`;
  
  console.log('Redirecting to Idram:', {
    orderId: checkoutData.orderId,
    totalAmd: checkoutData.totalAmd,
    url: checkoutUrl
  });
  
  // In production, this would redirect to actual Idram gateway
  window.location.href = checkoutUrl;
}

/**
 * Redirect to Payoneer checkout
 * Uses USD total
 */
export function redirectToPayoneer(checkoutData: CheckoutData): void {
  const params = new URLSearchParams({
    order_id: checkoutData.orderId,
    amount: checkoutData.totalUsd.toFixed(2), // Amount in USD
    currency: 'USD',
    customer_email: checkoutData.customer.email,
    customer_name: checkoutData.customer.name,
    return_url: `${window.location.origin}/order-confirmation/${checkoutData.orderId}`
  });
  
  const checkoutUrl = `${PAYONEER_CHECKOUT_URL}?${params.toString()}`;
  
  console.log('Redirecting to Payoneer:', {
    orderId: checkoutData.orderId,
    totalUsd: checkoutData.totalUsd,
    url: checkoutUrl
  });
  
  // In production, this would redirect to actual Payoneer gateway
  window.location.href = checkoutUrl;
}

/**
 * Initiate Apple Pay or Google Pay checkout
 * Uses AMD total (processed through Armenian bank)
 */
export async function initiateAppleGooglePay(checkoutData: CheckoutData): Promise<void> {
  console.log('Initiating Apple/Google Pay:', {
    orderId: checkoutData.orderId,
    totalAmd: checkoutData.totalAmd,
    endpoint: APPLE_GOOGLE_PAY_ENDPOINT
  });
  
  // In production, this would call the actual Apple/Google Pay API
  // through the Armenian bank's payment gateway
  
  // Placeholder: simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate successful payment
      console.log('Apple/Google Pay payment simulated successfully');
      
      // Store order and redirect to confirmation
      storeOrderLocally({
        ...checkoutData,
        date: new Date().toISOString(),
        status: 'completed'
      });
      
      window.location.href = `/order-confirmation/${checkoutData.orderId}`;
      resolve();
    }, 1500);
  });
}

/**
 * Store order data locally (temporary solution for development)
 * In production, this would be saved to a database
 */
export function storeOrderLocally(order: Order): void {
  try {
    const orders = getStoredOrders();
    orders.push(order);
    localStorage.setItem('simona_orders', JSON.stringify(orders));
  } catch (error) {
    console.error('Failed to store order:', error);
  }
}

/**
 * Retrieve stored orders from localStorage
 */
export function getStoredOrders(): Order[] {
  try {
    const stored = localStorage.getItem('simona_orders');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to retrieve orders:', error);
    return [];
  }
}

/**
 * Get a specific order by ID
 */
export function getOrderById(orderId: string): Order | null {
  const orders = getStoredOrders();
  return orders.find(order => order.orderId === orderId) || null;
}
