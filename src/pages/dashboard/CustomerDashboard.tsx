
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { orderApi, productApi } from '@/services/api';
import { Order, Product } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { Package, ListCheck, ArrowRight, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CustomerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      if (user) {
        const [ordersData, productsData] = await Promise.all([
          orderApi.getByCustomerId(user.user_id),
          productApi.getAll()
        ]);
        
        setOrders(ordersData);
        setProducts(productsData);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: 'Error',
        description: 'Could not load dashboard data.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };
  
  useEffect(() => {
    fetchDashboardData();
    
    // Set up refresh interval for auto-updates
    const intervalId = setInterval(() => {
      fetchDashboardData();
    }, 20000); // Check for updates every 20 seconds
    
    return () => clearInterval(intervalId);
  }, [user]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  const pendingOrders = orders.filter(order => order.status === 'PENDING').length;
  const shippedOrders = orders.filter(order => order.status === 'SHIPPED').length;
  const deliveredOrders = orders.filter(order => order.status === 'DELIVERED').length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Customer Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.full_name}! Manage your courier orders here.</p>
        </div>
        <Button 
          onClick={handleRefresh} 
          variant="outline" 
          className="flex items-center gap-2"
          disabled={refreshing}
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </Button>
      </div>
      
      {/* Status Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingOrders}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Shipped</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{shippedOrders}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Delivered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{deliveredOrders}</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Book a Courier</CardTitle>
            <CardDescription>Need to send a package? Start the booking process.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center py-4">
            <Package size={48} className="text-accent" />
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => navigate('/dashboard/book-courier')}>
              Book Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Track Orders</CardTitle>
            <CardDescription>View and track your existing orders.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center py-4">
            <ListCheck size={48} className="text-primary" />
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              variant="outline"
              onClick={() => navigate('/dashboard/my-orders')}
            >
              View Orders <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Your most recent courier bookings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="flex flex-col items-center py-8">
                <RefreshCw className="animate-spin h-8 w-8 text-primary" />
                <p className="mt-2 text-muted-foreground">Loading your orders...</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b">
                    <th className="pb-3 font-medium">Order ID</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Product</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map((order) => (
                    <tr key={order.order_id} className="border-b">
                      <td className="py-3">#{order.order_id}</td>
                      <td className="py-3">{order.order_date}</td>
                      <td className="py-3">{order.product_name}</td>
                      <td className="py-3">₹{order.amount}</td>
                      <td className="py-3">
                        <span 
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            order.status === 'PENDING' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : order.status === 'CONFIRMED'
                              ? 'bg-blue-100 text-blue-800'
                              : order.status === 'SHIPPED' 
                              ? 'bg-purple-100 text-purple-800' 
                              : order.status === 'DELIVERED'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {order.status.replace('_', ' ')}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-3 text-center text-muted-foreground">
                        No orders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            variant="link" 
            className="ml-auto"
            onClick={() => navigate('/dashboard/my-orders')}
          >
            View all orders <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CustomerDashboard;
