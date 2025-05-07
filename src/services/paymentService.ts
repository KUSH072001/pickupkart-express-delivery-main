
import { Payment, Order, User, Product } from '../types';
import { delay } from './config';
import { mockPayments, mockOrders, mockUsers, mockProducts } from './mockData';

export const paymentApi = {
  getAll: async (): Promise<Payment[]> => {
    await delay(500);
    return [...mockPayments];
  },
  
  getByOrderId: async (orderId: number): Promise<Payment | null> => {
    await delay(300);
    const payment = mockPayments.find(p => p.order_id === orderId);
    return payment ? { ...payment } : null;
  },
  
  createPayment: async (paymentData: Partial<Payment>): Promise<Payment> => {
    await delay(500);
    
    const newPayment: Payment = {
      payment_id: Math.floor(Math.random() * 1000) + 300,
      order_id: paymentData.order_id || 0,
      payment_mode: paymentData.payment_mode || 'CASH',
      payment_amount: paymentData.payment_amount || 0,
      payment_date: new Date().toISOString(),
      status: paymentData.status || 'PENDING',
      transaction_id: paymentData.transaction_id,
      product_name: paymentData.product_name || 'Unknown Product'
    };

    mockPayments.push(newPayment);

    // Update order status if payment is completed
    if (newPayment.order_id && newPayment.status === 'COMPLETED') {
      const orderIndex = mockOrders.findIndex(o => o.order_id === newPayment.order_id);
      if (orderIndex !== -1) {
        const productName = mockOrders[orderIndex].product_name || 'Unknown Product';
        mockOrders[orderIndex] = {
          ...mockOrders[orderIndex],
          status: 'CONFIRMED'
        };
        newPayment.product_name = productName;
        console.log(`Order #${newPayment.order_id} automatically confirmed after successful payment`);
      }
    }

    return newPayment;
  },
  
  getReceiptByOrderId: async (orderId: number): Promise<{
    payment: Payment,
    order: Order,
    customer: User,
    product: Product
  } | null> => {
    await delay(700);
    
    const payment = mockPayments.find(p => p.order_id === orderId);
    if (!payment) return null;
    
    const order = mockOrders.find(o => o.order_id === orderId);
    if (!order) return null;
    
    const customer = mockUsers.find(u => u.user_id === order.customer_id);
    if (!customer) return null;
    
    const product = mockProducts.find(p => p.product_id === order.product_id);
    if (!product) return null;
    
    return {
      payment,
      order,
      customer,
      product
    };
  },
  
  processPayment: async (paymentData: Partial<Payment>): Promise<Payment> => {
    await delay(2000);
    
    // Generate a unique transaction ID
    const transactionId = `TX${Math.floor(Math.random() * 1000000000)}`;
    
    const newPayment = await paymentApi.createPayment({
      ...paymentData,
      status: 'COMPLETED',
      transaction_id: transactionId
    });
    
    // Ensure the order status is updated to CONFIRMED
    const orderIndex = mockOrders.findIndex(o => o.order_id === newPayment.order_id);
    if (orderIndex !== -1 && mockOrders[orderIndex].status === 'PENDING') {
      mockOrders[orderIndex] = {
        ...mockOrders[orderIndex],
        status: 'CONFIRMED'
      };
    }
    
    return newPayment;
  },
  
  getPaymentHistory: async (customerId: number): Promise<Payment[]> => {
    await delay(800);
    
    const paymentsWithProducts = mockPayments.map(payment => {
      const order = mockOrders.find(o => o.order_id === payment.order_id);
      return {
        ...payment,
        product_name: order?.product_name || 'Unknown Product'
      };
    });
    
    return paymentsWithProducts;
  },
  
  downloadReceipt: async (orderId: number): Promise<void> => {
    await delay(1500);
    
    const receiptData = await paymentApi.getReceiptByOrderId(orderId);
    if (!receiptData) {
      throw new Error('Receipt data not found');
    }
    
    console.log('Downloading receipt for order:', orderId);
    
    const link = document.createElement('a');
    link.href = '#';
    link.setAttribute('download', `receipt-order-${orderId}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    
    return;
  }
};
