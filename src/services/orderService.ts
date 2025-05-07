
import { Order } from '../types';
import { delay } from './config';
import { mockOrders } from './mockData';

export const orderApi = {
  getAll: async (): Promise<Order[]> => {
    await delay(500);
    return [...mockOrders];
  },
  
  getByCustomerId: async (customerId: number): Promise<Order[]> => {
    await delay(300);
    return mockOrders.filter(o => o.customer_id === customerId);
  },
  
  createOrder: async (orderData: Partial<Order>): Promise<Order> => {
    await delay(700);
    
    const newOrder: Order = {
      order_id: Math.floor(Math.random() * 1000) + 200,
      order_date: new Date().toISOString().split('T')[0],
      amount: orderData.amount || 0,
      quantity: orderData.quantity || 1,
      customer_id: orderData.customer_id || 2,
      product_id: orderData.product_id || 1,
      status: 'PENDING',
      customer_name: 'Sample Customer',
      product_name: orderData.product_name || 'Unknown Product',
      courier_id: orderData.courier_id || 1,
      courier_name: orderData.courier_name || 'Default Courier',
      product_image: orderData.product_image
    };
    
    mockOrders.push(newOrder);
    return newOrder;
  },
  
  updateOrderStatus: async (orderId: number, status: Order['status']): Promise<Order> => {
    await delay(400);
    
    const orderIndex = mockOrders.findIndex(o => o.order_id === orderId);
    if (orderIndex === -1) {
      throw new Error('Order not found');
    }
    
    // Validate status transitions to prevent invalid changes
    const currentStatus = mockOrders[orderIndex].status;
    const validTransitions: Record<Order['status'], Order['status'][]> = {
      'PENDING': ['CONFIRMED', 'CANCELLED'],
      'CONFIRMED': ['SHIPPED', 'CANCELLED'],
      'SHIPPED': ['DELIVERED', 'CANCELLED'],
      'DELIVERED': [], // Cannot change status once delivered
      'CANCELLED': [] // Cannot change status once cancelled
    };
    
    if (!validTransitions[currentStatus].includes(status) && currentStatus !== status) {
      throw new Error(`Cannot change order status from ${currentStatus} to ${status}`);
    }
    
    mockOrders[orderIndex] = {
      ...mockOrders[orderIndex],
      status
    };
    
    // For real-time notification purposes, in a real system we would emit an event here
    console.log(`Order status updated: Order #${orderId} is now ${status}`);
    
    return mockOrders[orderIndex];
  },
  
  cancelOrder: async (orderId: number): Promise<Order> => {
    await delay(400);
    
    const orderIndex = mockOrders.findIndex(o => o.order_id === orderId);
    if (orderIndex === -1) {
      throw new Error('Order not found');
    }
    
    if (mockOrders[orderIndex].status === 'DELIVERED') {
      throw new Error('Cannot cancel delivered orders');
    }
    
    mockOrders[orderIndex] = {
      ...mockOrders[orderIndex],
      status: 'CANCELLED'
    };
    
    return mockOrders[orderIndex];
  },
  
  confirmOrder: async (orderId: number): Promise<Order> => {
    await delay(400);
    
    const orderIndex = mockOrders.findIndex(o => o.order_id === orderId);
    if (orderIndex === -1) {
      throw new Error('Order not found');
    }
    
    if (mockOrders[orderIndex].status !== 'PENDING') {
      throw new Error('Can only confirm pending orders');
    }
    
    mockOrders[orderIndex] = {
      ...mockOrders[orderIndex],
      status: 'CONFIRMED'
    };
    
    return mockOrders[orderIndex];
  }
};
