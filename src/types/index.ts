export type UserRole = 'ADMIN' | 'CUSTOMER';

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export type PaymentMode = 'UPI' | 'CARD' | 'CASH';

export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED' | 'CANCELLED';

export interface User {
  user_id: number;
  full_name: string;
  login_name: string;
  mobile: string;
  email: string;
  address: string;
  role: UserRole;
  profile_image?: string;
}

export interface Product {
  product_id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface Courier {
  courier_id: number;
  name: string;
  description?: string;
  image_url?: string;
  is_custom: boolean;
}

export interface Order {
  order_id: number;
  order_date: string;
  amount: number;
  quantity: number;
  customer_id: number;
  product_id: number;
  status: OrderStatus;
  customer_name?: string;
  product_name?: string;
  courier_id: number;
  courier_name?: string;
  custom_courier_name?: string;
  product_image?: string;
}

export interface Payment {
  payment_id: number;
  order_id: number;
  payment_mode: PaymentMode;
  payment_amount: number;
  payment_date: string;
  status: PaymentStatus;
  transaction_id?: string;
  product_name?: string;
}

export interface LoginRequest {
  login_name: string;
  password: string;
}

export interface RegisterRequest {
  full_name: string;
  login_name: string;
  password: string;
  mobile: string;
  email: string;
  address: string;
  role: UserRole;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ProfileUpdateRequest {
  user_id: number;
  email?: string;
  mobile?: string;
  address?: string;
  profile_image?: string;
}

export interface CourierBookingRequest {
  customer_id: number;
  product_id: number;
  quantity: number;
  courier_id: number;
  custom_courier_name?: string;
  product_image?: File | null;
}

export interface PaymentRequest {
  order_id: number;
  payment_mode: PaymentMode;
  payment_amount: number;
  card_number?: string;
  card_expiry?: string;
  card_cvv?: string;
  upi_id?: string;
}

export interface OrderWithDetails {
  order: Order;
  product: Product;
  payment?: Payment;
}
