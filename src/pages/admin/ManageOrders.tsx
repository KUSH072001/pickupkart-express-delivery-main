
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { orderApi, paymentApi } from '@/services/api';
import { Order, Payment } from '@/types';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useToast } from '@/hooks/use-toast';
import { 
  Package, 
  Eye, 
  XCircle,
  Check,
  Truck,
  AlertTriangle,
  RefreshCw 
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from '@/components/ui/badge';

interface OrderWithPayment extends Order {
  payment?: Payment;
  hasPayment: boolean;
}

const ManageOrders: React.FC = () => {
  const [orders, setOrders] = useState<OrderWithPayment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [productPreviewUrl, setProductPreviewUrl] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const { toast } = useToast();
  
  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      // Get all orders
      const ordersData = await orderApi.getAll();
      
      // Get all payments to match with orders
      const paymentsData = await paymentApi.getAll();
      
      // Combine orders with their payment information
      const ordersWithPayment: OrderWithPayment[] = ordersData.map(order => {
        const payment = paymentsData.find(p => p.order_id === order.order_id);
        return {
          ...order,
          payment,
          hasPayment: !!payment
        };
      });
      
      setOrders(ordersWithPayment);
      toast({
        title: 'Orders Updated',
        description: 'Order list has been refreshed',
      });
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: 'Error',
        description: 'Could not load orders.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    
    // Set up refresh interval for auto-updates
    const intervalId = setInterval(() => {
      fetchOrders();
    }, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(intervalId);
  }, [toast]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

  const handleConfirmOrder = async (orderId: number) => {
    try {
      await orderApi.confirmOrder(orderId);
      toast({
        title: 'Order Confirmed',
        description: `Order #${orderId} has been confirmed.`,
      });
      fetchOrders();
    } catch (error) {
      toast({
        title: 'Confirmation Failed',
        description: error instanceof Error ? error.message : 'Could not confirm the order.',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateStatus = async (orderId: number, status: Order['status']) => {
    try {
      await orderApi.updateOrderStatus(orderId, status);
      toast({
        title: 'Status Updated',
        description: `Order #${orderId} has been updated to ${status}.`,
      });
      fetchOrders();
    } catch (error) {
      toast({
        title: 'Update Failed',
        description: 'Could not update the order status.',
        variant: 'destructive',
      });
    }
  };

  const handleCancelOrder = async () => {
    if (!selectedOrder) return;
    
    try {
      await orderApi.updateOrderStatus(selectedOrder.order_id, 'CANCELLED');
      toast({
        title: 'Order Cancelled',
        description: `Order #${selectedOrder.order_id} has been cancelled.`,
      });
      setShowCancelDialog(false);
      fetchOrders();
    } catch (error) {
      toast({
        title: 'Cancellation Failed',
        description: 'Could not cancel the order.',
        variant: 'destructive',
      });
    }
  };

  const openCancelDialog = (order: Order) => {
    setSelectedOrder(order);
    setShowCancelDialog(true);
  };

  const openProductPreview = (imageUrl: string | undefined) => {
    setProductPreviewUrl(imageUrl || null);
  };

  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'CONFIRMED':
        return 'bg-blue-100 text-blue-800';
      case 'SHIPPED':
        return 'bg-purple-100 text-purple-800';
      case 'DELIVERED':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'PENDING':
        return <AlertTriangle size={14} className="mr-1" />;
      case 'CONFIRMED':
        return <Check size={14} className="mr-1" />;
      case 'SHIPPED':
        return <Truck size={14} className="mr-1" />;
      case 'DELIVERED':
        return <Package size={14} className="mr-1" />;
      default:
        return <XCircle size={14} className="mr-1" />;
    }
  };

  const getPaymentStatusBadge = (order: OrderWithPayment) => {
    if (!order.hasPayment) {
      return (
        <Badge variant="outline" className="bg-gray-100 text-gray-800">
          No Payment
        </Badge>
      );
    }
    
    const status = order.payment?.status;
    
    if (status === 'COMPLETED') {
      return (
        <Badge variant="default" className="bg-green-100 text-green-800">
          <Check className="mr-1 h-3 w-3" /> Paid
        </Badge>
      );
    } else if (status === 'PENDING') {
      return (
        <Badge variant="default" className="bg-yellow-100 text-yellow-800">
          <AlertTriangle className="mr-1 h-3 w-3" /> Pending
        </Badge>
      );
    } else {
      return (
        <Badge variant="default" className="bg-red-100 text-red-800">
          <XCircle className="mr-1 h-3 w-3" /> {status}
        </Badge>
      );
    }
  };

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold">Manage Orders</h1>
          <Button 
            onClick={handleRefresh} 
            variant="outline" 
            className="flex items-center gap-2"
            disabled={refreshing}
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh Orders'}
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>All Orders</CardTitle>
            <CardDescription>View and manage all courier orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b">
                    <th className="pb-3 font-medium">Order ID</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Customer</th>
                    <th className="pb-3 font-medium">Product</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Payment</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center">
                        <div className="flex justify-center">
                          <RefreshCw className="animate-spin h-8 w-8 text-primary" />
                        </div>
                        <p className="mt-2 text-muted-foreground">Loading orders...</p>
                      </td>
                    </tr>
                  ) : orders.map((order) => (
                    <tr key={order.order_id} className="border-b hover:bg-muted/30 transition-colors">
                      <td className="py-3">#{order.order_id}</td>
                      <td className="py-3">{order.order_date}</td>
                      <td className="py-3">{order.customer_name}</td>
                      <td className="py-3">
                        <div className="flex items-center">
                          {order.product_image && (
                            <Button 
                              variant="ghost"
                              size="icon"
                              className="mr-2"
                              onClick={() => openProductPreview(order.product_image)}
                            >
                              <Eye size={16} />
                            </Button>
                          )}
                          {order.product_name}
                        </div>
                      </td>
                      <td className="py-3">₹{order.amount.toLocaleString('en-IN')}</td>
                      <td className="py-3">
                        {getPaymentStatusBadge(order)}
                      </td>
                      <td className="py-3">
                        <span 
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(order.status)}`}
                        >
                          {getStatusIcon(order.status)}
                          {order.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3">
                        {order.status === 'PENDING' && (
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              onClick={() => handleConfirmOrder(order.order_id)}
                              className="bg-blue-600 hover:bg-blue-700"
                              disabled={!order.hasPayment || order.payment?.status !== 'COMPLETED'}
                            >
                              <Check className="mr-1 h-4 w-4" />
                              Confirm
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => openCancelDialog(order)}
                            >
                              <XCircle className="mr-1 h-4 w-4" />
                              Cancel
                            </Button>
                          </div>
                        )}
                        {(order.status === 'CONFIRMED' || order.status === 'SHIPPED') && (
                          <div className="flex space-x-2">
                            <Select onValueChange={(value) => handleUpdateStatus(order.order_id, value as Order['status'])}>
                              <SelectTrigger className="w-32">
                                <SelectValue placeholder="Update" />
                              </SelectTrigger>
                              <SelectContent>
                                {order.status === 'CONFIRMED' && (
                                  <SelectItem value="SHIPPED">Ship Order</SelectItem>
                                )}
                                {(order.status === 'CONFIRMED' || order.status === 'SHIPPED') && (
                                  <SelectItem value="DELIVERED">Mark Delivered</SelectItem>
                                )}
                              </SelectContent>
                            </Select>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => openCancelDialog(order)}
                            >
                              Cancel
                            </Button>
                          </div>
                        )}
                        {(order.status === 'DELIVERED' || order.status === 'CANCELLED') && (
                          <span className="text-sm text-muted-foreground">
                            No actions available
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && !isLoading && (
                    <tr>
                      <td colSpan={8} className="py-3 text-center text-muted-foreground">
                        No orders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Image Preview Dialog */}
      <Dialog open={!!productPreviewUrl} onOpenChange={() => setProductPreviewUrl(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Product Image</DialogTitle>
            <DialogDescription>
              Product preview from customer
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center p-4">
            {productPreviewUrl && (
              <img 
                src={productPreviewUrl} 
                alt="Product" 
                className="max-h-[400px] max-w-full rounded-md object-contain" 
              />
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setProductPreviewUrl(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Cancel Order Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Order</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this order? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="py-4">
              <p><strong>Order ID:</strong> #{selectedOrder.order_id}</p>
              <p><strong>Customer:</strong> {selectedOrder.customer_name}</p>
              <p><strong>Product:</strong> {selectedOrder.product_name}</p>
              <p><strong>Amount:</strong> ₹{selectedOrder.amount.toLocaleString('en-IN')}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleCancelOrder}>
              Confirm Cancellation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default ManageOrders;
