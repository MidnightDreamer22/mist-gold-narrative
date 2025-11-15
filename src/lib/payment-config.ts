import { PaymentMethod } from '@/types/checkout';

// Payment gateway endpoints (placeholders - replace with real URLs)
export const PAYONEER_CHECKOUT_URL = import.meta.env.VITE_PAYONEER_CHECKOUT_URL || 'https://checkout.payoneer.com/placeholder';
export const IDRAM_CHECKOUT_URL = import.meta.env.VITE_IDRAM_CHECKOUT_URL || 'https://idram.am/checkout/placeholder';
export const APPLE_GOOGLE_PAY_ENDPOINT = import.meta.env.VITE_APPLE_GOOGLE_PAY_ENDPOINT || 'https://bank.am/applepay/placeholder';

// USD to AMD exchange rate (should be fetched from API in production)
export const USD_TO_AMD_RATE = parseFloat(import.meta.env.VITE_USD_TO_AMD_RATE || '390');

/**
 * Convert USD to AMD
 */
export function convertUsdToAmd(usd: number, rate: number = USD_TO_AMD_RATE): number {
  return Math.round(usd * rate);
}

/**
 * Detect if Apple Pay or Google Pay is available on the device
 */
export function detectAppleGooglePay(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check for Apple Pay
  if (window.ApplePaySession && window.ApplePaySession.canMakePayments) {
    return window.ApplePaySession.canMakePayments();
  }
  
  // Check for Google Pay
  if (window.PaymentRequest) {
    try {
      const supportedMethods = [{
        supportedMethods: 'https://google.com/pay'
      }];
      const details = {
        total: {
          label: 'Test',
          amount: { currency: 'USD', value: '0.00' }
        }
      };
      new PaymentRequest(supportedMethods, details);
      return true;
    } catch (e) {
      return false;
    }
  }
  
  return false;
}

/**
 * Get recommended payment method based on shipping country
 */
export function getRecommendedPaymentMethod(country: string, appleGooglePayAvailable: boolean): PaymentMethod {
  // If Apple/Google Pay is available, always recommend it
  if (appleGooglePayAvailable) {
    return 'apple_google';
  }
  
  // If shipping to Armenia, recommend Idram
  if (country.toLowerCase() === 'armenia' || country.toLowerCase() === 'am') {
    return 'idram';
  }
  
  // For international, recommend Payoneer
  return 'payoneer';
}

/**
 * Get DHL shipping cost based on country (placeholder logic)
 */
export function getShippingCost(country: string): number {
  if (country.toLowerCase() === 'armenia' || country.toLowerCase() === 'am') {
    return 5; // $5 for Armenia
  }
  return 15; // $15 for international
}

// Type declarations for browser APIs
declare global {
  interface Window {
    ApplePaySession?: {
      canMakePayments(): boolean;
      canMakePaymentsWithActiveCard?(merchantIdentifier: string): Promise<boolean>;
    };
    PaymentRequest?: any;
  }
}
