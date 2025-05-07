export interface User {
  user_id: number;
  full_name: string;
  login_name: string;
  mobile: string;
  email: string;
  address: string;
  role: 'ADMIN' | 'CUSTOMER';
}

export interface Product {
  product_id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface Order {
  order_id: number;
  order_date: string;
  amount: number;
  quantity: number;
  customer_id: number;
  product_id: number;
  status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  customer_name: string;
  product_name: string;
  courier_id: number;
  courier_name: string;
  product_image: string;
}

export interface Payment {
  payment_id: number;
  order_id: number;
  payment_mode: PaymentMode;
  payment_amount: number;
  payment_date: string;
  status: PaymentStatus;
  transaction_id?: string;
  product_name?: string; // Add this field for convenience in UI display
}

export type PaymentMode = 'CARD' | 'UPI' | 'CASH';
export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED' | 'CANCELLED';

export interface PaymentRequest {
  order_id: number;
  payment_mode: PaymentMode;
  payment_amount: number;
  card_number?: string;
  card_expiry?: string;
  card_cvv?: string;
  upi_id?: string;
}

export interface PaymentReceipt {
  receipt_id: string;
  customer_name: string;
  customer_address: string;
  customer_contact: string;
  order_id: number;
  order_date: string;
  product_name: string;
  product_description: string;
  product_image: string;
  quantity: number;
  price: number;
  total_amount: number;
  payment_status: PaymentStatus;
  payment_mode: PaymentMode;
  payment_date: string;
  transaction_id?: string;
}
