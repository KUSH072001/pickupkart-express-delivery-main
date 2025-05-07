
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { paymentApi } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { Download, ArrowLeft } from 'lucide-react';

interface ReceiptData {
  payment: {
    payment_id: number;
    payment_date: string;
    payment_mode: string;
    payment_amount: number;
    transaction_id?: string;
  };
  order: {
    order_id: number;
    order_date: string;
    product_name?: string;
    quantity: number;
    status: string;
  };
  customer: {
    full_name: string;
    mobile: string;
    email: string;
    address: string;
  };
  product: {
    name: string;
    price: number;
    image: string;
  };
}

const PaymentReceipt: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchReceipt = async () => {
      if (!orderId) {
        toast({
          title: 'Error',
          description: 'Order ID is missing',
          variant: 'destructive',
        });
        return;
      }
      
      try {
        const data = await paymentApi.getReceiptByOrderId(Number(orderId));
        if (data) {
          setReceiptData(data);
        } else {
          toast({
            title: 'Not found',
            description: 'Receipt data could not be found',
            variant: 'destructive',
          });
        }
      } catch (error) {
        console.error('Error fetching receipt:', error);
        toast({
          title: 'Error',
          description: 'Could not load receipt data',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchReceipt();
  }, [orderId, toast]);

  const handleDownloadPDF = () => {
    // In a real implementation, this would generate a PDF
    // For now, just show a toast message
    toast({
      title: 'Download Started',
      description: 'Your receipt is being downloaded as PDF',
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit' 
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!receiptData) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <h2 className="text-2xl font-bold mb-4">Receipt Not Found</h2>
        <Button onClick={() => navigate('/dashboard/my-orders')}>
          Back to Orders
        </Button>
      </div>
    );
  }

  const { payment, order, customer, product } = receiptData;

  return (
    <div className="max-w-3xl mx-auto my-8 p-4 animate-fade-in">
      <Button 
        variant="outline" 
        className="mb-6" 
        onClick={() => navigate('/dashboard/my-orders')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
      </Button>
      
      <Card className="border-2">
        <CardHeader className="bg-card border-b">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">Payment Receipt</CardTitle>
              <CardDescription>Thank you for using PickupKart</CardDescription>
            </div>
            <div className="text-right">
              <p className="font-semibold">Receipt #{payment.payment_id}</p>
              <p className="text-sm text-muted-foreground">{formatDate(payment.payment_date)}</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-lg mb-2">Customer Details</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Name:</span> {customer.full_name}</p>
                <p><span className="font-medium">Email:</span> {customer.email}</p>
                <p><span className="font-medium">Mobile:</span> {customer.mobile}</p>
                <p><span className="font-medium">Address:</span> {customer.address}</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">Order Information</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Order ID:</span> #{order.order_id}</p>
                <p><span className="font-medium">Order Date:</span> {formatDate(order.order_date)}</p>
                <p><span className="font-medium">Status:</span> 
                  <span className={`ml-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                      order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'}`}
                  >
                    {order.status}
                  </span>
                </p>
                {payment.transaction_id && (
                  <p><span className="font-medium">Transaction ID:</span> {payment.transaction_id}</p>
                )}
                <p><span className="font-medium">Payment Method:</span> {payment.payment_mode}</p>
              </div>
            </div>
          </div>
          
          <h3 className="font-semibold text-lg mb-4">Product Details</h3>
          <div className="border rounded-lg overflow-hidden mb-8">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-4 py-2 text-left">Item</th>
                  <th className="px-4 py-2 text-center">Quantity</th>
                  <th className="px-4 py-2 text-right">Price</th>
                  <th className="px-4 py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="h-10 w-10 mr-3 bg-muted rounded overflow-hidden">
                        {product.image && (
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                      <span>{product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">{order.quantity}</td>
                  <td className="px-4 py-3 text-right">₹{product.price.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right">₹{(product.price * order.quantity).toFixed(2)}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="border-t">
                  <td colSpan={3} className="px-4 py-3 text-right font-medium">Subtotal</td>
                  <td className="px-4 py-3 text-right">₹{payment.payment_amount.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan={3} className="px-4 py-3 text-right font-medium">Shipping</td>
                  <td className="px-4 py-3 text-right">₹0.00</td>
                </tr>
                <tr className="border-t">
                  <td colSpan={3} className="px-4 py-3 text-right font-bold">Total</td>
                  <td className="px-4 py-3 text-right font-bold">₹{payment.payment_amount.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          
          <div className="flex justify-end">
            <Button onClick={handleDownloadPDF} className="flex items-center">
              <Download className="mr-2 h-4 w-4" /> Download Receipt
            </Button>
          </div>
          
          <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
            <p>Thank you for shopping with PickupKart. For any queries, please contact customer support.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentReceipt;
