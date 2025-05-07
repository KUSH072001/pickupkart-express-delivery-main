
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { orderApi } from '@/services/api';
import { Order } from '@/types';
import { useAuth } from '@/context/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw } from 'lucide-react';

const MyOrders: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      if (user) {
        const ordersData = await orderApi.getByCustomerId(user.user_id);
        setOrders(ordersData);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: 'Error',
        description: 'Could not load your orders.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    
    // Set up refresh interval for auto-updates - check every 15 seconds
    const intervalId = setInterval(() => {
      fetchOrders();
    }, 15000);
    
    return () => clearInterval(intervalId);
  }, [user, toast]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

  const handleCancelOrder = async (orderId: number) => {
    try {
      await orderApi.cancelOrder(orderId);
      toast({
        title: 'Order Cancelled',
        description: 'Your order has been cancelled successfully.',
      });
      fetchOrders();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Could not cancel the order.',
        variant: 'destructive',
      });
    }
  };

  const pendingOrders = orders.filter(order => order.status === 'PENDING');
  const confirmedOrders = orders.filter(order => order.status === 'CONFIRMED');
  const shippedOrders = orders.filter(order => order.status === 'SHIPPED');
  const deliveredOrders = orders.filter(order => order.status === 'DELIVERED');
  const cancelledOrders = orders.filter(order => order.status === 'CANCELLED');

  const renderOrderTable = (orderList: Order[]) => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left border-b">
            <th className="pb-3 font-medium">Order ID</th>
            <th className="pb-3 font-medium">Date</th>
            <th className="pb-3 font-medium">Product</th>
            <th className="pb-3 font-medium">Quantity</th>
            <th className="pb-3 font-medium">Amount</th>
            <th className="pb-3 font-medium">Status</th>
            <th className="pb-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={7} className="py-8 text-center">
                <div className="flex justify-center">
                  <RefreshCw className="animate-spin h-8 w-8 text-primary" />
                </div>
                <p className="mt-2 text-muted-foreground">Loading orders...</p>
              </td>
            </tr>
          ) : orderList.map((order) => (
            <tr key={order.order_id} className="border-b">
              <td className="py-3">#{order.order_id}</td>
              <td className="py-3">{order.order_date}</td>
              <td className="py-3">{order.product_name}</td>
              <td className="py-3">{order.quantity}</td>
              <td className="py-3">₹{order.amount}</td>
              <td className="py-3">
                <span 
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'SHIPPED' ? 'bg-purple-100 text-purple-800' :
                    order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}
                >
                  {order.status.replace('_', ' ')}
                </span>
              </td>
              <td className="py-3">
                {(order.status === 'PENDING' || order.status === 'CONFIRMED') && (
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => handleCancelOrder(order.order_id)}
                  >
                    Cancel
                  </Button>
                )}
                {(order.status !== 'PENDING' && order.status !== 'CONFIRMED') && (
                  <span className="text-sm text-muted-foreground">
                    No actions available
                  </span>
                )}
              </td>
            </tr>
          ))}
          {orderList.length === 0 && !isLoading && (
            <tr>
              <td colSpan={7} className="py-3 text-center text-muted-foreground">
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold">My Orders</h1>
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
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Orders ({orders.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingOrders.length})</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed ({confirmedOrders.length})</TabsTrigger>
            <TabsTrigger value="shipped">Shipped ({shippedOrders.length})</TabsTrigger>
            <TabsTrigger value="delivered">Delivered ({deliveredOrders.length})</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled ({cancelledOrders.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>All Orders</CardTitle>
                <CardDescription>Complete list of your courier bookings</CardDescription>
              </CardHeader>
              <CardContent>
                {renderOrderTable(orders)}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending Orders</CardTitle>
                <CardDescription>Orders waiting to be processed</CardDescription>
              </CardHeader>
              <CardContent>
                {renderOrderTable(pendingOrders)}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="confirmed">
            <Card>
              <CardHeader>
                <CardTitle>Confirmed Orders</CardTitle>
                <CardDescription>Orders that have been confirmed</CardDescription>
              </CardHeader>
              <CardContent>
                {renderOrderTable(confirmedOrders)}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="shipped">
            <Card>
              <CardHeader>
                <CardTitle>Shipped Orders</CardTitle>
                <CardDescription>Orders that are currently in transit</CardDescription>
              </CardHeader>
              <CardContent>
                {renderOrderTable(shippedOrders)}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="delivered">
            <Card>
              <CardHeader>
                <CardTitle>Delivered Orders</CardTitle>
                <CardDescription>Orders that have been successfully delivered</CardDescription>
              </CardHeader>
              <CardContent>
                {renderOrderTable(deliveredOrders)}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="cancelled">
            <Card>
              <CardHeader>
                <CardTitle>Cancelled Orders</CardTitle>
                <CardDescription>Orders that have been cancelled</CardDescription>
              </CardHeader>
              <CardContent>
                {renderOrderTable(cancelledOrders)}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default MyOrders;
