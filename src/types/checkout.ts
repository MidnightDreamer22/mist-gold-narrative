export interface ShippingAddress {
  country: string;
  city: string;
  postalCode: string;
  streetAddress: string;
}

export interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
}

export type PaymentMethod = 'apple_google' | 'idram' | 'payoneer';

export interface CheckoutData {
  orderId: string;
  items: Array<{
    id: string;
    title: string;
    variantTitle: string;
    quantity: number;
    price: number;
    image?: string;
  }>;
  customer: CustomerDetails;
  shipping: ShippingAddress;
  shippingCost: number;
  totalUsd: number;
  totalAmd: number;
  paymentMethod: PaymentMethod;
}

export interface Order extends CheckoutData {
  date: string;
  status: 'pending' | 'completed' | 'failed';
}
