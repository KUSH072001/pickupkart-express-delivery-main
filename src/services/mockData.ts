
import { Product, User, Order, Payment } from '../types';

// Mock products for our demo
export const mockProducts: Product[] = [
  {
    product_id: 1,
    name: 'Laptop Courier',
    image: '/laptop-courier.jpg',
    price: 1200,
    quantity: 10
  },
  {
    product_id: 2,
    name: 'Documents Express',
    image: '/documents-express.jpg',
    price: 300,
    quantity: 50
  },
  {
    product_id: 3,
    name: 'Fragile Glassware',
    image: '/fragile-glassware.jpg',
    price: 600,
    quantity: 20
  }
];

// Mock users for our demo
export const mockUsers: User[] = [
  {
    user_id: 1,
    full_name: 'Admin User',
    login_name: 'admin',
    mobile: '9876543210',
    email: 'admin@pickupkart.in',
    address: 'PickupKart HQ, Delhi',
    role: 'ADMIN'
  },
  {
    user_id: 2,
    full_name: 'Sample Customer',
    login_name: 'customer',
    mobile: '9876543211',
    email: 'user2025@gmail.com',
    address: '123 Customer Street, Mumbai',
    role: 'CUSTOMER'
  }
];

// Mock orders for our demo
export const mockOrders: Order[] = [
  {
    order_id: 101,
    order_date: new Date().toISOString().split('T')[0],
    amount: 1200,
    quantity: 1,
    customer_id: 2,
    product_id: 1,
    status: 'DELIVERED',
    customer_name: 'Sample Customer',
    product_name: 'Laptop Courier',
    courier_id: 1,
    courier_name: 'ExpressShip',
    product_image: '/laptop-courier.jpg'
  },
  {
    order_id: 102,
    order_date: new Date().toISOString().split('T')[0],
    amount: 600,
    quantity: 2,
    customer_id: 2,
    product_id: 3,
    status: 'SHIPPED',
    customer_name: 'Sample Customer',
    product_name: 'Fragile Glassware',
    courier_id: 2,
    courier_name: 'SafeDelivery',
    product_image: '/fragile-glassware.jpg'
  },
  {
    order_id: 103,
    order_date: new Date().toISOString().split('T')[0],
    amount: 300,
    quantity: 1,
    customer_id: 2,
    product_id: 2,
    status: 'PENDING',
    customer_name: 'Sample Customer',
    product_name: 'Documents Express',
    courier_id: 1,
    courier_name: 'ExpressShip',
    product_image: '/documents-express.jpg'
  }
];

// Mock payments for our demo
export const mockPayments: Payment[] = [
  {
    payment_id: 201,
    order_id: 101,
    payment_mode: 'UPI',
    payment_amount: 1200,
    payment_date: new Date().toISOString(),
    status: 'COMPLETED',
    transaction_id: 'UPI12345678',
    product_name: 'Laptop Courier'
  },
  {
    payment_id: 202,
    order_id: 102,
    payment_mode: 'CARD',
    payment_amount: 600,
    payment_date: new Date().toISOString(),
    status: 'COMPLETED',
    transaction_id: 'CARD87654321',
    product_name: 'Fragile Glassware'
  },
  {
    payment_id: 203,
    order_id: 103,
    payment_mode: 'CASH',
    payment_amount: 300,
    payment_date: new Date().toISOString(),
    status: 'PENDING',
    product_name: 'Documents Express'
  },
  {
    payment_id: 204,
    order_id: 104,
    payment_mode: 'UPI',
    payment_amount: 450,
    payment_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'FAILED',
    product_name: 'Electronics Package'
  },
  {
    payment_id: 205,
    order_id: 105,
    payment_mode: 'CARD',
    payment_amount: 750,
    payment_date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'COMPLETED',
    transaction_id: 'CARD123456789',
    product_name: 'Gift Package'
  }
];
