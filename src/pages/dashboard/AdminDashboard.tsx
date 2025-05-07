
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { orderApi, userApi } from '@/services/api';
import { Order, User } from '@/types';
import { Package, Users, Truck } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const AdminDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const [ordersData, customersData] = await Promise.all([
          orderApi.getAll(),
          userApi.getByRole('CUSTOMER')
        ]);
        
        setOrders(ordersData);
        setCustomers(customersData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(order => order.status === 'PENDING').length;
  const shippedOrders = orders.filter(order => order.status === 'SHIPPED').length;
  const deliveredOrders = orders.filter(order => order.status === 'DELIVERED').length;

  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);

  const pendingPercent = totalOrders > 0 ? (pendingOrders / totalOrders) * 100 : 0;
  const shippedPercent = totalOrders > 0 ? (shippedOrders / totalOrders) * 100 : 0;
  const deliveredPercent = totalOrders > 0 ? (deliveredOrders / totalOrders) * 100 : 0;

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="text-muted-foreground">Welcome to the PickupKart admin dashboard. View and manage all aspects of the courier service.</p>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="w-5 h-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground pt-1">Orders from 2025</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-5 h-5 text-muted-foreground"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalRevenue}</div>
            <p className="text-xs text-muted-foreground pt-1">Revenue in 2025</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="w-5 h-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
            <p className="text-xs text-muted-foreground pt-1">Registered customers</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
            <Truck className="w-5 h-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{shippedOrders}</div>
            <p className="text-xs text-muted-foreground pt-1">Orders in shipping</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Order Status */}
      <Card>
        <CardHeader>
          <CardTitle>Order Status Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>Pending ({pendingOrders})</span>
              <span>{pendingPercent.toFixed(0)}%</span>
            </div>
            <Progress value={pendingPercent} className="h-2 bg-yellow-100" />
          </div>
          
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>Shipped ({shippedOrders})</span>
              <span>{shippedPercent.toFixed(0)}%</span>
            </div>
            <Progress value={shippedPercent} className="h-2 bg-blue-100" />
          </div>
          
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>Delivered ({deliveredOrders})</span>
              <span>{deliveredPercent.toFixed(0)}%</span>
            </div>
            <Progress value={deliveredPercent} className="h-2 bg-green-100" />
          </div>
        </CardContent>
      </Card>
      
      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
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
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.order_id} className="border-b">
                    <td className="py-3">#{order.order_id}</td>
                    <td className="py-3">{order.order_date}</td>
                    <td className="py-3">{order.customer_name}</td>
                    <td className="py-3">{order.product_name}</td>
                    <td className="py-3">₹{order.amount}</td>
                    <td className="py-3">
                      <span 
                        className={`status-badge ${
                          order.status === 'PENDING' 
                            ? 'status-pending' 
                            : order.status === 'SHIPPED' 
                            ? 'status-transit' 
                            : 'status-delivered'
                        }`}
                      >
                        {order.status.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-3 text-center text-muted-foreground">
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
  );
};

export default AdminDashboard;
